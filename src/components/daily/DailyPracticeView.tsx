import React, { useState, useEffect } from 'react';
import { StudentProgress, Exercise } from '../../types';
import { generateDailyPracticeExercises, recordExerciseAttempt } from '../../utils/storage';
import { TOPICS } from '../../data/curriculumData';
import { FractionBarVisualizer } from '../visuals/FractionBarVisualizer';
import { FractionCircleVisualizer } from '../visuals/FractionCircleVisualizer';
import { InteractiveNumberLine } from '../visuals/InteractiveNumberLine';
import { MixedFractionVisualizer } from '../visuals/MixedFractionVisualizer';
import { QuantityGroupVisualizer } from '../visuals/QuantityGroupVisualizer';
import { DecimalTableVisualizer } from '../visuals/DecimalTableVisualizer';
import { BookGeometryShape } from '../visuals/BookGeometryShape';
import { FractionOrderDragExercise } from '../visuals/FractionOrderDragExercise';
import { FractionBookComparisonCard } from '../visuals/FractionBookComparisonCard';
import { GeoboardWholeBuilder } from '../visuals/GeoboardWholeBuilder';
import {
  CalendarCheck,
  Trophy,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Lightbulb,
  Sparkles,
  RotateCcw,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyPracticeProps {
  progress: StudentProgress;
  onProgressUpdate: (newProg: StudentProgress) => void;
  onClose: () => void;
  onOpenSandbox: () => void;
}

export const DailyPracticeView: React.FC<DailyPracticeProps> = ({
  progress,
  onProgressUpdate,
  onClose,
  onOpenSandbox
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [currentHintStep, setCurrentHintStep] = useState<number>(0);

  // Session stats
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const list = generateDailyPracticeExercises(progress, 6);
    setExercises(list);
  }, []);

  if (exercises.length === 0) return null;

  const currentExercise = exercises[currentIndex];
  const topicObj = TOPICS.find((t) => t.id === currentExercise.topicId);

  const handleSubmit = () => {
    if (!selectedOptionId) return;

    const opt = currentExercise.options?.find((o) => o.id === selectedOptionId);
    const correct = !!opt?.isCorrect;

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setCorrectCount((prev) => prev + 1);
      setFeedbackMessage('הצלחת! 👏 כל הכבוד!');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    } else {
      setFeedbackMessage(
        opt?.misconceptionExplanation ||
          currentExercise.gentleWrongFeedback.default ||
          'לא נורא, בוא נבדוק יחד.'
      );
    }

    const correctOption = currentExercise.options?.find((o) => o.isCorrect);
    const updated = recordExerciseAttempt(progress, {
      topicId: currentExercise.topicId,
      exerciseId: currentExercise.id,
      skillTag: currentExercise.skillTag,
      isCorrect: correct,
      questionPrompt: currentExercise.prompt,
      studentAnswer: opt?.label || selectedOptionId,
      correctAnswer: correctOption?.label || '',
      misconceptionNote: opt?.misconceptionExplanation
    });

    onProgressUpdate(updated);
  };

  const handleCustomExerciseComplete = (correct: boolean, studentAnswerStr?: string) => {
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setCorrectCount((prev) => prev + 1);
      setFeedbackMessage('הצלחת! 👏 כל הכבוד על המאמץ והפתרון המדויק!');
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    } else {
      setFeedbackMessage(currentExercise.gentleWrongFeedback.default || 'בדוק שוב ונסה שנית.');
    }

    const updated = recordExerciseAttempt(progress, {
      topicId: currentExercise.topicId,
      exerciseId: currentExercise.id,
      skillTag: currentExercise.skillTag,
      isCorrect: correct,
      questionPrompt: currentExercise.prompt,
      studentAnswer: studentAnswerStr || (correct ? 'נכון' : 'שגוי'),
      correctAnswer: 'הצלחה במשימת הספר',
      misconceptionNote: correct ? '' : currentExercise.gentleWrongFeedback.default
    });

    onProgressUpdate(updated);
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setFeedbackMessage('');
      setCurrentHintStep(0);
    } else {
      setIsCompleted(true);
      try {
        confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
      } catch {}
    }
  };

  return (
    <div className="flex flex-col gap-5 max-w-3xl mx-auto py-2" id="daily-practice-container">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 rounded-3xl text-white shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-white/25 px-2.5 py-0.5 rounded-full font-bold">
                מסלול יומי
              </span>
              <span className="text-xs text-white/90">
                שאלה {currentIndex + 1} מתוך {exercises.length}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black mt-0.5">תרגול יומי מותאם אישית</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
        <div
          className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / exercises.length) * 100}%` }}
        />
      </div>

      {!isCompleted ? (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
            <span>
              נושא: <strong>{topicObj?.shortTitle}</strong>
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded-md font-bold">
              רמת שאלה: {currentExercise.difficulty === 1 ? 'בסיסית' : currentExercise.difficulty === 2 ? 'בינונית' : 'מתקדמת'}
            </span>
          </div>

          <h2 className="text-base md:text-lg font-bold text-slate-800 text-center leading-relaxed">
            {currentExercise.prompt}
          </h2>

          {/* Question Visual */}
          <div className="flex justify-center my-1">
            {currentExercise.visualType === 'bar' && (
              <FractionBarVisualizer
                totalParts={currentExercise.visualProps.totalParts}
                coloredParts={currentExercise.visualProps.coloredParts}
                color={currentExercise.visualProps.color || '#059669'}
              />
            )}

            {currentExercise.visualType === 'circle' && (
              <FractionCircleVisualizer
                totalParts={currentExercise.visualProps.totalParts}
                coloredParts={currentExercise.visualProps.coloredParts}
                color={currentExercise.visualProps.color || '#f59e0b'}
                size={180}
              />
            )}

            {currentExercise.visualType === 'number-line' && (
              <InteractiveNumberLine
                min={currentExercise.visualProps.min ?? 0}
                max={currentExercise.visualProps.max ?? 1}
                divisions={currentExercise.visualProps.divisions ?? 4}
                targetIndex={currentExercise.visualProps.targetIndex}
                dotColor="#059669"
              />
            )}

            {currentExercise.visualType === 'mixed-bars' && (
              <MixedFractionVisualizer
                wholeCount={currentExercise.visualProps.wholeCount ?? 2}
                remainder={currentExercise.visualProps.remainder ?? 1}
                denom={currentExercise.visualProps.denom ?? 3}
                color="#059669"
              />
            )}

            {currentExercise.visualType === 'quantity' && (
              <QuantityGroupVisualizer
                totalItems={currentExercise.visualProps.totalItems ?? 12}
                groups={currentExercise.visualProps.groups ?? 4}
                itemsPerGroup={currentExercise.visualProps.itemsPerGroup ?? 3}
                selectedGroups={currentExercise.visualProps.selectedGroups ?? 1}
                itemName={currentExercise.visualProps.itemName || 'עצמים'}
              />
            )}

            {currentExercise.visualType === 'decimal-table' && (
              <DecimalTableVisualizer
                before={currentExercise.visualProps.before}
                op={currentExercise.visualProps.op}
                after={currentExercise.visualProps.after}
                interactive={false}
              />
            )}

            {currentExercise.visualType === 'book-shape' && (
              <BookGeometryShape
                shapeKind={currentExercise.visualProps.shapeKind}
                coloredPartIndices={currentExercise.visualProps.coloredPartIndices}
                caption={currentExercise.visualProps.caption}
                size={currentExercise.visualProps.size || 'md'}
              />
            )}
          </div>

          {/* Book Interactive Exercises */}
          {currentExercise.answerType === 'book-egg-order' && currentExercise.visualProps && (
            <FractionOrderDragExercise
              items={currentExercise.visualProps.items}
              orderType={currentExercise.visualProps.orderType}
              onComplete={(correct) => handleCustomExerciseComplete(correct, 'מיון ביציות לפי גודל')}
            />
          )}

          {currentExercise.answerType === 'book-comparison' && currentExercise.visualProps && (
            <FractionBookComparisonCard
              leftDisplay={currentExercise.visualProps.leftDisplay}
              rightDisplay={currentExercise.visualProps.rightDisplay}
              correctSymbol={currentExercise.visualProps.correctSymbol}
              reasonExplanation={currentExercise.visualProps.reasonExplanation}
              onAnswerSelected={(correct, sym) => handleCustomExerciseComplete(correct, sym)}
            />
          )}

          {currentExercise.answerType === 'book-geoboard' && currentExercise.visualProps && (
            <GeoboardWholeBuilder
              initialFraction={currentExercise.visualProps.initialFraction}
              targetSlices={currentExercise.visualProps.targetSlices}
              onComplete={(correct) => handleCustomExerciseComplete(correct, 'השלמת תבנית שלמה')}
            />
          )}

          {/* Options */}
          {currentExercise.answerType === 'choice' && currentExercise.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentExercise.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOptionId(opt.id)}
                    disabled={isAnswered && isCorrect}
                    className={`p-4 rounded-2xl border-2 text-right transition-all flex items-center justify-between text-base font-bold ${
                      isSelected
                        ? isAnswered
                          ? opt.isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300'
                            : 'border-amber-400 bg-amber-50 text-amber-900'
                          : 'border-teal-600 bg-teal-50 text-teal-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs">
                      {isSelected && (
                        <span
                          className={`w-3 h-3 rounded-full ${
                            isAnswered && opt.isCorrect ? 'bg-emerald-600' : 'bg-teal-600'
                          }`}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Action */}
          {!isAnswered ? (
            currentExercise.answerType === 'choice' ? (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!selectedOptionId}
                  className={`px-10 py-3.5 rounded-2xl font-black text-base shadow-md transition-all active:scale-95 ${
                    selectedOptionId
                      ? 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer shadow-teal-500/25'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  בדוק תשובה
                </button>
              </div>
            ) : (
              <div className="flex justify-center pt-2 text-xs text-slate-400 font-medium">
                בצע את הפעולה בתרגיל למעלה כדי לבדוק
              </div>
            )
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
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md flex items-center gap-2 active:scale-95"
                >
                  <span>{currentIndex === exercises.length - 1 ? 'לסיום התרגול' : 'לשאלה הבאה'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Helpful tools */}
          <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setCurrentHintStep((prev) => Math.min(prev + 1, currentExercise.hintSteps.length))}
              className="flex items-center gap-1.5 font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>רמז לתרגיל</span>
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

          {currentHintStep > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900">
              <strong className="block mb-0.5">רמז:</strong>
              {currentExercise.hintSteps[currentHintStep - 1]}
            </div>
          )}
        </div>
      ) : (
        /* Completed Summary */
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              סיימת את התרגול היומי בהצלחה! 🌟
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              ענית נכון על <strong>{correctCount}</strong> מתוך <strong>{exercises.length}</strong> שאלות.
              ההתמדה והחזרה היומית משפרות את ההבנה שלך בשברים מיום ליום!
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs md:text-sm text-emerald-900 max-w-md w-full text-right">
            <h4 className="font-bold mb-1">הישג יומי:</h4>
            <p>חיזקת את היכולת שלך בשברים! התוצאות נשמרו בלוח ההתקדמות שלך ושל ההורים.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const list = generateDailyPracticeExercises(progress, 6);
                setExercises(list);
                setCurrentIndex(0);
                setSelectedOptionId(null);
                setIsAnswered(false);
                setIsCorrect(false);
                setFeedbackMessage('');
                setCurrentHintStep(0);
                setCorrectCount(0);
                setIsCompleted(false);
              }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-xl shadow-md active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>סבב תרגול נוסף (שאלות חדשות) 🚀</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm rounded-xl active:scale-95"
            >
              חזור למסך הבית
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
