import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../../_components/Pill';
import { ApplicationActions } from './ApplicationActions';

export default async function ApplicationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await db.writerApplication.findUnique({ where: { id } });
  if (!app) notFound();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Yazar başvurusu"
        title={app.proposedTitle}
        description={`${app.name} · ${app.email}`}
        actions={<Pill tone={statusTone(app.status)}>{STATUS_LABEL[app.status] ?? app.status}</Pill>}
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <article
          className="rounded-2xl border p-7"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="eyebrow">Önerilen metin özeti</p>
          <p className="mt-3 text-[15px] leading-[1.7] whitespace-pre-wrap">{app.pitch}</p>

          {app.topics && (
            <>
              <p className="eyebrow mt-8">Konular</p>
              <p className="mt-2 text-[13px]">{app.topics}</p>
            </>
          )}

          {app.sampleUrl && (
            <div className="mt-8">
              <p className="eyebrow">Örnek çalışma</p>
              <Link
                href={app.sampleUrl}
                target="_blank"
                className="mt-2 inline-flex items-center gap-1.5 rounded-[6px] border px-3 py-1.5 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                style={{ borderColor: 'var(--border)' }}
              >
                {new URL(app.sampleUrl).host}
                <ExternalLink className="h-[12px] w-[12px]" strokeWidth={1.75} />
              </Link>
            </div>
          )}

          {app.rejectionReason && (
            <div
              className="mt-8 rounded-[10px] border-l-2 px-4 py-4"
              style={{
                borderColor: '#DC2626',
                background: 'color-mix(in oklab, #DC2626 5%, transparent)',
              }}
            >
              <p
                className="text-[10.5px] font-semibold tracking-[0.16em] uppercase"
                style={{ color: '#DC2626' }}
              >
                Adaya iletilen red gerekçesi
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.6] whitespace-pre-wrap">
                {app.rejectionReason}
              </p>
            </div>
          )}

          {app.adminNote && (
            <div
              className="mt-6 rounded-[10px] border px-4 py-4"
              style={{
                borderColor: 'var(--border)',
                background: 'color-mix(in oklab, var(--fg) 3%, transparent)',
              }}
            >
              <p
                className="text-[10.5px] font-semibold tracking-[0.16em] uppercase"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                İç not · sadece yönetici görür
              </p>
              <p className="mt-2 text-[13.5px] leading-[1.6] whitespace-pre-wrap">
                {app.adminNote}
              </p>
            </div>
          )}
        </article>

        <aside className="space-y-5">
          <div
            className="rounded-2xl border p-5 text-[13px]"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="eyebrow">Aday</p>
            <dl className="mt-4 space-y-3">
              <Row label="İsim" value={app.name} />
              <Row label="E-posta" value={<a className="link-inline" href={`mailto:${app.email}`}>{app.email}</a>} />
              {app.phone && <Row label="Telefon" value={app.phone} />}
              {app.linkedinUrl && (
                <Row
                  label="LinkedIn"
                  value={
                    <a className="link-inline" href={app.linkedinUrl} target="_blank">
                      Aç
                    </a>
                  }
                />
              )}
              <Row label="Başvuru" value={formatDateCaps(app.createdAt)} />
              {app.reviewedAt && <Row label="İncelendi" value={formatDateCaps(app.reviewedAt)} />}
            </dl>
          </div>

          <ApplicationActions
            id={app.id}
            status={app.status}
            note={app.adminNote ?? ''}
            rejectionReason={app.rejectionReason ?? ''}
          />
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
