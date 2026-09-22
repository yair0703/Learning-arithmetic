import React from 'react';

interface FractionCircleProps {
  totalParts: number;
  coloredParts: number;
  color?: string;
  size?: number;
  interactive?: boolean;
  onColoredChange?: (newCount: number) => void;
  label?: string;
}

export const FractionCircleVisualizer: React.FC<FractionCircleProps> = ({
  totalParts = 4,
  coloredParts = 1,
  color = '#f59e0b',
  size = 180,
  interactive = false,
  onColoredChange,
  label
}) => {
  const radius = size / 2 - 10;
  const center = size / 2;

  // Generate pie slices
  const slices = Array.from({ length: totalParts }, (_, i) => {
    const anglePerPart = (2 * Math.PI) / totalParts;
    const startAngle = i * anglePerPart - Math.PI / 2;
    const endAngle = (i + 1) * anglePerPart - Math.PI / 2;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = totalParts === 1 ? 1 : 0;

    const pathData =
      totalParts === 1
        ? `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center} ${center + radius} A ${radius} ${radius} 0 1 1 ${center} ${center - radius}`
        : `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    const isColored = i < coloredParts;

    return {
      index: i,
      pathData,
      isColored
    };
  });

  const handleSliceClick = (index: number) => {
    if (!interactive || !onColoredChange) return;
    if (coloredParts === index + 1) {
      onColoredChange(index);
    } else {
      onColoredChange(index + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 my-2" id="fraction-circle-container">
      {label && <span className="text-sm font-medium text-slate-600">{label}</span>}
      <div className="relative p-2 bg-white rounded-2xl shadow-sm border border-slate-200">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          {slices.map((slice) => (
            <path
              key={slice.index}
              d={slice.pathData}
              fill={slice.isColored ? color : '#f1f5f9'}
              stroke="#ffffff"
              strokeWidth="2.5"
              className={`transition-colors duration-200 ${
                interactive ? 'cursor-pointer hover:opacity-80' : ''
              }`}
              onClick={() => handleSliceClick(slice.index)}
            />
          ))}
          {/* Center pin */}
          <circle cx={center} cy={center} r="6" fill="#334155" />
        </svg>
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span>שבר מייצג:</span>
        <span className="font-bold text-base px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
          {coloredParts}/{totalParts}
        </span>
      </div>
    </div>
  );
};
