import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../../_components/PageHeader';
import { Pill } from '../../_components/Pill';
import { NewsReviewForm } from './NewsReviewForm';

const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Taslak',
  PENDING_REVIEW: 'İnceleme bekliyor',
  APPROVED: 'Yayında',
  REJECTED: 'Reddedildi',
  ARCHIVED: 'Arşiv',
};

const STATUS_TONE: Record<string, 'amber' | 'violet' | 'green' | 'red' | 'neutral'> = {
  DRAFT: 'amber',
  PENDING_REVIEW: 'violet',
  APPROVED: 'green',
  REJECTED: 'red',
  ARCHIVED: 'neutral',
};

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.newsItem.findUnique({
    where: { id },
    include: { source: true },
  });
  if (!item) notFound();

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/news"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          <ArrowLeft className="h-[13px] w-[13px]" strokeWidth={1.75} />
          Tüm haberler
        </Link>
      </div>

      <PageHeader
        eyebrow={`Gündem · ${item.source.name}`}
        title={item.titleTr ?? item.originalTitle}
        actions={
          <Pill tone={STATUS_TONE[item.status] ?? 'neutral'}>
            {STATUS_LABEL[item.status] ?? item.status}
          </Pill>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <NewsReviewForm
            id={item.id}
            status={item.status}
            language={item.source.language}
            defaults={{
              titleTr: item.titleTr ?? '',
              summaryTr: item.summaryTr ?? '',
              editorialNote: item.editorialNote ?? '',
              rejectionReason: item.rejectionReason ?? '',
            }}
          />
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
            <p className="eyebrow">Orijinal</p>
            <h3 className="mt-3 text-[15.5px] font-semibold leading-[1.35]">
              {item.originalTitle}
            </h3>
            {item.originalExcerpt && (
              <p
                className="mt-3 text-[13px] leading-[1.6]"
                style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
              >
                {item.originalExcerpt}
              </p>
            )}
            <div
              className="mt-4 flex items-center justify-between gap-3 border-t pt-3 text-[11.5px]"
              style={{
                borderColor: 'var(--border)',
                color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
              }}
            >
              <span>{formatDateCaps(item.publishedAt)}</span>
              <a
                href={item.externalUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium"
                style={{ color: 'var(--fg)' }}
              >
                Orijinali aç
                <ExternalLink className="h-[11px] w-[11px]" strokeWidth={1.85} />
              </a>
            </div>
          </div>

          <div
            className="rounded-2xl border p-5 text-[12.5px]"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="eyebrow">Kaynak</p>
            <div className="mt-3 flex items-center gap-2.5">
              {item.source.logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.source.logoUrl}
                  alt=""
                  className="h-[22px] w-[22px] rounded-[4px]"
                />
              )}
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold">{item.source.name}</p>
                <p
                  className="truncate text-[11px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {item.source.language === 'TR' ? 'Türkçe kaynak' : 'İngilizce kaynak'}
                </p>
              </div>
            </div>
            {item.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt=""
                className="mt-4 h-auto w-full rounded-[10px] border"
                style={{ borderColor: 'var(--border)' }}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
