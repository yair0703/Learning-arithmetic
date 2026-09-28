import React from 'react';
import { TopicInfo, StudentProgress } from '../../types';
import { getTopicCumulativeProgressStatus } from '../../utils/storage';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  Play,
  Target,
  Flame,
  X
} from 'lucide-react';

interface TopicLevelRoadmapProps {
  topic: TopicInfo;
  progress: StudentProgress;
  onSelectLevel: (levelNumber: 1 | 2 | 3 | 4) => void;
  onClose: () => void;
}

export const TopicLevelRoadmap: React.FC<TopicLevelRoadmapProps> = ({
  topic,
  progress,
  onSelectLevel,
  onClose
}) => {
  const cumulativeStatus = getTopicCumulativeProgressStatus(progress, topic.id);

  const levelDescriptions: Record<1 | 2 | 3 | 4, string> = {
    1: 'זיהוי והבנה בסיסית של מושג השבר, המכנה והמונה.',
    2: 'יישום מודרך, חישובים ותרגילים ברמת מיומנות בינונית.',
    3: 'שאלות אתגר, בעיות מילוליות ושליטה מלאה בנושא.',
    4: 'שאלות מאסטר זהובות – אתגר גבוה עם איורים ומלכודות חשיבה.'
  };

  return (
    <div
      className="bg-white text-slate-900 rounded-3xl p-5 md:p-8 shadow-2xl border border-indigo-100 max-w-3xl w-full mx-auto flex flex-col gap-6 relative overflow-hidden"
      dir="rtl"
      id="topic-level-roadmap"
    >
      {/* Prominent Close Button (X) */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 left-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs z-20 active:scale-95"
        aria-label="סגור מפת רמות"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 pt-2 pl-12">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              מפת הרמות והתרגילים 🗺️
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full">
              שליטה בפרק: {cumulativeStatus.masteryPercentage}%
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
            {topic.title}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-0.5">
            פתרו את השאלות ברצף כדי לפתוח את הרמות הבאות ולזכות בכוכבים!
          </p>
        </div>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
          <div className="text-[11px] text-slate-500 font-medium">סך הכל נפתרו</div>
          <div className="text-lg md:text-xl font-black text-slate-800 mt-0.5">
            {cumulativeStatus.totalExercisesSolved} <span className="text-xs font-normal text-slate-500">שאלות</span>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center">
          <div className="text-[11px] text-emerald-700 font-medium">תשובות נכונות</div>
          <div className="text-lg md:text-xl font-black text-emerald-800 mt-0.5">
            {cumulativeStatus.totalCorrectAnswers} <span className="text-xs font-normal">מתוכן</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center">
          <div className="text-[11px] text-amber-800 font-medium">אחוז דיוק</div>
          <div className="text-lg md:text-xl font-black text-amber-900 mt-0.5">
            {cumulativeStatus.overallAccuracyRate}%
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 text-center">
          <div className="text-[11px] text-indigo-700 font-medium">רמה פתוחה כעת</div>
          <div className="text-lg md:text-xl font-black text-indigo-900 mt-0.5">
            {cumulativeStatus.currentUnlockedLevel === 4
              ? 'מאסטר ⭐'
              : `רמה ${cumulativeStatus.currentUnlockedLevel}`}
          </div>
        </div>
      </div>

      {/* Gamified Roadmap Path Steps */}
      <div className="flex flex-col gap-5 my-1">
        {cumulativeStatus.levelsProgress.map((lvlProg, idx) => {
          const isCurrent = lvlProg.isCurrentLevel;
          const isUnlocked = lvlProg.isUnlocked;
          const isCompleted = lvlProg.isCompleted;
          const isMaster = lvlProg.levelNumber === 4;

          const progressPercent = Math.min(
            100,
            Math.round((lvlProg.correctCount / lvlProg.requiredCorrectToPass) * 100)
          );

          return (
            <div key={lvlProg.levelNumber} className="relative flex flex-col md:flex-row items-stretch gap-4">
              {/* Connecting Path Line */}
              {idx < cumulativeStatus.levelsProgress.length - 1 && (
                <div className="hidden md:block absolute right-7 top-16 bottom-0 w-1 bg-slate-200 z-0" />
              )}

              {/* Station Node Badge */}
              <div className="flex items-center gap-3 md:flex-col md:items-center justify-start shrink-0 z-10">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all shadow-sm ${
                    isMaster && isUnlocked
                      ? 'bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-amber-300 ring-4 ring-amber-200'
                      : isCompleted
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-emerald-200 ring-4 ring-emerald-100'
                      : isCurrent
                      ? 'bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 shadow-amber-200 ring-4 ring-amber-100 animate-pulse'
                      : isUnlocked
                      ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-indigo-100'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : isMaster && isUnlocked ? (
                    <Sparkles className="w-7 h-7 text-amber-950" />
                  ) : isCurrent ? (
                    <Target className="w-7 h-7" />
                  ) : isUnlocked ? (
                    <Unlock className="w-6 h-6" />
                  ) : (
                    <Lock className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                <div className="md:text-center">
                  <div className={`text-xs font-black ${isMaster ? 'text-amber-700' : 'text-slate-700'}`}>
                    {isMaster ? 'מאסטר ⭐' : `רמה ${lvlProg.levelNumber}`}
                  </div>
                  <div
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 inline-block ${
                      isMaster && isUnlocked
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isCurrent
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : isUnlocked
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {lvlProg.statusHebrew}
                  </div>
                </div>
              </div>

              {/* Station Level Card */}
              <div
                className={`flex-1 rounded-2xl p-5 border transition-all flex flex-col justify-between gap-4 ${
                  isMaster && isUnlocked
                    ? 'bg-gradient-to-r from-amber-50/90 via-yellow-50/60 to-amber-50/90 border-amber-400 shadow-md shadow-amber-100 ring-1 ring-amber-300'
                    : isCurrent
                    ? 'bg-gradient-to-r from-amber-50/80 to-indigo-50/80 border-amber-300 shadow-md shadow-amber-100'
                    : isCompleted
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isUnlocked
                    ? 'bg-white border-slate-200 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2">
                      <span>{lvlProg.levelTitle}</span>
                      {isMaster && (
                        <span className="text-[10px] bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black px-2 py-0.5 rounded-md uppercase shadow-xs">
                          ⭐ זהב
                        </span>
                      )}
                      {isCurrent && !isMaster && (
                        <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-md uppercase">
                          רמה פעילה
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {levelDescriptions[lvlProg.levelNumber]}
                    </p>
                  </div>

                  {/* Level Questions Count Badge */}
                  <div className={`border rounded-xl px-3 py-1.5 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs ${
                    isMaster ? 'bg-amber-100/80 border-amber-300 text-amber-900' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    {lvlProg.correctCount} / {lvlProg.requiredCorrectToPass} תשובות נכונות לפתיחה
                  </div>
                </div>

                {/* Progress Bar for this Level */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-medium">
                      התקדמות ברמה: {lvlProg.solvedCount} שאלות נענו
                    </span>
                    <span className={`font-bold ${isMaster ? 'text-amber-700' : 'text-indigo-700'}`}>
                      {progressPercent}% הושלמו
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isMaster
                          ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500'
                          : isCompleted
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : isCurrent
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Level Action Button */}
                <div className="pt-1 flex items-center justify-between gap-3">
                  <div className="text-xs">
                    {!isUnlocked ? (
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        השלם 3 תשובות נכונות ברמה {lvlProg.levelNumber === 4 ? '3' : lvlProg.levelNumber - 1} לפתיחה
                      </span>
                    ) : isCompleted ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        רמה זו הושלמה בהצלחה! ניתן לתרגל שוב לחיזוק.
                      </span>
                    ) : (
                      <span className="text-amber-800 font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        דרושות עוד {Math.max(0, lvlProg.requiredCorrectToPass - lvlProg.correctCount)} תשובות נכונות
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={!isUnlocked}
                    onClick={() => onSelectLevel(lvlProg.levelNumber)}
                    className={`px-5 py-2.5 rounded-xl font-black text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                      isMaster && isUnlocked
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-md shadow-amber-200 active:scale-95 ring-2 ring-amber-300'
                        : isCurrent
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md shadow-amber-200 active:scale-95'
                        : isCompleted
                        ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
                        : isUnlocked
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {!isUnlocked ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>רמה נעולה</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>
                          {isCurrent
                            ? isMaster
                              ? 'המשך תרגול מאסטר ⭐'
                              : `המשך תרגול ברמה ${lvlProg.levelNumber}`
                            : isCompleted
                            ? isMaster
                              ? 'תרגל שוב מאסטר ⭐'
                              : `תרגל שוב ברמה ${lvlProg.levelNumber}`
                            : isMaster
                            ? 'התחל מאסטר ⭐'
                            : `התחל רמה ${lvlProg.levelNumber}`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Close Button */}
      <div className="pt-2 border-t border-slate-100 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
        >
          סגור וחזור לתרגילים
        </button>
      </div>
    </div>
  );
};
