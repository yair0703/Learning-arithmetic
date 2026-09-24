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
  Check,
  TrendingUp,
  User,
  KeyRound
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
  const recommended = getRecommendedTopicToReinforce(progress);
  const recommendedTopic = TOPICS.find((t) => t.id === recommended.topicId) || TOPICS[1];

  const isStudent = userProfile?.role === 'student' && Boolean(userProfile?.displayName);

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'PieChart':
        return <PieChart className="w-5 h-5" />;
      case 'Ruler':
        return <Ruler className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'PlusCircle':
        return <PlusCircle className="w-5 h-5" />;
      case 'Coins':
        return <Coins className="w-5 h-5" />;
      case 'HelpCircle':
        return <HelpCircle className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const scrollToChapters = () => {
    const el = document.getElementById('chapters-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-2" id="home-screen">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-6 md:p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>מסלולים פלוס – כיתה ה׳ | שברים – חלק א׳</span>
            {userProfile?.studentCode && (
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-mono">
                קוד אישי: {userProfile.studentCode}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-1">
            {userProfile?.displayName ? `שלום ${userProfile.displayName}! 👋 מה נלמד היום?` : 'היי! 👋 מה נלמד היום?'}
          </h1>
          <p className="text-sm md:text-base text-indigo-100 max-w-xl leading-relaxed">
            המורה הדיגיטלי האישי שלך לחזרה, המחשות ותרגול מהנה של שברים.
          </p>
        </div>

        {/* Action badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenFindTheMistake}
            className="px-4 py-2.5 bg-teal-500/90 hover:bg-teal-500 text-white rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all shadow-xs border border-teal-300/40 cursor-pointer active:scale-95"
          >
            <GraduationCap className="w-4 h-4 text-teal-100" />
            <span>היה אתה המורה 🧑‍🏫</span>
          </button>
          
          <button
            type="button"
            onClick={onOpenSandbox}
            className="px-4 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-xs border border-white/20 text-white rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>מעבדת שברים 🧪</span>
          </button>

          {!isStudent && (
            <>
              <button
                type="button"
                onClick={onOpenReinforcement}
                className="px-4 py-2.5 bg-amber-500/90 hover:bg-amber-500 text-white rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all shadow-xs border border-amber-300/40 cursor-pointer active:scale-95"
              >
                <Target className="w-4 h-4 text-amber-100" />
                <span>חיזוק נושאים</span>
              </button>
              <button
                type="button"
                onClick={onOpenParentArea}
                className="px-4 py-2.5 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-xs border border-white/20 text-white rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>אזור הורה</span>
              </button>
            </>
          )}
        </div>

        {/* Decorative circle */}
        <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none blur-xl" />
      </div>

      {/* 3 Quick Action Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. תרגול יומי */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 p-5 rounded-3xl shadow-xs flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <CalendarCheck className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold bg-emerald-200/70 text-emerald-800 px-2 py-0.5 rounded-full">
                מומלץ היום ⭐
              </span>
            </div>
            <h2 className="text-lg font-black text-emerald-950 mt-1">תרגול יומי קצר</h2>
            <p className="text-xs text-emerald-800 leading-relaxed">
              מסלול של 6 שאלות מותאמות בדיוק לרמה שלך, לחיזוק מהיר של החומר.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartDailyPractice}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black rounded-xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>התחל תרגול יומי</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 2. בלוק אמצעי: לתלמיד מחובר -> מעבדת שברים ולמידה | להורה/אורח -> חיזוק ממוקד */}
        {isStudent ? (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 p-5 rounded-3xl shadow-xs flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </span>
                <span className="text-[11px] font-bold bg-purple-200/70 text-purple-900 px-2 py-0.5 rounded-full">
                  מעבדה אינטראקטיבית 🎨
                </span>
              </div>
              <h2 className="text-lg font-black text-purple-950 mt-1">
                מעבדת השברים החזותית
              </h2>
              <p className="text-xs text-purple-900 leading-relaxed font-medium">
                התנסות חופשית בצביעה, פסי שברים, עיגולים וישר מספרים.
              </p>
              <p className="text-[11px] text-purple-700/90">
                ראו בזמן אמת שברים שווים, שברים מדומים ומספרים מעורבים!
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenSandbox}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-black rounded-xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <span>פתח מעבדת שברים</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-5 rounded-3xl shadow-xs flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                  <Target className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold bg-amber-200/70 text-amber-800 px-2 py-0.5 rounded-full">
                  חיזוק ממוקד 🎯
                </span>
              </div>
              <h2 className="text-lg font-black text-amber-950 mt-1">
                הנושא שאני צריך לחזק
              </h2>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                {recommendedTopic.title}
              </p>
              <p className="text-[11px] text-amber-800/90">{recommended.reason}</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onSelectTopicToLearn(recommendedTopic.id)}
                  className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                >
                  <span>ללמוד מחדש</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectTopicToPractice(recommendedTopic.id)}
                  className="flex-1 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                >
                  <span>לתרגל</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onOpenReinforcement}
                className="w-full py-1.5 text-center text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-400 cursor-pointer"
              >
                לכל הנושאים הדורשים שיפור ←
              </button>
            </div>
          </div>
        )}

        {/* 3. התקדמות שלי */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 p-5 rounded-3xl shadow-xs flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <BarChart2 className="w-5 h-5" />
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                רצף {progress.dailyStreak} ימים
              </span>
            </div>

            <h2 className="text-lg font-black text-indigo-950">ההתקדמות שלי</h2>

            <div className="grid grid-cols-2 gap-2 text-center mt-1">
              <div className="bg-white/80 p-2 rounded-xl border border-indigo-100">
                <div className="text-lg font-black text-indigo-900">{progress.totalSolved}</div>
                <div className="text-[10px] text-slate-500">תרגילים שפתרתי</div>
              </div>
              <div className="bg-white/80 p-2 rounded-xl border border-indigo-100">
                <div className="text-lg font-black text-emerald-600">
                  {progress.totalSolved > 0
                    ? Math.round((progress.totalCorrect / progress.totalSolved) * 100)
                    : 100}
                  %
                </div>
                <div className="text-[10px] text-slate-500">דיוק והצלחה</div>
              </div>
            </div>

            {/* Overall Curriculum Mastery Bar */}
            {(() => {
              const totalMastery = Math.round(
                TOPICS.reduce((sum, t) => sum + getTopicMastery(progress.topicsProgress[t.id]).percentage, 0) /
                  TOPICS.length
              );
              return (
                <div className="bg-white/70 p-2 rounded-xl border border-indigo-100 flex flex-col gap-1 text-right">
                  <div className="flex justify-between items-center text-[11px] font-bold text-indigo-900">
                    <span>שליטה כוללת בספר:</span>
                    <span>{totalMastery}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all"
                      style={{ width: `${totalMastery}%` }}
                    />
                  </div>
                </div>
              );
            })()}
          </div>

          {isStudent ? (
            <button
              type="button"
              onClick={scrollToChapters}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>המשך למידה בפרקי הספר ↓</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenParentArea}
              className="w-full py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>לצפייה בדוח מלא</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* "Be the Teacher" Interactive Challenge Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white p-5 md:p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 text-white">
            <GraduationCap className="w-8 h-8 text-teal-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-900 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                אתגר מיוחד ⭐
              </span>
              <span className="text-xs text-teal-100 font-bold">לימוד דרך שגיאות של אחרים</span>
            </div>
            <h3 className="text-lg md:text-xl font-black mt-1">
              היה אתה המורה: מצא את הטעות של רון, דנה ועומר!
            </h3>
            <p className="text-xs md:text-sm text-teal-100 max-w-xl leading-relaxed mt-0.5">
              חברים לכיתה פתרו תרגילים וטעו בטעויות הנפוצות ביותר. עזור להם להבין היכן שגו, תקן את התשובה וזכה בתעודת מורה מצטיין!
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenFindTheMistake}
          className="w-full md:w-auto px-6 py-3 bg-white hover:bg-teal-50 text-teal-900 font-black text-sm rounded-xl shadow-md transition-all active:scale-95 shrink-0 flex items-center justify-center gap-2"
        >
          <span>היכנס לכיתה</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Chapters & Topics Grid (פרק שברים – חלק א׳) */}
      <div className="flex flex-col gap-4" id="chapters-section">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              פרקי הלימוד בספר (שברים – חלק א׳)
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              בחרו נושא כדי ללמוד בהסברים מומחשים או לגשת ישירות לתרגול:
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            8 נושאי לימוד
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOPICS.map((topic) => {
            const tp = progress.topicsProgress[topic.id];
            const solved = tp?.exercisesSolved || 0;
            const correct = tp?.correctCount || 0;
            const mastery = getTopicMastery(tp);

            return (
              <div
                key={topic.id}
                className="bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-indigo-300 transition-all shadow-xs flex flex-col justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.bgGradient} text-white flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {getTopicIcon(topic.iconName)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400">פרק {topic.order}</span>
                      
                      {/* Topic Mastery Status & Stars */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= mastery.stars
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

                    <h3 className="text-base md:text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {topic.subtitle}
                    </p>
                  </div>
                </div>

                {/* 3-Stage Progress Checklist */}
                <div className="bg-slate-50/90 p-3 rounded-2xl border border-slate-100 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                      מד שליטה בנושא:
                    </span>
                    <span className="font-black text-indigo-600">{mastery.percentage}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${mastery.percentage}%` }}
                    />
                  </div>

                  {/* 3 Stages Badges */}
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] pt-1 border-t border-slate-200/60">
                    <div
                      className={`py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 font-semibold ${
                        tp?.completedUnderstand
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3 h-3 ${tp?.completedUnderstand ? 'text-emerald-600' : 'text-slate-300'}`}
                      />
                      <span>1. הבנה</span>
                    </div>

                    <div
                      className={`py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 font-semibold ${
                        tp?.completedTogether
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3 h-3 ${tp?.completedTogether ? 'text-emerald-600' : 'text-slate-300'}`}
                      />
                      <span>2. ביחד</span>
                    </div>

                    <div
                      className={`py-1 px-1.5 rounded-lg flex items-center justify-center gap-1 font-semibold ${
                        solved > 0
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Award
                        className={`w-3 h-3 ${solved > 0 ? 'text-indigo-600' : 'text-slate-300'}`}
                      />
                      <span>3. תרגול ({solved})</span>
                    </div>
                  </div>
                </div>

                {/* Two distinct action buttons per topic */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectTopicToLearn(topic.id)}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs md:text-sm font-black rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>ללמוד</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectTopicToPractice(topic.id)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs md:text-sm font-black rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-4 h-4 text-indigo-600" />
                    <span>לתרגל ({mastery.levelLabel.split(' ')[0]})</span>
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
