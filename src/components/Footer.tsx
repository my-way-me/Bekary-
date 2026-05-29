interface FooterProps {
  onPageChange: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl">🎂</span>
              <div>
                <div
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  মিষ্টি স্বপ্ন
                </div>
                <div className="text-rose-400 text-sm">Cake & Bakery</div>
              </div>
            </div>
            <p
              className="text-gray-400 text-sm leading-relaxed mb-5"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ভালোবাসা দিয়ে তৈরি প্রতিটি মিষ্টি। আপনার প্রতিটি বিশেষ মুহূর্তকে অবিস্মরণীয় করে তুলি আমরা।
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {['📘', '📷', '🐦', '▶️'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-gray-800 hover:bg-rose-700 rounded-full flex items-center justify-center text-base transition-all hover:scale-110"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-white font-bold text-lg mb-5"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              দ্রুত লিংক
            </h3>
            <div className="space-y-3">
              {[
                { label: 'হোম', page: 'home' },
                { label: 'মেনু', page: 'menu' },
                { label: 'অর্ডার করুন', page: 'order' },
                { label: 'আমাদের সম্পর্কে', page: 'about' },
                { label: 'যোগাযোগ', page: 'contact' },
              ].map((link) => (
                <button
                  key={link.page}
                  onClick={() => onPageChange(link.page)}
                  className="block text-gray-400 hover:text-rose-400 text-sm transition-colors"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  → {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Items */}
          <div>
            <h3
              className="text-white font-bold text-lg mb-5"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              জনপ্রিয় আইটেম
            </h3>
            <div className="space-y-3">
              {[
                'চকোলেট ড্রিম কেক',
                'রেড ভেলভেট কেক',
                'ফ্রুট ক্রিম পেস্ট্রি',
                'চকো চিপ কুকি',
                'বিবাহ কেক (কাস্টম)',
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => onPageChange('menu')}
                  className="block text-gray-400 hover:text-rose-400 text-sm transition-colors"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  🍰 {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-white font-bold text-lg mb-5"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              যোগাযোগ
            </h3>
            <div className="space-y-4">
              {[
                { emoji: '📍', text: 'মিরপুর, ঢাকা-১২১৬' },
                { emoji: '📞', text: '01700-000000' },
                { emoji: '📧', text: 'info@mistisopno.com' },
                { emoji: '🕐', text: 'সকাল ৯টা - রাত ১০টা' },
              ].map((info) => (
                <div key={info.text} className="flex items-center gap-3">
                  <span>{info.emoji}</span>
                  <span
                    className="text-gray-400 text-sm"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {info.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p
            className="text-gray-500 text-sm"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            © ২০২৪ মিষ্টি স্বপ্ন। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div
            className="flex items-center gap-2 text-gray-500 text-sm"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            <span>❤️ দিয়ে তৈরি</span>
            <span>|</span>
            <span>ঢাকা, বাংলাদেশ 🇧🇩</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
