import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Marka Stratejisi · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Marka Stratejisi',
    title: 'Konumlandırma, farklılaşma, değer önerisi.',
    subtitle: 'Stratejinin tanımı, bileşenleri, kurulma süreci ve yaygın hatalar.',
  });
}
