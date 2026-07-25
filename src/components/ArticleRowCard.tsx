import Link from 'next/link';
import Image from 'next/image';
import { formatDateCaps } from '@/lib/format';
import { NewBadge } from './NewBadge';

type Props = {
  slug: string;
  title: string;
  publishedAt: Date | string | null;
  authorName: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  primaryTag?: string;
};

export function ArticleRowCard({
  slug,
  title,
  publishedAt,
  authorName,
  coverImageUrl,
  coverImageAlt,
  primaryTag,
}: Props) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="group flex items-center gap-5 transition"
    >
      <div
        className="relative aspect-[16/9] w-[160px] flex-shrink-0 overflow-hidden rounded-[6px]"
        style={{ background: 'var(--bg-soft)' }}
      >
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={coverImageAlt ?? title}
            fill
            sizes="160px"
            className="object-contain transition duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center wordmark text-[32px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 24%, transparent)' }}
            aria-hidden
          >
            {title.charAt(0)}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
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
          <NewBadge publishedAt={publishedAt} />
        </div>
        <h3
          className="mt-2 line-clamp-2 font-display text-[16.5px] leading-[1.22] transition group-hover:opacity-75 md:text-[17.5px]"
          style={{ color: 'var(--fg)', fontWeight: 700 }}
        >
          {title}
        </h3>
        <p
          className="mt-2 flex items-center gap-x-2 text-[11px] font-medium tracking-[0.01em]"
          style={{ color: 'color-mix(in oklab, var(--fg) 52%, transparent)' }}
        >
          <span className="truncate">{authorName}</span>
          <span className="opacity-40">·</span>
          <span className="truncate">{formatDateCaps(publishedAt)}</span>
        </p>
      </div>
    </Link>
  );
}
