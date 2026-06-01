import { useState } from "react";
import { waLink } from "@/lib/utils";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 mb-3 animate-scale-in overflow-hidden">
          <div className="bg-green-500 px-4 py-3 text-white flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm">বেক আর্ট স্টাইল</h4>
              <p className="text-[10px] text-green-100">সাধারণত কয়েক মিনিটে উত্তর দিই</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="p-4">
            <div className="bg-green-50 p-3 rounded-xl rounded-tl-none text-xs text-gray-700 mb-4 relative">
              আসসালামু আলাইকুম! 👋 বেক আর্ট স্টাইলে আপনাকে স্বাগতম। কেক অর্ডার করতে বা
              যেকোনো তথ্যের জন্য মেসেজ করুন!
              <span className="text-[9px] text-gray-400 block mt-1">বেক আর্ট স্টাইল</span>
            </div>
            <a
              href={waLink("আসসালামু আলাইকুম! আমি কেক সম্পর্কে জানতে চাই।")}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xs transition-colors"
            >
              💬 চ্যাট শুরু করুন
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all hover:scale-110"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
