export type PresetKey = 'today' | '7d' | '30d' | '90d' | 'month' | 'lastMonth';
export type Range = { from: Date; to: Date; key: PresetKey | 'custom' };

export function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

export function endOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

export function parseYmd(s: string | undefined | null): Date | null {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isNaN(d.getTime()) ? null : d;
}

export function resolveRange(
  params: { from?: string; to?: string; preset?: string },
  now = new Date(),
): Range {
  const today = startOfDay(now);
  const todayEnd = endOfDay(now);

  const explicitFrom = parseYmd(params.from);
  const explicitTo = parseYmd(params.to);
  if (explicitFrom && explicitTo) {
    const [a, b] = explicitFrom <= explicitTo
      ? [explicitFrom, explicitTo]
      : [explicitTo, explicitFrom];
    return { from: startOfDay(a), to: endOfDay(b), key: 'custom' };
  }

  const preset = (params.preset as PresetKey) || '7d';
  switch (preset) {
    case 'today':
      return { from: today, to: todayEnd, key: 'today' };
    case '30d': {
      const from = new Date(today);
      from.setDate(today.getDate() - 29);
      return { from, to: todayEnd, key: '30d' };
    }
    case '90d': {
      const from = new Date(today);
      from.setDate(today.getDate() - 89);
      return { from, to: todayEnd, key: '90d' };
    }
    case 'month': {
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      return { from, to: todayEnd, key: 'month' };
    }
    case 'lastMonth': {
      const from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const to = endOfDay(new Date(today.getFullYear(), today.getMonth(), 0));
      return { from, to, key: 'lastMonth' };
    }
    case '7d':
    default: {
      const from = new Date(today);
      from.setDate(today.getDate() - 6);
      return { from, to: todayEnd, key: '7d' };
    }
  }
}

export function previousRange(r: Range): { from: Date; to: Date } {
  const durationMs = r.to.getTime() - r.from.getTime();
  const to = new Date(r.from.getTime() - 1);
  const from = new Date(r.from.getTime() - durationMs - 1);
  return { from, to };
}

const MONTHS_TR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

export function formatRangeLabel(r: Range): string {
  const f = r.from;
  const t = r.to;
  const sameDay =
    f.getFullYear() === t.getFullYear() &&
    f.getMonth() === t.getMonth() &&
    f.getDate() === t.getDate();
  if (sameDay) return `${f.getDate()} ${MONTHS_TR[f.getMonth()]} ${f.getFullYear()}`;
  if (f.getFullYear() === t.getFullYear()) {
    return `${f.getDate()} ${MONTHS_TR[f.getMonth()]} — ${t.getDate()} ${MONTHS_TR[t.getMonth()]} ${t.getFullYear()}`;
  }
  return `${f.getDate()} ${MONTHS_TR[f.getMonth()]} ${f.getFullYear()} — ${t.getDate()} ${MONTHS_TR[t.getMonth()]} ${t.getFullYear()}`;
}

export const PRESET_LABELS: Record<PresetKey, string> = {
  today: 'Bugün',
  '7d': 'Son 7 gün',
  '30d': 'Son 30 gün',
  '90d': 'Son 90 gün',
  month: 'Bu ay',
  lastMonth: 'Geçen ay',
};
