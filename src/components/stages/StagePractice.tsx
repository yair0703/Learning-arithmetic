import React, { useState, useEffect } from 'react';
import { TopicInfo, Exercise, StudentProgress } from '../../types';
import { recordExerciseAttempt, getTopicMastery } from '../../utils/storage';
import { getFreshExercisesForTopic, generateSingleExercise } from '../../utils/exerciseGenerator';
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
import { TopicCompletionVisualizer } from '../visuals/TopicCompletionVisualizer';
import { TopicLevelRoadmap } from '../practice/TopicLevelRoadmap';
import {
  HelpCircle,
  Lightbulb,
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  RotateCcw,
  Trophy,
  Flame,
  Award,
  Star,
  Check,
  TrendingUp,
  ChevronLeft,
  Zap,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StagePracticeProps {
  topic: TopicInfo;
  progress: StudentProgress;
  onProgressUpdate: (updated: StudentProgress) => void;
  onOpenSandbox: () => void;
  onBackToHome: () => void;
}

const DEFAULT_SESSION_QUESTIONS_COUNT = 8;

export const StagePractice: React.FC<StagePracticeProps> = ({
  topic,
  progress,
  onProgressUpdate,
  onOpenSandbox,
  onBackToHome
}) => {
  const topicProg = progress.topicsProgress[topic.id] || { currentLevel: 1, correctCount: 0, exercisesSolved: 0 };
  const currentLevel = topicProg.currentLevel || 1;

  // Session state
  const [sessionQuestionCount, setSessionQuestionCount] = useState<number>(DEFAULT_SESSION_QUESTIONS_COUNT);
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [exercises, setExercises] = useState<Exercise[]>(() =>
    getFreshExercisesForTopic(topic.id, currentLevel, DEFAULT_SESSION_QUESTIONS_COUNT)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sessionResults, setSessionResults] = useState<{ exerciseId: string; isCorrect: boolean }[]>([]);
  const [isSessionCompleted, setIsSessionCompleted] = useState<boolean>(false);

  // Current question interaction
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  // Aids toggles
  const [currentHintStep, setCurrentHintStep] = useState<number>(0);
  const [showExtraExplanation, setShowExtraExplanation] = useState<boolean>(false);
  const [showExampleDemonstration, setShowExampleDemonstration] = useState<boolean>(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState<boolean>(false);

  const handleSelectLevelFromRoadmap = (levelNum: 1 | 2 | 3) => {
    const freshList = getFreshExercisesForTopic(
      topic.id,
      levelNum,
      sessionQuestionCount
    );
    setExercises(freshList);
    setCurrentIndex(0);
    setSessionResults([]);
    setIsSessionCompleted(false);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedbackMessage('');
    setCurrentHintStep(0);
    setShowExtraExplanation(false);
    setShowExampleDemonstration(false);
    setShowRoadmapModal(false);
  };

  const mastery = getTopicMastery(topicProg);
  const currentExercise: Exercise = exercises[currentIndex] || exercises[0];

  // Start a brand new round with fresh questions
  const startNewRound = () => {
    const updatedProg = progress.topicsProgress[topic.id] || { currentLevel: 1 };
    const nextLevel = updatedProg.currentLevel || 1;
    const freshList = getFreshExercisesForTopic(
      topic.id,
      nextLevel,
      sessionQuestionCount,
      exercises.map((e) => e.id)
    );
    setExercises(freshList);
    setCurrentIndex(0);
    setSessionResults([]);
    setIsSessionCompleted(false);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedbackMessage('');
    setCurrentHintStep(0);
    setShowExtraExplanation(false);
    setShowExampleDemonstration(false);
    setRoundNumber((prev) => prev + 1);
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswered && isCorrect) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;

    const chosenOption = currentExercise.options?.find((o) => o.id === selectedOptionId);
    const correctOption = currentExercise.options?.find((o) => o.isCorrect);
    const correct = Boolean(
      chosenOption?.isCorrect ||
      (chosenOption && correctOption && chosenOption.label.trim() === correctOption.label.trim())
    );

    setIsAnswered(true);
    setIsCorrect(correct);

    // Save session answer if not already recorded for this question
    if (!sessionResults.some((r) => r.exerciseId === currentExercise.id)) {
      setSessionResults((prev) => [...prev, { exerciseId: currentExercise.id, isCorrect: correct }]);
    }

    let feedback = '';
    let misconceptionNote = '';

    if (correct) {
      feedback = 'הצלחת! 👏 כל הכבוד על החשיבה והמאמץ.';
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    } else {
      feedback = 'לא נורא, בוא נבדוק יחד.';
      if (chosenOption?.misconceptionExplanation) {
        feedback += ` ${chosenOption.misconceptionExplanation}`;
        misconceptionNote = chosenOption.misconceptionExplanation;
      } else {
        feedback += ` ${currentExercise.gentleWrongFeedback.default}`;
      }
    }

    setFeedbackMessage(feedback);

    // Record in global storage & adaptive system
    const updated = recordExerciseAttempt(progress, {
      topicId: topic.id,
      exerciseId: currentExercise.id,
      skillTag: currentExercise.skillTag,
      isCorrect: correct,
      questionPrompt: currentExercise.prompt,
      studentAnswer: chosenOption?.label || selectedOptionId,
      correctAnswer: correctOption?.label || '',
      misconceptionNote
    });

    onProgressUpdate(updated);
  };

  const handleCustomExerciseComplete = (correct: boolean, studentAnswerStr?: string) => {
    setIsAnswered(true);
    setIsCorrect(correct);

    if (!sessionResults.some((r) => r.exerciseId === currentExercise.id)) {
      setSessionResults((prev) => [...prev, { exerciseId: currentExercise.id, isCorrect: correct }]);
    }

    if (correct) {
      setFeedbackMessage('הצלחת! 👏 כל הכבוד על החשיבה והמאמץ המדויק.');
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    } else {
      setFeedbackMessage(currentExercise.gentleWrongFeedback.default || 'בדוק שוב ונסה להיעזר בהשוואה לעוגנים.');
    }

    const updated = recordExerciseAttempt(progress, {
      topicId: topic.id,
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

  const handleNextExercise = () => {
    if (currentIndex >= exercises.length - 1) {
      // Completed all questions in this session
      setIsSessionCompleted(true);
      return;
    }

    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedbackMessage('');
    setCurrentHintStep(0);
    setShowExtraExplanation(false);
    setShowExampleDemonstration(false);

    setCurrentIndex((prev) => prev + 1);
  };

  const handleTryAgain = () => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedbackMessage('');
  };

  const handleShowNextHint = () => {
    setCurrentHintStep((prev) => Math.min(prev + 1, currentExercise.hintSteps.length));
  };

  // Session Summary Screen (Clear Learning Indication!)
  if (isSessionCompleted) {
    const correctInSession = sessionResults.filter((r) => r.isCorrect).length;
    const sessionAccuracy = Math.round((correctInSession / exercises.length) * 100);

    return (
      <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto py-6" id="session-summary">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-indigo-100 shadow-xl text-center flex flex-col items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
              סבב אימון {roundNumber} הושלם בהצלחה
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
              כל הכבוד על ההתמדה! 🎉
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              בנושא: <strong className="text-indigo-900">{topic.title}</strong>
            </p>
          </div>

          {/* Key Metrics / Learning Indicators Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-lg mt-2">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-xs text-slate-500 font-medium">תוצאת הסבב</span>
              <span className="text-2xl font-black text-slate-900 mt-1">
                {correctInSession}/{exercises.length}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">{sessionAccuracy}% דיוק</span>
            </div>

            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-xs text-indigo-700 font-medium">מדד שליטה כולל</span>
              <span className="text-2xl font-black text-indigo-950 mt-1">
                {mastery.percentage}%
              </span>
              <span className="text-[11px] font-bold text-indigo-600 mt-0.5">
                {mastery.statusHebrew}
              </span>
            </div>

            <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-4 flex flex-col items-center">
              <span className="text-xs text-amber-700 font-medium">רמת קושי נוכחית</span>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className={`w-4 h-4 ${
                      starIdx <= mastery.stars
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-bold text-amber-800 mt-1">
                {mastery.levelLabel}
              </span>
            </div>
          </div>

          {/* Visual Mastery Progress Bar */}
          <div className="w-full max-w-lg bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-right">
            <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                התקדמות לקראת שליטה מלאה בפרק:
              </span>
              <span className="text-indigo-600 font-black">{mastery.percentage}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${mastery.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {mastery.percentage >= 85
                ? 'מעולה! השגת שליטה מלאה בנושא זה. המערכת תציע לך שאלות אתגר ברמה הגבוהה ביותר!'
                : mastery.percentage >= 50
                ? 'התקדמות יפה מאוד! תרגול של עוד סבב אחד יקדם אותך לרמת אלוף.'
                : 'התחלה טובה! ככל שתתרגל יותר שאלות ותענה נכון, מדד השליטה יעלה.'}
            </p>
          </div>

          {/* Dynamic Concept Visualizer for Chapter Completion */}
          <div className="w-full mt-2">
            <TopicCompletionVisualizer
              topicId={topic.id}
              topicTitle={topic.title}
              onExploreMore={onOpenSandbox}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg mt-2">
            <button
              type="button"
              onClick={startNewRound}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>סבב חדש (5 שאלות חדשות) 🚀</span>
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>חזרה לכל הנושאים</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-4xl mx-auto py-2" id="stage-practice">
      {/* Top Banner with Clear Learning & Session Indicators */}
      <div className={`p-5 rounded-3xl text-white bg-gradient-to-r ${topic.bgGradient} shadow-md`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              שלב 3: תרגול עצמאי
            </span>
            <span className="text-xs text-white/90">
              {topic.shortTitle} • סבב {roundNumber}
            </span>

            {/* Session Length Selector */}
            <div className="flex items-center gap-1 bg-black/20 p-0.5 rounded-lg text-xs mr-2">
              <span className="text-[10px] text-white/70 px-1 font-medium">אורך סבב:</span>
              {[8, 10, 12].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => {
                    setSessionQuestionCount(cnt);
                    const freshList = getFreshExercisesForTopic(topic.id, currentLevel, cnt);
                    setExercises(freshList);
                    setCurrentIndex(0);
                    setSessionResults([]);
                    setIsSessionCompleted(false);
                  }}
                  className={`px-2 py-0.5 rounded font-bold text-[11px] transition-all cursor-pointer ${
                    sessionQuestionCount === cnt
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Topic Level Roadmap Button */}
            <button
              type="button"
              onClick={() => setShowRoadmapModal(true)}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full text-xs font-black flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
              title="צפה במפת הרמות והשאלות"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>מפת הרמות 🗺️</span>
            </button>

            {/* Topic Mastery Badge */}
            <div className="flex items-center gap-2 bg-black/25 px-3 py-1 rounded-full text-xs font-bold">
              <span>מד שליטה:</span>
              <span className="text-amber-300">{mastery.percentage}%</span>
              <div className="flex items-center">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    className={`w-3 h-3 ${s <= mastery.stars ? 'text-amber-300 fill-amber-300' : 'text-white/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Session Progress Tracker */}
        <div className="bg-black/20 p-3 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold text-white/90">
            <span>שאלה {currentIndex + 1} מתוך {exercises.length}</span>
            <span className="text-[11px] text-white/80">{mastery.levelLabel}</span>
          </div>

          <div className="flex items-center gap-2">
            {exercises.map((ex, idx) => {
              const res = sessionResults.find((r) => r.exerciseId === ex.id);
              const isCurrent = idx === currentIndex;
              let bgClass = 'bg-white/30 text-white';
              if (res) {
                bgClass = res.isCorrect ? 'bg-emerald-400 text-emerald-950 font-black' : 'bg-rose-400 text-rose-950 font-black';
              } else if (isCurrent) {
                bgClass = 'bg-white text-indigo-900 ring-2 ring-amber-300 font-black scale-105';
              }

              return (
                <div
                  key={idx}
                  className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${bgClass}`}
                  title={`שאלה ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-black mt-3">{currentExercise.title}</h1>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-5 md:p-7 border border-slate-200/90 shadow-sm flex flex-col gap-6">
        {/* Prompt */}
        <div className="border-b border-slate-100 pb-4">
          <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed text-right">
            {currentExercise.prompt}
          </p>
        </div>

        {/* Interactive Visual Representation */}
        <div className="bg-slate-50/80 rounded-2xl p-4 md:p-6 border border-slate-100 flex flex-col items-center justify-center">
          {currentExercise.visualType === 'bar' && currentExercise.visualProps && (
            <FractionBarVisualizer
              totalParts={currentExercise.visualProps.totalParts}
              coloredParts={currentExercise.visualProps.coloredParts}
              color={currentExercise.visualProps.color}
            />
          )}

          {currentExercise.visualType === 'circle' && currentExercise.visualProps && (
            <FractionCircleVisualizer
              totalParts={currentExercise.visualProps.totalParts}
              coloredParts={currentExercise.visualProps.coloredParts}
              color={currentExercise.visualProps.color}
            />
          )}

          {currentExercise.visualType === 'number-line' && currentExercise.visualProps && (
            <InteractiveNumberLine
              min={currentExercise.visualProps.min}
              max={currentExercise.visualProps.max}
              divisions={currentExercise.visualProps.divisions}
              targetIndex={currentExercise.visualProps.targetIndex}
              dotColor={currentExercise.visualProps.dotColor}
              interactive={false}
            />
          )}

          {currentExercise.visualType === 'mixed-bars' && currentExercise.visualProps && (
            <MixedFractionVisualizer
              wholeCount={currentExercise.visualProps.wholeCount}
              remainder={currentExercise.visualProps.remainder}
              denom={currentExercise.visualProps.denom}
              color={currentExercise.visualProps.color}
            />
          )}

          {currentExercise.visualType === 'quantity' && currentExercise.visualProps && (
            <QuantityGroupVisualizer
              totalItems={currentExercise.visualProps.totalItems}
              groups={currentExercise.visualProps.groups}
              itemsPerGroup={currentExercise.visualProps.itemsPerGroup}
              selectedGroups={currentExercise.visualProps.selectedGroups}
              itemName={currentExercise.visualProps.itemName}
            />
          )}

          {currentExercise.visualType === 'decimal-table' && currentExercise.visualProps && (
            <DecimalTableVisualizer
              before={currentExercise.visualProps.before}
              op={currentExercise.visualProps.op}
              factor={currentExercise.visualProps.factor}
              after={currentExercise.visualProps.after}
              interactive={false}
            />
          )}

          {currentExercise.visualType === 'book-shape' && currentExercise.visualProps && (
            <BookGeometryShape
              shapeKind={currentExercise.visualProps.shapeKind}
              coloredPartIndices={currentExercise.visualProps.coloredPartIndices}
              caption={currentExercise.visualProps.caption}
              size={currentExercise.visualProps.size || 'md'}
            />
          )}
        </div>

        {/* Book Interactive Exercise: Egg Sorting (Exercise 24 from book) */}
        {currentExercise.answerType === 'book-egg-order' && currentExercise.visualProps && (
          <FractionOrderDragExercise
            items={currentExercise.visualProps.items}
            orderType={currentExercise.visualProps.orderType}
            onComplete={(correct) => handleCustomExerciseComplete(correct, 'מיון ביציות לפי גודל')}
          />
        )}

        {/* Book Interactive Exercise: Greater / Less Than Comparison (Exercise 23 from book) */}
        {currentExercise.answerType === 'book-comparison' && currentExercise.visualProps && (
          <FractionBookComparisonCard
            leftDisplay={currentExercise.visualProps.leftDisplay}
            rightDisplay={currentExercise.visualProps.rightDisplay}
            correctSymbol={currentExercise.visualProps.correctSymbol}
            reasonExplanation={currentExercise.visualProps.reasonExplanation}
            onAnswerSelected={(correct, sym) => handleCustomExerciseComplete(correct, sym)}
          />
        )}

        {/* Book Interactive Exercise: Geoboard Whole Builder (Exercise 25 from book) */}
        {currentExercise.answerType === 'book-geoboard' && currentExercise.visualProps && (
          <GeoboardWholeBuilder
            initialFraction={currentExercise.visualProps.initialFraction}
            targetSlices={currentExercise.visualProps.targetSlices}
            onComplete={(correct) => handleCustomExerciseComplete(correct, 'השלמת תבנית שלמה')}
          />
        )}

        {/* Multiple Choice Options */}
        {currentExercise.answerType === 'choice' && currentExercise.options && (
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-500">
              בחר את התשובה הנכונה ביותר:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentExercise.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle = 'border-slate-200 hover:border-indigo-400 bg-white text-slate-800';

                if (isSelected) {
                  btnStyle = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-2 ring-indigo-500/20';
                }

                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 font-medium';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswered && isCorrect}
                    className={`p-4 rounded-2xl border-2 text-right transition-all text-sm md:text-base flex items-center justify-between gap-2 ${btnStyle}`}
                  >
                    <span>{opt.label}</span>
                    {isAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {isAnswered && isSelected && !opt.isCorrect && (
                      <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Feedback Alert */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl flex items-start gap-3 border animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex flex-col gap-1 text-xs md:text-sm">
              <span className="font-bold">{isCorrect ? 'נכון מאוד!' : 'שים לב:'}</span>
              <p className="leading-relaxed">{feedbackMessage}</p>
            </div>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {!isAnswered ? (
              currentExercise.answerType === 'choice' ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className={`py-3 px-6 rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center gap-2 ${
                    selectedOptionId
                      ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-indigo-200 cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>בדוק תשובה</span>
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs text-slate-400 font-medium">
                  בצע את הפעולה בתרגיל למעלה כדי לבדוק
                </span>
              )
            ) : isCorrect ? (
              <button
                type="button"
                onClick={handleNextExercise}
                className="py-3 px-6 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-md shadow-emerald-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {currentIndex >= exercises.length - 1
                    ? 'סיכום סבב האימון 🏆'
                    : 'לשאלה הבאה בסבב ←'}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTryAgain}
                  className="py-2.5 px-5 rounded-2xl font-bold text-xs md:text-sm bg-amber-500 hover:bg-amber-600 text-white shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>נסה שוב</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextExercise}
                  className="py-2.5 px-4 rounded-2xl font-semibold text-xs md:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                >
                  <span>דלג לשאלה הבאה</span>
                </button>
              </div>
            )}
          </div>

          {/* Secondary Learning Support Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Gentle Hints Button */}
            {currentExercise.hintSteps && currentExercise.hintSteps.length > 0 && (
              <button
                type="button"
                onClick={handleShowNextHint}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-all flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {currentHintStep === 0
                    ? 'אני צריך רמז'
                    : currentHintStep < currentExercise.hintSteps.length
                    ? 'רמז נוסף'
                    : 'כל הרמזים פתוחים'}
                </span>
              </button>
            )}

            {/* Extra Explanation Button */}
            <button
              type="button"
              onClick={() => setShowExtraExplanation((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                showExtraExplanation
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>הסבר נוסף</span>
            </button>

            {/* Example demonstration */}
            <button
              type="button"
              onClick={() => setShowExampleDemonstration((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                showExampleDemonstration
                  ? 'bg-purple-100 text-purple-800 border border-purple-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-purple-500" />
              <span>אני רוצה לראות דוגמה</span>
            </button>

            {/* Open Sandbox */}
            <button
              type="button"
              onClick={onOpenSandbox}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>מעבדה לבדיקה</span>
            </button>
          </div>
        </div>

        {/* Revealed Hints Section */}
        {currentHintStep > 0 && (
          <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-2xl flex flex-col gap-2 animate-in fade-in duration-200">
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              רמזים לפיתרון:
            </span>
            {currentExercise.hintSteps.slice(0, currentHintStep).map((hint, hIdx) => (
              <p key={hIdx} className="text-xs md:text-sm text-amber-900 leading-relaxed font-medium">
                • {hint}
              </p>
            ))}
          </div>
        )}

        {/* Revealed Extra Explanation Section */}
        {showExtraExplanation && (
          <div className="bg-indigo-50/90 border border-indigo-200 p-4 rounded-2xl flex flex-col gap-1.5 animate-in fade-in duration-200">
            <span className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              הסבר נוסף ומעמיק:
            </span>
            <p className="text-xs md:text-sm text-indigo-900 leading-relaxed">
              {currentExercise.extraExplanation}
            </p>
          </div>
        )}

        {/* Revealed Example Demonstration Section */}
        {showExampleDemonstration && currentExercise.exampleDemonstration && (
          <div className="bg-purple-50/90 border border-purple-200 p-4 rounded-2xl flex flex-col gap-2 animate-in fade-in duration-200">
            <span className="text-xs font-bold text-purple-800 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              דוגמה פתורה דומה:
            </span>
            <p className="text-xs md:text-sm text-purple-900 leading-relaxed">
              {currentExercise.exampleDemonstration.text}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between px-2 pt-2">
        <button
          type="button"
          onClick={onBackToHome}
          className="text-xs md:text-sm font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
        >
          <span>← חזרה לכל הנושאים</span>
        </button>

        <div className="text-xs text-slate-400">
          כל הכבוד על התרגול! את/ה בדרך להצלחה בשברים 🌟
        </div>
      </div>

      {/* Roadmap Modal Overlay */}
      {showRoadmapModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowRoadmapModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto cursor-pointer"
        >
          <div className="w-full my-auto py-6 cursor-default">
            <TopicLevelRoadmap
              topic={topic}
              progress={progress}
              onSelectLevel={handleSelectLevelFromRoadmap}
              onClose={() => setShowRoadmapModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
