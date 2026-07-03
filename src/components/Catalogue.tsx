import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, Leaf, Loader2 } from 'lucide-react';
import { categories, type Category, type Product } from '../data/products';
import { fetchProducts } from '../data/productsService';
import ProductCard from './ProductCard';
import { useInView } from '../hooks/useInView';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

export default function Catalogue() {
  // ==========================================
  // ÉTATS EXISTANTS
  // ==========================================
  const [activeCategory, setActiveCategory] = useState<Category>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);
  const { ref, isInView } = useInView();

  // ==========================================
  // 🆕 NOUVEAUX ÉTATS POUR SANITY
  // ==========================================
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // 🆕 CHARGEMENT DES PRODUITS DEPUIS SANITY
  // ==========================================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Impossible de charger les produits. Veuillez réessayer.');
        console.error('Erreur chargement produits:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Sanitize search input
  const sanitizedQuery = searchQuery.replace(/[<>{}]/g, '').trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (activeCategory !== 'Tous') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    // Filter by search
    if (sanitizedQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(sanitizedQuery) ||
          p.description.toLowerCase().includes(sanitizedQuery) ||
          p.category.toLowerCase().includes(sanitizedQuery)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, activeCategory, sanitizedQuery, sortBy]);

  return (
    <section id="catalogue" className="relative py-20 md:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Notre Catalogue
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
            Nos Produits
            <span className="block bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              Naturels
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits naturels pour votre santé et bien-être.
          </p>
        </div>

        {/* 🆕 ÉTAT DE CHARGEMENT */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
            <p className="text-gray-500 text-lg">Chargement des produits...</p>
          </div>
        )}

        {/* 🆕 ÉTAT D'ERREUR */}
        {error && !isLoading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-700">Oops !</h3>
            <p className="mt-2 text-gray-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-green-100 text-green-700 font-medium rounded-full hover:bg-green-200 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* CONTENU PRINCIPAL - affiché seulement après le chargement */}
        {!isLoading && !error && (
          <>
            {/* Filters */}
            <div className="mb-10 space-y-4">
              {/* Search & toggle */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    maxLength={100}
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm transition-all"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border transition-all font-medium text-sm ${
                    showFilters
                      ? 'bg-green-50 border-green-300 text-green-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-green-200'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtres
                </button>
              </div>

              {/* Sort - shown when filters visible */}
              <div className={`overflow-hidden transition-all duration-300 ${showFilters ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">Trier par :</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="default">Par défaut</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="rating">Meilleures notes</option>
                    <option value="name">Nom A-Z</option>
                  </select>
                </div>
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const count =
                    category === 'Tous'
                      ? products.length
                      : products.filter((p) => p.category === category).length;

                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === category
                          ? 'bg-gradient-to-r from-green-500 to-emerald-700 text-white shadow-lg shadow-green-300/30 scale-105'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {category}
                      <span className={`ml-1.5 text-xs ${
                        activeCategory === category ? 'text-white/70' : 'text-gray-400'
                      }`}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700">Aucun produit trouvé</h3>
                <p className="mt-2 text-gray-500">
                  Essayez de modifier vos critères de recherche ou de filtrage.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('Tous'); setSortBy('default'); }}
                  className="mt-4 px-6 py-2 bg-green-100 text-green-700 font-medium rounded-full hover:bg-green-200 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Results count */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 text-center text-sm text-gray-400">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} affiché{filteredProducts.length > 1 ? 's' : ''}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}