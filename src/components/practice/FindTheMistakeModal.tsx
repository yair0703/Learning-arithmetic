import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  ArrowLeft,
  GraduationCap,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FindTheMistakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MistakeChallenge {
  id: string;
  studentName: string;
  studentAvatar: string;
  chapterTitle: string;
  problemPrompt: string;
  fictionalWork: string;
  whyWrongQuestion: string;
  whyWrongOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctFixQuestion: string;
  correctFixOptions: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  teacherExplanation: string;
}

const CHALLENGES: MistakeChallenge[] = [
  {
    id: 'm1',
    studentName: 'רון',
    studentAvatar: '👦',
    chapterTitle: 'פעולות בשברים עם מכנים שווים',
    problemPrompt: 'פתרו את תרגיל החיבור: 2/6 + 3/6 = ?',
    fictionalWork: 'רון כתב במחברת: 2/6 + 3/6 = 5/12',
    whyWrongQuestion: 'המורה הצעיר, הבט בתשובה של רון. היכן הטעות שלו?',
    whyWrongOptions: [
      { id: 'o1', text: 'רון חיבר בטעות גם את המכנים (6+6=12) במקום להשאיר את המכנה ללא שינוי!', isCorrect: true },
      { id: 'o2', text: 'רון חיבר לא נכון את המונים (2+3 אינו 5).', isCorrect: false },
      { id: 'o3', text: 'אי אפשר בכלל לחבר שברים שיש להם אותו מכנה.', isCorrect: false }
    ],
    correctFixQuestion: 'מהי התשובה הנכונה שרון היה צריך לרשום?',
    correctFixOptions: [
      { id: 'f1', text: '5/6 (מחברים רק את המונים: 2+3=5, והמכנה 6 נשאר)', isCorrect: true },
      { id: 'f2', text: '5/12', isCorrect: false },
      { id: 'f3', text: '6/5', isCorrect: false }
    ],
    teacherExplanation: 'כל הכבוד מורה! המכנה הוא רק "שם החלק" (כמו שישיות). כשמחברים 2 שישיות ועוד 3 שישיות, מקבלים 5 שישיות (5/6)!'
  },
  {
    id: 'm2',
    studentName: 'דנה',
    studentAvatar: '👧',
    chapterTitle: 'שברים על ישר המספרים',
    problemPrompt: 'סמנו את השבר 3/4 על ישר המספרים בין 0 ל-1.',
    fictionalWork: 'דנה ספרה 4 קווים מ-0, וכך סימנה בטעות על השבר 4/5.',
    whyWrongQuestion: 'היכן הטעות של דנה בספירה על ישר המספרים?',
    whyWrongOptions: [
      { id: 'd1', text: 'דנה ספרה את הקווים עצמם במקום לספור את המרווחים השווים (הקפיצות) מ-0!', isCorrect: true },
      { id: 'd2', text: 'השבר 3/4 לא שייך בכלל בין 0 ל-1 אלא אחרי 1.', isCorrect: false },
      { id: 'd3', text: 'ישר המספרים חייב תמיד להתחיל מ-1 ולא מ-0.', isCorrect: false }
    ],
    correctFixQuestion: 'איך דנה צריכה למקם נכון את 3/4?',
    correctFixOptions: [
      { id: 'df1', text: 'לחלק את הקטע בין 0 ל-1 ל-4 מרווחים שווים, ולקפוץ 3 קפיצות מ-0', isCorrect: true },
      { id: 'df2', text: 'לספור 3 שנתות אחרי המספר 1', isCorrect: false },
      { id: 'df3', text: 'לסמן תמיד בדיוק באמצע הישר', isCorrect: false }
    ],
    teacherExplanation: 'מדויק! בישר המספרים תמיד סופרים צעדים/מרווחים ולא קווים. 3 צעדים מתוך 4 שווים מביאים אותנו בדיוק ל-3/4!'
  },
  {
    id: 'm3',
    studentName: 'עומר',
    studentAvatar: '🧒',
    chapterTitle: 'השבר כחלק משלם – השוואת שברים',
    problemPrompt: 'איזה שבר גדול יותר: 1/3 או 1/5?',
    fictionalWork: 'עומר אמר: "1/5 גדול יותר מ-1/3 כי המספר 5 גדול מהמספר 3!"',
    whyWrongQuestion: 'מדוע ההסבר של עומר שגוי?',
    whyWrongOptions: [
      { id: 'c1', text: 'בשברים, ככל שהמכנה גדול יותר, חילקנו ליותר חלקים ולכן כל חלק קטן יותר!', isCorrect: true },
      { id: 'c2', text: 'עומר צדק, 1/5 באמת גדול יותר מ-1/3.', isCorrect: false },
      { id: 'c3', text: 'אי אפשר להשוות בין שברים שיש להם מונה 1.', isCorrect: false }
    ],
    correctFixQuestion: 'מהי הקביעה הנכונה?',
    correctFixOptions: [
      { id: 'cf1', text: '1/3 גדול יותר מ-1/5 (שליש פיצה גדול יותר מחמישית פיצה)', isCorrect: true },
      { id: 'cf2', text: '1/5 גדול יותר מ-1/3', isCorrect: false },
      { id: 'cf3', text: 'שני השברים שווים', isCorrect: false }
    ],
    teacherExplanation: 'מעולה! תמיד כדאי לחשוב על פיצה: אם מחלקים פיצה ל-3 חברים, כל אחד מקבל חתיכה גדולה בהרבה מאשר אם נחלק אותה ל-5 חברים!'
  },
  {
    id: 'm4',
    studentName: 'מיה',
    studentAvatar: '👧',
    chapterTitle: 'השבר כחלק מכמות',
    problemPrompt: 'בקערה יש 20 תותים. תומר לקח 1/4 מהתותים. כמה תותים לקח תומר?',
    fictionalWork: 'מיה חישבה: 20 כפול 4 = 80 תותים!',
    whyWrongQuestion: 'היכן הטעות המרכזית בחישוב של מיה?',
    whyWrongOptions: [
      { id: 'm1', text: 'מיה כפלה ב-4 במקום לחלק ב-4! חלק מכמות חייב להיות קטן מהכמות הכוללת (20).', isCorrect: true },
      { id: 'm2', text: 'מיה הייתה צריכה לחבר 20 + 4.', isCorrect: false },
      { id: 'm3', text: 'אין שום טעות, תומר לקח 80 תותים.', isCorrect: false }
    ],
    correctFixQuestion: 'כמה תותים לקח תומר באמת?',
    correctFixOptions: [
      { id: 'mf1', text: '5 תותים (20 לחלק ל-4 שווה 5)', isCorrect: true },
      { id: 'mf2', text: '16 תותים (20 פחות 4)', isCorrect: false },
      { id: 'mf3', text: '10 תותים', isCorrect: false }
    ],
    teacherExplanation: 'בדיוק! רבע מכמות אומר שמחלקים את כל 20 התותים ל-4 קבוצות שוות. בכל קבוצה יש 5 תותים!'
  },
  {
    id: 'm5',
    studentName: 'תום',
    studentAvatar: '👦',
    chapterTitle: 'משבר מדומה למספר מעורב',
    problemPrompt: 'המירו את השבר המדומה 9/4 למספר מעורב.',
    fictionalWork: 'תום כתב: 9/4 = 1 ו-5/4',
    whyWrongQuestion: 'מה לא הושלם בתשובה של תום?',
    whyWrongOptions: [
      { id: 't1', text: 'במספר מעורב השבר חייב להיות שבר אמיתי (קטן מ-1). ב-9 רבעים נכנסים 2 שלמים שלמים!', isCorrect: true },
      { id: 't2', text: 'אי אפשר להמיר שבר של רבעים לשלמים.', isCorrect: false },
      { id: 't3', text: 'תום היה צריך להכפיל 9 כפול 4.', isCorrect: false }
    ],
    correctFixQuestion: 'מהו המספר המעורב המדויק?',
    correctFixOptions: [
      { id: 'tf1', text: '2 ו-1/4 (כי 8/4 הם 2 שלמים, ונשאר עוד 1/4)', isCorrect: true },
      { id: 'tf2', text: '1 ו-3/4', isCorrect: false },
      { id: 'tf3', text: '3 שלמים בדיוק', isCorrect: false }
    ],
    teacherExplanation: 'אלוף! 4/4 זה שלם ראשון, עוד 4/4 זה שלם שני (יחד 8/4 = 2 שלמים). נשאר עוד רבע אחד בודד, ולכן התוצאה היא 2 ו-1/4!'
  }
];

