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

  const [related, subscriberCount] = await Promise.all([
    getRelatedPosts(post.id, 3),
    db.subscriber.count({ where: { status: 'CONFIRMED' } }),
  ]);

  const renderedHtml = post.contentHtml;
  const primaryTag = post.tags[0]?.tag;
  const shareUrl = `${SITE_URL}/posts/${post.slug}`;

  return (
    <article className="fade-up pt-8 md:pt-12">
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
      <header className="mx-auto max-w-[720px]">
        <div className="flex flex-wrap items-center gap-2.5">
          {primaryTag && (
            <Link
              href={`/posts?tag=${primaryTag.slug}`}
              className="inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-[3px] text-[10px] font-semibold tracking-[0.12em] uppercase transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              <Hash className="h-[10px] w-[10px] opacity-65" strokeWidth={2} />
              {primaryTag.labelTr}
            </Link>
          )}
          <NewBadge publishedAt={post.publishedAt} size="sm" />
          <p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            {formatDateCaps(post.publishedAt)}
            <span className="mx-2 opacity-60">/</span>
            <span>{post.readingMinutes} dk okuma</span>
          </p>
        </div>

        <h1 className="font-display mt-5 text-[30px] leading-[1.08] tracking-tight md:text-[40px] lg:text-[46px]">
          {post.title}
        </h1>
        {post.subtitle && (
          <p
            className="mt-5 max-w-[62ch] text-[18px] leading-[1.5]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            {post.subtitle}
          </p>
        )}

        <div
          className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          <span
            className="relative inline-block h-9 w-9 overflow-hidden rounded-[4px]"
            style={{ boxShadow: '0 0 0 1px color-mix(in oklab, var(--border) 80%, transparent)' }}
          >
            <Image
              src="/ahmetfurkanbudak.jpeg"
              alt={post.author?.name ?? FALLBACK_AUTHOR}
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span style={{ color: 'var(--fg)' }}>
            {post.author?.name ?? FALLBACK_AUTHOR}
          </span>
          <span className="opacity-40">·</span>
          <span>{formatDateCaps(post.publishedAt)}</span>
          <span
            className="ml-1 inline-flex items-center gap-0.5"
            aria-label="Yazarın sosyal medya hesapları"
          >
            <a
              href="https://www.linkedin.com/in/ahmetfurkanbudak/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-7 w-7 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
            >
              <Linkedin className="h-[13px] w-[13px]" strokeWidth={1.75} />
            </a>
            <a
              href="https://www.instagram.com/afbrandworks"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-7 w-7 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
            >
              <Instagram className="h-[13px] w-[13px]" strokeWidth={1.75} />
            </a>
            <a
              href="https://x.com/afurkanbudakcom"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="flex h-7 w-7 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
            >
              <Twitter className="h-[13px] w-[13px]" strokeWidth={1.75} />
            </a>
            <a
              href="https://www.youtube.com/@ahmetfurkanbudak"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex h-7 w-7 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
            >
              <Youtube className="h-[13px] w-[13px]" strokeWidth={1.75} />
            </a>
          </span>
        </div>
      </header>

      {post.coverImageUrl && (
        <div
          className="relative mx-auto mt-8 w-full max-w-[920px] overflow-hidden rounded-[8px] h-[260px] sm:h-[320px] md:h-[440px] lg:h-[520px]"
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
        className="post-body mx-auto mt-10 max-w-[720px] text-[18px] leading-[1.78] md:text-[19px]"
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
              <h2 className="font-display mt-3 text-[26px] leading-[1.12] tracking-tight md:text-[32px]">
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
  );
}
