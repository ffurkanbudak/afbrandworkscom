import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader, SectionHeader } from '../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../_components/Pill';
import { DataTable, Th, Td } from '../_components/DataTable';

export default async function ApplicationsPage() {
  const [pending, reviewing, closed] = await Promise.all([
    db.writerApplication.findMany({ where: { status: 'PENDING' }, orderBy: { createdAt: 'desc' } }),
    db.writerApplication.findMany({ where: { status: 'REVIEWING' }, orderBy: { createdAt: 'desc' } }),
    db.writerApplication.findMany({ where: { status: { in: ['ACCEPTED', 'REJECTED'] } }, orderBy: { createdAt: 'desc' }, take: 50 }),
  ]);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Talepler"
        title="Yazar Başvuruları"
        description="Topluluktan gelen yazı önerilerini değerlendir, kabul ya da reddet."
      />

      <Bucket title="Bekleyenler" hint="İncelenmeyi bekliyor." items={pending} />
      <Bucket title="İncelemede" hint="Üzerine düşündüklerin." items={reviewing} />
      <Bucket title="Tamamlanmış" hint="Kabul ya da reddedilenler." items={closed} collapsedDefault />
    </div>
  );
}

function Bucket({
  title,
  hint,
  items,
  collapsedDefault,
}: {
  title: string;
  hint: string;
  items: Array<{
    id: string;
    name: string;
    email: string;
    proposedTitle: string;
    pitch: string;
    topics: string | null;
    status: string;
    createdAt: Date;
  }>;
  collapsedDefault?: boolean;
}) {
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
        <DataTable
          colCount={5}
          head={
            <>
              <Th>Aday</Th>
              <Th>Önerilen başlık</Th>
              <Th>Konular</Th>
              <Th>Durum</Th>
              <Th className="text-right">Tarih</Th>
            </>
          }
        >
          {items.map((a) => (
            <tr key={a.id}>
              <Td>
                <Link href={`/admin/applications/${a.id}`} className="font-medium hover:underline">
                  {a.name}
                </Link>
                <div
                  className="mt-0.5 text-[11.5px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {a.email}
                </div>
              </Td>
              <Td>
                <p className="line-clamp-2 text-[13px]">{a.proposedTitle}</p>
              </Td>
              <Td>
                <span className="text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}>
                  {a.topics ?? '·'}
                </span>
              </Td>
              <Td>
                <Pill tone={statusTone(a.status)}>{STATUS_LABEL[a.status] ?? a.status}</Pill>
              </Td>
              <Td className="text-right">
                <Link
                  href={`/admin/applications/${a.id}`}
                  className="inline-flex items-center gap-1 text-[12px] font-medium"
                >
                  {formatDateCaps(a.createdAt)}
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
