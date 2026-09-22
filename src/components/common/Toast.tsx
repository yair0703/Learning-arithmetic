import React, { useEffect } from 'react';
import { CloudCheck, Wifi, WifiOff, X, CheckCircle2, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
  duration?: number;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 left-5 right-5 sm:right-auto sm:max-w-md z-50 flex flex-col gap-2.5 pointer-events-none"
      dir="rtl"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 4500);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CloudCheck className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'warning':
        return <WifiOff className="w-5 h-5 text-amber-600 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />;
      default:
        return <Wifi className="w-5 h-5 text-indigo-600 shrink-0" />;
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-white border-emerald-200 text-slate-900 shadow-emerald-500/10';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-950 shadow-amber-500/10';
      case 'error':
        return 'bg-rose-50 border-rose-200 text-rose-950 shadow-rose-500/10';
      default:
        return 'bg-white border-indigo-200 text-slate-900 shadow-indigo-500/10';
    }
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 ${getStyles()}`}
    >
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1 text-right">
        <h4 className="text-xs sm:text-sm font-black leading-tight">{toast.title}</h4>
        {toast.description && (
          <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
        aria-label="סגור הודעה"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
