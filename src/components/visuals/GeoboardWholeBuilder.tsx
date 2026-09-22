import React, { useState } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface GeoboardWholeBuilderProps {
  initialFraction: string; // e.g. "1/4"
  targetSlices: number; // e.g. 4 for 1/4
  onComplete?: (isCorrect: boolean) => void;
}

export const GeoboardWholeBuilder: React.FC<GeoboardWholeBuilderProps> = ({
  initialFraction = '1/4',
  targetSlices = 4,
  onComplete
}) => {
  // A 5x5 dot grid. The initial slice is a triangle taking up a 2x2 cell (points [1,2], [2,2], [2,3])
  // Student can click dots or place additional triangular pizza slices to form a whole pan.
  const [placedSlices, setPlacedSlices] = useState<number>(1);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAddSlice = () => {
    if (placedSlices >= 6 || isAnswered) return;
    setPlacedSlices((p) => p + 1);
  };

  const handleRemoveSlice = () => {
    if (placedSlices <= 1 || isAnswered) return;
    setPlacedSlices((p) => p - 1);
  };

  const handleVerify = () => {
    const correct = placedSlices === targetSlices;
    setIsAnswered(true);
    onComplete?.(correct);
  };

  const handleReset = () => {
    setPlacedSlices(1);
    setIsAnswered(false);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4 p-5 bg-white rounded-3xl border-2 border-slate-200 shadow-sm">
      <div className="text-center">
        <h4 className="text-sm font-bold text-slate-800">מעדנייה חדשה נפתחה בשכונה! 🍕</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          במעדנייה הזאת כל מנה היא <span className="font-bold text-indigo-600">{initialFraction}</span> מהתבנית בחנות.
        </p>
        <p className="text-xs text-slate-600 font-semibold mt-1">
          כמה מנות כאלו דרושות כדי להרכיב תבנית שלמה אחת?
        </p>
      </div>

      {/* Dot Grid (Geoboard) with Pizza Slices */}
      <div className="relative p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          {/* Grid Dots (5x5) */}
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 5 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={20 + c * 40}
                cy={20 + r * 40}
                r="3"
                fill="#94a3b8"
              />
            ))
          )}

          {/* Pizza Slices forming the square whole (composed of 4 right-angle triangles) */}
          {/* Slice 1: Bottom-Left triangle (always shown) */}
          <polygon
            points="60,140 60,60 140,140"
            fill="#f59e0b"
            stroke="#b45309"
            strokeWidth="2"
            fillOpacity="0.8"
          />
          {/* Pizza toppings (pepperoni circles) */}
          <circle cx="80" cy="115" r="5" fill="#ef4444" />
          <circle cx="95" cy="130" r="4" fill="#ef4444" />
          <circle cx="70" cy="85" r="4" fill="#10b981" />

          {/* Slice 2: Top-Right triangle */}
          {placedSlices >= 2 && (
            <g className="animate-in fade-in zoom-in-75">
              <polygon
                points="60,60 140,60 140,140"
                fill="#fbbf24"
                stroke="#b45309"
                strokeWidth="2"
                fillOpacity="0.8"
              />
              <circle cx="120" cy="85" r="5" fill="#ef4444" />
              <circle cx="105" cy="70" r="4" fill="#ef4444" />
              <circle cx="130" cy="115" r="4" fill="#10b981" />
            </g>
          )}

          {/* Slice 3: Secondary pan slice (left extension) */}
          {placedSlices >= 3 && (
            <g className="animate-in fade-in zoom-in-75">
              <polygon
                points="20,140 20,60 60,140"
                fill="#f59e0b"
                stroke="#b45309"
                strokeWidth="2"
                fillOpacity="0.75"
              />
              <circle cx="35" cy="115" r="4" fill="#ef4444" />
            </g>
          )}

          {/* Slice 4: Completing full symmetrical 4-part square tray */}
          {placedSlices >= 4 && (
            <g className="animate-in fade-in zoom-in-75">
              <polygon
                points="20,60 60,60 20,140"
                fill="#fbbf24"
                stroke="#b45309"
                strokeWidth="2"
                fillOpacity="0.75"
              />
              <circle cx="35" cy="80" r="4" fill="#ef4444" />
            </g>
          )}

          {/* Slices 5 & 6 (overflow if user clicks too much) */}
          {placedSlices >= 5 && (
            <polygon
              points="140,60 180,60 180,140"
              fill="#f87171"
              stroke="#991b1b"
              strokeWidth="2"
              fillOpacity="0.6"
            />
          )}
          {placedSlices >= 6 && (
            <polygon
              points="140,60 140,140 180,140"
              fill="#f87171"
              stroke="#991b1b"
              strokeWidth="2"
              fillOpacity="0.6"
            />
          )}
        </svg>
      </div>

      {/* Slice Counter and Interactive Controls */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold text-slate-700">מנות בתבנית:</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRemoveSlice}
            disabled={placedSlices <= 1 || isAnswered}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-black text-slate-800 text-lg flex items-center justify-center border border-slate-300"
          >
            -
          </button>
          <span className="w-10 text-center font-black text-xl text-indigo-700">{placedSlices}</span>
          <button
            type="button"
            onClick={handleAddSlice}
            disabled={placedSlices >= 6 || isAnswered}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-black text-slate-800 text-lg flex items-center justify-center border border-slate-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Check Answer */}
      <div className="flex items-center gap-3">
        {!isAnswered ? (
          <button
            type="button"
            onClick={handleVerify}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs md:text-sm rounded-xl shadow-xs"
          >
            בדוק האם התבנית שלמה
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {placedSlices === targetSlices ? (
              <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>נכון מאוד! 4 מנות של רבע יוצרות 4/4 = 1 שלם! 👏</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1.5 rounded-xl">
                  {placedSlices < targetSlices
                    ? `יש כאן רק ${placedSlices} מנות מתוך 4 הדרושות לשלם.`
                    : `שמת יותר מדי מנות (${placedSlices}). 4 מנות יוצרות שלם בדיוק.`}
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
