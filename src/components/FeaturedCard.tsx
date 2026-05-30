import Link from 'next/link';
import Image from 'next/image';
import { formatDateCaps } from '@/lib/format';
import { NewBadge } from './NewBadge';

type Props = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: Date | string | null;
  authorName: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  primaryTag?: string;
};

export function FeaturedCard({
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
    <Link href={`/posts/${slug}`} className="group block">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px]"
        style={{ background: 'var(--bg-soft)' }}
      >
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={coverImageAlt ?? title}
            fill
            sizes="(min-width: 1024px) 340px, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center wordmark text-[64px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 18%, transparent)' }}
            aria-hidden
          >
            {title.charAt(0)}
          </div>
        )}
        <NewBadge publishedAt={publishedAt} variant="dark" className="absolute left-3 top-3" />
      </div>
      <div className="mt-4">
        {primaryTag && (
          <span
            className="inline-flex items-center rounded-[4px] border px-2 py-[3px] text-[10px] font-semibold tracking-[0.12em] uppercase"
            style={{
              borderColor: 'var(--border)',
              color: 'color-mix(in oklab, var(--fg) 78%, transparent)',
            }}
          >
            {primaryTag}
          </span>
        )}
        <h3
          className={`font-display text-[17px] leading-[1.25] transition group-hover:opacity-75 ${primaryTag ? 'mt-2.5' : ''}`}
        >
          {title}
        </h3>
        <p
          className="mt-2 text-[14px] leading-[1.55] line-clamp-2"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          {excerpt}
        </p>
        <p
          className="mt-3 flex flex-wrap items-center gap-x-2 text-[11px] font-medium tracking-[0.04em]"
          style={{ color: 'color-mix(in oklab, var(--fg) 52%, transparent)' }}
        >
          <span>{authorName}</span>
          <span className="opacity-40">·</span>
          <span>{formatDateCaps(publishedAt)}</span>
        </p>
      </div>
    </Link>
  );
}
