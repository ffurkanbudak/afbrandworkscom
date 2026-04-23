import Link from 'next/link';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../_components/PageHeader';
import { Pill } from '../_components/Pill';
import { FlagActions } from './_components/FlagActions';

function authorName(a: {
  firstName: string | null;
  name: string | null;
  email: string;
}): string {
  return a.firstName || a.name?.split(' ')[0] || a.email.split('@')[0];
}

export default async function ForumModerationPage() {
  const flags = await db.forumFlag.findMany({
    orderBy: [{ resolved: 'asc' }, { createdAt: 'desc' }],
    take: 300,
    include: {
      post: {
        select: {
          id: true,
          title: true,
          body: true,
          status: true,
          author: {
            select: { firstName: true, name: true, email: true, plan: true },
          },
        },
      },
      comment: {
        select: {
          id: true,
          body: true,
          status: true,
          postId: true,
          author: {
            select: { firstName: true, name: true, email: true, plan: true },
          },
        },
      },
    },
  });

  const unresolved = flags.filter((f) => !f.resolved).length;

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Topluluk"
        title="Forum Moderasyon"
        description={`${flags.length} bildirim · ${unresolved} çözüm bekliyor. Otomatik filtre şüpheli içerikleri buraya toplar.`}
      />

      <div className="space-y-4">
        {flags.length === 0 && (
          <p
            className="rounded-[12px] border p-8 text-center text-[13.5px]"
            style={{
              borderColor: 'var(--border)',
              color: 'color-mix(in oklab, var(--fg) 60%, transparent)',
            }}
          >
            Henüz bir bildirim yok.
          </p>
        )}
        {flags.map((f) => {
          const target = f.post ?? f.comment;
          const author = target?.author ?? null;
          const isPost = !!f.post;
          const contentStatus = target?.status ?? 'UNKNOWN';
          const linkHref = f.post
            ? `/forum/${f.post.id}`
            : f.comment
              ? `/forum/${f.comment.postId}#yorum-${f.comment.id}`
              : null;
          return (
            <div
              key={f.id}
              className="rounded-[12px] border p-5"
              style={{
                borderColor: f.resolved
                  ? 'var(--border)'
                  : 'color-mix(in oklab, #B45309 30%, transparent)',
                background: f.resolved
                  ? 'transparent'
                  : 'color-mix(in oklab, #B45309 3%, transparent)',
                opacity: f.resolved ? 0.75 : 1,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Pill tone={f.resolved ? 'neutral' : 'red'}>
                      {f.resolved ? 'Çözüldü' : 'Bekliyor'}
                    </Pill>
                    <Pill tone="accent">{isPost ? 'Konu' : 'Yanıt'}</Pill>
                    {contentStatus === 'HIDDEN' && <Pill tone="red">Gizlendi</Pill>}
                  </div>
                  <p
                    className="mt-2 text-[11.5px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
                  >
                    {formatDateCaps(f.createdAt)}
                    {author && ' · '}
                    {author && <span>{authorName(author)} · {author.email}</span>}
                  </p>
                </div>
                {linkHref && (
                  <Link
                    href={linkHref}
                    className="rounded-[6px] border px-2.5 py-1 text-[11.5px] font-medium"
                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  >
                    Forumda aç
                  </Link>
                )}
              </div>

              <p
                className="mt-3 text-[12px] font-semibold tracking-[0.06em] uppercase"
                style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
              >
                Sebep
              </p>
              <p
                className="mt-1 text-[13px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
              >
                {f.reason}
              </p>

              {isPost && f.post && (
                <>
                  <p
                    className="mt-4 text-[12px] font-semibold tracking-[0.06em] uppercase"
                    style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
                  >
                    Başlık
                  </p>
                  <p className="mt-1 text-[14px] font-semibold">{f.post.title}</p>
                </>
              )}

              <p
                className="mt-4 text-[12px] font-semibold tracking-[0.06em] uppercase"
                style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
              >
                İçerik
              </p>
              <p
                className="mt-1 text-[13.5px] leading-[1.55] whitespace-pre-wrap"
                style={{ color: 'color-mix(in oklab, var(--fg) 85%, transparent)' }}
              >
                {(f.post?.body ?? f.comment?.body ?? '').slice(0, 800)}
                {(f.post?.body ?? f.comment?.body ?? '').length > 800 ? '…' : ''}
              </p>

              <div className="mt-5">
                <FlagActions
                  id={f.id}
                  resolved={f.resolved}
                  hidden={contentStatus === 'HIDDEN'}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
