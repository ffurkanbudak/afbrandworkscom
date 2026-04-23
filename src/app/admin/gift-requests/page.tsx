import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../_components/PageHeader';
import { Pill } from '../_components/Pill';
import { DataTable, Th, Td } from '../_components/DataTable';

const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Yeni',
  AWAITING_PAYMENT: 'Ödeme bekleniyor',
  COMPLETED: 'Tamamlandı',
  CANCELLED: 'İptal',
};

const STATUS_TONE: Record<string, 'neutral' | 'green' | 'accent' | 'red' | 'violet'> = {
  PENDING: 'red',
  AWAITING_PAYMENT: 'accent',
  COMPLETED: 'green',
  CANCELLED: 'neutral',
};

const PLAN_LABEL: Record<string, string> = {
  GOZLEMCI: 'Gözlemci',
  ORTAK: 'Ortak',
  MIMARI: 'Mimari',
};

export default async function GiftRequestsPage() {
  const [requests, totals] = await Promise.all([
    db.giftRequest.findMany({
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
      take: 500,
    }),
    db.giftRequest.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
  ]);

  const count = (s: string) => totals.find((t) => t.status === s)?._count._all ?? 0;

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Topluluk"
        title="Hediye Talepleri"
        description={`${requests.length} toplam · ${count('PENDING')} yeni · ${count('AWAITING_PAYMENT')} ödeme bekliyor`}
      />

      <DataTable
        colCount={6}
        emptyWhen={requests.length === 0}
        empty="Henüz hediye talebi yok."
        head={
          <>
            <Th>Gönderen</Th>
            <Th>Paket</Th>
            <Th>Alıcı</Th>
            <Th>Durum</Th>
            <Th>Tarih</Th>
            <Th className="text-right"> </Th>
          </>
        }
      >
        {requests.map((r) => (
          <tr key={r.id}>
            <Td>
              <div className="font-medium">{r.senderName}</div>
              <div
                className="truncate text-[11.5px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                {r.senderEmail}
              </div>
            </Td>
            <Td>
              <Pill tone="accent">{PLAN_LABEL[r.plan] ?? r.plan}</Pill>
            </Td>
            <Td>
              {r.recipientEmail ? (
                <>
                  <div className="text-[12.5px]">
                    {r.recipientName ?? r.recipientEmail.split('@')[0]}
                  </div>
                  <div
                    className="text-[11px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    {r.recipientEmail}
                  </div>
                </>
              ) : (
                <span
                  className="text-[12px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 45%, transparent)' }}
                >
                  Gönderene iletilecek
                </span>
              )}
            </Td>
            <Td>
              <Pill tone={STATUS_TONE[r.status] ?? 'neutral'}>
                {STATUS_LABEL[r.status] ?? r.status}
              </Pill>
            </Td>
            <Td>
              <div className="text-[12.5px]">{formatDateCaps(r.createdAt)}</div>
            </Td>
            <Td className="text-right">
              <Link
                href={`/admin/gift-requests/${r.id}`}
                className="inline-flex items-center gap-1 text-[12px] font-medium"
                style={{ color: 'var(--fg)' }}
              >
                Aç
                <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
              </Link>
            </Td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
