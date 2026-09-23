import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  UserPlus,
  Copy,
  Check,
  GraduationCap,
  Sparkles,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Smartphone,
  Trash2,
  Share2,
  QrCode,
  Radio
} from 'lucide-react';
import { LinkedStudentProfile, StudentProgress, UserProfile } from '../../types';
import {
  getLinkedChildrenForParent,
  getCachedChildrenForParent,
  createLinkedChildProfile,
  deleteLinkedChild,
  loadStudentProgressFromCloud,
  setStudentCloudId,
  getMagicLinkUrl,
  subscribeToLinkedChildren
} from '../../utils/firebase';
import { saveStudentProgress } from '../../utils/storage';
import { StudentQrModal } from './StudentQrModal';

interface LinkedStudentsManagerProps {
  parentProfile: UserProfile;
  currentProgress: StudentProgress;
  onSelectStudentProgress: (progress: StudentProgress, studentName: string, studentId?: string) => void;
}

export const LinkedStudentsManager: React.FC<LinkedStudentsManagerProps> = ({
  parentProfile,
  onSelectStudentProgress
}) => {
  const [children, setChildren] = useState<LinkedStudentProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('');
  const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [creating, setCreating] = useState<boolean>(false);
  const [copiedStudentId, setCopiedStudentId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [selectedQrStudent, setSelectedQrStudent] = useState<LinkedStudentProfile | null>(null);

  const parentUid = parentProfile.uid || 'parent_local';

  const fetchChildren = useCallback(async (showIndicator = false) => {
    if (showIndicator) {
      setIsRefreshing(true);
    } else {
      const localCached = getCachedChildrenForParent(parentUid);
      if (localCached.length > 0) {
        setChildren(localCached);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }

    try {
      const list = await getLinkedChildrenForParent(parentUid);
      setChildren(list);
      setLastRefreshedTime(new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      if (showIndicator) {
        setSuccessMsg('נתוני התלמידים סונכרנו בהצלחה מהענן ☁️');
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.warn('Error fetching linked children:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [parentUid]);

  // Real-time listener for parent's linked students
  useEffect(() => {
    fetchChildren(false);

    const unsubscribe = subscribeToLinkedChildren(parentUid, (updatedList) => {
      setChildren(updatedList);
      setLastRefreshedTime(new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [parentUid, fetchChildren]);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) {
      setErrorMsg('נא להזין את שם התלמיד/ה');
      return;
    }

    setCreating(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await createLinkedChildProfile(
        parentUid,
        newStudentName.trim()
      );

      if (res.success && res.student) {
        setSuccessMsg(`התלמיד/ה "${res.student.studentName}" נוצר/ה בהצלחה! לחץ על "שתף ב-WhatsApp" או "קוד QR" כדי לחבר אותם.`);
        setNewStudentName('');
        setIsAddingOpen(false);
        setChildren((prev) => [res.student!, ...(prev || []).filter((c) => c && c.studentId !== res.student!.studentId)]);
        // Open QR modal automatically for instant share
        setSelectedQrStudent(res.student);
      } else {
        setErrorMsg(res.error || 'שגיאה ביצירת פרופיל התלמיד');
      }
    } catch (err) {
      setErrorMsg('שגיאה בלתי צפויה ביצירת התלמיד');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteChild = async (child: LinkedStudentProfile) => {
    if (!window.confirm(`האם למחוק את התלמיד/ה "${child.studentName}"?`)) {
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(null);

    setChildren((prev) => prev.filter((c) => c.studentId !== child.studentId));
    setSuccessMsg(`התלמיד "${child.studentName}" הוסר בהצלחה`);

    try {
      const res = await deleteLinkedChild(child.studentId, parentProfile.uid);
      if (!res.success) {
        setErrorMsg(res.error || 'שגיאה במחיקת התלמיד משרת הענן');
        fetchChildren();
      }
    } catch (err) {
      setErrorMsg('שגיאה במחיקת התלמיד');
      console.error(err);
      fetchChildren();
    }
  };

  const handleCopyMagicLink = async (child: LinkedStudentProfile) => {
    const magicUrl = getMagicLinkUrl(child);
    try {
      await navigator.clipboard.writeText(magicUrl);
      setCopiedStudentId(child.studentId);
      setTimeout(() => setCopiedStudentId(null), 2500);
    } catch {
      setCopiedStudentId(child.studentId);
      setTimeout(() => setCopiedStudentId(null), 2500);
    }
  };

  const handleShareWhatsapp = (child: LinkedStudentProfile) => {
    const magicUrl = getMagicLinkUrl(child);
    const text = `שלום ${child.studentName}! 🎉 הנה קישור הכניסה האישי שלך לאפליקציית השברים והחשבון:\n${magicUrl}\nלחץ/י על הקישור והתחל/י לתרגל בכיף! 🚀`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleViewChildReport = async (child: LinkedStudentProfile) => {
    setLoading(true);
    try {
      const res = await loadStudentProgressFromCloud(child.studentId);
      if (res.success && res.data) {
        setStudentCloudId(child.studentId);
        saveStudentProgress(res.data);
        onSelectStudentProgress(res.data, child.studentName, child.studentId);
        setSuccessMsg(`כעת מוצג הדוח הפדגוגי של: ${child.studentName}`);
      } else {
        setErrorMsg('לא ניתן היה לטעון את נתוני התלמיד מהענן');
      }
    } catch {
      setErrorMsg('שגיאה בטעינת נתוני התלמיד');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white p-6 md:p-7 rounded-3xl border border-indigo-100 shadow-sm flex flex-col gap-5"
      id="linked-students-manager"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2 flex-wrap">
              <span>ניהול תלמידים וילדים מקושרים</span>
              <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                {children.length} תלמידים
              </span>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>סנכרון ענן בזמן אמת</span>
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              חיבור מהיר באמצעות קישור Magic Link אישי וקוד QR ללא צורך בסיסמאות
              {lastRefreshedTime && (
                <span className="text-slate-400 mr-2"> • עודכן לאחרונה: {lastRefreshedTime}</span>
              )}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Refresh Data Button */}
          <button
            type="button"
            onClick={() => fetchChildren(true)}
            disabled={isRefreshing}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer border border-slate-200 active:scale-95 disabled:opacity-50"
            title="רענון ידני של נתוני ההתקדמות מ-Firebase"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'מרענן נתונים...' : 'רענן נתונים 🔄'}</span>
          </button>

          {/* Add Student Button */}
          <button
            type="button"
            onClick={() => {
              setIsAddingOpen(!isAddingOpen);
              setErrorMsg(null);
            }}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isAddingOpen ? 'סגור טופס' : '+ הוסף תלמיד / ילד חדש'}</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-medium">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add New Student Form (Collapsible) */}
      {isAddingOpen && (
        <form
          onSubmit={handleCreateStudent}
          className="bg-indigo-50/70 border border-indigo-200 p-5 rounded-2xl flex flex-col gap-3 animate-in fade-in"
        >
          <h4 className="text-xs font-black text-indigo-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>יצירת תלמיד/ה חדש/ה במערכת:</span>
          </h4>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                שם התלמיד/ה:
              </label>
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="למשל: ינון"
                required
                className="w-full bg-white border border-slate-300 focus:border-indigo-600 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={creating || !newStudentName.trim()}
              className="w-full sm:w-auto mt-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer disabled:opacity-50 shrink-0 flex items-center justify-center gap-2"
            >
              {creating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>צור פרופיל תלמיד 🚀</span>}
            </button>
          </div>

          <p className="text-[11px] text-slate-500 leading-tight pt-1">
            לאחר היצירה, ייצר עבור התלמיד קישור כניסה אישי וקוד QR ייחודי שתוכל לשלוח אליו ב-WhatsApp בלחיצת כפתור אחת!
          </p>
        </form>
      )}

      {/* Children List */}
      {loading ? (
        <div className="p-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
          <span>טוען רשימת תלמידים מקושרים...</span>
        </div>
      ) : children.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">עדיין לא הוספת תלמידים מקושרים</h4>
          <p className="text-xs text-slate-500 max-w-md">
            לחץ על "+ הוסף תלמיד / ילד חדש" למעלה כדי להפיק קישור כניסה ו-QR שהילד יוכל לפתוח בטלפון שלו בלחיצה אחת.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {children.map((child) => {
            if (!child || !child.studentId) return null;
            const displayName = child.studentName || 'תלמיד/ה';
            const initialLetter = displayName.trim().charAt(0) || '🎓';

            return (
              <div
                key={child.studentId}
                className="bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 p-4 rounded-2xl transition-all flex flex-col justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                      {initialLetter}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">{displayName}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">חיבור Magic Link פעיל 🟢</p>
                    </div>
                  </div>

                  {/* Actions & Accuracy */}
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-black px-2 py-0.5 rounded-full font-mono">
                      {child.accuracyRate || 0}% הצלחה
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteChild(child)}
                      className="text-slate-300 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      title="מחק תלמיד"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              {/* Magic Link & Share buttons */}
              <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleShareWhatsapp(child)}
                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>שתף ב-WhatsApp 💬</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedQrStudent(child)}
                  className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] rounded-lg border border-indigo-200 flex items-center gap-1 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                  <span>קוד QR 📱</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyMagicLink(child)}
                  className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg flex items-center gap-1 cursor-pointer"
                  title="העתק קישור"
                >
                  {copiedStudentId === child.studentId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>הועתק!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>העתק קישור 🔗</span>
                    </>
                  )}
                </button>
              </div>

              {/* Stats row & view button */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                  <span>{child.totalSolved || 0} תרגילים שנפתרו</span>
                  {child.lastActiveDate && <span>פעילות: {child.lastActiveDate}</span>}
                </div>

                <button
                  type="button"
                  onClick={() => handleViewChildReport(child)}
                  className="px-3 py-1.5 bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <span>צפה בדוח</span>
                  <ArrowRight className="w-3 h-3 rotate-180" />
                </button>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Educational info for parent */}
      <div className="bg-slate-100/80 p-3.5 rounded-2xl text-[11px] text-slate-600 flex items-center gap-2">
        <Smartphone className="w-4 h-4 text-indigo-600 shrink-0" />
        <span>
          <strong>איך הילד נכנס?</strong> לחץ על <strong>"שתף ב-WhatsApp 💬"</strong> ושלח לילד קישור כניסה. הילד לוחץ על הקישור ונכנס פנימה **בלחיצה אחת** מכל טלפון או טאבלט!
        </span>
      </div>

      {/* QR Code Modal */}
      <StudentQrModal
        isOpen={!!selectedQrStudent}
        onClose={() => setSelectedQrStudent(null)}
        student={selectedQrStudent}
        allStudents={children}
        onSelectStudent={(st) => setSelectedQrStudent(st)}
      />
    </div>
  );
};
