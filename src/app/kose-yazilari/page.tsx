import type { Metadata } from 'next';
import { ArrowUpRight, Newspaper } from 'lucide-react';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Köşe Yazılarım · Marka ve Türk Dünyası',
  description:
    'Ahmet Furkan Budak’ın çeşitli platformlarda yayımlanan köşe yazıları: Türk dünyası, ülke markası, marka gücü, girişimcilik ve stratejik markalaşma üzerine.',
  alternates: { canonical: '/kose-yazilari' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/kose-yazilari`,
    title: 'Köşe Yazılarım · Ahmet Furkan Budak',
    description: 'Türk dünyası ve markalaşma üzerine köşe yazıları.',
  },
};

type Article = { title: string; summary: string; image: string; url: string };

const ARTICLES: Article[] = [
  {
    title: 'NATO Ankara Zirvesi: Diplomasi, İtibar ve Ülke Markası',
    summary:
      'NATO Ankara Zirvesi; Türkiye’nin uluslararası itibarı, yatırım ortamı ve “Made in Türkiye” algısı açısından stratejik bir önem taşıyor.',
    image:
      'https://images.tarihistan.org/media/2026/06/nato-ankara-zirvesi-diplomasi-itibar-ve-ulke-markasi_6a4147b9771f2.png',
    url: 'https://www.tarihistan.org/yazarlar/ahmet-furkan-budak/nato-ankara-zirvesi-diplomasi-itibar-ve-ulke-markasi/39969',
  },
  {
    title: 'Türk Dünyasının Geleceğinde Marka Gücünün Stratejik Rolü',
    summary:
      'Türk dünyası küresel ekonomide daha güçlü bir rol üstlenmeye hazırlanıyor. Bu rolün kalıcı olmasında güçlü markalar neden belirleyici?',
    image:
      'https://images.tarihistan.org/media/2026/06/turk-dunyasinin-geleceginde-marka-gucunun-stratejik-rolu_6a3d4ad03db6e.png',
    url: 'https://www.tarihistan.org/yazarlar/ahmet-furkan-budak/turk-dunyasinin-geleceginde-marka-gucunun-stratejik-rolu/39958',
  },
  {
    title: 'Türk Dünyasının Dijital Geleceği ve DEPA',
    summary:
      'DEPA’nın Resmî Gazete’de yayımlanması, Türk dünyasında ortak kalkınma açısından stratejik bir adım olarak öne çıkıyor.',
    image:
      'https://images.tarihistan.org/media/2026/06/turk-dunyasinin-dijital-gelecegi-ve-depa_6a3c0240ccf07.png',
    url: 'https://www.tarihistan.org/yazarlar/ahmet-furkan-budak/turk-dunyasinin-dijital-gelecegi-ve-depa/39953',
  },
  {
    title: 'Türk Dünyasında Girişimcilik ve Ortak Kalkınma',
    summary:
      'Yeni ekonomik dengeler, ortak kalkınma vizyonu ve Türk dünyasının stratejik fırsatları üzerine bir değerlendirme.',
    image:
      'https://images.tarihistan.org/media/2026/06/turk-dunyasinda-girisimcilik-ve-ortak-kalkinma_6a3d532dd3f55.png',
    url: 'https://www.tarihistan.org/yazarlar/ahmet-furkan-budak/turk-dunyasinda-girisimcilik-ve-ortak-kalkinma/39927',
  },
  {
    title: 'Türk Dünyasının Anlatı Sermayesi ve Markalaşma',
    summary:
      'Türk dünyasının binlerce yıllık anlatı mirası, küresel markaların en güçlü sermayesi olabilir. Peki bu kültürel hafıza neden hâlâ marka değerine dönüşmedi?',
    image:
      'https://images.tarihistan.org/media/2026/06/turk-dunyasinin-anlati-sermayesi-ve-markalasma_6a26d2f6eae3b_sc.png',
    url: 'https://www.tarihistan.org/yazarlar/ahmet-furkan-budak/turk-dunyasinin-anlati-sermayesi-ve-markalasma/39878',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Ahmet Furkan Budak — Köşe Yazıları',
  itemListElement: ARTICLES.map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'NewsArticle',
      headline: a.title,
      image: a.image,
      url: a.url,
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@type': 'Organization', name: 'Tarihistan', url: 'https://www.tarihistan.org' },
      isAccessibleForFree: true,
    },
  })),
};

export default function BasindaPage() {
  return (
    <div className="fade-up pt-10 md:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="max-w-[720px]">
        <p className="eyebrow">Köşe Yazıları</p>
        <h1 className="font-display mt-3 text-[34px] leading-[1.05] tracking-tight md:text-[46px]">
          Köşe Yazılarım
        </h1>
        <p
          className="mt-4 max-w-[60ch] text-[16px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 66%, transparent)' }}
        >
          Çeşitli platformlarda yayımlanan yazılarım. Türk dünyası, ülke markası,
          marka gücü, girişimcilik ve stratejik markalaşma üzerine. Her yazı, ilk
          yayımlandığı kaynakta okunabilir.
        </p>
      </header>

      <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a) => (
          <li key={a.url}>
            <a href={a.url} target="_blank" rel="noopener" className="group block" style={{ color: 'var(--fg)' }}>
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] border"
                style={{ borderColor: 'var(--border)', background: 'color-mix(in oklab, var(--fg) 5%, transparent)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em]"
                style={{ color: 'color-mix(in oklab, var(--fg) 52%, transparent)' }}
              >
                <Newspaper className="h-[12px] w-[12px]" strokeWidth={2} />
                tarihistan.org
              </p>
              <h2 className="font-display mt-1.5 text-[18px] leading-[1.25] tracking-tight group-hover:underline">
                {a.title}
              </h2>
              <p
                className="mt-2 line-clamp-3 text-[14px] leading-[1.55]"
                style={{ color: 'color-mix(in oklab, var(--fg) 64%, transparent)' }}
              >
                {a.summary}
              </p>
              <span
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium"
                style={{ color: 'var(--fg)' }}
              >
                Tarihistan’da oku
                <ArrowUpRight className="h-[13px] w-[13px] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p
        className="mt-10 text-[12.5px]"
        style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
      >
        Yukarıdaki yazılar ilk olarak ilgili platformlarda yayımlanmıştır; tüm hakları
        ilgili yayına ve yazara aittir. Görseller kaynak yayından alınmıştır.
      </p>
    </div>
  );
}