export const FindTheMistakeModal: React.FC<FindTheMistakeModalProps> = ({
  isOpen,
  onClose
}) => {
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [stage, setStage] = useState<'why' | 'fix' | 'feedback'>('why');
  const [selectedWhyId, setSelectedWhyId] = useState<string | null>(null);
  const [selectedFixId, setSelectedFixId] = useState<string | null>(null);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentChallenge = CHALLENGES[challengeIdx];

  const handleWhySubmit = () => {
    if (!selectedWhyId) return;
    const opt = currentChallenge.whyWrongOptions.find((o) => o.id === selectedWhyId);
    if (opt?.isCorrect) {
      setStage('fix');
    }
  };

  const handleFixSubmit = () => {
    if (!selectedFixId) return;
    const opt = currentChallenge.correctFixOptions.find((o) => o.id === selectedFixId);
    if (opt?.isCorrect) {
      setSolvedCount((prev) => prev + 1);
      setStage('feedback');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const handleNextChallenge = () => {
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx((prev) => prev + 1);
      setStage('why');
      setSelectedWhyId(null);
      setSelectedFixId(null);
    } else {
      setIsCompleted(true);
      try {
        confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
      } catch {}
    }
  };

  const handleReset = () => {
    setChallengeIdx(0);
    setStage('why');
    setSelectedWhyId(null);
    setSelectedFixId(null);
    setSolvedCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <GraduationCap className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-white/25 px-2.5 py-0.5 rounded-full font-bold">
                  היה אתה המורה 🧑‍🏫
                </span>
                <span className="text-xs text-teal-100">
                  אתגר {challengeIdx + 1} מתוך {CHALLENGES.length}
                </span>
              </div>
              <h2 className="text-lg font-black mt-0.5">מצא את הטעות ועזור לחבר!</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5">
          {!isCompleted ? (
            <>
              {/* Student Work Card */}
              <div className="bg-amber-50/80 border-2 border-amber-200 p-5 rounded-2xl shadow-xs relative flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-950">
                    <span className="text-2xl">{currentChallenge.studentAvatar}</span>
                    <span>המחברת של {currentChallenge.studentName}</span>
                  </div>
                  <span className="bg-white px-2.5 py-0.5 rounded-md border border-amber-200 text-amber-900 font-bold">
                    {currentChallenge.chapterTitle}
                  </span>
                </div>

                <div className="text-xs text-slate-600 font-medium">
                  <strong>משימת הכיתה:</strong> {currentChallenge.problemPrompt}
                </div>

                {/* Notebook simulation box */}
                <div className="bg-white p-4 rounded-xl border border-dashed border-amber-300 font-mono text-base font-bold text-amber-900 shadow-inner text-center">
                  ✏️ {currentChallenge.fictionalWork}
                </div>
              </div>

              {/* Stage 1: Identify WHY it's wrong */}
              {stage === 'why' && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm md:text-base font-black text-slate-900">
                    שלב 1: {currentChallenge.whyWrongQuestion}
                  </h3>
                  <div className="space-y-2">
                    {currentChallenge.whyWrongOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedWhyId(opt.id)}
                        className={`w-full p-3.5 rounded-xl border-2 text-right transition-all text-xs md:text-sm font-bold flex items-center justify-between ${
                          selectedWhyId === opt.id
                            ? 'border-teal-600 bg-teal-50 text-teal-950 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span>{opt.text}</span>
                        <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mr-2">
                          {selectedWhyId === opt.id && (
                            <span className="w-2.5 h-2.5 bg-teal-600 rounded-full" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleWhySubmit}
                    disabled={!selectedWhyId}
                    className={`mt-2 py-3 rounded-xl font-black text-sm transition-all active:scale-95 ${
                      selectedWhyId
                        ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    איתרתי את הטעות! המשך לתיקון הפתרון
                  </button>
                </div>
              )}

              {/* Stage 2: Correct the fix */}
              {stage === 'fix' && (
                <div className="flex flex-col gap-3 animate-in fade-in">
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-2.5 rounded-xl flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>כל הכבוד! זיהית את הסיבה לטעות במדויק. עכשיו בוא נתקן:</span>
                  </div>

                  <h3 className="text-sm md:text-base font-black text-slate-900">
                    שלב 2: {currentChallenge.correctFixQuestion}
                  </h3>
                  <div className="space-y-2">
                    {currentChallenge.correctFixOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedFixId(opt.id)}
                        className={`w-full p-3.5 rounded-xl border-2 text-right transition-all text-xs md:text-sm font-bold flex items-center justify-between ${
                          selectedFixId === opt.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span>{opt.text}</span>
                        <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mr-2">
                          {selectedFixId === opt.id && (
                            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleFixSubmit}
                    disabled={!selectedFixId}
                    className={`mt-2 py-3 rounded-xl font-black text-sm transition-all active:scale-95 ${
                      selectedFixId
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    אשר תיקון של המורה
                  </button>
                </div>
              )}

              {/* Stage 3: Teacher Feedback */}
              {stage === 'feedback' && (
                <div className="bg-emerald-50 border-2 border-emerald-300 p-5 rounded-2xl flex flex-col gap-3 text-emerald-950 animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-black text-base mb-1">
                        עבודה מעולה מורה! הדרכת את {currentChallenge.studentName} להצלחה! 🌟
                      </h4>
                      <p className="text-xs md:text-sm leading-relaxed text-emerald-900">
                        {currentChallenge.teacherExplanation}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-emerald-200">
                    <button
                      type="button"
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs md:text-sm rounded-xl shadow-md flex items-center gap-2 active:scale-95"
                    >
                      <span>
                        {challengeIdx === CHALLENGES.length - 1
                          ? 'קבלת תעודת מורה מצטיין'
                          : 'לאתגר הבא של תלמיד אחר'}
                      </span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Completed Diploma */
            <div className="bg-white p-6 rounded-3xl text-center flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                  תעודת כבוד 📜
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2 mb-1">
                  מורה מצטיין למתמטיקה! 🎓
                </h2>
                <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  הצלחת לאתר ולתקן את כל 5 הטעויות הנפוצות של חבריך לכיתה.
                  מי שיודע לזהות טעויות של אחרים ולהסביר אותן – מבין את השברים בצורה העמוקה
                  ביותר!
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>התחל שוב מהתחלה</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs md:text-sm rounded-xl shadow-md active:scale-95"
                >
                  סגור וחזור ללימוד
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
