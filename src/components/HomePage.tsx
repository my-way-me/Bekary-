import { Product, products, testimonials } from '../data/products';
import ProductCard from './ProductCard';
import { useState } from 'react';
import ProductModal from './ProductModal';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  onPageChange: (page: string) => void;
}

export default function HomePage({ onAddToCart, onPageChange }: HomePageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const featured = products.filter((p) => p.badge).slice(0, 4);

  return (
    <div>
      {/* Features Strip */}
      <section className="bg-rose-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-12">
          {[
            { emoji: '🚚', text: 'বিনামূল্যে ডেলিভারি ১৫০০+ টাকার অর্ডারে' },
            { emoji: '🕐', text: '২-৪ ঘণ্টার মধ্যে ডেলিভারি' },
            { emoji: '🌿', text: '১০০% তাজা উপকরণ' },
            { emoji: '📞', text: '২৪/৭ কাস্টমার সাপোর্ট' },
          ].map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-2 text-sm whitespace-nowrap"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              <span>{f.emoji}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-1.5 text-sm mb-4">
              ⭐ সেরা পণ্য
            </div>
            <h2
              className="text-4xl font-bold text-gray-800 mb-3"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              সবচেয়ে জনপ্রিয় আইটেম
            </h2>
            <p
              className="text-gray-500 text-lg"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              আমাদের গ্রাহকদের পছন্দের শীর্ষে
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => onPageChange('menu')}
              className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-full text-base font-semibold transition-all hover:scale-105 shadow-lg"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              সব পণ্য দেখুন →
            </button>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-rose-600 to-rose-800 rounded-3xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-10 md:p-14 flex-1">
                <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-1.5 text-sm mb-4">
                  🎉 বিশেষ অফার
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  প্রথম অর্ডারে ১০% ছাড়!
                </h2>
                <p
                  className="text-rose-200 text-lg mb-8"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  কোড ব্যবহার করুন: <span className="font-bold text-white bg-white/20 px-3 py-1 rounded-lg">MISTI10</span>
                </p>
                <button
                  onClick={() => onPageChange('menu')}
                  className="bg-white text-rose-700 hover:bg-rose-50 px-8 py-3 rounded-full text-base font-bold transition-all hover:scale-105 shadow-lg"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  এখনই অর্ডার করুন 🎂
                </button>
              </div>
              <div className="p-10 text-center">
                <div className="text-[120px] leading-none">🎂</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-1.5 text-sm mb-4">
              🍰 ক্যাটাগরি
            </div>
            <h2
              className="text-4xl font-bold text-gray-800"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              যা খুঁজছেন
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '🎂', label: 'কেক', desc: '১০+ আইটেম', cat: 'cake', bg: 'from-rose-400 to-rose-600' },
              { emoji: '🥐', label: 'পেস্ট্রি', desc: '৮+ আইটেম', cat: 'pastry', bg: 'from-amber-400 to-orange-500' },
              { emoji: '🍪', label: 'কুকি', desc: '৫+ আইটেম', cat: 'cookie', bg: 'from-yellow-400 to-amber-500' },
              { emoji: '✨', label: 'বিশেষ আইটেম', desc: '৫+ আইটেম', cat: 'special', bg: 'from-purple-400 to-rose-500' },
            ].map((cat) => (
              <button
                key={cat.cat}
                onClick={() => onPageChange('menu')}
                className={`bg-gradient-to-br ${cat.bg} rounded-3xl p-8 text-white text-center hover:scale-105 transition-all shadow-lg hover:shadow-xl`}
              >
                <div className="text-5xl mb-3">{cat.emoji}</div>
                <div
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  {cat.label}
                </div>
                <div
                  className="text-white/80 text-sm"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  {cat.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-1.5 text-sm mb-4">
              🔄 প্রক্রিয়া
            </div>
            <h2
              className="text-4xl font-bold text-gray-800"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              কীভাবে অর্ডার করবেন
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '১', emoji: '🍰', title: 'পছন্দ করুন', text: 'মেনু থেকে আপনার পছন্দের আইটেম নির্বাচন করুন' },
              { step: '২', emoji: '🛒', title: 'কার্টে যোগ করুন', text: 'পণ্য কার্টে যোগ করুন এবং পরিমাণ ঠিক করুন' },
              { step: '৩', emoji: '📝', title: 'তথ্য দিন', text: 'নাম, ফোন ও ডেলিভারি ঠিকানা দিন' },
              { step: '৪', emoji: '🚚', title: 'ডেলিভারি', text: 'সময়মতো আপনার দরজায় পৌঁছে যাবে' },
            ].map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] right-0 h-0.5 bg-rose-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-md mx-auto mb-4 border-2 border-rose-200">
                    {step.emoji}
                  </div>
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 translate-x-6 bg-rose-500 text-white w-7 h-7 rounded-full text-sm font-bold flex items-center justify-center"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {step.step}
                  </div>
                  <h3
                    className="text-lg font-bold text-gray-800 mb-2"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-1.5 text-sm mb-4">
              💬 রিভিউ
            </div>
            <h2
              className="text-4xl font-bold text-gray-800"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              গ্রাহকরা কী বলছেন
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-rose-50 rounded-3xl p-7 hover:shadow-lg transition-all border border-rose-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{t.avatar}</div>
                  <div>
                    <p
                      className="font-bold text-gray-800"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-gray-400 text-sm"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      📍 {t.location}
                    </p>
                  </div>
                  <div className="ml-auto text-amber-400 text-lg">
                    {'★'.repeat(t.rating)}
                  </div>
                </div>
                <p
                  className="text-gray-600 leading-relaxed italic"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-6xl mb-6">🎂</div>
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            আজই অর্ডার করুন!
          </h2>
          <p
            className="text-rose-200 text-lg mb-8"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            আপনার পরবর্তী বিশেষ মুহূর্তকে আরও মিষ্টি করে তুলুন
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('menu')}
              className="bg-white text-rose-700 hover:bg-rose-50 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              🍰 মেনু দেখুন
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              📞 যোগাযোগ করুন
            </button>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
