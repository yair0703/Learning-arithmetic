import React, { useState } from 'react';
import { TopicId } from '../../types';
import {
  PieChart,
  Ruler,
  Layers,
  PlusCircle,
  Coins,
  HelpCircle,
  Award,
  Sliders,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Maximize2,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface TopicCompletionVisualizerProps {
  topicId: TopicId;
  topicTitle?: string;
  onExploreMore?: () => void;
}

export const TopicCompletionVisualizer: React.FC<TopicCompletionVisualizerProps> = ({
  topicId,
  topicTitle,
  onExploreMore
}) => {
  // Common states
  const [activeVisualMode, setActiveVisualMode] = useState<'primary' | 'secondary' | 'challenge'>('primary');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // 1. whole-part state
  const [wpDenom, setWpDenom] = useState<number>(6);
  const [wpNum, setWpNum] = useState<number>(4);
  const [wpShape, setWpShape] = useState<'circle' | 'bar' | 'unequal'>('circle');

  // 2. number-line state
  const [nlDenom, setNlDenom] = useState<number>(4);
  const [nlStepIndex, setNlStepIndex] = useState<number>(3);
  const [nlMax, setNlMax] = useState<number>(2);

  // 3. mixed-numbers state
  const [mnDenom, setMnDenom] = useState<number>(3);
  const [mnTotalPieces, setMnTotalPieces] = useState<number>(7);

  // 4. same-denom state
  const [sdDenom, setSdDenom] = useState<number>(7);
  const [sdNumA, setSdNumA] = useState<number>(2);
  const [sdNumB, setSdNumB] = useState<number>(3);
  const [sdOp, setSdOp] = useState<'+' | '-'>('+');
  const [showDenomErrorWarning, setShowDenomErrorWarning] = useState<boolean>(false);

  // 5. part-of-quantity state
  const [pqTotal, setPqTotal] = useState<number>(20);
  const [pqDenom, setPqDenom] = useState<number>(4);
  const [pqNum, setPqNum] = useState<number>(3);
  const [pqAnimStep, setPqAnimStep] = useState<1 | 2>(2);

  // 6. fractional-amount state
  const [faGivenNum, setFaGivenNum] = useState<number>(2);
  const [faDenom, setFaDenom] = useState<number>(5);
  const [faGivenValue, setFaGivenValue] = useState<number>(14);

  // 7. summary-review state
  const [srActiveTab, setSrActiveTab] = useState<'circle' | 'line' | 'mixed' | 'quantity'>('circle');

  // 8. decimals state
  const [decVal, setDecVal] = useState<number>(3.45);
  const [decHistory, setDecHistory] = useState<string>('מספר התחלתי: 3.45');

  // Helper for whole-part SVG circle
  const renderCircleSlices = (denom: number, num: number, size = 180) => {
    const radius = size / 2 - 12;
    const center = size / 2;
    const slices = [];

    for (let i = 0; i < denom; i++) {
      const anglePerPart = (2 * Math.PI) / denom;
      const startAngle = i * anglePerPart - Math.PI / 2;
      const endAngle = (i + 1) * anglePerPart - Math.PI / 2;

      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const largeArc = denom === 1 ? 1 : 0;
      const pathData =
        denom === 1
          ? `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center} ${center + radius} A ${radius} ${radius} 0 1 1 ${center} ${center - radius}`
          : `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      const isColored = i < num;
      slices.push(
        <path
          key={i}
          d={pathData}
          fill={isColored ? '#6366f1' : '#f1f5f9'}
          stroke="#ffffff"
          strokeWidth="3"
          className="transition-colors duration-200 cursor-pointer hover:opacity-85"
          onClick={() => setWpNum(i + 1 === wpNum ? i : i + 1)}
        />
      );
    }
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {slices}
        <circle cx={center} cy={center} r={4} fill="#4338ca" />
      </svg>
    );
  };

  return (
    <div
      className="w-full bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-5 md:p-7 shadow-2xl border border-indigo-500/30 overflow-hidden relative"
      id="topic-completion-visualizer"
    >
      {/* Glow background accent */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 relative z-10 border-b border-indigo-500/20 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-amber-300 shadow-inner">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                המחשה דינמית לסיכום הפרק
              </span>
              <span className="text-xs text-indigo-300 font-medium">מעבדה חזותית אינטראקטיבית</span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
              {topicTitle || 'הבנת מושגי השברים לעומק'}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-indigo-200 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
        >
          <span>{isExpanded ? 'צמצם' : 'הרחב המחשה'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-6 relative z-10">
          {/* ========================================================
              TOPIC 1: whole-part (השבר כחלק משלם)
             ======================================================== */}
          {topicId === 'whole-part' && (
            <div className="flex flex-col gap-5">
              {/* Controls bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-indigo-200 font-bold">סוג המחשה:</span>
                  <div className="flex items-center bg-black/30 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setWpShape('circle')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        wpShape === 'circle' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-300 hover:text-white'
                      }`}
                    >
                      פיצה (עיגול)
                    </button>
                    <button
                      type="button"
                      onClick={() => setWpShape('bar')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        wpShape === 'bar' ? 'bg-indigo-600 text-white shadow-xs' : 'text-indigo-300 hover:text-white'
                      }`}
                    >
                      שוקולד (פס)
                    </button>
                    <button
                      type="button"
                      onClick={() => setWpShape('unequal')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        wpShape === 'unequal' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-300 hover:text-white'
                      }`}
                    >
                      זהירות: חלקים לא שווים! ⚠️
                    </button>
                  </div>
                </div>

                {wpShape !== 'unequal' && (
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-200">מכנה (חלקים שווים):</span>
                      <select
                        value={wpDenom}
                        onChange={(e) => {
                          const d = Number(e.target.value);
                          setWpDenom(d);
                          if (wpNum > d) setWpNum(d);
                        }}
                        className="bg-indigo-950 border border-indigo-400/40 rounded-lg px-2 py-1 text-white font-bold"
                      >
                        {[2, 3, 4, 5, 6, 8, 10, 12].map((d) => (
                          <option key={d} value={d}>
                            {d} חלקים
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-indigo-200">מונה (צבועים):</span>
                      <input
                        type="range"
                        min={0}
                        max={wpDenom}
                        value={wpNum}
                        onChange={(e) => setWpNum(Number(e.target.value))}
                        className="w-24 accent-amber-400 cursor-pointer"
                      />
                      <span className="font-bold text-amber-300 text-sm">{wpNum}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Visual Display */}
              {wpShape !== 'unequal' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-black/20 p-5 rounded-2xl border border-white/5">
                  <div className="flex flex-col items-center justify-center p-3">
                    {wpShape === 'circle' ? (
                      renderCircleSlices(wpDenom, wpNum, 190)
                    ) : (
                      <div className="w-full max-w-sm flex flex-col gap-2">
                        <div className="flex h-16 w-full rounded-xl overflow-hidden border-2 border-indigo-300/40 bg-slate-800 shadow-inner">
                          {Array.from({ length: wpDenom }).map((_, i) => (
                            <div
                              key={i}
                              onClick={() => setWpNum(i + 1 === wpNum ? i : i + 1)}
                              className={`flex-1 border-r border-indigo-900/60 transition-all flex items-center justify-center cursor-pointer font-bold text-xs ${
                                i < wpNum ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'
                              }`}
                            >
                              1/{wpDenom}
                            </div>
                          ))}
                        </div>
                        <span className="text-[11px] text-center text-indigo-300">
                          לחצו על המשבצות כדי לשנות את החלקים הצבועים
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Mathematical Meaning Card */}
                  <div className="flex flex-col gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-400 text-slate-950 font-black text-2xl px-4 py-2 rounded-xl flex flex-col items-center leading-none">
                        <span>{wpNum}</span>
                        <div className="w-full h-0.5 bg-slate-950 my-1" />
                        <span>{wpDenom}</span>
                      </div>
                      <div>
                        <span className="text-xs text-indigo-200">השבר שמיוצג בצורה:</span>
                        <h4 className="text-lg font-bold text-white">
                          {wpNum} מתוך {wpDenom} חלקים שווים
                        </h4>
                        <span className="text-xs text-amber-300 font-medium">
                          ({Math.round((wpNum / wpDenom) * 100)}% מהשלם)
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1.5 border-t border-white/10 pt-3">
                      <p className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>
                          <strong>מונה ({wpNum}):</strong> מספר החלקים שבחרנו או צבענו.
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>
                          <strong>מכנה ({wpDenom}):</strong> סך כל החלקים השווים שמרכיבים שלם אחד.
                        </span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>
                          <strong>שבר יחידה:</strong> כל חלק בודד שווה בדיוק <strong className="text-amber-300">1/{wpDenom}</strong>.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Unequal demonstration */
                <div className="bg-rose-950/40 p-5 rounded-2xl border border-rose-500/40 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-48 h-36 bg-slate-900 rounded-xl border border-rose-400/30 relative flex flex-col overflow-hidden">
                    <div className="h-4 bg-indigo-600 border-b border-rose-500/50 flex items-center justify-center text-[10px] text-white">
                      פס עליון צר
                    </div>
                    <div className="h-6 bg-slate-800 border-b border-rose-500/50" />
                    <div className="h-10 bg-slate-800 border-b border-rose-500/50" />
                    <div className="flex-1 bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                      פס תחתון רחב וענק
                    </div>
                  </div>

                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-2 text-rose-400 font-black text-sm mb-1.5">
                      <AlertTriangle className="w-5 h-5" />
                      <span>למה צורה כזו אינה מייצגת רבע (1/4)?</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      הצורה אמנם חולקה ל-4 פסים, אך <strong>הפסים אינם שווים בשטחם!</strong> הפס העליון קטן בהרבה מהתחתון.
                      שבר מתמטי תקף <strong>אך ורק כשהחלוקה שווה במדויק</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setWpShape('bar')}
                      className="mt-3 text-xs font-bold text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 px-3 py-1.5 rounded-lg border border-amber-400/30 transition-colors"
                    >
                      חזור לחלוקה שווה ומדויקת ←
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TOPIC 2: number-line (שברים על ישר המספרים)
             ======================================================== */}
          {topicId === 'number-line' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-indigo-200 font-bold">טווח הישר:</span>
                  <div className="flex items-center bg-black/30 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setNlMax(1);
                        if (nlStepIndex > nlDenom) setNlStepIndex(nlDenom);
                      }}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        nlMax === 1 ? 'bg-indigo-600 text-white' : 'text-indigo-300'
                      }`}
                    >
                      0 עד 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setNlMax(2)}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        nlMax === 2 ? 'bg-indigo-600 text-white' : 'text-indigo-300'
                      }`}
                    >
                      0 עד 2 (מעבר לשלם)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-indigo-200">חלוקת היחידה (מכנה):</span>
                  <select
                    value={nlDenom}
                    onChange={(e) => {
                      const d = Number(e.target.value);
                      setNlDenom(d);
                      setNlStepIndex(Math.min(nlStepIndex, d * nlMax));
                    }}
                    className="bg-indigo-950 border border-indigo-400/40 rounded-lg px-2 py-1 text-white font-bold"
                  >
                    {[2, 3, 4, 5, 6, 8].map((d) => (
                      <option key={d} value={d}>
                        חלק ל-{d} שנתות (כל צעד = 1/{d})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number Line Visualizer */}
              <div className="bg-black/30 p-5 rounded-2xl border border-white/10 flex flex-col items-center gap-4">
                <div className="w-full overflow-x-auto py-2">
                  <svg viewBox="0 0 600 120" className="w-full min-w-[500px] h-28">
                    {/* Line */}
                    <line x1="40" y1="70" x2="560" y2="70" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                    {/* Arrows */}
                    <polygon points="30,70 45,64 45,76" fill="#94a3b8" />
                    <polygon points="570,70 555,64 555,76" fill="#94a3b8" />

                    {/* Ticks and Jump Arcs */}
                    {Array.from({ length: nlMax * nlDenom + 1 }).map((_, step) => {
                      const totalSteps = nlMax * nlDenom;
                      const x = 50 + (step / totalSteps) * 500;
                      const isWhole = step % nlDenom === 0;
                      const wholeVal = step / nlDenom;
                      const isSelected = step === nlStepIndex;

                      return (
                        <g key={step} className="cursor-pointer" onClick={() => setNlStepIndex(step)}>
                          {/* Tick line */}
                          <line
                            x1={x}
                            y1={isWhole ? 50 : 60}
                            x2={x}
                            y2={isWhole ? 90 : 80}
                            stroke={isSelected ? '#fbbf24' : isWhole ? '#ffffff' : '#64748b'}
                            strokeWidth={isSelected ? 4 : isWhole ? 3 : 2}
                          />

                          {/* Jump Arc from previous tick if active */}
                          {step > 0 && step <= nlStepIndex && (
                            <path
                              d={`M ${50 + ((step - 1) / totalSteps) * 500} 65 Q ${
                                50 + ((step - 0.5) / totalSteps) * 500
                              } 35 ${x} 65`}
                              fill="none"
                              stroke="#818cf8"
                              strokeWidth="2.5"
                              strokeDasharray="4 2"
                            />
                          )}

                          {/* Whole numbers label */}
                          {isWhole && (
                            <text
                              x={x}
                              y="108"
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="14"
                              fontWeight="bold"
                            >
                              {wholeVal}
                            </text>
                          )}

                          {/* Step dot */}
                          {isSelected && (
                            <g>
                              <circle cx={x} cy="70" r="8" fill="#fbbf24" stroke="#1e1b4b" strokeWidth="2.5" />
                              <circle cx={x} cy="70" r="14" fill="none" stroke="#fbbf24" strokeWidth="1.5" className="animate-ping" />
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Live Value Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-4 w-full bg-indigo-950/60 p-4 rounded-xl border border-indigo-400/20">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-indigo-300">מיקום הנקודה על הישר:</span>
                    <div className="bg-amber-400 text-slate-950 font-black text-lg px-3 py-1 rounded-lg">
                      {nlStepIndex % nlDenom === 0 ? (
                        `${nlStepIndex / nlDenom} שלם`
                      ) : nlStepIndex > nlDenom ? (
                        `${Math.floor(nlStepIndex / nlDenom)} ו-${nlStepIndex % nlDenom}/${nlDenom} (או ${nlStepIndex}/${nlDenom})`
                      ) : (
                        `${nlStepIndex}/${nlDenom}`
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={nlStepIndex === 0}
                      onClick={() => setNlStepIndex((p) => Math.max(0, p - 1))}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-bold transition-all"
                    >
                      צעד שמאלה (-1/{nlDenom})
                    </button>
                    <button
                      type="button"
                      disabled={nlStepIndex >= nlMax * nlDenom}
                      onClick={() => setNlStepIndex((p) => Math.min(nlMax * nlDenom, p + 1))}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-xs font-bold transition-all"
                    >
                      צעד ימינה (+1/{nlDenom})
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 text-center">
                  💡 <strong>כלל ישר המספרים:</strong> סופרים כמה קטעים שווים יש בין 0 ל-1 (זהו המכנה), ואז סופרים כמה קפיצות עשינו מ-0 ימינה (זהו המונה).
                </p>
              </div>
            </div>
          )}

          {/* ========================================================
              TOPIC 3: mixed-numbers (משבר למספר מעורב ולהפך)
             ======================================================== */}
          {topicId === 'mixed-numbers' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-indigo-200 font-bold">בחר שבר מדומה להמחשה:</span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { n: 7, d: 3 },
                      { n: 11, d: 4 },
                      { n: 9, d: 2 },
                      { n: 14, d: 5 }
                    ].map((item) => (
                      <button
                        key={`${item.n}/${item.d}`}
                        type="button"
                        onClick={() => {
                          setMnTotalPieces(item.n);
                          setMnDenom(item.d);
                        }}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                          mnTotalPieces === item.n && mnDenom === item.d
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                        }`}
                      >
                        {item.n}/{item.d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-indigo-200">כמות חתיכות ({mnTotalPieces}):</span>
                  <input
                    type="range"
                    min={mnDenom + 1}
                    max={mnDenom * 4}
                    value={mnTotalPieces}
                    onChange={(e) => setMnTotalPieces(Number(e.target.value))}
                    className="w-24 accent-amber-400"
                  />
                </div>
              </div>

              {/* Dynamic Regrouping Display */}
              {(() => {
                const wholes = Math.floor(mnTotalPieces / mnDenom);
                const remainder = mnTotalPieces % mnDenom;
                const totalTrays = Math.ceil(mnTotalPieces / mnDenom);

                return (
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/10 flex flex-col gap-5">
                    {/* Visual Trays */}
                    <div className="flex flex-wrap items-center justify-center gap-6 py-2">
                      {Array.from({ length: totalTrays }).map((_, trayIdx) => {
                        const isFullWhole = trayIdx < wholes;
                        const piecesInThisTray = isFullWhole
                          ? mnDenom
                          : trayIdx === wholes
                          ? remainder
                          : 0;

                        return (
                          <div
                            key={trayIdx}
                            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                              isFullWhole
                                ? 'bg-indigo-950/60 border-indigo-400/50 shadow-md shadow-indigo-900/30'
                                : 'bg-slate-900/70 border-amber-400/40'
                            }`}
                          >
                            <span className="text-[11px] font-bold text-indigo-200">
                              {isFullWhole ? `שלם מס' ${trayIdx + 1} (מלא)` : `שארית (${remainder}/${mnDenom})`}
                            </span>
                            {renderCircleSlices(mnDenom, piecesInThisTray, 120)}
                            <span className="text-xs font-black text-amber-300">
                              {piecesInThisTray}/{mnDenom}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dual Form Formula */}
                    <div className="bg-indigo-900/40 p-4 rounded-2xl border border-indigo-400/30 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="text-center bg-white/10 px-3 py-1.5 rounded-xl">
                          <span className="text-[10px] text-indigo-300 block">שבר מדומה</span>
                          <span className="text-xl font-black text-amber-300">
                            {mnTotalPieces}/{mnDenom}
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-white">=</span>
                        <div className="text-center bg-amber-400 text-slate-950 px-4 py-1.5 rounded-xl font-black shadow-md">
                          <span className="text-[10px] block opacity-80">מספר מעורב</span>
                          <span className="text-xl">
                            {wholes} {remainder > 0 ? `ו-${remainder}/${mnDenom}` : ''}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 text-right space-y-1">
                        <p>
                          🔹 <strong>חילוק עם שארית:</strong> {mnTotalPieces} חלקי {mnDenom} = <strong>{wholes} שלמים</strong> ושארית <strong>{remainder}</strong>.
                        </p>
                        <p>
                          🔹 <strong>המכנה ({mnDenom})</strong> אינו משתנה לעולם בהמרה!
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ========================================================
              TOPIC 4: same-denom (פעולות בשברים בעלי מכנים שווים)
             ======================================================== */}
          {topicId === 'same-denom' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-indigo-200 font-bold">פעולה:</span>
                  <div className="flex items-center bg-black/30 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setSdOp('+')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        sdOp === '+' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-300'
                      }`}
                    >
                      חיבור (+)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSdOp('-')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all ${
                        sdOp === '-' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-300'
                      }`}
                    >
                      חיסור (-)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-indigo-200">מכנה משותף:</span>
                  <select
                    value={sdDenom}
                    onChange={(e) => {
                      const d = Number(e.target.value);
                      setSdDenom(d);
                      if (sdNumA >= d) setSdNumA(d - 1);
                      if (sdNumB >= d) setSdNumB(1);
                    }}
                    className="bg-indigo-950 border border-indigo-400/40 rounded-lg px-2 py-1 text-white font-bold"
                  >
                    {[5, 6, 7, 8, 10].map((d) => (
                      <option key={d} value={d}>
                        מכנה {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-indigo-200">מונה א׳: {sdNumA}</span>
                  <input
                    type="range"
                    min={1}
                    max={sdDenom}
                    value={sdNumA}
                    onChange={(e) => setSdNumA(Number(e.target.value))}
                    className="w-16 accent-indigo-400"
                  />
                  <span className="text-indigo-200">מונה ב׳: {sdNumB}</span>
                  <input
                    type="range"
                    min={1}
                    max={sdOp === '-' ? sdNumA : sdDenom - sdNumA || 1}
                    value={sdNumB}
                    onChange={(e) => setSdNumB(Number(e.target.value))}
                    className="w-16 accent-emerald-400"
                  />
                </div>
              </div>

              {/* Dynamic Operations Canvas */}
              {(() => {
                const resultNum = sdOp === '+' ? sdNumA + sdNumB : sdNumA - sdNumB;

                return (
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
                    {/* Equation Bar */}
                    <div className="flex flex-wrap items-center justify-center gap-4 bg-indigo-950/70 p-4 rounded-2xl border border-indigo-400/30">
                      {/* Fraction A */}
                      <div className="flex items-center gap-1 bg-indigo-600/30 px-3 py-1.5 rounded-xl border border-indigo-400/30">
                        <span className="text-xl font-black text-indigo-300">
                          {sdNumA}/{sdDenom}
                        </span>
                      </div>

                      <span className="text-2xl font-black text-white">{sdOp}</span>

                      {/* Fraction B */}
                      <div className="flex items-center gap-1 bg-emerald-600/30 px-3 py-1.5 rounded-xl border border-emerald-400/30">
                        <span className="text-xl font-black text-emerald-300">
                          {sdNumB}/{sdDenom}
                        </span>
                      </div>

                      <span className="text-2xl font-black text-white">=</span>

                      {/* Result */}
                      <div className="flex items-center gap-1 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-xl font-black shadow-md">
                        <span className="text-xl">
                          {resultNum}/{sdDenom}
                        </span>
                      </div>
                    </div>

                    {/* Visual Combined Bar */}
                    <div className="w-full flex flex-col gap-2">
                      <span className="text-xs text-indigo-200 font-bold">ייצוג חזותי של הפעולה ברצועת שברים:</span>
                      <div className="flex h-14 w-full rounded-xl overflow-hidden border-2 border-indigo-300/40 bg-slate-800">
                        {Array.from({ length: sdDenom }).map((_, i) => {
                          const isPartA = i < sdNumA;
                          const isPartB = sdOp === '+' ? i >= sdNumA && i < sdNumA + sdNumB : false;
                          const isSubtracted = sdOp === '-' && i >= sdNumA - sdNumB && i < sdNumA;

                          return (
                            <div
                              key={i}
                              className={`flex-1 border-r border-slate-900 transition-all flex items-center justify-center font-bold text-xs ${
                                isSubtracted
                                  ? 'bg-rose-600/80 text-white line-through opacity-60'
                                  : isPartA
                                  ? 'bg-indigo-600 text-white'
                                  : isPartB
                                  ? 'bg-emerald-500 text-slate-950 font-black'
                                  : 'bg-slate-800 text-slate-500'
                              }`}
                            >
                              1/{sdDenom}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Common Misconception Toggle */}
                    <div className="border-t border-white/10 pt-3 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setShowDenomErrorWarning(!showDenomErrorWarning)}
                        className="text-xs text-rose-300 bg-rose-950/50 hover:bg-rose-900/60 px-3 py-1.5 rounded-xl border border-rose-500/40 transition-colors flex items-center gap-1.5"
                      >
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>{showDenomErrorWarning ? 'הסתר הסבר על טעות מכנים' : 'למה לא מחברים מכנים? (הקלק להמחשה)'}</span>
                      </button>
                    </div>

                    {showDenomErrorWarning && (
                      <div className="bg-rose-950/60 p-4 rounded-xl border border-rose-500/40 text-xs text-slate-200 space-y-1.5 animate-fadeIn">
                        <p className="font-bold text-rose-300">
                          ⚠️ אזהרה: לעולם אין לחבר או לחסר מכנים!
                        </p>
                        <p>
                          אם נחבר {sdNumA}/{sdDenom} + {sdNumB}/{sdDenom} ונקבל בטעות {sdNumA + sdNumB}/{sdDenom * 2} — נקבל חלקיקים קטנים בהרבה (מכנה כפול), במקום להגדיל את הכמות. המכנה נשאר זהה תמיד!
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ========================================================
              TOPIC 5: part-of-quantity (השבר כחלק מכמות)
             ======================================================== */}
          {topicId === 'part-of-quantity' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-indigo-200 font-bold">כמות כוללת:</span>
                  <select
                    value={pqTotal}
                    onChange={(e) => setPqTotal(Number(e.target.value))}
                    className="bg-indigo-950 border border-indigo-400/40 rounded-lg px-2 py-1 text-white font-bold"
                  >
                    {[12, 16, 20, 24, 30].map((tot) => (
                      <option key={tot} value={tot}>
                        {tot} פריטים
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-indigo-200 font-bold">שבר מבוקש:</span>
                  <select
                    value={`${pqNum}/${pqDenom}`}
                    onChange={(e) => {
                      const [n, d] = e.target.value.split('/').map(Number);
                      setPqNum(n);
                      setPqDenom(d);
                    }}
                    className="bg-indigo-950 border border-indigo-400/40 rounded-lg px-2 py-1 text-white font-bold"
                  >
                    <option value="1/4">1/4 (רבע)</option>
                    <option value="3/4">3/4 (שלושה רבעים)</option>
                    <option value="1/3">1/3 (שליש)</option>
                    <option value="2/3">2/3 (שני שלישים)</option>
                    <option value="2/5">2/5 (שתי חמישיות)</option>
                    <option value="3/5">3/5 (שלוש חמישיות)</option>
                  </select>
                </div>
              </div>

              {/* 2-Step Quantity Arranger */}
              {(() => {
                const itemsPerGroup = Math.floor(pqTotal / pqDenom);
                const finalResult = itemsPerGroup * pqNum;

                return (
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-300">
                        חישוב: {pqNum}/{pqDenom} מתוך {pqTotal}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPqAnimStep(1)}
                          className={`px-3 py-1 rounded-lg font-bold transition-all ${
                            pqAnimStep === 1 ? 'bg-indigo-600 text-white' : 'bg-white/10 text-indigo-300'
                          }`}
                        >
                          שלב 1: חילוק לקבוצות
                        </button>
                        <button
                          type="button"
                          onClick={() => setPqAnimStep(2)}
                          className={`px-3 py-1 rounded-lg font-bold transition-all ${
                            pqAnimStep === 2 ? 'bg-emerald-600 text-white' : 'bg-white/10 text-emerald-300'
                          }`}
                        >
                          שלב 2: לקיחת {pqNum} קבוצות
                        </button>
                      </div>
                    </div>

                    {/* Group Boxes Visualizer */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 py-2">
                      {Array.from({ length: pqDenom }).map((_, gIdx) => {
                        const isSelectedGroup = gIdx < pqNum && pqAnimStep === 2;

                        return (
                          <div
                            key={gIdx}
                            className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                              isSelectedGroup
                                ? 'bg-emerald-950/80 border-emerald-400 shadow-md shadow-emerald-900/30'
                                : 'bg-slate-900/70 border-white/10'
                            }`}
                          >
                            <span className="text-[10px] font-bold text-indigo-300">
                              קבוצה {gIdx + 1} (1/{pqDenom})
                            </span>
                            <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
                              {Array.from({ length: itemsPerGroup }).map((_, itemIdx) => (
                                <div
                                  key={itemIdx}
                                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                    isSelectedGroup
                                      ? 'bg-amber-400 text-slate-950'
                                      : 'bg-indigo-500/70 text-white'
                                  }`}
                                >
                                  ⭐
                                </div>
                              ))}
                            </div>
                            <span className="text-xs font-black text-white">
                              {itemsPerGroup} פריטים
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Formula Explanation Card */}
                    <div className="bg-indigo-900/40 p-4 rounded-xl border border-indigo-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <p>
                          <strong>צעד 1 (חילוק במכנה):</strong> {pqTotal} חלקי {pqDenom} = <strong>{itemsPerGroup}</strong> בכל קבוצה.
                        </p>
                        <p>
                          <strong>צעד 2 (כפל במונה):</strong> {itemsPerGroup} כפול {pqNum} = <strong className="text-amber-300 text-sm">{finalResult} פריטים</strong>.
                        </p>
                      </div>

                      <div className="bg-amber-400 text-slate-950 px-4 py-2 rounded-xl font-black text-base shadow-sm">
                        תשובה: {finalResult}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ========================================================
              TOPIC 6: fractional-amount (השבר ככמות חלקית - מציאת השלם)
             ======================================================== */}
          {topicId === 'fractional-amount' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-indigo-200 font-bold">החלק הידוע:</span>
                  <select
                    value={`${faGivenNum}/${faDenom}`}
                    onChange={(e) => {
                      const [n, d] = e.target.value.split('/').map(Number);
                      setFaGivenNum(n);
                      setFaDenom(d);
                    }}
                    className="bg-indigo-950 border border-indigo-400/40 rounded-lg px-2 py-1 text-white font-bold"
                  >
                    <option value="2/5">2/5 (שתי חמישיות)</option>
                    <option value="3/4">3/4 (שלושה רבעים)</option>
                    <option value="2/3">2/3 (שני שלישים)</option>
                    <option value="3/7">3/7 (שלוש שביעיות)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-indigo-200">ערך החלק: {faGivenValue}</span>
                  <input
                    type="range"
                    min={faGivenNum * 2}
                    max={faGivenNum * 15}
                    step={faGivenNum}
                    value={faGivenValue}
                    onChange={(e) => setFaGivenValue(Number(e.target.value))}
                    className="w-24 accent-amber-400"
                  />
                </div>
              </div>

              {/* Tape Diagram */}
              {(() => {
                const unitValue = faGivenValue / faGivenNum;
                const fullTotal = unitValue * faDenom;

                return (
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
                    <div className="text-xs text-indigo-200">
                      💡 <strong>חידת הבלש:</strong> אם {faGivenNum}/{faDenom} שווים <strong>{faGivenValue}</strong>, כמה שווה השלם כולו ({faDenom}/{faDenom})?
                    </div>

                    {/* Tape Blocks */}
                    <div className="flex h-16 w-full rounded-xl overflow-hidden border-2 border-indigo-300/40 bg-slate-800">
                      {Array.from({ length: faDenom }).map((_, i) => {
                        const isGivenBlock = i < faGivenNum;

                        return (
                          <div
                            key={i}
                            className={`flex-1 border-r border-slate-900 flex flex-col items-center justify-center font-bold text-xs transition-all ${
                              isGivenBlock
                                ? 'bg-amber-400 text-slate-950 shadow-inner'
                                : 'bg-indigo-900/60 text-indigo-300'
                            }`}
                          >
                            <span className="text-[10px] opacity-80">1/{faDenom}</span>
                            <span className="text-sm font-black">{unitValue}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step by step calculations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                        <span className="text-amber-300 font-bold block">שלב 1: גילוי שבר יחידה בודד</span>
                        <p className="text-slate-300">
                          {faGivenValue} חלקי {faGivenNum} = <strong>{unitValue}</strong> לכל משבצת אחת.
                        </p>
                      </div>

                      <div className="bg-emerald-950/50 p-3 rounded-xl border border-emerald-400/30 space-y-1">
                        <span className="text-emerald-300 font-bold block">שלב 2: גילוי השלם כולו</span>
                        <p className="text-slate-200">
                          {unitValue} כפול {faDenom} משבצות = <strong className="text-amber-300 text-sm">{fullTotal} סך הכל</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ========================================================
              TOPIC 7: summary-review (פעילויות לסיכום הפרק)
             ======================================================== */}
          {topicId === 'summary-review' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-2xl border border-white/10">
                {[
                  { id: 'circle', label: 'עיגול שברים', icon: PieChart },
                  { id: 'line', label: 'ישר מספרים', icon: Ruler },
                  { id: 'mixed', label: 'שבר מעורב', icon: Layers },
                  { id: 'quantity', label: 'שבר מכמות', icon: Coins }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSrActiveTab(tab.id as any)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        srActiveTab === tab.id
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                          : 'text-indigo-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-black/30 p-5 rounded-2xl border border-white/10 flex flex-col items-center">
                {srActiveTab === 'circle' && (
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs text-indigo-200">חקרו שברים שווי ערך: 2/4 שווה לחצי (1/2), 3/6 שווה לחצי</span>
                    {renderCircleSlices(6, 3, 170)}
                    <span className="text-sm font-black text-amber-300">3/6 = 1/2 = 50%</span>
                  </div>
                )}

                {srActiveTab === 'line' && (
                  <div className="w-full flex flex-col items-center gap-3">
                    <span className="text-xs text-indigo-200">הבחינו במיקום שברים על הישר: 1/2 בדיוק באמצע!</span>
                    <svg viewBox="0 0 400 70" className="w-full max-w-md h-20">
                      <line x1="30" y1="35" x2="370" y2="35" stroke="#94a3b8" strokeWidth="3" />
                      <circle cx="30" cy="35" r="4" fill="#ffffff" />
                      <text x="30" y="55" fill="#ffffff" fontSize="12" textAnchor="middle">0</text>
                      <circle cx="200" cy="35" r="6" fill="#fbbf24" />
                      <text x="200" y="55" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">1/2</text>
                      <circle cx="370" cy="35" r="4" fill="#ffffff" />
                      <text x="370" y="55" fill="#ffffff" fontSize="12" textAnchor="middle">1</text>
                    </svg>
                  </div>
                )}

                {srActiveTab === 'mixed' && (
                  <div className="flex items-center gap-4">
                    {renderCircleSlices(4, 4, 100)}
                    <span className="text-2xl font-bold">+</span>
                    {renderCircleSlices(4, 3, 100)}
                    <span className="text-2xl font-bold">=</span>
                    <div className="bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-lg">
                      1 ו-3/4 (או 7/4)
                    </div>
                  </div>
                )}

                {srActiveTab === 'quantity' && (
                  <div className="flex flex-col items-center gap-2 text-xs">
                    <span className="text-indigo-200">2/3 מתוך 18 = (18 חלקי 3) כפול 2 = 12</span>
                    <div className="flex gap-2 py-2">
                      <div className="bg-indigo-950 p-2 rounded-lg border border-indigo-400/40 text-center font-bold">
                        קבוצה 1 (6)
                      </div>
                      <div className="bg-indigo-950 p-2 rounded-lg border border-indigo-400/40 text-center font-bold">
                        קבוצה 2 (6)
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-700 text-center text-slate-400">
                        קבוצה 3 (6)
                      </div>
                    </div>
                    <span className="font-bold text-amber-300">2 קבוצות = 12 פריטים</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TOPIC 8: decimals-mult-div (שבר עשרוני - כפל וחילוק ב-10 וב-100)
             ======================================================== */}
          {topicId === 'decimals-mult-div' && (
            <div className="flex flex-col gap-4">
              {/* Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
                <span className="text-indigo-200 font-bold">בצע פעולה על המספר:</span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const res = Math.round(decVal * 10 * 1000) / 1000;
                      setDecVal(res);
                      setDecHistory(`כפל ב-10: ${decVal} × 10 = ${res} (נקודה זזה ימינה צעד 1)`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white transition-all shadow-xs"
                  >
                    × 10 (ימינה 1)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const res = Math.round(decVal * 100 * 1000) / 1000;
                      setDecVal(res);
                      setDecHistory(`כפל ב-100: ${decVal} × 100 = ${res} (נקודה זזה ימינה 2 צעדים)`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white transition-all shadow-xs"
                  >
                    × 100 (ימינה 2)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const res = Math.round((decVal / 10) * 1000) / 1000;
                      setDecVal(res);
                      setDecHistory(`חילוק ב-10: ${decVal} ÷ 10 = ${res} (נקודה זזה שמאלה צעד 1)`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 font-bold text-white transition-all shadow-xs"
                  >
                    ÷ 10 (שמאלה 1)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const res = Math.round((decVal / 100) * 1000) / 1000;
                      setDecVal(res);
                      setDecHistory(`חילוק ב-100: ${decVal} ÷ 100 = ${res} (נקודה זזה שמאלה 2 צעדים)`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition-all shadow-xs"
                  >
                    ÷ 100 (שמאלה 2)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDecVal(3.45);
                      setDecHistory('איפוס ל-3.45');
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Place Value Board */}
              <div className="bg-black/30 p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-indigo-300">לוח ערך מקומי חי ואינטראקטיבי:</span>
                  <div className="bg-amber-400 text-slate-950 font-black text-xl px-4 py-1 rounded-xl shadow-md">
                    {decVal}
                  </div>
                </div>

                {/* Table Columns */}
                {(() => {
                  const parts = decVal.toString().split('.');
                  const intPart = parts[0] || '0';
                  const fracPart = parts[1] || '';

                  // Parse specific place values
                  const hundreds = intPart.length >= 3 ? intPart[intPart.length - 3] : '—';
                  const tens = intPart.length >= 2 ? intPart[intPart.length - 2] : '—';
                  const ones = intPart.length >= 1 ? intPart[intPart.length - 1] : '0';
                  const tenths = fracPart.length >= 1 ? fracPart[0] : '—';
                  const hundredths = fracPart.length >= 2 ? fracPart[1] : '—';

                  return (
                    <div className="grid grid-cols-6 gap-2 text-center text-xs">
                      <div className="bg-indigo-950/80 p-3 rounded-xl border border-indigo-400/30">
                        <span className="text-[10px] text-indigo-300 block mb-1">מאות</span>
                        <span className="text-xl font-black text-white">{hundreds}</span>
                      </div>
                      <div className="bg-indigo-950/80 p-3 rounded-xl border border-indigo-400/30">
                        <span className="text-[10px] text-indigo-300 block mb-1">עשרות</span>
                        <span className="text-xl font-black text-white">{tens}</span>
                      </div>
                      <div className="bg-indigo-900/90 p-3 rounded-xl border border-amber-400/50">
                        <span className="text-[10px] text-amber-300 block mb-1">אחדות</span>
                        <span className="text-xl font-black text-amber-300">{ones}</span>
                      </div>
                      <div className="bg-amber-400/20 p-3 rounded-xl border border-amber-400/40 flex flex-col items-center justify-center">
                        <span className="text-[10px] text-amber-300 block mb-1">נקודה</span>
                        <span className="text-2xl font-black text-amber-400">.</span>
                      </div>
                      <div className="bg-indigo-950/80 p-3 rounded-xl border border-indigo-400/30">
                        <span className="text-[10px] text-indigo-300 block mb-1">עשיריות</span>
                        <span className="text-xl font-black text-white">{tenths}</span>
                      </div>
                      <div className="bg-indigo-950/80 p-3 rounded-xl border border-indigo-400/30">
                        <span className="text-[10px] text-indigo-300 block mb-1">מאיות</span>
                        <span className="text-xl font-black text-white">{hundredths}</span>
                      </div>
                    </div>
                  );
                })()}

                <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-400/20 text-xs text-indigo-200">
                  ⚡ {decHistory}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
