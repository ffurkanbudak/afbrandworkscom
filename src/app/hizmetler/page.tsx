import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Hizmetler · Marka Danışmanlığı ve Strateji',
  description:
    'Stratejik marka danışmanı Ahmet Furkan Budak’ın hizmetleri: marka stratejisi, konumlandırma, marka kimliği, marka yönetimi, pazarlama iletişimi, dijital markalaşma ve marka sağlığı analizi.',
  keywords: [
    'marka danışmanlığı',
    'marka stratejisi danışmanlığı',
    'stratejik marka danışmanı',
    'marka konumlandırma',
    'marka yönetimi',
    'kurumsal marka danışmanı',
    'Toganworks',
    'Ahmet Furkan Budak',
  ],
  alternates: { canonical: '/hizmetler' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/hizmetler`,
    title: 'Hizmetler · Marka Danışmanlığı ve Strateji',
    description:
      'Marka stratejisi, konumlandırma, kimlik, yönetim, pazarlama iletişimi ve dijital markalaşma danışmanlığı.',
  },
};

const SERVICES: { title: string; desc: string; href: string }[] = [
  {
    title: 'Marka Stratejisi',
    desc: 'Konumlandırma, farklılaşma ekseni, değer önerisi ve büyüme yönünü tanımlayan stratejik çerçeve.',
    href: '/marka-stratejisi',
  },
  {
    title: 'Marka Konumlandırma',
    desc: 'Kategorideki rekabet haritası, hedef kitle ve farklılaşma ekseniyle net bir konum cümlesi.',
    href: '/konumlandirma',
  },
  {
    title: 'Marka Kimliği ve İsimlendirme',
    desc: 'İsim, ses tonu, görsel sistem ve mesaj çerçevelerinin bütünlüklü kurgusu.',
    href: '/marka-kimligi',
  },
  {
    title: 'Marka Yönetimi',
    desc: 'Büyüme, değişim ve kriz dönemlerinde marka kimliğinin korunması ve günlük disiplin.',
    href: '/marka-yonetimi',
  },
  {
    title: 'Marka Mimarisi',
    desc: 'Branded House, House of Brands ve hibrit modeller arasında doğru yapının kurulması.',
    href: '/marka-mimarisi',
  },
  {
    title: 'Pazarlama İletişimi',
    desc: 'Bütünleşik pazarlama iletişimi: kanal stratejisi, mesaj hiyerarşisi ve ölçüm çerçevesi.',
    href: '/pazarlama-iletisimi',
  },
  {
    title: 'Dijital Markalaşma',
    desc: 'Dijital kanalların marka stratejisinin tutarlı bir yansımasına dönüşmesi.',
    href: '/dijital-markalasma',
  },
  {
    title: 'Marka Sağlığı ve Analiz',
    desc: 'Marka sağlık taraması, temel metrikler ve iyileştirme haritası.',
    href: '/marka-sagligi',
  },
  {
    title: 'Marka Farklılaşması',
    desc: 'Farklılaşma eksenleri, kanıt stratejisi ve sürdürülebilir ayrışma.',
    href: '/farklilasma',
  },
  {
    title: 'Marka Yenilemesi (Rebranding)',
    desc: 'Yeniden konumlandırma kararı, süreç adımları ve risk yönetimi.',
    href: '/marka-yenilemesi',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/hizmetler#service`,
  name: 'Ahmet Furkan Budak — Stratejik Marka Danışmanlığı',
  url: `${SITE_URL}/hizmetler`,
  description:
    'Marka stratejisi, konumlandırma, kimlik, yönetim, pazarlama iletişimi ve dijital markalaşma alanlarında stratejik marka danışmanlığı.',
  areaServed: ['Türkiye', 'Worldwide'],
  inLanguage: 'tr-TR',
  provider: { '@id': `${SITE_URL}/#person` },
  founder: { '@id': `${SITE_URL}/#person` },
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  serviceType: SERVICES.map((s) => s.title),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Marka Danışmanlığı Hizmetleri',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, url: `${SITE_URL}${s.href}` },
    })),
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${SITE_URL}/hizmetler` },
  ],
};

export default function HizmetlerPage() {
  return (
    <div className="fade-up pt-10 md:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex items-center gap-1.5 text-[12px]"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        <Link href="/" className="transition hover:underline">Anasayfa</Link>
        <span className="opacity-50">/</span>
        <span style={{ color: 'var(--fg)' }}>Hizmetler</span>
      </nav>

      <header className="max-w-[720px]">
        <p className="eyebrow">Hizmetler</p>
        <h1 className="font-display mt-3 text-[34px] leading-[1.05] tracking-tight md:text-[46px]">
          Stratejik Marka Danışmanlığı
        </h1>
        <p
          className="mt-5 max-w-[60ch] text-[17px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 68%, transparent)' }}
        >
          Marka konumlandırma, kimlik inşası, yönetim ve büyüme; uçtan uca
          stratejik danışmanlık. Her hizmet, ilgili kapsamlı rehbere bağlıdır.
          Kurumlar ve erken aşama girişimler için.
        </p>
      </header>

      <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <li key={s.href} className="group border-t pt-5" style={{ borderColor: 'var(--border)' }}>
            <Link href={s.href} className="block" style={{ color: 'var(--fg)' }}>
              <h2 className="font-display text-[19px] leading-[1.25] tracking-tight group-hover:underline">
                {s.title}
              </h2>
              <p
                className="mt-2.5 text-[14.5px] leading-[1.6]"
                style={{ color: 'color-mix(in oklab, var(--fg) 64%, transparent)' }}
              >
                {s.desc}
              </p>
              <span
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium"
                style={{ color: 'var(--fg)' }}
              >
                Detaylı rehber
                <ArrowUpRight className="h-[13px] w-[13px] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className="mt-16 flex flex-col items-start justify-between gap-4 rounded-[14px] border p-7 sm:flex-row sm:items-center"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
      >
        <div>
          <p className="font-display text-[20px] tracking-tight">Bir danışmanlık mı planlıyorsunuz?</p>
          <p className="mt-1.5 text-[14px]" style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}>
            Marka hedefinizi birkaç cümleyle paylaşın; doğrudan değerlendirelim.
          </p>
        </div>
        <Link
          href="/iletisim"
          className="btn-red inline-flex shrink-0 items-center gap-2 rounded-[8px] px-5 py-3 text-[13.5px] font-medium"
        >
          İletişime Geçin
          <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
        </Link>
      </div>
    </div>
  );
}
