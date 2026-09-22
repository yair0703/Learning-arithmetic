import React, { useState } from 'react';
import { Scale, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

interface FractionCompareVisualizerProps {
  initialNumA?: number;
  initialDenomA?: number;
  initialNumB?: number;
  initialDenomB?: number;
}

export const FractionCompareVisualizer: React.FC<FractionCompareVisualizerProps> = ({
  initialNumA = 1,
  initialDenomA = 3,
  initialNumB = 1,
  initialDenomB = 4
}) => {
  const [numA, setNumA] = useState<number>(initialNumA);
  const [denomA, setDenomA] = useState<number>(initialDenomA);

  const [numB, setNumB] = useState<number>(initialNumB);
  const [denomB, setDenomB] = useState<number>(initialDenomB);

  const valA = numA / denomA;
  const valB = numB / denomB;

  let comparisonSign = '=';
  let comparisonExplanation = '';

  if (Math.abs(valA - valB) < 0.0001) {
    comparisonSign = '=';
    comparisonExplanation = 'השברים שווים בדיוק בגודלם (שקולים)!';
  } else if (valA > valB) {
    comparisonSign = '>';
    if (numA === numB) {
      comparisonExplanation = `לשני השברים אותו מונה (${numA}), אך המכנה בראשון (${denomA}) קטן יותר מהשני (${denomB}), ולכן חלקיו גדולים יותר!`;
    } else if (denomA === denomB) {
      comparisonExplanation = `לשני השברים אותו מכנה (${denomA}), והמונה בראשון (${numA}) גדול יותר (${numA} > ${numB}).`;
    } else {
      comparisonExplanation = `${numA}/${denomA} (${valA.toFixed(2)}) גדול יותר מ-${numB}/${denomB} (${valB.toFixed(2)}).`;
    }
  } else {
    comparisonSign = '<';
    if (numA === numB) {
      comparisonExplanation = `לשני השברים אותו מונה (${numA}), אך המכנה בשני (${denomB}) קטן יותר (${denomB} < ${denomA}), ולכן חלקיו גדולים יותר!`;
    } else if (denomA === denomB) {
      comparisonExplanation = `לשני השברים אותו מכנה (${denomA}), והמונה בשני (${numB}) גדול יותר.`;
    } else {
      comparisonExplanation = `${numA}/${denomA} (${valA.toFixed(2)}) קטן יותר מ-${numB}/${denomB} (${valB.toFixed(2)}).`;
    }
  }

  return (
    <div className="flex flex-col gap-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs" id="fraction-compare-visualizer">
      {/* Title */}
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-3">
        <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
          <Scale className="w-4 h-4 text-amber-600" />
          <span>השוואת שברים זה לצד זה: מי גדול יותר?</span>
        </h4>
        <p className="text-xs text-slate-500">
          בדקו כיצד שני שברים שונים נראים על פסים באותו האורך המדויק.
        </p>
      </div>

      {/* Quick Comparison Presets */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-slate-600">דוגמאות נפוצות:</span>
        <button
          type="button"
          onClick={() => {
            setNumA(1);
            setDenomA(3);
            setNumB(1);
            setDenomB(4);
          }}
          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg font-bold border border-amber-200"
        >
          1/3 מול 1/4 (מונה שווה)
        </button>
        <button
          type="button"
          onClick={() => {
            setNumA(2);
            setDenomA(5);
            setNumB(4);
            setDenomB(5);
          }}
          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg font-bold border border-blue-200"
        >
          2/5 מול 4/5 (מכנה שווה)
        </button>
        <button
          type="button"
          onClick={() => {
            setNumA(1);
            setDenomA(2);
            setNumB(2);
            setDenomB(4);
          }}
          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg font-bold border border-emerald-200"
        >
          1/2 מול 2/4 (שקולים)
        </button>
      </div>

      {/* Synchronized Parallel Bars */}
      <div className="flex flex-col gap-4 py-2">
        {/* Fraction A */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-indigo-800">שבר א׳: {numA}/{denomA}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">מונה:</span>
              <button
                type="button"
                onClick={() => setNumA(Math.max(1, numA - 1))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold"
              >
                -
              </button>
              <span className="font-mono font-bold text-indigo-600">{numA}</span>
              <button
                type="button"
                onClick={() => setNumA(Math.min(denomA, numA + 1))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold"
              >
                +
              </button>
              <span className="text-slate-500 mr-2">מכנה:</span>
              <button
                type="button"
                onClick={() => setDenomA(Math.max(2, denomA - 1))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold"
              >
                -
              </button>
              <span className="font-mono font-bold text-indigo-600">{denomA}</span>
              <button
                type="button"
                onClick={() => setDenomA(Math.min(12, denomA + 1))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="relative w-full h-9 bg-slate-100 rounded-xl overflow-hidden border-2 border-indigo-300 flex shadow-inner">
            {Array.from({ length: denomA }).map((_, i) => (
              <div
                key={i}
                className={`h-full border-l last:border-l-0 border-indigo-200 flex items-center justify-center text-xs font-bold ${
                  i < numA ? 'bg-indigo-500 text-white' : 'bg-white text-slate-400'
                }`}
                style={{ width: `${100 / denomA}%` }}
              >
                1/{denomA}
              </div>
            ))}
            {/* Length indicator mark */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-indigo-900 pointer-events-none z-10"
              style={{ left: `${(numA / denomA) * 100}%` }}
            />
          </div>
        </div>

        {/* Center Result Badge */}
        <div className="flex items-center justify-center gap-3 my-1">
          <span className="text-sm font-bold text-indigo-900 font-mono">{numA}/{denomA}</span>
          <span className="w-9 h-9 rounded-full bg-amber-500 text-white font-black text-lg flex items-center justify-center shadow-xs">
            {comparisonSign}
          </span>
          <span className="text-sm font-bold text-teal-900 font-mono">{numB}/{denomB}</span>
        </div>

        {/* Fraction B */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-teal-800">שבר ב׳: {numB}/{denomB}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">מונה:</span>
              <button
                type="button"
                onClick={() => setNumB(Math.max(1, numB - 1))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold"
              >
                -
              </button>
              <span className="font-mono font-bold text-teal-600">{numB}</span>
              <button
                type="button"
                onClick={() => setNumB(Math.min(denomB, numB + 1))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold"
              >
                +
              </button>
              <span className="text-slate-500 mr-2">מכנה:</span>
              <button
                type="button"
                onClick={() => setDenomB(Math.max(2, denomB - 1))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold"
              >
                -
              </button>
              <span className="font-mono font-bold text-teal-600">{denomB}</span>
              <button
                type="button"
                onClick={() => setDenomB(Math.min(12, denomB + 1))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="relative w-full h-9 bg-slate-100 rounded-xl overflow-hidden border-2 border-teal-300 flex shadow-inner">
            {Array.from({ length: denomB }).map((_, i) => (
              <div
                key={i}
                className={`h-full border-l last:border-l-0 border-teal-200 flex items-center justify-center text-xs font-bold ${
                  i < numB ? 'bg-teal-500 text-white' : 'bg-white text-slate-400'
                }`}
                style={{ width: `${100 / denomB}%` }}
              >
                1/{denomB}
              </div>
            ))}
            {/* Length indicator mark */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-teal-900 pointer-events-none z-10"
              style={{ left: `${(numB / denomB) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-950 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold text-amber-900 mb-0.5">
            הסבר ההשוואה:
          </strong>
          <span>{comparisonExplanation}</span>
        </div>
      </div>
    </div>
  );
};
