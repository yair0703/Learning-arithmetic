import React from 'react';

interface QuantityGroupProps {
  totalItems: number;
  groups: number; // denominator
  itemsPerGroup: number;
  selectedGroups?: number; // numerator
  itemName?: string;
  itemIcon?: 'star' | 'circle' | 'apple';
  showStepCalculation?: boolean;
  showGroupFraction?: boolean;
  showCountPerGroup?: boolean;
  label?: string;
}

export const QuantityGroupVisualizer: React.FC<QuantityGroupProps> = ({
  totalItems = 12,
  groups = 4,
  itemsPerGroup = 3,
  selectedGroups = 3,
  itemName = 'עצמים',
  showStepCalculation = false,
  showGroupFraction = false,
  showCountPerGroup = false,
  label
}) => {
  const resultCount = selectedGroups * itemsPerGroup;

  return (
    <div className="w-full flex flex-col items-center gap-3 my-2" id="quantity-group-visualizer">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}

      <div className="w-full max-w-2xl bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Groups Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: groups }, (_, gIdx) => {
            const isSelected = gIdx < selectedGroups;
            return (
              <div
                key={`group-${gIdx}`}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/80 shadow-xs ring-2 ring-sky-200'
                    : 'border-dashed border-slate-300 bg-slate-50 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between w-full text-xs font-bold text-slate-700">
                  <span className={`px-2 py-0.5 rounded-full ${isSelected ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    קבוצה {gIdx + 1}
                  </span>
                  {showGroupFraction && (
                    <span className="text-slate-500 font-mono">1/{groups}</span>
                  )}
                </div>

                {/* Items in this group */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
                  {Array.from({ length: itemsPerGroup }, (_, iIdx) => (
                    <div
                      key={`item-${gIdx}-${iIdx}`}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs transition-transform ${
                        isSelected
                          ? 'bg-sky-500 text-white scale-105'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                      title={`${itemName} מספר ${gIdx * itemsPerGroup + iIdx + 1}`}
                    >
                      ★
                    </div>
                  ))}
                </div>

                {showCountPerGroup && (
                  <span className="text-[11px] text-slate-600 font-medium">
                    {itemsPerGroup} {itemName}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Arithmetic calculation step explanation - only shown if explicitly enabled */}
      {showStepCalculation && (
        <div className="w-full max-w-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 p-3 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">1</span>
            <span>
              חילקנו {totalItems} {itemName} ל-{groups} קבוצות שוות: <strong>{itemsPerGroup}</strong> בכל קבוצה.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">2</span>
            <span>
              לקחנו {selectedGroups} קבוצות: <strong>{selectedGroups} × {itemsPerGroup} = {resultCount}</strong> {itemName}!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
