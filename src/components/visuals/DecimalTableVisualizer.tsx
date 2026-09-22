import React, { useState, useEffect } from 'react';

interface DecimalTableProps {
  before?: string | number;
  op?: string;
  after?: string | number;
  factor?: number;
  interactive?: boolean;
  label?: string;
}

export const DecimalTableVisualizer: React.FC<DecimalTableProps> = ({
  before = '3.7',
  op = '× 10',
  after = '37',
  factor,
  interactive = false,
  label
}) => {
  const initialNum = typeof before === 'number' ? before : parseFloat(String(before)) || 3.7;
  const [currentVal, setCurrentVal] = useState<number>(initialNum);
  const [lastAction, setLastAction] = useState<string>(op || '');

  useEffect(() => {
    const val = typeof before === 'number' ? before : parseFloat(String(before)) || 3.7;
    setCurrentVal(val);
    setLastAction(op || '');
  }, [before, op]);

  const handleMultiply10 = () => {
    setCurrentVal((prev) => Math.round(prev * 10 * 1000) / 1000);
    setLastAction('כפל ב-10 (הנקודה זזה ימינה צעד 1)');
  };

  const handleMultiply100 = () => {
    setCurrentVal((prev) => Math.round(prev * 100 * 1000) / 1000);
    setLastAction('כפל ב-100 (הנקודה זזה ימינה 2 צעדים)');
  };

  const handleDivide10 = () => {
    setCurrentVal((prev) => Math.round((prev / 10) * 1000) / 1000);
    setLastAction('חילוק ב-10 (הנקודה זזה שמאלה צעד 1)');
  };

  const handleDivide100 = () => {
    setCurrentVal((prev) => Math.round((prev / 100) * 1000) / 1000);
    setLastAction('חילוק ב-100 (הנקודה זזה שמאלה 2 צעדים)');
  };

  const handleReset = (val: number) => {
    setCurrentVal(val);
    setLastAction('איפוס מספר');
  };

  // Extract digits accurately
  const num = typeof currentVal === 'number' ? currentVal : parseFloat(String(currentVal)) || 0;
  const absNum = Math.abs(num);
  const parts = absNum.toString().split('.');
  const intStr = parts[0] || '0';
  const fracStr = parts[1] || '';

  const intLen = intStr.length;
  const hundreds = intLen >= 3 ? intStr[intLen - 3] : '-';
  const tens = intLen >= 2 ? intStr[intLen - 2] : '-';
  const units = intStr[intLen - 1] || '0';

  const tenths = fracStr.length >= 1 ? fracStr[0] : (fracStr.length > 0 ? '0' : '-');
  const hundredths = fracStr.length >= 2 ? fracStr[1] : '-';
  const thousandths = fracStr.length >= 3 ? fracStr[2] : '-';

  return (
    <div className="w-full flex flex-col items-center gap-3 my-1" id="decimal-table-visualizer">
      {label && <span className="text-xs md:text-sm font-semibold text-slate-700">{label}</span>}

      {/* Place Value Table Container - fully responsive */}
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-xs p-3 sm:p-4 overflow-hidden">
        <div className="text-xs font-bold text-slate-600 mb-2.5 text-center flex items-center justify-center gap-2">
          <span>לוח המבנה העשרוני – ערך המקום של כל ספרה</span>
          {op && !interactive && (
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full font-mono text-xs font-black border border-indigo-200">
              {op}
            </span>
          )}
        </div>

        {/* LTR Mathematical Grid: מאות (100) on left -> אלפיות (1/1000) on right */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center font-mono w-full" dir="ltr">
          {/* Header Row */}
          <div className="bg-slate-100 p-1 sm:p-2 rounded-lg flex flex-col justify-center items-center">
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 leading-tight">מאות</span>
            <span className="text-[9px] sm:text-[10px] text-slate-500">(100)</span>
          </div>
          <div className="bg-slate-100 p-1 sm:p-2 rounded-lg flex flex-col justify-center items-center">
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 leading-tight">עשרות</span>
            <span className="text-[9px] sm:text-[10px] text-slate-500">(10)</span>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 p-1 sm:p-2 rounded-lg flex flex-col justify-center items-center">
            <span className="text-[10px] sm:text-xs font-bold text-indigo-700 leading-tight">יחידות</span>
            <span className="text-[9px] sm:text-[10px] text-indigo-500">(1)</span>
          </div>
          <div className="bg-rose-100 border border-rose-200 p-1 sm:p-2 rounded-lg flex flex-col justify-center items-center">
            <span className="text-[10px] sm:text-xs font-black text-rose-700">נקודה</span>
            <span className="text-[11px] font-black text-rose-700">•</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-1 sm:p-2 rounded-lg flex flex-col justify-center items-center">
            <span className="text-[10px] sm:text-xs font-bold text-amber-800 leading-tight">עשיריות</span>
            <span className="text-[9px] sm:text-[10px] text-amber-600">(0.1)</span>
          </div>
          <div className="bg-slate-100 p-1 sm:p-2 rounded-lg flex flex-col justify-center items-center">
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 leading-tight">מאיות</span>
            <span className="text-[9px] sm:text-[10px] text-slate-500">(0.01)</span>
          </div>
          <div className="bg-slate-100 p-1 sm:p-2 rounded-lg flex flex-col justify-center items-center">
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 leading-tight">אלפיות</span>
            <span className="text-[9px] sm:text-[10px] text-slate-500">(0.001)</span>
          </div>

          {/* Value Display Row */}
          <div className="bg-slate-50 border border-slate-200 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base md:text-lg font-bold text-slate-700 flex items-center justify-center">
            {hundreds}
          </div>
          <div className="bg-slate-50 border border-slate-200 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base md:text-lg font-bold text-slate-700 flex items-center justify-center">
            {tens}
          </div>
          <div className="bg-indigo-50/70 border border-indigo-200 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base md:text-lg font-black text-indigo-700 flex items-center justify-center">
            {units}
          </div>
          <div className="bg-rose-50 border border-rose-200 py-2 sm:py-2.5 rounded-lg text-base sm:text-xl font-black text-rose-600 flex items-center justify-center">
            •
          </div>
          <div className="bg-amber-50/70 border border-amber-200 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base md:text-lg font-black text-amber-800 flex items-center justify-center">
            {tenths}
          </div>
          <div className="bg-slate-50 border border-slate-200 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base md:text-lg font-bold text-slate-700 flex items-center justify-center">
            {hundredths}
          </div>
          <div className="bg-slate-50 border border-slate-200 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base md:text-lg font-bold text-slate-700 flex items-center justify-center">
            {thousandths}
          </div>
        </div>

        {/* Current Number & Status Banner */}
        {interactive ? (
          <div className="mt-3 p-2.5 sm:p-3 bg-fuchsia-50 border border-fuchsia-200 rounded-xl flex items-center justify-between">
            <div className="text-xs text-fuchsia-800 font-medium">
              פעולה: <span className="font-bold">{lastAction}</span>
            </div>
            <div className="text-lg sm:text-xl font-mono font-black text-fuchsia-900 bg-white px-3 py-0.5 rounded-lg border border-fuchsia-200 shadow-xs">
              {currentVal}
            </div>
          </div>
        ) : (
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>המספר: <strong className="font-mono text-slate-800 text-sm">{before}</strong></span>
            {op && (
              <span className="text-indigo-600 font-bold">
                {op.includes('×') || op.includes('כפל') || op.includes('mult')
                  ? 'הנקודה נעה ימינה (המספר גדל)'
                  : 'הנקודה נעה שמאלה (המספר קטן)'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Interactive Controls (only when interactive=true, e.g. Stage 1) */}
      {interactive && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-xl w-full">
          <button
            type="button"
            onClick={handleMultiply10}
            className="px-2.5 sm:px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            × 10 (הגדלה פי 10)
          </button>
          <button
            type="button"
            onClick={handleMultiply100}
            className="px-2.5 sm:px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            × 100 (הגדלה פי 100)
          </button>
          <button
            type="button"
            onClick={handleDivide10}
            className="px-2.5 sm:px-3 py-1.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            ÷ 10 (הקטנה פי 10)
          </button>
          <button
            type="button"
            onClick={handleDivide100}
            className="px-2.5 sm:px-3 py-1.5 bg-sky-700 hover:bg-sky-800 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            ÷ 100 (הקטנה פי 100)
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 sm:mt-0">
            <span>דוגמאות:</span>
            <button
              type="button"
              onClick={() => handleReset(3.7)}
              className="text-indigo-600 hover:underline px-1 py-0.5 font-bold"
            >
              3.7
            </button>
            <button
              type="button"
              onClick={() => handleReset(0.45)}
              className="text-indigo-600 hover:underline px-1 py-0.5 font-bold"
            >
              0.45
            </button>
            <button
              type="button"
              onClick={() => handleReset(2.5)}
              className="text-indigo-600 hover:underline px-1 py-0.5 font-bold"
            >
              2.5
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

