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
};

export function FeaturedCard({
  slug,
  title,
  excerpt,
  publishedAt,
  authorName,
  coverImageUrl,
  coverImageAlt,
}: Props) {
  return (
    <Link href={`/posts/${slug}`} className="group block">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px]"
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
        <p
          className="text-[11px] font-semibold tracking-[0.08em]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          <span className="whitespace-nowrap">{formatDateCaps(publishedAt)}</span>
          <span className="mx-2 opacity-50">/</span>
          <span className="whitespace-nowrap uppercase">{authorName}</span>
        </p>
        <h3 className="mt-2.5 font-display text-[17px] leading-[1.25] transition group-hover:opacity-75">
          {title}
        </h3>
        <p
          className="mt-2 text-[14px] leading-[1.55] line-clamp-2"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
