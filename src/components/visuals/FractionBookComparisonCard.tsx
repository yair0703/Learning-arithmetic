import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface FractionBookComparisonCardProps {
  leftDisplay: string;  // e.g. "25/13" or "1 3/8" or "1"
  rightDisplay: string; // e.g. "1" or "1 3/5" or "11/9"
  correctSymbol: '>' | '<' | '=';
  onAnswerSelected?: (isCorrect: boolean, symbol: string) => void;
  reasonExplanation?: string;
}

export const FractionBookComparisonCard: React.FC<FractionBookComparisonCardProps> = ({
  leftDisplay,
  rightDisplay,
  correctSymbol,
  onAnswerSelected,
  reasonExplanation
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleChoose = (symbol: '>' | '<' | '=') => {
    if (hasAnswered) return;
    setSelectedSymbol(symbol);
    const correct = symbol === correctSymbol;
    setHasAnswered(true);
    onAnswerSelected?.(correct, symbol);
  };

  const renderMathFraction = (str: string) => {
    if (str.includes(' ')) {
      const [whole, frac] = str.split(' ');
      const [n, d] = frac.split('/');
      return (
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <span className="text-2xl md:text-3xl font-black">{whole}</span>
          <div className="flex flex-col items-center leading-none text-base md:text-lg">
            <span className="border-b-2 border-slate-800 px-1">{n}</span>
            <span>{d}</span>
          </div>
        </div>
      );
    }
    if (str.includes('/')) {
      const [n, d] = str.split('/');
      return (
        <div className="flex flex-col items-center leading-none text-xl md:text-2xl font-bold text-slate-800">
          <span className="border-b-2 border-slate-800 px-1">{n}</span>
          <span>{d}</span>
        </div>
      );
    }
    return <span className="text-2xl md:text-3xl font-black text-slate-800">{str}</span>;
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-4 p-5 bg-white rounded-3xl border-2 border-amber-200/90 shadow-sm">
      <div className="text-xs font-bold text-slate-500 text-center">
        השלימו את הסימן המתאים: <span className="font-mono text-amber-600 font-black">&gt;</span> או{' '}
        <span className="font-mono text-amber-600 font-black">&lt;</span> או{' '}
        <span className="font-mono text-amber-600 font-black">=</span>
      </div>

      {/* Equation display in Book style */}
      <div className="flex items-center justify-center gap-4 md:gap-8 py-3 px-6 bg-amber-50/50 rounded-2xl border border-amber-100 w-full">
        {/* Left Fraction */}
        <div className="min-w-[70px] flex items-center justify-center">
          {renderMathFraction(leftDisplay)}
        </div>

        {/* Center Slot with Dashes or Selected Symbol */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black transition-all ${
            selectedSymbol
              ? hasAnswered && selectedSymbol === correctSymbol
                ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400'
                : 'bg-rose-100 text-rose-800 border-2 border-rose-400'
              : 'border-2 border-dashed border-amber-400 bg-white text-slate-300'
          }`}
        >
          {selectedSymbol || '?'}
        </div>

        {/* Right Fraction */}
        <div className="min-w-[70px] flex items-center justify-center">
          {renderMathFraction(rightDisplay)}
        </div>
      </div>

      {/* 3 Choice Buttons: > / = / < */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {(['>', '=', '<'] as const).map((sym) => {
          const isSelected = selectedSymbol === sym;
          let btnColor = 'bg-slate-50 hover:bg-amber-100 text-slate-800 border-slate-200';

          if (isSelected) {
            if (hasAnswered) {
              btnColor = sym === correctSymbol ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white';
            } else {
              btnColor = 'bg-amber-400 text-slate-900 border-amber-500';
            }
          }

          return (
            <button
              key={sym}
              type="button"
              onClick={() => handleChoose(sym)}
              disabled={hasAnswered}
              className={`py-3 rounded-2xl border-2 font-mono text-2xl font-black shadow-xs transition-all active:scale-95 flex items-center justify-center ${btnColor}`}
            >
              {sym}
            </button>
          );
        })}
      </div>

      {/* Explanation when answered */}
      {hasAnswered && (
        <div
          className={`w-full p-3.5 rounded-2xl border flex items-start gap-2.5 text-xs md:text-sm animate-in fade-in ${
            selectedSymbol === correctSymbol
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          {selectedSymbol === correctSymbol ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          )}
          <div>
            <div className="font-bold">
              {selectedSymbol === correctSymbol ? 'תשובה נכונה! 👏' : `התשובה הנכונה היא: ${correctSymbol}`}
            </div>
            {reasonExplanation && <div className="mt-1 leading-relaxed">{reasonExplanation}</div>}
          </div>
        </div>
      )}
    </div>
  );
};
