import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À Propos', href: '#histoire' },
  { label: 'Catalogue', href: '#catalogue' },
  { label: 'Témoignages', href: '#temoignages' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-green-200/20 border-b border-green-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              scrolled
                ? 'bg-gradient-to-br from-green-500 to-emerald-700'
                : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Leaf className={`w-5 h-5 transition-colors ${
                scrolled ? 'text-white' : 'text-white'
              }`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg md:text-xl font-serif font-bold tracking-wide transition-colors duration-300 leading-tight ${
                scrolled ? 'text-green-800' : 'text-white'
              }`}>
                Santé & Bien être
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  scrolled
                    ? 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                    : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#catalogue"
              className="ml-3 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-700 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-green-300/50 transition-all duration-300 hover:scale-105"
            >
              Nos Produits
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              scrolled
                ? 'text-green-700 hover:bg-green-50'
                : 'text-white hover:bg-white/15'
            }`}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-green-100 shadow-xl px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-green-50 hover:text-green-700 transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#catalogue"
            onClick={handleLinkClick}
            className="block mt-3 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-700 text-white text-center font-semibold rounded-xl"
          >
            Découvrir les Produits
          </a>
        </div>
      </div>
    </nav>
  );
}
