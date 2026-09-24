import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Delete,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { verifyParentPin, resetParentPinToDefault, DEFAULT_PARENT_PIN } from '../../utils/storage';

interface ParentPinLockProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const ParentPinLock: React.FC<ParentPinLockProps> = ({ onSuccess, onCancel }) => {
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPin, setShowPin] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState<boolean>(false);

  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  });

  const checkPin = useCallback((enteredPin: string) => {
    if (verifyParentPin(enteredPin)) {
      setIsSuccess(true);
      setErrorMsg(null);
      setTimeout(() => {
        if (onSuccessRef.current) {
          onSuccessRef.current();
        }
      }, 250);
    } else {
      setShake(true);
      setErrorMsg('קוד ה-PIN שהוזן שגוי. נסו שוב.');
      setTimeout(() => {
        setShake(false);
        setPin('');
      }, 600);
    }
  }, []);

  const handleDigit = useCallback((digit: string) => {
    if (isSuccess) return;
    setErrorMsg(null);
    setPin((prev) => {
      if (prev.length >= 4) return prev;
      const next = prev + digit;
      if (next.length === 4) {
        checkPin(next);
      }
      return next;
    });
  }, [isSuccess, checkPin]);

  const handleDelete = useCallback(() => {
    if (isSuccess) return;
    setErrorMsg(null);
    setPin((prev) => prev.slice(0, -1));
  }, [isSuccess]);

  const handleClear = useCallback(() => {
    if (isSuccess) return;
    setErrorMsg(null);
    setPin('');
  }, [isSuccess]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter' && pin.length === 4) {
        checkPin(pin);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDelete, onCancel, pin, checkPin]);

  const handleResetToDefault = () => {
    resetParentPinToDefault();
    setResetConfirmOpen(false);
    setPin('');
    setErrorMsg(`הקוד אופס בהצלחה לקוד ברירת המחדל: ${DEFAULT_PARENT_PIN}`);
  };

  return (
    <div
      className="max-w-md mx-auto my-4 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col items-center text-center animate-in fade-in duration-200"
      id="parent-pin-lock-screen"
      dir="rtl"
    >
      {/* Icon Badge */}
      <div
        className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-300 mb-4 ${
          isSuccess
            ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200'
            : shake
            ? 'bg-rose-100 text-rose-600 border border-rose-200'
            : 'bg-indigo-50 border border-indigo-200 text-indigo-600'
        }`}
      >
        {isSuccess ? (
          <Unlock className="w-8 h-8 animate-bounce" />
        ) : (
          <Lock className="w-8 h-8" />
        )}
      </div>

      {/* Heading */}
      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-2 border border-indigo-100">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>בקרת הורים ומורים</span>
      </div>

      <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
        כניסה לאזור ההורה
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-xs">
        הזן קוד PIN בן 4 ספרות כדי לחסום גישה לא מורשית להגדרות, איפוס נתונים ודוחות אבחון.
      </p>

      {/* PIN Digit Slots Display */}
      <div
        className={`flex items-center justify-center gap-3.5 mb-4 py-3 px-6 rounded-2xl bg-slate-50 border transition-all ${
          shake
            ? 'border-rose-400 bg-rose-50/50 animate-shake'
            : isSuccess
            ? 'border-emerald-400 bg-emerald-50/50'
            : 'border-slate-200'
        }`}
      >
        {[0, 1, 2, 3].map((index) => {
          const digit = pin[index];
          const isFilled = digit !== undefined;
          const isCurrent = pin.length === index;

          return (
            <div
              key={index}
              className={`w-12 h-14 rounded-2xl flex items-center justify-center text-xl font-mono font-black transition-all ${
                isSuccess
                  ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                  : isFilled
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                  : isCurrent
                  ? 'bg-white border-2 border-indigo-500 ring-4 ring-indigo-100 shadow-xs'
                  : 'bg-white border-2 border-slate-200 text-slate-300'
              }`}
            >
              {isFilled ? (showPin ? digit : '●') : ''}
            </div>
          );
        })}
      </div>

      {/* Show/Hide PIN Toggle */}
      <div className="flex items-center justify-between w-full max-w-[280px] mb-4 px-1">
        <button
          type="button"
          onClick={() => setShowPin(!showPin)}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
        >
          {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showPin ? 'הסתר ספרות' : 'הצג ספרות'}</span>
        </button>

        <span className="text-[11px] text-slate-400">ניתן להקליד במקלדת</span>
      </div>

      {/* Error / Feedback Message */}
      {errorMsg && (
        <div
          className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl mb-4 w-full max-w-[280px] justify-center ${
            errorMsg.includes('בהצלחה')
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Numeric Keypad (1 to 9, Clear, 0, Backspace) */}
      <div className="grid grid-cols-3 gap-2.5 w-full max-w-[280px] mb-6" dir="ltr">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button
            key={digit}
            type="button"
            onClick={() => handleDigit(digit)}
            disabled={isSuccess}
            className="h-13 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 active:bg-indigo-100 text-slate-800 font-bold text-xl rounded-2xl transition-all active:scale-95 border border-slate-200/80 shadow-2xs flex items-center justify-center font-mono cursor-pointer"
          >
            {digit}
          </button>
        ))}

        {/* Clear Button */}
        <button
          type="button"
          onClick={handleClear}
          disabled={isSuccess || pin.length === 0}
          className="h-13 bg-slate-50 hover:bg-slate-200 active:bg-slate-300 text-slate-600 font-bold text-xs rounded-2xl transition-all active:scale-95 border border-slate-200 flex items-center justify-center cursor-pointer disabled:opacity-40"
        >
          ניקוי
        </button>

        {/* 0 Button */}
        <button
          type="button"
          onClick={() => handleDigit('0')}
          disabled={isSuccess}
          className="h-13 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 active:bg-indigo-100 text-slate-800 font-bold text-xl rounded-2xl transition-all active:scale-95 border border-slate-200/80 shadow-2xs flex items-center justify-center font-mono cursor-pointer"
        >
          0
        </button>

        {/* Backspace Button */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={isSuccess || pin.length === 0}
          className="h-13 bg-slate-50 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold rounded-2xl transition-all active:scale-95 border border-slate-200 flex items-center justify-center cursor-pointer disabled:opacity-40"
          aria-label="מחק ספרה אחרונה"
        >
          <Delete className="w-5 h-5" />
        </button>
      </div>

      {/* Default Pin Hint */}
      <div className="bg-indigo-50/80 border border-indigo-100 p-3 rounded-2xl w-full text-xs text-indigo-950 mb-4 flex items-center justify-between gap-2 text-right">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            קוד ברירת מחדל: <strong className="font-mono text-indigo-700 font-black">1234</strong>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setResetConfirmOpen(true)}
          className="text-[11px] text-indigo-600 hover:text-indigo-900 underline font-semibold shrink-0 cursor-pointer"
        >
          שכחת קוד?
        </button>
      </div>

      {/* Reset PIN Confirmation Modal / Inline Prompt */}
      {resetConfirmOpen && (
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl w-full text-xs text-amber-950 mb-4 flex flex-col gap-2.5 text-right">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>איפוס קוד PIN לברירת מחדל</span>
          </div>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            הקוד יוחזר לקוד הראשוני (1234). האם להמשיך?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setResetConfirmOpen(false)}
              className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
            >
              ביטול
            </button>
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-2xs"
            >
              כן, אפס ל-1234
            </button>
          </div>
        </div>
      )}

      {/* Back to Student Button */}
      <button
        type="button"
        onClick={onCancel}
        className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <span>חזרה למסך התלמיד</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
