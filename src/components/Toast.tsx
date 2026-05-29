import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] ${colors[type]} text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up`}
    >
      <span className="text-xl">{icons[type]}</span>
      <p className="font-semibold text-sm" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
        {message}
      </p>
    </div>
  );
}
