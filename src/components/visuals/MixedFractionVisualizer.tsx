import React from 'react';

interface MixedFractionProps {
  wholeCount: number; // e.g. 2
  remainder: number;  // e.g. 1
  denom: number;      // e.g. 3
  color?: string;
  label?: string;
}

export const MixedFractionVisualizer: React.FC<MixedFractionProps> = ({
  wholeCount = 2,
  remainder = 1,
  denom = 3,
  color = '#f59e0b',
  label
}) => {
  const totalImproperNumerator = wholeCount * denom + remainder;

  return (
    <div className="w-full flex flex-col items-center gap-3 my-2" id="mixed-fraction-visualizer">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}

      <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-2xl w-full">
        {/* Whole Units */}
        {Array.from({ length: wholeCount }, (_, i) => (
          <div key={`whole-${i}`} className="flex flex-col items-center gap-1">
            <div className="w-28 h-12 bg-slate-100 rounded-lg border-2 border-amber-500 overflow-hidden flex p-0.5 gap-0.5 shadow-xs">
              {Array.from({ length: denom }, (_, j) => (
                <div
                  key={`whole-${i}-part-${j}`}
                  className="flex-1 h-full rounded flex items-center justify-center text-[10px] font-bold text-white shadow-xs"
                  style={{ backgroundColor: color }}
                >
                  1/{denom}
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              שלם 1 ({denom}/{denom})
            </span>
          </div>
        ))}

        {/* Remainder Part */}
        {remainder > 0 && (
          <div className="flex flex-col items-center gap-1">
            <div className="w-28 h-12 bg-slate-100 rounded-lg border-2 border-slate-400 overflow-hidden flex p-0.5 gap-0.5 shadow-xs">
              {Array.from({ length: denom }, (_, j) => {
                const isFilled = j < remainder;
                return (
                  <div
                    key={`rem-part-${j}`}
                    className={`flex-1 h-full rounded flex items-center justify-center text-[10px] font-bold ${
                      isFilled ? 'text-white shadow-xs' : 'bg-slate-200 text-slate-400'
                    }`}
                    style={{ backgroundColor: isFilled ? color : undefined }}
                  >
                    1/{denom}
                  </div>
                );
              })}
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              חלק נוסף ({remainder}/{denom})
            </span>
          </div>
        )}
      </div>

      {/* Math representation card */}
      <div className="flex flex-wrap items-center justify-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 px-5 py-2.5 rounded-xl shadow-xs text-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-medium">מספר מעורב:</span>
          <span className="text-lg font-black text-amber-900 bg-white px-3 py-1 rounded-lg border border-amber-200 shadow-xs">
            {wholeCount} ו-{remainder}/{denom}
          </span>
        </div>

        <span className="text-amber-500 font-bold text-lg">=</span>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 font-medium">שבר מדומה:</span>
          <span className="text-lg font-black text-amber-900 bg-white px-3 py-1 rounded-lg border border-amber-200 shadow-xs">
            {totalImproperNumerator}/{denom}
          </span>
        </div>

        <div className="text-xs text-slate-500 w-full text-center border-t border-amber-200/60 pt-1">
          (בסך הכל {totalImproperNumerator} חלקים, כאשר כל {denom} חלקים מרכיבים שלם אחד מלא)
        </div>
      </div>
    </div>
  );
};
