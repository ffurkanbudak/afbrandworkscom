import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../../_components/PageHeader';
import { Pill } from '../../_components/Pill';
import { RequestActions } from './_components/RequestActions';

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

export default async function GiftRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = await db.giftRequest.findUnique({ where: { id } });
  if (!r) notFound();

  return (
    <div className="space-y-8">
      <Link
        href="/admin/gift-requests"
        className="inline-flex items-center gap-1 text-[12px] font-medium"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        <ArrowLeft className="h-[12px] w-[12px]" strokeWidth={2} />
        Hediye Talepleri
      </Link>

      <PageHeader
        eyebrow="Hediye talebi"
        title={r.senderName}
        description={r.senderEmail}
        actions={
          <div className="flex items-center gap-2">
            <Pill tone={STATUS_TONE[r.status] ?? 'neutral'}>
              {STATUS_LABEL[r.status] ?? r.status}
            </Pill>
            <Pill tone="accent">{PLAN_LABEL[r.plan] ?? r.plan}</Pill>
          </div>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <article
          className="rounded-2xl border p-6"
          style={{ borderColor: 'var(--border)' }}
        >
          <dl className="space-y-4 text-[13.5px]">
            <Row label="Ad">{r.senderName}</Row>
            <Row label="E-posta">{r.senderEmail}</Row>
            {r.senderPhone && <Row label="Telefon">{r.senderPhone}</Row>}
            <Row label="Paket">{PLAN_LABEL[r.plan] ?? r.plan}</Row>
            {r.recipientName && <Row label="Alıcı adı">{r.recipientName}</Row>}
            {r.recipientEmail && <Row label="Alıcı e-postası">{r.recipientEmail}</Row>}
            <Row label="Talep tarihi">{formatDateCaps(r.createdAt)}</Row>
            {r.issuedCode && (
              <Row label="Üretilen kod">
                <span className="font-mono font-semibold">{r.issuedCode}</span>
              </Row>
            )}
          </dl>
          {r.note && (
            <div
              className="mt-6 border-t pt-5"
              style={{ borderColor: 'var(--border)' }}
            >
              <p className="eyebrow">Gönderen notu</p>
              <p className="mt-2 text-[13.5px] leading-[1.6] whitespace-pre-wrap">
                {r.note}
              </p>
            </div>
          )}
        </article>

        <aside>
          <RequestActions
            id={r.id}
            status={r.status}
            adminNote={r.adminNote ?? ''}
            issuedCode={r.issuedCode ?? ''}
          />
          <Link
            href={`/admin/gift-codes`}
            className="mt-4 block rounded-[8px] border px-3 py-2 text-center text-[12.5px] font-medium"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            Hediye kodu üret →
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <dt
        className="w-[140px] shrink-0 text-[11.5px] font-semibold tracking-[0.06em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}
