import React, { useState } from 'react';
import {
  KeyRound,
  Lock,
  X,
  Check,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { getParentPin, saveParentPin, verifyParentPin } from '../../utils/storage';

interface ChangePinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePinModal: React.FC<ChangePinModalProps> = ({ isOpen, onClose }) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validate current PIN
    if (!verifyParentPin(currentPin)) {
      setErrorMsg('הקוד הנוכחי שהזנת אינו נכון.');
      return;
    }

    // Validate new PIN format
    if (!/^\d{4}$/.test(newPin)) {
      setErrorMsg('הקוד החדש חייב להכיל בדיוק 4 ספרות (0-9).');
      return;
    }

    // Validate confirmation
    if (newPin !== confirmPin) {
      setErrorMsg('אימות הקוד אינו תואם לקוד החדש.');
      return;
    }

    // Save PIN
    const ok = saveParentPin(newPin);
    if (ok) {
      setSuccessMsg('קוד ה-PIN עודכן בהצלחה!');
      setTimeout(() => {
        onClose();
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
        setSuccessMsg(null);
      }, 1000);
    } else {
      setErrorMsg('שגיאה בשמירת הקוד. אנא נסה שוב.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      dir="rtl"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-sm w-full p-6 relative flex flex-col gap-4">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-900 leading-tight">
              שינוי קוד PIN להורה
            </h3>
            <p className="text-xs text-slate-500">
              הגדרת קוד אישי בן 4 ספרות
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2 font-bold">
            <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              קוד PIN נוכחי:
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={currentPin}
              onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full text-center text-lg font-mono tracking-widest px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-slate-50 font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              קוד PIN חדש (4 ספרות):
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full text-center text-lg font-mono tracking-widest px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-slate-50 font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              אימות קוד PIN חדש:
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-full text-center text-lg font-mono tracking-widest px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-slate-50 font-bold"
              required
            />
          </div>

          <div className="flex gap-2.5 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>שמור קוד</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
