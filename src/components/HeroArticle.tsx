import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Globe } from 'lucide-react';
import { formatDateCaps } from '@/lib/format';
import { NewBadge } from './NewBadge';

type Props = {
  slug: string;
  title: string;
  publishedAt: Date | string | null;
  authorName: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  excerpt?: string | null;
  primaryTag?: string;
  sponsored?: boolean;
};

export function HeroArticle({
  slug,
  title,
  publishedAt,
  authorName,
  coverImageUrl,
  coverImageAlt,
  excerpt,
  primaryTag,
  sponsored = false,
}: Props) {
  // aria-label vermiyoruz: erişilebilir ad görünür metinden hesaplanır.
  // Sabit bir etiket, görünür metinle uyuşmadığı için WCAG ihlali üretiyordu.
  return (
    <Link
      href={`/posts/${slug}`}
      className="group block"
    >
      <article
        className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:gap-10"
      >
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-[6px] md:col-span-7 lg:col-span-7"
          style={{ background: 'var(--bg-soft)' }}
        >
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={coverImageAlt ?? title}
              fill
              sizes="(min-width: 1024px) 720px, (min-width: 768px) 60vw, 100vw"
              className="object-contain transition duration-700 group-hover:scale-[1.02]"
              priority
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(at 30% 20%, #3A3A3A 0%, transparent 55%), radial-gradient(at 75% 80%, #1A1A1A 0%, transparent 50%), linear-gradient(160deg, #242424 0%, #0F0F0F 100%)',
              }}
              aria-hidden
            />
          )}
        </div>

        <div className="flex flex-col justify-center md:col-span-5 lg:col-span-5">
          <div className="flex flex-wrap items-center gap-2">
            {primaryTag && (
              <span
                className="inline-flex items-center whitespace-nowrap rounded-[4px] border px-2 py-[3px] text-[9px] font-semibold tracking-[0.1em] uppercase"
                style={{
                  borderColor: 'var(--border)',
                  color: 'color-mix(in oklab, var(--fg) 78%, transparent)',
                }}
              >
                {primaryTag}
              </span>
            )}
            <NewBadge publishedAt={publishedAt} size="sm" />
            {sponsored && (
              <span
                className="inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-[3px] text-[10px] font-semibold tracking-[0.12em] uppercase"
                style={{
                  borderColor: 'var(--border)',
                  color: 'color-mix(in oklab, var(--fg) 78%, transparent)',
                }}
              >
                <Globe className="h-[10px] w-[10px]" strokeWidth={2} />
                Sponsorlu
              </span>
            )}
          </div>

          <h2
            className="font-display mt-4 text-[24px] leading-[1.12] tracking-tight transition group-hover:opacity-80 md:mt-5 md:text-[28px] lg:text-[34px]"
            style={{ color: 'var(--fg)', fontWeight: 700 }}
          >
            {title}
          </h2>

          {excerpt && (
            <p
              className="mt-4 line-clamp-3 max-w-[52ch] text-[15px] leading-[1.6] md:text-[15.5px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
            >
              {excerpt}
            </p>
          )}

          <div
            className="mt-6 flex items-center justify-between gap-4 border-t pt-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <p
              className="text-[11px] font-medium tracking-[0.01em]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              {authorName}
              <span className="mx-2 opacity-50">·</span>
              <span>{formatDateCaps(publishedAt)}</span>
            </p>
            <span
              className="inline-flex items-center gap-1 text-[12px] font-medium tracking-tight transition group-hover:translate-x-0.5"
              style={{ color: 'var(--fg)' }}
            >
              Oku
              <ArrowUpRight className="h-[13px] w-[13px]" strokeWidth={2} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
