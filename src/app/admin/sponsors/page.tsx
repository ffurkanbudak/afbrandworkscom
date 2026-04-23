import Link from 'next/link';
import { Plus } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../_components/PageHeader';
import { Pill } from '../_components/Pill';
import { DataTable, Th, Td } from '../_components/DataTable';

const TIER_LABEL: Record<string, string> = {
  DAILY: 'Günlük',
  MONTHLY: 'Aylık',
  QUARTERLY: 'Üç aylık',
};

export default async function SponsorsPage() {
  const sponsors = await db.sponsor.findMany({
    orderBy: [{ endDate: 'desc' }],
    take: 500,
  });

  const now = new Date();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Topluluk"
        title="Sponsorlar"
        description={`Toplam ${sponsors.length} sponsor kaydı. İlk aktif sponsor eklendiğinde forum sayfasında widget otomatik görünür.`}
        actions={
          <Link
            href="/admin/sponsors/new"
            className="btn-dark inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-[13px] font-semibold"
          >
            <Plus className="h-[13px] w-[13px]" strokeWidth={2.25} />
            Yeni sponsor
          </Link>
        }
      />

      <DataTable
        colCount={5}
        emptyWhen={sponsors.length === 0}
        empty="Henüz sponsor yok. İlkini eklediğinde forumda otomatik görünür."
        head={
          <>
            <Th>Marka</Th>
            <Th>Tier</Th>
            <Th>Durum</Th>
            <Th>Süre</Th>
            <Th className="text-right">İşlem</Th>
          </>
        }
      >
        {sponsors.map((s) => {
          const live = s.active && s.startDate <= now && s.endDate > now;
          const upcoming = s.active && s.startDate > now;
          const ended = s.endDate <= now;
          return (
            <tr key={s.id}>
              <Td>
                <div className="flex items-center gap-3">
                  {s.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.logoUrl}
                      alt=""
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                      style={{ background: 'var(--bg-soft)' }}
                    />
                  ) : (
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
                      style={{
                        background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
                      }}
                    >
                      {s.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-medium truncate">{s.name}</div>
                    {s.websiteUrl && (
                      <div
                        className="truncate text-[11px]"
                        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                      >
                        {s.websiteUrl.replace(/^https?:\/\//, '')}
                      </div>
                    )}
                  </div>
                </div>
              </Td>
              <Td>
                <Pill tone="accent">{TIER_LABEL[s.tier] ?? s.tier}</Pill>
              </Td>
              <Td>
                {live && <Pill tone="green">Yayında</Pill>}
                {upcoming && <Pill tone="neutral">Başlayacak</Pill>}
                {!live && !upcoming && ended && <Pill tone="neutral">Bitti</Pill>}
                {!s.active && !ended && <Pill tone="red">Pasif</Pill>}
              </Td>
              <Td>
                <div className="text-[12px]">
                  {formatDateCaps(s.startDate)} – {formatDateCaps(s.endDate)}
                </div>
              </Td>
              <Td className="text-right">
                <Link
                  href={`/admin/sponsors/${s.id}`}
                  className="rounded-[6px] border px-2.5 py-1 text-[11.5px] font-medium"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  Düzenle
                </Link>
              </Td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
}
