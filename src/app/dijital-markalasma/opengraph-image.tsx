import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Dijital Markalaşma · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Dijital Markalaşma',
    title: 'Dijital kanallar markanın yansımasıdır.',
    subtitle: 'Web, sosyal medya, arama, bülten ve uygulamanın marka rolü.',
  });
}
