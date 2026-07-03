// ==========================================
// TYPES
// ==========================================
export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

// ==========================================
// CATÉGORIES
// ==========================================
export const categories = [
  "Tous",
  "Soins Visage",
  "Soins Corps",
  "Maquillage",
  "Parfums",
  "Compléments Alimentaires",
] as const;

export type Category = (typeof categories)[number];

// ==========================================
// WHATSAPP
// ==========================================
// Numéro WhatsApp au format international (sans le +)
export const WHATSAPP_NUMBER = "22670274866";

export function generateWhatsAppLink(product: Product, quantity: number = 1): string {
  const totalPrice = product.price * quantity;
  
  // Message formaté pour WhatsApp
  const message = 
    `✨ Bonjour Santé & Bien être !\n\n` +
    `Je souhaite commander :\n\n` +
    `🛍️ Produit : ${product.name}\n` +
    `💰 Prix unitaire : ${product.price.toLocaleString('fr-FR')} ${product.currency}\n` +
    `📦 Quantité : ${quantity}\n` +
    `💳 Total : ${totalPrice.toLocaleString('fr-FR')} ${product.currency}\n\n` +
    `Merci de me confirmer la disponibilité et les modalités de livraison. 🙏`;
  
  // Encodage du message pour URL
  const encodedMessage = encodeURIComponent(message);
  
  // Utilisation de wa.me qui fonctionne sur mobile et desktop
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}