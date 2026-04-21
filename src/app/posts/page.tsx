import Link from 'next/link';
import { db } from '@/lib/db';
import { PostListItem } from '@/components/PostListItem';
import { TopicsInline } from '@/components/TopicRow';
import { Newsletter } from '@/components/Newsletter';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tüm Yazılar · Markalaşma Günlüğü',
  description:
    'Konumlandırma, farklılaşma, marka kimliği, iletişim ve sürdürülebilir büyüme üzerine günlük markalaşma yazıları. Ahmet Furkan Budak arşivi.',
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
      'Günlük markalaşma yazıları. Konumlandırma, farklılaşma, marka kimliği ve büyüme.',
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

  return (
    <div className="fade-up pt-10 md:pt-16">
      <section className="max-w-[62ch]">
        <p className="eyebrow">Arşiv</p>
        <h1 className="font-display mt-3 text-[36px] leading-[1.04] tracking-tight md:text-[48px] lg:text-[56px]">
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
