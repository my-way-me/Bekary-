import { useState, useEffect } from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ cartCount, onCartClick, onPageChange, currentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'হোম' },
    { id: 'menu', label: 'মেনু' },
    { id: 'about', label: 'আমাদের সম্পর্কে' },
    { id: 'contact', label: 'যোগাযোগ' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onPageChange('home')}
          className="flex items-center gap-2 group"
        >
          <span className="text-3xl">🎂</span>
          <div className="text-left">
            <div
              className={`font-bold text-lg leading-tight font-serif transition-colors ${
                scrolled ? 'text-rose-700' : 'text-white'
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              মিষ্টি স্বপ্ন
            </div>
            <div
              className={`text-xs tracking-wider transition-colors ${
                scrolled ? 'text-rose-400' : 'text-rose-200'
              }`}
            >
              Cake & Bakery
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onPageChange(link.id)}
              className={`text-sm font-medium transition-all duration-200 hover:text-rose-500 pb-1 border-b-2 ${
                currentPage === link.id
                  ? 'border-rose-500 text-rose-500'
                  : scrolled
                  ? 'border-transparent text-gray-700'
                  : 'border-transparent text-white'
              }`}
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Cart + Order Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full transition-all hover:scale-110"
          >
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onPageChange('order')}
            className="hidden sm:flex bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-lg"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            অর্ডার করুন
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? 'bg-gray-800' : 'bg-white'}`} style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${scrolled ? 'bg-gray-800' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-gray-800' : 'bg-white'}`} style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { onPageChange(link.id); setMenuOpen(false); }}
              className={`text-left text-base font-medium transition-colors ${
                currentPage === link.id ? 'text-rose-600' : 'text-gray-700'
              }`}
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onPageChange('order'); setMenuOpen(false); }}
            className="bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold w-full"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            অর্ডার করুন
          </button>
        </div>
      )}
    </nav>
  );
}
