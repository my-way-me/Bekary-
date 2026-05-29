import { useState } from 'react';
import { CartItem } from './CartSidebar';

interface OrderPageProps {
  cartItems: CartItem[];
  onSuccess: () => void;
}

export default function OrderPage({ cartItems, onSuccess }: OrderPageProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = 60;
  const total = subtotal + delivery;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'নাম লিখুন';
    if (!form.phone.trim() || !/^01[0-9]{9}$/.test(form.phone)) errs.phone = 'সঠিক ফোন নম্বর দিন (১১ ডিজিট)';
    if (!form.address.trim()) errs.address = 'ঠিকানা লিখুন';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onSuccess();
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-rose-50 pt-24 pb-16 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2
            className="text-3xl font-bold text-rose-700 mb-4"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            অর্ডার সফল হয়েছে!
          </h2>
          <p
            className="text-gray-600 text-lg mb-2"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            আপনার অর্ডার গ্রহণ করা হয়েছে।
          </p>
          <p
            className="text-gray-500"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব। ধন্যবাদ! 🙏
          </p>
          <div className="mt-6 bg-rose-100 rounded-2xl p-4 text-left">
            <p className="text-rose-700 font-semibold text-sm" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              📞 অর্ডার ট্র্যাক করতে কল করুন: 01700-000000
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-rose-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-1.5 text-sm mb-4">
            📦 অর্ডার করুন
          </div>
          <h2
            className="text-4xl font-bold text-gray-800"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            অর্ডার ফর্ম
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h3
              className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              👤 আপনার তথ্য দিন
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="পূর্ণ নাম লিখুন"
                  className={`w-full px-4 py-3 rounded-2xl border ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors`}
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                    ⚠️ {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  ফোন নম্বর *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className={`w-full px-4 py-3 rounded-2xl border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                    ⚠️ {errors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  ডেলিভারি ঠিকানা *
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="বাড়ি নং, রাস্তা, এলাকা, জেলা..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-2xl border ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors resize-none`}
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                    ⚠️ {errors.address}
                  </p>
                )}
              </div>

              {/* Note */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  বিশেষ নির্দেশনা (ঐচ্ছিক)
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => handleChange('note', e.target.value)}
                  placeholder="কেকের উপর লেখা, বিশেষ ডিজাইন ইত্যাদি..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors resize-none"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                />
              </div>

              {/* Payment */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-3"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  💳 পেমেন্ট পদ্ধতি
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'cod', label: 'ক্যাশ অন ডেলিভারি', emoji: '💵' },
                    { value: 'bkash', label: 'বিকাশ', emoji: '🟣' },
                    { value: 'nagad', label: 'নগদ', emoji: '🟠' },
                  ].map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => handleChange('paymentMethod', method.value)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all ${
                        form.paymentMethod === method.value
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-200 hover:border-rose-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{method.emoji}</div>
                      <div
                        className="text-xs font-medium text-gray-700"
                        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                      >
                        {method.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] shadow-lg mt-2"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                ✅ অর্ডার কনফার্ম করুন
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-md mb-6">
              <h3
                className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                🧾 অর্ডার সারসংক্ষেপ
              </h3>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">🛒</div>
                  <p
                    className="text-gray-400"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    কার্ট খালি। মেনু থেকে পণ্য যোগ করুন।
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.nameEn}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <p
                            className="text-sm font-semibold text-gray-800"
                            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                          >
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            ৳{item.product.price} × {item.quantity}
                          </p>
                        </div>
                        <p
                          className="text-rose-600 font-bold"
                          style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                        >
                          ৳{item.product.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div
                    className="border-t pt-4 space-y-2 text-sm"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    <div className="flex justify-between text-gray-600">
                      <span>সাবটোটাল</span>
                      <span>৳{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>ডেলিভারি চার্জ</span>
                      <span>৳{delivery}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-2">
                      <span>সর্বমোট</span>
                      <span className="text-rose-600">৳{total}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              {[
                { emoji: '🚚', title: 'ডেলিভারি সময়', text: 'অর্ডার কনফার্মের ২-৪ ঘণ্টার মধ্যে' },
                { emoji: '📞', title: 'কাস্টমার সাপোর্ট', text: '01700-000000 (সকাল ৮টা - রাত ১০টা)' },
                { emoji: '🔄', title: 'রিটার্ন পলিসি', text: 'পণ্যে সমস্যা হলে সম্পূর্ণ বদলানো হবে' },
              ].map((info) => (
                <div key={info.title} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                  <span className="text-2xl">{info.emoji}</span>
                  <div>
                    <p
                      className="font-semibold text-gray-800 text-sm"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      {info.title}
                    </p>
                    <p
                      className="text-gray-500 text-xs mt-0.5"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      {info.text}
                    </p>
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
