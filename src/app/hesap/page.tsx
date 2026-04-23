import Link from 'next/link';
import { ArrowUpRight, Heart, Bookmark, MessageSquare, Eye } from 'lucide-react';
import { db } from '@/lib/db';
import { requireSubscriber } from '@/lib/subscriber';
import { formatDateCaps } from '@/lib/format';
import { StatusPill, statusTone } from '@/components/StatusPill';
import { GiftCodeRedeem } from '@/components/GiftCodeRedeem';

const COMMENT_STATUS_LABEL: Record<string, string> = {
  PENDING: 'Onay bekliyor',
  APPROVED: 'Yayında',
  HIDDEN: 'Gizli',
};

export default async function AccountOverview() {
  const sub = await requireSubscriber();

  const [likeCount, favCount, commentCount, viewCount, recentFavorites, recentComments] =
    await Promise.all([
      db.postLike.count({ where: { subscriberId: sub.id } }),
      db.postFavorite.count({ where: { subscriberId: sub.id } }),
      db.postComment.count({ where: { subscriberId: sub.id } }),
      db.postView.count({ where: { subscriberId: sub.id } }),
      db.postFavorite.findMany({
        where: { subscriberId: sub.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { post: { select: { slug: true, title: true, publishedAt: true } } },
      }),
      db.postComment.findMany({
        where: { subscriberId: sub.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { post: { select: { slug: true, title: true } } },
      }),
    ]);

  return (
    <div className="space-y-10">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Beğeni" icon={Heart} value={likeCount} />
        <Stat label="Favori" icon={Bookmark} value={favCount} />
        <Stat label="Yorum" icon={MessageSquare} value={commentCount} />
        <Stat label="Okuma" icon={Eye} value={viewCount} />
      </section>

      <GiftCodeRedeem currentPlan={sub.plan} />

      <section>
        <SectionHead title="Son favorilerin" href="/hesap/favoriler" />
        {recentFavorites.length === 0 ? (
          <Empty text="Henüz favori yok. Bir yazıya yer imi koyunca burada belirir." />
        ) : (
          <ul className="mt-3 divide-y" style={{ borderColor: 'var(--border)' }}>
            {recentFavorites.map((f) => (
              <li key={f.id} className="flex items-baseline justify-between gap-3 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <Link
                  href={`/posts/${f.post.slug}`}
                  className="inline-flex items-center gap-1 text-[13.5px] font-medium hover:underline"
                >
                  {f.post.title}
                  <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
                </Link>
                <span
                  className="shrink-0 text-[11.5px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {formatDateCaps(f.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionHead title="Son yorumların" href="/hesap/yorumlarim" />
        {recentComments.length === 0 ? (
          <Empty text="Henüz yorum yok. Bir yazının altına düşünceni bırakabilirsin." />
        ) : (
          <ul className="mt-3 space-y-3">
            {recentComments.map((c) => (
              <li
                key={c.id}
                className="rounded-2xl border p-4"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <Link
                    href={`/posts/${c.post.slug}`}
                    className="text-[13px] font-semibold hover:underline"
                  >
                    {c.post.title}
                  </Link>
                  <StatusPill tone={statusTone(c.status)} className="shrink-0">
                    {COMMENT_STATUS_LABEL[c.status] ?? c.status}
                  </StatusPill>
                </div>
                <p className="mt-2 text-[13px] leading-[1.55] whitespace-pre-wrap">{c.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between">
        <p className="eyebrow">{label}</p>
        <Icon
          className="h-[15px] w-[15px]"
          strokeWidth={1.75}
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        />
      </div>
      <p className="font-display mt-3 text-[30px] leading-none tabular-nums tracking-tight">
        {value.toLocaleString('tr-TR')}
      </p>
    </div>
  );
}

function SectionHead({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="font-display text-[20px] leading-tight tracking-tight">{title}</h2>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-[12.5px] font-medium"
        style={{ color: 'var(--fg)' }}
      >
        Tümü
        <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
      </Link>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div
      className="mt-3 rounded-2xl border px-5 py-6 text-[13px]"
      style={{
        borderColor: 'var(--border)',
        color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
      }}
    >
      {text}
    </div>
  );
}
