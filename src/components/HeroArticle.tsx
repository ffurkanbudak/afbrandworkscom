import Link from 'next/link';
import Image from 'next/image';
import { Globe } from 'lucide-react';
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
  return (
    <Link
      href={`/posts/${slug}`}
      className="group relative block overflow-hidden rounded-[6px]"
    >
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{ background: '#2A2A2A' }}
      >
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={coverImageAlt ?? title}
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.02]"
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

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[30%] hero-overlay-top" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] hero-overlay-bottom" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 md:p-8">
          <div className="flex items-center gap-2">
            {primaryTag && (
              <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-white px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.1em] uppercase text-[#0A0A0A]">
                {primaryTag}
              </span>
            )}
            <NewBadge publishedAt={publishedAt} variant="dark" size="md" />
          </div>
          {sponsored && (
            <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-white px-2.5 py-1 text-[11.5px] font-medium text-[#0A0A0A]">
              <Globe className="h-[12px] w-[12px]" strokeWidth={1.75} />
              Sponsorlu
            </span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 md:max-w-[78%] lg:max-w-[72%]">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-white/90">
            {formatDateCaps(publishedAt)}
            <span className="mx-2 opacity-60">/</span>
            <span className="uppercase">{authorName}</span>
          </p>
          <h2 className="mt-3 font-display text-[24px] leading-[1.1] text-white md:text-[32px] lg:text-[36px]">
            {title}
          </h2>
          {excerpt && (
            <p className="mt-4 line-clamp-2 max-w-[58ch] text-[15px] leading-[1.55] text-white/80 md:text-[16px]">
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
