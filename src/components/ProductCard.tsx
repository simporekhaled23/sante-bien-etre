import { useState } from 'react';
import { Star, ShoppingBag, Plus, Minus, Check, ImageOff } from 'lucide-react';
import type { Product } from '../data/products';
import { generateWhatsAppLink } from '../data/products';

interface ProductCardProps {
  product: Product;
  index: number;
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
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}

        {imgError ? (
          <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center text-gray-400">
            <ImageOff className="w-8 h-8 mb-1 opacity-60" />
            <span className="text-[10px] text-center px-2">Image à ajouter</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        {/* Badge (haut gauche) */}
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide bg-gray-900 text-white">
            {product.badge}
          </span>
        )}

        {/* Remise (coin haut droit, style My Origines) */}
        {discountPercent > 0 && (
          <span className="absolute top-0 right-0 z-10 px-2.5 py-1.5 bg-gray-900 text-white text-xs sm:text-sm font-bold rounded-bl-2xl">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        {/* Catégorie */}
        <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Nom : seul élément en vert */}
        <h3 className="mt-1 text-sm sm:text-base font-bold text-green-700 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Note */}
        <div className="mt-1.5 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium text-black">{product.rating}</span>
          <span className="hidden sm:inline text-xs text-gray-500">({product.reviews} avis)</span>
        </div>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-black line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Détails (aperçu rapide) */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-2 self-start text-xs text-gray-600 underline underline-offset-2 hover:text-black"
        >
          {showDetails ? 'Masquer les détails' : 'Voir les détails'}
        </button>
        <div className={`overflow-hidden transition-all duration-500 ${showDetails ? 'max-h-48 mt-2' : 'max-h-0'}`}>
          <div className="space-y-1.5">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-black">
                <Check className="w-4 h-4 text-black flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prix */}
        <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
          <span className="text-base sm:text-lg font-bold text-black">
            {product.price.toLocaleString('fr-FR')} {product.currency}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              {product.originalPrice.toLocaleString('fr-FR')} {product.currency}
            </span>
          )}
        </div>

        {/* Quantité + bouton (poussés en bas pour aligner les cartes) */}
        <div className="mt-auto pt-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="hidden sm:inline text-xs font-medium text-black">Quantité</span>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mx-auto sm:mx-0">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-1.5 hover:bg-gray-100 transition-colors disabled:opacity-40"
                aria-label="Diminuer la quantité"
              >
                <Minus className="w-3.5 h-3.5 text-black" />
              </button>
              <span className="px-3 text-sm font-bold text-black min-w-[32px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                className="p-1.5 hover:bg-gray-100 transition-colors disabled:opacity-40"
                aria-label="Augmenter la quantité"
              >
                <Plus className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>

          {/* Bouton Commander : style My Origines */}
          <button
            onClick={handleOrder}
            title="Commander via WhatsApp"
            className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-black text-white text-xs sm:text-sm font-medium uppercase tracking-wide rounded-md hover:bg-gray-800 transition-colors active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            Commander
          </button>

          {quantity > 1 && (
            <p className="text-center text-xs text-black">
              Total : <span className="font-bold">{(product.price * quantity).toLocaleString('fr-FR')} {product.currency}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
