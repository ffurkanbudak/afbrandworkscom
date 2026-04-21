import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { requireSubscriber } from '@/lib/subscriber';
import { formatDateCaps } from '@/lib/format';

export default async function LikesPage() {
  const sub = await requireSubscriber();
  const items = await db.postLike.findMany({
    where: { subscriberId: sub.id },
    orderBy: { createdAt: 'desc' },
    include: {
      post: { select: { slug: true, title: true, excerpt: true, publishedAt: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Beğeniler</p>
        <h2 className="font-display mt-2 text-[28px] leading-[1.08] tracking-tight">
          Dokunduğun yazılar
        </h2>
      </div>

      {items.length === 0 ? (
        <Empty text="Bir yazıya kalp bıraktığında burada listelenir." />
      ) : (
        <ul>
          {items.map((l) => (
            <li key={l.id} className="border-b py-5" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-baseline justify-between gap-3">
                <Link
                  href={`/posts/${l.post.slug}`}
                  className="inline-flex items-center gap-1 text-[15px] font-semibold hover:underline"
                >
                  {l.post.title}
                  <ArrowUpRight className="h-[13px] w-[13px]" strokeWidth={2} />
                </Link>
                <span
                  className="shrink-0 text-[11.5px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {formatDateCaps(l.createdAt)}
                </span>
              </div>
              <p
                className="mt-2 max-w-[62ch] text-[13px] leading-[1.55]"
                style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
              >
                {l.post.excerpt}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div
      className="rounded-2xl border px-5 py-8 text-[13px]"
      style={{
        borderColor: 'var(--border)',
        color: 'color-mix(in oklab, var(--fg) 55%, transparent)',
      }}
    >
      {text}
    </div>
  );
}
