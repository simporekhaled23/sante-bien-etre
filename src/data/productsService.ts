import { sanityClient, urlFor } from './sanity';
import type { Product } from './products';

// ==========================================
// TYPE DES PRODUITS SANITY (brut depuis l'API)
// ==========================================
interface SanityProduct {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  originalPrice?: number;
  currency: string;
  category: string;
  description: string;
  features: string[];
  image: any; // Objet image Sanity
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

// ==========================================
// TRANSFORMER : Sanity → Format de votre app
// ==========================================
const transformSanityProduct = (sanityProduct: SanityProduct, index: number): Product => {
  return {
    id: index + 1, // ID numérique pour compatibilité
    name: sanityProduct.name,
    slug: sanityProduct.slug.current,
    price: sanityProduct.price,
    originalPrice: sanityProduct.originalPrice,
    currency: sanityProduct.currency || 'FCFA',
    category: sanityProduct.category,
    description: sanityProduct.description,
    features: sanityProduct.features || [],
    // Image optimisée automatiquement (800px de large, format WebP)
    image: urlFor(sanityProduct.image).width(800).format('webp').url(),
    badge: sanityProduct.badge,
    rating: sanityProduct.rating,
    reviews: sanityProduct.reviews,
    inStock: sanityProduct.inStock,
  };
};

// ==========================================
// RÉCUPÉRER TOUS LES PRODUITS
// ==========================================
export async function fetchProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    originalPrice,
    currency,
    category,
    description,
    features,
    image,
    badge,
    rating,
    reviews,
    inStock
  }`;

  try {
    const products: SanityProduct[] = await sanityClient.fetch(query);
    return products.map(transformSanityProduct);
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
    return [];
  }
}

// ==========================================
// RÉCUPÉRER UN PRODUIT PAR SLUG
// ==========================================
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    originalPrice,
    currency,
    category,
    description,
    features,
    image,
    badge,
    rating,
    reviews,
    inStock
  }`;

  try {
    const product: SanityProduct | null = await sanityClient.fetch(query, { slug });
    return product ? transformSanityProduct(product, 0) : null;
  } catch (error) {
    console.error('Erreur lors du chargement du produit:', error);
    return null;
  }
}

// ==========================================
// RÉCUPÉRER PAR CATÉGORIE
// ==========================================
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  if (category === 'Tous') {
    return fetchProducts();
  }

  const query = `*[_type == "product" && category == $category] | order(_createdAt desc) {
    _id,
    name,
    slug,
    price,
    originalPrice,
    currency,
    category,
    description,
    features,
    image,
    badge,
    rating,
    reviews,
    inStock
  }`;

  try {
    const products: SanityProduct[] = await sanityClient.fetch(query, { category });
    return products.map(transformSanityProduct);
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
    return [];
  }
}