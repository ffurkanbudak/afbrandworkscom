import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Pazarlama İletişimi · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Pazarlama İletişimi',
    title: 'Tüm kanalların aynı şarkıyı söylemesi.',
    subtitle: 'Bütünleşik pazarlama iletişimi, kanal karması ve ölçüm çerçevesi.',
  });
}
