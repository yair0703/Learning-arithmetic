import React, { useState, useEffect, useRef } from 'react';
import { TopicId, TopicStage, StudentProgress } from './types';
import { loadStudentProgress, saveStudentProgress } from './utils/storage';
import { saveStudentProgressToCloud, loadStudentProgressFromCloud, getStudentCloudId } from './utils/firebase';
import { HomeScreen } from './components/home/HomeScreen';
import { TopicView } from './components/TopicView';
import { DailyPracticeView } from './components/daily/DailyPracticeView';
import { ReinforcementView } from './components/reinforcement/ReinforcementView';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { FractionSandboxModal } from './components/visuals/FractionSandboxModal';
import { FindTheMistakeModal } from './components/practice/FindTheMistakeModal';
import {
  Sparkles,
  Flame,
  ShieldCheck,
  Home,
  BookOpen,
  HelpCircle,
  Trophy,
  CalendarCheck,
  Target,
  GraduationCap,
  Cloud,
  Check,
  RefreshCw
} from 'lucide-react';

type AppView = 'home' | 'topic' | 'daily' | 'reinforcement' | 'parent';

export default function App() {
  const [progress, setProgress] = useState<StudentProgress>(() => loadStudentProgress());
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>('whole-part');
  const [topicInitialStage, setTopicInitialStage] = useState<TopicStage>('understand');
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);
  const [isMistakeModalOpen, setIsMistakeModalOpen] = useState<boolean>(false);
  const [cloudSyncState, setCloudSyncState] = useState<'synced' | 'syncing' | 'error'>('synced');
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync to local storage & background cloud sync whenever progress changes
  const handleProgressUpdate = (newProgress: StudentProgress) => {
    setProgress(newProgress);
    saveStudentProgress(newProgress);

    // Debounced Cloud Sync
    setCloudSyncState('syncing');
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    syncTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await saveStudentProgressToCloud(newProgress);
        if (res.success) {
          setCloudSyncState('synced');
        } else {
          setCloudSyncState('error');
        }
      } catch {
        setCloudSyncState('error');
      }
    }, 800);
  };

  // Initial cloud check on first mount
  useEffect(() => {
    const initSync = async () => {
      try {
        // If local progress is empty, try loading from cloud
        if (progress.totalSolved === 0) {
          const cloudRes = await loadStudentProgressFromCloud();
          if (cloudRes.success && cloudRes.data && cloudRes.data.totalSolved > 0) {
            setProgress(cloudRes.data);
            saveStudentProgress(cloudRes.data);
          }
        } else {
          // Push local to cloud
          await saveStudentProgressToCloud(progress);
        }
        setCloudSyncState('synced');
      } catch {
        // keep local state
      }
    };
    initSync();
  }, []);

  const handleSelectTopicToLearn = (topicId: TopicId) => {
    setSelectedTopicId(topicId);
    setTopicInitialStage('understand');
    setActiveView('topic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopicToPractice = (topicId: TopicId) => {
    setSelectedTopicId(topicId);
    setTopicInitialStage('practice');
    setActiveView('topic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartDailyPractice = () => {
    setActiveView('daily');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white" dir="rtl">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand & Home click */}
          <button
            type="button"
            onClick={handleBackToHome}
            className="flex items-center gap-3 text-right group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
              ½
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-600 leading-none">
                מסלולים פלוס – כיתה ה׳
              </div>
              <div className="text-base font-black text-slate-900 leading-tight">
                שברים – חלק א׳
              </div>
            </div>
          </button>

          {/* Quick Actions & Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cloud Sync Status Badge */}
            <div
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${
                cloudSyncState === 'synced'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : cloudSyncState === 'syncing'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
              title={
                cloudSyncState === 'synced'
                  ? 'מסונכרן ומאובטח בענן Firebase'
                  : cloudSyncState === 'syncing'
                  ? 'מסנכרן שינויים בענן...'
                  : 'שגיאת סנכרון ענן (נשמר מקומית)'
              }
            >
              {cloudSyncState === 'syncing' ? (
                <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
              ) : (
                <Cloud className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span className="text-[11px]">
                {cloudSyncState === 'syncing' ? 'מסנכרן...' : 'ענן פעיל'}
              </span>
            </div>

            {/* Daily Streak */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>{progress.dailyStreak} ימי רצף</span>
            </div>

            {/* Total Solved Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-bold">
              <Trophy className="w-4 h-4 text-indigo-600" />
              <span>{progress.totalSolved} תרגילים</span>
            </div>

            {/* Daily practice shortcut */}
            <button
              type="button"
              onClick={handleStartDailyPractice}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'daily'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">תרגול יומי</span>
            </button>

            {/* Reinforcement topics shortcut */}
            <button
              type="button"
              onClick={() => setActiveView('reinforcement')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'reinforcement'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
              title="חיזוק נושאים הדורשים שיפור"
            >
              <Target className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">חיזוק נושאים</span>
            </button>

            {/* Find the Mistake / Be the Teacher */}
            <button
              type="button"
              onClick={() => setIsMistakeModalOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition-colors"
              title="היה אתה המורה – מצא את הטעות ועזור לחבר"
            >
              <GraduationCap className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">היה אתה המורה</span>
            </button>

            {/* Fraction Sandbox Modal Trigger */}
            <button
              type="button"
              onClick={() => setIsSandboxOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
              title="פתח מעבדת שברים אינטראקטיבית"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">מעבדה</span>
            </button>

            {/* Parent Area Toggle */}
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'parent' ? 'home' : 'parent')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'parent'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">אזור הורה</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeView === 'home' && (
          <HomeScreen
            progress={progress}
            onSelectTopicToLearn={handleSelectTopicToLearn}
            onSelectTopicToPractice={handleSelectTopicToPractice}
            onStartDailyPractice={handleStartDailyPractice}
            onOpenReinforcement={() => setActiveView('reinforcement')}
            onOpenFindTheMistake={() => setIsMistakeModalOpen(true)}
            onOpenParentArea={() => setActiveView('parent')}
            onOpenSandbox={() => setIsSandboxOpen(true)}
          />
        )}

        {activeView === 'reinforcement' && (
          <ReinforcementView
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            onNavigateToTopicLearn={handleSelectTopicToLearn}
            onBackToHome={handleBackToHome}
            onOpenSandbox={() => setIsSandboxOpen(true)}
          />
        )}

        {activeView === 'topic' && (
          <TopicView
            topicId={selectedTopicId}
            initialStage={topicInitialStage}
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            onBackToHome={handleBackToHome}
            onOpenSandbox={() => setIsSandboxOpen(true)}
          />
        )}

        {activeView === 'daily' && (
          <DailyPracticeView
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            onClose={handleBackToHome}
            onOpenSandbox={() => setIsSandboxOpen(true)}
          />
        )}

        {activeView === 'parent' && (
          <ParentDashboard
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            onBackToStudent={handleBackToHome}
          />
        )}
      </main>

      {/* Interactive Fraction Sandbox Scratchpad Modal */}
      <FractionSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

      {/* Find the Mistake / Be the Teacher Modal */}
      <FindTheMistakeModal
        isOpen={isMistakeModalOpen}
        onClose={() => setIsMistakeModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong>מסלולים פלוס – כיתה ה׳</strong> | כלי עזר אישי ללמידה, חזרה ותרגול שברים בהוצאת מטח.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>ללא הצגת תשובות מהירות</span>
            <span>•</span>
            <span>הסבר עדין לטעויות</span>
            <span>•</span>
            <span>המחשות חזותיות אינטראקטיביות</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
