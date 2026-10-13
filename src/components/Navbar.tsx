import { useState, useEffect } from 'react';
import { Search, X, Leaf } from 'lucide-react';
import { categories, type Category } from '../data/products';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('Tous');

  // Envoie le filtre au Catalogue
  const broadcast = (c: Category, q: string) => {
    window.dispatchEvent(
      new CustomEvent('catalogue:filter', { detail: { category: c, query: q } })
    );
  };

  // Le Catalogue peut demander de tout réinitialiser
  useEffect(() => {
    const onReset = () => {
      setQuery('');
      setCategory('Tous');
    };
    window.addEventListener('catalogue:reset', onReset);
    return () => window.removeEventListener('catalogue:reset', onReset);
  }, []);

  const handleQuery = (value: string) => {
    setQuery(value);
    broadcast(category, value);
  };

  const handleCategory = (c: Category) => {
    setCategory(c);
    broadcast(c, query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rangée 1 : logo + recherche */}
        <div className="flex items-center gap-3 sm:gap-6 h-16 md:h-20">
          <a href="#catalogue" className="flex items-center gap-2 shrink-0" aria-label="Santé & Bien être">
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:block text-lg md:text-xl font-serif font-bold tracking-wide text-green-800 leading-tight">
              Santé & Bien être
            </span>
          </a>

          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => handleQuery(e.target.value.replace(/[<>{}]/g, ''))}
              placeholder="Rechercher un produit..."
              maxLength={100}
              className="w-full h-11 pl-5 pr-12 rounded-full bg-gray-100 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
            {query ? (
              <button
                onClick={() => handleQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                aria-label="Effacer la recherche"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Rangée 2 : catégories */}
        <nav
          aria-label="Catégories"
          className="flex gap-1 overflow-x-auto pb-2 md:pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleCategory(c)}
              className={`shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm uppercase tracking-wide transition-colors ${
                category === c ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
              }`}
            >
              {c}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
