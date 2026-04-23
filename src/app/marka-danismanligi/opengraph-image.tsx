import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Marka Danışmanlığı · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Marka Danışmanlığı',
    title: 'Stratejik marka danışmanlığı.',
    subtitle: 'Konumlandırma, kimlik, iletişim ve sürdürülebilir büyüme.',
  });
}
