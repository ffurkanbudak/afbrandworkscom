import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../../_components/Pill';
import { MessageActions } from './MessageActions';

export default async function MessageDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = await db.contactMessage.findUnique({ where: { id } });
  if (!m) notFound();

  if (m.status === 'UNREAD') {
    await db.contactMessage.update({
      where: { id },
      data: { status: 'READ', readAt: new Date() },
    });
  }

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Mesaj"
        title={m.topic ?? 'Konu yok'}
        description={`${m.name} · ${m.email}`}
        actions={<Pill tone={statusTone(m.status)}>{STATUS_LABEL[m.status] ?? m.status}</Pill>}
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <article
          className="rounded-2xl border p-7 text-[15px] leading-[1.7] whitespace-pre-wrap"
          style={{ borderColor: 'var(--border)' }}
        >
          {m.message}
        </article>

        <aside className="space-y-5">
          <div
            className="rounded-2xl border p-5 text-[13px]"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="eyebrow">Künye</p>
            <dl className="mt-4 space-y-3">
              <Row label="Kimden" value={m.name} />
              <Row label="E-posta" value={<a className="link-inline" href={`mailto:${m.email}?subject=Yanıt: ${m.topic ?? ''}`}>{m.email}</a>} />
              <Row label="Konu" value={m.topic ?? '·'} />
              <Row label="Alındı" value={formatDateCaps(m.createdAt)} />
              {m.readAt && <Row label="Okundu" value={formatDateCaps(m.readAt)} />}
            </dl>
          </div>

          <MessageActions id={m.id} status={m.status} email={m.email} topic={m.topic ?? ''} />
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt
        className="text-[10.5px] font-semibold tracking-[0.16em] uppercase"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        {label}
      </dt>
      <dd className="min-w-0 flex-1 truncate text-right">{value}</dd>
    </div>
  );
}
