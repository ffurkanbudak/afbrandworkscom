import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader, SectionHeader } from '../_components/PageHeader';
import { Pill } from '../_components/Pill';
import { DataTable, Th, Td } from '../_components/DataTable';

const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Taslak',
  PENDING_REVIEW: 'İnceleme',
  APPROVED: 'Yayında',
  REJECTED: 'Ret',
  ARCHIVED: 'Arşiv',
};

const STATUS_TONE: Record<string, 'amber' | 'violet' | 'green' | 'red' | 'neutral'> = {
  DRAFT: 'amber',
  PENDING_REVIEW: 'violet',
  APPROVED: 'green',
  REJECTED: 'red',
  ARCHIVED: 'neutral',
};

export default async function NewsAdminPage() {
  const [drafts, pending, approved, archived, sources] = await Promise.all([
    db.newsItem.findMany({
      where: { status: 'DRAFT' },
      include: { source: true },
      orderBy: { publishedAt: 'desc' },
      take: 50,
    }),
    db.newsItem.findMany({
      where: { status: 'PENDING_REVIEW' },
      include: { source: true },
      orderBy: { publishedAt: 'desc' },
    }),
    db.newsItem.findMany({
      where: { status: 'APPROVED' },
      include: { source: true },
      orderBy: { approvedAt: 'desc' },
      take: 40,
    }),
    db.newsItem.findMany({
      where: { status: { in: ['REJECTED', 'ARCHIVED'] } },
      include: { source: true },
      orderBy: { publishedAt: 'desc' },
      take: 20,
    }),
    db.newsSource.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Gündem"
        title="Markalaşma Haberleri"
        description="Dış kaynaklardan otomatik toplanır; Türkçeleştirip onayladıkların /gundem sayfasında yayımlanır."
      />

      <SourcesStrip sources={sources} />

      <Bucket title="Yeni gelenler" hint="AI çevirisi bekliyor." items={drafts} emptyText="Yeni haber yok." />
      <Bucket title="İnceleme bekliyor" hint="Çevirisi yapıldı, senin onayını bekliyor." items={pending} emptyText="İncelenecek öğe yok." />
      <Bucket title="Yayında" hint="/gundem sayfasında görünür." items={approved} emptyText="Henüz yayınlanmış haber yok." collapsedDefault />
      <Bucket title="Reddedilen & arşiv" hint="Artık herkese açık değil." items={archived} emptyText="Kayıt yok." collapsedDefault />
    </div>
  );
}

function SourcesStrip({
  sources,
}: {
  sources: Array<{
    id: string;
    name: string;
    logoUrl: string | null;
    language: 'EN' | 'TR';
    enabled: boolean;
    lastFetchedAt: Date | null;
    lastError: string | null;
  }>;
}) {
  return (
    <section>
      <SectionHeader title="Kaynaklar" hint={`${sources.filter((s) => s.enabled).length} / ${sources.length} aktif`} />
      <div className="flex flex-wrap gap-2">
        {sources.map((s) => (
          <div
            key={s.id}
            className="inline-flex items-center gap-2 rounded-[8px] border px-3 py-1.5 text-[12px]"
            style={{
              borderColor: 'var(--border)',
              background: s.enabled ? 'transparent' : 'color-mix(in oklab, var(--fg) 4%, transparent)',
              opacity: s.enabled ? 1 : 0.55,
            }}
            title={s.lastError ? `Hata: ${s.lastError}` : s.lastFetchedAt ? `Son: ${s.lastFetchedAt.toLocaleString('tr-TR')}` : 'Henüz çekilmedi'}
          >
            {s.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.logoUrl} alt="" className="h-[14px] w-[14px] rounded-sm" />
            )}
            <span>{s.name}</span>
            <span
              className="text-[9.5px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 45%, transparent)' }}
            >
              {s.language}
            </span>
            {s.lastError && (
              <span className="h-[6px] w-[6px] rounded-full" style={{ background: '#DC2626' }} aria-hidden />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

type Item = {
  id: string;
  originalTitle: string;
  titleTr: string | null;
  summaryTr: string | null;
  publishedAt: Date;
  externalUrl: string;
  status: string;
  source: { name: string; logoUrl: string | null; language: 'EN' | 'TR' };
};

function Bucket({
  title,
  hint,
  items,
  emptyText,
  collapsedDefault,
}: {
  title: string;
  hint: string;
  items: Item[];
  emptyText: string;
  collapsedDefault?: boolean;
}) {
  return (
    <section>
      <SectionHeader title={title} hint={`${hint} · ${items.length} kayıt`} />
      {items.length === 0 ? (
        <div
          className="rounded-2xl border px-5 py-8 text-[13px]"
          style={{
            borderColor: 'var(--border)',
            color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
          }}
        >
          {emptyText}
        </div>
      ) : (
        <DataTable
          colCount={5}
          head={
            <>
              <Th>Başlık</Th>
              <Th>Kaynak</Th>
              <Th>Durum</Th>
              <Th className="text-right">Tarih</Th>
              <Th className="text-right">Aksiyon</Th>
            </>
          }
        >
          {items.map((n) => (
            <tr key={n.id}>
              <Td>
                <Link
                  href={`/admin/news/${n.id}`}
                  className="line-clamp-2 font-medium hover:underline"
                >
                  {n.titleTr ?? n.originalTitle}
                </Link>
                {n.titleTr && (
                  <div
                    className="mt-0.5 line-clamp-1 text-[11.5px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 48%, transparent)' }}
                  >
                    {n.originalTitle}
                  </div>
                )}
              </Td>
              <Td>
                <div className="flex items-center gap-2 text-[12.5px]">
                  {n.source.logoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={n.source.logoUrl} alt="" className="h-[14px] w-[14px] rounded-sm" />
                  )}
                  <span>{n.source.name}</span>
                </div>
              </Td>
              <Td>
                <Pill tone={STATUS_TONE[n.status] ?? 'neutral'}>
                  {STATUS_LABEL[n.status] ?? n.status}
                </Pill>
              </Td>
              <Td className="text-right">
                <span className="text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}>
                  {formatDateCaps(n.publishedAt)}
                </span>
              </Td>
              <Td className="text-right">
                <div className="inline-flex items-center gap-2">
                  <a
                    href={n.externalUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                    title="Orijinali aç"
                  >
                    <ExternalLink className="h-[12px] w-[12px]" strokeWidth={1.85} />
                  </a>
                  <Link
                    href={`/admin/news/${n.id}`}
                    className="inline-flex items-center gap-1 text-[12px] font-medium"
                  >
                    Aç
                    <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
                  </Link>
                </div>
              </Td>
            </tr>
          ))}
        </DataTable>
      )}
      {collapsedDefault && null}
    </section>
  );
}

