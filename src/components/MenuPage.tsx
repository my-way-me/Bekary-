import { useState } from 'react';
import { products, categories, Product } from '../data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

interface MenuPageProps {
  onAddToCart: (product: Product) => void;
}

export default function MenuPage({ onAddToCart }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('default');

  const filtered = products
    .filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <section className="min-h-screen bg-rose-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 rounded-full px-4 py-1.5 text-sm mb-4">
            🍰 আমাদের মেনু
          </div>
          <h2
            className="text-4xl font-bold text-gray-800 mb-3"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            স্বাদের সম্ভার
          </h2>
          <p
            className="text-gray-600 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            প্রতিটি পণ্য হাতে তৈরি, প্রতিদিন তাজা বেক করা
          </p>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              placeholder="পণ্য খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white text-gray-700 placeholder-gray-400"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-5 py-3 rounded-2xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white text-gray-700 cursor-pointer"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            <option value="default">ডিফল্ট সাজানো</option>
            <option value="price-asc">কম দাম থেকে বেশি</option>
            <option value="price-desc">বেশি দাম থেকে কম</option>
            <option value="rating">সেরা রেটিং</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-rose-100 shadow-md'
              }`}
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <p
          className="text-sm text-gray-500 mb-6"
          style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
        >
          {filtered.length} টি পণ্য পাওয়া গেছে
        </p>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-gray-500 text-xl" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              কোনো পণ্য পাওয়া যায়নি
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}
