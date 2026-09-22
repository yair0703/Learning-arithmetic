import React, { useState } from 'react';
import { TopicId, StudentProgress, TopicStage } from '../types';
import { TOPICS, TOPIC_LEARNING_CONTENTS } from '../data/curriculumData';
import { StageUnderstand } from './stages/StageUnderstand';
import { StageTogether } from './stages/StageTogether';
import { StagePractice } from './stages/StagePractice';
import { TopicCompletionVisualizer } from './visuals/TopicCompletionVisualizer';
import { markStageCompleted, getTopicMastery } from '../utils/storage';
import { ArrowRight, BookOpen, Users, Award, Sparkles, Star, TrendingUp, Eye, X } from 'lucide-react';

interface TopicViewProps {
  topicId: TopicId;
  initialStage?: TopicStage;
  progress: StudentProgress;
  onProgressUpdate: (updated: StudentProgress) => void;
  onBackToHome: () => void;
  onOpenSandbox: () => void;
}

export const TopicView: React.FC<TopicViewProps> = ({
  topicId,
  initialStage = 'understand',
  progress,
  onProgressUpdate,
  onBackToHome,
  onOpenSandbox
}) => {
  const [currentStage, setCurrentStage] = useState<TopicStage>(initialStage);
  const [showVisualizerModal, setShowVisualizerModal] = useState<boolean>(false);

  const topic = TOPICS.find((t) => t.id === topicId) || TOPICS[0];
  const content = TOPIC_LEARNING_CONTENTS[topicId] || TOPIC_LEARNING_CONTENTS['whole-part'];
  const tp = progress.topicsProgress[topicId];
  const mastery = getTopicMastery(tp);

  const handleUnderstandDone = () => {
    const updated = markStageCompleted(progress, topicId, 'understand');
    onProgressUpdate(updated);
    setCurrentStage('together');
  };

  const handleTogetherDone = () => {
    const updated = markStageCompleted(progress, topicId, 'together');
    onProgressUpdate(updated);
    setCurrentStage('practice');
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl w-full mx-auto pb-10" id="topic-view-container">
      {/* Top Navigation Bar with Progress and Mastery */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-bold text-sm px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>חזרה לכל הנושאים</span>
        </button>

        {/* 3 Stage Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setCurrentStage('understand')}
            className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all ${
              currentStage === 'understand'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. בוא נבין {tp?.completedUnderstand ? '✓' : ''}</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentStage('together')}
            className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all ${
              currentStage === 'together'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>2. בוא נעשה יחד {tp?.completedTogether ? '✓' : ''}</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentStage('practice')}
            className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all ${
              currentStage === 'practice'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>3. עכשיו אתה {tp?.exercisesSolved ? `(${tp.exercisesSolved})` : ''}</span>
          </button>
        </div>

        {/* Topic Mastery, Visualizer and Sandbox Launcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowVisualizerModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors shadow-2xs"
            title="צפה בהמחשה דינמית של מושגי הפרק"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">המחשה דינמית</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-600">שליטה:</span>
            <span className="font-black text-indigo-600">{mastery.percentage}%</span>
            <div className="flex items-center">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${
                    s <= mastery.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenSandbox}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>מעבדה</span>
          </button>
        </div>
      </div>

      {/* Render Active Stage */}
      {currentStage === 'understand' && (
        <StageUnderstand
          topic={topic}
          content={content}
          onContinueToTogether={handleUnderstandDone}
        />
      )}

      {currentStage === 'together' && (
        <StageTogether
          topic={topic}
          content={content}
          onContinueToPractice={handleTogetherDone}
        />
      )}

      {currentStage === 'practice' && (
        <StagePractice
          topic={topic}
          progress={progress}
          onProgressUpdate={onProgressUpdate}
          onOpenSandbox={onOpenSandbox}
          onBackToHome={onBackToHome}
        />
      )}

      {/* Dynamic Visualizer Modal on Demand */}
      {showVisualizerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto">
            <button
              type="button"
              onClick={() => setShowVisualizerModal(false)}
              className="absolute -top-3 -left-3 z-20 w-9 h-9 bg-white text-slate-800 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <TopicCompletionVisualizer
              topicId={topic.id}
              topicTitle={topic.title}
              onExploreMore={() => {
                setShowVisualizerModal(false);
                onOpenSandbox();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
