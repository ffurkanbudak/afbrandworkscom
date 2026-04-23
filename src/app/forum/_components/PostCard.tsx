import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { PLAN_LABEL } from '@/lib/plan';
import type { MembershipPlan } from '@prisma/client';

export type ForumPostRow = {
  id: string;
  title: string;
  body: string;
  tagLabel: string;
  tagSlug: string;
  replyCount: number;
  publishAt: Date;
  createdAt: Date;
  author: {
    firstName: string | null;
    name: string | null;
    avatarUrl: string | null;
    plan: MembershipPlan;
  } | null;
};

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

function authorName(a: ForumPostRow['author']): string {
  if (!a) return 'Üye';
  return a.firstName || a.name?.split(' ')[0] || 'Üye';
}

export function PostCard({
  row,
  viewerCanSeeAuthor,
}: {
  row: ForumPostRow;
  viewerCanSeeAuthor: boolean;
}) {
  const snippet = row.body.slice(0, 220).trim();
  return (
    <article
      className="rounded-[12px] border p-5 transition hover:bg-[color-mix(in_oklab,var(--fg)_2%,transparent)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <Link href={`/forum/${row.id}`} className="block">
        <div className="flex items-center justify-between gap-3">
          <span
            className="text-[10.5px] font-semibold tracking-[0.1em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            #{row.tagLabel}
          </span>
          <span
            className="text-[11px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
          >
            {relative(row.publishAt)}
          </span>
        </div>
        <h3 className="font-display mt-2 text-[18px] leading-[1.25] tracking-tight md:text-[20px]">
          {row.title}
        </h3>
        <p
          className="mt-2 line-clamp-2 text-[13.5px] leading-[1.6]"
          style={{
            color: 'color-mix(in oklab, var(--fg) 70%, transparent)',
            filter: viewerCanSeeAuthor ? undefined : 'blur(3.5px)',
          }}
        >
          {snippet}
          {row.body.length > 220 ? '…' : ''}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {viewerCanSeeAuthor ? (
            <div className="flex items-center gap-2">
              {row.author?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={row.author.avatarUrl}
                  alt={authorName(row.author)}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold"
                  style={{
                    background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
                    color: 'var(--fg)',
                  }}
                >
                  {authorName(row.author).slice(0, 1).toUpperCase()}
                </div>
              )}
              <span className="text-[12px] font-semibold">{authorName(row.author)}</span>
              {row.author && (
                <span
                  className="rounded-[4px] border px-1.5 py-[1px] text-[10px] font-semibold tracking-[0.06em] uppercase"
                  style={{
                    borderColor: 'color-mix(in oklab, var(--fg) 25%, transparent)',
                    color: 'color-mix(in oklab, var(--fg) 85%, transparent)',
                  }}
                >
                  {PLAN_LABEL[row.author.plan]}
                </span>
              )}
            </div>
          ) : (
            <span
              className="text-[11.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
            >
              Üye
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 text-[11.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            <MessageSquare className="h-[11px] w-[11px]" strokeWidth={2} />
            {row.replyCount}
          </span>
        </div>
      </Link>
    </article>
  );
}
