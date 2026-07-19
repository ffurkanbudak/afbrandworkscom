const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

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
      'Stratejik marka danışmanı ve Toganworks kurucusu. Konumlandırma, farklılaşma ve sürdürülebilir büyüme üzerine yazar.',
    email: 'mailto:info@toganworks.com',
    nationality: { '@type': 'Country', name: 'Türkiye' },
    knowsLanguage: ['tr', 'en'],
    knowsAbout: [
      'Marka Stratejisi',
      'Marka Danışmanlığı',
      'Marka Konumlandırma',
      'Marka Kimliği',
      'Marka Yönetimi',
      'Marka Mimarisi',
      'Marka Farklılaşması',
      'Marka Sağlığı',
      'Marka Hikayesi',
      'Marka Yenilemesi (Rebranding)',
      'Dijital Markalaşma',
      'Pazarlama İletişimi',
      'Bütünleşik Pazarlama İletişimi',
      'Stratejik Pazarlama',
      'Tüketici İçgörüsü',
      'Sürdürülebilir Büyüme',
      'Farklılaşma',
      'Değer Önerisi',
      'İsimlendirme',
      'Marka Arketipi',
      'Marka Sesi',
      'Kadın Girişimciliği',
      'Startup Markalaşması',
      'Satış Psikolojisi',
      'Kriz İletişimi',
    ],
    brand: [
      {
        '@type': 'Brand',
        name: 'Toganworks',
        url: 'https://toganworks.com',
        description: 'Stratejik marka danışmanlığı ofisi.',
      },
      {
        '@type': 'Brand',
        name: 'Afbrandworks',
        url: SITE_URL,
        description: 'Ahmet Furkan Budak’ın kişisel markası; marka, pazarlama ve strateji yayını.',
      },
    ],
    memberOf: [
      { '@type': 'Organization', name: 'PMI Türkiye Chapter' },
      { '@type': 'Organization', name: 'İstinye Garage Incubation Hub' },
      { '@type': 'Organization', name: 'THK & Orion TEKMER' },
    ],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'İstinye Üniversitesi' },
      { '@type': 'CollegeOrUniversity', name: 'Piri Reis Üniversitesi' },
      { '@type': 'CollegeOrUniversity', name: 'IESE Business School' },
      { '@type': 'CollegeOrUniversity', name: 'IE Business School' },
      { '@type': 'CollegeOrUniversity', name: 'University of Illinois Urbana-Champaign' },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certificate',
        name: 'Marketing: Customer Needs and Wants',
        recognizedBy: { '@type': 'Organization', name: 'IESE Business School' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certificate',
        name: 'Brand and Product Management',
        recognizedBy: { '@type': 'Organization', name: 'IE Business School' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certificate',
        name: 'Global Marketing: Building Iconic Brands',
        recognizedBy: { '@type': 'Organization', name: 'University of Illinois Urbana-Champaign' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certificate',
        name: 'Certified Associate Project Management (CAPM)',
        recognizedBy: { '@type': 'Organization', name: 'PMI Türkiye Chapter' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certificate',
        name: 'Innovation Arising From the User',
        recognizedBy: { '@type': 'Organization', name: 'Massachusetts Institute of Technology' },
      },
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
      'https://x.com/afurkanbudakcom',
      'https://www.instagram.com/afbrandworks',
      'https://www.youtube.com/@ahmetfurkanbudak',
      'https://medium.com/@ahmetfurkanbudak',
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
      'https://x.com/afurkanbudakcom',
      'https://www.instagram.com/afbrandworks',
      'https://www.youtube.com/@ahmetfurkanbudak',
      'https://medium.com/@ahmetfurkanbudak',
    ],
    areaServed: [
      { '@type': 'Country', name: 'Türkiye' },
      { '@type': 'Place', name: 'Avrupa' },
      { '@type': 'Place', name: 'Orta Doğu' },
    ],
    knowsAbout: [
      'Marka Stratejisi',
      'Marka Konumlandırma',
      'Marka Kimliği',
      'Marka Yönetimi',
      'Dijital Markalaşma',
      'Pazarlama İletişimi',
      'Marka Sağlığı',
      'Startup Markalaşması',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@toganworks.com',
      telephone: '+905374349566',
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

  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Marka Danışmanlığı — Ahmet Furkan Budak',
    alternateName: [
      'Stratejik Marka Danışmanlığı',
      'Marka Stratejisi Danışmanlığı',
      'Marka Yönetimi Danışmanlığı',
    ],
    description:
      'Erken aşama girişimciler, kurucular ve ölçeklenen markalar için konumlandırma, marka kimliği, iletişim stratejisi ve sürdürülebilir büyüme üzerine stratejik marka danışmanlığı.',
    serviceType: 'Marka Stratejisi ve Konumlandırma Danışmanlığı',
    provider: { '@id': `${SITE_URL}/#person` },
    areaServed: [
      { '@type': 'Country', name: 'Türkiye' },
      { '@type': 'Place', name: 'Avrupa' },
      { '@type': 'Place', name: 'Orta Doğu' },
    ],
    url: SITE_URL,
    image: `${SITE_URL}/ahmetfurkanbudak.jpeg`,
    logo: `${SITE_URL}/afbrandworks.svg`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Marka Danışmanlığı Hizmetleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marka Konumlandırma',
            description:
              'Markanın zihinde tuttuğu rafı tanımlayan stratejik konumlandırma çerçevesi.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marka Kimliği ve İsimlendirme',
            description:
              'İsim, ses tonu, görsel kimlik ve mesaj çerçeveleri üzerine uçtan uca yapılandırma.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pazarlama İletişimi Stratejisi',
            description:
              'Kanal seçiminden mesaj hiyerarşisine, kampanya ekseninden içerik çerçevesine iletişim planı.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Marka Sağlık Analizi',
            description:
              'Konumlandırma, kimlik ve iletişim düzlemlerinde mevcut markanın durum tespiti ve iyileştirme haritası.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kadın Girişimci Markalaşma Programı',
            description:
              'Kadın kurucular için markalaşma odaklı mentörlük programı.',
          },
        },
      ],
    },
    knowsAbout: [
      'Marka Stratejisi',
      'Marka Konumlandırma',
      'Marka Kimliği',
      'Marka Yönetimi',
      'Dijital Markalaşma',
      'Pazarlama İletişimi',
      'Startup Markalaşması',
    ],
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [person, organization, website, blog, service],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
