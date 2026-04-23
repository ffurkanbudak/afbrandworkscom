import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Marka Yenilemesi · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Marka Yenilemesi',
    title: 'Rebranding, logoyu değil stratejinin yansımasını yeniden kurar.',
    subtitle: 'Tetikleyiciler, türler, süreç, lansman ve ölçüm çerçevesi.',
  });
}
