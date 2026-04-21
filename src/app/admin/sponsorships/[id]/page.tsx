import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../../_components/Pill';
import { SponsorshipActions } from './SponsorshipActions';

export default async function SponsorshipDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = await db.sponsorshipRequest.findUnique({ where: { id } });
  if (!r) notFound();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Sponsorluk talebi"
        title={r.company}
        description={`${r.name} · ${r.email}`}
        actions={<Pill tone={statusTone(r.status)}>{STATUS_LABEL[r.status] ?? r.status}</Pill>}
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <article
          className="rounded-2xl border p-7"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="eyebrow">Hedefler</p>
          <p className="mt-3 text-[15px] leading-[1.7] whitespace-pre-wrap">{r.goals}</p>

          {r.adminNote && (
            <div className="mt-8 border-t pt-6" style={{ borderColor: 'var(--border)' }}>
              <p className="eyebrow">Not</p>
              <p className="mt-2 text-[13px] leading-[1.55] whitespace-pre-wrap">{r.adminNote}</p>
            </div>
          )}
        </article>

        <aside className="space-y-5">
          <div
            className="rounded-2xl border p-5 text-[13px]"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="eyebrow">Künye</p>
            <dl className="mt-4 space-y-3">
              <Row label="Firma" value={r.company} />
              <Row label="Kişi" value={r.name} />
              <Row label="E-posta" value={<a className="link-inline" href={`mailto:${r.email}`}>{r.email}</a>} />
              {r.phone && <Row label="Telefon" value={r.phone} />}
              {r.website && (
                <Row
                  label="Web"
                  value={
                    <Link
                      href={r.website}
                      target="_blank"
                      className="inline-flex items-center gap-1 link-inline"
                    >
                      Aç <ExternalLink className="h-[11px] w-[11px]" strokeWidth={1.75} />
                    </Link>
                  }
                />
              )}
              <Row label="Bütçe" value={r.budgetRange ?? '·'} />
              <Row label="Takvim" value={r.timeline ?? '·'} />
              <Row label="Talep" value={formatDateCaps(r.createdAt)} />
              {r.reviewedAt && <Row label="İncelendi" value={formatDateCaps(r.reviewedAt)} />}
            </dl>
          </div>

          <SponsorshipActions id={r.id} status={r.status} note={r.adminNote ?? ''} />
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
