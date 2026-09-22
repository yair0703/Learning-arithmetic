import React from 'react';

interface FractionBarProps {
  totalParts: number;
  coloredParts: number;
  color?: string;
  interactive?: boolean;
  onColoredChange?: (newColored: number) => void;
  showLabels?: boolean;
  showPartNumbers?: boolean;
  showInfoFooter?: boolean;
  label?: string;
  height?: string;
}

export const FractionBarVisualizer: React.FC<FractionBarProps> = ({
  totalParts = 5,
  coloredParts = 3,
  color = '#4f46e5',
  interactive = false,
  onColoredChange,
  showLabels = false,
  showPartNumbers = false,
  showInfoFooter = false,
  label,
  height = 'h-14'
}) => {
  const parts = Array.from({ length: totalParts }, (_, i) => i);

  const handleClick = (index: number) => {
    if (!interactive || !onColoredChange) return;
    // If clicking on the currently last colored item or beyond, set to index + 1
    // If clicking on an already colored item, toggle or set to that count
    if (coloredParts === index + 1) {
      onColoredChange(index);
    } else {
      onColoredChange(index + 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 my-2" id="fraction-bar-container">
      {label && <span className="text-sm font-medium text-slate-600">{label}</span>}

      <div
        className={`w-full max-w-xl ${height} bg-white rounded-xl border-2 border-slate-300 shadow-inner flex overflow-hidden p-1 gap-1 transition-all`}
        id="fraction-bar-track"
      >
        {parts.map((i) => {
          const isColored = i < coloredParts;
          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(i)}
              className={`flex-1 h-full rounded-lg transition-all duration-300 flex flex-col items-center justify-center relative select-none ${
                interactive ? 'cursor-pointer hover:opacity-90 active:scale-95' : 'cursor-default'
              } ${
                isColored
                  ? 'shadow-sm text-white font-semibold'
                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              }`}
              style={{
                backgroundColor: isColored ? color : undefined
              }}
              title={interactive ? `לחץ לצביעת חלק ${i + 1}` : undefined}
            >
              {showPartNumbers && (
                <span className="text-xs font-mono font-bold drop-shadow-xs">
                  {i + 1}
                </span>
              )}
              {showLabels && (
                <span className="text-[10px] opacity-80 mt-0.5 font-bold">
                  1/{totalParts}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {showInfoFooter && (
        <div className="flex items-center gap-4 text-sm text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full">
          <span className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 rounded-full inline-block"
              style={{ backgroundColor: color }}
            />
            חלקים צבועים (מונה): <strong className="font-bold text-slate-900">{coloredParts}</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span>
            סך הכל חלקים שווים (מכנה): <strong className="font-bold text-slate-900">{totalParts}</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            {coloredParts}/{totalParts}
          </span>
        </div>
      )}
    </div>
  );
};
