import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Check,
  Compass,
  Crosshair,
  Fingerprint,
  ShieldCheck,
  Building2,
  Megaphone,
  Smartphone,
  Activity,
  Sparkles,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';

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

const SERVICES: { title: string; desc: string; href: string; icon: LucideIcon; points: string[] }[] = [
  {
    title: 'Marka Stratejisi',
    desc: 'Konumlandırma, farklılaşma ekseni, değer önerisi ve büyüme yönünü tanımlayan stratejik çerçeve.',
    href: '/marka-stratejisi',
    icon: Compass,
    points: ['Konumlandırma ve farklılaşma ekseni', 'Değer önerisi çerçevesi', 'Büyüme yönü ve önceliklendirme'],
  },
  {
    title: 'Marka Konumlandırma',
    desc: 'Kategorideki rekabet haritası, hedef kitle ve farklılaşma ekseniyle net bir konum cümlesi.',
    href: '/konumlandirma',
    icon: Crosshair,
    points: ['Kategori rekabet haritası', 'Hedef kitle tanımı', 'Net konum cümlesi'],
  },
  {
    title: 'Marka Kimliği ve İsimlendirme',
    desc: 'İsim, ses tonu, görsel sistem ve mesaj çerçevelerinin bütünlüklü kurgusu.',
    href: '/marka-kimligi',
    icon: Fingerprint,
    points: ['İsim ve ses tonu geliştirme', 'Görsel sistem çerçevesi', 'Mesaj mimarisi'],
  },
  {
    title: 'Marka Yönetimi',
    desc: 'Büyüme, değişim ve kriz dönemlerinde marka kimliğinin korunması ve günlük disiplin.',
    href: '/marka-yonetimi',
    icon: ShieldCheck,
    points: ['Günlük marka disiplini', 'Değişim ve kriz yönetimi', 'Tutarlılık denetimi'],
  },
  {
    title: 'Marka Mimarisi',
    desc: 'Branded House, House of Brands ve hibrit modeller arasında doğru yapının kurulması.',
    href: '/marka-mimarisi',
    icon: Building2,
    points: ['Branded House / House of Brands analizi', 'Portföy yapılandırması', 'Hibrit model tasarımı'],
  },
  {
    title: 'Pazarlama İletişimi',
    desc: 'Bütünleşik pazarlama iletişimi: kanal stratejisi, mesaj hiyerarşisi ve ölçüm çerçevesi.',
    href: '/pazarlama-iletisimi',
    icon: Megaphone,
    points: ['Kanal stratejisi', 'Mesaj hiyerarşisi', 'Ölçüm ve performans çerçevesi'],
  },
  {
    title: 'Dijital Markalaşma',
    desc: 'Dijital kanalların marka stratejisinin tutarlı bir yansımasına dönüşmesi.',
    href: '/dijital-markalasma',
    icon: Smartphone,
    points: ['Dijital kanal tutarlılığı', 'İçerik ve ses tonu uyarlaması', 'Deneyim haritalaması'],
  },
  {
    title: 'Marka Sağlığı ve Analiz',
    desc: 'Marka sağlık taraması, temel metrikler ve iyileştirme haritası.',
    href: '/marka-sagligi',
    icon: Activity,
    points: ['Marka sağlık taraması', 'Temel metrik analizi', 'İyileştirme yol haritası'],
  },
  {
    title: 'Marka Farklılaşması',
    desc: 'Farklılaşma eksenleri, kanıt stratejisi ve sürdürülebilir ayrışma.',
    href: '/farklilasma',
    icon: Sparkles,
    points: ['Farklılaşma ekseni tespiti', 'Kanıt stratejisi', 'Sürdürülebilir ayrışma planı'],
  },
  {
    title: 'Marka Yenilemesi (Rebranding)',
    desc: 'Yeniden konumlandırma kararı, süreç adımları ve risk yönetimi.',
    href: '/marka-yenilemesi',
    icon: RefreshCw,
    points: ['Yeniden konumlandırma kararı', 'Süreç adımları', 'Risk yönetimi'],
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
        <h1 className="font-display mt-3 text-[28px] leading-[1.05] tracking-tight md:text-[38px]">
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

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <li
              key={s.href}
              className="group h-full rounded-2xl border p-7"
              style={{ borderColor: 'var(--border)' }}
            >
              <Link href={s.href} className="flex h-full flex-col" style={{ color: 'var(--fg)' }}>
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{ background: '#FFFFFF', borderColor: 'var(--border)' }}
                >
                  <Icon className="h-[22px] w-[22px]" style={{ color: '#DC2626' }} strokeWidth={1.75} />
                </div>

                <h2
                  className="font-display mt-5 text-[19px] leading-[1.25] tracking-tight group-hover:underline"
                  style={{ fontWeight: 700 }}
                >
                  {s.title}
                </h2>
                <p
                  className="mt-2.5 text-[14.5px] leading-[1.6]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 64%, transparent)' }}
                >
                  {s.desc}
                </p>

                <ul className="mt-5 flex-1 space-y-2">
                  {s.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#DC2626' }} strokeWidth={2.25} />
                      <span
                        className="text-[13.5px] leading-[1.5]"
                        style={{ color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        className="mt-16 flex flex-col items-start justify-between gap-4 rounded-[14px] border p-7 sm:flex-row sm:items-center"
        style={{ borderColor: 'var(--border)', background: '#FFFFFF' }}
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
