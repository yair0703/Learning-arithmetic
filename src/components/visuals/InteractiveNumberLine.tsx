import React, { useState } from 'react';

interface NumberLineProps {
  min?: number;
  max?: number;
  divisions?: number; // subdivisions per whole unit, e.g. 4 for quarters
  targetIndex?: number; // tick index from 0 to totalTicks
  dotColor?: string;
  showLabels?: boolean;
  showMarkerLabel?: boolean;
  showInfoFooter?: boolean;
  showJumpArcs?: boolean;
  interactive?: boolean;
  selectedIndex?: number;
  onSelectTick?: (tickIndex: number) => void;
  label?: string;
}

export const InteractiveNumberLine: React.FC<NumberLineProps> = ({
  min = 0,
  max = 1,
  divisions = 4,
  targetIndex,
  dotColor = '#ef4444',
  showLabels = false,
  showMarkerLabel = false,
  showInfoFooter = false,
  showJumpArcs = false,
  interactive = false,
  selectedIndex,
  onSelectTick,
  label
}) => {
  const [hoveredTick, setHoveredTick] = useState<number | null>(null);

  const unitsCount = max - min;
  const totalSteps = unitsCount * divisions;

  // SVG coordinates
  const svgWidth = 620;
  const svgHeight = 150;
  const paddingX = 50;
  const lineY = 85;
  const usableWidth = svgWidth - paddingX * 2;
  const stepWidth = usableWidth / totalSteps;

  const getTickX = (stepIndex: number) => {
    return paddingX + stepIndex * stepWidth;
  };

  const getFractionLabel = (stepIndex: number) => {
    const whole = Math.floor(stepIndex / divisions) + min;
    const remainder = stepIndex % divisions;

    if (remainder === 0) return `${whole}`;
    if (whole === 0) return `${remainder}/${divisions}`;
    return `${whole} ו-${remainder}/${divisions}`;
  };

  const activeDotIndex = selectedIndex !== undefined ? selectedIndex : targetIndex;

  return (
    <div className="w-full flex flex-col items-center gap-2 my-3 select-none" id="number-line-component">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}

      <div className="w-full max-w-2xl bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto min-w-[320px] sm:min-w-0"
        >
          {/* Main Axis Line */}
          <line
            x1={paddingX - 15}
            y1={lineY}
            x2={svgWidth - paddingX + 15}
            y2={lineY}
            stroke="#334155"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Left and Right Arrow Heads */}
          <polygon
            points={`${paddingX - 25},${lineY} ${paddingX - 10},${lineY - 6} ${paddingX - 10},${lineY + 6}`}
            fill="#334155"
          />
          <polygon
            points={`${svgWidth - paddingX + 25},${lineY} ${svgWidth - paddingX + 10},${lineY - 6} ${svgWidth - paddingX + 10},${lineY + 6}`}
            fill="#334155"
          />

          {/* Jump Arcs if requested */}
          {showJumpArcs &&
            Array.from({ length: totalSteps }, (_, i) => {
              if (activeDotIndex !== undefined && i >= activeDotIndex) return null;
              const startX = getTickX(i);
              const endX = getTickX(i + 1);
              const arcY = lineY - 24;
              return (
                <g key={`arc-${i}`}>
                  <path
                    d={`M ${startX} ${lineY - 8} Q ${(startX + endX) / 2} ${arcY} ${endX} ${lineY - 8}`}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={(startX + endX) / 2}
                    y={arcY - 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="#0284c7"
                  >
                    +{1}/{divisions}
                  </text>
                </g>
              );
            })}

          {/* Ticks and Division markings */}
          {Array.from({ length: totalSteps + 1 }, (_, i) => {
            const x = getTickX(i);
            const isWhole = i % divisions === 0;
            const wholeVal = Math.floor(i / divisions) + min;
            const tickHeight = isWhole ? 26 : 14;
            const tickY1 = lineY - tickHeight / 2;
            const tickY2 = lineY + tickHeight / 2;

            const isHovered = hoveredTick === i;
            const isSelected = activeDotIndex === i;

            return (
              <g
                key={`tick-${i}`}
                className={interactive ? 'cursor-pointer' : ''}
                onClick={() => {
                  if (interactive && onSelectTick) {
                    onSelectTick(i);
                  }
                }}
                onMouseEnter={() => setHoveredTick(i)}
                onMouseLeave={() => setHoveredTick(null)}
              >
                {/* Hit area for easier touch/click */}
                {interactive && (
                  <rect
                    x={x - stepWidth / 2}
                    y={lineY - 30}
                    width={stepWidth}
                    height={65}
                    fill="transparent"
                  />
                )}

                {/* Tick mark */}
                <line
                  x1={x}
                  y1={tickY1}
                  x2={x}
                  y2={tickY2}
                  stroke={isWhole ? '#0f172a' : '#64748b'}
                  strokeWidth={isWhole ? '3.5' : '2'}
                  strokeLinecap="round"
                />

                {/* Whole number label */}
                {isWhole && (
                  <text
                    x={x}
                    y={lineY + 34}
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill="#0f172a"
                  >
                    {wholeVal}
                  </text>
                )}

                {/* Fraction labels only if explicitly requested */}
                {(!isWhole && showLabels && (isHovered || isSelected)) && (
                  <text
                    x={x}
                    y={lineY + 30}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="600"
                    fill={isSelected ? '#dc2626' : '#475569'}
                  >
                    {getFractionLabel(i)}
                  </text>
                )}
              </g>
            );
          })}

          {/* Active / Target Marker Dot */}
          {activeDotIndex !== undefined && (
            <g>
              <circle
                cx={getTickX(activeDotIndex)}
                cy={lineY}
                r="10"
                fill={dotColor}
                stroke="#ffffff"
                strokeWidth="3"
                className="drop-shadow-md animate-pulse"
              />
              {showMarkerLabel && (
                <>
                  <path
                    d={`M ${getTickX(activeDotIndex)} ${lineY - 14} L ${getTickX(activeDotIndex) - 8} ${lineY - 26} L ${getTickX(activeDotIndex) + 8} ${lineY - 26} Z`}
                    fill={dotColor}
                  />
                  <rect
                    x={getTickX(activeDotIndex) - 28}
                    y={lineY - 48}
                    width="56"
                    height="22"
                    rx="6"
                    fill={dotColor}
                  />
                  <text
                    x={getTickX(activeDotIndex)}
                    y={lineY - 33}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#ffffff"
                  >
                    {getFractionLabel(activeDotIndex)}
                  </text>
                </>
              )}
            </g>
          )}
        </svg>

        {interactive && (
          <p className="text-xs text-center text-slate-500 mt-1">
            👆 לחצו על השנתות כדי למקם את השבר על הישר
          </p>
        )}
      </div>

      {showInfoFooter && (
        <div className="flex items-center gap-3 text-xs md:text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
          <span>
            כל יחידה שלמה (מ-0 עד 1) חולקה ל-<strong>{divisions}</strong> קטעים שווים
          </span>
          <span>•</span>
          <span>
            גודל כל צעד: <strong>1/{divisions}</strong>
          </span>
        </div>
      )}
    </div>
  );
};
