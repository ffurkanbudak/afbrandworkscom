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
};

export function ArticleRowCard({
  slug,
  title,
  publishedAt,
  authorName,
  coverImageUrl,
  coverImageAlt,
}: Props) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="group flex items-center gap-5 transition"
    >
      <div
        className="relative h-[90px] w-[130px] flex-shrink-0 overflow-hidden rounded-[8px]"
        style={{ background: 'var(--bg-soft)' }}
      >
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={coverImageAlt ?? title}
            fill
            sizes="130px"
            className="object-cover transition duration-500 group-hover:scale-[1.05]"
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
        <p
          className="text-[11px] font-semibold tracking-[0.12em]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          {formatDateCaps(publishedAt)}
          <span className="mx-2 opacity-50">/</span>
          <span className="uppercase">{authorName}</span>
        </p>
        <div className="mt-2.5 flex items-start gap-2">
          <h3
            className="line-clamp-2 flex-1 font-display text-[17px] leading-[1.22] transition group-hover:opacity-75 md:text-[18px]"
            style={{ color: 'var(--fg)' }}
          >
            {title}
          </h3>
          <NewBadge publishedAt={publishedAt} />
        </div>
      </div>
    </Link>
  );
}
