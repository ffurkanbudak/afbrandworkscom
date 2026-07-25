import Link from 'next/link';
import Image from 'next/image';
import { formatDateCaps } from '@/lib/format';
import { NewBadge } from './NewBadge';

type Props = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: Date | string | null;
  authorName?: string;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  primaryTag?: string;
};

export function PostListItem({
  slug,
  title,
  excerpt,
  publishedAt,
  authorName,
  coverImageUrl,
  coverImageAlt,
  primaryTag,
}: Props) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="group flex items-start gap-6 py-6 md:py-7"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div
        className="relative aspect-[16/9] w-[132px] flex-shrink-0 overflow-hidden rounded-[6px] md:w-[170px]"
        style={{ background: 'var(--bg-soft)' }}
      >
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={coverImageAlt ?? title}
            fill
            sizes="(min-width: 768px) 170px, 132px"
            className="object-contain transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center wordmark text-[48px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 18%, transparent)' }}
            aria-hidden
          >
            {title.charAt(0)}
          </div>
        )}
        <NewBadge publishedAt={publishedAt} variant="dark" className="absolute left-2 top-2" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
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
        <h3
          className={`font-display text-[18px] leading-[1.25] transition group-hover:opacity-75 md:text-[20px] ${primaryTag ? 'mt-2.5' : ''}`}
          style={{ fontWeight: 700 }}
        >
          {title}
        </h3>
        <p
          className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.6] line-clamp-2"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          {excerpt}
        </p>
        <p
          className="mt-3 flex flex-wrap items-center gap-x-2 text-[11px] font-medium tracking-[0.01em]"
          style={{ color: 'color-mix(in oklab, var(--fg) 52%, transparent)' }}
        >
          {authorName && <span>{authorName}</span>}
          {authorName && <span className="opacity-40">·</span>}
          <span>{formatDateCaps(publishedAt)}</span>
        </p>
      </div>
    </Link>
  );
}
