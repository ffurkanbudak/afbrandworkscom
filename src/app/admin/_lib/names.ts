export function splitName(full?: string | null): { first: string; last: string } {
  if (!full) return { first: '', last: '' };
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: '' };
  return { first: parts[0], last: parts.slice(1).join(' ') };
}

export function displayName(s: {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
}): { first: string; lastInitial: string } {
  const first = (s.firstName ?? splitName(s.name).first ?? '').trim();
  const last = (s.lastName ?? splitName(s.name).last ?? '').trim();
  return { first: first || 'Abone', lastInitial: last ? last[0].toUpperCase() + '.' : '' };
}

export function initials(name?: string | null, email?: string | null): string {
  const n = name?.trim();
  if (n) {
    const p = n.split(/\s+/);
    return ((p[0]?.[0] ?? '') + (p[1]?.[0] ?? '')).toUpperCase();
  }
  return (email?.[0] ?? '·').toUpperCase();
}
