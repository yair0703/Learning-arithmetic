import React, { useState } from 'react';
import { TopicId, StudentProgress, Exercise } from '../../types';
import {
  getTopicsNeedingImprovement,
  generateTargetedBoosterExercises,
  recordExerciseAttempt,
  TopicImprovementDetail,
  seedDemoProgress
} from '../../utils/storage';
import { FractionBarVisualizer } from '../visuals/FractionBarVisualizer';
import { FractionCircleVisualizer } from '../visuals/FractionCircleVisualizer';
import { InteractiveNumberLine } from '../visuals/InteractiveNumberLine';
import { MixedFractionVisualizer } from '../visuals/MixedFractionVisualizer';
import { QuantityGroupVisualizer } from '../visuals/QuantityGroupVisualizer';
import { DecimalTableVisualizer } from '../visuals/DecimalTableVisualizer';
import {
  Target,
  Sparkles,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Zap,
  HelpCircle,
  Trophy,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReinforcementViewProps {
  progress: StudentProgress;
  onProgressUpdate: (newProg: StudentProgress) => void;
  onNavigateToTopicLearn: (topicId: TopicId) => void;
  onBackToHome: () => void;
  onOpenSandbox: () => void;
}

export const ReinforcementView: React.FC<ReinforcementViewProps> = ({
  progress,
  onProgressUpdate,
  onNavigateToTopicLearn,
  onBackToHome,
  onOpenSandbox
}) => {
  const topicsNeedingImprovement = getTopicsNeedingImprovement(progress);

  // Active booster drill state
  const [activeDrillExercises, setActiveDrillExercises] = useState<Exercise[] | null>(null);
  const [drillTopicTitle, setDrillTopicTitle] = useState<string>('');
  const [currentDrillIndex, setCurrentDrillIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [hintStep, setHintStep] = useState<number>(0);
  const [drillSuccessCount, setDrillSuccessCount] = useState<number>(0);
  const [isDrillFinished, setIsDrillFinished] = useState<boolean>(false);

  // Start targeted drill for specific topic or all weak topics
  const startBoosterDrill = (topicId?: TopicId, customTitle?: string) => {
    const exercises = generateTargetedBoosterExercises(progress, topicId, 5);
    setActiveDrillExercises(exercises);
    setDrillTopicTitle(customTitle || (topicId ? 'אימון ממוקד בנושא' : 'אימון חיזוק כולל'));
    setCurrentDrillIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedbackMessage('');
    setHintStep(0);
    setDrillSuccessCount(0);
    setIsDrillFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDrillSubmit = () => {
    if (!activeDrillExercises || !selectedOptionId) return;
    const currentEx = activeDrillExercises[currentDrillIndex];
    const opt = currentEx.options?.find((o) => o.id === selectedOptionId);
    const correct = !!opt?.isCorrect;

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setDrillSuccessCount((prev) => prev + 1);
      setFeedbackMessage('הצלחת! 👏 כל הכבוד, רואים שהחומר מתחיל להתחבר פיקס!');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } else {
      setFeedbackMessage(
        opt?.misconceptionExplanation ||
          currentEx.gentleWrongFeedback.default ||
          'לא נורא, בוא נבדוק יחד.'
      );
    }

    const correctOption = currentEx.options?.find((o) => o.isCorrect);
    const updated = recordExerciseAttempt(progress, {
      topicId: currentEx.topicId,
      exerciseId: currentEx.id,
      skillTag: currentEx.skillTag,
      isCorrect: correct,
      questionPrompt: currentEx.prompt,
      studentAnswer: opt?.label || selectedOptionId,
      correctAnswer: correctOption?.label || '',
      misconceptionNote: opt?.misconceptionExplanation
    });

    onProgressUpdate(updated);
  };

  const handleDrillNext = () => {
    if (!activeDrillExercises) return;
    if (currentDrillIndex < activeDrillExercises.length - 1) {
      setCurrentDrillIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setFeedbackMessage('');
      setHintStep(0);
    } else {
      setIsDrillFinished(true);
      try {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      } catch {}
    }
  };

  const handleExitDrill = () => {
    setActiveDrillExercises(null);
    setIsDrillFinished(false);
  };

  const handleLoadDemoForTesting = () => {
    const demo = seedDemoProgress();
    onProgressUpdate(demo);
  };

  // If a booster drill is active, render the drill workspace
  if (activeDrillExercises && activeDrillExercises.length > 0) {
    const currentEx = activeDrillExercises[currentDrillIndex];

    return (
      <div className="flex flex-col gap-5 max-w-3xl mx-auto py-2" id="booster-drill-active">
        {/* Drill Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-white/25 px-2.5 py-0.5 rounded-full font-bold">
                  {drillTopicTitle}
                </span>
                <span className="text-xs text-amber-100">
                  שאלה {currentDrillIndex + 1} מתוך {activeDrillExercises.length}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black mt-0.5">אימון חיזוק ממוקד</h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExitDrill}
            className="text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl transition-colors"
          >
            יציאה מהאימון
          </button>
        </div>

        {/* Drill Progress Bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-amber-500 h-full transition-all duration-300 rounded-full"
            style={{
              width: `${((currentDrillIndex + (isAnswered ? 1 : 0)) / activeDrillExercises.length) * 100}%`
            }}
          />
        </div>

        {!isDrillFinished ? (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
              <span className="bg-amber-50 text-amber-800 font-bold px-2.5 py-0.5 rounded-md border border-amber-200">
                🎯 שאלת חיזוק למיומנות זו
              </span>
              <span>רמת קושי: {currentEx.difficulty === 1 ? 'בסיס' : currentEx.difficulty === 2 ? 'בינוני' : 'מתקדם'}</span>
            </div>

            <h2 className="text-base md:text-lg font-bold text-slate-800 text-center leading-relaxed">
              {currentEx.prompt}
            </h2>

            {/* Visualizer */}
            <div className="flex justify-center my-1">
              {currentEx.visualType === 'bar' && (
                <FractionBarVisualizer
                  totalParts={currentEx.visualProps.totalParts}
                  coloredParts={currentEx.visualProps.coloredParts}
                  color={currentEx.visualProps.color || '#f59e0b'}
                />
              )}

              {currentEx.visualType === 'circle' && (
                <FractionCircleVisualizer
                  totalParts={currentEx.visualProps.totalParts}
                  coloredParts={currentEx.visualProps.coloredParts}
                  color={currentEx.visualProps.color || '#f59e0b'}
                  size={180}
                />
              )}

              {currentEx.visualType === 'number-line' && (
                <InteractiveNumberLine
                  min={currentEx.visualProps.min ?? 0}
                  max={currentEx.visualProps.max ?? 1}
                  divisions={currentEx.visualProps.divisions ?? 4}
                  targetIndex={currentEx.visualProps.targetIndex}
                  dotColor="#f59e0b"
                />
              )}

              {currentEx.visualType === 'mixed-bars' && (
                <MixedFractionVisualizer
                  wholeCount={currentEx.visualProps.wholeCount ?? 2}
                  remainder={currentEx.visualProps.remainder ?? 1}
                  denom={currentEx.visualProps.denom ?? 3}
                  color="#f59e0b"
                />
              )}

              {currentEx.visualType === 'quantity' && (
                <QuantityGroupVisualizer
                  totalItems={currentEx.visualProps.totalItems ?? 12}
                  groups={currentEx.visualProps.groups ?? 4}
                  itemsPerGroup={currentEx.visualProps.itemsPerGroup ?? 3}
                  selectedGroups={currentEx.visualProps.selectedGroups ?? 1}
                  itemName={currentEx.visualProps.itemName || 'עצמים'}
                />
              )}

              {currentEx.visualType === 'decimal-table' && (
                <DecimalTableVisualizer
                  before={currentEx.visualProps.before}
                  op={currentEx.visualProps.op}
                  after={currentEx.visualProps.after}
                  interactive={false}
                />
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentEx.options?.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOptionId(opt.id)}
                    disabled={isAnswered && isCorrect}
                    className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between text-base font-bold select-none ${
                      isSelected
                        ? isAnswered
                          ? opt.isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300'
                            : 'border-amber-400 bg-amber-50 text-amber-900'
                          : 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs">
                      {isSelected && (
                        <span
                          className={`w-3 h-3 rounded-full ${
                            isAnswered && opt.isCorrect ? 'bg-emerald-600' : 'bg-amber-500'
                          }`}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action */}
            {!isAnswered ? (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleDrillSubmit}
                  disabled={!selectedOptionId}
                  className={`px-10 py-3.5 rounded-2xl font-black text-base shadow-md transition-all active:scale-95 ${
                    selectedOptionId
                      ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer shadow-amber-500/25'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  בדוק את התשובה שלי
                </button>
              </div>
            ) : (
              <div
                className={`p-5 rounded-2xl flex flex-col gap-3 ${
                  isCorrect
                    ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-2 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1">
                      {isCorrect ? 'הצלחת! 👏' : 'לא נורא, בוא נבדוק יחד.'}
                    </h4>
                    <p className="text-sm leading-relaxed">{feedbackMessage}</p>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={handleDrillNext}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-xl shadow-md flex items-center gap-2 active:scale-95"
                  >
                    <span>
                      {currentDrillIndex === activeDrillExercises.length - 1
                        ? 'לסיום אימון החיזוק'
                        : 'לשאלה הבאה'}
                    </span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Helpful tools */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setHintStep((prev) => Math.min(prev + 1, currentEx.hintSteps.length))}
                className="flex items-center gap-1.5 font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>רמז לחיזוק</span>
              </button>

              <button
                type="button"
                onClick={onOpenSandbox}
                className="flex items-center gap-1.5 font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>פתח מעבדה לבדיקה</span>
              </button>
            </div>

            {hintStep > 0 && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900">
                <strong className="block mb-0.5">רמז:</strong>
                {currentEx.hintSteps[hintStep - 1]}
              </div>
            )}
          </div>
        ) : (
          /* Completed Drill Screen */
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">
                סיימת את אימון החיזוק בהצלחה! 🌟
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                ענית נכון על <strong>{drillSuccessCount}</strong> מתוך{' '}
                <strong>{activeDrillExercises.length}</strong> שאלות חיזוק.
                ההבנה שלך השתפרה, וזה יורגש בפרקים הבאים!
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleExitDrill}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-xl shadow-md active:scale-95"
              >
                חזרה למרכז החיזוק
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Primary View: List of Topics Needing Improvement
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto py-2" id="reinforcement-view">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 md:p-8 rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Target className="w-3.5 h-3.5 text-amber-200" />
            <span>סעיף ייעודי ללמידה מטעויות וסגירת פערים</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black mb-1">
            חיזוק נושאים הדורשים שיפור 🎯
          </h1>
          <p className="text-xs md:text-sm text-amber-100 max-w-xl leading-relaxed">
            כולנו טועים לפעמים, ומטעויות לומדים הכי טוב! כאן מרוכזים בדיוק הנושאים
            וההסברים שיעזרו לך להרגיש בטוח ומצליח בכל תרגיל בספר.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToHome}
          className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-xs shrink-0"
        >
          <span>חזרה למסך הבית</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Global Quick Action: Run comprehensive booster workout */}
      {topicsNeedingImprovement.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-6 rounded-3xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-800">
                אימון משולב מומלץ
              </div>
              <h2 className="text-lg font-black text-amber-950">
                אימון חיזוק מותאם אישית (5 שאלות)
              </h2>
              <p className="text-xs text-amber-800/90 mt-0.5">
                אימון קצר שמרכז שאלות מכל הנושאים שבהם נרשמו טעויות לאחרונה, עם רמזים
                מומחשים.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => startBoosterDrill(undefined, 'אימון חיזוק כולל מותאם אישית')}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-xl shadow-md flex items-center gap-2 active:scale-95 transition-all shrink-0 w-full sm:w-auto justify-center"
          >
            <span>התחל אימון עכשיו</span>
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* List of specific topics needing improvement */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              הנושאים שמצאנו שכדאי לחזק:
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              בחר נושא כדי לקרוא את חוק הזהב, לחזור להסבר המומחש או לפתוח תרגול ממוקד:
            </p>
          </div>
          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
            {topicsNeedingImprovement.length} נושאים לתרגול
          </span>
        </div>

        {topicsNeedingImprovement.length === 0 ? (
          /* Empty state: Student is doing great! */
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                וואו! כל הכבוד! 🎉
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                נכון לעכשיו אין לך נושאים עם קשיים משמעותיים. השליטה שלך בשברים נראית
                מצוינת!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => startBoosterDrill('number-line', 'אתגר חיזוק עצמי')}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm rounded-xl shadow-xs"
              >
                בצע אתגר חיזוק מונע (ישר המספרים)
              </button>
              <button
                type="button"
                onClick={handleLoadDemoForTesting}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm rounded-xl border border-slate-300"
              >
                טען נתוני תלמיד לדוגמה לבדיקת המערכת
              </button>
            </div>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 gap-5">
            {topicsNeedingImprovement.map((item) => {
              const { topic } = item;

              return (
                <div
                  key={topic.id}
                  className={`bg-white p-6 rounded-3xl border-2 transition-all shadow-xs flex flex-col gap-4 ${
                    item.severity === 'high'
                      ? 'border-amber-400 ring-2 ring-amber-100'
                      : 'border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-sm flex items-center justify-center">
                        {topic.order}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">
                            פרק {topic.order} בספר
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              item.severity === 'high'
                                ? 'bg-rose-100 text-rose-800'
                                : item.severity === 'medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {item.severity === 'high'
                              ? '⚠️ דורש חיזוק מומלץ'
                              : item.severity === 'medium'
                              ? '⚡ לחיזוק והטמעה'
                              : '💡 נושא יסוד להעמקה'}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mt-0.5">
                          {topic.title}
                        </h3>
                      </div>
                    </div>

                    {/* Stats Pill */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-slate-50 px-3 py-1 rounded-xl border border-slate-200 font-medium text-slate-600">
                        דיוק: <strong>{item.accuracyRate}%</strong> ({item.solvedCount} נפתרו)
                      </span>
                      {item.errorCount > 0 && (
                        <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-xl border border-rose-200 font-bold">
                          {item.errorCount} טעויות שתועדו
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Why reinforce this topic */}
                  <div className="text-xs md:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 leading-relaxed">
                    <strong className="text-slate-900 block mb-0.5">
                      מדוע כדאי לתרגל נושא זה?
                    </strong>
                    {item.reinforcementReason}
                  </div>

                  {/* Golden Rule Reminder */}
                  <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs md:text-sm text-amber-950">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 font-bold mb-0.5">
                        חוק הזהב שחשוב לזכור:
                      </strong>
                      <span>{item.keyRuleReminder}</span>
                    </div>
                  </div>

                  {/* Past misconceptions if any */}
                  {item.identifiedMisconceptions.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-slate-500">
                        נקודות שבהן כדאי לשים לב במיוחד:
                      </span>
                      <div className="space-y-1.5">
                        {item.identifiedMisconceptions.map((misc, mIdx) => (
                          <div
                            key={mIdx}
                            className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700 flex items-start gap-2"
                          >
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-slate-900">
                                {misc.explanation}
                              </span>
                              {misc.studentMistakeExample && (
                                <p className="text-slate-500 text-[11px] mt-0.5">
                                  שאלה שנתקלת בה: "{misc.studentMistakeExample}"
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onNavigateToTopicLearn(topic.id)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs md:text-sm font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>חזרה להסבר המומחש (בוא נבין)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        startBoosterDrill(topic.id, `תרגול ממוקד: ${topic.shortTitle}`)
                      }
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm font-black rounded-xl shadow-xs flex items-center gap-2 active:scale-95 transition-all"
                    >
                      <Zap className="w-4 h-4" />
                      <span>התחל תרגול ממוקד לנושא זה (5 שאלות)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Helpful tip footer */}
      <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl flex items-center justify-between text-xs text-indigo-900">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>
            זכור: כשאתה מתרגל וטועה, המערכת לומדת איתך ומעדכנת את התרגילים הבאים שיתאימו בדיוק לקצב שלך!
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenSandbox}
          className="font-bold underline hover:text-indigo-950 shrink-0 mr-2"
        >
          פתח מעבדת שברים לבדיקה חופשית
        </button>
      </div>
    </div>
  );
};

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
