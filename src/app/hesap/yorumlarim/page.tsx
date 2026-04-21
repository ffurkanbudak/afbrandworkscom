import Link from 'next/link';
import { db } from '@/lib/db';
import { requireSubscriber } from '@/lib/subscriber';
import { formatDateCaps } from '@/lib/format';
import { StatusPill, statusTone } from '@/components/StatusPill';

const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Onay bekliyor',
  APPROVED: 'Yayında',
  HIDDEN: 'Gizlendi',
};

export default async function CommentsPage() {
  const sub = await requireSubscriber();
  const items = await db.postComment.findMany({
    where: { subscriberId: sub.id },
    orderBy: { createdAt: 'desc' },
    include: { post: { select: { slug: true, title: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Yorumlar</p>
        <h2 className="font-display mt-2 text-[28px] leading-[1.08] tracking-tight">
          Söyledikleriin
        </h2>
        <p
          className="mt-2 max-w-[58ch] text-[13.5px] leading-[1.55]"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Yorumların yayınlanmadan önce kısa bir denetimden geçer.
        </p>
      </div>

      {items.length === 0 ? (
        <Empty text="Henüz yorumun yok. Bir yazının altındaki kutucuğu kullanabilirsin." />
      ) : (
        <ul className="space-y-3">
          {items.map((c) => (
            <li
              key={c.id}
              className="rounded-2xl border p-4"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <Link
                  href={`/posts/${c.post.slug}`}
                  className="text-[13.5px] font-semibold hover:underline"
                >
                  {c.post.title}
                </Link>
                <StatusPill tone={statusTone(c.status)} className="shrink-0">
                  {STATUS_LABEL[c.status] ?? c.status}
                </StatusPill>
              </div>
              <p className="mt-2 text-[13px] leading-[1.55] whitespace-pre-wrap">{c.body}</p>
              <p
                className="mt-2 text-[11px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                {formatDateCaps(c.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div
      className="rounded-2xl border px-5 py-8 text-[13px]"
      style={{
        borderColor: 'var(--border)',
        color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
      }}
    >
      {text}
    </div>
  );
}
