import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <section className="min-h-screen bg-rose-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-1.5 text-sm mb-4">
            📞 যোগাযোগ
          </div>
          <h2
            className="text-4xl font-bold text-gray-800 mb-3"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            আমাদের সাথে কথা বলুন
          </h2>
          <p
            className="text-gray-600 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            যেকোনো প্রশ্ন বা কাস্টম অর্ডারের জন্য আমাদের সাথে যোগাযোগ করুন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            {[
              {
                emoji: '📞',
                title: 'ফোন',
                lines: ['01700-000000', '01800-000000'],
                sub: 'সকাল ৮টা - রাত ১০টা',
              },
              {
                emoji: '📧',
                title: 'ইমেইল',
                lines: ['info@mistisopno.com'],
                sub: 'সাধারণত ২ ঘণ্টার মধ্যে উত্তর দেওয়া হয়',
              },
              {
                emoji: '📍',
                title: 'ঠিকানা',
                lines: ['বাড়ি ১২, রোড ৫, ব্লক এ', 'মিরপুর, ঢাকা-১২১৬'],
                sub: 'শোরুম খোলা: প্রতিদিন সকাল ৯টা - রাত ৯টা',
              },
              {
                emoji: '💬',
                title: 'সোশ্যাল মিডিয়া',
                lines: ['Facebook: /MistiSopno', 'Instagram: @misti_sopno'],
                sub: 'আমাদের ফলো করুন সেরা আপডেটের জন্য',
              },
            ].map((info) => (
              <div
                key={info.title}
                className="bg-white rounded-2xl p-6 shadow-md flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <div className="text-4xl">{info.emoji}</div>
                <div>
                  <h3
                    className="font-bold text-gray-800 text-lg mb-1"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {info.title}
                  </h3>
                  {info.lines.map((line) => (
                    <p
                      key={line}
                      className="text-rose-600 font-semibold"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      {line}
                    </p>
                  ))}
                  <p
                    className="text-gray-400 text-sm mt-1"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {info.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h3
              className="text-xl font-bold text-gray-800 mb-6"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ✉️ মেসেজ পাঠান
            </h3>

            {sent && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <p style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                  আপনার মেসেজ পাঠানো হয়েছে! শীঘ্রই যোগাযোগ করা হবে।
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  আপনার নাম
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="পূর্ণ নাম"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  ফোন নম্বর
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  আপনার বার্তা
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="কাস্টম অর্ডার, প্রশ্ন বা যেকোনো বিষয়ে লিখুন..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors resize-none"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] shadow-lg"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                📨 মেসেজ পাঠান
              </button>
            </form>

            {/* WhatsApp */}
            <div className="mt-6 bg-green-50 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-3xl">💬</span>
              <div>
                <p
                  className="font-bold text-green-800"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  হোয়াটসঅ্যাপে অর্ডার দিন
                </p>
                <p
                  className="text-green-600 text-sm"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  01700-000000 নম্বরে মেসেজ দিন
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold text-gray-800"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              সাধারণ জিজ্ঞাসা
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'কাস্টম কেক কতদিন আগে অর্ডার দিতে হবে?', a: 'কাস্টম কেকের জন্য কমপক্ষে ৪৮ ঘণ্টা আগে অর্ডার দিতে হবে।' },
              { q: 'ডেলিভারি কোথায় কোথায় দেওয়া হয়?', a: 'ঢাকার সব এলাকায় এবং চট্টগ্রাম, সিলেটে ডেলিভারি পাওয়া যাচ্ছে।' },
              { q: 'পেমেন্ট কীভাবে করতে হবে?', a: 'ক্যাশ অন ডেলিভারি, বিকাশ এবং নগদের মাধ্যমে পেমেন্ট করা যাবে।' },
              { q: 'কেক কি পরিবহনে নষ্ট হয়?', a: 'আমরা বিশেষ প্যাকেজিং ব্যবহার করি, তাই কেক নিরাপদে পৌঁছে দেওয়া হয়।' },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-5 shadow-md">
                <p
                  className="font-bold text-gray-800 mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  ❓ {faq.q}
                </p>
                <p
                  className="text-gray-600 text-sm leading-relaxed"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  ✅ {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
