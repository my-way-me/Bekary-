import { useState, useRef } from "react";
import { toBn, waLink } from "@/lib/utils";

export default function Hero({ onAdminTrigger }: { onAdminTrigger: () => void }) {
  const [tapCount, setTapCount] = useState(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBadgeTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (newCount >= 7) {
      onAdminTrigger();
      setTapCount(0);
      return;
    }
    tapTimer.current = setTimeout(() => setTapCount(0), 3000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 bg-gradient-animated animate-gradient-shift"
    >
      <div className="absolute top-20 left-10 w-72 h-72 bg-rose-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-8 sm:left-16 text-3xl sm:text-4xl animate-float opacity-70 select-none pointer-events-none">
        🎂
      </div>
      <div className="absolute top-1/3 right-10 sm:right-20 text-3xl sm:text-4xl animate-float-delay opacity-70 select-none pointer-events-none">
        🧁
      </div>
      <div className="absolute bottom-1/4 left-12 sm:left-24 text-2xl animate-float-delay opacity-60 select-none pointer-events-none">
        ✨
      </div>
      <div className="absolute bottom-1/3 right-16 sm:right-32 text-3xl animate-float opacity-70 select-none pointer-events-none">
        🍰
      </div>
      <div className="absolute top-2/3 right-8 text-2xl animate-float-delay opacity-60 select-none pointer-events-none">
        ⭐
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <button
              onClick={handleBadgeTap}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-rose-100 shadow-sm mb-6 cursor-default select-none active:scale-95 transition-transform"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-rose-600">
                হোমমেড কেক, ডেলিভারি সার্ভিস
              </span>
              {tapCount >= 3 && (
                <span className="ml-1 text-[9px] text-rose-300">
                  {toBn(tapCount)}/৭
                </span>
              )}
            </button>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              বেক{" "}
              <span className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                আর্ট
              </span>{" "}
              স্টাইল
            </h1>
            <p className="text-2xl sm:text-3xl font-script text-purple-700 mt-2 font-bold tracking-wide">
              Bake Art Style
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-3 my-5 text-rose-300">
              <span className="h-px w-12 bg-rose-200" />
              <span className="text-lg">❦</span>
              <span className="h-px w-12 bg-rose-200" />
            </div>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              &quot;হোমমেড কেক, ডেলিভারি সার্ভিস, অর্ডার করতে ইনবক্স করুন&quot; — কুমিল্লার
              হাট বলি বাড়িতে অবস্থিত আমাদের বেকারিতে পাবেন ১০০% তাজা ও খাঁটি হোমমেড
              কেক!
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 btn-shine"
              >
                মেন্যু দেখুন
              </a>
              <a
                href={waLink("আমি কেক অর্ডার করতে চাই। দয়া করে মেন্যু পাঠান।")}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium shadow-lg transition-all flex items-center gap-2"
              >
                💬 WhatsApp এ অর্ডার
              </a>
            </div>
            <div className="grid grid-cols-4 gap-3 sm:gap-6 mt-12 pt-8 border-t border-rose-100/80">
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900">১৩৫+</h4>
                <p className="text-xs sm:text-sm text-gray-500">ফলোয়ার্স</p>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900">৭৭+</h4>
                <p className="text-xs sm:text-sm text-gray-500">পোস্ট</p>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-rose-600">১০০%</h4>
                <p className="text-xs sm:text-sm text-gray-500">হোমমেড</p>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900">২৪/৭</h4>
                <p className="text-xs sm:text-sm text-gray-500">অর্ডার গ্রহণ</p>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative w-72 sm:w-96 lg:w-full max-w-md aspect-square rounded-full p-3 bg-gradient-to-tr from-rose-400 via-pink-500 to-purple-500 shadow-2xl animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 sm:w-80 lg:w-11/12 aspect-square rounded-full overflow-hidden border-4 border-white shadow-inner relative group">
                <img
                  src="https://images.pexels.com/photos/12927172/pexels-photo-12927172.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Cake"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-rose-50 flex items-center gap-2 animate-bounce-soft">
                  <span className="text-lg">🍰</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">তাজা ও খাঁটি</p>
                    <p className="text-[10px] text-rose-600 font-medium">
                      প্রতিদিনের বেকিং
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
