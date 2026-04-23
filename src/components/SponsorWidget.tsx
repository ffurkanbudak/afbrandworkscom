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

const PHANTOM_INITIALS = ['S', 'K', 'B', 'M'];

function SponsorAvatar({
  name,
  logoUrl,
  onClick,
}: {
  name: string;
  logoUrl: string | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={name}
      title={name}
      className="group relative block h-12 w-12 overflow-hidden rounded-full border transition hover:scale-[1.06]"
      style={{
        borderColor: 'color-mix(in oklab, var(--fg) 25%, transparent)',
        background: 'var(--bg-soft)',
      }}
    >
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center text-[15px] font-semibold"
          style={{ color: 'var(--fg)' }}
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}
    </button>
  );
}

function PhantomAvatar({ initial }: { initial: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none flex h-12 w-12 items-center justify-center rounded-full border select-none"
      style={{
        borderColor: 'color-mix(in oklab, var(--fg) 18%, transparent)',
        background: 'color-mix(in oklab, var(--fg) 6%, transparent)',
        color: 'color-mix(in oklab, var(--fg) 60%, transparent)',
        filter: 'blur(2.5px)',
        opacity: 0.55,
      }}
    >
      <span className="text-[15px] font-semibold">{initial}</span>
    </span>
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

  const phantomCount = sponsor ? 3 : 4;
  const phantoms = PHANTOM_INITIALS.slice(0, phantomCount);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <p
          className="text-[10.5px] font-semibold tracking-[0.16em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          {sponsor ? TIER_HEAD[sponsor.tier] : 'Sponsorlar'}
        </p>
        <div className="flex items-center gap-3">
          {sponsor && (
            <SponsorAvatar
              name={sponsor.name}
              logoUrl={sponsor.logoUrl}
              onClick={() => setOpen(true)}
            />
          )}
          {phantoms.map((p, i) => (
            <PhantomAvatar key={i} initial={p} />
          ))}
        </div>
        <Link
          href="/sponsorluk"
          className="inline-flex items-center gap-1 text-[11.5px] font-medium transition hover:underline"
          style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
        >
          Siz de sponsor olun
          <ArrowUpRight className="h-[11px] w-[11px]" strokeWidth={2} />
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
            style={{ background: 'rgba(10,10,10,0.42)', backdropFilter: 'blur(6px)' }}
          />
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[440px] rounded-[14px] border p-6 md:p-7"
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
                  className="h-16 w-16 rounded-full border object-cover"
                  style={{
                    background: 'var(--bg-soft)',
                    borderColor: 'var(--border)',
                  }}
                />
              ) : (
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border text-[20px] font-semibold"
                  style={{
                    background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {sponsor.name.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <p
                  className="text-[10px] font-semibold tracking-[0.14em] uppercase"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {TIER_HEAD[sponsor.tier]}
                </p>
                <p className="font-display mt-1.5 text-[22px] leading-tight tracking-tight">
                  {sponsor.name}
                </p>
              </div>
            </div>

            {sponsor.bio && (
              <p
                className="mt-5 text-[13.5px] leading-[1.65]"
                style={{ color: 'color-mix(in oklab, var(--fg) 78%, transparent)' }}
              >
                {sponsor.bio}
              </p>
            )}

            <div
              className="mt-6 flex flex-wrap gap-2 border-t pt-5"
              style={{ borderColor: 'var(--border)' }}
            >
              {sponsor.websiteUrl && (
                <a
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
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
                  className="rounded-[8px] border px-3 py-1.5 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
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
                  className="rounded-[8px] border px-3 py-1.5 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
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
                  className="rounded-[8px] border px-3 py-1.5 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                >
                  X
                </a>
              )}
            </div>

            <Link
              href="/sponsorluk"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center gap-1 text-[11.5px] font-medium"
              style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
            >
              Siz de sponsor olun
              <ArrowUpRight className="h-[11px] w-[11px]" strokeWidth={2} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
