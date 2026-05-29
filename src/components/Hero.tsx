interface HeroProps {
  onPageChange: (page: string) => void;
}

export default function Hero({ onPageChange }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/34073612/pexels-photo-34073612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/80 via-rose-800/70 to-amber-900/60" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-5xl animate-float opacity-60">🌸</div>
      <div className="absolute top-40 right-16 text-4xl animate-float-delay opacity-60">✨</div>
      <div className="absolute bottom-40 left-20 text-4xl animate-float opacity-50">🎂</div>
      <div className="absolute bottom-20 right-10 text-5xl animate-float-delay opacity-50">🌺</div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full px-5 py-2 text-sm mb-6 border border-white/30">
          <span>✨</span>
          <span style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
            ঢাকার সেরা বেকারি
          </span>
          <span>✨</span>
        </div>

        {/* Main Title */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
        >
          মিষ্টি স্বপ্ন
        </h1>
        <p
          className="text-2xl sm:text-3xl text-rose-200 font-light mb-4 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Cake & Bakery
        </p>
        <p
          className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
        >
          প্রতিটি উপলক্ষকে আরও মিষ্টি করে তুলুন আমাদের হাতে তৈরি কেক ও বেকারি পণ্য দিয়ে।
          ভালোবাসা মিশিয়ে তৈরি, প্রতিদিন তাজা বেক করা।
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { value: '৫০০+', label: 'খুশি গ্রাহক' },
            { value: '৩০+', label: 'আইটেম' },
            { value: '৫★', label: 'রেটিং' },
            { value: '৩ বছর', label: 'অভিজ্ঞতা' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/30">
              <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-rose-200" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onPageChange('menu')}
            className="bg-rose-500 hover:bg-rose-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-2xl hover:shadow-rose-500/40"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            🍰 মেনু দেখুন
          </button>
          <button
            onClick={() => onPageChange('order')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            📦 অর্ডার করুন
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-xs" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>স্ক্রল করুন</span>
        <div className="w-0.5 h-8 bg-white/40 rounded-full" />
      </div>
    </section>
  );
}
