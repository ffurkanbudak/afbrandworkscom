import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { PLAN_LABEL } from '@/lib/plan';
import { GuestGate } from '../_components/GuestGate';

export const dynamic = 'force-dynamic';

function authorName(a: {
  firstName: string | null;
  name: string | null;
}): string {
  return a.firstName || a.name?.split(' ')[0] || 'Üye';
}

function relative(d: Date): string {
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'az önce';
  if (m < 60) return `${m} dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} saat önce`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days} gün önce`;
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await db.forumPost.findUnique({
    where: { id },
    select: { title: true, body: true, status: true, publishAt: true },
  });
  if (!post) return { title: 'Konu bulunamadı' };
  if (post.status !== 'PUBLISHED' || post.publishAt > new Date()) {
    return { title: 'Konu henüz yayında değil · Afbrandworks', robots: { index: false } };
  }
  return {
    title: `${post.title} · Forum · Afbrandworks`,
    description: post.body.slice(0, 160),
  };
}

export default async function ForumPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const viewer = await getCurrentSubscriber();

  const post = await db.forumPost.findUnique({
    where: { id },
    include: {
      tag: { select: { slug: true, label: true } },
      author: {
        select: {
          id: true,
          firstName: true,
          name: true,
          avatarUrl: true,
          plan: true,
        },
      },
    },
  });

  if (!post) notFound();

  const now = new Date();
  const isAuthor = viewer?.id === post.authorId;
  const isLive = post.status === 'PUBLISHED' && post.publishAt <= now;

  if (!isLive && !isAuthor) notFound();

  const isGuest = !viewer;

  return (
    <article className="fade-up mx-auto max-w-[720px] pt-8 md:pt-14">
      <Link
        href={`/forum${post.tag ? `?tag=${post.tag.slug}` : ''}`}
        className="inline-flex items-center gap-1 text-[12px] font-medium"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        <ArrowLeft className="h-[12px] w-[12px]" strokeWidth={2} />
        Forum
      </Link>

      <header className="mt-6">
        <span
          className="text-[10.5px] font-semibold tracking-[0.12em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          #{post.tag.label}
        </span>
        <h1 className="font-display mt-3 text-[30px] leading-[1.1] tracking-tight md:text-[40px]">
          {post.title}
        </h1>

        {!isGuest ? (
          <div className="mt-5 flex items-center gap-3">
            {post.author.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.author.avatarUrl}
                alt=""
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold"
                style={{
                  background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
                  color: 'var(--fg)',
                }}
              >
                {authorName(post.author).slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="text-[12.5px]">
              <span className="font-semibold">{authorName(post.author)}</span>
              <span
                className="ml-2 rounded-[4px] border px-1.5 py-[1px] text-[10px] font-semibold tracking-[0.06em] uppercase"
                style={{
                  borderColor: 'color-mix(in oklab, var(--fg) 25%, transparent)',
                  color: 'color-mix(in oklab, var(--fg) 85%, transparent)',
                }}
              >
                {PLAN_LABEL[post.author.plan]}
              </span>
            </div>
            <span
              className="text-[11.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
            >
              · {relative(post.publishAt)}
            </span>
          </div>
        ) : (
          <div
            className="mt-5 text-[11.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
          >
            Üye · {relative(post.publishAt)}
          </div>
        )}

        {!isLive && isAuthor && (
          <div
            className="mt-5 rounded-[10px] border p-4 text-[12.5px] leading-[1.55]"
            style={{
              borderColor: 'color-mix(in oklab, #B45309 40%, transparent)',
              background: 'color-mix(in oklab, #B45309 6%, transparent)',
              color: '#B45309',
            }}
          >
            Yazınız bir saat içinde yayına alınacaktır. Şu an yalnızca siz
            görüyorsunuz.
          </div>
        )}
      </header>

      <div
        className="mt-8 text-[16px] leading-[1.75] whitespace-pre-wrap"
        style={{
          color: 'var(--fg)',
          filter: isGuest ? 'blur(5px)' : undefined,
          userSelect: isGuest ? 'none' : undefined,
        }}
      >
        {isGuest ? post.body.slice(0, 600) : post.body}
      </div>

      {isGuest && <GuestGate variant="post" />}
    </article>
  );
}
