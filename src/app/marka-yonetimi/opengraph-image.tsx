import { renderPillarOg, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-pillar';

export const runtime = 'nodejs';
export const alt = 'Marka Yönetimi · Afbrandworks';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPillarOg({
    eyebrow: 'Marka Yönetimi',
    title: 'Stratejinin günlük uygulamaya dönüştüğü disiplin.',
    subtitle: 'Tutarlılık, sağlık ölçümü, mimari, genişleme ve kriz.',
  });
}
