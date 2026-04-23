import Link from 'next/link';

type Tag = { slug: string; label: string };

export function TagFilter({
  tags,
  active,
}: {
  tags: Tag[];
  active: string | null;
}) {
  return (
    <nav
      aria-label="Etiket filtresi"
      className="no-scrollbar flex items-center gap-1.5 overflow-x-auto py-1"
    >
      <Chip href="/forum" label="Tümü" active={!active} />
      {tags.map((t) => (
        <Chip
          key={t.slug}
          href={`/forum?tag=${t.slug}`}
          label={t.label}
          active={active === t.slug}
        />
      ))}
    </nav>
  );
}

function Chip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="shrink-0 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
      style={{
        borderColor: active ? 'var(--fg)' : 'var(--border)',
        background: active
          ? 'color-mix(in oklab, var(--fg) 7%, transparent)'
          : 'transparent',
        color: 'var(--fg)',
        fontWeight: active ? 600 : 500,
      }}
    >
      {label}
    </Link>
  );
}
