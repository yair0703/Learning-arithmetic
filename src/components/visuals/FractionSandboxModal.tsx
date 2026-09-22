import React, { useState } from 'react';
import { X, Sparkles, Sliders, Scissors, Scale, Shapes } from 'lucide-react';
import { FractionBarVisualizer } from './FractionBarVisualizer';
import { FractionCircleVisualizer } from './FractionCircleVisualizer';
import { InteractiveNumberLine } from './InteractiveNumberLine';
import { EquivalentFractionsVisualizer } from './EquivalentFractionsVisualizer';
import { FractionCompareVisualizer } from './FractionCompareVisualizer';
import { BookGeometryShape, BookShapeKind } from './BookGeometryShape';

interface FractionSandboxProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FractionSandboxModal: React.FC<FractionSandboxProps> = ({ isOpen, onClose }) => {
  const [denom, setDenom] = useState<number>(5);
  const [num, setNum] = useState<number>(3);
  const [viewTab, setViewTab] = useState<'bar' | 'circle' | 'number-line' | 'equivalent' | 'compare' | 'book-shapes'>('bar');
  const [activeBookShape, setActiveBookShape] = useState<BookShapeKind>('cross_5');
  const [coloredIndices, setColoredIndices] = useState<number[]>([0]);

  if (!isOpen) return null;

