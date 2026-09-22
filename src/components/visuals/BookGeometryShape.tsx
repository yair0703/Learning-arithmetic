import React, { useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export type BookShapeKind =
  | 'cross_5'        // צלב מחולק ל-5 ריבועים שווים
  | 'triangle_4'     // משולש שווה צלעות מחולק ל-4 משולשים שווים
  | 'pentagon_5'     // מחומש משוכלל מחולק ל-5 משולשים שווים
  | 'rectangle_unequal_5' // מלבן מחולק ל-5 חלקים לא שווים (מלכודת מהספר!)
  | 'trapezoid_unequal_5' // טרפז עם קווים אופקיים (חלקים לא שווים - מהספר!)
  | 'star_5'         // כוכב מחומש מחולק ל-5 או 10
  | 'rectangle_10_triangles' // מלבן מחולק ל-10 משולשים שווים באלכסונים
  | 'bar_grid_8'     // רשת 2x4 של 8 מלבנים שווים
  | 'circle_sector_5' // עיגול מחולק ל-5 גזרות
  | 'circle_sector_6'; // עיגול מחולק ל-6

export interface BookGeometryShapeProps {
  shapeKind: BookShapeKind;
  coloredPartIndices?: number[];
  interactiveColoring?: boolean;
  onColoredChange?: (indices: number[]) => void;
  caption?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BookGeometryShape: React.FC<BookGeometryShapeProps> = ({
  shapeKind,
  coloredPartIndices = [],
  interactiveColoring = false,
  onColoredChange,
  caption,
  size = 'md'
}) => {
  const [selectedParts, setSelectedParts] = useState<number[]>(coloredPartIndices);

  const togglePart = (index: number) => {
    if (!interactiveColoring) return;
    let next: number[];
    if (selectedParts.includes(index)) {
      next = selectedParts.filter((i) => i !== index);
    } else {
      next = [...selectedParts, index];
    }
    setSelectedParts(next);
    onColoredChange?.(next);
  };

  const isColored = (index: number) => selectedParts.includes(index);

  // Soft educational pastel colors matching "Shevilim Plus" book
  const activeFill = '#93c5fd'; // Soft sky blue as in the book
  const inactiveFill = '#ffffff';
  const strokeColor = '#334155';
  const strokeWidth = 2;

  const widthClass = size === 'sm' ? 'w-36 h-28' : size === 'lg' ? 'w-72 h-56' : 'w-56 h-40';

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-xs">
      <div className={`relative flex items-center justify-center ${widthClass}`}>
        {shapeKind === 'cross_5' && (
          <svg viewBox="0 0 150 150" className="w-full h-full">
            {/* Cross made of 5 equal squares (50x50 each) */}
            {/* Top */}
            <rect
              x="50"
              y="5"
              width="50"
              height="45"
              fill={isColored(0) ? activeFill : inactiveFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => togglePart(0)}
              className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
            />
            {/* Left */}
            <rect
              x="5"
              y="50"
              width="45"
              height="50"
              fill={isColored(1) ? activeFill : inactiveFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => togglePart(1)}
              className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
            />
            {/* Center */}
            <rect
              x="50"
              y="50"
              width="50"
              height="50"
              fill={isColored(2) ? activeFill : inactiveFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => togglePart(2)}
              className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
            />
            {/* Right */}
            <rect
              x="100"
              y="50"
              width="45"
              height="50"
              fill={isColored(3) ? activeFill : inactiveFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => togglePart(3)}
              className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
            />
            {/* Bottom */}
            <rect
              x="50"
              y="100"
              width="50"
              height="45"
              fill={isColored(4) ? activeFill : inactiveFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => togglePart(4)}
              className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
            />
          </svg>
        )}

        {shapeKind === 'pentagon_5' && (
          <svg viewBox="0 0 160 160" className="w-full h-full">
            {/* Regular pentagon centered at (80, 85), radius 65 */}
            {(() => {
              const cx = 80;
              const cy = 85;
              const r = 65;
              const points = Array.from({ length: 5 }).map((_, i) => {
                const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
                return {
                  x: cx + r * Math.cos(angle),
                  y: cy + r * Math.sin(angle)
                };
              });

              return points.map((p, i) => {
                const nextP = points[(i + 1) % 5];
                const d = `M ${cx} ${cy} L ${p.x} ${p.y} L ${nextP.x} ${nextP.y} Z`;
                return (
                  <path
                    key={i}
                    d={d}
                    fill={isColored(i) ? activeFill : inactiveFill}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    onClick={() => togglePart(i)}
                    className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
                  />
                );
              });
            })()}
          </svg>
        )}

        {shapeKind === 'triangle_4' && (
          <svg viewBox="0 0 160 140" className="w-full h-full">
            {/* Equilateral triangle divided into 4 smaller equal triangles */}
            {/* Top triangle (index 0) */}
            <polygon
              points="80,10 40,75 120,75"
              fill={isColored(0) ? activeFill : inactiveFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => togglePart(0)}
              className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
            />
            {/* Bottom Left triangle (index 1) */}
            <polygon
              points="40,75 0,135 80,135"
              fill={isColored(1) ? activeFill : inactiveFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => togglePart(1)}
              className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
            />
            {/* Central inverted triangle (index 2) */}
            <polygon
              points="80,135 40,75 120,75"
              fill={isColored(2) ? activeFill : inactiveFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => togglePart(2)}
              className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
            />
            {/* Bottom Right triangle (index 3) */}
            <polygon
              points="120,75 80,135 160,135"
              fill={isColored(3) ? activeFill : inactiveFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              onClick={() => togglePart(3)}
              className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
            />
          </svg>
        )}

        {shapeKind === 'rectangle_unequal_5' && (
          <svg viewBox="0 0 200 60" className="w-full h-full">
            {/* Rectangle divided into 5 UNEQUAL strips - classical book trick! */}
            {/* widths: 30, 50, 25, 60, 35 => total 200 */}
            {[
              { x: 0, w: 35 },
              { x: 35, w: 55 },
              { x: 90, w: 20 },
              { x: 110, w: 55 },
              { x: 165, w: 35 }
            ].map((part, idx) => (
              <rect
                key={idx}
                x={part.x + 2}
                y={6}
                width={part.w - 4}
                height={48}
                fill={isColored(idx) ? activeFill : inactiveFill}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                onClick={() => togglePart(idx)}
                className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
              />
            ))}
          </svg>
        )}

        {shapeKind === 'trapezoid_unequal_5' && (
          <svg viewBox="0 0 160 130" className="w-full h-full">
            {/* Trapezoid with 4 horizontal division lines creating 5 strips of different areas! */}
            {/* Points: top 40..120, bottom 10..150 */}
            {[
              { points: '40,10 120,10 126,34 34,34' },
              { points: '34,34 126,34 132,58 28,58' },
              { points: '28,58 132,58 138,82 22,82' },
              { points: '22,82 138,82 144,106 16,106' },
              { points: '16,106 144,106 150,126 10,126' }
            ].map((p, idx) => (
              <polygon
                key={idx}
                points={p.points}
                fill={isColored(idx) ? activeFill : inactiveFill}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                onClick={() => togglePart(idx)}
                className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
              />
            ))}
          </svg>
        )}

        {shapeKind === 'star_5' && (
          <svg viewBox="0 0 160 160" className="w-full h-full">
            {/* 5-pointed star divided into 5 equal triangular rays */}
            {(() => {
              const cx = 80;
              const cy = 80;
              const rOuter = 70;
              const rInner = 28;

              // 10 alternating outer and inner points
              const pts: { x: number; y: number }[] = [];
              for (let i = 0; i < 10; i++) {
                const angle = -Math.PI / 2 + (i * Math.PI) / 5;
                const r = i % 2 === 0 ? rOuter : rInner;
                pts.push({
                  x: cx + r * Math.cos(angle),
                  y: cy + r * Math.sin(angle)
                });
              }

              // 5 kite rays from center
              return Array.from({ length: 5 }).map((_, i) => {
                const pPrevInner = pts[(i * 2 - 1 + 10) % 10];
                const pOuter = pts[i * 2];
                const pNextInner = pts[i * 2 + 1];

                const d = `M ${cx} ${cy} L ${pPrevInner.x} ${pPrevInner.y} L ${pOuter.x} ${pOuter.y} L ${pNextInner.x} ${pNextInner.y} Z`;
                return (
                  <path
                    key={i}
                    d={d}
                    fill={isColored(i) ? activeFill : inactiveFill}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    onClick={() => togglePart(i)}
                    className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
                  />
                );
              });
            })()}
          </svg>
        )}

        {shapeKind === 'rectangle_10_triangles' && (
          <svg viewBox="0 0 200 80" className="w-full h-full">
            {/* Rectangle divided into 5 square boxes, each split diagonally into 2 triangles = 10 equal triangles */}
            {Array.from({ length: 5 }).map((_, col) => {
              const x0 = col * 40;
              const x1 = x0 + 40;
              const t1Index = col * 2;
              const t2Index = col * 2 + 1;

              return (
                <g key={col}>
                  {/* Triangle 1 */}
                  <polygon
                    points={`${x0},0 ${x1},0 ${x1},80`}
                    fill={isColored(t1Index) ? activeFill : inactiveFill}
                    stroke={strokeColor}
                    strokeWidth={1.5}
                    onClick={() => togglePart(t1Index)}
                    className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
                  />
                  {/* Triangle 2 */}
                  <polygon
                    points={`${x0},0 ${x0},80 ${x1},80`}
                    fill={isColored(t2Index) ? activeFill : inactiveFill}
                    stroke={strokeColor}
                    strokeWidth={1.5}
                    onClick={() => togglePart(t2Index)}
                    className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
                  />
                </g>
              );
            })}
            <rect x="0" y="0" width="200" height="80" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
          </svg>
        )}

        {shapeKind === 'bar_grid_8' && (
          <svg viewBox="0 0 200 90" className="w-full h-full">
            {/* 2 rows of 4 equal rectangles = 8 equal eighths (from exercise 1 in the book) */}
            {Array.from({ length: 8 }).map((_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const x = col * 50;
              const y = row * 45;

              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={50}
                  height={45}
                  fill={isColored(i) ? activeFill : inactiveFill}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  onClick={() => togglePart(i)}
                  className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
                />
              );
            })}
          </svg>
        )}

        {shapeKind === 'circle_sector_5' && (
          <svg viewBox="0 0 140 140" className="w-full h-full">
            {/* Circle with 5 equal sectors */}
            {(() => {
              const cx = 70;
              const cy = 70;
              const r = 60;
              const count = 5;

              return Array.from({ length: count }).map((_, i) => {
                const a1 = (i * 2 * Math.PI) / count - Math.PI / 2;
                const a2 = ((i + 1) * 2 * Math.PI) / count - Math.PI / 2;
                const x1 = cx + r * Math.cos(a1);
                const y1 = cy + r * Math.sin(a1);
                const x2 = cx + r * Math.cos(a2);
                const y2 = cy + r * Math.sin(a2);
                const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

                return (
                  <path
                    key={i}
                    d={d}
                    fill={isColored(i) ? activeFill : inactiveFill}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    onClick={() => togglePart(i)}
                    className={interactiveColoring ? 'cursor-pointer hover:opacity-80 transition-colors' : ''}
                  />
                );
              });
            })()}
          </svg>
        )}
      </div>

      {caption && (
        <div className="mt-2 text-xs font-bold text-slate-700 text-center bg-slate-100 px-3 py-1 rounded-full">
          {caption}
        </div>
      )}

      {interactiveColoring && (
        <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
          <span>לחץ על חלק בצורה כדי לצבוע או לבטל צביעה</span>
          {selectedParts.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelectedParts([]);
                onColoredChange?.([]);
              }}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>נקה צביעה</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
