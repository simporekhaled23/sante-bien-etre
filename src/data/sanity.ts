import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ==========================================
// CLIENT SANITY (connexion à l'API)
// ==========================================
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
});

// ==========================================
// GÉNÉRATEUR D'URLS D'IMAGES OPTIMISÉES
// ==========================================
const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};