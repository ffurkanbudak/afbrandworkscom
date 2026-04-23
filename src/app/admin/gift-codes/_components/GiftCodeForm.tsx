'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Copy } from 'lucide-react';

export function GiftCodeForm() {
  const router = useRouter();
  const [plan, setPlan] = useState<'ORTAK' | 'MIMARI'>('ORTAK');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const res = await fetch('/api/admin/gift-codes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ plan, senderName, senderEmail, recipientEmail, note }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Üretilemedi.');
        setBusy(false);
        return;
      }
      setCreated(json.giftCode.code);
      setSenderName('');
      setSenderEmail('');
      setRecipientEmail('');
      setNote('');
      router.refresh();
    } catch {
      setError('Ağ hatası.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <p className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
          Paket
        </p>
        <div className="mt-2 flex gap-2">
          {(['ORTAK', 'MIMARI'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlan(p)}
              className="flex-1 rounded-[8px] border px-3 py-2 text-[13px] font-medium transition"
              style={{
                borderColor: plan === p ? 'var(--fg)' : 'var(--border)',
                background:
                  plan === p
                    ? 'color-mix(in oklab, var(--fg) 7%, transparent)'
                    : 'transparent',
                fontWeight: plan === p ? 600 : 400,
              }}
            >
              {p === 'ORTAK' ? 'Ortak' : 'Mimari'}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
          Gönderen adı (opsiyonel)
        </span>
        <input
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="mt-1.5 w-full rounded-[8px] border px-3 py-2 text-[13px]"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)', color: 'var(--fg)' }}
        />
      </label>
      <label className="block">
        <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
          Gönderen e-postası (opsiyonel)
        </span>
        <input
          type="email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="mt-1.5 w-full rounded-[8px] border px-3 py-2 text-[13px]"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)', color: 'var(--fg)' }}
        />
      </label>
      <label className="block">
        <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
          Alıcı e-postası (opsiyonel)
        </span>
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="mt-1.5 w-full rounded-[8px] border px-3 py-2 text-[13px]"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)', color: 'var(--fg)' }}
        />
      </label>
      <label className="block">
        <span className="text-[11.5px] font-semibold tracking-[0.08em] uppercase" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
          Not (opsiyonel)
        </span>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1.5 w-full rounded-[8px] border px-3 py-2 text-[13px]"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)', color: 'var(--fg)' }}
        />
      </label>

      <button
        type="submit"
        disabled={busy}
        className="btn-dark w-full rounded-[8px] px-4 py-2.5 text-[13px] font-semibold disabled:opacity-60"
      >
        {busy ? 'Üretiliyor…' : 'Kod üretin'}
      </button>

      {error && (
        <p className="text-[12.5px]" style={{ color: '#DC2626' }}>
          {error}
        </p>
      )}

      {created && (
        <div
          className="rounded-[10px] border p-3.5"
          style={{
            borderColor: 'color-mix(in oklab, #16A34A 40%, transparent)',
            background: 'color-mix(in oklab, #16A34A 6%, transparent)',
          }}
        >
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: '#16A34A' }}>
            Yeni kod
          </p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 font-mono text-[14px] font-semibold tracking-wider">
              {created}
            </code>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(created)}
              aria-label="Kodu kopyala"
              className="inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1.5 text-[11.5px] font-medium"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              <Copy className="h-[11px] w-[11px]" strokeWidth={2} />
              Kopyalayın
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
