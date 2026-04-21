import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ahmet Furkan Budak · Markalaşma Günlüğü',
    short_name: 'Ahmet Furkan Budak',
    description:
      'Stratejik marka danışmanı Ahmet Furkan Budak. Konumlandırma, farklılaşma ve sürdürülebilir büyüme üzerine günlük markalaşma yazıları.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    orientation: 'portrait',
    lang: 'tr',
    icons: [
      {
        src: '/afbrandworks-mark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/ahmetfurkanbudak.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
