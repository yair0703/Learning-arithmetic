import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Share2, QrCode } from 'lucide-react';
import { LinkedStudentProfile } from '../../types';
import { getMagicLinkUrl } from '../../utils/firebase';

interface StudentQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: LinkedStudentProfile | null;
}

export const StudentQrModal: React.FC<StudentQrModalProps> = ({ isOpen, onClose, student }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !student) return null;

  const magicUrl = getMagicLinkUrl(student);

  useEffect(() => {
    if (canvasRef.current && magicUrl) {
      QRCode.toCanvas(canvasRef.current, magicUrl, {
        width: 220,
        margin: 2,
        color: {
          dark: '#312E81',
          light: '#FFFFFF'
        }
      }).catch((err) => console.error('Error rendering QR code:', err));
    }
  }, [magicUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(magicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsapp = () => {
    const text = `שלום ${student.studentName}! 🎉 הנה קישור הכניסה האישי שלך לאפליקציית השברים והחשבון:\n${magicUrl}\nלחץ/י על הקישור והתחל/י לתרגל בכיף! 🚀`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-indigo-100 flex flex-col items-center text-center gap-4 animate-in zoom-in-95">
        <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-slate-900 text-sm">קישור כניסה ו-QR לסריקה</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl w-full">
          <span className="text-xs text-indigo-700 font-bold">תלמיד/ה: </span>
          <span className="text-sm font-black text-indigo-950">{student.studentName}</span>
        </div>

        {/* Canvas QR Code */}
        <div className="bg-white p-3.5 rounded-2xl border-2 border-indigo-200 shadow-inner flex items-center justify-center">
          <canvas ref={canvasRef} className="rounded-xl" />
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          סרקו את קוד ה-QR במצלמת הטלפון של הילד/ה להתחברות מיידית <strong>ללא צורך בהקלדת קודים או סיסמאות!</strong>
        </p>

        {/* Share & Copy Buttons */}
        <div className="flex flex-col gap-2 w-full pt-1">
          <button
            onClick={handleShareWhatsapp}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>שלח קישור כניסה ב-WhatsApp 💬</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>הקישור הועתק בהצלחה!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>העתק קישור כניסה אישי 🔗</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
