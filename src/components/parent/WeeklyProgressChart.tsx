import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';
import { StudentProgress } from '../../types';
import { getWeeklyProgressData, DayProgressStat } from '../../utils/storage';
import {
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  Zap
} from 'lucide-react';

interface WeeklyProgressChartProps {
  progress: StudentProgress;
}

type MetricMode = 'exercises' | 'accuracy' | 'time';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
    payload: DayProgressStat;
  }>;
  label?: string;
}

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data: DayProgressStat = payload[0].payload;
    return (
      <div className="bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700/60 text-xs backdrop-blur-md min-w-[170px] pointer-events-none">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2">
          <div className="font-black text-sm text-indigo-300">{data.dayName}</div>
          {data.isToday && (
            <span className="bg-indigo-500 text-[10px] text-white px-2 py-0.5 rounded-full font-bold">
              היום
            </span>
          )}
        </div>

        <div className="space-y-1.5 font-medium">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              סה״כ תרגילים:
            </span>
            <span className="font-bold text-white font-mono">{data.solved}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              נפתרו נכון:
            </span>
            <span className="font-bold text-emerald-400 font-mono">{data.correct}</span>
          </div>

          {data.incorrect > 0 && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                טעויות לחיזוק:
              </span>
              <span className="font-bold text-rose-300 font-mono">{data.incorrect}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800">
            <span className="text-slate-400">אחוז הצלחה:</span>
            <span
              className={`font-black font-mono ${
                data.accuracy >= 80
                  ? 'text-emerald-400'
                  : data.accuracy >= 50
                  ? 'text-amber-400'
                  : 'text-slate-400'
              }`}
            >
              {data.solved > 0 ? `${data.accuracy}%` : '—'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">זמן אימון:</span>
            <span className="font-bold text-sky-300 font-mono">
              {data.practiceMinutes > 0 ? `${data.practiceMinutes} דק׳` : '—'}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({ progress }) => {
  const [metricMode, setMetricMode] = useState<MetricMode>('exercises');
  const weeklyData = getWeeklyProgressData(progress);

  // Computed summary metrics
  const totalWeeklySolved = weeklyData.reduce((sum, d) => sum + d.solved, 0);
  const totalWeeklyCorrect = weeklyData.reduce((sum, d) => sum + d.correct, 0);
  const totalWeeklyMinutes = weeklyData.reduce((sum, d) => sum + d.practiceMinutes, 0);
  const weeklyAccuracy =
    totalWeeklySolved > 0 ? Math.round((totalWeeklyCorrect / totalWeeklySolved) * 100) : 0;

  // Active days count
  const activeDaysCount = weeklyData.filter((d) => d.solved > 0).length;

  // Best day
  let bestDay: DayProgressStat | null = null;
  weeklyData.forEach((d) => {
    if (!bestDay || d.solved > bestDay.solved) {
      bestDay = d;
    }
  });

  return (
    <div
      className="bg-white p-6 md:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6"
      id="parent-weekly-progress-chart"
    >
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-lg md:text-xl font-black text-slate-900">
              מעקב התקדמות שבועי
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            פירוט תרגול, הישגים והתמדה לאורך 7 הימים האחרונים
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMetricMode('exercises')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              metricMode === 'exercises'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            תרגילים נפתרו
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('accuracy')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              metricMode === 'accuracy'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            אחוזי הצלחה (%)
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('time')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              metricMode === 'time'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            זמן תרגול (דק׳)
          </button>
        </div>
      </div>

      {/* Metric Quick Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium">תרגילים השבוע</span>
            <span className="text-base font-black text-slate-900 font-mono">
              {totalWeeklySolved}{' '}
              <span className="text-xs font-normal text-slate-400">
                ({totalWeeklyCorrect} נכונים)
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium">דיוק שבועי ממוצע</span>
            <span className="text-base font-black text-emerald-600 font-mono">
              {weeklyAccuracy}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium">סה״כ זמן השבוע</span>
            <span className="text-base font-black text-slate-800 font-mono">
              {totalWeeklyMinutes} דקות
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-medium">ימי פעילות השבוע</span>
            <span className="text-base font-black text-amber-600 font-mono">
              {activeDaysCount} מתוך 7
            </span>
          </div>
        </div>
      </div>

      {/* Recharts Bar Chart Container */}
      <div className="w-full h-72 sm:h-80 pt-2 pb-1 relative" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          {metricMode === 'exercises' ? (
            <BarChart
              data={weeklyData}
              margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
              barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="dayShort"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
                formatter={(val) =>
                  val === 'correct' ? 'תרגילים נכונים' : 'טעויות לחיזוק'
                }
              />
              <Bar
                dataKey="correct"
                name="correct"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                maxBarSize={36}
              />
              <Bar
                dataKey="incorrect"
                name="incorrect"
                fill="#f43f5e"
                radius={[6, 6, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          ) : metricMode === 'accuracy' ? (
            <BarChart
              data={weeklyData}
              margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="dayShort"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Bar dataKey="accuracy" name="אחוז הצלחה" radius={[6, 6, 0, 0]} maxBarSize={42}>
                {weeklyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.solved === 0
                        ? '#e2e8f0'
                        : entry.accuracy >= 80
                        ? '#10b981'
                        : entry.accuracy >= 50
                        ? '#f59e0b'
                        : '#f43f5e'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart
              data={weeklyData}
              margin={{ top: 15, right: 10, left: -15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="dayShort"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v} דק׳`}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Bar
                dataKey="practiceMinutes"
                name="זמן תרגול (דקות)"
                fill="#0284c7"
                radius={[6, 6, 0, 0]}
                maxBarSize={42}
              >
                {weeklyData.map((entry, index) => (
                  <Cell
                    key={`cell-time-${index}`}
                    fill={entry.isToday ? '#6366f1' : '#0284c7'}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Pedagogical Weekly Tip Footnote */}
      <div className="bg-indigo-50/70 border border-indigo-100 p-3.5 rounded-2xl flex items-start gap-3 text-xs text-indigo-900">
        <Calendar className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
        <div className="leading-relaxed">
          <span className="font-bold">תובנה לליווי ההורי:</span> התמדה יומיומית של 10–15
          דקות שומרת על רצף הלמידה ומפתחת ביטחון עצמי מתמטי יציב לקראת מבחנים ומשימות
          כיתתיות.
          {bestDay && (bestDay as DayProgressStat).solved > 0 && (
            <span className="block mt-1 font-semibold text-indigo-800">
              🌟 יום השיא השבוע: {(bestDay as DayProgressStat).dayName} עם{' '}
              {(bestDay as DayProgressStat).solved} תרגילים ו-
              {(bestDay as DayProgressStat).accuracy}% הצלחה!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
