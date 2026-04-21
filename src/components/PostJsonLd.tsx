const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://afbrandworks.com';

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
}: Props) {
  const url = `${SITE_URL}/posts/${slug}`;
  const image = coverImageUrl
    ? coverImageUrl.startsWith('http')
      ? coverImageUrl
      : `${SITE_URL}${coverImageUrl.startsWith('/') ? '' : '/'}${coverImageUrl}`
    : `${SITE_URL}/ahmetfurkanbudak.jpeg`;

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
