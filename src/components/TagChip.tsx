import Link from 'next/link';
import { AtSign, Bookmark, Compass, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  SECTOR: Compass,
  DISCIPLINE: Layers,
  CASE_STUDY: Bookmark,
};

export function TagChip({
  slug,
  label,
  group,
  active = false,
}: {
  slug: string;
  label: string;
  group?: string;
  active?: boolean;
}) {
  const Icon = (group && ICONS[group]) || AtSign;
  return (
    <Link
      href={`/posts?tag=${slug}`}
      className="group inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[12px] font-medium tracking-tight transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
      style={{
        borderColor: active
          ? 'color-mix(in oklab, var(--fg) 35%, var(--border))'
          : 'var(--border)',
        color: active ? 'var(--fg)' : 'color-mix(in oklab, var(--fg) 78%, transparent)',
        background: active
          ? 'color-mix(in oklab, var(--fg) 5%, transparent)'
          : 'transparent',
      }}
    >
      <Icon
        className="h-[11px] w-[11px] opacity-55 transition group-hover:opacity-80"
        strokeWidth={1.75}
      />
      {label}
    </Link>
  );
}
