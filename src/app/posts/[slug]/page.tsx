import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, Hash, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { db } from '@/lib/db';
import { getRelatedPosts } from '@/lib/related';
import { formatDateCaps } from '@/lib/format';
import { Newsletter } from '@/components/Newsletter';
import { FeaturedCard } from '@/components/FeaturedCard';
import { NewBadge } from '@/components/NewBadge';
import { ShareButtons } from '@/components/ShareButtons';
import { AuthorBio } from '@/components/AuthorBio';
import { ViewBeacon } from '@/components/ViewBeacon';
import { PostJsonLd } from '@/components/PostJsonLd';

const FALLBACK_AUTHOR = 'Ahmet Furkan Budak';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export async function generateStaticParams() {
  const posts = await db.post.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
    include: { author: true, tags: { include: { tag: true } } },
  });
  if (!post) return { title: 'Yazı bulunamadı' };

  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  const url = `${SITE_URL}/posts/${post.slug}`;
  const image = post.coverImageUrl
    ? post.coverImageUrl.startsWith('http')
      ? post.coverImageUrl
      : `${SITE_URL}${post.coverImageUrl.startsWith('/') ? '' : '/'}${post.coverImageUrl}`
    : `${SITE_URL}/ahmetfurkanbudak.jpeg`;
  const tagLabels = post.tags.map((t) => t.tag.labelTr);
  const authorName = post.author?.name ?? FALLBACK_AUTHOR;

  return {
    title,
    description,
    keywords: [...tagLabels, 'Ahmet Furkan Budak', 'markalaşma', 'marka stratejisi'],
    authors: [{ name: authorName, url: SITE_URL }],
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: 'Ahmet Furkan Budak',
      locale: 'tr_TR',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: (post.updatedAt ?? post.publishedAt)?.toISOString(),
      authors: [authorName],
      tags: tagLabels,
      section: tagLabels[0],
      images: [{ url: image, alt: post.coverImageAlt ?? post.title, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@afurkanbudak',
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
    include: { author: true, tags: { include: { tag: true } } },
  });
  if (!post || post.status !== 'PUBLISHED') return notFound();

  const [related, subscriberCount, latestPosts] = await Promise.all([
    getRelatedPosts(post.id, 3),
    db.subscriber.count({ where: { status: 'CONFIRMED' } }),
    db.post.findMany({
      where: { status: 'PUBLISHED', id: { not: post.id } },
      orderBy: { publishedAt: 'desc' },
      take: 6,
      include: { tags: { include: { tag: true } } },
    }),
  ]);

  const renderedHtml = post.contentHtml;
  const primaryTag = post.tags[0]?.tag;
  const shareUrl = `${SITE_URL}/posts/${post.slug}`;

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_240px] xl:gap-10">
      <article className="fade-up min-w-0 pt-8 md:pt-12">
      <PostJsonLd
        slug={post.slug}
        title={post.title}
        description={post.metaDescription ?? post.excerpt}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        coverImageUrl={post.coverImageUrl}
        authorName={post.author?.name ?? FALLBACK_AUTHOR}
        tags={post.tags.map((t) => ({ slug: t.tag.slug, labelTr: t.tag.labelTr }))}
        readingMinutes={post.readingMinutes}
      />
      <ViewBeacon slug={post.slug} />
      <nav
        aria-label="Breadcrumb"
        className="mx-auto mb-5 flex max-w-[720px] items-center gap-1.5 text-[12px]"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        <Link href="/" className="transition hover:underline">Anasayfa</Link>
        <span className="opacity-50">/</span>
        <Link href="/posts" className="transition hover:underline">Yazılar</Link>
        <span className="opacity-50">/</span>
        <span className="truncate" style={{ color: 'var(--fg)' }}>{post.title}</span>
      </nav>
      <header className="mx-auto max-w-[720px]">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          {primaryTag && (
            <Link
              href={`/posts?tag=${primaryTag.slug}`}
              className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.1em] uppercase transition hover:opacity-70"
              style={{ color: '#DC2626' }}
            >
              {primaryTag.labelTr}
            </Link>
          )}
          {primaryTag && <span className="opacity-30 text-[11px]">·</span>}
          <p
            className="text-[11px] font-medium tracking-[0.04em]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            {formatDateCaps(post.publishedAt)}
            <span className="mx-1.5 opacity-50">·</span>
            <span>{post.readingMinutes} dk okuma</span>
          </p>
          <NewBadge publishedAt={post.publishedAt} size="sm" />
        </div>

        <h1 className="font-display mt-4 text-[26px] leading-[1.08] tracking-tight md:text-[34px] lg:text-[38px]">
          {post.title}
        </h1>
        {post.subtitle && (
          <p
            className="mt-4 max-w-[62ch] text-[16.5px] font-light leading-[1.6]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              color: 'color-mix(in oklab, var(--fg) 62%, transparent)',
            }}
          >
            {post.subtitle}
          </p>
        )}

        <div
          className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2 border-t pt-5 text-[13px]"
          style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          <span
            className="relative inline-block h-8 w-8 overflow-hidden rounded-full"
            style={{ boxShadow: '0 0 0 1px color-mix(in oklab, var(--border) 80%, transparent)' }}
          >
            <Image
              src="/ahmetfurkanbudak.jpeg"
              alt={post.author?.name ?? FALLBACK_AUTHOR}
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          <span className="font-medium" style={{ color: 'var(--fg)' }}>
            {post.author?.name ?? FALLBACK_AUTHOR}
          </span>
          <span
            className="ml-auto inline-flex items-center gap-3"
            aria-label="Yazarın sosyal medya hesapları"
          >
            <a
              href="https://www.linkedin.com/in/ahmetfurkanbudak/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition hover:opacity-60"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              <Linkedin className="h-[15px] w-[15px]" strokeWidth={1.75} />
            </a>
            <a
              href="https://www.instagram.com/afbrandworks"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition hover:opacity-60"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              <Instagram className="h-[15px] w-[15px]" strokeWidth={1.75} />
            </a>
            <a
              href="https://x.com/afurkanbudakcom"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="transition hover:opacity-60"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              <Twitter className="h-[15px] w-[15px]" strokeWidth={1.75} />
            </a>
            <a
              href="https://www.youtube.com/@ahmetfurkanbudak"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="transition hover:opacity-60"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              <Youtube className="h-[15px] w-[15px]" strokeWidth={1.75} />
            </a>
          </span>
        </div>
      </header>

      {post.coverImageUrl && (
        <div
          className="relative mx-auto mt-8 aspect-[16/9] w-full max-w-[920px] overflow-hidden rounded-[8px]"
          style={{ background: 'var(--bg-soft)' }}
        >
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt ?? post.title}
            fill
            sizes="(min-width: 1024px) 920px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="post-body mx-auto mt-10 max-w-[720px] text-[16.5px] leading-[1.68] md:text-[17.5px]"
        style={{ color: 'var(--fg)' }}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />

      {post.tags.length > 1 && (
        <div className="mx-auto mt-12 flex max-w-[720px] flex-wrap gap-2.5">
          {post.tags.map(({ tag }) => (
            <Link
              key={tag.id}
              href={`/posts?tag=${tag.slug}`}
              className="inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[12px] font-medium tracking-tight transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
              style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
            >
              <Hash className="h-[11px] w-[11px] opacity-55" strokeWidth={1.75} />
              {tag.labelTr}
            </Link>
          ))}
        </div>
      )}

      <div className="mx-auto mt-12 max-w-[720px]">
        <ShareButtons url={shareUrl} title={post.title} />
      </div>

      <AuthorBio />

      <div
        className="mx-auto mt-16 max-w-[720px]"
        style={{ borderTop: '1px solid var(--border)' }}
      />

      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Okumaya devam et</p>
              <h2 className="font-display mt-3 text-[22px] leading-[1.12] tracking-tight md:text-[27px]">
                İlgili yazılar
              </h2>
            </div>
            <Link
              href="/posts"
              className="hidden shrink-0 items-center gap-1.5 text-[14px] font-medium md:inline-flex"
              style={{ color: 'var(--fg)' }}
            >
              Tümünü gör
              <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <FeaturedCard
                key={r.id}
                slug={r.slug}
                title={r.title}
                excerpt={r.excerpt}
                publishedAt={r.publishedAt}
                authorName={r.author?.name ?? FALLBACK_AUTHOR}
                coverImageUrl={r.coverImageUrl}
                coverImageAlt={r.coverImageAlt}
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-20">
        <Newsletter readerCount={Math.max(subscriberCount, 300)} />
      </section>
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-24 pt-8 md:pt-12">
          <p className="eyebrow">En Son Eklenenler</p>
          <ul className="mt-4 space-y-4">
            {latestPosts.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/posts/${p.slug}`}
                  className="group block"
                  style={{ color: 'var(--fg)' }}
                >
                  <div className="min-w-0">
                    <span
                      className="block text-[9.5px] font-semibold tracking-[0.1em] uppercase"
                      style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
                    >
                      {p.tags?.[0]?.tag.labelTr ?? formatDateCaps(p.publishedAt)}
                    </span>
                    <h3 className="font-display mt-1 line-clamp-3 text-[12.5px] leading-[1.3] tracking-tight group-hover:underline">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/posts"
            className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium"
            style={{ color: 'var(--fg)' }}
          >
            Tüm yazılar
            <ArrowRight className="h-[11px] w-[11px]" strokeWidth={2.25} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
