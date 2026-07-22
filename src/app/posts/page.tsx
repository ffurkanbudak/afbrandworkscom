import Link from 'next/link';
import { db } from '@/lib/db';
import { PostListItem } from '@/components/PostListItem';
import { TopicsInline } from '@/components/TopicRow';
import { Newsletter } from '@/components/Newsletter';

import type { Metadata } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Tüm Yazılar · Markalaşma Günlüğü',
  description:
    'Günlük markalaşma yazıları: konumlandırma, farklılaşma, marka kimliği, iletişim ve sürdürülebilir büyüme. Ahmet Furkan Budak arşivi.',
  keywords: [
    'markalaşma yazıları',
    'marka blogu',
    'marka stratejisi blog',
    'Ahmet Furkan Budak yazıları',
    'konumlandırma',
    'farklılaşma',
  ],
  alternates: { canonical: '/posts' },
  openGraph: {
    type: 'website',
    url: '/posts',
    title: 'Tüm Yazılar · Markalaşma Günlüğü',
    description:
      'Günlük markalaşma yazıları. Konumlandırma, farklılaşma, marka kimliği, büyüme.',
  },
};

type SearchParams = { tag?: string };

const FALLBACK_AUTHOR = 'Ahmet Furkan Budak';

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { tag } = await searchParams;

  const [posts, tags, subscriberCount, activeTag] = await Promise.all([
    db.post.findMany({
      where: {
        status: 'PUBLISHED',
        ...(tag ? { tags: { some: { tag: { slug: tag } } } } : {}),
      },
      orderBy: { publishedAt: 'desc' },
      include: { author: true },
    }),
    db.tag.findMany({ orderBy: { order: 'asc' } }),
    db.subscriber.count({ where: { status: 'CONFIRMED' } }),
    tag ? db.tag.findUnique({ where: { slug: tag } }) : Promise.resolve(null),
  ]);

  const collectionUrl = tag ? `${SITE_URL}/posts?tag=${tag}` : `${SITE_URL}/posts`;
  const collectionName = activeTag
    ? `${activeTag.labelTr} · Yazılar`
    : 'Tüm Yazılar · Markalaşma Günlüğü';

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${collectionUrl}#collection`,
    url: collectionUrl,
    name: collectionName,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    hasPart: posts.slice(0, 20).map((p) => ({
      '@type': 'BlogPosting',
      '@id': `${SITE_URL}/posts/${p.slug}#article`,
      headline: p.title,
      url: `${SITE_URL}/posts/${p.slug}`,
      datePublished: p.publishedAt?.toISOString(),
      author: { '@id': `${SITE_URL}/#person` },
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/posts/${p.slug}`,
      name: p.title,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Yazılar', item: `${SITE_URL}/posts` },
      ...(activeTag
        ? [{ '@type': 'ListItem', position: 3, name: activeTag.labelTr, item: collectionUrl }]
        : []),
    ],
  };

  return (
    <div className="fade-up pt-10 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="max-w-[62ch]">
        <p className="eyebrow">Arşiv</p>
        <h1 className="font-display mt-3 text-[30px] leading-[1.04] tracking-tight md:text-[40px] lg:text-[46px]">
          {activeTag ? activeTag.labelTr : 'Tüm yazılar'}
        </h1>
        <p
          className="mt-5 text-[17px] leading-[1.6]"
          style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
        >
          {activeTag
            ? `${activeTag.labelTr} başlığı altında yayımlanmış tüm yazılar. Strateji notları, saha gözlemleri ve yöntem denemeleri.`
            : 'Konumlandırma, farklılaşma, marka mimarisi ve sürdürülebilir büyüme üzerine yayımlanmış tüm yazılar.'}
        </p>
      </section>

      <section className="mt-10">
        {tag && (
          <div className="mb-5">
            <Link
              href="/posts"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium"
              style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
            >
              ← Tüm konulara dön
            </Link>
          </div>
        )}
        <TopicsInline topics={tags} />
      </section>

      <section className="mt-14">
        {posts.length === 0 ? (
          <p
            className="text-[16px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
          >
            Bu konuda henüz yayımlanmış yazı yok.
          </p>
        ) : (
          <div>
            {posts.map((p) => (
              <PostListItem
                key={p.id}
                slug={p.slug}
                title={p.title}
                excerpt={p.excerpt}
                publishedAt={p.publishedAt}
                authorName={p.author?.name ?? FALLBACK_AUTHOR}
                coverImageUrl={p.coverImageUrl}
                coverImageAlt={p.coverImageAlt}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-20">
        <Newsletter readerCount={Math.max(subscriberCount, 300)} />
      </section>
    </div>
  );
}
