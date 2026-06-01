import { useState } from "react";
import { toBn } from "@/lib/utils";
import type { CartItem } from "@/data/constants";

export default function CustomCake({
  onAddCustomCake,
}: {
  onAddCustomCake: (p: CartItem) => void;
}) {
  const flavors = [
    { id: "vanilla", name: "ভ্যানিলা ডিলাইট", ppk: 800 },
    { id: "chocolate", name: "বেলজিয়ান চকোলেট", ppk: 1000 },
    { id: "blackforest", name: "ব্ল্যাক ফরেস্ট", ppk: 900 },
    { id: "redvelvet", name: "রেড ভেলভেট", ppk: 1100 },
  ];
  const weights = [
    { id: "1", name: "১ কেজি", m: 1 },
    { id: "1.5", name: "১.৫ কেজি", m: 1.5 },
    { id: "2", name: "২ কেজি", m: 2 },
    { id: "3", name: "৩ কেজি", m: 3 },
  ];

  const [fl, setFl] = useState(flavors[0]);
  const [wt, setWt] = useState(weights[0]);
  const [msg, setMsg] = useState("");
  const total = fl.ppk * wt.m;

  return (
    <section id="custom-cake" className="py-20 bg-rose-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-rose-500 font-script text-xl font-bold">Be the Chef</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
            আপনার স্বপ্নের কেক ডিজাইন করুন
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl shadow-sm border border-rose-100 flex flex-col gap-5">
            <div>
              <label className="text-sm font-bold text-gray-900 block mb-2">
                ১. ফ্লেভার নির্বাচন করুন
              </label>
              <div className="grid sm:grid-cols-2 gap-2">
                {flavors.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFl(f)}
                    className={`p-3 rounded-xl border text-left transition-all flex justify-between items-center ${
                      fl.id === f.id
                        ? "border-rose-500 bg-rose-50/50 ring-2 ring-rose-100"
                        : "border-gray-200 hover:border-rose-200"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs">{f.name}</p>
                      <p className="text-[10px] text-gray-500">
                        {toBn(f.ppk)} ৳/কেজি
                      </p>
                    </div>
                    {fl.id === f.id && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-900 block mb-2">
                ২. ওজন নির্বাচন
              </label>
              <div className="grid grid-cols-4 gap-2">
                {weights.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWt(w)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      wt.id === w.id
                        ? "border-rose-500 bg-rose-50/50 ring-2 ring-rose-100"
                        : "border-gray-200"
                    }`}
                  >
                    <p className="font-bold text-xs">{w.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-900 block mb-1">
                ৩. কেকের ওপর কী লিখবেন?
              </label>
              <input
                type="text"
                placeholder="যেমন: শুভ জন্মদিন!"
                value={msg}
                onChange={(ev) => setMsg(ev.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-rose-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 to-rose-950 text-white p-6 rounded-3xl shadow-xl sticky top-24">
            <h3 className="text-lg font-bold border-b border-white/10 pb-3 mb-5">
              📋 অর্ডার সারসংক্ষেপ
            </h3>
            <div className="flex flex-col gap-3 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">ফ্লেভার:</span>
                <span className="font-bold">{fl.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ওজন:</span>
                <span className="font-bold">{wt.name}</span>
              </div>
              {msg && (
                <div className="bg-white/5 p-2 rounded-lg border border-white/10 text-xs">
                  <span className="text-rose-300">লেখা: </span>&quot;{msg}&quot;
                </div>
              )}
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 mb-5 flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-300 block">মোট মূল্য</span>
                <span className="text-2xl font-bold text-rose-400">
                  {toBn(total)} ৳
                </span>
              </div>
              <span className="text-[10px] bg-rose-500/30 text-rose-300 px-2 py-1 rounded border border-rose-500/30">
                ভ্যাট অন্তর্ভুক্ত
              </span>
            </div>
            <button
              onClick={() => {
                onAddCustomCake({
                  id: "c-" + Date.now(),
                  name: `কাস্টম: ${fl.name}`,
                  price: total,
                  image:
                    "https://images.pexels.com/photos/19651268/pexels-photo-19651268.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                  weight: wt.name,
                  category: "custom",
                  rating: 5,
                  reviews: 0,
                  tag: "",
                  description: "",
                  approved: true,
                  quantity: 1,
                  customDetails: {
                    flavor: fl.name,
                    weight: wt.name,
                    message: msg || "N/A",
                  },
                });
                setMsg("");
              }}
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl shadow-lg btn-shine flex items-center justify-center gap-2"
            >
              🛒 কাস্টম কেক কার্টে যোগ করুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
