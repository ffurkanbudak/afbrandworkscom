import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader, SectionHeader } from '../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../_components/Pill';
import { DataTable, Th, Td } from '../_components/DataTable';

export default async function SponsorshipsPage() {
  const [pending, reviewing, closed] = await Promise.all([
    db.sponsorshipRequest.findMany({ where: { status: 'PENDING' }, orderBy: { createdAt: 'desc' } }),
    db.sponsorshipRequest.findMany({ where: { status: 'REVIEWING' }, orderBy: { createdAt: 'desc' } }),
    db.sponsorshipRequest.findMany({ where: { status: { in: ['ACCEPTED', 'REJECTED'] } }, orderBy: { createdAt: 'desc' }, take: 50 }),
  ]);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Talepler"
        title="Sponsorluklar"
        description="Markalaşma günlüğüne sponsor olmak isteyen kurumsal talepler."
      />

      <Bucket title="Bekleyenler" items={pending} />
      <Bucket title="İncelemede" items={reviewing} />
      <Bucket title="Tamamlanmış" items={closed} />
    </div>
  );
}

function Bucket({
  title,
  items,
}: {
  title: string;
  items: Array<{
    id: string;
    company: string;
    name: string;
    email: string;
    budgetRange: string | null;
    timeline: string | null;
    status: string;
    createdAt: Date;
  }>;
}) {
  return (
    <section>
      <SectionHeader title={title} hint={`${items.length} kayıt`} />
      {items.length === 0 ? (
        <div
          className="rounded-2xl border px-5 py-8 text-[13px]"
          style={{ borderColor: 'var(--border)', color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Kayıt yok.
        </div>
      ) : (
        <DataTable
          colCount={6}
          head={
            <>
              <Th>Firma</Th>
              <Th>Kişi</Th>
              <Th>Bütçe</Th>
              <Th>Takvim</Th>
              <Th>Durum</Th>
              <Th className="text-right">Tarih</Th>
            </>
          }
        >
          {items.map((r) => (
            <tr key={r.id}>
              <Td>
                <Link href={`/admin/sponsorships/${r.id}`} className="font-medium hover:underline">
                  {r.company}
                </Link>
              </Td>
              <Td>
                <div>{r.name}</div>
                <div
                  className="text-[11.5px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {r.email}
                </div>
              </Td>
              <Td>{r.budgetRange ?? '·'}</Td>
              <Td>{r.timeline ?? '·'}</Td>
              <Td>
                <Pill tone={statusTone(r.status)}>{STATUS_LABEL[r.status] ?? r.status}</Pill>
              </Td>
              <Td className="text-right">
                <Link
                  href={`/admin/sponsorships/${r.id}`}
                  className="inline-flex items-center gap-1 text-[12px] font-medium"
                >
                  {formatDateCaps(r.createdAt)}
                  <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
                </Link>
              </Td>
            </tr>
          ))}
        </DataTable>
      )}
    </section>
  );
}
