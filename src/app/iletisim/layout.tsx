import type { Metadata } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'İletişim · Ahmet Furkan Budak',
  description:
    'Ahmet Furkan Budak ile iletişim. Marka danışmanlığı, işbirliği, medya talepleri ve sorularınız için iletişim formu ve sosyal medya kanalları.',
  keywords: ['iletişim', 'ahmet furkan budak iletişim', 'marka danışmanı iletişim', 'marka danışmanlığı başvuru'],
  alternates: { canonical: '/iletisim' },
  openGraph: {
    type: 'website',
    url: '/iletisim',
    title: 'İletişim · Ahmet Furkan Budak',
    description: 'Marka danışmanlığı, işbirliği ve medya talepleri.',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/iletisim#contactpage`,
  url: `${SITE_URL}/iletisim`,
  name: 'İletişim · Ahmet Furkan Budak',
  description:
    'Marka danışmanlığı, işbirliği ve medya talepleri için iletişim formu ve sosyal medya kanalları.',
  inLanguage: 'tr-TR',
  isPartOf: { '@id': `${SITE_URL}#website` },
  about: {
    '@type': 'Person',
    name: 'Ahmet Furkan Budak',
    url: `${SITE_URL}/hakkinda`,
  },
  mainEntity: {
    '@type': 'Person',
    name: 'Ahmet Furkan Budak',
    jobTitle: 'Stratejik Marka Danışmanı',
    email: 'info@afbrandworks.com',
    url: `${SITE_URL}/hakkinda`,
    worksFor: { '@type': 'Organization', name: 'Toganworks' },
    sameAs: [
      'https://www.linkedin.com/in/ahmetfurkanbudak/',
      'https://www.instagram.com/afbrandworks',
      'https://x.com/afurkanbudakcom',
      'https://www.youtube.com/@ahmetfurkanbudak',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@afbrandworks.com',
      availableLanguage: ['Turkish', 'English'],
      areaServed: 'Worldwide',
    },
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'İletişim', item: `${SITE_URL}/iletisim` },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  );
}
