import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Marka Farklılaşması · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Marka Farklılaşması',
    title: 'Rakipten ayrışma ekseni ve kanıt stratejisi.',
    subtitle: 'Fiyat, kalite, hız, deneyim, uzmanlık, kimlik ve değerler ekseni.',
  });
}
