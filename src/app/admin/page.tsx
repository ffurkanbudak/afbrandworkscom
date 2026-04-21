import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader, SectionHeader } from './_components/PageHeader';
import { StatCard } from './_components/StatCard';
import { Pill, statusTone, STATUS_LABEL } from './_components/Pill';
import { Avatar } from './_components/Avatar';
import { DateRangePicker } from './_components/DateRangePicker';
import { displayName } from './_lib/names';
import { TIER_LABEL } from './_lib/tier';
import { resolveRange, previousRange, formatRangeLabel } from './_lib/range';

type SP = { from?: string; to?: string; preset?: string };

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const range = resolveRange({ from: sp.from, to: sp.to, preset: sp.preset });
  const prev = previousRange(range);
  const rangeWhere = { gte: range.from, lte: range.to };
  const prevWhere = { gte: prev.from, lte: prev.to };

  const [
    postCount,
    subCount,
    pirCount,
    broadcastsSent,
    viewsRange,
    viewsPrevRange,
    newSubsRange,
    newSubsPrevRange,
    pendingApps,
    pendingSponsors,
    unreadMessages,
    pendingComments,
    recentJoiners,
    recentPosts,
    recentBroadcasts,
    recentMessages,
    recentApplications,
    topPosts,
  ] = await Promise.all([
    db.post.count({ where: { status: 'PUBLISHED' } }),
    db.subscriber.count({ where: { status: 'CONFIRMED' } }),
    db.subscriber.count({ where: { status: 'CONFIRMED', tier: { in: ['USTA', 'PIR'] } } }),
    db.broadcast.count({ where: { status: 'SENT' } }),
    db.postView.count({ where: { createdAt: rangeWhere } }),
    db.postView.count({ where: { createdAt: prevWhere } }),
    db.subscriber.count({ where: { status: 'CONFIRMED', confirmedAt: rangeWhere } }),
    db.subscriber.count({ where: { status: 'CONFIRMED', confirmedAt: prevWhere } }),
    db.writerApplication.count({ where: { status: 'PENDING' } }),
    db.sponsorshipRequest.count({ where: { status: 'PENDING' } }),
    db.contactMessage.count({ where: { status: 'UNREAD' } }),
    db.postComment.count({ where: { status: 'PENDING' } }),
    db.subscriber.findMany({
      where: { status: 'CONFIRMED', confirmedAt: rangeWhere },
      orderBy: { confirmedAt: 'desc' },
      take: 12,
    }),
    db.post.findMany({
      where: { updatedAt: rangeWhere },
      orderBy: { updatedAt: 'desc' },
      take: 10,
      include: { tags: { include: { tag: true } } },
    }),
    db.broadcast.findMany({
      where: { createdAt: rangeWhere },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    db.contactMessage.findMany({
      where: { createdAt: rangeWhere },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    db.writerApplication.findMany({
      where: { createdAt: rangeWhere },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    db.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { viewCount: 'desc' },
      take: 5,
    }),
  ]);

  const viewDelta = viewsRange - viewsPrevRange;
  const subDelta = newSubsRange - newSubsPrevRange;
  const rangeLabel = formatRangeLabel(range);

  type TimelineEntry = {
    key: string;
    href: string;
    kind: string;
    title: string;
    at: Date;
    tone: 'accent' | 'neutral' | 'violet';
  };
  const timeline: TimelineEntry[] = [
    ...recentApplications.map((a) => ({
      key: `a-${a.id}`,
      href: `/admin/applications/${a.id}`,
      kind: 'Yazar başvurusu',
      title: `${a.name} · ${a.proposedTitle}`,
      at: a.createdAt,
      tone: 'accent' as const,
    })),
    ...recentMessages.map((m) => ({
      key: `m-${m.id}`,
      href: `/admin/messages/${m.id}`,
      kind: 'Mesaj',
      title: `${m.name} · ${m.topic ?? 'Konu yok'}`,
      at: m.createdAt,
      tone: 'neutral' as const,
    })),
    ...recentBroadcasts.map((b) => ({
      key: `b-${b.id}`,
      href: '/admin/broadcast',
      kind: 'Yayın',
      title: b.subject,
      at: b.createdAt,
      tone: 'violet' as const,
    })),
  ]
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 15);

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Panel"
        title="Genel Bakış"
        description={`${rangeLabel} aralığındaki topluluk, içerik ve talep hareketleri.`}
        actions={<DateRangePicker />}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Yayındaki yazı"
          value={postCount}
          hint="Toplam yayımlanan"
          accent
        />
        <StatCard
          label="Onaylı abone"
          value={subCount}
          hint={`${pirCount} usta/pîr`}
          trend={subDelta !== 0 ? { delta: subDelta, suffix: ' aralıkta' } : undefined}
        />
        <StatCard
          label="Okunma"
          value={viewsRange}
          hint="Yazı görüntüleme"
          trend={viewsPrevRange > 0 ? { delta: viewDelta } : undefined}
        />
        <StatCard
          label="Gönderilmiş yayın"
          value={broadcastsSent}
          hint="E-posta yayınları"
        />
      </section>

      {(pendingApps > 0 || pendingSponsors > 0 || unreadMessages > 0 || pendingComments > 0) && (
        <section>
          <SectionHeader title="Dikkat bekleyen" hint="İncelenmemiş talepler" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SignalCard
              href="/admin/applications"
              label="Yazar Başvuruları"
              count={pendingApps}
              caption="Yeni yazar adayı"
            />
            <SignalCard
              href="/admin/sponsorships"
              label="Sponsorluklar"
              count={pendingSponsors}
              caption="Yeni sponsor talebi"
            />
            <SignalCard
              href="/admin/messages"
              label="Mesajlar"
              count={unreadMessages}
              caption="Okunmamış mesaj"
            />
            <SignalCard
              href="/admin/comments"
              label="Yorumlar"
              count={pendingComments}
              caption="Onay bekleyen"
            />
          </div>
        </section>
      )}

      <section className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionHeader
            title="Yeni katılanlar"
            hint="Aralıkta doğrulanan aboneler"
            actions={
              <Link href="/admin/subscribers" className="text-[12.5px] font-medium inline-flex items-center gap-1">
                Tümü <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
              </Link>
            }
          />
          <ul className="space-y-2">
            {recentJoiners.length === 0 && (
              <li className="rounded-[10px] border px-4 py-6 text-[13px]" style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
                Bu aralıkta yeni onaylı abone yok.
              </li>
            )}
            {recentJoiners.map((s) => {
              const dn = displayName(s);
              return (
                <li
                  key={s.id}
                  className="flex items-center gap-3 rounded-[10px] border px-4 py-3"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Avatar src={s.avatarUrl} name={s.name} email={s.email} size={34} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-semibold">
                      {dn.first} {dn.lastInitial}
                    </p>
                    <p
                      className="truncate text-[11.5px]"
                      style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                    >
                      {s.confirmedAt ? formatDateCaps(s.confirmedAt) : formatDateCaps(s.createdAt)} · {TIER_LABEL[s.tier]}
                    </p>
                  </div>
                  <Link
                    href={`/admin/subscribers/${s.id}`}
                    className="eyebrow text-[10px] inline-flex items-center gap-1"
                  >
                    Aç <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <SectionHeader
            title="Son yazılar"
            hint="Aralıkta güncellenen"
            actions={
              <Link href="/admin/posts" className="text-[12.5px] font-medium inline-flex items-center gap-1">
                Tümü <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
              </Link>
            }
          />
          <ul className="space-y-2">
            {recentPosts.length === 0 && (
              <li className="rounded-[10px] border px-4 py-6 text-[13px]" style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
                Bu aralıkta yazı güncellenmedi.
              </li>
            )}
            {recentPosts.map((p) => (
              <li
                key={p.id}
                className="rounded-[10px] border px-4 py-3"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/admin/posts/${p.id}/edit`}
                    className="min-w-0 flex-1"
                  >
                    <p className="truncate text-[13.5px] font-semibold">{p.title}</p>
                    <p
                      className="mt-0.5 truncate text-[11.5px]"
                      style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                    >
                      /{p.slug} · {formatDateCaps(p.updatedAt)}
                    </p>
                  </Link>
                  <Pill tone={statusTone(p.status)}>{STATUS_LABEL[p.status] ?? p.status}</Pill>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeader title="En çok okunan" hint="Yayımlanmış tüm yazılar" />
          <ol className="space-y-2">
            {topPosts.length === 0 && (
              <li className="rounded-[10px] border px-4 py-6 text-[13px]" style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
                Henüz okuma verisi yok.
              </li>
            )}
            {topPosts.map((p, i) => (
              <li
                key={p.id}
                className="flex items-center gap-4 rounded-[10px] border px-4 py-3"
                style={{ borderColor: 'var(--border)' }}
              >
                <span
                  className="font-display text-[20px] tabular-nums leading-none"
                  style={{ color: 'color-mix(in oklab, var(--fg) 40%, transparent)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Link href={`/posts/${p.slug}`} className="min-w-0 flex-1 truncate text-[13.5px] font-medium">
                  {p.title}
                </Link>
                <span
                  className="text-[12px] tabular-nums"
                  style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
                >
                  {p.viewCount} okuma
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <SectionHeader title="Son hareketler" hint="Aralıktaki başvuru, mesaj ve yayınlar" />
          <div className="space-y-2">
            {timeline.map((e) => (
              <TimelineRow
                key={e.key}
                href={e.href}
                kind={e.kind}
                title={e.title}
                at={e.at}
                tone={e.tone}
              />
            ))}
            {timeline.length === 0 && (
              <div className="rounded-[10px] border px-4 py-6 text-[13px]" style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
                Bu aralıkta hareket yok.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function SignalCard({ href, label, count, caption }: { href: string; label: string; count: number; caption: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl border p-5 transition hover:bg-[color-mix(in_oklab,var(--fg)_4%,transparent)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <div>
        <p className="eyebrow">{label}</p>
        <p className="font-display mt-2 text-[30px] leading-none tabular-nums">{count}</p>
        <p
          className="mt-1 text-[12px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          {caption}
        </p>
      </div>
      <ArrowUpRight
        className="h-[16px] w-[16px] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </Link>
  );
}

function TimelineRow({
  href,
  kind,
  title,
  at,
  tone,
}: {
  href: string;
  kind: string;
  title: string;
  at: Date;
  tone: 'accent' | 'neutral' | 'violet';
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-[10px] border px-4 py-3 transition hover:bg-[color-mix(in_oklab,var(--fg)_3%,transparent)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <Pill tone={tone}>{kind}</Pill>
      <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{title}</span>
      <span
        className="shrink-0 text-[11px] tabular-nums"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        {formatDateCaps(at)}
      </span>
    </Link>
  );
}
