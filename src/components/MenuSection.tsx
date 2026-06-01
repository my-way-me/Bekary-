import { useState, useEffect } from "react";
import { toBn } from "@/lib/utils";
import type { Product } from "@/data/constants";

export default function MenuSection({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (p: Product) => void;
}) {
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, [tab]);

  const cats = [
    { id: "all", n: "সব আইটেম" },
    { id: "birthday", n: "জন্মদিনের কেক" },
    { id: "wedding", n: "ওয়েডিং কেক" },
    { id: "pastry", n: "পেস্ট্রি ও ডোনাট" },
    { id: "custom", n: "কাস্টমাইজড" },
  ];

  let filtered = products.filter(
    (p) =>
      p.approved &&
      (tab === "all" || p.category === tab) &&
      (p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase()))
  );

  if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-rose-500 font-script text-xl font-bold">
            Fresh & Delicious
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
            আমাদের সিগনেচার মেন্যু
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 sticky top-16 z-30 bg-white/80 backdrop-blur-md p-2 rounded-2xl">
          <div className="flex flex-wrap justify-center gap-2 bg-rose-50/60 p-1.5 rounded-2xl border border-rose-100">
            {cats.map((c) => (
              <button
                key={c.id}
                onClick={() => setTab(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  tab === c.id
                    ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow"
                    : "text-gray-600 hover:text-rose-600 hover:bg-white/60"
                }`}
              >
                {c.n}
              </button>
            ))}
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(ev) => setSortBy(ev.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs bg-gray-50/50 outline-none focus:border-rose-500"
            >
              <option value="default">সর্টিং করুন</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
              <option value="rating">জনপ্রিয়তা</option>
            </select>
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="কেক খুঁজুন..."
                value={q}
                onChange={(ev) => setQ(ev.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 outline-none text-xs bg-gray-50/50"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm p-4 flex flex-col gap-3"
              >
                <div className="skeleton h-48 rounded-xl w-full" />
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
                <div className="flex justify-between mt-2">
                  <div className="skeleton h-6 w-1/4 rounded" />
                  <div className="skeleton h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-rose-50">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {p.tag && (
                      <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur text-[10px] font-bold text-rose-600 shadow-sm">
                        {p.tag}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-gray-900/80 text-[10px] text-white w-max">
                      {p.weight}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-amber-400 text-xs">★</span>
                    <span className="text-[10px] font-bold text-gray-700">
                      {toBn(p.rating)}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      ({toBn(p.reviews)})
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 flex-grow leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div>
                      <span className="text-[10px] text-gray-400 block">মূল্য</span>
                      <span className="text-lg font-bold text-rose-600">
                        {toBn(p.price)} ৳
                      </span>
                    </div>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-12 text-gray-400">কোনো আইটেম পাওয়া যায়নি।</p>
        )}
      </div>
    </section>
  );
}
