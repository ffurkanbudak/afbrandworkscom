'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Calendar as CalendarIcon, Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  PRESET_LABELS,
  formatRangeLabel,
  resolveRange,
  startOfDay,
  endOfDay,
  ymd,
  type PresetKey,
} from '../_lib/range';

const PRESET_KEYS: PresetKey[] = ['today', '7d', '30d', '90d', 'month', 'lastMonth'];
const WEEKDAYS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
const MONTHS_LONG = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function inRange(d: Date, from: Date, to: Date) {
  const t = d.getTime();
  return t >= from.getTime() && t <= to.getTime();
}

function monthGrid(viewMonth: Date): Date[] {
  const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  // Monday-first grid: JS getDay() returns 0=Sun..6=Sat; shift to 0=Mon..6=Sun
  const offset = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - offset);
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  return days;
}

export function DateRangePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const current = useMemo(() => {
    return resolveRange({
      from: searchParams.get('from') ?? undefined,
      to: searchParams.get('to') ?? undefined,
      preset: searchParams.get('preset') ?? undefined,
    });
  }, [searchParams]);

  const [viewMonth, setViewMonth] = useState<Date>(
    () => new Date(current.to.getFullYear(), current.to.getMonth(), 1),
  );
  const [draft, setDraft] = useState<{ from: Date; to: Date | null }>({
    from: current.from,
    to: current.to,
  });

  useEffect(() => {
    if (open) {
      setDraft({ from: current.from, to: current.to });
      setViewMonth(new Date(current.to.getFullYear(), current.to.getMonth(), 1));
    }
  }, [open, current.from, current.to]);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function pushParams(next: URLSearchParams) {
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function applyPreset(key: PresetKey) {
    const next = new URLSearchParams(searchParams.toString());
    next.delete('from');
    next.delete('to');
    if (key === '7d') next.delete('preset');
    else next.set('preset', key);
    pushParams(next);
    setOpen(false);
  }

  function applyDraft() {
    if (!draft.to) return;
    const next = new URLSearchParams(searchParams.toString());
    next.delete('preset');
    next.set('from', ymd(draft.from));
    next.set('to', ymd(draft.to));
    pushParams(next);
    setOpen(false);
  }

  function handleDayClick(day: Date) {
    const d = startOfDay(day);
    if (!draft.to || (draft.from && draft.to && !sameDay(draft.from, draft.to))) {
      setDraft({ from: d, to: null });
      return;
    }
    if (d < draft.from) {
      setDraft({ from: d, to: endOfDay(draft.from) });
    } else {
      setDraft({ from: draft.from, to: endOfDay(d) });
    }
  }

  const days = useMemo(() => monthGrid(viewMonth), [viewMonth]);
  const today = startOfDay(new Date());
  const canApply = Boolean(draft.to);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-[13px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_4%,transparent)]"
        style={{ borderColor: 'var(--border)' }}
      >
        <CalendarIcon className="h-[14px] w-[14px]" strokeWidth={1.75} />
        <span className="tabular-nums">{formatRangeLabel(current)}</span>
        <ChevronDown
          className={`h-[13px] w-[13px] opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 z-30 mt-2 w-[min(92vw,520px)] rounded-[14px] border p-4 shadow-[0_20px_50px_-22px_rgba(0,0,0,0.28)]"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
        >
          <div className="grid gap-4 md:grid-cols-[160px_1fr]">
            {/* Presets */}
            <div className="flex flex-col gap-1.5">
              {PRESET_KEYS.map((key) => {
                const active = current.key === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => applyPreset(key)}
                    className="inline-flex items-center justify-between rounded-[8px] border px-3 py-2 text-[12.5px] font-medium tracking-tight transition"
                    style={{
                      borderColor: active
                        ? 'color-mix(in oklab, var(--fg) 35%, transparent)'
                        : 'var(--border)',
                      background: active
                        ? 'color-mix(in oklab, var(--fg) 7%, transparent)'
                        : 'transparent',
                    }}
                  >
                    <span>{PRESET_LABELS[key]}</span>
                    {active && <Check className="h-[12px] w-[12px]" strokeWidth={2.25} />}
                  </button>
                );
              })}
            </div>

            {/* Calendar */}
            <div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
                  }
                  className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                  style={{ borderColor: 'var(--border)' }}
                  aria-label="Önceki ay"
                >
                  <ChevronLeft className="h-[13px] w-[13px]" strokeWidth={2} />
                </button>
                <p className="text-[13px] font-semibold tabular-nums">
                  {MONTHS_LONG[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
                  }
                  className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                  style={{ borderColor: 'var(--border)' }}
                  aria-label="Sonraki ay"
                >
                  <ChevronRight className="h-[13px] w-[13px]" strokeWidth={2} />
                </button>
              </div>

              <div
                className="mt-3 grid grid-cols-7 gap-y-1 text-center text-[10.5px] font-semibold tracking-[0.08em] uppercase"
                style={{ color: 'color-mix(in oklab, var(--fg) 45%, transparent)' }}
              >
                {WEEKDAYS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-y-0.5">
                {days.map((d) => {
                  const isOutside = d.getMonth() !== viewMonth.getMonth();
                  const isStart = sameDay(d, draft.from);
                  const isEnd = draft.to ? sameDay(d, draft.to) : false;
                  const isBetween = draft.to ? inRange(d, draft.from, draft.to) : false;
                  const isToday = sameDay(d, today);
                  const isEndpoint = isStart || isEnd;

                  return (
                    <button
                      key={d.getTime()}
                      type="button"
                      onClick={() => handleDayClick(d)}
                      className="relative mx-auto inline-flex h-8 w-8 items-center justify-center text-[12.5px] tabular-nums transition"
                      style={{
                        color: isEndpoint
                          ? '#FFFFFF'
                          : isOutside
                            ? 'color-mix(in oklab, var(--fg) 25%, transparent)'
                            : 'var(--fg)',
                        background: isEndpoint
                          ? 'var(--fg)'
                          : isBetween
                            ? 'color-mix(in oklab, var(--fg) 10%, transparent)'
                            : 'transparent',
                        borderRadius: isEndpoint ? '8px' : isBetween ? '0' : '8px',
                        fontWeight: isEndpoint || isToday ? 600 : 400,
                      }}
                    >
                      {d.getDate()}
                      {isToday && !isEndpoint && (
                        <span
                          className="absolute bottom-[3px] h-[3px] w-[3px] rounded-full"
                          style={{ background: 'var(--fg)' }}
                          aria-hidden
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div
                className="mt-3 flex items-center justify-between gap-3 border-t pt-3 text-[12px]"
                style={{ borderColor: 'var(--border)' }}
              >
                <span
                  className="tabular-nums"
                  style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
                >
                  {ymd(draft.from)} → {draft.to ? ymd(draft.to) : '…'}
                </span>
                <button
                  type="button"
                  onClick={applyDraft}
                  disabled={!canApply}
                  className="btn-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium disabled:opacity-50"
                >
                  Uygula
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
