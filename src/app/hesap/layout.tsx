import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { requireSubscriber } from '@/lib/subscriber';
import { TIER_LABEL, tierProgress, nextTier } from '@/app/admin/_lib/tier';
import { displayName } from '@/app/admin/_lib/names';
import { AccountNav } from './AccountNav';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const sub = await requireSubscriber();
  const { userId } = await auth();
  const admin = userId
    ? await db.admin.findUnique({ where: { clerkId: userId }, select: { id: true } })
    : null;
  const isAdmin = !!admin;

  await db.subscriber.update({
    where: { id: sub.id },
    data: { notificationsReadAt: new Date() },
  });

  const { first, lastInitial } = displayName(sub);
  const prog = tierProgress(sub.activityScore, sub.tier);
  const next = nextTier(sub.tier);

  return (
    <div className="fade-up py-12 md:py-16">
      <header className="border-b pb-10" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            {sub.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={sub.avatarUrl}
                alt={first}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-[20px] font-semibold"
                style={{
                  background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
                  color: 'var(--fg)',
                }}
              >
                {first.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <p className="eyebrow">Hesabım{isAdmin ? ' · Owner' : ''}</p>
              <h1 className="font-display mt-2 text-[34px] leading-[1.04] tracking-tight md:text-[42px]">
                {first} {lastInitial && <span>{lastInitial[0]}.</span>}
              </h1>
              <p
                className="mt-1 text-[13.5px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 58%, transparent)' }}
              >
                {sub.email}
              </p>
            </div>
          </div>

          {!isAdmin && (
            <div className="min-w-[260px] max-w-full flex-1 rounded-2xl border p-4" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-baseline justify-between gap-2 text-[12.5px]">
                <span className="eyebrow">Kademe</span>
                <span className="font-semibold">{TIER_LABEL[sub.tier]}</span>
              </div>
              <div
                className="mt-3 h-[4px] w-full overflow-hidden rounded-full"
                style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)' }}
              >
                <div className="h-full" style={{ width: `${prog.pct}%`, background: 'var(--fg)' }} />
              </div>
              <p
                className="mt-2 text-[11.5px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                {next
                  ? `${TIER_LABEL[next]}'a ${prog.toNext} aktivite kaldı`
                  : 'En üst kademedesin.'}{' '}
                · {sub.activityScore} puan
              </p>
            </div>
          )}
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <AccountNav isAdmin={isAdmin} />
        <div className="min-w-0">{children}</div>
      </div>

      <div className="mt-16">
        <Link
          href="/"
          className="text-[12.5px] font-medium"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          ← Siteye dön
        </Link>
      </div>
    </div>
  );
}
