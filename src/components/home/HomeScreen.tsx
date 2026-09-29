import React from 'react';
import { TopicInfo, StudentProgress, TopicId, UserProfile } from '../../types';
import { TOPICS } from '../../data/curriculumData';
import { getRecommendedTopicToReinforce, getTopicMastery } from '../../utils/storage';
import {
  Sparkles,
  CalendarCheck,
  Target,
  BarChart2,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Flame,
  PieChart,
  Ruler,
  Layers,
  PlusCircle,
  Coins,
  HelpCircle,
  Award,
  Sliders,
  ShieldCheck,
  GraduationCap,
  Star,
  Lock,
  Unlock,
  Play,
  TrendingUp,
  Crown,
  Trophy,
  Compass
} from 'lucide-react';

interface HomeScreenProps {
  progress: StudentProgress;
  onSelectTopicToLearn: (topicId: TopicId) => void;
  onSelectTopicToPractice: (topicId: TopicId) => void;
  onStartDailyPractice: () => void;
  onOpenReinforcement: () => void;
  onOpenFindTheMistake: () => void;
  onOpenParentArea: () => void;
  onOpenSandbox: () => void;
  userProfile?: UserProfile;
  onOpenAuthModal?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progress,
  onSelectTopicToLearn,
  onSelectTopicToPractice,
  onStartDailyPractice,
  onOpenReinforcement,
  onOpenFindTheMistake,
  onOpenParentArea,
  onOpenSandbox,
  userProfile,
  onOpenAuthModal
}) => {
  const isStudent = userProfile?.role === 'student' && Boolean(userProfile?.displayName);

  // Calculate overall curriculum mastery
  const totalMastery = Math.round(
    TOPICS.reduce((sum, t) => sum + getTopicMastery(progress.topicsProgress[t.id]).percentage, 0) /
      TOPICS.length
  );

  // Helper to determine the "Continue Here" active topic
  const getContinueHereTopic = (): { topic: TopicInfo; isAllCompleted: boolean } => {
    // 1. Find first topic where student is actively learning / not yet completed master
    for (const topic of TOPICS) {
      const tp = progress.topicsProgress[topic.id];
      const mastery = getTopicMastery(tp);
      const isMastered = tp?.currentLevel === 4 && (mastery.status === 'master' || (tp?.correctCount || 0) >= 15);
      if (!isMastered) {
        return { topic, isAllCompleted: false };
      }
    }
    // All topics mastered
    return { topic: TOPICS[0], isAllCompleted: true };
  };

  const { topic: activeTopic, isAllCompleted } = getContinueHereTopic();
  const activeTp = progress.topicsProgress[activeTopic.id];
  const activeMastery = getTopicMastery(activeTp);

  // Recommended topic for reinforcement
  const recommended = getRecommendedTopicToReinforce(progress);
  const recommendedTopic = TOPICS.find((t) => t.id === recommended.topicId) || TOPICS[1];

  // Helper for station icons
  const getTopicIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'PieChart':
        return <PieChart className={className} />;
      case 'Ruler':
        return <Ruler className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'PlusCircle':
        return <PlusCircle className={className} />;
      case 'Coins':
        return <Coins className={className} />;
      case 'HelpCircle':
        return <HelpCircle className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Sliders':
        return <Sliders className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  // Station status for the Chapter Path
  const getStationStatus = (topic: TopicInfo, index: number): 'locked' | 'in-progress' | 'completed' | 'master' => {
    const tp = progress.topicsProgress[topic.id];
    const mastery = getTopicMastery(tp);

    if (tp?.currentLevel === 4 && (mastery.status === 'master' || (tp?.correctCount || 0) >= 15)) {
      return 'master';
    }
    if (tp?.completedUnderstand && tp?.completedTogether && (tp?.exercisesSolved || 0) >= 5) {
      return 'completed';
    }

    if (index === 0) {
      return 'in-progress';
    }

    const prevTopic = TOPICS[index - 1];
    const prevTp = progress.topicsProgress[prevTopic.id];
    const isUnlocked =
      prevTp?.completedUnderstand ||
      prevTp?.completedTogether ||
      (prevTp?.exercisesSolved && prevTp.exercisesSolved > 0);

    return isUnlocked ? 'in-progress' : 'locked';
  };

  return (
    <div className="flex flex-col gap-6 md:gap-7 max-w-5xl mx-auto py-2 text-slate-900" id="home-screen" dir="rtl">
      
      {/* 1) SHORTENED HERO - Refined & gentle gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 p-5 md:p-6 rounded-3xl text-white shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left / Main text */}
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-indigo-50 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>מסלולים פלוס – כיתה ה׳ | שברים – חלק א׳</span>
            </span>

            {/* Flame streak tag */}
            <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full text-xs font-black shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
              <span>רצף {progress.dailyStreak} ימים</span>
            </span>

            {/* Overall mastery tag */}
            <span className="inline-flex items-center gap-1 bg-white/20 text-white border border-white/15 px-2.5 py-1 rounded-full text-xs font-bold shadow-2xs">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
              <span>שליטה כוללת: {totalMastery}%</span>
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            {userProfile?.displayName ? `שלום ${userProfile.displayName}! 👋` : 'היי! 👋 מה נלמד היום?'}
          </h1>
          <p className="text-xs md:text-sm text-indigo-100 mt-0.5 max-w-xl">
            המורה הדיגיטלי האישי שלך לחזרה, המחשות אינטראקטיביות ותרגול מדורג.
          </p>
        </div>

        {/* Small Action Buttons in a Row */}
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenSandbox}
            className="px-3.5 py-2.5 min-h-[42px] bg-white/15 hover:bg-white/25 backdrop-blur-xs border border-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>מעבדת שברים 🧪</span>
          </button>

          <button
            type="button"
            onClick={onOpenFindTheMistake}
            className="px-3.5 py-2.5 min-h-[42px] bg-teal-500/90 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs border border-teal-300/30 cursor-pointer active:scale-95"
          >
            <GraduationCap className="w-4 h-4 text-teal-100" />
            <span>היה אתה המורה 🧑‍🏫</span>
          </button>

          {!isStudent && (
            <button
              type="button"
              onClick={onOpenParentArea}
              className="px-3.5 py-2.5 min-h-[42px] bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xs border border-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>אזור הורה</span>
            </button>
          )}
        </div>

        {/* Subtle background glow */}
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none blur-xl" />
      </div>

      {/* 2) LARGE PROMINENT CARD: "המשך מכאן" - Light minimal card with indigo accent */}
      {isAllCompleted ? (
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 rounded-3xl p-6 md:p-7 text-slate-900 shadow-sm border-2 border-amber-300/80 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-right">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
                <Trophy className="w-8 h-8 text-amber-700" />
              </div>
              <div>
                <span className="bg-amber-200/80 text-amber-900 border border-amber-300 text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
                  הישג ענק! 🏆
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-900">
                  סיימת את כל מסלול הפרקים!
                </h2>
                <p className="text-xs md:text-sm text-slate-600 font-medium mt-0.5">
                  כל הכבוד! שלטת בכל 8 נושאי הלימוד. המשך לתרגול יומי או חזור על זירות המאסטר לשמירה על חדות.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={onStartDailyPractice}
                className="flex-1 md:flex-initial px-6 py-3 min-h-[46px] bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-sm rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>תרגול יומי</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectTopicToPractice(TOPICS[0].id)}
                className="flex-1 md:flex-initial px-5 py-3 min-h-[46px] bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-slate-300 shadow-2xs"
              >
                <Crown className="w-4 h-4 text-amber-600" />
                <span>זירת מאסטר</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 md:p-7 shadow-md border-2 border-indigo-200 relative overflow-hidden flex flex-col gap-5">
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600" />

          {/* Top row of card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-100 text-amber-900 border border-amber-300 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-amber-900 text-amber-900" />
                המשך מכאן 🚀
              </span>
              <span className="bg-slate-100 text-slate-600 font-bold text-xs px-3 py-1 rounded-full border border-slate-200">
                פרק {activeTopic.order} מתוך 8
              </span>
            </div>

            {/* Mastery & Stars info */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= (activeMastery.stars || 1)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                {activeMastery.percentage}% שליטה
              </span>
            </div>
          </div>

          {/* Middle row: Topic Title + Description + Stage badges */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${activeTopic.bgGradient} text-white flex items-center justify-center shrink-0 shadow-sm`}
              >
                {getTopicIcon(activeTopic.iconName, 'w-7 h-7')}
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900">
                  {activeTopic.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed max-w-xl">
                  {activeTopic.subtitle}
                </p>

                {/* Level status indicator */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-indigo-600" />
                    דרגת התקדמות: {activeMastery.levelLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Steps Mini Status */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex flex-col gap-2 shrink-0 md:min-w-[210px]">
              <div className="text-[11px] font-bold text-slate-500 text-center">
                שלבי הנושא הנוכחי:
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div
                  className={`py-1.5 px-1.5 rounded-lg flex items-center justify-center gap-1 font-bold ${
                    activeTp?.completedUnderstand
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  <CheckCircle2 className={`w-3 h-3 ${activeTp?.completedUnderstand ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span>1. הבנה</span>
                </div>

                <div
                  className={`py-1.5 px-1.5 rounded-lg flex items-center justify-center gap-1 font-bold ${
                    activeTp?.completedTogether
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  <CheckCircle2 className={`w-3 h-3 ${activeTp?.completedTogether ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span>2. ביחד</span>
                </div>

                <div
                  className={`py-1.5 px-1.5 rounded-lg flex items-center justify-center gap-1 font-bold ${
                    (activeTp?.exercisesSolved || 0) > 0
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 font-black'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  <Award className={`w-3 h-3 ${(activeTp?.exercisesSolved || 0) > 0 ? 'text-amber-600' : 'text-slate-300'}`} />
                  <span>3. תרגול</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onSelectTopicToLearn(activeTopic.id)}
              className="w-full sm:flex-1 py-3 px-6 min-h-[46px] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm md:text-base rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-indigo-100" />
              <span>המשך למידה (הסבר ומודלים)</span>
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onSelectTopicToPractice(activeTopic.id)}
              className="w-full sm:flex-1 py-3 px-6 min-h-[46px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm md:text-base rounded-xl border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Target className="w-5 h-5 text-indigo-600" />
              <span>כניסה ישירה לתרגול</span>
            </button>
          </div>
        </div>
      )}

      {/* 3) CHAPTER PATH (מסלול הפרקים) - Clean white card */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <span>מסלול הפרקים בספר 🗺️</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              עברו את כל 8 התחנות ברצף כדי לכבוש את ספר השברים וזירות המאסטר:
            </p>
          </div>

          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full self-start sm:self-auto">
            {TOPICS.filter((t) => {
              const tp = progress.topicsProgress[t.id];
              return tp?.completedUnderstand && tp?.completedTogether;
            }).length}{' '}
            / 8 פרקים הושלמו
          </span>
        </div>

        {/* Path Stations (Horizontal scroll on mobile, flex on desktop) */}
        <div className="overflow-x-auto pb-3 pt-2 scrollbar-none">
          <div className="flex items-start justify-between min-w-[720px] md:min-w-0 relative px-2">
            {/* Connecting line behind stations */}
            <div className="absolute top-7 right-6 left-6 h-1 bg-slate-200 z-0" />

            {TOPICS.map((topic, idx) => {
              const status = getStationStatus(topic, idx);
              const isActive = activeTopic.id === topic.id;
              const isLocked = status === 'locked';

              return (
                <div key={topic.id} className="relative z-10 flex flex-col items-center gap-2 group flex-1 max-w-[100px] text-center">
                  {/* Station Node Button */}
                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => onSelectTopicToLearn(topic.id)}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-black text-base md:text-lg transition-all cursor-pointer ${
                      status === 'master'
                        ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 ring-4 ring-amber-100 shadow-xs active:scale-95'
                        : status === 'completed'
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-50 shadow-xs active:scale-95'
                        : isActive
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-sm animate-pulse active:scale-95'
                        : !isLocked
                        ? 'bg-indigo-50 text-indigo-700 border-2 border-indigo-200 hover:bg-indigo-100 active:scale-95'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                    }`}
                    title={isLocked ? 'סיים את הפרק הקודם כדי לפתוח תחנה זו' : topic.title}
                  >
                    {status === 'master' ? (
                      <Crown className="w-6 h-6 text-slate-950 fill-current" />
                    ) : status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-slate-400" />
                    ) : (
                      <span>{topic.order}</span>
                    )}
                  </button>

                  {/* Title & Status below station */}
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-black text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {topic.shortTitle || `פרק ${topic.order}`}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 inline-block ${
                        status === 'master'
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : isActive
                          ? 'bg-indigo-50 text-indigo-800 border border-indigo-200 font-black'
                          : !isLocked
                          ? 'bg-slate-100 text-slate-600 border border-slate-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {status === 'master'
                        ? 'מאסטר ⭐'
                        : status === 'completed'
                        ? 'הושלם ✓'
                        : isActive
                        ? 'פעיל 🎯'
                        : !isLocked
                        ? 'פתוח'
                        : 'נעול 🔒'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4) SHORTCUTS (3 CLEAN WHITE CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. תרגול יומי */}
        <div className="bg-white border border-slate-200/90 hover:border-emerald-200 p-5 rounded-3xl shadow-xs transition-all flex flex-col justify-between gap-4 group">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-2xs">
                <CalendarCheck className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                יומי ⭐
              </span>
            </div>
            <h3 className="text-base md:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
              תרגול יומי קצר
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              6 שאלות מותאמות בדיוק לרמה שלך לחיזוק מהיר של השברים.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartDailyPractice}
            className="w-full py-2.5 min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>התחל תרגול יומי</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 2. חיזוק ממוקד */}
        <div className="bg-white border border-slate-200/90 hover:border-amber-200 p-5 rounded-3xl shadow-xs transition-all flex flex-col justify-between gap-4 group">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-2xs">
                <Target className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                חיזוק 🎯
              </span>
            </div>
            <h3 className="text-base md:text-lg font-black text-slate-900 group-hover:text-amber-800 transition-colors mt-0.5">
              הנושא לחיזוק
            </h3>
            <p className="text-xs text-slate-800 font-bold">
              {recommendedTopic.title}
            </p>
            <p className="text-[11px] text-slate-500">{recommended.reason}</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onSelectTopicToLearn(recommendedTopic.id)}
              className="flex-1 py-2.5 min-h-[44px] bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 active:scale-95 cursor-pointer shadow-xs"
            >
              <span>ללמוד</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTopicToPractice(recommendedTopic.id)}
              className="flex-1 py-2.5 min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1 active:scale-95 cursor-pointer border border-slate-200"
            >
              <span>לתרגל</span>
            </button>
          </div>
        </div>

        {/* 3. היה אתה המורה */}
        <div className="bg-white border border-slate-200/90 hover:border-purple-200 p-5 rounded-3xl shadow-xs transition-all flex flex-col justify-between gap-4 group">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-2xs">
                <GraduationCap className="w-5 h-5 text-purple-700" />
              </span>
              <span className="text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-0.5 rounded-full">
                אתגר מיוחד 🧑‍🏫
              </span>
            </div>
            <h3 className="text-base md:text-lg font-black text-slate-900 group-hover:text-purple-800 transition-colors mt-0.5">
              היה אתה המורה!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              חברים לכיתה טעו בתרגילים – עזרו להם למצוא את הטעות ולתקן אותה.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenFindTheMistake}
            className="w-full py-2.5 min-h-[44px] bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>היכנס לכיתה</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5) DETAILED CHAPTERS LIST - Clean light cards */}
      <div className="flex flex-col gap-4 mt-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-black text-slate-900">
              כל פרקי הספר (שברים – חלק א׳)
            </h2>
            <p className="text-xs text-slate-500">
              גישה מהירה לכל 8 הפרקים, ההסברים המומחשים ודרגות התרגול:
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            8 פרקים
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {TOPICS.map((topic) => {
            const tp = progress.topicsProgress[topic.id];
            const mastery = getTopicMastery(tp);

            return (
              <div
                key={topic.id}
                className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200/90 hover:border-indigo-200 transition-all shadow-xs flex flex-col justify-between gap-3.5 group"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${topic.bgGradient} text-white flex items-center justify-center shrink-0 shadow-2xs`}
                  >
                    {getTopicIcon(topic.iconName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-400">פרק {topic.order}</span>
                      
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                          {[1, 2, 3, 4].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= (mastery.stars || 1)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${mastery.badgeClass}`}
                        >
                          {mastery.statusHebrew}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {topic.subtitle}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">התקדמות בפרק:</span>
                    <span className="font-black text-indigo-600">{mastery.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${mastery.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectTopicToLearn(topic.id)}
                    className="flex-1 py-2.5 min-h-[42px] bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs md:text-sm font-bold rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>ללמוד</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectTopicToPractice(topic.id)}
                    className="flex-1 py-2.5 min-h-[42px] bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs md:text-sm font-bold rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-indigo-600" />
                    <span>לתרגל</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};


