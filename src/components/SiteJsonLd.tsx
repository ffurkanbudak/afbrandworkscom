const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

export function SiteJsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Ahmet Furkan Budak',
    givenName: 'Ahmet Furkan',
    familyName: 'Budak',
    url: SITE_URL,
    image: `${SITE_URL}/ahmetfurkanbudak.jpeg`,
    jobTitle: 'Stratejik Marka Danışmanı',
    description:
      'Stratejik marka danışmanı. Toganworks, Afbrandworks ve Marka İnisiyatifi kurucusu. Konumlandırma, farklılaşma ve sürdürülebilir büyüme üzerine yazar.',
    email: 'mailto:ffurkanbudak@gmail.com',
    nationality: { '@type': 'Country', name: 'Türkiye' },
    knowsLanguage: ['tr', 'en'],
    knowsAbout: [
      'Marka Stratejisi',
      'Marka Konumlandırma',
      'Marka Kimliği',
      'Pazarlama İletişimi',
      'Sürdürülebilir Büyüme',
      'Farklılaşma',
      'Tüketici İçgörüsü',
      'İsimlendirme',
    ],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'İstinye Üniversitesi' },
      { '@type': 'CollegeOrUniversity', name: 'Piri Reis Üniversitesi' },
    ],
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#toganworks`,
      name: 'Toganworks',
      url: 'https://toganworks.com',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Stratejik Marka Danışmanı',
      occupationalCategory: 'Marketing and Brand Strategy',
      skills: [
        'Marka Stratejisi',
        'Konumlandırma',
        'Marka Kimliği',
        'İsimlendirme',
        'Pazarlama İletişimi',
        'Büyüme Stratejisi',
      ],
    },
    subjectOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
    sameAs: [
      'https://www.linkedin.com/in/ahmetfurkanbudak/',
      'https://twitter.com/afurkanbudak',
      'https://x.com/afurkanbudakcom',
      'https://www.instagram.com/afurkanbudak/',
      'https://github.com/ffurkanbudak',
      'https://toganworks.com',
    ],
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Ahmet Furkan Budak',
    alternateName: ['Afbrandworks', 'afbrandworks.com'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/afbrandworks.svg`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/ahmetfurkanbudak.jpeg`,
    founder: { '@id': `${SITE_URL}/#person` },
    description:
      'Ahmet Furkan Budak\'ın kişisel marka platformu; strateji, markalaşma ve iletişim üzerine yazılar ve küresel marka haberleri.',
    sameAs: [
      'https://www.linkedin.com/in/ahmetfurkanbudak/',
      'https://twitter.com/afurkanbudak',
      'https://www.instagram.com/afurkanbudak/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'ffurkanbudak@gmail.com',
      availableLanguage: ['Turkish', 'English'],
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Ahmet Furkan Budak',
    description:
      'Konumlandırma, farklılaşma ve sürdürülebilir büyüme üzerine günlük markalaşma yazıları; küresel marka haberleri.',
    inLanguage: 'tr-TR',
    publisher: { '@id': `${SITE_URL}/#organization` },
    author: { '@id': `${SITE_URL}/#person` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/posts?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const blog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/#blog`,
    url: `${SITE_URL}/posts`,
    name: 'Markalaşma Günlüğü',
    description:
      'Konumlandırma, farklılaşma ve sürdürülebilir büyüme üzerine günlük markalaşma yazıları.',
    inLanguage: 'tr-TR',
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [person, organization, website, blog],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
