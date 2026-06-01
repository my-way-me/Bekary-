import { useState, useEffect } from "react";
import { toBn } from "@/lib/utils";
import type { User } from "@/data/constants";

export default function Navbar({
  cartCount,
  onOpenCart,
  user,
  onOpenAuth,
  onLogout,
}: {
  cartCount: number;
  onOpenCart: () => void;
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { name: "হোম", href: "#hero" },
    { name: "মেন্যু", href: "#menu" },
    { name: "কাস্টম কেক", href: "#custom-cake" },
    { name: "আমাদের কথা", href: "#about" },
    { name: "রিভিউ", href: "#reviews" },
    { name: "যোগাযোগ", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg py-2.5"
          : "bg-white/60 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="text-lg">🎂</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                বেক আর্ট স্টাইল
              </h1>
              <p className="text-[10px] font-script text-purple-600 -mt-0.5 font-bold">
                Bake Art Style
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="text-gray-600 hover:text-rose-600 font-medium transition-colors text-sm"
              >
                {l.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-sm">
                  {user.avatar || "👤"}
                </span>
                <span className="text-xs font-bold text-gray-700 max-w-[80px] truncate">
                  {user.name}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[10px] text-gray-400 hover:text-rose-600 font-medium"
                >
                  লগআউট
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 hover:border-rose-300 text-xs font-medium text-gray-700 hover:text-rose-600 transition-all"
              >
                <span>👤</span> লগইন
              </button>
            )}

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse-glow">
                  {toBn(cartCount)}
                </span>
              )}
            </button>

            <a
              href="#menu"
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all btn-shine"
            >
              অর্ডার করুন
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-rose-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    mobileOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-rose-50 px-4 pt-2 pb-5 animate-fade-in-down shadow-lg">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                {l.name}
              </a>
            ))}
            {!user && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenAuth();
                }}
                className="mt-2 w-full py-2.5 rounded-full border-2 border-rose-200 text-rose-600 font-bold text-sm"
              >
                👤 লগইন / রেজিস্টার
              </button>
            )}
            {user && (
              <div className="mt-2 flex items-center justify-between px-3 py-2 bg-rose-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span>{user.avatar || "👤"}</span>
                  <span className="text-xs font-bold">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs text-rose-600 font-bold"
                >
                  লগআউট
                </button>
              </div>
            )}
            <a
              href="#menu"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full inline-flex items-center justify-center py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-sm shadow"
            >
              অর্ডার করুন
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
