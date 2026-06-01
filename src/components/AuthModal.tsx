import { useState } from "react";
import { LS, SS } from "@/lib/utils";
import type { User } from "@/data/constants";

export default function AuthModal({
  isOpen,
  onClose,
  onLogin,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (u: User) => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  if (!isOpen) return null;

  const handleEmail = (ev: React.FormEvent) => {
    ev.preventDefault();
    setErr("");
    if (mode === "register" && !name.trim()) {
      setErr("নাম লিখুন");
      return;
    }
    if (!email.includes("@")) {
      setErr("সঠিক ইমেইল দিন");
      return;
    }
    if (pass.length < 4) {
      setErr("পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে");
      return;
    }
    if (mode === "register") {
      const users: User[] = LS("users", []);
      if (users.find((u) => u.email === email)) {
        setErr("এই ইমেইলে আগেই একাউন্ট আছে");
        return;
      }
      const newUser: User = {
        id: Date.now(),
        name,
        email,
        pass,
        provider: "email",
        avatar: "👤",
      };
      SS("users", [...users, newUser]);
      onLogin(newUser);
    } else {
      const users: User[] = LS("users", []);
      const found = users.find((u) => u.email === email && u.pass === pass);
      if (!found) {
        setErr("ইমেইল বা পাসওয়ার্ড ভুল");
        return;
      }
      onLogin(found);
    }
  };

  const handleSocial = (provider: "google" | "facebook") => {
    const fakeUser: User = {
      id: Date.now(),
      name: provider === "google" ? "Google User" : "Facebook User",
      email: `${provider}_user_${Date.now()}@demo.com`,
      provider,
      avatar: provider === "google" ? "🔵" : "🟦",
    };
    const users: User[] = LS("users", []);
    SS("users", [...users, fakeUser]);
    onLogin(fakeUser);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-5 text-white text-center">
          <div className="text-3xl mb-1">🎂</div>
          <h3 className="font-bold text-lg">
            {mode === "login" ? "লগইন করুন" : "নতুন অ্যাকাউন্ট তৈরি করুন"}
          </h3>
          <p className="text-xs text-rose-100">
            বেক আর্ট স্টাইলে আপনাকে স্বাগতম!
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white"
        >
          ✕
        </button>
        <div className="p-6 flex flex-col gap-4">
          <button
            onClick={() => handleSocial("google")}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all font-medium text-sm"
          >
            <span className="text-lg">🔵</span> Google দিয়ে লগইন
          </button>
          <button
            onClick={() => handleSocial("facebook")}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all font-medium text-sm"
          >
            <span className="text-lg">🟦</span> Facebook দিয়ে লগইন
          </button>

          <div className="flex items-center gap-3 text-gray-400">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs">অথবা</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleEmail} className="flex flex-col gap-3">
            {mode === "register" && (
              <input
                type="text"
                placeholder="আপনার নাম"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-rose-500 outline-none text-sm"
              />
            )}
            <input
              type="email"
              placeholder="ইমেইল ঠিকানা"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-rose-500 outline-none text-sm"
            />
            <input
              type="password"
              placeholder="পাসওয়ার্ড"
              value={pass}
              onChange={(ev) => setPass(ev.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-rose-500 outline-none text-sm"
            />
            {err && (
              <p className="text-rose-600 text-xs font-medium bg-rose-50 p-2 rounded-lg">
                {err}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl shadow-md btn-shine"
            >
              {mode === "login" ? "ইমেইল দিয়ে লগইন" : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>
          <p className="text-center text-xs text-gray-500">
            {mode === "login" ? "অ্যাকাউন্ট নেই? " : "আগেই অ্যাকাউন্ট আছে? "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setErr("");
              }}
              className="text-rose-600 font-bold hover:underline"
            >
              {mode === "login" ? "রেজিস্টার করুন" : "লগইন করুন"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
