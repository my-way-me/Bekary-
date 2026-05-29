import { useEffect } from 'react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-xl ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.nameEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-white/90 text-rose-700 text-sm font-bold px-3 py-1 rounded-full">
              {product.badge}
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 text-gray-700 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white transition-colors text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2
            className="text-2xl font-bold text-gray-800 mb-1"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            {product.name}
          </h2>
          <p className="text-sm text-gray-400 italic mb-3">{product.nameEn}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-gray-600 font-semibold">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviews} রিভিউ)</span>
          </div>

          <p
            className="text-gray-600 leading-relaxed mb-6"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span
                className="text-3xl font-bold text-rose-600"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                ৳{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through ml-3 text-lg">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            <button
              onClick={() => { onAddToCart(product); onClose(); }}
              className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all hover:scale-105"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              🛒 কার্টে যোগ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
