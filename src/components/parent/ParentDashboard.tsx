import React, { useState } from 'react';
import { StudentProgress, ParentDiagnosticInsight } from '../../types';
import { TOPICS } from '../../data/curriculumData';
import { generateParentDiagnosticReport, seedDemoProgress, getInitialProgress, saveStudentProgress } from '../../utils/storage';
import {
  ShieldCheck,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  BarChart2,
  BookOpen,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface ParentDashboardProps {
  progress: StudentProgress;
  onProgressUpdate: (newProg: StudentProgress) => void;
  onBackToStudent: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  progress,
  onProgressUpdate,
  onBackToStudent
}) => {
  const [report, setReport] = useState<ParentDiagnosticInsight>(() =>
    generateParentDiagnosticReport(progress)
  );

  const handleSeedDemo = () => {
    const demo = seedDemoProgress();
    onProgressUpdate(demo);
    setReport(generateParentDiagnosticReport(demo));
  };

  const handleResetProgress = () => {
    if (window.confirm('האם לאפס את כל נתוני התרגול?')) {
      const initial = getInitialProgress();
      saveStudentProgress(initial);
      onProgressUpdate(initial);
      setReport(generateParentDiagnosticReport(initial));
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-2" id="parent-dashboard">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 md:p-8 rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-full font-bold">
                אזור הורים ומורים
              </span>
              <span className="text-xs text-slate-400">תכנית מסלולים פלוס – כיתה ה׳</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black mt-1">דוח פדגוגי וניתוח התקדמות</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToStudent}
          className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-xs shrink-0"
        >
          <span>חזרה למסך התלמיד</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-indigo-500" />
            תרגילים שנפתרו
          </span>
          <span className="text-2xl md:text-3xl font-black text-slate-900 font-mono">
            {progress.totalSolved}
          </span>
          <span className="text-[11px] text-slate-400">מתוכם {progress.totalCorrect} נכונים</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-500" />
            אחוז הצלחה כללי
          </span>
          <span className="text-2xl md:text-3xl font-black text-emerald-600 font-mono">
            {report.accuracyRate}%
          </span>
          <span className="text-[11px] text-slate-400">לפי נסיונות ראשונים</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-sky-500" />
            זמן תרגול מצטבר
          </span>
          <span className="text-lg md:text-xl font-black text-slate-800">
            {report.totalPracticeTimeFormatted}
          </span>
          <span className="text-[11px] text-slate-400">זמן אימון איכותי</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-1">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            רצף ימי למידה
          </span>
          <span className="text-2xl md:text-3xl font-black text-amber-600 font-mono">
            {progress.dailyStreak} ימים
          </span>
          <span className="text-[11px] text-slate-400">התמדה מומלצת</span>
        </div>
      </div>

      {/* Main Pedagogical Insight Highlight Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 p-6 rounded-3xl shadow-xs flex flex-col gap-4">
        <div className="flex items-center gap-2.5 text-indigo-900 font-black text-lg">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h2>אבחון פדגוגי אישי (מעבר לציון בלבד)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>נושאים ומיומנויות שהילד שולט בהם:</span>
            </div>
            <ul className="space-y-1.5 text-xs md:text-sm text-slate-700">
              {report.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Struggles */}
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>נושאים וסוגי שאלות שכדאי לחזק:</span>
            </div>
            <ul className="space-y-1.5 text-xs md:text-sm text-slate-700">
              {report.struggles.map((strug, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{strug}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Practical tips for helping at home */}
        <div className="bg-white p-4 rounded-2xl border border-indigo-100 flex flex-col gap-2">
          <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            כיצד לעזור לילד בבית (טיפים פרקטיים):
          </span>
          <div className="space-y-2 text-xs md:text-sm text-slate-700 leading-relaxed">
            {report.pedagogicalAdvice.map((advice, i) => (
              <p key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                {advice}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Topics Progress Breakdown */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          התקדמות לפי פרקי הלימוד (שברים – חלק א׳):
        </h3>

        <div className="space-y-3">
          {TOPICS.map((t) => {
            const tp = progress.topicsProgress[t.id];
            const solved = tp?.exercisesSolved || 0;
            const correct = tp?.correctCount || 0;
            const rate = solved > 0 ? Math.round((correct / solved) * 100) : 0;
            const level = tp?.currentLevel || 1;

            return (
              <div
                key={t.id}
                className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-300 bg-slate-50/70 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {t.order}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{t.title}</h4>
                    <p className="text-xs text-slate-500">{t.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex flex-col items-end text-xs">
                    <span className="font-bold text-slate-700">
                      {solved > 0 ? `${rate}% הצלחה (${correct}/${solved})` : 'טרם תורגל'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      רמת קושי נוכחית: {level === 1 ? 'בסיסית' : level === 2 ? 'בינונית' : 'מתקדמת'}
                    </span>
                  </div>

                  <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        rate >= 80 ? 'bg-emerald-500' : rate >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${solved > 0 ? Math.max(10, rate) : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Log Analysis */}
      {report.recentErrors.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            סוגי שאלות שגרמו לטעויות לאחרונה (לצורך חיזוק ממוקד):
          </h3>

          <div className="space-y-2.5">
            {report.recentErrors.map((err, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-xs md:text-sm text-slate-800"
              >
                <div className="font-bold text-amber-900 mb-1">{err.topicName}:</div>
                <p className="text-slate-700 mb-1">{err.mistakeSummary}</p>
                {err.howToHelpAtHome && (
                  <p className="text-amber-800 font-medium">
                    🔍 זיהוי הקושי: {err.howToHelpAtHome}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parent utilities & mock data */}
      <div className="bg-slate-100 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div>
          <span>כלי עזר להורים: ניתן להציג דוח לדוגמה עם נתוני תלמיד אמיתיים או לאפס נתונים.</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSeedDemo}
            className="px-3 py-1.5 bg-white hover:bg-slate-200 text-slate-800 font-bold rounded-lg border border-slate-300"
          >
            טען נתוני הדגמה לדוח
          </button>
          <button
            type="button"
            onClick={handleResetProgress}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg border border-rose-200"
          >
            איפוס נתונים
          </button>
        </div>
      </div>
    </div>
  );
};
