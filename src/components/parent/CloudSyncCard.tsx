import React, { useState, useEffect } from 'react';
import {
  Cloud,
  CloudDownload,
  Copy,
  Check,
  RefreshCw,
  Info,
  AlertCircle,
  Database,
  WifiOff
} from 'lucide-react';
import { StudentProgress } from '../../types';
import {
  getStudentCloudId,
  setStudentCloudId,
  saveStudentProgressToCloud,
  loadStudentProgressFromCloud
} from '../../utils/firebase';
import {
  getOfflineQueueCount,
  flushOfflineQueue
} from '../../utils/syncQueue';
import { saveStudentProgress } from '../../utils/storage';

interface CloudSyncCardProps {
  progress: StudentProgress;
  onProgressUpdate: (newProg: StudentProgress) => void;
}

export const CloudSyncCard: React.FC<CloudSyncCardProps> = ({
  progress,
  onProgressUpdate
}) => {
  const [cloudId, setLocalCloudId] = useState<string>(() => getStudentCloudId());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [customInputId, setCustomInputId] = useState<string>('');
  const [isRestoreOpen, setIsRestoreOpen] = useState<boolean>(false);
  const [pendingQueueCount, setPendingQueueCount] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const refreshQueueCount = async () => {
    const count = await getOfflineQueueCount();
    setPendingQueueCount(count);
  };

  useEffect(() => {
    refreshQueueCount();
    handleSyncNow();

    const handleOn = () => { setIsOnline(true); refreshQueueCount(); };
    const handleOff = () => { setIsOnline(false); refreshQueueCount(); };

    window.addEventListener('online', handleOn);
    window.addEventListener('offline', handleOff);

    return () => {
      window.removeEventListener('online', handleOn);
      window.removeEventListener('offline', handleOff);
    };
  }, []);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(cloudId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setMessage(null);
    try {
      // First flush any offline queue
      const queueRes = await flushOfflineQueue();
      const directRes = await saveStudentProgressToCloud(progress, cloudId);
      await refreshQueueCount();

      if (directRes.success) {
        setLastSyncTime(directRes.timestamp);
        setMessage({
          type: 'success',
          text: `הנתונים סונכרנו בהצלחה לענן Firebase (${directRes.timestamp})${queueRes.flushedCount > 0 ? ` + נפרקו ${queueRes.flushedCount} שינויים שהמתינו ב-IndexedDB` : ''}`
        });
      } else {
        setMessage({ type: 'error', text: directRes.error || 'שגיאה בסנכרון לענן' });
      }
    } catch {
      setMessage({ type: 'error', text: 'שגיאת תקשורת עם שרתי הענן' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleRestoreFromCloud = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputId.trim()) return;

    setIsSyncing(true);
    setMessage(null);

    const targetId = customInputId.trim().toUpperCase();
    const res = await loadStudentProgressFromCloud(targetId);

    if (res.success && res.data) {
      setStudentCloudId(targetId);
      setLocalCloudId(targetId);
      saveStudentProgress(res.data);
      onProgressUpdate(res.data);
      setLastSyncTime(new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }));
      setMessage({ type: 'success', text: `נתוני התלמיד שוחזרו בהצלחה מהענן לפי קוד ${targetId}!` });
      setIsRestoreOpen(false);
      setCustomInputId('');
      await refreshQueueCount();
    } else {
      setMessage({ type: 'error', text: res.error || 'לא נמצאו נתונים עבור קוד ענן זה.' });
    }
    setIsSyncing(false);
  };

  return (
    <div
      className="bg-white p-6 md:p-7 rounded-3xl border border-indigo-100 shadow-sm flex flex-col gap-6"
      id="parent-cloud-sync-card"
    >
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
            <Cloud className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-black text-slate-900">
                שמירה וסנכרון ענן (Offline-First + Firestore)
              </h2>
              {isOnline ? (
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  מקוון (Online)
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <WifiOff className="w-3 h-3 text-amber-600" />
                  לא מקוון (Offline Queue פעיל)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              סנכרון רציף של הישגי התלמיד, רצף ימי הלמידה, זמני האימון ויומן הטעויות
            </p>
          </div>
        </div>

        {/* Sync now button */}
        <button
          type="button"
          onClick={handleSyncNow}
          disabled={isSyncing}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'מסנכרן כעת...' : 'סנכרן עכשיו לענן'}</span>
        </button>
      </div>

      {/* Cloud ID & Offline Queue Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cloud Student Code Box */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-1">
              קוד ענן אישי של התלמיד (למעבר בין מכשירים):
            </span>
            <div className="flex items-center gap-2">
              <div className="bg-white px-4 py-2 rounded-xl border border-slate-300 font-mono text-lg font-black text-indigo-700 tracking-wider flex-1 text-center select-all">
                {cloudId}
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                title="העתק קוד ענן"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'הועתק!' : 'העתק'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              תור שינויים מקומי (IndexedDB): <strong>{pendingQueueCount}</strong>
            </span>
            {lastSyncTime && <span>סנכרון אחרון: {lastSyncTime}</span>}
          </div>
        </div>

        {/* Load/Restore from other device */}
        <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex flex-col justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-indigo-950 block mb-1">
              מעבר ממכשיר אחר (טאבלט/סמארטפון/מחשב)?
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              רוצים להמשיך את הלמידה בדיוק מאותה נקודה במכשיר נוסף? הזינו את קוד הענן של התלמיד.
            </p>
          </div>

          {!isRestoreOpen ? (
            <button
              type="button"
              onClick={() => setIsRestoreOpen(true)}
              className="px-3 py-2 bg-white hover:bg-slate-100 text-indigo-800 border border-indigo-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full"
            >
              <CloudDownload className="w-4 h-4 text-indigo-600" />
              <span>שחזר התקדמות לפי קוד ענן</span>
            </button>
          ) : (
            <form onSubmit={handleRestoreFromCloud} className="flex gap-2">
              <input
                type="text"
                placeholder="למשל: MASLUL-1234"
                value={customInputId}
                onChange={(e) => setCustomInputId(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono font-bold flex-1 uppercase"
                autoFocus
              />
              <button
                type="submit"
                disabled={isSyncing || !customInputId.trim()}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer disabled:opacity-50"
              >
                טען
              </button>
              <button
                type="button"
                onClick={() => setIsRestoreOpen(false)}
                className="px-2.5 py-1.5 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-300 cursor-pointer"
              >
                ביטול
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Feedback Messages */}
      {message && (
        <div
          className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-700'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Guide & Architecture Info */}
      <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 flex flex-col gap-2">
        <div className="font-black text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>כיצד פועלת השמירה ועמידות ה-Offline:</span>
        </div>
        <ul className="space-y-1.5 text-slate-600 leading-relaxed pr-4 list-disc">
          <li>
            <strong>תור מקומי (IndexedDB Offline Queue):</strong> גם כאשר אין קליטת אינטרנט או ה-Wi-Fi מתנתק, כל פתרון תרגיל נרשם ונשמר בתור מקומי מאובטח.
          </li>
          <li>
            <strong>פריקה וסנכרון אוטומטי (Auto-Flush):</strong> ברגע שמתחדש החיבור לרשת, המערכת מזהה זאת מיידית, פורקת את כל התור ל-Firebase ומציגה הודעת אישור (Toast).
          </li>
          <li>
            <strong>רציפות למידה:</strong> התלמיד יכול לתרגל בנסיעות, במקלטים או בכיתות ללא קליטה – ללא חשש מאיבוד של אפילו נקודת התקדמות אחת.
          </li>
        </ul>
      </div>
    </div>
  );
};
