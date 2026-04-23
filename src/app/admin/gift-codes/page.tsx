import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../_components/PageHeader';
import { DataTable, Th } from '../_components/DataTable';
import { GiftCodeForm } from './_components/GiftCodeForm';
import { GiftCodeRow } from './_components/GiftCodeRow';

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Aktif',
  REDEEMED: 'Kullanıldı',
  EXPIRED: 'Süresi doldu',
  REVOKED: 'İptal',
};

const STATUS_TONE: Record<string, 'neutral' | 'green' | 'accent' | 'red' | 'violet'> = {
  ACTIVE: 'green',
  REDEEMED: 'accent',
  EXPIRED: 'neutral',
  REVOKED: 'red',
};

const PLAN_LABEL: Record<string, string> = {
  GOZLEMCI: 'Gözlemci',
  ORTAK: 'Ortak',
  MIMARI: 'Mimari',
};

export default async function GiftCodesPage() {
  const [codes, totals] = await Promise.all([
    db.giftCode.findMany({
      orderBy: [{ createdAt: 'desc' }],
      take: 500,
      include: {
        redeemedBy: {
          select: { id: true, email: true, name: true, firstName: true, lastName: true },
        },
      },
    }),
    db.giftCode.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
  ]);

  const count = (s: string) => totals.find((t) => t.status === s)?._count._all ?? 0;

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Topluluk"
        title="Hediye Kodları"
        description={`Toplam ${codes.length} kod · ${count('ACTIVE')} aktif · ${count('REDEEMED')} kullanıldı`}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
        <div
          className="rounded-2xl border p-6"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="eyebrow">Yeni kod üret</p>
          <p
            className="mt-2 text-[12.5px] leading-[1.55]"
            style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
          >
            Ortak veya Mimari paketi tek kullanımlık bir kodla hediye et. Kod
            üretildiği tarihten itibaren altı ay geçerlidir.
          </p>
          <div className="mt-5">
            <GiftCodeForm />
          </div>
        </div>

        <DataTable
          colCount={6}
          emptyWhen={codes.length === 0}
          empty="Henüz hediye kodu üretilmemiş."
          head={
            <>
              <Th>Kod</Th>
              <Th>Paket</Th>
              <Th>Durum</Th>
              <Th>Alıcı</Th>
              <Th className="text-right">Son kullanma</Th>
              <Th className="text-right">İşlem</Th>
            </>
          }
        >
          {codes.map((c) => (
            <GiftCodeRow
              key={c.id}
              row={{
                id: c.id,
                code: c.code,
                plan: c.plan,
                planLabel: PLAN_LABEL[c.plan] ?? c.plan,
                status: c.status,
                statusLabel: STATUS_LABEL[c.status] ?? c.status,
                statusTone: STATUS_TONE[c.status] ?? 'neutral',
                senderName: c.senderName,
                senderEmail: c.senderEmail,
                recipientEmail: c.recipientEmail,
                note: c.note,
                redeemedByEmail: c.redeemedBy?.email ?? null,
                redeemedByName:
                  c.redeemedBy?.name ?? c.redeemedBy?.firstName ?? null,
                redeemedAt: c.redeemedAt ? formatDateCaps(c.redeemedAt) : null,
                expiresAt: formatDateCaps(c.expiresAt),
                createdAt: formatDateCaps(c.createdAt),
              }}
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
}
