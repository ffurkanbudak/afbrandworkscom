import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';
import { ArticleRowCard } from '@/components/ArticleRowCard';
import { HeroArticle } from '@/components/HeroArticle';
import { FeaturedCard } from '@/components/FeaturedCard';
import { PostListItem } from '@/components/PostListItem';
import { Newsletter } from '@/components/Newsletter';
import { TopicsInline } from '@/components/TopicRow';
import { MarketTicker } from '@/components/MarketTicker';
import { NewsTicker } from '@/components/NewsTicker';
import { CommunityStrip } from '@/components/CommunityStrip';
import { HomeNewsGrid } from '@/components/HomeNewsGrid';

const AUTHOR = 'Ahmet Furkan Budak';

export default async function HomePage() {
  const [topRow, heroPost, spotlight, recent, topics, subscriberCount, latestNews] = await Promise.all([
    db.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      include: { author: true, tags: { include: { tag: true } } },
      take: 8,
    }),
    db.post.findFirst({
      where: { status: 'PUBLISHED', featured: true },
      orderBy: { publishedAt: 'desc' },
      include: { author: true, tags: { include: { tag: true } } },
    }),
    db.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      include: { author: true },
      take: 12,
    }),
    db.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      include: { author: true },
      skip: 6,
      take: 4,
    }),
    db.tag.findMany({ orderBy: { order: 'asc' }, take: 8 }),
    db.subscriber.count({ where: { status: 'CONFIRMED' } }),
    db.newsItem.findMany({
      where: { status: 'APPROVED' },
      orderBy: [{ approvedAt: 'desc' }, { publishedAt: 'desc' }],
      include: { source: true },
      take: 4,
    }),
  ]);

  const hero = heroPost ?? topRow[0] ?? null;

  return (
    <div className="fade-up pt-6 md:pt-10">
      <div className="-mx-6 md:-mx-10 lg:-mx-14">
        <NewsTicker />
        <MarketTicker />
      </div>

      {topRow.length > 0 && (
        <section
          className="py-8"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="-mx-6 md:-mx-10 lg:-mx-14">
            <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 md:px-10 lg:px-14">
              {topRow.map((p) => (
                <div
                  key={p.id}
                  className="w-[78%] flex-shrink-0 snap-start md:w-[calc((100%-48px)/3)]"
                >
                  <ArticleRowCard
                    slug={p.slug}
                    title={p.title}
                    publishedAt={p.publishedAt}
                    authorName={p.author?.name ?? AUTHOR}
                    coverImageUrl={p.coverImageUrl}
                    coverImageAlt={p.coverImageAlt}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hero && (
        <section className="mt-10">
          <HeroArticle
            slug={hero.slug}
            title={hero.title}
            publishedAt={hero.publishedAt}
            authorName={hero.author?.name ?? AUTHOR}
            coverImageUrl={hero.coverImageUrl}
            coverImageAlt={hero.coverImageAlt}
            excerpt={hero.subtitle ?? hero.excerpt}
            primaryTag={('tags' in hero && hero.tags?.[0]?.tag.labelTr) || undefined}
          />
        </section>
      )}

      <section className="mt-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Bu hafta öne çıkanlar</p>
            <h2 className="font-display mt-3 text-[26px] leading-[1.12] tracking-tight md:text-[32px]">
              Markaya dair okumaya değer notlar
            </h2>
          </div>
          <Link
            href="/posts"
            className="hidden shrink-0 items-center gap-1.5 text-[14px] font-medium md:inline-flex"
            style={{ color: 'var(--fg)' }}
          >
            Tüm yazılar
            <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
          </Link>
        </div>

        {spotlight.length > 0 && (
          <div className="mt-10 -mx-6 md:-mx-10 lg:-mx-14">
            <div className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-6 md:px-10 lg:px-14">
              {spotlight.map((p) => (
                <div
                  key={p.id}
                  className="w-[82%] flex-shrink-0 snap-start sm:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)]"
                >
                  <FeaturedCard
                    slug={p.slug}
                    title={p.title}
                    excerpt={p.excerpt}
                    publishedAt={p.publishedAt}
                    authorName={p.author?.name ?? AUTHOR}
                    coverImageUrl={p.coverImageUrl}
                    coverImageAlt={p.coverImageAlt}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <HomeNewsGrid items={latestNews} />

      <section className="mt-20">
        <Newsletter readerCount={Math.max(subscriberCount, 300)} />
      </section>

      <CommunityStrip />

      {recent.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Günün günlükleri</p>
              <h2 className="font-display mt-3 text-[26px] leading-[1.12] tracking-tight md:text-[32px]">
                Son yayımlanan yazılar
              </h2>
            </div>
            <Link
              href="/posts"
              className="hidden shrink-0 items-center gap-1.5 text-[14px] font-medium md:inline-flex"
              style={{ color: 'var(--fg)' }}
            >
              Tüm arşiv
              <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
            </Link>
          </div>

          <div className="mt-8">
            {recent.map((p) => (
              <PostListItem
                key={p.id}
                slug={p.slug}
                title={p.title}
                excerpt={p.excerpt}
                publishedAt={p.publishedAt}
                authorName={p.author?.name ?? AUTHOR}
                coverImageUrl={p.coverImageUrl}
                coverImageAlt={p.coverImageAlt}
              />
            ))}
          </div>
        </section>
      )}

      {topics.length > 0 && (
        <section className="mt-20">
          <p className="eyebrow">Konular</p>
          <h2 className="font-display mt-3 text-[26px] leading-[1.12] tracking-tight md:text-[32px]">
            Markalaşmanın farklı katmanları
          </h2>
          <p
            className="mt-4 max-w-[56ch] text-[15px] leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
          >
            Konumlandırmadan farklılaşmaya, büyüme mimarisinden marka iletişimine
            her kategori kendi içinde bir çerçeve sunuyor.
          </p>
          <div className="mt-6">
            <TopicsInline topics={topics} />
          </div>
        </section>
      )}
    </div>
  );
}