  const whole = Math.floor(num / denom);
  const remainder = num % denom;
  const isImproper = num >= denom;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">המעבדה הפתוחה לשברים</h2>
              <p className="text-xs text-indigo-100">שנו מונה ומכנה, ובדקו איך השבר נראה בכל צורה!</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto flex flex-col gap-5">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {/* Denominator Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>מכנה (חלוקה לחלקים שווים):</span>
                <span className="text-indigo-600 font-mono text-sm">{denom}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={denom}
                  onChange={(e) => setDenom(parseInt(e.target.value) || 1)}
                  className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex gap-1 overflow-x-auto py-1">
                {[2, 3, 4, 5, 6, 8, 10, 12].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDenom(d)}
                    className={`px-2 py-0.5 text-xs rounded-md font-bold transition-all ${
                      denom === d
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Numerator Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>מונה (כמה חלקים לקחנו):</span>
                <span className="text-purple-600 font-mono text-sm">{num}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max={denom * 2}
                  value={num}
                  onChange={(e) => setNum(parseInt(e.target.value) || 0)}
                  className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNum(Math.max(0, num - 1))}
                  className="px-3 py-1 bg-white border border-slate-200 rounded-md font-bold text-xs hover:bg-slate-100"
                >
                  -1
                </button>
                <button
                  type="button"
                  onClick={() => setNum(num + 1)}
                  className="px-3 py-1 bg-white border border-slate-200 rounded-md font-bold text-xs hover:bg-slate-100"
                >
                  +1
                </button>
                <button
                  type="button"
                  onClick={() => setNum(denom)}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md font-bold text-xs hover:bg-indigo-100"
                >
                  שלם (1)
                </button>
              </div>
            </div>
          </div>

          {/* Mathematical Reading Card */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4 rounded-2xl border border-indigo-100 flex flex-wrap items-center justify-around gap-4 text-center">
            <div>
              <div className="text-xs text-slate-500 mb-0.5">שבר פשוט</div>
              <div className="text-2xl font-black text-indigo-900 font-mono">
                {num}/{denom}
              </div>
            </div>

            {isImproper && (
              <div>
                <div className="text-xs text-slate-500 mb-0.5">מספר מעורב</div>
                <div className="text-2xl font-black text-purple-900 font-mono">
                  {remainder === 0 ? `${whole}` : `${whole} ו-${remainder}/${denom}`}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs text-slate-500 mb-0.5">שבר עשרוני מקורב</div>
              <div className="text-2xl font-black text-pink-900 font-mono">
                {(num / denom).toFixed(2)}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500 mb-0.5">סוג השבר</div>
              <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-white shadow-xs border border-indigo-100 text-slate-700">
                {num < denom
                  ? 'שבר אמיתי (קטן מ-1)'
                  : num === denom
                  ? 'שלם אחד (שווה ל-1)'
                  : 'שבר מדומה (גדול מ-1)'}
              </div>
            </div>
          </div>

          {/* Visual Selector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setViewTab('bar')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                viewTab === 'bar'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              פס שברים (מלבן)
            </button>
            <button
              type="button"
              onClick={() => setViewTab('circle')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                viewTab === 'circle'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              עיגול פיצה
            </button>
            <button
              type="button"
              onClick={() => setViewTab('number-line')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                viewTab === 'number-line'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              ישר המספרים
            </button>
            <button
              type="button"
              onClick={() => setViewTab('equivalent')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
                viewTab === 'equivalent'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>שברים שקולים (חיתוך)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab('compare')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
                viewTab === 'compare'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>השוואת שברים (מי גדול?)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab('book-shapes')}
              className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 ${
                viewTab === 'book-shapes'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Shapes className="w-3.5 h-3.5" />
              <span>צורות מהספר (צביעה אינטראקטיבית)</span>
            </button>
          </div>

          {/* Active Visualization */}
          <div className="flex justify-center p-2 min-h-[160px] items-center">
            {viewTab === 'bar' && (
              <FractionBarVisualizer
                totalParts={denom}
                coloredParts={Math.min(denom, num)}
                color="#6366f1"
                interactive={true}
                showLabels={true}
                showPartNumbers={true}
                showInfoFooter={true}
                onColoredChange={(val) => setNum(val)}
                label={num > denom ? `פס שלם ראשון מלא (${denom}/${denom}) ועוד שארית` : undefined}
              />
            )}

            {viewTab === 'circle' && (
              <FractionCircleVisualizer
                totalParts={denom}
                coloredParts={Math.min(denom, num)}
                color="#ec4899"
                size={200}
                interactive={true}
                showFractionText={true}
                onColoredChange={(val) => setNum(val)}
              />
            )}

            {viewTab === 'number-line' && (
              <InteractiveNumberLine
                min={0}
                max={Math.max(2, Math.ceil(num / denom))}
                divisions={denom}
                targetIndex={num}
                dotColor="#8b5cf6"
                showLabels={true}
                showMarkerLabel={true}
                showInfoFooter={true}
                showJumpArcs={true}
                label="מיקום השבר על ישר המספרים:"
              />
            )}

            {viewTab === 'equivalent' && (
              <div className="w-full">
                <EquivalentFractionsVisualizer
                  baseNum={Math.min(denom - 1, Math.max(1, num))}
                  baseDenom={denom}
                />
              </div>
            )}

            {viewTab === 'compare' && (
              <div className="w-full">
                <FractionCompareVisualizer
                  initialNumA={Math.min(denom, Math.max(1, num))}
                  initialDenomA={denom}
                  initialNumB={1}
                  initialDenomB={denom > 3 ? denom - 1 : denom + 1}
                />
              </div>
            )}

            {viewTab === 'book-shapes' && (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs font-bold text-slate-500">בחר צורה מהספר:</span>
                  {[
                    { id: 'cross_5' as BookShapeKind, label: 'צלב (5 ריבועים שווים)' },
                    { id: 'pentagon_5' as BookShapeKind, label: 'מחומש (5 משולשים)' },
                    { id: 'triangle_4' as BookShapeKind, label: 'משולש (4 חלקים)' },
                    { id: 'rectangle_10_triangles' as BookShapeKind, label: 'מלבן (10 משולשים)' },
                    { id: 'trapezoid_unequal_5' as BookShapeKind, label: 'טרפז (חלקים לא שווים!)' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setActiveBookShape(s.id);
                        setColoredIndices([0]);
                      }}
                      className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                        activeBookShape === s.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center">
                  <BookGeometryShape
                    shapeKind={activeBookShape}
                    coloredPartIndices={coloredIndices}
                    interactiveColoring={true}
                    onColoredChange={(indices) => setColoredIndices(indices)}
                    size="md"
                    caption="לחץ על חלקי הצורה כדי לצבוע/למחוק – בדוק האם החלקים שווים!"
                  />
                  <div className="mt-3 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    צבועים כרגע: {coloredIndices.length} חלקים
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl"
          >
            סגור וחזור ללימוד
          </button>
        </div>
      </div>
    </div>
  );
};
