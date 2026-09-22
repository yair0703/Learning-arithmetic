import React, { useState } from 'react';
import { TopicInfo, TopicLearningContent } from '../../types';
import { FractionBarVisualizer } from '../visuals/FractionBarVisualizer';
import { InteractiveNumberLine } from '../visuals/InteractiveNumberLine';
import { MixedFractionVisualizer } from '../visuals/MixedFractionVisualizer';
import { QuantityGroupVisualizer } from '../visuals/QuantityGroupVisualizer';
import { DecimalTableVisualizer } from '../visuals/DecimalTableVisualizer';
import { Users, CheckCircle2, AlertCircle, ArrowLeft, RotateCcw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StageTogetherProps {
  topic: TopicInfo;
  content: TopicLearningContent;
  onContinueToPractice: () => void;
}

export const StageTogether: React.FC<StageTogetherProps> = ({
  topic,
  content,
  onContinueToPractice
}) => {
  const { togetherStage } = content;
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isStepSuccess, setIsStepSuccess] = useState<boolean>(false);
  const [stepFeedback, setStepFeedback] = useState<string>('');
  const [isFinishedAllSteps, setIsFinishedAllSteps] = useState<boolean>(false);

  const currentStep = togetherStage.steps[currentStepIndex];

  const handleOptionSelect = (optIndex: number) => {
    setSelectedOptionIndex(optIndex);
    const option = currentStep.options[optIndex];

    setStepFeedback(option.feedback);
    if (option.isCorrect) {
      setIsStepSuccess(true);
      if (currentStepIndex === togetherStage.steps.length - 1) {
        setIsFinishedAllSteps(true);
        try {
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        } catch {}
      }
    } else {
      setIsStepSuccess(false);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < togetherStage.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsStepSuccess(false);
      setStepFeedback('');
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setSelectedOptionIndex(null);
    setIsStepSuccess(false);
    setStepFeedback('');
    setIsFinishedAllSteps(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto py-2" id="stage-together">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl text-white bg-gradient-to-r ${topic.bgGradient} shadow-md`}>
        <div className="flex items-center justify-between mb-2">
          <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            שלב 2 מתוך 3: בוא נעשה יחד
          </div>
          <span className="text-xs text-white/90">
            צעד {currentStepIndex + 1} מתוך {togetherStage.steps.length}
          </span>
        </div>
        <h1 className="text-2xl font-black mb-1">{togetherStage.title}</h1>
        <p className="text-xs md:text-sm text-white/90">{togetherStage.storyContext}</p>
      </div>

      {/* Steps progress indicator */}
      <div className="flex items-center gap-2 px-2">
        {togetherStage.steps.map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 h-2 rounded-full transition-all duration-300 ${
              idx < currentStepIndex || (idx === currentStepIndex && isStepSuccess)
                ? 'bg-emerald-500'
                : idx === currentStepIndex
                ? 'bg-indigo-500'
                : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Main Interaction Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-5">
        {/* Step instruction */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
          <span className="text-xs font-bold text-indigo-600 block mb-1">
            צעד {currentStepIndex + 1}:
          </span>
          <p className="text-sm md:text-base font-semibold text-slate-800">
            {currentStep.instruction}
          </p>
        </div>

        {/* Dynamic visual matching this step */}
        <div className="w-full flex justify-center py-2">
          {topic.id === 'whole-part' && (
            <FractionBarVisualizer
              totalParts={currentStep.visualState?.totalParts || 6}
              coloredParts={currentStep.visualState?.coloredParts || 4}
              color="#4f46e5"
            />
          )}

          {topic.id === 'number-line' && (
            <InteractiveNumberLine
              min={0}
              max={1}
              divisions={currentStep.visualState?.divisions || 5}
              targetIndex={currentStep.visualState?.targetIndex || 3}
              showJumpArcs={currentStep.visualState?.showJumpArcs || false}
              dotColor="#ef4444"
            />
          )}

          {topic.id === 'mixed-numbers' && (
            <MixedFractionVisualizer
              wholeCount={currentStep.visualState?.wholeCount || 2}
              remainder={currentStep.visualState?.remainder || 1}
              denom={currentStep.visualState?.denom || 3}
            />
          )}

          {topic.id === 'same-denom' && (
            <FractionBarVisualizer
              totalParts={currentStep.visualState?.denom || 7}
              coloredParts={currentStep.visualState?.sumNumerator || 5}
              color="#e11d48"
            />
          )}

          {topic.id === 'part-of-quantity' && (
            <QuantityGroupVisualizer
              totalItems={currentStep.visualState?.totalItems || 20}
              groups={currentStep.visualState?.groups || 4}
              itemsPerGroup={currentStep.visualState?.itemsPerGroup || 5}
              selectedGroups={currentStep.visualState?.selectedGroups || 3}
              itemName="בלונים"
            />
          )}

          {topic.id === 'fractional-amount' && (
            <FractionBarVisualizer
              totalParts={currentStep.visualState?.totalParts || 3}
              coloredParts={currentStep.visualState?.partsGiven || 2}
              color="#8b5cf6"
            />
          )}

          {topic.id === 'summary-review' && (
            <MixedFractionVisualizer
              wholeCount={currentStep.visualState?.wholeCount || 2}
              remainder={currentStep.visualState?.remainder || 3}
              denom={currentStep.visualState?.denom || 8}
            />
          )}

          {topic.id === 'decimals-mult-div' && (
            <DecimalTableVisualizer
              before="0.45"
              op="× 10"
              after="4.5"
              interactive={false}
            />
          )}
        </div>

        {/* Step Question */}
        <div className="border-t border-slate-100 pt-4">
          <h3 className="text-base font-bold text-slate-900 mb-3 text-center">
            {currentStep.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentStep.options.map((opt, optIdx) => {
              const isSelected = selectedOptionIndex === optIdx;
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleOptionSelect(optIdx)}
                  className={`p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between gap-3 text-sm md:text-base font-medium ${
                    isSelected
                      ? opt.isCorrect
                        ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900 shadow-xs'
                        : 'border-amber-400 bg-amber-50/80 text-amber-900'
                      : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span>{opt.text}</span>
                  {isSelected && (
                    <span>
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback area */}
        {stepFeedback && (
          <div
            className={`p-4 rounded-2xl flex items-start gap-3 text-xs md:text-sm leading-relaxed ${
              isStepSuccess
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border border-amber-200 text-amber-900'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isStepSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600" />
              )}
            </div>
            <div>
              <p className="font-semibold">{stepFeedback}</p>
              {isStepSuccess && (
                <p className="text-emerald-800 mt-1">{currentStep.explanationOnSuccess}</p>
              )}
            </div>
          </div>
        )}

        {/* Advance or finish controls */}
        {isStepSuccess && !isFinishedAllSteps && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-2 active:scale-95"
            >
              <span>לצעד הבא</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Completion Banner */}
      {isFinishedAllSteps && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3 text-right">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-black">הצלחתם! פתרנו את הדוגמה יחד 👏</h3>
              <p className="text-xs text-white/90 mt-0.5">{togetherStage.summary}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRestart}
              className="px-3 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>שוב</span>
            </button>
            <button
              type="button"
              onClick={onContinueToPractice}
              className="px-6 py-3 bg-white text-emerald-800 hover:bg-emerald-50 font-black text-sm rounded-xl shadow-md flex items-center gap-2 active:scale-95"
            >
              <span>עכשיו תורך לתרגל בעצמך!</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
