import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Marka Sağlığı · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Marka Sağlığı',
    title: 'Satış verisinin arkasındaki zihinsel altyapı.',
    subtitle: 'Farkındalık, hatırlanma, tercih, NPS ve sağlık taraması.',
  });
}
