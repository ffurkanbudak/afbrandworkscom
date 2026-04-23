import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Marka Mimarisi · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Marka Mimarisi',
    title: 'Portföydeki markaların birbiriyle konuşma biçimi.',
    subtitle: 'Branded House, House of Brands, Endorsed Brand ve hibrit yapılar.',
  });
}
