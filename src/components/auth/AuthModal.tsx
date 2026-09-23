import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  X,
  RefreshCw,
  QrCode,
  Share2,
  Check
} from 'lucide-react';
import {
  loginParentWithGoogle,
  loginParentWithEmail,
  registerParentWithEmail,
  findStudentByMagicToken,
  saveUserProfileToStorage,
  getSavedUserProfile,
  logoutUser,
  setStudentCloudId,
  getAllCachedStudentsOnDevice
} from '../../utils/firebase';
import { UserProfile, StudentProgress, LinkedStudentProfile } from '../../types';
import { saveStudentProgress } from '../../utils/storage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (profile: UserProfile, studentProgress?: StudentProgress) => void;
  defaultTab?: 'student' | 'parent';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  defaultTab = 'student'
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'parent'>(defaultTab);

  // Student Magic Link input state
  const [magicTokenInput, setMagicTokenInput] = useState<string>('');
  const [studentLoading, setStudentLoading] = useState<boolean>(false);
  const [studentError, setStudentError] = useState<string | null>(null);

  // Parent auth states
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [parentName, setParentName] = useState<string>('');
  const [parentEmail, setParentEmail] = useState<string>('');
  const [parentPassword, setParentPassword] = useState<string>('');
  const [parentLoading, setParentLoading] = useState<boolean>(false);
  const [parentError, setParentError] = useState<string | null>(null);

  const currentSavedProfile = getSavedUserProfile();
  const savedStudentsOnDevice = getAllCachedStudentsOnDevice();

  const handleLogoutCurrentProfile = async () => {
    await logoutUser();
    const guestProfile: UserProfile = {
      role: 'guest',
      displayName: 'תלמיד/ה (מצב מקומי)'
    };
    saveUserProfileToStorage(guestProfile);
    onLoginSuccess(guestProfile);
    onClose();
  };

  if (!isOpen) return null;

  // 1. Handle Magic Token / Link Login
  const handleMagicTokenLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!magicTokenInput.trim()) {
      setStudentError('נא להדביק את קישור הכניסה שקיבלת מההורה');
      return;
    }

    setStudentLoading(true);
    setStudentError(null);

    try {
      // Extract token from full URL if pasted
      let token = magicTokenInput.trim();
      if (token.includes('studentToken=')) {
        token = token.split('studentToken=')[1].split('&')[0];
      } else if (token.includes('magicToken=')) {
        token = token.split('magicToken=')[1].split('&')[0];
      }

      const res = await findStudentByMagicToken(token);

      if (res.success && res.student && res.progress) {
        setStudentCloudId(res.student.studentId);
        saveStudentProgress(res.progress);

        const profile: UserProfile = {
          role: 'student',
          displayName: res.student.studentName,
          uid: res.student.studentId
        };

        saveUserProfileToStorage(profile);
        onLoginSuccess(profile, res.progress);
        onClose();
      } else {
        setStudentError(res.error || 'קישור הכניסה לא נמצא. פנו להורה לקבלת קישור חדש.');
      }
    } catch {
      setStudentError('שגיאה בחיבור למערכת. אנא בדקו את החיבור לרשת ונסו שוב.');
    } finally {
      setStudentLoading(false);
    }
  };

  // Quick 1-click login for saved student
  const handleQuickStudentLogin = async (student: LinkedStudentProfile) => {
    setStudentLoading(true);
    setStudentError(null);
    try {
      const token = student.magicToken || student.studentId;
      const res = await findStudentByMagicToken(token);
      if (res.success && res.student && res.progress) {
        setStudentCloudId(res.student.studentId);
        saveStudentProgress(res.progress);

        const profile: UserProfile = {
          role: 'student',
          displayName: res.student.studentName,
          uid: res.student.studentId
        };

        saveUserProfileToStorage(profile);
        onLoginSuccess(profile, res.progress);
        onClose();
      } else {
        setStudentError('לא ניתן היה לטעון את הפרופיל. בקשו מההורה קישור חדש ב-WhatsApp.');
      }
    } catch {
      setStudentError('שגיאה בחיבור למערכת');
    } finally {
      setStudentLoading(false);
    }
  };

  // 2. Handle Guest / Offline Continue
  const handleGuestContinue = () => {
    const profile: UserProfile = {
      role: 'guest',
      displayName: 'תלמיד/ה (מצב מקומי)'
    };
    saveUserProfileToStorage(profile);
    onLoginSuccess(profile);
    onClose();
  };

  // 3. Handle Parent Google Sign-in
  const handleGoogleLogin = async () => {
    setParentLoading(true);
    setParentError(null);

    try {
      const res = await loginParentWithGoogle();
      if (res.success && res.user) {
        const profile: UserProfile = {
          role: 'parent',
          uid: res.user.uid,
          displayName: res.user.displayName || 'הורה',
          email: res.user.email || undefined
        };
        saveUserProfileToStorage(profile);
        onLoginSuccess(profile);
        onClose();
      } else {
        setParentError(res.error || 'שגיאה בהתחברות עם Google');
      }
    } catch {
      setParentError('שגיאה בהתחברות עם Google');
    } finally {
      setParentLoading(false);
    }
  };

  // 4. Handle Parent Email/Password Login & Register
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentEmail || !parentPassword) {
      setParentError('נא למלא אימייל וסיסמה');
      return;
    }

    setParentLoading(true);
    setParentError(null);

    try {
      if (isRegisterMode) {
        const res = await registerParentWithEmail(parentEmail, parentPassword, parentName || 'הורה');
        if (res.success && res.user) {
          const profile: UserProfile = {
            role: 'parent',
            uid: res.user.uid,
            displayName: parentName || res.user.displayName || 'הורה',
            email: res.user.email || undefined
          };
          saveUserProfileToStorage(profile);
          onLoginSuccess(profile);
          onClose();
        } else {
          setParentError(res.error || 'שגיאה ברישום החשבון');
        }
      } else {
        const res = await loginParentWithEmail(parentEmail, parentPassword);
        if (res.success && res.user) {
          const profile: UserProfile = {
            role: 'parent',
            uid: res.user.uid,
            displayName: res.user.displayName || 'הורה',
            email: res.user.email || undefined
          };
          saveUserProfileToStorage(profile);
          onLoginSuccess(profile);
          onClose();
        } else {
          setParentError(res.error || 'שגיאה בהתחברות');
        }
      }
    } catch {
      setParentError('שגיאה בתהליך ההתחברות');
    } finally {
      setParentLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      dir="rtl"
      id="auth-login-modal"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Header with Close */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="סגור"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black shadow-inner">
              ½
            </div>
            <div>
              <h2 className="text-xl font-black leading-tight">כניסה והתחברות למערכת</h2>
              <p className="text-xs text-indigo-100 mt-0.5">
                מסלולים פלוס – שברים לכיתה ה׳ עם סנכרון ענן מלא
              </p>
            </div>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-black/20 rounded-2xl backdrop-blur-sm">
            <button
              type="button"
              onClick={() => { setActiveTab('student'); setStudentError(null); }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-white text-indigo-900 shadow-md scale-[1.02]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>כניסת תלמיד/ה 👦</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('parent'); setParentError(null); }}
              className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'parent'
                  ? 'bg-white text-indigo-900 shadow-md scale-[1.02]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>כניסת הורה 🛡️</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Active Logged-in Profile Banner */}
          {currentSavedProfile.role && currentSavedProfile.role !== 'guest' && (
            <div className="mb-5 p-3.5 bg-indigo-50/90 border border-indigo-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base shrink-0">
                  {currentSavedProfile.role === 'parent' ? '🛡️' : '👦'}
                </div>
                <div className="min-w-0">
                  <div className="font-black text-indigo-950 truncate">
                    מחובר כעת: {currentSavedProfile.displayName || (currentSavedProfile.role === 'parent' ? 'הורה' : 'תלמיד')}
                  </div>
                  <div className="text-[11px] text-indigo-700 truncate font-medium">
                    {currentSavedProfile.role === 'parent'
                      ? (currentSavedProfile.email || 'חשבון הורה מחובר')
                      : 'פרופיל תלמיד/ה פעיל'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogoutCurrentProfile}
                className="px-3 py-1.5 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-700 font-bold rounded-xl text-xs transition-all shadow-2xs cursor-pointer shrink-0 active:scale-95"
              >
                התנתק/י
              </button>
            </div>
          )}

          {/* TAB 1: STUDENT LOGIN */}
          {activeTab === 'student' && (
            <div className="flex flex-col gap-4">
              <div className="bg-emerald-50/90 border border-emerald-200 p-3.5 rounded-2xl text-xs text-emerald-950 flex items-start gap-2.5">
                <QrCode className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>הדרך הנוחה ביותר להתחבר:</strong> לחצו על <strong>קישור הכניסה האישי</strong> שההורה שלח לכם ב-WhatsApp, או סרקו את קוד ה-QR מהטלפון של ההורה להתחברות מיידית! 🚀
                </div>
              </div>

              {/* Saved Children Cards for 1-Click Login on this device */}
              {savedStudentsOnDevice.length > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="block text-xs font-bold text-slate-700">
                    פרופילים שמורים במכשיר זה (התחברות בלחיצה אחת):
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {savedStudentsOnDevice.map((child) => (
                      <button
                        key={child.studentId}
                        type="button"
                        onClick={() => handleQuickStudentLogin(child)}
                        disabled={studentLoading}
                        className="p-3 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200 rounded-2xl flex items-center justify-between transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                            {child.studentName.slice(0, 1)}
                          </div>
                          <div className="text-right">
                            <div className="font-black text-slate-900 text-xs">{child.studentName}</div>
                            <div className="text-[10px] text-indigo-700 font-medium">התחברות בלחיצה אחת</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-indigo-600 rotate-180 group-hover:-translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Link / Token Paste Fallback */}
              <form onSubmit={handleMagicTokenLogin} className="flex flex-col gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    או הדביקו קישור כניסה / קוד אישי:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={magicTokenInput}
                      onChange={(e) => {
                        setMagicTokenInput(e.target.value);
                        setStudentError(null);
                      }}
                      placeholder="הדבק/י את קישור ה-Magic Link מכאן..."
                      className="w-full bg-slate-50 border-2 border-slate-300 focus:border-indigo-600 focus:bg-white rounded-2xl px-4 py-3 text-xs font-medium text-slate-800 transition-all outline-none"
                    />
                    {magicTokenInput && (
                      <button
                        type="button"
                        onClick={() => {
                          setMagicTokenInput('');
                          setStudentError(null);
                        }}
                        className="absolute left-3 top-3 text-slate-400 hover:text-slate-600 p-1 rounded-full text-xs cursor-pointer"
                        title="נקה"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {studentError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{studentError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={studentLoading || !magicTokenInput.trim()}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-xs rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {studentLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>התחבר מקישור 🚀</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </form>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-xs text-slate-400 font-bold">או</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={handleGuestContinue}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                המשך כאורח / תרגול ללא חשבון (נשמר במכשיר זה)
              </button>
            </div>
          )}

          {/* TAB 2: PARENT LOGIN & REGISTRATION */}
          {activeTab === 'parent' && (
            <div className="flex flex-col gap-4">
              {/* Google Sign-in */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={parentLoading}
                className="w-full py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl border border-slate-300 shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-50"
              >
                {/* Google "G" Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>התחברות מהירה באמצעות חשבון Google</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-xs text-slate-400 font-bold">
                  או באימייל וסיסמה
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
                {isRegisterMode && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      שם ההורה / הכינוי:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="למשל: יאיר"
                        autoCapitalize="words"
                        autoCorrect="off"
                        autoComplete="name"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:bg-white rounded-xl px-3 py-2 text-xs text-slate-800 outline-none"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    כתובת אימייל:
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      autoComplete={isRegisterMode ? 'email' : 'username'}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:bg-white rounded-xl px-3 py-2 text-xs text-slate-800 outline-none"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    סיסמה:
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={parentPassword}
                      onChange={(e) => setParentPassword(e.target.value)}
                      placeholder="לפחות 6 תווים"
                      required
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:bg-white rounded-xl px-3 py-2 text-xs text-slate-800 outline-none"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {parentError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-2xl flex flex-col gap-2 font-medium">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{parentError}</span>
                    </div>

                    {parentError.includes('מורשה') && typeof window !== 'undefined' && (
                      <div className="bg-white/90 p-3 rounded-xl border border-rose-300 text-[11px] text-slate-800 flex flex-col gap-1.5 mt-1">
                        <div className="font-bold text-indigo-900">כיצד לאשר את הדומיין ב-Firebase:</div>
                        <ol className="list-decimal list-inside space-y-1 text-slate-700">
                          <li>היכנס ל-<strong>Firebase Console</strong> לפרויקט שלך</li>
                          <li>עבור אל <strong>Authentication</strong> ➔ <strong>Settings</strong> (הגדרות)</li>
                          <li>בלשונית <strong>Authorized domains</strong> לחץ על <strong>Add domain</strong></li>
                          <li>הדבק את הדומיין הבא:</li>
                        </ol>
                        <div className="flex items-center justify-between bg-slate-100 p-2 rounded-lg font-mono text-[11px] text-indigo-950 font-bold">
                          <span className="truncate">{window.location.hostname}</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.hostname);
                              alert('הדומיין הועתק ללוח!');
                            }}
                            className="text-xs text-indigo-600 hover:text-indigo-800 font-sans font-bold underline cursor-pointer shrink-0 mr-2"
                          >
                            העתק
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={parentLoading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-1"
                >
                  {parentLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>{isRegisterMode ? 'צור חשבון הורה חדש' : 'התחבר לחשבון הורה'}</span>
                  )}
                </button>
              </form>

              {/* Toggle Register/Login */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterMode(!isRegisterMode);
                    setParentError(null);
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer"
                >
                  {isRegisterMode
                    ? 'כבר יש לך חשבון? לחץ/י להתחברות'
                    : 'חדש/ה באפליקציה? לחץ/י להרשמה מהירה'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
