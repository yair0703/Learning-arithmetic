import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, ArrowLeft } from 'lucide-react';

export interface FractionEggItem {
  id: string;
  display: string; // e.g. "8/7" or "2 1/7"
  value: number; // numeric value for comparison
}

interface FractionOrderDragExerciseProps {
  items: FractionEggItem[];
  orderType?: 'descending' | 'ascending'; // descending = מהגדול לקטן, ascending = מהקטן לגדול
  onComplete?: (isCorrect: boolean) => void;
}

export const FractionOrderDragExercise: React.FC<FractionOrderDragExerciseProps> = ({
  items,
  orderType = 'descending',
  onComplete
}) => {
  // Available items in the pool
  const [availableItems, setAvailableItems] = useState<FractionEggItem[]>(items);
  // Slots: empty (null) or holding an item
  const [slots, setSlots] = useState<(FractionEggItem | null)[]>(
    Array(items.length).fill(null)
  );
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Click an available item to put in the first empty slot
  const handlePickItem = (item: FractionEggItem) => {
    if (isEvaluated) return;
    const firstEmptyIndex = slots.findIndex((s) => s === null);
    if (firstEmptyIndex === -1) return;

    const newSlots = [...slots];
    newSlots[firstEmptyIndex] = item;
    setSlots(newSlots);
    setAvailableItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  // Click a slotted item to return it to the pool
  const handleRemoveFromSlot = (index: number) => {
    if (isEvaluated) return;
    const item = slots[index];
    if (!item) return;

    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    setAvailableItems((prev) => [...prev, item]);
  };

  const handleReset = () => {
    setAvailableItems(items);
    setSlots(Array(items.length).fill(null));
    setIsEvaluated(false);
    setIsCorrect(false);
  };

  const handleCheck = () => {
    if (slots.some((s) => s === null)) return;

    // Check if sorted properly
    let correct = true;
    for (let i = 0; i < slots.length - 1; i++) {
      const current = slots[i]!.value;
      const next = slots[i + 1]!.value;
      if (orderType === 'descending' && current < next) {
        correct = false;
        break;
      }
      if (orderType === 'ascending' && current > next) {
        correct = false;
        break;
      }
    }

    setIsEvaluated(true);
    setIsCorrect(correct);
    onComplete?.(correct);
  };

  const allFilled = slots.every((s) => s !== null);

  // Parse fraction display string into proper math display
  const renderFractionDisplay = (str: string) => {
    if (str.includes(' ')) {
      const [whole, frac] = str.split(' ');
      const [n, d] = frac.split('/');
      return (
        <div className="flex items-center gap-1">
          <span className="text-lg font-black">{whole}</span>
          <div className="flex flex-col items-center leading-none text-sm">
            <span className="border-b border-slate-900 px-0.5">{n}</span>
            <span>{d}</span>
          </div>
        </div>
      );
    }
    if (str.includes('/')) {
      const [n, d] = str.split('/');
      return (
        <div className="flex flex-col items-center leading-none text-base">
          <span className="border-b border-slate-900 px-0.5">{n}</span>
          <span>{d}</span>
        </div>
      );
    }
    return <span className="text-lg font-black">{str}</span>;
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4 bg-gradient-to-b from-amber-50/40 to-slate-50 rounded-2xl border-2 border-amber-200/80 shadow-xs">
      <div className="w-full flex items-center justify-between text-xs font-bold text-slate-600 px-1">
        <span>סדרו את המספרים בתיבות לפי גודלם:</span>
        <span className="text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
          {orderType === 'descending' ? 'מהגדול ביותר ← לקטן ביותר' : 'מהקטן ביותר ← לגדול ביותר'}
        </span>
      </div>

      {/* Slots Section matching the book graphic layout */}
      <div className="w-full bg-white p-3 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-center gap-3">
        {/* Direction Arrow */}
        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl">
          <span>{orderType === 'descending' ? 'הגדול ביותר' : 'הקטן ביותר'}</span>
          <ArrowLeft className="w-4 h-4 text-amber-500 animate-pulse" />
        </div>

        {/* 4 Box Slots */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {slots.map((slotItem, index) => (
            <div
              key={index}
              onClick={() => handleRemoveFromSlot(index)}
              className={`w-16 h-20 md:w-20 md:h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                slotItem
                  ? 'bg-amber-100/90 border-amber-400 shadow-sm cursor-pointer hover:bg-amber-200/90'
                  : 'bg-slate-50 border-dashed border-slate-300'
              }`}
            >
              {slotItem ? (
                <>
                  {renderFractionDisplay(slotItem.display)}
                  <span className="text-[10px] text-slate-500 mt-1">הסר ✕</span>
                </>
              ) : (
                <span className="text-xs font-bold text-slate-300">{index + 1}</span>
              )}
            </div>
          ))}
        </div>

        <div className="text-xs font-bold text-slate-400">
          <span>{orderType === 'descending' ? 'הקטן ביותר' : 'הגדול ביותר'}</span>
        </div>
      </div>

      {/* Available Eggs Pool (The oval pills from the book) */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-slate-500">לחץ על מספר כדי למקם בתיבה הפנויה:</span>
        <div className="flex items-center gap-3 flex-wrap justify-center min-h-[60px]">
          {availableItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePickItem(item)}
              className="w-16 h-14 md:w-18 md:h-16 rounded-[50%] bg-[#fef9c3] hover:bg-[#fde047] active:scale-95 border-2 border-amber-300 shadow-sm flex items-center justify-center transition-transform hover:-translate-y-0.5 text-slate-900 font-bold"
            >
              {renderFractionDisplay(item.display)}
            </button>
          ))}
          {availableItems.length === 0 && !isEvaluated && (
            <span className="text-xs font-bold text-emerald-600">כל המספרים שובצו! כעת לחץ על בדיקה.</span>
          )}
        </div>
      </div>

      {/* Controls & Evaluation */}
      <div className="flex items-center gap-3 pt-1">
        {!isEvaluated ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={!allFilled}
            className={`px-6 py-2.5 rounded-xl font-black text-xs md:text-sm shadow-sm transition-all ${
              allFilled
                ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            בדוק את הסדר
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <div className="flex items-center gap-1.5 text-emerald-700 font-black text-sm bg-emerald-100 px-4 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>מצוין! סידרת את השברים בצורה מדויקת! 👏</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-rose-700 font-bold text-xs bg-rose-100 px-3 py-2 rounded-xl">
                  הסדר אינו מדויק עדיין. נסה להשוות לעוגן (קטן מ-1, שווה ל-1, גדול מ-1).
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>נסה שוב</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
