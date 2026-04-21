import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../../_components/Pill';
import { Avatar } from '../../_components/Avatar';
import { TIER_LABEL, TIER_DESCRIPTION, tierProgress } from '../../_lib/tier';
import { SubscriberActions } from './SubscriberActions';
import { SubscriberNote } from './SubscriberNote';
import { SubscriberMessage } from './SubscriberMessage';

export default async function SubscriberDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sub = await db.subscriber.findUnique({
    where: { id },
    include: {
      notes: {
        orderBy: { createdAt: 'desc' },
        include: { author: true },
      },
      views: {
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: { post: true },
      },
      deliveries: {
        orderBy: { sentAt: 'desc' },
        take: 10,
        include: { broadcast: true },
      },
    },
  });
  if (!sub) notFound();

  const progress = tierProgress(sub.activityScore, sub.tier);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Abone kartı"
        title={sub.name || sub.firstName || sub.email.split('@')[0]}
        description={sub.email}
        actions={
          <div className="flex items-center gap-2">
            <Pill tone={statusTone(sub.status)}>{STATUS_LABEL[sub.status]}</Pill>
            <Pill tone="accent">{TIER_LABEL[sub.tier]}</Pill>
          </div>
        }
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <aside className="space-y-6">
          <div
            className="rounded-2xl border p-6"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-4">
              <Avatar src={sub.avatarUrl} name={sub.name} email={sub.email} size={68} />
              <div className="min-w-0">
                <p className="font-display text-[18px] tracking-tight">
                  {sub.firstName || sub.name || 'İsim yok'}
                  {sub.lastName && ` ${sub.lastName}`}
                </p>
                <p
                  className="truncate text-[12.5px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
                >
                  {(sub.city || sub.country) ? [sub.city, sub.country].filter(Boolean).join(', ') : 'Konum belirtilmemiş'}
                </p>
              </div>
            </div>
            {sub.bio && (
              <p className="mt-5 text-[13px] leading-[1.6]" style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}>
                {sub.bio}
              </p>
            )}

            <div
              className="mt-6 border-t pt-5"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="eyebrow">Kademe</p>
              <p className="mt-2 text-[13px]">{TIER_DESCRIPTION[sub.tier]}</p>
              <div
                className="relative mt-4 h-[6px] overflow-hidden rounded-full"
                style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)' }}
              >
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ width: `${progress.pct}%`, background: 'var(--fg)' }}
                />
              </div>
              <p
                className="mt-2 text-[11.5px] tabular-nums"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                Skor {sub.activityScore}
                {progress.toNext > 0
                  ? ` · Bir sonraki kademeye ${progress.toNext} puan`
                  : ' · En üst kademe'}
              </p>
            </div>

            <dl
              className="mt-6 grid grid-cols-2 gap-3 border-t pt-5 text-[12.5px]"
              style={{ borderColor: 'var(--border)' }}
            >
              <div>
                <dt className="eyebrow text-[10px]">Katılım</dt>
                <dd className="mt-1">{formatDateCaps(sub.createdAt)}</dd>
              </div>
              <div>
                <dt className="eyebrow text-[10px]">Onay</dt>
                <dd className="mt-1">{sub.confirmedAt ? formatDateCaps(sub.confirmedAt) : '·'}</dd>
              </div>
              <div>
                <dt className="eyebrow text-[10px]">Son aktif</dt>
                <dd className="mt-1">{sub.lastActiveAt ? formatDateCaps(sub.lastActiveAt) : '·'}</dd>
              </div>
              <div>
                <dt className="eyebrow text-[10px]">Kaynak</dt>
                <dd className="mt-1">{sub.source ?? '·'}</dd>
              </div>
            </dl>
          </div>

          <SubscriberActions
            id={sub.id}
            currentTier={sub.tier}
            showInCommunity={sub.showInCommunity}
            activityScore={sub.activityScore}
          />

          <SubscriberMessage id={sub.id} email={sub.email} />
        </aside>

        <section className="space-y-10">
          <div>
            <p className="eyebrow">Notlar</p>
            <p
              className="mt-1 text-[12.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              Yalnızca yönetici görür.
            </p>
            <div className="mt-4">
              <SubscriberNote subscriberId={sub.id} />
            </div>
            <ul className="mt-6 space-y-3">
              {sub.notes.map((n) => (
                <li
                  key={n.id}
                  className="rounded-[10px] border p-4"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <p className="text-[13px] leading-[1.55] whitespace-pre-wrap">{n.body}</p>
                  <p
                    className="mt-2 text-[11px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    {n.author.name ?? n.author.email} · {formatDateCaps(n.createdAt)}
                  </p>
                </li>
              ))}
              {sub.notes.length === 0 && (
                <li
                  className="rounded-[10px] border p-4 text-[12.5px]"
                  style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  Henüz not yok.
                </li>
              )}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Son okunan yazılar</p>
            <ul className="mt-4 space-y-2">
              {sub.views.length === 0 && (
                <li
                  className="rounded-[10px] border p-4 text-[12.5px]"
                  style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  Giriş yaptığında okumalar burada görünecek.
                </li>
              )}
              {sub.views.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center justify-between gap-3 rounded-[10px] border p-3 text-[13px]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span className="truncate font-medium">{v.post?.title ?? '·'}</span>
                  <span
                    className="shrink-0 text-[11px] tabular-nums"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    {v.country ?? ''} · {formatDateCaps(v.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Bülten teslimatları</p>
            <ul className="mt-4 space-y-2">
              {sub.deliveries.length === 0 && (
                <li
                  className="rounded-[10px] border p-4 text-[12.5px]"
                  style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  Henüz teslimat yok.
                </li>
              )}
              {sub.deliveries.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between gap-3 rounded-[10px] border p-3 text-[13px]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span className="truncate font-medium">{d.broadcast.subject}</span>
                  <span className="flex items-center gap-2 text-[11px]">
                    {d.opened && <Pill tone="green">Açıldı</Pill>}
                    {d.clicked && <Pill tone="accent">Tıkladı</Pill>}
                    {d.bounced && <Pill tone="red">Geri döndü</Pill>}
                    <span style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
                      {d.sentAt ? formatDateCaps(d.sentAt) : '·'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
