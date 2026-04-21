import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader, SectionHeader } from '../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../_components/Pill';
import { DataTable, Th, Td } from '../_components/DataTable';
import { BulkActions } from './BulkActions';

export default async function MessagesPage() {
  const [unread, read, archived] = await Promise.all([
    db.contactMessage.findMany({ where: { status: 'UNREAD' }, orderBy: { createdAt: 'desc' } }),
    db.contactMessage.findMany({ where: { status: 'READ' }, orderBy: { createdAt: 'desc' }, take: 40 }),
    db.contactMessage.findMany({ where: { status: 'ARCHIVED' }, orderBy: { createdAt: 'desc' }, take: 20 }),
  ]);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Talepler"
        title="Mesajlar"
        description="İletişim formundan gelen mesajlar, sponsor dışı serbest talepler."
      />
      <Bucket
        title="Okunmamış"
        items={unread}
        actions={
          unread.length > 0 ? (
            <BulkActions
              actions={[
                { action: 'mark-all-read', label: 'Hepsini okundu işaretle' },
                { action: 'archive-all-unread', label: 'Hepsini arşivle' },
              ]}
            />
          ) : null
        }
      />
      <Bucket title="Okunmuş" items={read} />
      <Bucket
        title="Arşiv"
        items={archived}
        actions={
          archived.length > 0 ? (
            <BulkActions
              actions={[
                {
                  action: 'empty-archive',
                  label: 'Arşivi temizle',
                  confirm: 'Arşivdeki tüm mesajlar kalıcı olarak silinecek. Emin misin?',
                  danger: true,
                },
              ]}
            />
          ) : null
        }
      />
    </div>
  );
}

function Bucket({
  title,
  items,
  actions,
}: {
  title: string;
  items: Array<{
    id: string;
    name: string;
    email: string;
    topic: string | null;
    message: string;
    status: string;
    createdAt: Date;
  }>;
  actions?: ReactNode;
}) {
  return (
    <section>
      <SectionHeader title={title} hint={`${items.length} kayıt`} actions={actions} />
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
              <Th>Kimden</Th>
              <Th>Konu</Th>
              <Th>Mesaj</Th>
              <Th>Durum</Th>
              <Th className="text-right">Tarih</Th>
            </>
          }
        >
          {items.map((m) => (
            <tr key={m.id}>
              <Td>
                <Link href={`/admin/messages/${m.id}`} className="font-medium hover:underline">
                  {m.name}
                </Link>
                <div
                  className="text-[11.5px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {m.email}
                </div>
              </Td>
              <Td>{m.topic ?? '·'}</Td>
              <Td>
                <p className="line-clamp-2 text-[12.5px]">{m.message}</p>
              </Td>
              <Td>
                <Pill tone={statusTone(m.status)}>{STATUS_LABEL[m.status] ?? m.status}</Pill>
              </Td>
              <Td className="text-right">
                <Link
                  href={`/admin/messages/${m.id}`}
                  className="inline-flex items-center gap-1 text-[12px] font-medium"
                >
                  {formatDateCaps(m.createdAt)}
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
