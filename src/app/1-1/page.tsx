import type { Metadata } from 'next';
import { NavDrawer } from './NavDrawer';
import { MarkaMasasiHero } from './MarkaMasasiHero';
import { MarkaMasasiIcerik } from './MarkaMasasiIcerik';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: '1:1 Marka Danışmanlığı',
  description:
    'Markanızla ilgili önemli kararları birlikte değerlendirdiğimiz, düzenli olarak bir araya geldiğimiz birebir görüşmeler. Ayda yalnızca 5 yeni danışan kabul edilmektedir.',
  alternates: { canonical: '/1-1' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/1-1`,
    title: '1:1 Marka Danışmanlığı · Ahmet Furkan Budak',
    description: 'Markanızla ilgili önemli kararları birlikte değerlendirdiğimiz birebir görüşmeler.',
  },
};

export default function OneOnOnePage() {
  return (
    <>
      {/* Yan menü, giriş animasyonlu sarmalayıcının dışında durur: animasyon
          sarmalayıcıya bir transform bıraktığı için içindeki fixed panelin
          kapsayıcı bloğu viewport yerine sayfanın tamamı oluyordu. */}
      <NavDrawer />

      <div className="fade-in min-h-dvh" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
        <MarkaMasasiHero />

        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14">
          <MarkaMasasiIcerik />
        </div>
      </div>
    </>
  );
}
