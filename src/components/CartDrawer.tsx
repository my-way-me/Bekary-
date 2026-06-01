import { toBn } from "@/lib/utils";
import type { CartItem, Settings } from "@/data/constants";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  onCheckout,
  promoCode,
  setPromoCode,
  discount,
  onApplyPromo,
  showToast,
  settings,
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: number | string, q: number) => void;
  onRemove: (id: number | string) => void;
  onCheckout: () => void;
  promoCode: string;
  setPromoCode: (v: string) => void;
  discount: number;
  onApplyPromo: (v: number) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  settings: Settings;
}) {
  if (!isOpen) return null;

  const sub = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const disc = (sub * discount) / 100;
  const total = sub - disc;

  const applyPromo = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (promoCode.trim().toUpperCase() === settings.promoCode) {
      onApplyPromo(settings.promoPercent);
      showToast(`${toBn(settings.promoPercent)}% ছাড় যুক্ত হলো!`);
    } else {
      showToast("অকার্যকর প্রোমো কোড!", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-[55] overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 animate-slide-right">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-5 bg-rose-50/50 border-b border-rose-100 flex justify-between items-center">
            <h2 className="font-bold flex items-center gap-2">
              🛒 শপিং কার্ট ({toBn(cart.length)})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-center pb-3 border-b border-gray-100 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs truncate">{item.name}</h4>
                    <p className="text-[10px] text-gray-500">{item.weight}</p>
                    <p className="text-xs font-bold text-rose-600">
                      {toBn(item.price)} ৳
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-[10px] text-gray-400 hover:text-rose-600"
                    >
                      মুছুন
                    </button>
                    <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg p-0.5 border">
                      <button
                        onClick={() =>
                          onUpdateQty(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold rounded hover:bg-white"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-1">
                        {toBn(item.quantity)}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQty(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold rounded hover:bg-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-4xl mb-2">🥮</p>
                <p className="font-bold text-sm text-gray-500">কার্ট খালি!</p>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 bg-gray-50 border-t flex flex-col gap-3">
              {settings.promoEnabled && (
                <form onSubmit={applyPromo} className="flex gap-2">
                  <input
                    placeholder="প্রোমো কোড"
                    value={promoCode}
                    onChange={(ev) => setPromoCode(ev.target.value)}
                    className="flex-1 px-3 py-2 bg-white rounded-xl border text-xs outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold"
                  >
                    প্রয়োগ
                  </button>
                </form>
              )}
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>সাবটোটাল:</span>
                  <span className="font-bold text-gray-900">
                    {toBn(sub)} ৳
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>ছাড় ({toBn(discount)}%):</span>
                    <span className="font-bold">- {toBn(disc)} ৳</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t mt-1 text-sm">
                  <span>সর্বমোট:</span>
                  <span className="text-rose-600">{toBn(total)} ৳</span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl shadow-md btn-shine"
              >
                চেকআউট করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
