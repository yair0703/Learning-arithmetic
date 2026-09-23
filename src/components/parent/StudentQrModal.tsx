import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Share2, QrCode, Download, Printer } from 'lucide-react';
import { LinkedStudentProfile } from '../../types';
import { getMagicLinkUrl } from '../../utils/firebase';

interface StudentQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: LinkedStudentProfile | null;
  allStudents?: LinkedStudentProfile[];
  onSelectStudent?: (student: LinkedStudentProfile) => void;
}

export const StudentQrModal: React.FC<StudentQrModalProps> = ({
  isOpen,
  onClose,
  student,
  allStudents = [],
  onSelectStudent
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !student) return null;

  const magicUrl = getMagicLinkUrl(student);

  useEffect(() => {
    if (canvasRef.current && magicUrl && student) {
      try {
        QRCode.toCanvas(canvasRef.current, magicUrl, {
          width: 240,
          margin: 2,
          color: {
            dark: '#1E1B4B',
            light: '#FFFFFF'
          }
        }).catch((err) => console.error('Error rendering QR code:', err));
      } catch (err) {
        console.error('QR rendering exception:', err);
      }
    }
  }, [magicUrl, student?.studentId]);

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

  const handleDownloadQrImage = () => {
    if (!canvasRef.current) return;
    try {
      const imageUri = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `QR_Login_${student.studentName.replace(/\s+/g, '_')}.png`;
      link.href = imageUri;
      link.click();
    } catch (err) {
      console.error('Error downloading QR code:', err);
    }
  };

  const handlePrintCard = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !canvasRef.current) return;
    const qrDataUrl = canvasRef.current.toDataURL('image/png');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
        <head>
          <title>כרטיס כניסה - ${student.studentName}</title>
          <style>
            body { font-family: system-ui, sans-serif; text-align: center; padding: 40px; }
            .card { border: 3px solid #4F46E5; border-radius: 24px; padding: 30px; max-width: 320px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            h1 { color: #1E1B4B; margin-bottom: 5px; font-size: 24px; }
            p { color: #4B5563; font-size: 14px; margin-top: 0; }
            img { width: 220px; height: 220px; margin: 15px 0; border-radius: 12px; }
            .badge { background: #EEF2FF; color: #3730A3; font-weight: bold; padding: 6px 14px; border-radius: 20px; display: inline-block; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="card">
            <span class="badge">כרטיס תלמיד אישי 🎓</span>
            <h1>${student.studentName}</h1>
            <p>סרקו את קוד ה-QR במצלמת הטלפון להתחברות מיידית!</p>
            <img src="${qrDataUrl}" alt="QR Code" />
            <p style="font-size: 11px; color: #9CA3AF;">מסלולים פלוס - למידת שברים וחשבון לכיתה ה׳</p>
          </div>
          <script>
            setTimeout(() => { window.print(); window.close(); }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-indigo-100 flex flex-col items-center text-center gap-4 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 text-sm">מחולל קוד QR להתחברות</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-student selector tabs if available */}
        {allStudents.length > 1 && onSelectStudent && (
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
            {allStudents.map((st) => (
              <button
                key={st.studentId}
                type="button"
                onClick={() => onSelectStudent(st)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  st.studentId === student.studentId
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.studentName}
              </button>
            ))}
          </div>
        )}

        {/* Student Badge */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-150 px-4 py-2.5 rounded-2xl w-full flex items-center justify-between">
          <div className="text-right">
            <span className="text-[11px] text-indigo-600 font-bold block">פרופיל תלמיד/ה</span>
            <span className="text-base font-black text-indigo-950">{student.studentName}</span>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
            Magic Link פעיל 🟢
          </span>
        </div>

        {/* Canvas QR Code Box */}
        <div className="bg-white p-4 rounded-3xl border-2 border-indigo-200 shadow-sm flex flex-col items-center gap-2">
          <canvas ref={canvasRef} className="rounded-xl" />
          <span className="text-[10px] text-indigo-800 font-mono bg-indigo-50 px-2 py-0.5 rounded-full max-w-[200px] truncate">
            {magicUrl}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          סרקו את קוד ה-QR במצלמת הנייד או הטאבלט של הילד/ה לחיבור <strong>מיידי ללא סיסמאות!</strong>
        </p>

        {/* Primary Share & Download Actions */}
        <div className="flex flex-col gap-2 w-full pt-1">
          <button
            onClick={handleShareWhatsapp}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>שלח קישור ב-WhatsApp 💬</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadQrImage}
              className="py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>הורד QR 🖼️</span>
            </button>

            <button
              onClick={handlePrintCard}
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>הדפס כרטיס 🖨️</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>הקישור הועתק!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>העתק קישור אישי 🔗</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
