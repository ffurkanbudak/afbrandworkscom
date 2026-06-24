import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { auth } from '@/lib/admin-auth';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { Comments } from '@/components/Comments';

import type { Metadata } from 'next';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = await db.newsItem.findUnique({ where: { id }, include: { source: true } });
  if (!item) return { title: 'Haber bulunamadı' };
  const title = item.titleTr ?? item.originalTitle;
  const description = item.summaryTr ?? item.originalExcerpt ?? undefined;
  const url = `${SITE_URL}/gundem/${item.id}`;
  const image = item.imageUrl ?? `${SITE_URL}/ahmetfurkanbudak.jpeg`;
  return {
    title,
    description,
    alternates: { canonical: `/gundem/${item.id}` },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: item.publishedAt?.toISOString(),
      modifiedTime: (item.approvedAt ?? item.publishedAt)?.toISOString(),
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.newsItem.findUnique({
    where: { id },
    include: { source: true },
  });
  if (!item || item.status !== 'APPROVED') return notFound();

  const { userId } = await auth();

  let host = '';
  try {
    host = new URL(item.externalUrl).hostname.replace(/^www\./, '');
  } catch {
    host = '';
  }

  const related = await db.newsItem.findMany({
    where: { status: 'APPROVED', id: { not: item.id } },
    orderBy: [{ approvedAt: 'desc' }, { publishedAt: 'desc' }],
    include: { source: true },
    take: 4,
  });

  return (
    <article className="fade-up mx-auto max-w-[760px] pt-10 md:pt-16">
      <Link
        href="/gundem"
        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        <ArrowLeft className="h-[13px] w-[13px]" strokeWidth={1.75} />
        Tüm gündem
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-2.5">
          {item.source.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.source.logoUrl}
              alt=""
              className="h-[22px] w-[22px] rounded-[4px]"
            />
          )}
          <span
            lang={item.source.language === 'EN' ? 'en' : undefined}
            className="text-[12.5px] font-semibold tracking-[0.12em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
          >
            {item.source.name}
          </span>
          {item.source.language === 'EN' && (
            <span
              className="rounded-[4px] border px-1.5 py-[1px] text-[9.5px] font-semibold tracking-[0.12em] uppercase"
              style={{
                borderColor: 'color-mix(in oklab, var(--fg) 18%, transparent)',
                color: 'color-mix(in oklab, var(--fg) 52%, transparent)',
              }}
            >
              TR çeviri
            </span>
          )}
          <span
            className="ml-auto text-[12px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
          >
            {formatDateCaps(item.publishedAt)}
          </span>
        </div>

        <h1 className="font-display mt-6 text-[34px] leading-[1.08] tracking-tight md:text-[44px]">
          {item.titleTr ?? item.originalTitle}
        </h1>
      </header>

      {item.imageUrl && (
        <div
          className="mt-8 overflow-hidden rounded-2xl border"
          style={{ borderColor: 'var(--border)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.imageUrl} alt="" className="h-auto w-full object-cover" />
        </div>
      )}

      {item.summaryTr && (
        <p
          className="mt-8 text-[17px] leading-[1.65]"
          style={{ color: 'color-mix(in oklab, var(--fg) 80%, transparent)' }}
        >
          {item.summaryTr}
        </p>
      )}

      {item.editorialNote && (
        <div className="mt-6 flex gap-3">
          <span
            aria-hidden
            className="mt-[5px] inline-block w-[2px] shrink-0 self-stretch rounded-full"
            style={{ background: 'color-mix(in oklab, var(--fg) 22%, transparent)' }}
          />
          <p
            className="text-[14px] italic leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
          >
            {item.editorialNote}
          </p>
        </div>
      )}

      <a
        href={item.externalUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="mt-10 flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 transition hover:bg-[color-mix(in_oklab,var(--fg)_4%,transparent)]"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="min-w-0">
          <p
            className="text-[11px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
          >
            Orijinal kaynak
          </p>
          <p className="mt-1 truncate text-[14px] font-semibold">
            {host || item.source.name}
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1 text-[13px] font-semibold"
          style={{ color: 'var(--fg)' }}
        >
          Tam metni oku
          <ExternalLink className="h-[13px] w-[13px]" strokeWidth={2} />
        </span>
      </a>

      <div className="mt-16">
        <Comments
          listUrl={`/api/news/${item.id}/comments`}
          deleteUrlBase="/api/news/comments"
          signInRedirect={`/gundem/${item.id}`}
          isSignedIn={!!userId}
        />
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t pt-10" style={{ borderColor: 'var(--border)' }}>
          <p className="eyebrow">Diğer haberler</p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/gundem/${r.id}`}
                  className="group flex gap-3 rounded-[10px] border p-3 transition hover:bg-[color-mix(in_oklab,var(--fg)_4%,transparent)]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="min-w-0 flex-1">
                    <p
                      lang={r.source.language === 'EN' ? 'en' : undefined}
                      className="text-[11px] font-semibold tracking-[0.12em] uppercase"
                      style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                    >
                      {r.source.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[14px] font-semibold leading-[1.3]">
                      {r.titleTr ?? r.originalTitle}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-[14px] w-[14px] shrink-0 opacity-50 transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                    strokeWidth={1.85}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
