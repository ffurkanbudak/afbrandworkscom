const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

type FeaturedPost = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: Date | null;
  coverImageUrl?: string | null;
};

export function HomeJsonLd({ featured }: { featured: FeaturedPost[] }) {
  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Ahmet Furkan Budak · Stratejik Marka Danışmanı',
    description:
      'Konumlandırma, farklılaşma ve sürdürülebilir büyüme üzerine günlük markalaşma yazıları.',
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
    primaryImageOfPage: `${SITE_URL}/ahmetfurkanbudak.jpeg`,
  };

  const siteNav = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#sitenav`,
    name: 'Site Gezinmesi',
    itemListElement: [
      { '@type': 'SiteNavigationElement', position: 1, name: 'Ana Sayfa', url: SITE_URL },
      { '@type': 'SiteNavigationElement', position: 2, name: 'Yazılar', url: `${SITE_URL}/posts` },
      { '@type': 'SiteNavigationElement', position: 3, name: 'Gündem', url: `${SITE_URL}/gundem` },
      { '@type': 'SiteNavigationElement', position: 4, name: 'Konular', url: `${SITE_URL}/konular` },
      { '@type': 'SiteNavigationElement', position: 5, name: 'Öneriler', url: `${SITE_URL}/oneriler` },
      { '@type': 'SiteNavigationElement', position: 6, name: 'Hakkında', url: `${SITE_URL}/hakkinda` },
      { '@type': 'SiteNavigationElement', position: 7, name: 'İletişim', url: `${SITE_URL}/iletisim` },
    ],
  };

  const featuredList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#featured`,
    name: 'Öne Çıkan Markalaşma Yazıları',
    numberOfItems: featured.length,
    itemListElement: featured.slice(0, 10).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/posts/${p.slug}`,
      name: p.title,
    })),
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Marka Danışmanlığı · Ahmet Furkan Budak',
    provider: { '@id': `${SITE_URL}/#person` },
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Türkiye' },
      { '@type': 'Place', name: 'Küresel' },
    ],
    serviceType: 'Stratejik Marka Danışmanlığı',
    description:
      'Stratejik marka danışmanlığı: konumlandırma, farklılaşma, marka kimliği ve sürdürülebilir büyüme.',
    url: SITE_URL,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Marka Danışmanlığı Hizmetleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Konumlandırma Stratejisi',
            description: 'Markanın rakipler arasında sahipleneceği net ve savunulabilir yerin tanımlanması.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marka Kimliği ve İsimlendirme',
            description: 'İsim, ton, sözel ve görsel kimliğin kurgulanması.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marka İletişimi ve Mesaj Mimarisi',
            description: 'Mesaj hiyerarşisi, ton ve kanal bazında iletişim çerçevesi.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sürdürülebilir Büyüme Danışmanlığı',
            description: 'Marka sermayesini uzun vadede büyütecek karar mimarisi.',
          },
        },
      ],
    },
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [collectionPage, siteNav, featuredList, service],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
