import { useState, useMemo, useEffect } from 'react';
import { Search, Leaf, Loader2 } from 'lucide-react';
import type { Category, Product } from '../data/products';
import { fetchProducts } from '../data/productsService';
import ProductCard from './ProductCard';
import { useInView } from '../hooks/useInView';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

export default function Catalogue() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const { ref, isInView } = useInView();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement des produits depuis Sanity
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

  // Reçoit la recherche et la catégorie envoyées par la Navbar
  useEffect(() => {
    const onFilter = (e: Event) => {
      const { category, query } = (e as CustomEvent<{ category: Category; query: string }>).detail;
      setActiveCategory(category);
      setSearchQuery(query);
    };
    window.addEventListener('catalogue:filter', onFilter);
    return () => window.removeEventListener('catalogue:filter', onFilter);
  }, []);

  const sanitizedQuery = searchQuery.replace(/[<>{}]/g, '').trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== 'Tous') {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (sanitizedQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(sanitizedQuery) ||
          p.description.toLowerCase().includes(sanitizedQuery) ||
          p.category.toLowerCase().includes(sanitizedQuery)
      );
    }

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
    <section id="catalogue" className="relative pt-36 pb-16 md:pt-48 md:pb-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div ref={ref} className={`text-center mb-10 transition-all duration-700 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
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

        {/* Chargement */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
            <p className="text-gray-500 text-lg">Chargement des produits...</p>
          </div>
        )}

        {/* Erreur */}
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

        {/* Contenu principal */}
        {!isLoading && !error && (
          <>
            {/* Tri */}
            <div className="mb-6 flex items-center justify-end gap-3">
              <span className="text-sm text-gray-600">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-black/20"
              >
                <option value="default">Par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Meilleures notes</option>
                <option value="name">Nom A-Z</option>
              </select>
            </div>

            {/* Grille produits */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
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
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('Tous');
                    setSortBy('default');
                    window.dispatchEvent(new Event('catalogue:reset'));
                  }}
                  className="mt-4 px-6 py-2 bg-green-100 text-green-700 font-medium rounded-full hover:bg-green-200 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Nombre de résultats */}
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
