import type { Varlik } from '@/lib/entity-links';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

type Props = {
  slug: string;
  title: string;
  description: string;
  publishedAt?: Date | null;
  updatedAt?: Date | null;
  coverImageUrl?: string | null;
  authorName?: string;
  tags?: { slug: string; labelTr: string }[];
  readingMinutes?: number;
  /** Gövde metninde bağlanan kavramlar; about/mentions bunlardan üretilir. */
  varliklar?: Varlik[];
};

export function PostJsonLd({
  slug,
  title,
  description,
  publishedAt,
  updatedAt,
  coverImageUrl,
  authorName = 'Ahmet Furkan Budak',
  tags,
  readingMinutes,
  varliklar = [],
}: Props) {
  const url = `${SITE_URL}/posts/${slug}`;
  const image = coverImageUrl
    ? coverImageUrl.startsWith('http')
      ? coverImageUrl
      : `${SITE_URL}${coverImageUrl.startsWith('/') ? '' : '/'}${coverImageUrl}`
    : `${SITE_URL}/ahmetfurkanbudak.jpeg`;

  // Metinde bağlanan kavramlar makine tarafından okunabilir varlık referanslarına
  // çevrilir: ilki yazının konusu (about), kalanlar değinilen kavramlar (mentions).
  const varlikDugumu = (v: Varlik) => ({
    '@type': 'Thing',
    '@id': `${SITE_URL}${v.href}`,
    name: v.ad,
    url: `${SITE_URL}${v.href}`,
  });
  // Yazının konusu olarak, metinde ilk geçen kavram yerine bir pillar sayfası
  // varsa o seçilir; sözlük girdileri kavramın kendisinden çok yan referanstır.
  const sirali = [...varliklar].sort(
    (a, b) => Number(a.href.startsWith('/sozluk')) - Number(b.href.startsWith('/sozluk')),
  );
  const about = sirali.slice(0, 1).map(varlikDugumu);
  const mentions = sirali.slice(1).map(varlikDugumu);

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: title,
    description,
    url,
    image: [image],
    datePublished: publishedAt?.toISOString(),
    dateModified: (updatedAt ?? publishedAt)?.toISOString(),
    inLanguage: 'tr-TR',
    isAccessibleForFree: true,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Ahmet Furkan Budak',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/afbrandworks.svg` },
    },
    about: about.length ? about : undefined,
    mentions: mentions.length ? mentions : undefined,
    keywords: tags?.map((t) => t.labelTr).join(', '),
    articleSection: tags?.[0]?.labelTr,
    timeRequired: readingMinutes ? `PT${readingMinutes}M` : undefined,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Yazılar', item: `${SITE_URL}/posts` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
