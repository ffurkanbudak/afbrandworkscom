import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { ArticleRowCard } from '@/components/ArticleRowCard';
import { HeroArticle } from '@/components/HeroArticle';
import { PostListItem } from '@/components/PostListItem';
import { HomeJsonLd } from '@/components/HomeJsonLd';
import { HomeHero } from '@/components/HomeHero';
import { HomeAbout } from '@/components/HomeAbout';
import { MarkaMasasiHero } from './1-1/MarkaMasasiHero';
import { MarkaMasasiIcerik } from './1-1/MarkaMasasiIcerik';

const AUTHOR = 'Ahmet Furkan Budak';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const HOME_TITLE = 'Ahmet Furkan Budak | Marka • Pazarlama • İletişim';
const HOME_DESCRIPTION =
  "Türkiye'nin stratejik marka danışmanı ve Toganworks Stratejik Marka Danışmanlığı Ofisi kurucusu Ahmet Furkan Budak'ın resmi kişisel web sitesi. Markalaşma, marka yönetimi, pazarlama, kurumsal iletişim ve iş dünyasına yönelik stratejik analizler ile özgün içerikler.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Ahmet Furkan Budak',
    locale: 'tr_TR',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: '/afbn.png',
        width: 1200,
        height: 630,
        alt: 'Ahmet Furkan Budak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: '/afbn.png',
        width: 1200,
        height: 630,
        alt: 'Ahmet Furkan Budak',
      },
    ],
    creator: '@afurkanbudak',
  },
};

export default async function HomePage() {
  // Veritabanı yoksa (ör. DATABASE_URL tanımsız yerel ortam) sayfa çökmez;
  // yazı bölümleri gizlenir, geri kalan içerik yine görünür.
  const [topRow, heroPost, spotlight, recent] = await Promise.all([
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
      include: { author: true, tags: { include: { tag: true } } },
      take: 12,
    }),
    db.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      include: { author: true, tags: { include: { tag: true } } },
      skip: 6,
      take: 4,
    }),
  ]).catch(() => [[], null, [], []] as const);

  const hero = heroPost ?? topRow[0] ?? null;

  return (
    <div className="fade-up">
      <HomeJsonLd
        featured={spotlight.slice(0, 10).map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          publishedAt: p.publishedAt,
          coverImageUrl: p.coverImageUrl,
        }))}
      />

      <HomeHero />

      <HomeAbout />

      <MarkaMasasiHero headingAs="h2" gorselBaslik />
      <MarkaMasasiIcerik />

      {topRow.length > 0 && (
        <section
          className="pt-16 pb-6"
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
                    primaryTag={p.tags?.[0]?.tag.labelTr}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hero && (
        <section className="mt-8">
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

      {recent.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Günün günlükleri</p>
              <h2
                className="font-display mt-3 text-[22px] leading-[1.12] tracking-tight md:text-[27px]"
                style={{ fontWeight: 800 }}
              >
                Son yayımlanan yazılar
              </h2>
            </div>
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
                primaryTag={p.tags?.[0]?.tag.labelTr}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
