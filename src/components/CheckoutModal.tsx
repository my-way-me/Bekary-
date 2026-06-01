import { useState } from "react";
import { toBn, waLink } from "@/lib/utils";
import type { CartItem, Settings, Order } from "@/data/constants";

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  discount,
  onClearCart,
  showToast,
  settings,
  onOrderPlaced,
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discount: number;
  onClearCart: () => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  settings: Settings;
  onOrderPlaced: (o: Order) => void;
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "সকাল ১০-দুপুর ১টা",
    payment: "cod",
  });
  const [orderId, setOrderId] = useState("");
  const [isConfetti, setIsConfetti] = useState(false);

  const sub = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const disc = (sub * discount) / 100;
  const total = sub - disc + settings.deliveryFee;

  const next = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step === 1) {
      if (!info.name || !info.phone || !info.address || !info.date) {
        showToast("সকল তথ্য পূরণ করুন!", "error");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const oid = "BAS-" + Math.floor(10000 + Math.random() * 90000);
      setOrderId(oid);
      const orderData: Order = {
        orderId: oid,
        name: info.name,
        phone: info.phone,
        address: info.address,
        date: info.date,
        time: info.time,
        total,
        items: cart.map((c) => `${c.name} x${c.quantity}`).join(", "),
        paymentMethod:
          info.payment === "cod"
            ? "ক্যাশ অন ডেলিভারি"
            : info.payment === "bkash"
            ? "বিকাশ"
            : "নগদ",
      };
      onOrderPlaced(orderData);
      setIsConfetti(true);
      setTimeout(() => setIsConfetti(false), 5000);
      const waMsg = `🎂 নতুন অর্ডার!\n\n📋 অর্ডার ID: ${oid}\n👤 নাম: ${info.name}\n📞 ফোন: ${info.phone}\n📍 ঠিকানা: ${info.address}\n📅 ডেলিভারি: ${info.date} (${info.time})\n💰 মোট: ${total}৳ (${orderData.paymentMethod})\n\n🛒 আইটেম:\n${cart
        .map((c) => `• ${c.name} x${c.quantity} = ${c.price * c.quantity}৳`)
        .join("\n")}`;
      window.open(waLink(waMsg), "_blank");
      setStep(3);
      onClearCart();
    }
  };

  const pm = settings.paymentMethods;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step < 3 ? onClose : undefined}
      />
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col my-4 animate-scale-in">
        {isConfetti &&
          Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ["#f43f5e", "#fbbf24", "#34d399", "#60a5fa"][
                  Math.floor(Math.random() * 4)
                ],
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4 text-white flex justify-between items-center">
          <div>
            <h3 className="font-bold text-base">
              {step === 3 ? "অর্ডার সম্পন্ন! 🎉" : "নিরাপদ চেকআউট"}
            </h3>
            <p className="text-[10px] text-rose-100">
              {step < 3 ? `ধাপ ${toBn(step)}/২` : "ধন্যবাদ!"}
            </p>
          </div>
          {step < 3 && (
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-lg"
            >
              ✕
            </button>
          )}
        </div>

        <div className="p-6">
          {step === 1 && (
            <form onSubmit={next} className="flex flex-col gap-3">
              <h4 className="font-bold text-xs text-gray-900 border-b pb-2">
                ১. ডেলিভারি তথ্য
              </h4>
              <input
                type="text"
                required
                placeholder="প্রাপকের নাম *"
                value={info.name}
                onChange={(ev) => setInfo({ ...info, name: ev.target.value })}
                className="p-2.5 rounded-xl border text-xs w-full"
              />
              <input
                type="tel"
                required
                placeholder="মোবাইল নম্বর *"
                value={info.phone}
                onChange={(ev) => setInfo({ ...info, phone: ev.target.value })}
                className="p-2.5 rounded-xl border text-xs"
              />
              <textarea
                rows={2}
                required
                placeholder="সম্পূর্ণ ঠিকানা *"
                value={info.address}
                onChange={(ev) =>
                  setInfo({ ...info, address: ev.target.value })
                }
                className="p-2.5 rounded-xl border text-xs resize-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  required
                  value={info.date}
                  onChange={(ev) => setInfo({ ...info, date: ev.target.value })}
                  className="p-2.5 rounded-xl border text-xs"
                />
                <select
                  value={info.time}
                  onChange={(ev) => setInfo({ ...info, time: ev.target.value })}
                  className="p-2.5 rounded-xl border text-xs bg-white"
                >
                  <option>সকাল ১০-দুপুর ১টা</option>
                  <option>দুপুর ২-বিকাল ৫টা</option>
                  <option>সন্ধ্যা ৬-রাত ৯টা</option>
                </select>
              </div>
              <div className="bg-rose-50 p-3 rounded-xl flex justify-between text-xs">
                <span>আনুমানিক ডেলিভারি: {settings.deliveryEstimate}</span>
                <span className="font-bold text-rose-600">
                  মোট: {toBn(total)} ৳
                </span>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 hover:bg-rose-600 text-white font-bold rounded-xl text-xs mt-1"
              >
                পরবর্তী: পেমেন্ট
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={next} className="flex flex-col gap-4">
              <h4 className="font-bold text-xs text-gray-900 border-b pb-2">
                ২. পেমেন্ট মাধ্যম
              </h4>
              <div className="flex flex-col gap-2">
                {pm.cod && (
                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer ${
                      info.payment === "cod"
                        ? "border-rose-500 bg-rose-50/40"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pm"
                      checked={info.payment === "cod"}
                      onChange={() => setInfo({ ...info, payment: "cod" })}
                    />
                    💵 ক্যাশ অন ডেলিভারি
                  </label>
                )}
                {pm.bkash && (
                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer ${
                      info.payment === "bkash"
                        ? "border-rose-500 bg-rose-50/40"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pm"
                      checked={info.payment === "bkash"}
                      onChange={() => setInfo({ ...info, payment: "bkash" })}
                    />
                    📱 বিকাশ (bKash)
                  </label>
                )}
                {pm.nagad && (
                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer ${
                      info.payment === "nagad"
                        ? "border-rose-500 bg-rose-50/40"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pm"
                      checked={info.payment === "nagad"}
                      onChange={() => setInfo({ ...info, payment: "nagad" })}
                    />
                    🟠 নগদ (Nagad)
                  </label>
                )}
              </div>
              <div className="bg-gray-50 p-3 rounded-xl text-xs flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>সাবটোটাল:</span>
                  <span className="font-bold">{toBn(sub)}৳</span>
                </div>
                {disc > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>ছাড়:</span>
                    <span>-{toBn(disc)}৳</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ডেলিভারি:</span>
                  <span>{toBn(settings.deliveryFee)}৳</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-1 border-t mt-1">
                  <span>মোট:</span>
                  <span className="text-rose-600">{toBn(total)}৳</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 bg-gray-100 rounded-xl text-xs font-bold"
                >
                  পেছনে
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl btn-shine text-xs"
                >
                  অর্ডার কনফার্ম + WhatsApp
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="text-4xl mb-3 animate-bounce-soft">🎉</div>
              <h4 className="text-lg font-bold">অর্ডার কনফার্ম হয়েছে!</h4>
              <p className="text-xs text-gray-500 mt-1">
                WhatsApp এ সম্পূর্ণ অর্ডার ডিটেইল পাঠানো হচ্ছে।
              </p>
              <div className="bg-gray-50 p-4 rounded-2xl my-5 text-left text-xs">
                <div className="flex justify-between border-b pb-2 mb-2">
                  <span className="text-gray-400 font-bold">ট্র্যাকিং ID</span>
                  <span className="font-mono font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded">
                    {orderId}
                  </span>
                </div>
                <p>
                  <b>প্রাপক: </b>
                  {info.name}
                </p>
                <p>
                  <b>ডেলিভারি: </b>
                  {info.date} ({info.time})
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setStep(1);
                }}
                className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl text-xs"
              >
                হোমপেজে ফিরুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
