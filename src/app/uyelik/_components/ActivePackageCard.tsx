'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function ActivePackageCard({
  name,
  subtitle,
  tagline,
  features,
}: {
  name: string;
  subtitle?: string;
  tagline: string;
  features: string[];
}) {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'uyelik-gozlemci' }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Kaydedilemedi.');
        setBusy(false);
        return;
      }
      setDone(true);
    } catch {
      setError('Ağ hatası.');
      setBusy(false);
    }
  }

  return (
    <div
      className="relative flex flex-col rounded-[14px] border p-8"
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
    >
      <header>
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          {subtitle ?? 'Giriş Paketi'}
        </p>
        <h2 className="font-display mt-3 text-[28px] leading-[1.08] tracking-tight md:text-[32px]">
          {name}
        </h2>
        <p
          className="mt-3 text-[14.5px] leading-[1.55]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          {tagline}
        </p>
      </header>

      <div
        className="mt-7 border-t pt-6"
        style={{ borderColor: 'var(--border)' }}
      >
        <ul className="space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55]">
              <Check
                className="mt-[3px] h-[13px] w-[13px] shrink-0"
                strokeWidth={2.25}
                style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
              />
              <span style={{ color: 'color-mix(in oklab, var(--fg) 88%, transparent)' }}>
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex-1" />

      <div
        className="border-t pt-6"
        style={{ borderColor: 'var(--border)' }}
      >
        {done ? (
          <div>
            <p className="text-[14px] font-semibold">Başvurunuz alındı.</p>
            <p
              className="mt-2 text-[12.5px] leading-[1.55]"
              style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
            >
              Yönetici onayından sonra e-posta ile erişim linkiniz ulaşacak.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e-posta adresiniz"
                className="w-full rounded-[8px] border px-4 py-3 text-[14px]"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg)',
                  color: 'var(--fg)',
                }}
              />
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-[14px] font-semibold transition hover:opacity-90 disabled:opacity-60"
                style={{ background: 'var(--fg)', color: 'var(--bg)' }}
              >
                {busy ? 'Gönderiliyor…' : 'Ücretsiz başla'}
                <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
              </button>
            </form>
            {error && (
              <p className="mt-3 text-[12.5px]" style={{ color: '#DC2626' }}>
                {error}
              </p>
            )}
            <p
              className="mt-3 text-[11.5px] leading-[1.55]"
              style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
            >
              Ücretsiz. Yönetici onayı sonrası erişim linki e-posta ile gelir.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
