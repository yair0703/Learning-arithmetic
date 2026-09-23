import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TopicId, TopicStage, StudentProgress, UserProfile } from './types';
import { loadStudentProgress, saveStudentProgress } from './utils/storage';
import {
  saveStudentProgressToCloud,
  loadStudentProgressFromCloud,
  getStudentCloudId,
  setStudentCloudId,
  getSavedUserProfile,
  saveUserProfileToStorage,
  logoutUser,
  getFirebaseAuth
} from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  enqueueOfflineChange,
  flushOfflineQueue,
  getOfflineQueueCount
} from './utils/syncQueue';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { HomeScreen } from './components/home/HomeScreen';
import { TopicView } from './components/TopicView';
import { DailyPracticeView } from './components/daily/DailyPracticeView';
import { ReinforcementView } from './components/reinforcement/ReinforcementView';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { FractionSandboxModal } from './components/visuals/FractionSandboxModal';
import { FindTheMistakeModal } from './components/practice/FindTheMistakeModal';
import { AuthModal } from './components/auth/AuthModal';
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
  RefreshCw,
  WifiOff,
  User,
  LogIn,
  LogOut,
  KeyRound
} from 'lucide-react';

type AppView = 'home' | 'topic' | 'daily' | 'reinforcement' | 'parent';

