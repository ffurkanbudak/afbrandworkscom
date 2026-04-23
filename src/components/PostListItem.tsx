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
};

export function PostListItem({
  slug,
  title,
  excerpt,
  publishedAt,
  authorName,
  coverImageUrl,
  coverImageAlt,
}: Props) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="group flex items-start gap-6 py-7"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div
        className="relative h-[112px] w-[140px] flex-shrink-0 overflow-hidden rounded-[8px] md:h-[128px] md:w-[180px]"
        style={{ background: 'var(--bg-soft)' }}
      >
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={coverImageAlt ?? title}
            fill
            sizes="(min-width: 768px) 180px, 140px"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
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
      <div className="min-w-0 flex-1 pt-1">
        <p
          className="text-[11px] font-semibold tracking-[0.08em]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          <span className="whitespace-nowrap">{formatDateCaps(publishedAt)}</span>
          {authorName && (
            <>
              <span className="mx-2 opacity-50">/</span>
              <span className="whitespace-nowrap uppercase">{authorName}</span>
            </>
          )}
        </p>
        <h3 className="mt-3 font-display text-[18px] leading-[1.25] transition group-hover:opacity-75 md:text-[20px]">
          {title}
        </h3>
        <p
          className="mt-2 max-w-[62ch] text-[15px] leading-[1.6] line-clamp-2"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
