'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'loading') return;
    setState('loading');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'site-bulten' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState('error');
        setMessage(data?.error ?? 'Bir hata oluştu, tekrar deneyin.');
        return;
      }
      setState('done');
      setEmail('');
    } catch {
      setState('error');
      setMessage('Bağlantı hatası, tekrar deneyin.');
    }
  }

  if (state === 'done') {
    return (
      <div
        className="mt-3 flex items-start gap-2.5 rounded-[8px] px-4 py-3.5 text-[14px] leading-[1.5]"
        style={{ background: 'color-mix(in oklab, var(--fg) 6%, transparent)', color: 'var(--fg)' }}
      >
        <Check className="mt-0.5 h-[15px] w-[15px] shrink-0" strokeWidth={2.5} />
        <span>Teşekkürler! E-postanı aldık, en kısa sürede bülten listemize ekleyeceğiz.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          aria-label="E-posta adresiniz"
          className="subscribe-input w-full min-w-0 rounded-[8px] px-4 py-3 text-[14px] outline-none"
          style={{
            background: 'color-mix(in oklab, var(--fg) 4%, transparent)',
            color: 'var(--fg)',
            border: '1px solid var(--border)',
          }}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] px-5 py-3 text-[14px] font-medium transition hover:opacity-90 disabled:opacity-60"
          style={{ background: '#DC2204', color: '#FFFFFF' }}
        >
          {state === 'loading' ? 'Gönderiliyor…' : 'Bültene Kaydolun!'}
          <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
        </button>
      </div>
      {state === 'error' && (
        <p className="mt-2 text-[12.5px]" style={{ color: '#DC2626' }}>
          {message}
        </p>
      )}
    </form>
  );
}
