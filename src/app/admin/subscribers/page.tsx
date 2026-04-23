import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../_components/Pill';
import { DataTable, Th, Td } from '../_components/DataTable';
import { Avatar } from '../_components/Avatar';
import { TIER_LABEL, TIER_ORDER } from '../_lib/tier';

export default async function SubscribersPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; status?: string }>;
}) {
  const sp = await searchParams;
  const tierFilter = TIER_ORDER.includes(sp.tier as any) ? (sp.tier as any) : undefined;
  const statusFilter = sp.status && ['PENDING', 'CONFIRMED', 'UNSUBSCRIBED', 'BOUNCED'].includes(sp.status)
    ? (sp.status as any)
    : undefined;

  const [subs, byTier, totals] = await Promise.all([
    db.subscriber.findMany({
      where: {
        ...(tierFilter ? { tier: tierFilter } : {}),
        ...(statusFilter ? { status: statusFilter } : {}),
      },
      orderBy: [
        { status: 'asc' },
        { activityScore: 'desc' },
        { createdAt: 'desc' },
      ],
      take: 1000,
    }),
    db.subscriber.groupBy({
      by: ['tier'],
      where: { status: 'CONFIRMED' },
      _count: { _all: true },
    }),
    db.subscriber.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
  ]);

  const pendingCount = totals.find((t) => t.status === 'PENDING')?._count._all ?? 0;

  const tierCount = (t: string) =>
    byTier.find((x) => x.tier === t)?._count._all ?? 0;

  const TIER_TONES: Record<string, 'neutral' | 'green' | 'accent' | 'violet'> = {
    CIRAK: 'neutral',
    KALFA: 'green',
    USTA: 'accent',
    PIR: 'violet',
  };

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Topluluk"
        title="Aboneler"
        description={`${subs.length} kayıt. Onay bekleyenler üstte.`}
      />

      {pendingCount > 0 && (
        <Link
          href={statusFilter === 'PENDING' ? '/admin/subscribers' : '/admin/subscribers?status=PENDING'}
          className="flex items-center justify-between rounded-2xl border p-4 transition hover:bg-[color-mix(in_oklab,#16A34A_6%,transparent)]"
          style={{
            borderColor:
              statusFilter === 'PENDING'
                ? '#16A34A'
                : 'color-mix(in oklab, #16A34A 40%, transparent)',
            background:
              statusFilter === 'PENDING'
                ? 'color-mix(in oklab, #16A34A 8%, transparent)'
                : 'color-mix(in oklab, #16A34A 4%, transparent)',
          }}
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: '#16A34A' }}>
              Onay bekleyen
            </p>
            <p className="font-display mt-1 text-[22px] leading-none tabular-nums">
              {pendingCount} abone
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium" style={{ color: '#16A34A' }}>
            {statusFilter === 'PENDING' ? 'Filtreyi kaldırın' : 'Bekleyenleri gösterin'}
            <ArrowUpRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
          </span>
        </Link>
      )}

      <div className="grid gap-3 sm:grid-cols-4">
        {TIER_ORDER.map((t) => {
          const active = tierFilter === t;
          return (
            <Link
              key={t}
              href={active ? '/admin/subscribers' : `/admin/subscribers?tier=${t}`}
              className="rounded-2xl border p-4 transition hover:bg-[color-mix(in_oklab,var(--fg)_3%,transparent)]"
              style={{
                borderColor: active ? 'var(--fg)' : 'var(--border)',
                background: active ? 'color-mix(in oklab, var(--fg) 4%, transparent)' : 'transparent',
              }}
            >
              <Pill tone={TIER_TONES[t]}>{TIER_LABEL[t]}</Pill>
              <p className="font-display mt-3 text-[26px] leading-none tabular-nums">
                {tierCount(t)}
              </p>
            </Link>
          );
        })}
      </div>

      <DataTable
        colCount={6}
        emptyWhen={subs.length === 0}
        empty="Bu filtreyle eşleşen abone yok."
        head={
          <>
            <Th>Abone</Th>
            <Th>Kademe</Th>
            <Th>Durum</Th>
            <Th className="text-right">Aktivite</Th>
            <Th>Kaynak</Th>
            <Th className="text-right">Katılım</Th>
          </>
        }
      >
        {subs.map((s) => (
          <tr key={s.id}>
            <Td>
              <div className="flex items-center gap-3">
                <Avatar src={s.avatarUrl} name={s.name} email={s.email} size={32} />
                <div className="min-w-0">
                  <div className="font-medium">
                    {s.name || s.firstName || s.email.split('@')[0]}
                  </div>
                  <div
                    className="truncate text-[11.5px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    {s.email}
                  </div>
                </div>
              </div>
            </Td>
            <Td>
              <Pill tone={TIER_TONES[s.tier]}>{TIER_LABEL[s.tier]}</Pill>
            </Td>
            <Td>
              <Pill tone={statusTone(s.status)}>{STATUS_LABEL[s.status] ?? s.status}</Pill>
            </Td>
            <Td className="tabular-nums text-right">{s.activityScore}</Td>
            <Td>
              <span className="text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}>
                {s.source ?? '·'}
              </span>
            </Td>
            <Td className="text-right">
              <Link
                href={`/admin/subscribers/${s.id}`}
                className="inline-flex items-center gap-1 text-[12px] font-medium"
              >
                {formatDateCaps(s.createdAt)}
                <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
              </Link>
            </Td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
