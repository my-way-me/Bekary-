import { useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartSidebarProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 60 : 0;
  const total = subtotal + delivery;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-rose-50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            <h2
              className="text-xl font-bold text-gray-800"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              আপনার কার্ট
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white text-gray-500 hover:bg-rose-100 transition-colors flex items-center justify-center text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-7xl mb-4">🛒</div>
              <p
                className="text-gray-400 text-lg"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                আপনার কার্ট খালি
              </p>
              <p
                className="text-gray-300 text-sm mt-2"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                মেনু থেকে পছন্দের আইটেম যোগ করুন
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-rose-50 rounded-2xl p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.nameEn}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-gray-800 text-sm leading-tight"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      {item.product.name}
                    </p>
                    <p
                      className="text-rose-600 font-bold mt-1"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      ৳{item.product.price * item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-7 h-7 bg-white rounded-full text-gray-600 hover:bg-rose-100 transition-colors flex items-center justify-center font-bold shadow-sm"
                      >
                        −
                      </button>
                      <span className="text-gray-700 font-semibold w-5 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-7 h-7 bg-white rounded-full text-gray-600 hover:bg-rose-100 transition-colors flex items-center justify-center font-bold shadow-sm"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="ml-auto text-red-400 hover:text-red-600 transition-colors text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 bg-white">
            <div
              className="space-y-2 mb-4 text-sm"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              <div className="flex justify-between text-gray-600">
                <span>সাবটোটাল</span>
                <span>৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>ডেলিভারি</span>
                <span>৳{delivery}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 text-base border-t pt-2">
                <span>মোট</span>
                <span className="text-rose-600">৳{total}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-[1.02] shadow-lg"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ✅ অর্ডার কনফার্ম করুন
            </button>
          </div>
        )}
      </div>
    </>
  );
}
