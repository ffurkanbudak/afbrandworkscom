import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { requireSubscriber } from '@/lib/subscriber';
import { formatDateCaps } from '@/lib/format';
import { StatusPill, statusTone } from '@/components/StatusPill';
import { WriterApplicationForm } from './WriterApplicationForm';

const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Beklemede',
  REVIEWING: 'İnceleniyor',
  ACCEPTED: 'Kabul edildi',
  REJECTED: 'Reddedildi',
};

export default async function AccountWriterPage() {
  const sub = await requireSubscriber();
  const { userId } = await auth();
  if (userId) {
    const admin = await db.admin.findUnique({ where: { clerkId: userId }, select: { id: true } });
    if (admin) redirect('/hesap');
  }

  const existing = await db.writerApplication.findFirst({
    where: { OR: [{ subscriberId: sub.id }, { email: sub.email }] },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Yazar başvurusu</p>
        <h2 className="font-display mt-2 text-[28px] leading-[1.08] tracking-tight">
          Sen de buraya yaz
        </h2>
        <p
          className="mt-2 max-w-[58ch] text-[13.5px] leading-[1.55]"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Markalaşma, girişim, Türk dünyasında iş hayatı gibi alanlarda yazmak istiyorsan başvuruda
          bulunabilirsin. Kabul edilen yazılar imzan ile yayınlanır.
        </p>
      </div>

      {existing && (
        <div
          className="rounded-2xl border p-5 text-[13px]"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="eyebrow">Son başvurun</p>
              <p className="mt-2 font-semibold">{existing.proposedTitle}</p>
              <p
                className="mt-1 text-[11.5px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                {formatDateCaps(existing.createdAt)}
                {existing.decidedAt && (
                  <>
                    <span className="mx-1.5 opacity-50">·</span>
                    Karar: {formatDateCaps(existing.decidedAt)}
                  </>
                )}
              </p>
            </div>
            <StatusPill tone={statusTone(existing.status)}>
              {STATUS_LABEL[existing.status] ?? existing.status}
            </StatusPill>
          </div>

          {existing.status === 'REJECTED' && existing.rejectionReason && (
            <div
              className="mt-4 rounded-[10px] border-l-2 bg-[color-mix(in_oklab,#DC2626_6%,transparent)] p-3 text-[13px] leading-[1.55] whitespace-pre-wrap"
              style={{ borderColor: '#DC2626' }}
            >
              <p className="eyebrow text-[10px]" style={{ color: '#DC2626' }}>
                Red gerekçesi
              </p>
              <p className="mt-1.5">{existing.rejectionReason}</p>
            </div>
          )}
          {existing.status === 'ACCEPTED' && (
            <p
              className="mt-3 text-[13px] leading-[1.55]"
              style={{ color: '#16A34A' }}
            >
              Başvurun kabul edildi. Editör yakında seninle iletişime geçecek.
            </p>
          )}
          {existing.adminNote && (
            <p
              className="mt-3 border-t pt-3 text-[12.5px] leading-[1.55] whitespace-pre-wrap"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="eyebrow">Editörün notu</span>
              <br />
              {existing.adminNote}
            </p>
          )}
        </div>
      )}

      <WriterApplicationForm
        prefill={{
          name: sub.name ?? [sub.firstName, sub.lastName].filter(Boolean).join(' ') ?? '',
          email: sub.email,
        }}
      />
    </div>
  );
}
