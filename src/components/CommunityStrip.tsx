import { db } from '@/lib/db';
import { displayName } from '@/app/admin/_lib/names';
import { TIER_LABEL } from '@/app/admin/_lib/tier';

export async function CommunityStrip() {
  const items = await db.subscriber.findMany({
    where: { status: 'CONFIRMED', showInCommunity: true },
    orderBy: { createdAt: 'desc' },
    take: 14,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      name: true,
      avatarUrl: true,
      city: true,
      country: true,
      tier: true,
      createdAt: true,
    },
  });

  if (items.length < 3) return null;

  return (
    <section
      className="py-10"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Topluluk</p>
          <h2 className="font-display mt-3 text-[24px] leading-[1.12] tracking-tight md:text-[30px]">
            Aramıza yeni katılanlar
          </h2>
          <p
            className="mt-2 max-w-[56ch] text-[13.5px] leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
          >
            Soyadlar mahremiyet için yıldızlanır. Katılanlar kendi profillerini açıp kapatabilir.
          </p>
        </div>
      </div>

      <div className="mt-8 -mx-6 md:-mx-10 lg:-mx-14">
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-6 md:px-10 lg:px-14">
          {items.map((s) => {
            const { first, lastInitial } = displayName(s);
            const masked = lastInitial ? `${first} ${lastInitial[0]}★.` : first;
            return (
              <div
                key={s.id}
                className="flex min-w-[220px] shrink-0 items-center gap-3 rounded-2xl border px-4 py-3"
                style={{ borderColor: 'var(--border)' }}
              >
                {s.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.avatarUrl}
                    alt={first}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-semibold"
                    style={{
                      background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
                      color: 'var(--fg)',
                    }}
                  >
                    {first.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold">{masked}</p>
                  <p
                    className="truncate text-[11px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    {TIER_LABEL[s.tier]}
                    {s.city || s.country
                      ? ` · ${[s.city, s.country].filter(Boolean).join(', ')}`
                      : ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
