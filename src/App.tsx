import { useState, useCallback } from 'react';
import { Product } from './data/products';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import OrderPage from './components/OrderPage';
import CartSidebar, { CartItem } from './components/CartSidebar';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`${product.name} কার্টে যোগ হয়েছে!`);
  }, [showToast]);

  const handleUpdateQuantity = useCallback((id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemove = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  }, []);

  const handleCheckout = useCallback(() => {
    setCartOpen(false);
    setCurrentPage('order');
  }, []);

  const handleOrderSuccess = useCallback(() => {
    setCartItems([]);
    showToast('অর্ডার সফল হয়েছে! ধন্যবাদ।');
  }, [showToast]);

  const handlePageChange = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onPageChange={handlePageChange} />
            <HomePage onAddToCart={handleAddToCart} onPageChange={handlePageChange} />
          </>
        );
      case 'menu':
        return <MenuPage onAddToCart={handleAddToCart} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'order':
        return <OrderPage cartItems={cartItems} onSuccess={handleOrderSuccess} />;
      default:
        return (
          <>
            <Hero onPageChange={handlePageChange} />
            <HomePage onAddToCart={handleAddToCart} onPageChange={handlePageChange} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />

      <main>
        {renderPage()}
      </main>

      <Footer onPageChange={handlePageChange} />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
