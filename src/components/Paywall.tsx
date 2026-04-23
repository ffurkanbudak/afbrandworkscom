'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function Paywall() {
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
        body: JSON.stringify({ email, source: 'paywall' }),
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
    <div className="relative mx-auto mt-4 max-w-[680px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-40"
        style={{
          background:
            'linear-gradient(to bottom, color-mix(in oklab, var(--bg) 0%, transparent), var(--bg) 85%)',
        }}
      />
      <div
        className="relative rounded-[12px] border p-7 text-center md:p-10"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
      >
        {done ? (
          <>
            <h3 className="font-display text-[24px] leading-[1.15] md:text-[28px]">
              Başvurunuz alındı
            </h3>
            <p
              className="mt-4 text-[15px] leading-[1.6]"
              style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
            >
              Yönetici başvurunuzu onayladığında e-posta ile erişim linki göndereceğiz.
              Linke tıkladığınızda tüm yazıların tamamına erişirsiniz.
            </p>
          </>
        ) : (
          <>
            <p
              className="text-[11px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              Okumaya devam et
            </p>
            <h3 className="mt-3 font-display text-[24px] leading-[1.15] md:text-[30px]">
              Yazının tamamı aboneler için
            </h3>
            <p
              className="mx-auto mt-4 max-w-[48ch] text-[15px] leading-[1.6]"
              style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
            >
              Ücretsiz abone olun; bu yazının ve tüm yazıların tamamına erişin.
              Haftalık markalaşma notları doğrudan e-posta kutunuza.
            </p>
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-7 flex max-w-[440px] flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e-posta adresiniz"
                className="flex-1 rounded-[8px] border px-4 py-3 text-[14px]"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg)',
                  color: 'var(--fg)',
                }}
              />
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-[14px] font-medium transition hover:opacity-90 disabled:opacity-60"
                style={{ background: '#DC2204', color: '#FFFFFF' }}
              >
                {busy ? 'Gönderiliyor…' : 'Abone olun'}
                <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
              </button>
            </form>
            {error && (
              <p className="mt-4 text-[13px]" style={{ color: '#DC2626' }}>
                {error}
              </p>
            )}
            <p
              className="mt-6 text-[12px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
            >
              Spam yok. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
