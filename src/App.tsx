import { useState, useEffect, useCallback } from "react";
import { LS, SS } from "@/lib/utils";
import {
  DEFAULT_PRODUCTS,
  DEFAULT_SETTINGS,
  type Product,
  type Settings,
  type Order,
  type CartItem,
  type User,
} from "@/data/constants";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SpecialOffers from "@/components/SpecialOffers";
import MenuSection from "@/components/MenuSection";
import CustomCake from "@/components/CustomCake";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import AuthModal from "@/components/AuthModal";
import AdminPanel from "@/components/AdminPanel";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Toasts from "@/components/Toasts";

interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error";
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(() =>
    LS("products", DEFAULT_PRODUCTS)
  );
  const [settings, setSettings] = useState<Settings>(() =>
    LS("settings", DEFAULT_SETTINGS)
  );
  const [orders, setOrders] = useState<Order[]>(() => LS("orders", []));
  const [user, setUser] = useState<User | null>(() => LS("currentUser", null));
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    SS("products", products);
  }, [products]);
  useEffect(() => {
    SS("settings", settings);
  }, [settings]);
  useEffect(() => {
    SS("orders", orders);
  }, [orders]);
  useEffect(() => {
    SS("currentUser", user);
  }, [user]);

  const showToast = useCallback(
    (msg: string, type: "success" | "error" = "success") => {
      const id = Date.now();
      setToasts((p) => [...p, { id, message: msg, type }]);
      setTimeout(() => {
        setToasts((p) => p.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      if (ex)
        return prev.map((i) =>
          i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...p, quantity: 1 }];
    });
    showToast(`"${p.name}" কার্টে যোগ হয়েছে!`);
  };

  const addCustomCake = (p: CartItem) => {
    setCart((prev) => [...prev, p]);
    showToast("কাস্টম কেক কার্টে যুক্ত হয়েছে!");
    setIsCartOpen(true);
  };

  const updateQty = (id: number | string, q: number) => {
    if (q < 1) {
      setCart((p) => p.filter((i) => i.id !== id));
      showToast("আইটেম মুছে ফেলা হয়েছে", "error");
    } else {
      setCart((p) => p.map((i) => (i.id === id ? { ...i, quantity: q } : i)));
    }
  };

  const removeItem = (id: number | string) => {
    setCart((p) => p.filter((i) => i.id !== id));
    showToast("আইটেম মুছে ফেলা হয়েছে", "error");
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          setUser(null);
          SS("currentUser", null);
          showToast("সফলভাবে লগআউট হয়েছে");
        }}
      />
      <Hero onAdminTrigger={() => setIsAdminOpen(true)} />
      <SpecialOffers settings={settings} />
      <MenuSection products={products} onAddToCart={addToCart} />
      <CustomCake onAddCustomCake={addCustomCake} />
      <AboutSection />
      <Testimonials />
      <ContactSection showToast={showToast} />
      <Footer />
      <WhatsAppFloat />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        discount={discount}
        onApplyPromo={setDiscount}
        showToast={showToast}
        settings={settings}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discount={discount}
        onClearCart={() => {
          setCart([]);
          setDiscount(0);
          setPromoCode("");
        }}
        showToast={showToast}
        settings={settings}
        onOrderPlaced={(o) => setOrders((prev) => [o, ...prev])}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(u) => {
          setUser(u);
          setIsAuthOpen(false);
          showToast(`স্বাগতম, ${u.name}!`);
        }}
      />
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        setProducts={setProducts}
        settings={settings}
        setSettings={setSettings}
        orders={orders}
        showToast={showToast}
      />
      <Toasts toasts={toasts} />
    </div>
  );
}