export default function App() {
  const [progress, setProgress] = useState<StudentProgress>(() => loadStudentProgress());
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>('whole-part');
  const [topicInitialStage, setTopicInitialStage] = useState<TopicStage>('understand');
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);
  const [isMistakeModalOpen, setIsMistakeModalOpen] = useState<boolean>(false);

  // Authentication state
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getSavedUserProfile());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'student' | 'parent'>('student');
  
  // Offline & Cloud Sync state
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [cloudSyncState, setCloudSyncState] = useState<'synced' | 'syncing' | 'offline' | 'error'>('synced');
  const [pendingQueueCount, setPendingQueueCount] = useState<number>(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Respect active profile session stored in LocalStorage
      const savedProfile = getSavedUserProfile();
      if (savedProfile.role === 'student' || savedProfile.role === 'guest') {
        return;
      }

      if (firebaseUser) {
        setUserProfile((prev) => {
          if (prev.role === 'parent' && prev.uid === firebaseUser.uid) return prev;
          const updated: UserProfile = {
            role: 'parent',
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'הורה',
            email: firebaseUser.email || undefined
          };
          saveUserProfileToStorage(updated);
          return updated;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Flush offline queue to cloud and notify user
  const processOfflineQueue = useCallback(async (isNetworkRestored = false) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const count = await getOfflineQueueCount();
      setPendingQueueCount(count);
      setCloudSyncState('offline');
      return;
    }

    setCloudSyncState('syncing');
    try {
      const result = await flushOfflineQueue();
      setPendingQueueCount(result.remainingCount);

      if (result.flushedCount > 0) {
        setCloudSyncState('synced');
        addToast({
          type: 'success',
          title: isNetworkRestored ? 'החיבור לרשת חודש!' : 'סנכרון ענן הושלם',
          description: `כל ${result.flushedCount} השינויים שנצברו במצב לא מקוון סונכרנו בהצלחה לענן Firebase ☁️`
        });
      } else if (result.remainingCount === 0) {
        setCloudSyncState('synced');
      } else {
        setCloudSyncState('offline');
      }
    } catch {
      setCloudSyncState('offline');
    }
  }, [addToast]);

  // Robust Online/Offline network event listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      processOfflineQueue(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setCloudSyncState('offline');
      addToast({
        type: 'warning',
        title: 'עבודה במצב לא מקוון (Offline)',
        description: 'הנתונים נשמרים ב-IndexedDB ויסונכרנו אוטומטית ברגע שהחיבור יחזור.'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check on load
    const initApp = async () => {
      const queueCount = await getOfflineQueueCount();
      setPendingQueueCount(queueCount);

      if (navigator.onLine) {
        if (queueCount > 0) {
          await processOfflineQueue(false);
        } else if (progress.totalSolved === 0) {
          try {
            const cloudRes = await loadStudentProgressFromCloud();
            if (cloudRes.success && cloudRes.data && cloudRes.data.totalSolved > 0) {
              setProgress(cloudRes.data);
              saveStudentProgress(cloudRes.data);
            }
          } catch {
            // keep local progress
          }
        }
      } else {
        setCloudSyncState('offline');
      }
    };

    initApp();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addToast, processOfflineQueue, progress.totalSolved]);

  // Handle local state update with robust offline-first fallback
  const handleProgressUpdate = async (newProgress: StudentProgress) => {
    // 1. Update React state & LocalStorage immediately for instant UX
    setProgress(newProgress);
    saveStudentProgress(newProgress);

    // 2. If offline, push change into IndexedDB queue
    if (!navigator.onLine) {
      setCloudSyncState('offline');
      await enqueueOfflineChange(newProgress);
      const count = await getOfflineQueueCount();
      setPendingQueueCount(count);
      return;
    }

    // 3. If online, debounce cloud save with auto-fallback to IndexedDB
    setCloudSyncState('syncing');
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await saveStudentProgressToCloud(newProgress);
        if (res.success) {
          setCloudSyncState('synced');
          // Also flush any previous queued items
          const remaining = await getOfflineQueueCount();
          if (remaining > 0) {
            await processOfflineQueue(false);
          }
        } else {
          // Cloud save returned failure -> enqueue in IndexedDB
          await enqueueOfflineChange(newProgress);
          const count = await getOfflineQueueCount();
          setPendingQueueCount(count);
          setCloudSyncState('offline');
        }
      } catch {
        // Network or fetch exception -> queue in IndexedDB
        await enqueueOfflineChange(newProgress);
        const count = await getOfflineQueueCount();
        setPendingQueueCount(count);
        setCloudSyncState('offline');
      }
    }, 600);
  };

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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white" dir="rtl">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs w-full">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Brand & Home click */}
          <button
            type="button"
            onClick={handleBackToHome}
            className="flex items-center gap-2 sm:gap-3 text-right group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0">
              ½
            </div>
            <div className="flex flex-col text-right">
              <div className="text-[10px] sm:text-xs font-bold text-indigo-600 leading-none">
                מסלולים פלוס – כיתה ה׳
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                שברים – חלק א׳
              </div>
            </div>
          </button>

          {/* Quick Actions & Stats */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Cloud Sync & Offline Status Badge (Desktop only) */}
            <div
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
                !isOnline || pendingQueueCount > 0
                  ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-2xs'
                  : cloudSyncState === 'syncing'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 animate-pulse'
                  : cloudSyncState === 'synced'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
              title={
                !isOnline
                  ? `עבודה במצב לא מקוון (${pendingQueueCount} שינויים ממתינים ב-IndexedDB)`
                  : pendingQueueCount > 0
                  ? `${pendingQueueCount} שינויים ממתינים לסנכרון ענן`
                  : cloudSyncState === 'syncing'
                  ? 'מסנכרן שינויים בענן Firebase...'
                  : 'מסונכרן ומאובטח בענן Firebase'
              }
            >
              {!isOnline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[11px]">
                    לא מקוון {pendingQueueCount > 0 ? `(${pendingQueueCount})` : ''}
                  </span>
                </>
              ) : cloudSyncState === 'syncing' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                  <span className="text-[11px]">מסנכרן...</span>
                </>
              ) : (
                <>
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px]">ענן פעיל</span>
                </>
              )}
            </div>

            {/* Daily Streak */}
            <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold shrink-0">
              <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{progress.dailyStreak} <span className="hidden xs:inline">ימי רצף</span></span>
            </div>

            {/* Total Solved Badge (Desktop only) */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-bold shrink-0">
              <Trophy className="w-3.5 h-3.5 text-indigo-600" />
              <span>{progress.totalSolved} תרגילים</span>
            </div>

            {/* Daily practice shortcut (Desktop/Tablet only) */}
            <button
              type="button"
              onClick={handleStartDailyPractice}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeView === 'daily'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>תרגול יומי</span>
            </button>

            {/* Reinforcement topics shortcut (Desktop only) */}
            <button
              type="button"
              onClick={() => setActiveView('reinforcement')}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeView === 'reinforcement'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
              title="חיזוק נושאים הדורשים שיפור"
            >
              <Target className="w-3.5 h-3.5 text-amber-600" />
              <span>חיזוק נושאים</span>
            </button>

            {/* Parent Area Toggle */}
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'parent' ? 'home' : 'parent')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                activeView === 'parent'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="hidden sm:inline">אזור הורה</span>
            </button>

            {/* Auth / Profile Button */}
            {userProfile.role === 'student' ? (
              <button
                type="button"
                onClick={() => {
                  setAuthDefaultTab('student');
                  setIsAuthModalOpen(true);
                }}
                className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                title={`מחובר כתלמיד: ${userProfile.displayName || ''} (לחץ להחלפת משתמש)`}
              >
                <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="max-w-[70px] sm:max-w-[110px] truncate">{userProfile.displayName || 'תלמיד'}</span>
                {userProfile.studentCode && (
                  <span className="hidden sm:inline bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">
                    {userProfile.studentCode}
                  </span>
                )}
              </button>
            ) : userProfile.role === 'parent' ? (
              <button
                type="button"
                onClick={() => {
                  setAuthDefaultTab('parent');
                  setIsAuthModalOpen(true);
                }}
                className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                title={`מחובר כהורה: ${userProfile.displayName || userProfile.email || ''} (לחץ להגדרות)`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="max-w-[70px] sm:max-w-[110px] truncate">{userProfile.displayName || 'הורה'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthDefaultTab('student');
                  setIsAuthModalOpen(true);
                }}
                className="px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95 shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span>התחברות</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 overflow-x-hidden">
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
            userProfile={userProfile}
            onOpenAuthModal={() => {
              setAuthDefaultTab('student');
              setIsAuthModalOpen(true);
            }}
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
            userProfile={userProfile}
            onOpenAuthModal={() => {
              setAuthDefaultTab('parent');
              setIsAuthModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Auth Modal (Parent login & Student simple code login) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authDefaultTab}
        onLoginSuccess={async (profile) => {
          setUserProfile(profile);
          if (profile.role === 'student' && profile.uid) {
            setStudentCloudId(profile.uid);
            // Load cloud progress if available
            const cloudRes = await loadStudentProgressFromCloud(profile.uid);
            if (cloudRes.success && cloudRes.data) {
              saveStudentProgress(cloudRes.data);
              setProgress(cloudRes.data);
              addToast({
                type: 'success',
                title: `שלום ${profile.displayName}! 🌟`,
                description: 'הנתונים וההתקדמות שלך נטענו בהצלחה מהענן'
              });
            } else {
              addToast({
                type: 'success',
                title: `שלום ${profile.displayName}! 🌟`,
                description: `מחובר עם קוד אישי ${profile.studentCode || ''}`
              });
            }
          } else if (profile.role === 'parent') {
            addToast({
              type: 'success',
              title: `שלום ${profile.displayName || 'הורה'}! 🛡️`,
              description: 'התחברת בהצלחה לחשבון הורה – כעת תוכל לצפות בילדים המקושרים'
            });
          }
        }}
      />

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
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
