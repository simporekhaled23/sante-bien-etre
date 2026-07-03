import { useState } from 'react';
import { Star, ShoppingBag, Plus, Minus, Check, ExternalLink, ImageOff } from 'lucide-react';
import type { Product } from '../data/products';
import { generateWhatsAppLink } from '../data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

// Simple sanitizer for XSS protection
function sanitizeText(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleOrder = () => {
    const link = generateWhatsAppLink(product, quantity);
    // Ouvre WhatsApp dans un nouvel onglet
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-green-200/30 transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-50 animate-pulse" />
        )}
        
        {imgError ? (
          // Placeholder quand l'image n'est pas disponible
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center text-green-600">
            <ImageOff className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-xs text-center px-4 opacity-70">Image à ajouter</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={sanitizeText(product.name)}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
              product.badge === 'Best-seller'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                : product.badge === 'Nouveau'
                ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white'
                : product.badge === 'Promo'
                ? 'bg-gradient-to-r from-rose-400 to-rose-600 text-white'
                : product.badge === 'Luxe'
                ? 'bg-gradient-to-r from-green-600 to-teal-700 text-white'
                : product.badge === 'Exclusif'
                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-300'
                : 'bg-gradient-to-r from-green-400 to-emerald-600 text-white'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Discount */}
        {discountPercent > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2.5 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-full shadow-lg">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Quick view button on hover */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-white/90 backdrop-blur-sm text-gray-800 font-medium text-sm rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white shadow-lg"
        >
          {showDetails ? 'Masquer' : 'Aperçu rapide'}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Category */}
        <span className="text-xs font-semibold text-green-500 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="mt-1.5 text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-200 fill-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews} avis)</span>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Expandable details */}
        <div className={`overflow-hidden transition-all duration-500 ${showDetails ? 'max-h-48 mt-4' : 'max-h-0'}`}>
          <div className="space-y-2">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {product.price.toLocaleString('fr-FR')} {product.currency}
          </span>
          {product.originalPrice && (
            <span className="text-base text-gray-400 line-through mb-0.5">
              {product.originalPrice.toLocaleString('fr-FR')} {product.currency}
            </span>
          )}
        </div>

        {/* Quantity & Order */}
        <div className="mt-5 space-y-3">
          {/* Quantity selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Quantité :</span>
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-40"
                aria-label="Diminuer la quantité"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-4 py-1 text-sm font-bold text-gray-900 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-40"
                aria-label="Augmenter la quantité"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Order button */}
          <button
            onClick={handleOrder}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-green-300/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShoppingBag className="w-5 h-5" />
            Commander via WhatsApp
            <ExternalLink className="w-4 h-4 opacity-70" />
          </button>

          {/* Total */}
          {quantity > 1 && (
            <p className="text-center text-sm text-gray-500">
              Total : <span className="font-bold text-green-700">{(product.price * quantity).toLocaleString('fr-FR')} {product.currency}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
