import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Marka Konumlandırma · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Marka Konumlandırma',
    title: 'Markanın zihinsel rafta tuttuğu yer.',
    subtitle: 'Kategori, hedef kitle, farklılaşma ekseni ve konumlandırma cümlesi.',
  });
}
