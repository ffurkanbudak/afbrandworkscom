import { initials } from '../_lib/names';

export function Avatar({
  src,
  name,
  email,
  size = 36,
}: {
  src?: string | null;
  name?: string | null;
  email?: string | null;
  size?: number;
}) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    minWidth: size,
    fontSize: Math.round(size * 0.36),
    background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
    color: 'var(--fg)',
    border: '1px solid var(--border)',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? email ?? ''}
        className="rounded-full object-cover"
        style={{ ...style, background: 'transparent' }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold tracking-[0.04em]"
      style={style}
    >
      {initials(name, email)}
    </div>
  );
}
