export default function Footer() {
  const links = [
    { name: "হোম", href: "#hero" },
    { name: "মেন্যু", href: "#menu" },
    { name: "কাস্টম কেক", href: "#custom-cake" },
    { name: "আমাদের কথা", href: "#about" },
    { name: "রিভিউ", href: "#reviews" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-rose-950 text-white pt-14 pb-8 border-t-4 border-rose-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎂</span>
              <h2 className="text-xl font-bold">বেক আর্ট স্টাইল</h2>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-5">
              কুমিল্লার হাট বলি বাড়ির হোমমেড বেকারি। ১০০% তাজা ও খাঁটি কেক, ডেলিভারি
              সার্ভিস।
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.tiktok.com/@bakeartstyel"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose-500 flex items-center justify-center text-xs font-bold transition-colors"
              >
                TT
              </a>
              <a
                href="https://wa.me/8801764411168"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center text-xs font-bold transition-colors"
              >
                WA
              </a>
              <a
                href="tel:+8801764411168"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose-500 flex items-center justify-center text-xs font-bold transition-colors"
              >
                📞
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-4">
              প্রয়োজনীয় লিংক
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-gray-300">
              {links.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="hover:text-rose-400 transition-colors">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-4">
              যোগাযোগ তথ্য
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-gray-300">
              <li>📍 হাট বলি বাড়ি, কুমিল্লা</li>
              <li>📞 +880 1764-411168</li>
              <li>💬 WhatsApp: +880 1764-411168</li>
              <li>⏰ Always Open — ২৪/৭</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© ২০২৬ বেক আর্ট স্টাইল (Bake Art Style)। সর্বস্বত্ব সংরক্ষিত।</p>
          <a href="tel:+8801764411168" className="hover:text-white transition-colors">
            হাট বলি বাড়ি, কুমিল্লা — +880 1764-411168
          </a>
        </div>
      </div>
    </footer>
  );
}
