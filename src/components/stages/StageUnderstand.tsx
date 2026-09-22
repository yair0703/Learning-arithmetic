import React from 'react';
import { TopicInfo, TopicLearningContent } from '../../types';
import { FractionBarVisualizer } from '../visuals/FractionBarVisualizer';
import { InteractiveNumberLine } from '../visuals/InteractiveNumberLine';
import { MixedFractionVisualizer } from '../visuals/MixedFractionVisualizer';
import { QuantityGroupVisualizer } from '../visuals/QuantityGroupVisualizer';
import { DecimalTableVisualizer } from '../visuals/DecimalTableVisualizer';
import { BookOpen, Sparkles, AlertTriangle, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface StageUnderstandProps {
  topic: TopicInfo;
  content: TopicLearningContent;
  onContinueToTogether: () => void;
}

export const StageUnderstand: React.FC<StageUnderstandProps> = ({
  topic,
  content,
  onContinueToTogether
}) => {
  const { understandStage } = content;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-2" id="stage-understand">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl text-white bg-gradient-to-r ${topic.bgGradient} shadow-md`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            שלב 1 מתוך 3: בוא נבין
          </div>
          <span className="text-xs text-white/80">מסלולים פלוס – כיתה ה׳</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black mb-2">{understandStage.title}</h1>
        <p className="text-sm md:text-base text-white/95 leading-relaxed">{understandStage.intro}</p>
      </div>

      {/* Key Concepts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {understandStage.keyPoints.map((point, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-2 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-base">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3>{point.title}</h3>
            </div>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">
              {point.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Visual Exploration */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center gap-4">
        <div className="text-center max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            המחשה חזותית אינטראקטיבית
          </div>
          <h2 className="text-lg font-bold text-slate-800">
            {understandStage.interactiveGuidePrompt}
          </h2>
        </div>

        {/* Dynamic visual by topic manipulative type */}
        <div className="w-full flex justify-center py-2">
          {understandStage.interactiveManipulativeType === 'bar' && (
            <FractionBarVisualizer
              totalParts={5}
              coloredParts={3}
              color="#4f46e5"
              interactive={true}
              onColoredChange={() => {}}
              showLabels={true}
            />
          )}

          {understandStage.interactiveManipulativeType === 'number-line' && (
            <InteractiveNumberLine
              min={0}
              max={1}
              divisions={5}
              targetIndex={3}
              dotColor="#059669"
              showLabels={true}
              showJumpArcs={true}
              interactive={true}
            />
          )}

          {understandStage.interactiveManipulativeType === 'mixed' && (
            <MixedFractionVisualizer
              wholeCount={2}
              remainder={1}
              denom={3}
              color="#d97706"
            />
          )}

          {understandStage.interactiveManipulativeType === 'quantity' && (
            <QuantityGroupVisualizer
              totalItems={12}
              groups={4}
              itemsPerGroup={3}
              selectedGroups={3}
              itemName="כוכבים"
            />
          )}

          {understandStage.interactiveManipulativeType === 'decimal' && (
            <DecimalTableVisualizer
              before="3.7"
              op="× 10"
              after="37"
              interactive={true}
            />
          )}
        </div>
      </div>

      {/* Common Mistake Warning */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-amber-900">
        <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm mb-0.5">שימו לב! טעות נפוצה שכדאי להכיר:</h4>
          <p className="text-xs md:text-sm text-amber-800 leading-relaxed">
            {understandStage.commonMistakeWarning}
          </p>
        </div>
      </div>

      {/* Action to proceed */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={onContinueToTogether}
          className="group px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base rounded-2xl shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-3 active:scale-98"
        >
          <span>הבנתי! בוא נעשה תרגיל יחד</span>
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
