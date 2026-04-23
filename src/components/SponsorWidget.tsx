'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

type Sponsor = {
  id: string;
  name: string;
  logoUrl: string | null;
  bio: string | null;
  websiteUrl: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  xUrl: string | null;
  tier: 'DAILY' | 'MONTHLY' | 'QUARTERLY';
};

const TIER_HEAD: Record<Sponsor['tier'], string> = {
  DAILY: 'Bugünün Sponsoru',
  MONTHLY: 'Bu Ayın Sponsoru',
  QUARTERLY: 'Bu Dönemin Sponsoru',
};

const PHANTOM_SPONSORS: { initial: string; name: string; head: string }[] = [
  { initial: 'S', name: 'Studio Kavis', head: 'Bu Ayın Sponsoru' },
  { initial: 'K', name: 'Küre Yayın Grubu', head: 'Bu Haftanın Sponsoru' },
  { initial: 'B', name: 'Başat Partners', head: 'Bu Dönemin Sponsoru' },
];

function PhantomPill({
  initial,
  name,
  head,
}: {
  initial: string;
  name: string;
  head: string;
}) {
  return (
    <aside
      aria-hidden
      className="pointer-events-none inline-flex items-center gap-3 rounded-[8px] border px-3 py-2 select-none"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--bg)',
        opacity: 0.72,
      }}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold"
        style={{
          background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
          color: 'color-mix(in oklab, var(--fg) 70%, transparent)',
          filter: 'blur(1.5px)',
        }}
      >
        {initial}
      </div>
      <div className="text-left" style={{ filter: 'blur(3px)' }}>
        <p
          className="text-[9.5px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          {head}
        </p>
        <p className="text-[12px] font-semibold leading-tight">{name}</p>
      </div>
    </aside>
  );
}

export function SponsorWidget() {
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/sponsors/current')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setSponsor(d.sponsor ?? null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const phantoms = sponsor
    ? PHANTOM_SPONSORS.filter((p) => p.head !== TIER_HEAD[sponsor.tier]).slice(0, 2)
    : PHANTOM_SPONSORS;

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2">
      {sponsor && (
      <aside
        className="inline-flex items-center gap-3 rounded-[8px] border px-3 py-2"
        style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-3"
          aria-label={`${sponsor.name} hakkında`}
        >
          {sponsor.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sponsor.logoUrl}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
              style={{ background: 'var(--bg-soft)' }}
            />
          ) : (
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold"
              style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)' }}
            >
              {sponsor.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="text-left">
            <p
              className="text-[9.5px] font-semibold tracking-[0.1em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              {TIER_HEAD[sponsor.tier]}
            </p>
            <p className="text-[12px] font-semibold leading-tight">{sponsor.name}</p>
          </div>
        </button>
      </aside>
      )}
      {phantoms.map((p) => (
        <PhantomPill key={p.name} initial={p.initial} name={p.name} head={p.head} />
      ))}
      <Link
        href="/sponsorluk"
        className="inline-flex items-center gap-1.5 rounded-[8px] border border-dashed px-3 py-2 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
        style={{
          borderColor: 'color-mix(in oklab, var(--fg) 35%, transparent)',
          color: 'color-mix(in oklab, var(--fg) 75%, transparent)',
        }}
      >
        Siz de sponsor olun
        <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
      </Link>
      </div>

      {open && sponsor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'rgba(10,10,10,0.32)', backdropFilter: 'blur(4px)' }}
          />
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] rounded-[14px] border p-6"
            style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Kapat"
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
              style={{ color: 'var(--fg)' }}
            >
              <X className="h-[15px] w-[15px]" strokeWidth={1.75} />
            </button>

            <div className="flex items-center gap-4">
              {sponsor.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sponsor.logoUrl}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover"
                  style={{ background: 'var(--bg-soft)' }}
                />
              ) : (
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full text-[17px] font-semibold"
                  style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)' }}
                >
                  {sponsor.name.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <p
                  className="text-[10px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {TIER_HEAD[sponsor.tier]}
                </p>
                <p className="font-display mt-1 text-[20px] leading-tight tracking-tight">
                  {sponsor.name}
                </p>
              </div>
            </div>

            {sponsor.bio && (
              <p
                className="mt-5 text-[13.5px] leading-[1.6]"
                style={{ color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
              >
                {sponsor.bio}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {sponsor.websiteUrl && (
                <a
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[12px] font-medium"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  Web sitesi
                  <ArrowUpRight className="h-[12px] w-[12px]" strokeWidth={2} />
                </a>
              )}
              {sponsor.linkedinUrl && (
                <a
                  href={sponsor.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[8px] border px-3 py-1.5 text-[12px] font-medium"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  LinkedIn
                </a>
              )}
              {sponsor.instagramUrl && (
                <a
                  href={sponsor.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[8px] border px-3 py-1.5 text-[12px] font-medium"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  Instagram
                </a>
              )}
              {sponsor.xUrl && (
                <a
                  href={sponsor.xUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[8px] border px-3 py-1.5 text-[12px] font-medium"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  X
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
