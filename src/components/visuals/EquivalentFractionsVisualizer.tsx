import React, { useState } from 'react';
import { Sparkles, Scissors, ArrowDown } from 'lucide-react';

interface EquivalentFractionsVisualizerProps {
  baseNum?: number;
  baseDenom?: number;
}

export const EquivalentFractionsVisualizer: React.FC<EquivalentFractionsVisualizerProps> = ({
  baseNum = 1,
  baseDenom = 2
}) => {
  const [num, setNum] = useState<number>(baseNum);
  const [denom, setDenom] = useState<number>(baseDenom);
  const [multiplier, setMultiplier] = useState<number>(2);

  const equivNum = num * multiplier;
  const equivDenom = denom * multiplier;

  return (
    <div className="flex flex-col gap-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs" id="equivalent-fractions-visualizer">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
            <Scissors className="w-4 h-4 text-indigo-600" />
            <span>חיתוך חלקים: המחשת שברים שקולים (הרחבה)</span>
          </h4>
          <p className="text-xs text-slate-500">
            ראו כיצד חיתוך כל חלק לחלקים קטנים יותר אינו משנה את השטח הצבוע כלל!
          </p>
        </div>

        {/* Base fraction picker */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-600">שבר מקורי:</span>
          {[
            { n: 1, d: 2, label: '1/2' },
            { n: 1, d: 3, label: '1/3' },
            { n: 2, d: 3, label: '2/3' },
            { n: 3, d: 4, label: '3/4' },
            { n: 2, d: 5, label: '2/5' }
          ].map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => {
                setNum(f.n);
                setDenom(f.d);
              }}
              className={`px-2 py-1 rounded-md font-bold transition-all ${
                num === f.n && denom === f.d
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Multiplier / Cut control */}
      <div className="flex items-center justify-center gap-3 bg-indigo-50 p-3 rounded-xl border border-indigo-200">
        <span className="text-xs font-bold text-indigo-950">
          כמה חלקים קטנים לחתוך מכל חלק קיים?
        </span>
        <div className="flex gap-1.5">
          {[2, 3, 4].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMultiplier(m)}
              className={`px-3 py-1 text-xs font-black rounded-lg transition-all ${
                multiplier === m
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              פי {m} (חתוך ל-{m})
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-side / Stacked Bars Comparison */}
      <div className="flex flex-col gap-6 py-2">
        {/* 1. Original Fraction Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>1. השבר המקורי:</span>
            <span className="text-indigo-600 font-mono text-sm">
              {num}/{denom} ({num} מתוך {denom} חלקים)
            </span>
          </div>

          <div className="w-full h-10 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-300 flex shadow-inner">
            {Array.from({ length: denom }).map((_, i) => {
              const isColored = i < num;
              return (
                <div
                  key={i}
                  className={`h-full border-l last:border-l-0 border-slate-300 transition-colors flex items-center justify-center text-xs font-bold ${
                    isColored ? 'bg-indigo-500 text-white' : 'bg-white text-slate-400'
                  }`}
                  style={{ width: `${100 / denom}%` }}
                >
                  1/{denom}
                </div>
              );
            })}
          </div>
        </div>

        {/* Transition indicator */}
        <div className="flex items-center justify-center gap-2 text-xs font-black text-indigo-600">
          <ArrowDown className="w-4 h-4 animate-bounce" />
          <span>חותכים כל חלק ל-{multiplier} חלקים שווים בדיוק</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>

        {/* 2. Subdivided / Equivalent Fraction Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>2. השבר לאחר החיתוך (שקול בגודלו!):</span>
            <span className="text-purple-600 font-mono text-sm">
              {equivNum}/{equivDenom} ({equivNum} מתוך {equivDenom} חלקים)
            </span>
          </div>

          <div className="w-full h-10 bg-slate-100 rounded-xl overflow-hidden border-2 border-purple-300 flex shadow-inner">
            {Array.from({ length: equivDenom }).map((_, i) => {
              const isColored = i < equivNum;
              const isOriginalBoundary = (i + 1) % multiplier === 0;

              return (
                <div
                  key={i}
                  className={`h-full border-l last:border-l-0 transition-colors flex items-center justify-center text-[10px] font-semibold ${
                    isOriginalBoundary ? 'border-slate-800/60' : 'border-dashed border-slate-300'
                  } ${isColored ? 'bg-purple-500 text-white' : 'bg-white text-slate-400'}`}
                  style={{ width: `${100 / equivDenom}%` }}
                >
                  1/{equivDenom}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pedagogical Explanation Box */}
      <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-950 flex items-start gap-2 leading-relaxed">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-black mb-0.5 text-emerald-900">
            שימו לב: השטח הצבוע זהה לחלוטין!
          </strong>
          <span>
            למרות שהמספרים השתנו ({num}/{denom} הפך ל-{equivNum}/{equivDenom}), לא
            הוספנו ולא גרענו שום חומר. כפלנו גם את המונה וגם את המכנה פי {multiplier} – ולכן
            השברים שווים בערכם: <strong>{num}/{denom} = {equivNum}/{equivDenom}</strong>.
          </span>
        </div>
      </div>
    </div>
  );
};
