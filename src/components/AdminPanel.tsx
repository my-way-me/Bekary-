import { useState } from "react";
import { toBn, waLink } from "@/lib/utils";
import type { Product, Settings, Order } from "@/data/constants";

export default function AdminPanel({
  isOpen,
  onClose,
  products,
  setProducts,
  settings,
  setSettings,
  orders,
  showToast,
}: {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  orders: Order[];
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const [tab, setTab] = useState("products");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  if (!isOpen) return null;

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />
        <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-scale-in text-center">
          <div className="text-4xl mb-3">🔐</div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">
            অ্যাডমিন প্যানেল
          </h3>
          <p className="text-xs text-gray-500 mb-5">
            অ্যাক্সেস করতে PIN দিন
          </p>
          <input
            type="password"
            maxLength={6}
            placeholder="••••"
            value={pinInput}
            onChange={(ev) => setPinInput(ev.target.value)}
            className="w-full text-center text-2xl tracking-widest p-4 rounded-xl border-2 border-gray-200 focus:border-rose-500 outline-none font-mono"
          />
          <div className="flex gap-3 mt-5">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-xs text-gray-700"
            >
              বাতিল
            </button>
            <button
              onClick={() => {
                if (pinInput === settings.adminPin) {
                  setAuthenticated(true);
                  setPinInput("");
                } else {
                  showToast("ভুল PIN! আবার চেষ্টা করুন।", "error");
                  setPinInput("");
                }
              }}
              className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl font-bold text-xs text-white"
            >
              প্রবেশ
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "products", icon: "🍰", label: "পণ্য ম্যানেজ" },
    { id: "promo", icon: "🎁", label: "প্রোমো ও অফার" },
    { id: "delivery", icon: "🚚", label: "ডেলিভারি ও পেমেন্ট" },
    { id: "orders", icon: "📦", label: "অর্ডার সমূহ" },
    { id: "security", icon: "🔑", label: "সিকিউরিটি" },
  ];

  const saveProduct = (p: Product) => {
    if (editProduct && editProduct.id) {
      setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
    } else {
      setProducts((prev) => [...prev, { ...p, id: Date.now() }]);
    }
    setEditProduct(null);
    showToast("পণ্য সংরক্ষিত হয়েছে!");
  };

  return (
    <div className="fixed inset-0 z-[70] flex">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => {
          onClose();
          setAuthenticated(false);
        }}
      />
      <div className="relative bg-gray-50 w-full max-w-5xl mx-auto my-4 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-in">
        <div className="bg-gradient-to-r from-gray-900 to-rose-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <span className="text-xl">⚙️</span>
            <div>
              <h3 className="font-bold text-base">অ্যাডমিন কন্ট্রোল প্যানেল</h3>
              <p className="text-[10px] text-gray-400">
                বেক আর্ট স্টাইল — সম্পূর্ণ অ্যাপ নিয়ন্ত্রণ
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              setAuthenticated(false);
            }}
            className="text-white/70 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex border-b border-gray-200 bg-white overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                tab === t.id
                  ? "border-rose-500 text-rose-600 bg-rose-50/40"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {tab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm text-gray-900">
                  মোট পণ্য: {toBn(products.length)}টি
                </h4>
                <button
                  onClick={() =>
                    setEditProduct({
                      name: "",
                      category: "birthday",
                      price: 0,
                      rating: 5,
                      reviews: 0,
                      tag: "",
                      weight: "",
                      image: "",
                      description: "",
                      approved: true,
                      id: 0,
                    })
                  }
                  className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
                >
                  + নতুন পণ্য যোগ
                </button>
              </div>

              {editProduct && (
                <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm mb-5 animate-fade-in-up">
                  <h5 className="font-bold text-sm text-rose-600 mb-4">
                    {editProduct.id ? "পণ্য সম্পাদনা" : "নতুন পণ্য"}
                  </h5>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      placeholder="পণ্যের নাম"
                      value={editProduct.name}
                      onChange={(ev) =>
                        setEditProduct({
                          ...editProduct,
                          name: ev.target.value,
                        })
                      }
                      className="p-2.5 rounded-lg border text-xs w-full"
                    />
                    <select
                      value={editProduct.category}
                      onChange={(ev) =>
                        setEditProduct({
                          ...editProduct,
                          category: ev.target.value,
                        })
                      }
                      className="p-2.5 rounded-lg border text-xs bg-white"
                    >
                      <option value="birthday">জন্মদিনের কেক</option>
                      <option value="wedding">ওয়েডিং কেক</option>
                      <option value="pastry">পেস্ট্রি</option>
                      <option value="custom">কাস্টম</option>
                    </select>
                    <input
                      type="number"
                      placeholder="মূল্য (৳)"
                      value={editProduct.price || ""}
                      onChange={(ev) =>
                        setEditProduct({
                          ...editProduct,
                          price: Number(ev.target.value),
                        })
                      }
                      className="p-2.5 rounded-lg border text-xs"
                    />
                    <input
                      placeholder="ওজন (যেমন: ১ কেজি)"
                      value={editProduct.weight}
                      onChange={(ev) =>
                        setEditProduct({
                          ...editProduct,
                          weight: ev.target.value,
                        })
                      }
                      className="p-2.5 rounded-lg border text-xs"
                    />
                    <input
                      placeholder="ট্যাগ (যেমন: বেস্টসেলার)"
                      value={editProduct.tag}
                      onChange={(ev) =>
                        setEditProduct({
                          ...editProduct,
                          tag: ev.target.value,
                        })
                      }
                      className="p-2.5 rounded-lg border text-xs"
                    />
                    <input
                      placeholder="ইমেজ URL"
                      value={editProduct.image}
                      onChange={(ev) =>
                        setEditProduct({
                          ...editProduct,
                          image: ev.target.value,
                        })
                      }
                      className="p-2.5 rounded-lg border text-xs"
                    />
                  </div>
                  <textarea
                    placeholder="বিবরণ"
                    rows={2}
                    value={editProduct.description}
                    onChange={(ev) =>
                      setEditProduct({
                        ...editProduct,
                        description: ev.target.value,
                      })
                    }
                    className="w-full p-2.5 rounded-lg border text-xs mt-3 resize-none"
                  />
                  <div className="flex items-center gap-4 mt-3">
                    <label className="flex items-center gap-2 text-xs font-medium">
                      <input
                        type="checkbox"
                        checked={editProduct.approved}
                        onChange={(ev) =>
                          setEditProduct({
                            ...editProduct,
                            approved: ev.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      ✅ অনুমোদিত (ওয়েবসাইটে দেখাবে)
                    </label>
                    <div className="flex-1" />
                    <button
                      onClick={() => setEditProduct(null)}
                      className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-bold"
                    >
                      বাতিল
                    </button>
                    <button
                      onClick={() => saveProduct(editProduct)}
                      className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-bold"
                    >
                      সংরক্ষণ
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className={`flex items-center gap-3 bg-white p-3 rounded-xl border text-xs ${
                      p.approved
                        ? "border-gray-100"
                        : "border-amber-300 bg-amber-50/30"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">
                        {p.name}
                      </p>
                      <p className="text-gray-500">
                        {toBn(p.price)} ৳ • {p.weight}{" "}
                        {!p.approved ? "• ⏸️ লুকানো" : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setEditProduct({ ...p })}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        setProducts((prev) =>
                          prev.filter((x) => x.id !== p.id)
                        );
                        showToast("পণ্য মুছে ফেলা হয়েছে", "error");
                      }}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg font-bold"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "promo" && (
            <div className="max-w-lg">
              <h4 className="font-bold text-sm text-gray-900 mb-4">
                🎁 প্রোমো ও অফার সেটিংস
              </h4>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-4">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    checked={settings.promoEnabled}
                    onChange={(ev) =>
                      setSettings({
                        ...settings,
                        promoEnabled: ev.target.checked,
                      })
                    }
                    className="rounded w-5 h-5 text-rose-600"
                  />
                  <div>
                    <p className="font-bold text-sm">প্রোমো অফার সক্রিয়</p>
                    <p className="text-[10px] text-gray-500">
                      বন্ধ করলে ওয়েবসাইটে অফার ব্যানার দেখাবে না
                    </p>
                  </div>
                </label>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    অফার শিরোনাম
                  </label>
                  <input
                    value={settings.promoTitle}
                    onChange={(ev) =>
                      setSettings({
                        ...settings,
                        promoTitle: ev.target.value,
                      })
                    }
                    className="w-full p-2.5 rounded-lg border text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      প্রোমো কোড
                    </label>
                    <input
                      value={settings.promoCode}
                      onChange={(ev) =>
                        setSettings({
                          ...settings,
                          promoCode: ev.target.value.toUpperCase(),
                        })
                      }
                      className="w-full p-2.5 rounded-lg border text-xs font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      ডিসকাউন্ট %
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={settings.promoPercent}
                      onChange={(ev) =>
                        setSettings({
                          ...settings,
                          promoPercent: Number(ev.target.value),
                        })
                      }
                      className="w-full p-2.5 rounded-lg border text-xs"
                    />
                  </div>
                </div>
                <button
                  onClick={() => showToast("প্রোমো সেটিংস সংরক্ষিত!")}
                  className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold text-xs"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </div>
          )}

          {tab === "delivery" && (
            <div className="max-w-lg">
              <h4 className="font-bold text-sm text-gray-900 mb-4">
                🚚 ডেলিভারি ও পেমেন্ট সেটিংস
              </h4>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      ডেলিভারি ফি (৳)
                    </label>
                    <input
                      type="number"
                      value={settings.deliveryFee}
                      onChange={(ev) =>
                        setSettings({
                          ...settings,
                          deliveryFee: Number(ev.target.value),
                        })
                      }
                      className="w-full p-2.5 rounded-lg border text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      আনুমানিক সময়
                    </label>
                    <input
                      value={settings.deliveryEstimate}
                      onChange={(ev) =>
                        setSettings({
                          ...settings,
                          deliveryEstimate: ev.target.value,
                        })
                      }
                      className="w-full p-2.5 rounded-lg border text-xs"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-2">
                    পেমেন্ট মাধ্যম সমূহ
                  </p>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <input
                        type="checkbox"
                        checked={settings.paymentMethods.cod}
                        onChange={(ev) =>
                          setSettings({
                            ...settings,
                            paymentMethods: {
                              ...settings.paymentMethods,
                              cod: ev.target.checked,
                            },
                          })
                        }
                        className="rounded"
                      />
                      <span className="text-xs font-medium">
                        💵 ক্যাশ অন ডেলিভারি (COD)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <input
                        type="checkbox"
                        checked={settings.paymentMethods.bkash}
                        onChange={(ev) =>
                          setSettings({
                            ...settings,
                            paymentMethods: {
                              ...settings.paymentMethods,
                              bkash: ev.target.checked,
                            },
                          })
                        }
                        className="rounded"
                      />
                      <span className="text-xs font-medium">
                        📱 বিকাশ (bKash)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <input
                        type="checkbox"
                        checked={settings.paymentMethods.nagad}
                        onChange={(ev) =>
                          setSettings({
                            ...settings,
                            paymentMethods: {
                              ...settings.paymentMethods,
                              nagad: ev.target.checked,
                            },
                          })
                        }
                        className="rounded"
                      />
                      <span className="text-xs font-medium">
                        🟠 নগদ (Nagad)
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => showToast("ডেলিভারি সেটিংস সংরক্ষিত!")}
                  className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold text-xs"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    মোট বিক্রি
                  </p>
                  <p className="text-2xl font-bold text-rose-600">
                    {toBn(orders.reduce((s, o) => s + o.total, 0))} ৳
                  </p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    মোট অর্ডার
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {toBn(orders.length)} টি
                  </p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    গড় অর্ডার ভ্যালু
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.length
                      ? `${toBn(
                          Math.round(
                            orders.reduce((s, o) => s + o.total, 0) /
                              orders.length
                          )
                        )} ৳`
                      : "০ ৳"}
                  </p>
                </div>
              </div>
              <h4 className="font-bold text-sm text-gray-900 mb-4">
                📦 সকল অর্ডার
              </h4>
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-3xl mb-2">📭</p>
                  <p className="text-sm">এখনও কোনো অর্ডার আসেনি</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {orders.map((o, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-xl border border-gray-100 text-xs hover:border-rose-200 transition-all group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded">
                          {o.orderId}
                        </span>
                        <span className="text-gray-400">{o.date}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2">
                        <div>
                          <p>
                            <b>প্রাপক: </b>
                            {o.name}
                          </p>
                          <p>
                            <b>ফোন: </b>
                            {o.phone}
                          </p>
                          <p>
                            <b>ঠিকানা: </b>
                            {o.address}
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>আইটেম: </b>
                            {o.items}
                          </p>
                          <p>
                            <b>পেমেন্ট: </b>
                            {o.paymentMethod}
                          </p>
                          <p>
                            <b>সর্বমোট: </b>
                            <span className="text-rose-600 font-bold">
                              {toBn(o.total)} ৳
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-50 flex gap-2">
                        <a
                          href={waLink(
                            `অর্ডার ${o.orderId} সম্পর্কে আপডেট: `
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-all"
                        >
                          💬 WhatsApp আপডেট
                        </a>
                        <button
                          onClick={() => {
                            const invoice = `--- INVOICE: ${o.orderId} ---\nCustomer: ${o.name}\nItems: ${o.items}\nTotal: ${o.total} BDT\nThank you for ordering from Bake Art Style!`;
                            const blob = new Blob([invoice], {
                              type: "text/plain",
                            });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `invoice-${o.orderId}.txt`;
                            a.click();
                          }}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold"
                        >
                          📄 ইনভয়েস ডাউনলোড
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "security" && (
            <div className="max-w-lg">
              <h4 className="font-bold text-sm text-gray-900 mb-4">
                🔑 অ্যাডমিন PIN পরিবর্তন
              </h4>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-3">
                <input
                  type="password"
                  placeholder="নতুন PIN (যেমন: 1234)"
                  value={settings.adminPin}
                  onChange={(ev) =>
                    setSettings({ ...settings, adminPin: ev.target.value })
                  }
                  className="w-full p-3 rounded-lg border text-sm font-mono text-center tracking-widest"
                />
                <button
                  onClick={() => showToast("PIN আপডেট হয়েছে!")}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-xs"
                >
                  PIN সংরক্ষণ করুন
                </button>
                <p className="text-[10px] text-gray-400 text-center">
                  ডিফল্ট PIN: 1234 — অবশ্যই পরিবর্তন করুন!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
