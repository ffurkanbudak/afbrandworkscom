import Link from 'next/link';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../_components/PageHeader';
import { Pill } from '../_components/Pill';
import { FlagActions } from './_components/FlagActions';

function authorNameShort(a: {
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
          authorId: true,
          author: {
            select: { id: true, firstName: true, name: true, email: true, plan: true },
          },
        },
      },
      comment: {
        select: {
          id: true,
          body: true,
          status: true,
          postId: true,
          authorId: true,
          author: {
            select: { id: true, firstName: true, name: true, email: true, plan: true },
          },
        },
      },
      reporter: {
        select: { id: true, firstName: true, name: true, email: true },
      },
    },
  });

  const unresolved = flags.filter((f) => !f.resolved).length;

  const offenderCount = new Map<
    string,
    {
      authorId: string;
      name: string;
      email: string;
      total: number;
      hidden: number;
      lastAt: Date;
    }
  >();
  for (const f of flags) {
    const author = f.post?.author ?? f.comment?.author;
    if (!author) continue;
    const key = author.id;
    const entry = offenderCount.get(key) ?? {
      authorId: author.id,
      name: authorNameShort(author),
      email: author.email,
      total: 0,
      hidden: 0,
      lastAt: f.createdAt,
    };
    entry.total += 1;
    const contentStatus = f.post?.status ?? f.comment?.status;
    if (contentStatus === 'HIDDEN') entry.hidden += 1;
    if (f.createdAt > entry.lastAt) entry.lastAt = f.createdAt;
    offenderCount.set(key, entry);
  }
  const repeatOffenders = Array.from(offenderCount.values())
    .filter((o) => o.total >= 2)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Topluluk"
        title="Forum Moderasyon"
        description={`${flags.length} bildirim · ${unresolved} çözüm bekliyor. Otomatik filtre ve kullanıcı raporları buraya düşer.`}
      />

      {repeatOffenders.length > 0 && (
        <div
          className="rounded-2xl border p-5"
          style={{
            borderColor: 'color-mix(in oklab, #B45309 30%, transparent)',
            background: 'color-mix(in oklab, #B45309 4%, transparent)',
          }}
        >
          <p className="eyebrow" style={{ color: '#B45309' }}>
            İhlal sicili
          </p>
          <p
            className="mt-1 text-[12.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
          >
            İki ve üzeri bildirimi olan aboneler. Aboneye gitmek için tıklayın.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {repeatOffenders.map((o) => (
              <li key={o.authorId}>
                <Link
                  href={`/admin/subscribers/${o.authorId}`}
                  className="flex items-center justify-between gap-3 rounded-[10px] border p-3 text-[13px] transition hover:bg-[color-mix(in_oklab,var(--fg)_3%,transparent)]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">{o.name}</div>
                    <div
                      className="truncate text-[11px]"
                      style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                    >
                      {o.email}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-display tabular-nums text-[18px] leading-none">
                      {o.total}
                    </div>
                    <div
                      className="mt-0.5 text-[10.5px]"
                      style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                    >
                      {o.hidden} gizli
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

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
                    <Pill tone={f.source === 'USER' ? 'violet' : 'neutral'}>
                      {f.source === 'USER' ? 'Kullanıcı raporu' : 'Otomatik'}
                    </Pill>
                    {contentStatus === 'HIDDEN' && <Pill tone="red">Gizlendi</Pill>}
                  </div>
                  <p
                    className="mt-2 text-[11.5px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
                  >
                    {formatDateCaps(f.createdAt)}
                    {author && (
                      <>
                        {' · Yazar: '}
                        <span>{authorNameShort(author)} · {author.email}</span>
                      </>
                    )}
                    {f.reporter && (
                      <>
                        {' · Raporlayan: '}
                        <span>{authorNameShort(f.reporter)}</span>
                      </>
                    )}
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
