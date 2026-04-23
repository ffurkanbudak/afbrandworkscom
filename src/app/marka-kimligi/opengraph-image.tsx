import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Marka Kimliği · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Marka Kimliği',
    title: 'Stratejinin görünür ve işitilir hâli.',
    subtitle: 'Logo, tipografi, renk, ses tonu, görsel sistem ve marka kitabı.',
  });
}
