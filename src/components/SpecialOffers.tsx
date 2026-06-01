import { useState, useEffect } from "react";
import { toBn } from "@/lib/utils";
import type { Settings } from "@/data/constants";

export default function SpecialOffers({ settings }: { settings: Settings }) {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 43, s: 12 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((p) => {
        if (p.s > 0) return { ...p, s: p.s - 1 };
        if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
        if (p.h > 0) return { h: p.h - 1, m: 59, s: 59 };
        return { h: 5, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  if (!settings.promoEnabled) return null;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="relative z-10 text-center lg:text-left">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              সীমিত সময়ের অফার
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-3 mb-2">{settings.promoTitle}</h2>
            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 backdrop-blur p-1.5 rounded-xl border border-white/20">
              <span className="font-mono font-bold text-lg px-4 tracking-widest text-amber-300">
                {settings.promoCode}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(settings.promoCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="bg-white text-rose-600 px-4 py-2 rounded-lg text-xs font-bold"
              >
                {copied ? "কপি হয়েছে!" : "কোড কপি করুন"}
              </button>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center bg-black/20 backdrop-blur p-5 rounded-2xl border border-white/10">
            <p className="text-xs font-bold text-rose-200 mb-3 uppercase tracking-wider">
              শেষ হতে বাকি
            </p>
            <div className="flex items-center gap-3">
              {[
                { v: timeLeft.h, l: "ঘণ্টা" },
                { v: timeLeft.m, l: "মিনিট" },
                { v: timeLeft.s, l: "সেকেন্ড" },
              ].map((x, i) => (
                <div key={x.l} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-xl font-bold -mt-5">:</span>
                  )}
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-white text-rose-600 flex items-center justify-center font-bold text-2xl shadow-inner">
                      {toBn(x.v)}
                    </div>
                    <span className="text-[11px] text-rose-100 mt-1 block">{x.l}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
