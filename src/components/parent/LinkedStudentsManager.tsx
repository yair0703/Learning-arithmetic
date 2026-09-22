import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Copy,
  Check,
  GraduationCap,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Trophy,
  Award,
  Calendar,
  AlertCircle,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { LinkedStudentProfile, StudentProgress, UserProfile } from '../../types';
import {
  getLinkedChildrenForParent,
  createLinkedChildProfile,
  loadStudentProgressFromCloud,
  setStudentCloudId
} from '../../utils/firebase';
import { saveStudentProgress } from '../../utils/storage';

interface LinkedStudentsManagerProps {
  parentProfile: UserProfile;
  currentProgress: StudentProgress;
  onSelectStudentProgress: (progress: StudentProgress, studentName: string) => void;
}

export const LinkedStudentsManager: React.FC<LinkedStudentsManagerProps> = ({
  parentProfile,
  currentProgress,
  onSelectStudentProgress
}) => {
  const [children, setChildren] = useState<LinkedStudentProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newCustomPrefix, setNewCustomPrefix] = useState<string>('');
  const [creating, setCreating] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchChildren = async () => {
    if (!parentProfile.uid) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const list = await getLinkedChildrenForParent(parentProfile.uid);
    setChildren(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchChildren();
  }, [parentProfile.uid]);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentProfile.uid) {
      setErrorMsg('יש להתחבר תחילה כהורה כדי ליצור פרופיל תלמיד');
      return;
    }
    if (!newStudentName.trim()) {
      setErrorMsg('נא להזין את שם התלמיד/ה');
      return;
    }

    setCreating(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await createLinkedChildProfile(
      parentProfile.uid,
      newStudentName.trim(),
      newCustomPrefix.trim() || undefined
    );

    if (res.success && res.student) {
      setSuccessMsg(`התלמיד "${res.student.studentName}" נוצר בהצלחה עם קוד כניסה: ${res.student.studentCode}`);
      setNewStudentName('');
      setNewCustomPrefix('');
      setIsAddingOpen(false);
      await fetchChildren();
    } else {
      setErrorMsg(res.error || 'שגיאה ביצירת פרופיל התלמיד');
    }
    setCreating(false);
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    } catch {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const handleViewChildReport = async (child: LinkedStudentProfile) => {
    setLoading(true);
    const res = await loadStudentProgressFromCloud(child.studentId);
    if (res.success && res.data) {
      setStudentCloudId(child.studentId);
      saveStudentProgress(res.data);
      onSelectStudentProgress(res.data, child.studentName);
      setSuccessMsg(`כעת מוצג הדוח הפדגוגי של: ${child.studentName}`);
    } else {
      setErrorMsg('לא ניתן היה לטעון את נתוני התלמיד מהענן');
    }
    setLoading(false);
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
            <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
              <span>ניהול תלמידים וילדים מקושרים</span>
              <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                {children.length} תלמידים
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              צפייה בהתקדמות, הפקת קודי כניסה לטלפון של הילד/ה ומעקב אחר ביצועים
            </p>
          </div>
        </div>

        {/* Add Student Button */}
        <button
          type="button"
          onClick={() => {
            setIsAddingOpen(!isAddingOpen);
            setErrorMsg(null);
          }}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isAddingOpen ? 'סגור טופס' : '+ הוסף תלמיד / ילד חדש'}</span>
        </button>
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
            <span>הגדרת תלמיד/ה חדש/ה במערכת:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                שם התלמיד/ה (למשל: איתי):
              </label>
              <input
                type="text"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="הקלד/י שם..."
                required
                className="w-full bg-white border border-slate-300 focus:border-indigo-600 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                קידומת קוד (אופציונלי):
              </label>
              <input
                type="text"
                value={newCustomPrefix}
                onChange={(e) => setNewCustomPrefix(e.target.value.toUpperCase())}
                placeholder="למשל: ITAY או TAL"
                className="w-full bg-white border border-slate-300 focus:border-indigo-600 rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase text-slate-800 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-[11px] text-slate-500 leading-tight">
              האפליקציה תפיק קוד כניסה קצר ונוח (למשל <span className="font-mono font-bold">ITAY-542</span>) אותו תיתן לילד/ה להזנה מהטלפון שלו.
            </p>
            <button
              type="submit"
              disabled={creating || !newStudentName.trim()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer disabled:opacity-50 shrink-0 flex items-center gap-2"
            >
              {creating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>צור פרופיל והפק קוד</span>}
            </button>
          </div>
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
            לחץ על "+ הוסף תלמיד / ילד חדש" למעלה כדי להפיק קוד כניסה קל שהילד יוכל להזין בטלפון או בטאבלט שלו.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {children.map((child) => (
            <div
              key={child.studentId}
              className="bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 p-4 rounded-2xl transition-all flex flex-col justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    {child.studentName.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{child.studentName}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>קוד כניסה:</span>
                      <span className="font-mono font-black text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                        {child.studentCode}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(child.studentCode)}
                        className="text-slate-400 hover:text-indigo-600 p-0.5 cursor-pointer"
                        title="העתק קוד כניסה"
                      >
                        {copiedCode === child.studentCode ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Accuracy pill */}
                <div className="text-left">
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-black px-2 py-0.5 rounded-full font-mono">
                    {child.accuracyRate || 0}% הצלחה
                  </span>
                </div>
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
          ))}
        </div>
      )}

      {/* Educational info for parent */}
      <div className="bg-slate-100/80 p-3.5 rounded-2xl text-[11px] text-slate-600 flex items-center gap-2">
        <Smartphone className="w-4 h-4 text-indigo-600 shrink-0" />
        <span>
          <strong>כיצד הילד נכנס מהטלפון שלו?</strong> הילד פותח את האפליקציה, לוחץ על <strong>"כניסת תלמיד 👦"</strong> ומזין את קוד הכניסה האישי שלו (אין צורך במייל או סיסמה!).
        </span>
      </div>
    </div>
  );
};
