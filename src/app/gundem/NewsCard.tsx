'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, MessageSquare, Newspaper } from 'lucide-react';
import { formatDateCaps } from '@/lib/format';

/** Haber görseli — bozuk/erişilemeyen URL'lerde kaynak logosuna/placeholder'a düşer. */
function FallbackImg({
  src,
  logoUrl,
  eager,
  logoSize,
}: {
  src: string | null;
  logoUrl: string | null;
  eager?: boolean;
  logoSize: number;
}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.035]"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt=""
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className="rounded-[8px] opacity-35 transition-opacity duration-500 group-hover:opacity-50"
          style={{ width: logoSize, height: logoSize }}
        />
      ) : (
        <Newspaper
          className="opacity-25"
          style={{ width: logoSize, height: logoSize }}
          strokeWidth={1.25}
          aria-hidden
        />
      )}
    </div>
  );
}

type Item = {
  id: string;
  titleTr: string | null;
  summaryTr: string | null;
  editorialNote: string | null;
  publishedAt: Date;
  approvedAt: Date | null;
  externalUrl: string;
  imageUrl: string | null;
  commentCount?: number;
  source: { name: string; logoUrl: string | null; language: 'EN' | 'TR' };
};

const ymdFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Istanbul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function isToday(d: Date | null | undefined): boolean {
  if (!d) return false;
  return ymdFormatter.format(d) === ymdFormatter.format(new Date());
}

function SourceRow({ item, size = 'sm' }: { item: Item; size?: 'sm' | 'lg' }) {
  const isNew = isToday(item.approvedAt);
  const logoSize = size === 'lg' ? 22 : 18;
  const textSize = size === 'lg' ? 'text-[12.5px]' : 'text-[11.5px]';

  return (
    <div className="flex items-center gap-2.5">
      {item.source.logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.source.logoUrl}
          alt=""
          className="rounded-[4px]"
          style={{ width: logoSize, height: logoSize }}
        />
      )}
      <span
        lang="en"
        className={`${textSize} font-semibold tracking-[0.12em] uppercase`}
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
          title="Çeviri editörden"
        >
          TR çeviri
        </span>
      )}
      {isNew && (
        <span
          className="inline-flex items-center gap-1 rounded-full px-1.5 py-[1px] text-[9.5px] font-semibold tracking-[0.12em] uppercase"
          style={{
            background: 'color-mix(in oklab, #22C55E 15%, transparent)',
            color: '#16A34A',
          }}
        >
          <span
            className="inline-block h-[5px] w-[5px] rounded-full"
            style={{ background: '#16A34A' }}
            aria-hidden
          />
          Yeni
        </span>
      )}
      <span
        className={`ml-auto ${textSize}`}
        style={{ color: 'color-mix(in oklab, var(--fg) 45%, transparent)' }}
      >
        {formatDateCaps(item.publishedAt)}
      </span>
    </div>
  );
}

function EditorialNote({ note }: { note: string }) {
  return (
    <div className="mt-4 flex gap-3">
      <span
        aria-hidden
        className="mt-[5px] inline-block w-[2px] shrink-0 self-stretch rounded-full"
        style={{ background: 'color-mix(in oklab, var(--fg) 22%, transparent)' }}
      />
      <p
        className="text-[12.5px] italic leading-[1.55]"
        style={{ color: 'color-mix(in oklab, var(--fg) 58%, transparent)' }}
      >
        {note}
      </p>
    </div>
  );
}

function CtaRow({ externalUrl, commentCount }: { externalUrl: string; commentCount?: number }) {
  let host = '';
  try {
    host = new URL(externalUrl).hostname.replace(/^www\./, '');
  } catch {
    host = '';
  }
  return (
    <div
      className="mt-5 flex items-center justify-between gap-3 border-t pt-4 text-[11.5px]"
      style={{ borderColor: 'var(--border)' }}
    >
      <a
        href={externalUrl}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="relative z-10 inline-flex min-w-0 items-center gap-1 truncate transition hover:underline"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        <ExternalLink className="h-[11px] w-[11px] shrink-0" strokeWidth={1.75} />
        <span className="truncate">{host || 'Kaynak'}</span>
      </a>
      <div className="flex items-center gap-3">
        {typeof commentCount === 'number' && commentCount > 0 && (
          <span
            className="inline-flex items-center gap-1"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            <MessageSquare className="h-[11px] w-[11px]" strokeWidth={1.75} />
            {commentCount}
          </span>
        )}
        <span
          className="inline-flex items-center gap-1 font-semibold tracking-tight"
          style={{ color: 'var(--fg)' }}
        >
          Oku
          <ArrowUpRight
            className="h-[12px] w-[12px] transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
            strokeWidth={2}
          />
        </span>
      </div>
    </div>
  );
}

export function NewsCard({ item }: { item: Item }) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_14px_32px_-18px_rgba(0,0,0,0.28)]"
      style={{ borderColor: 'var(--border)' }}
    >
      <Link
        href={`/gundem/${item.id}`}
        aria-label={item.titleTr ?? 'Haberi aç'}
        className="absolute inset-0 z-0"
      />
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{
          background: item.imageUrl
            ? 'color-mix(in oklab, var(--fg) 4%, transparent)'
            : 'linear-gradient(150deg, color-mix(in oklab, var(--fg) 7%, transparent) 0%, color-mix(in oklab, var(--fg) 2%, transparent) 65%, transparent 100%)',
        }}
      >
        <FallbackImg src={item.imageUrl} logoUrl={item.source.logoUrl} logoSize={44} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <SourceRow item={item} />

        <h2 className="font-display mt-4 text-[21px] leading-[1.22] tracking-tight md:text-[22px]">
          {item.titleTr}
        </h2>

        {item.summaryTr && (
          <p
            className="mt-3 text-[14px] leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
          >
            {item.summaryTr}
          </p>
        )}

        {item.editorialNote && <EditorialNote note={item.editorialNote} />}

        <div className="mt-auto">
          <CtaRow externalUrl={item.externalUrl} commentCount={item.commentCount} />
        </div>
      </div>
    </article>
  );
}

export function HeroNewsCard({ item }: { item: Item }) {
  return (
    <article
      className="group relative grid gap-8 overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_44px_-22px_rgba(0,0,0,0.3)] md:grid-cols-[1.05fr_1fr]"
      style={{ borderColor: 'var(--border)' }}
    >
      <Link
        href={`/gundem/${item.id}`}
        aria-label={item.titleTr ?? 'Haberi aç'}
        className="absolute inset-0 z-0"
      />
      <div
        className="relative order-1 aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[360px]"
        style={{
          background:
            'linear-gradient(160deg, color-mix(in oklab, var(--fg) 6%, transparent), color-mix(in oklab, var(--fg) 2%, transparent))',
        }}
      >
        <FallbackImg src={item.imageUrl} logoUrl={item.source.logoUrl} logoSize={56} eager />
      </div>

      <div className="order-2 flex flex-col p-7 md:p-10">
        <SourceRow item={item} size="lg" />

        <h2 className="font-display mt-5 text-[28px] leading-[1.12] tracking-tight md:text-[34px] lg:text-[38px]">
          {item.titleTr}
        </h2>

        {item.summaryTr && (
          <p
            className="mt-5 text-[15.5px] leading-[1.65] md:text-[16px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 72%, transparent)' }}
          >
            {item.summaryTr}
          </p>
        )}

        {item.editorialNote && <EditorialNote note={item.editorialNote} />}

        <div className="mt-auto pt-6">
          <CtaRow externalUrl={item.externalUrl} commentCount={item.commentCount} />
        </div>
      </div>
    </article>
  );
}
