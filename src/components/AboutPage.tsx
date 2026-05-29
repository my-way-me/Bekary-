export default function AboutPage() {
  const team = [
    { name: 'ফারহানা বেগম', role: 'প্রধান বেকার ও প্রতিষ্ঠাতা', emoji: '👩‍🍳', exp: '১৫ বছরের অভিজ্ঞতা' },
    { name: 'রাহুল দাস', role: 'পেস্ট্রি শেফ', emoji: '👨‍🍳', exp: '১০ বছরের অভিজ্ঞতা' },
    { name: 'সুমাইয়া খানম', role: 'কেক ডিজাইনার', emoji: '🎨', exp: '৮ বছরের অভিজ্ঞতা' },
  ];

  const milestones = [
    { year: '২০২১', event: 'মিষ্টি স্বপ্নের যাত্রা শুরু' },
    { year: '২০২২', event: '৫০০+ খুশি গ্রাহক অর্জন' },
    { year: '২০২৩', event: 'ঢাকার সেরা বেকারি পুরস্কার' },
    { year: '২০২৪', event: 'অনলাইন ডেলিভারি চালু' },
  ];

  return (
    <section className="min-h-screen bg-rose-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero About */}
        <div className="relative rounded-3xl overflow-hidden mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/3341067/pexels-photo-3341067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/85 to-rose-700/60" />
          <div className="relative z-10 p-12 md:p-16 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-1.5 text-sm mb-4">
              🏠 আমাদের গল্প
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ভালোবাসা দিয়ে তৈরি প্রতিটি মিষ্টি
            </h2>
            <p
              className="text-white/90 text-lg leading-relaxed"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ২০২১ সালে একটি ছোট রান্নাঘর থেকে শুরু হওয়া আমাদের এই যাত্রা আজ হাজারো গ্রাহকের হৃদয় জয় করেছে।
              আমরা বিশ্বাস করি, প্রতিটি কেক শুধু একটি মিষ্টি নয়, এটি একটি অনুভূতি।
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { emoji: '🌿', title: 'তাজা উপকরণ', text: 'প্রতিদিন বাজার থেকে আনা তাজা উপকরণ ব্যবহার করা হয়' },
            { emoji: '❤️', title: 'ভালোবাসায় তৈরি', text: 'প্রতিটি পণ্যে আমরা ঢেলে দিই আমাদের আন্তরিকতা' },
            { emoji: '🎯', title: 'মানের নিশ্চয়তা', text: 'শতভাগ মানসম্পন্ন উপকরণ ও স্বাস্থ্যবিধি মেনে তৈরি' },
            { emoji: '🚀', title: 'দ্রুত ডেলিভারি', text: 'অর্ডারের ২-৪ ঘণ্টার মধ্যে আপনার দরজায় পৌঁছে দেওয়া' },
          ].map((value) => (
            <div
              key={value.title}
              className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center"
            >
              <div className="text-5xl mb-4">{value.emoji}</div>
              <h3
                className="text-lg font-bold text-gray-800 mb-2"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                {value.title}
              </h3>
              <p
                className="text-gray-600 text-sm leading-relaxed"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                {value.text}
              </p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-1.5 text-sm mb-4">
              👥 আমাদের দল
            </div>
            <h2
              className="text-3xl font-bold text-gray-800"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              দক্ষ হাতের ছোঁয়ায়
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-3xl p-8 shadow-md text-center hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3
                  className="text-xl font-bold text-gray-800 mb-1"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-rose-600 font-medium text-sm mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  {member.role}
                </p>
                <p
                  className="text-gray-400 text-xs"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  {member.exp}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-1.5 text-sm mb-4">
              📅 আমাদের যাত্রা
            </div>
            <h2
              className="text-3xl font-bold text-gray-800"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              মাইলস্টোন
            </h2>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-rose-200" />
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`flex items-center gap-6 mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="flex-1 text-right">
                  {i % 2 === 0 ? (
                    <div className="bg-white rounded-2xl p-4 shadow-md inline-block">
                      <p
                        className="font-bold text-rose-600 text-lg"
                        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                      >
                        {m.year}
                      </p>
                      <p
                        className="text-gray-700 text-sm"
                        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                      >
                        {m.event}
                      </p>
                    </div>
                  ) : <div />}
                </div>
                <div className="w-4 h-4 bg-rose-500 rounded-full border-4 border-rose-200 z-10 flex-shrink-0" />
                <div className="flex-1">
                  {i % 2 !== 0 ? (
                    <div className="bg-white rounded-2xl p-4 shadow-md inline-block">
                      <p
                        className="font-bold text-rose-600 text-lg"
                        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                      >
                        {m.year}
                      </p>
                      <p
                        className="text-gray-700 text-sm"
                        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                      >
                        {m.event}
                      </p>
                    </div>
                  ) : <div />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-rose-600 to-rose-800 rounded-3xl p-10 text-white text-center">
          <h3
            className="text-2xl font-bold mb-8"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            আমাদের সাফল্য
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '৫০০+', label: 'সন্তুষ্ট গ্রাহক' },
              { value: '৩০+', label: 'আইটেম' },
              { value: '৫ ★', label: 'গড় রেটিং' },
              { value: '১০০০+', label: 'অর্ডার সম্পন্ন' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-rose-200 text-sm"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
