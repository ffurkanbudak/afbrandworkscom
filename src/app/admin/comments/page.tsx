import Link from 'next/link';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader, SectionHeader } from '../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../_components/Pill';
import type { SubscriberTier } from '@prisma/client';
import { displayName } from '../_lib/names';
import { TIER_LABEL } from '../_lib/tier';
import { CommentRowActions } from './CommentRowActions';

type Status = 'PENDING' | 'APPROVED' | 'HIDDEN';

type Subscriber = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  email: string;
  tier: string;
} | null;

type Row = {
  id: string;
  body: string;
  status: Status;
  createdAt: Date;
  kind: 'post';
  target: { href: string; label: string } | null;
  subscriber: Subscriber;
};

const subscriberSelect = {
  select: { id: true, firstName: true, lastName: true, name: true, email: true, tier: true },
};

export default async function AdminCommentsPage() {
  const [postPending, postApproved, postHidden] = await Promise.all([
    db.postComment.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      include: { post: { select: { slug: true, title: true } }, subscriber: subscriberSelect },
    }),
    db.postComment.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { post: { select: { slug: true, title: true } }, subscriber: subscriberSelect },
    }),
    db.postComment.findMany({
      where: { status: 'HIDDEN' },
      orderBy: { createdAt: 'desc' },
      take: 30,
      include: { post: { select: { slug: true, title: true } }, subscriber: subscriberSelect },
    }),
  ]);

  const mapPost = (c: typeof postPending[number]): Row => ({
    id: c.id,
    body: c.body,
    status: c.status,
    createdAt: c.createdAt,
    kind: 'post',
    target: c.post ? { href: `/posts/${c.post.slug}`, label: c.post.title } : null,
    subscriber: c.subscriber,
  });

  const pending = postPending.map(mapPost);
  const approved = postApproved.map(mapPost);
  const hidden = postHidden.map(mapPost);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Topluluk"
        title="Yorumlar"
        description="Yazılar altındaki yorumları incele, onayla veya gizle."
      />
      <Bucket title="Onay bekleyenler" hint="İlk izlenim sende." items={pending} />
      <Bucket title="Yayında" hint="Onaylanmış yorumlar." items={approved} />
      <Bucket title="Gizlenenler" hint="Altında görünmez." items={hidden} />
    </div>
  );
}

function Bucket({ title, hint, items }: { title: string; hint: string; items: Row[] }) {
  return (
    <section>
      <SectionHeader title={title} hint={`${hint} · ${items.length} kayıt`} />
      {items.length === 0 ? (
        <div
          className="rounded-2xl border px-5 py-8 text-[13px]"
          style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Kayıt yok.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((c) => (
            <CommentCard key={`${c.kind}:${c.id}`} c={c} />
          ))}
        </ul>
      )}
    </section>
  );
}

function CommentCard({ c }: { c: Row }) {
  const dn = c.subscriber ? displayName(c.subscriber) : { first: 'Abone', lastInitial: '' };
  return (
    <li
      className="rounded-2xl border p-5"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-[13.5px] font-semibold">
              {dn.first} {dn.lastInitial}
            </span>
            <span
              className="text-[10.5px] font-semibold tracking-[0.1em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              {c.subscriber ? TIER_LABEL[c.subscriber.tier as SubscriberTier] ?? c.subscriber.tier : '·'}
            </span>
            <span
              className="text-[11.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              {c.subscriber?.email ?? '·'}
            </span>
            <Pill tone={statusTone(c.status)}>{STATUS_LABEL[c.status] ?? c.status}</Pill>
          </div>
          {c.target && (
            <p
              className="mt-1 text-[11.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              <Link href={c.target.href} className="hover:underline">
                {c.target.label}
              </Link>
              <span className="mx-1.5 opacity-50">·</span>
              {formatDateCaps(c.createdAt)}
            </p>
          )}
        </div>
        <CommentRowActions id={c.id} status={c.status} kind={c.kind} />
      </div>
      <p className="mt-3 text-[14px] leading-[1.6] whitespace-pre-wrap">{c.body}</p>
    </li>
  );
}
