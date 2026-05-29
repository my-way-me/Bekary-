import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={product.image}
          alt={product.nameEn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-rose-700 text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {product.badge}
          </div>
        )}
        {/* Discount badge */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-rose-900/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white text-rose-700 px-5 py-2 rounded-full text-sm font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            👁️ বিস্তারিত দেখুন
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-bold text-gray-800 text-lg leading-tight mb-1"
          style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
        >
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2 italic">{product.nameEn}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-sm">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <p
          className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed"
          style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
        >
          {product.description}
        </p>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-xl font-bold text-rose-600"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ৳{product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-rose-600 hover:bg-rose-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg transition-all hover:scale-110 shadow-md"
            title="কার্টে যোগ করুন"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
