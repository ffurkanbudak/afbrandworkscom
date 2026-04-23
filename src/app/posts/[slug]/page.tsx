import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, Hash } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { getRelatedPosts } from '@/lib/related';
import { formatDateCaps } from '@/lib/format';
import { truncateHtmlByParagraphs } from '@/lib/truncateHtml';
import { Newsletter } from '@/components/Newsletter';
import { FeaturedCard } from '@/components/FeaturedCard';
import { NewBadge } from '@/components/NewBadge';
import { PostActions } from '@/components/PostActions';
import { ViewBeacon } from '@/components/ViewBeacon';
import { Comments } from '@/components/Comments';
import { PostJsonLd } from '@/components/PostJsonLd';
import { Paywall } from '@/components/Paywall';

const FALLBACK_AUTHOR = 'Ahmet Furkan Budak';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

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

  const cookieStore = await cookies();
  const [related, subscriberCount, { userId }] = await Promise.all([
    getRelatedPosts(post.id, 3),
    db.subscriber.count({ where: { status: 'CONFIRMED' } }),
    auth(),
  ]);

  let isSubscribed = false;
  if (userId) {
    const admin = await db.admin.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });
    if (admin) {
      isSubscribed = true;
    } else {
      const sub = await db.subscriber.findUnique({
        where: { clerkId: userId },
        select: { status: true },
      });
      if (sub?.status === 'CONFIRMED') isSubscribed = true;
    }
  }
  if (!isSubscribed) {
    const cookieToken = cookieStore.get('sub_token')?.value;
    if (cookieToken) {
      const sub = await db.subscriber.findUnique({
        where: { unsubscribeToken: cookieToken },
        select: { status: true },
      });
      if (sub?.status === 'CONFIRMED') isSubscribed = true;
    }
  }

  const { truncated: renderedHtml, wasCut } = isSubscribed
    ? { truncated: post.contentHtml, wasCut: false }
    : truncateHtmlByParagraphs(post.contentHtml, 2);

  const primaryTag = post.tags[0]?.tag;

  return (
    <article className="fade-up pt-10 md:pt-16">
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
      <header className="mx-auto max-w-[780px]">
        <div className="flex flex-wrap items-center gap-3">
          {primaryTag && (
            <Link
              href={`/posts?tag=${primaryTag.slug}`}
              className="inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.08em] uppercase transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              <Hash className="h-[11px] w-[11px] opacity-65" strokeWidth={2} />
              {primaryTag.labelTr}
            </Link>
          )}
          <NewBadge publishedAt={post.publishedAt} size="md" />
          <p
            className="text-[12px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            {formatDateCaps(post.publishedAt)}
            <span className="mx-2 opacity-60">/</span>
            <span>{post.readingMinutes} dk okuma</span>
          </p>
        </div>

        <h1 className="font-display mt-6 text-[34px] leading-[1.05] tracking-tight md:text-[48px] lg:text-[56px]">
          {post.title}
        </h1>
        {post.subtitle && (
          <p
            className="mt-6 max-w-[62ch] text-[19px] leading-[1.5]"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            {post.subtitle}
          </p>
        )}

        <div
          className="mt-8 flex items-center gap-3 text-[13px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          <Image
            src="/ahmetfurkanbudak.jpeg"
            alt={post.author?.name ?? FALLBACK_AUTHOR}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span style={{ color: 'var(--fg)' }}>
            {post.author?.name ?? FALLBACK_AUTHOR}
          </span>
          <span className="opacity-40">·</span>
          <span>{formatDateCaps(post.publishedAt)}</span>
        </div>
      </header>

      {post.coverImageUrl && (
        <div
          className="relative mx-auto mt-12 aspect-[16/9] w-full overflow-hidden rounded-[10px]"
          style={{ background: 'var(--bg-soft)' }}
        >
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt ?? post.title}
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="post-body mx-auto mt-12 max-w-[680px] text-[18px] leading-[1.75]"
        style={{ color: 'var(--fg)' }}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />

      {wasCut && <Paywall />}

      {post.tags.length > 1 && (
        <div className="mx-auto mt-12 flex max-w-[680px] flex-wrap gap-2.5">
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

      <PostActions
        slug={post.slug}
        title={post.title}
        initialLikes={post.likeCount}
        initialFavorites={post.favoriteCount}
        initialShares={post.shareCount}
        isSignedIn={!!userId}
      />

      <div className="mx-auto mt-16 max-w-[680px]">
        <Comments
          listUrl={`/api/posts/${post.slug}/comments`}
          deleteUrlBase="/api/posts/comments"
          signInRedirect={`/posts/${post.slug}`}
          isSignedIn={!!userId}
        />
      </div>

      <div
        className="mx-auto mt-16 max-w-[680px]"
        style={{ borderTop: '1px solid var(--border)' }}
      />

      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Okumaya devam et</p>
              <h2 className="font-display mt-3 text-[32px] leading-[1.08] tracking-tight md:text-[40px]">
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
