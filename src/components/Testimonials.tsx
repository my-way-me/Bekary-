export default function Testimonials() {
  const revs = [
    {
      name: "সাদিয়া আফরিন",
      role: "রেগুলার কাস্টমার",
      comment:
        "কেকের স্বাদ অসাধারণ! সবাই প্রশংসা করেছে। ডেলিভারিও সময়মতো পেয়েছি। ধন্যবাদ বেক আর্ট স্টাইল!",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      name: "তানভীর আহমেদ",
      role: "কর্পোরেট ক্লায়েন্ট",
      comment:
        "কাস্টমাইজড কেক যেমন চেয়েছিলাম ঠিক তেমন হয়েছে। স্পঞ্জ সফট, ফ্রস্টিং পারফেক্ট। হাইলি রেকমেন্ডেড!",
      rating: 5,
      avatar: "👨‍💼",
    },
    {
      name: "নুসরাত জাহান",
      role: "ভোজনরসিক",
      comment:
        "মিক্সড বেরি চিজকেক জীবনের সেরা! মুখে দিলেই মিলিয়ে যায়। প্যাকেজিংও প্রিমিয়াম। এখন উইকেন্ডেই অর্ডার দিই।",
      rating: 5,
      avatar: "🧕",
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-rose-500 font-script text-xl font-bold">Sweet Words</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
            গ্রাহকদের মিষ্টি অনুভূতি
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mt-3 rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {revs.map((r, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-3xl shadow-sm border border-rose-50 hover:shadow-lg transition-shadow relative"
            >
              <span className="absolute top-5 right-5 text-5xl text-rose-100 font-serif select-none pointer-events-none">
                &quot;
              </span>
              <div className="flex gap-1 text-amber-400 mb-3 text-sm">
                {Array(r.rating)
                  .fill(0)
                  .map((_, j) => (
                    <span key={j}>★</span>
                  ))}
              </div>
              <p className="text-gray-600 text-xs leading-relaxed italic relative z-10">
                &quot;{r.comment}&quot;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-3 border-t border-gray-50">
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-lg">
                  {r.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xs">{r.name}</h4>
                  <p className="text-[10px] text-rose-600">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
