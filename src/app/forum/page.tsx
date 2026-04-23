import type { Metadata } from 'next';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import { db } from '@/lib/db';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { SponsorWidget } from '@/components/SponsorWidget';
import { NewsTicker } from '@/components/NewsTicker';
import { MarketTicker } from '@/components/MarketTicker';
import { CommunityStrip } from '@/components/CommunityStrip';
import { TagFilter } from './_components/TagFilter';
import { PostCard, type ForumPostRow } from './_components/PostCard';
import { GuestGate } from './_components/GuestGate';
import { MockChatterFeed } from './_components/MockChatterFeed';

export const metadata: Metadata = {
  title: 'Forum · Afbrandworks',
  description:
    'Markalaşma, pazarlama, girişimcilik ve iletişim üzerine topluluk sohbetleri.',
  alternates: { canonical: '/forum' },
};

export const dynamic = 'force-dynamic';

const GUEST_SNIPPET_LIMIT = 8;

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const viewer = await getCurrentSubscriber();
  const isGuest = !viewer;

  const tags = await db.forumTag.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, slug: true, label: true },
  });
  const activeTag = tag ? tags.find((t) => t.slug === tag) ?? null : null;

  const now = new Date();
  const publishedOrMine = [
    { status: 'PUBLISHED' as const, publishAt: { lte: now } },
    ...(viewer ? [{ authorId: viewer.id }] : []),
  ];

  const posts = await db.forumPost.findMany({
    where: {
      ...(activeTag ? { tagId: activeTag.id } : {}),
      OR: publishedOrMine,
    },
    orderBy: { publishAt: 'desc' },
    take: isGuest ? GUEST_SNIPPET_LIMIT : 60,
    include: {
      tag: { select: { slug: true, label: true } },
      author: {
        select: { firstName: true, name: true, avatarUrl: true, plan: true },
      },
    },
  });

  const rows: ForumPostRow[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    body: p.body,
    tagLabel: p.tag.label,
    tagSlug: p.tag.slug,
    replyCount: p.replyCount,
    publishAt: p.publishAt,
    createdAt: p.createdAt,
    author: p.author,
  }));

  const canPost = !!viewer;

  return (
    <div className="fade-up pt-4 md:pt-6">
      <div className="-mx-6 md:-mx-10 lg:-mx-14">
        <NewsTicker />
        <MarketTicker />
      </div>

      <div className="mt-8 mb-6 flex justify-center md:mt-10 md:mb-8">
        <SponsorWidget />
      </div>

      <header className="mx-auto max-w-[760px] text-center">
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Forum
        </p>
        <h1 className="font-display mt-4 text-[36px] leading-[1.05] tracking-tight md:text-[46px]">
          Markalaşma üzerine topluluk sohbeti.
        </h1>
        <p
          className="mx-auto mt-5 max-w-[58ch] text-[15px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          Konular belirli bir etiket havuzu içinde tutulur. Paylaşımlar anlık
          tepkiyi önlemek için bir saat sonra yayına alınır. Kendi yazınızı
          hemen görürsünüz.
        </p>
      </header>

      <div className="mx-auto mt-10 max-w-[1040px]">
        <TagFilter tags={tags} active={activeTag?.slug ?? null} />
      </div>

      <div className="mx-auto mt-6 grid max-w-[1040px] gap-6 md:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          {rows.length > 0 && (
            <div className="space-y-4">
              {rows.map((r) => (
                <PostCard key={r.id} row={r} viewerCanSeeAuthor={!isGuest} />
              ))}
            </div>
          )}

          <MockChatterFeed />

          {isGuest && <GuestGate variant="list" />}
        </div>

        <aside className="space-y-4">
          {canPost ? (
            <Link
              href="/forum/new"
              className="btn-dark flex items-center justify-center gap-2 rounded-[10px] py-3 text-[13px] font-semibold"
            >
              <PenSquare className="h-[13px] w-[13px]" strokeWidth={2.25} />
              Yeni konu açın
            </Link>
          ) : null}

          <div
            className="rounded-[12px] border p-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="eyebrow">Kurallar</p>
            <ul
              className="mt-3 space-y-2 text-[12.5px] leading-[1.55]"
              style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
            >
              <li>Yalnızca markalaşma, pazarlama, girişimcilik ve iletişim.</li>
              <li>Gerçek kimlikle katılın. Anonim paylaşım yok.</li>
              <li>Küfür, hakaret ve kişisel saldırı otomatik engellenir.</li>
              <li>Paylaşımlar gönderimden bir saat sonra yayına alınır.</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-20">
        <CommunityStrip />
      </div>
    </div>
  );
}
