import Link from 'next/link';
import { Plus, ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../_components/Pill';
import { DataTable, Th, Td } from '../_components/DataTable';

export default async function BrandStoriesAdminPage() {
  const rows = await db.brandStory.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    take: 500,
  });

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="İçerik"
        title="Marka Hikayeleri"
        description={`${rows.length} kayıt. Markalardan Hikayeler sayfasının kaynağı.`}
        actions={
          <Link
            href="/admin/brand-stories/new"
            className="btn-dark inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-[13px] font-semibold"
          >
            <Plus className="h-[13px] w-[13px]" strokeWidth={2.25} />
            Yeni marka
          </Link>
        }
      />

      <DataTable
        colCount={6}
        emptyWhen={rows.length === 0}
        empty="Henüz marka hikayesi yok."
        head={
          <>
            <Th>Marka</Th>
            <Th>Sektör</Th>
            <Th>Menşei</Th>
            <Th>Durum</Th>
            <Th>Güncelleme</Th>
            <Th className="text-right"> </Th>
          </>
        }
      >
        {rows.map((r) => (
          <tr key={r.id}>
            <Td>
              <div className="flex items-center gap-3">
                {r.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.logoUrl}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                    style={{ background: 'var(--bg-soft)' }}
                  />
                ) : (
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold"
                    style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)' }}
                  >
                    {r.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="truncate font-medium">{r.name}</div>
                  <div
                    className="truncate text-[11px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    {r.headquartersCity ? `${r.headquartersCity}, ` : ''}
                    {r.headquartersCountry} · {r.foundedYear}
                  </div>
                </div>
              </div>
            </Td>
            <Td>
              <span className="text-[12.5px]">{r.sector}</span>
            </Td>
            <Td>
              <Pill tone={r.origin === 'GLOBAL' ? 'accent' : 'neutral'}>
                {r.origin === 'GLOBAL' ? 'Global' : 'Yerel'}
              </Pill>
            </Td>
            <Td>
              <Pill tone={statusTone(r.status)}>
                {STATUS_LABEL[r.status] ?? r.status}
              </Pill>
            </Td>
            <Td>
              <span className="text-[12px]">{formatDateCaps(r.updatedAt)}</span>
            </Td>
            <Td className="text-right">
              <Link
                href={`/admin/brand-stories/${r.id}`}
                className="inline-flex items-center gap-1 text-[12px] font-medium"
                style={{ color: 'var(--fg)' }}
              >
                Düzenleyin
                <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
              </Link>
            </Td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
