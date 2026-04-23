'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const PLAN_SUMMARY = {
  ORTAK: {
    label: 'Ortak · Orta Paket',
    tagline:
      'Bir danışmanla çalışma ve topluluk içinde görülme. Gelirin yarısı bağışa aktarılır.',
  },
  MIMARI: {
    label: 'Mimari · Üst Paket',
    tagline: 'Stratejik ortaklık, raporlama ve tanıtım.',
  },
} as const;

type Plan = keyof typeof PLAN_SUMMARY;

export function GiftRequestForm() {
  const [plan, setPlan] = useState<Plan>('ORTAK');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const res = await fetch('/api/gift-requests', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          plan,
          senderName,
          senderEmail,
          senderPhone,
          recipientName,
          recipientEmail,
          note,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Gönderilemedi.');
        setBusy(false);
        return;
      }
      setDone(true);
    } catch {
      setError('Ağ hatası.');
      setBusy(false);
    }
  }

  const inputBase = 'w-full rounded-[8px] border px-3.5 py-3 text-[14px]';
  const inputStyle = {
    borderColor: 'var(--border)',
    background: 'var(--bg)',
    color: 'var(--fg)',
  };

  if (done) {
    return (
      <div
        className="rounded-[14px] border p-7 text-center md:p-10"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
      >
        <h3 className="font-display text-[24px] leading-[1.15]">
          Talebiniz alındı.
        </h3>
        <p
          className="mt-4 max-w-[48ch] mx-auto text-[14.5px] leading-[1.6]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          Ödeme koordinasyonu için kısa süre içinde size e-posta yoluyla
          döneceğiz. Ödeme onayı sonrası tek kullanımlık hediye kodunuz
          iletilecek.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <p
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Paket
        </p>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          {(Object.keys(PLAN_SUMMARY) as Plan[]).map((p) => {
            const on = plan === p;
            const meta = PLAN_SUMMARY[p];
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPlan(p)}
                className="rounded-[10px] border p-4 text-left transition"
                style={{
                  borderColor: on ? 'var(--fg)' : 'var(--border)',
                  background: on
                    ? 'color-mix(in oklab, var(--fg) 6%, transparent)'
                    : 'transparent',
                }}
              >
                <p className="text-[13px] font-semibold">{meta.label}</p>
                <p
                  className="mt-2 text-[12.5px] leading-[1.5]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
                >
                  {meta.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <fieldset className="space-y-4">
        <legend
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Siz
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}>
              Ad Soyad
            </span>
            <input
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>
          <label className="block">
            <span className="text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}>
              E-posta
            </span>
            <input
              required
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>
        </div>
        <label className="block">
          <span className="text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}>
            Telefon (opsiyonel)
          </span>
          <input
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            className={inputBase + ' mt-1.5'}
            style={inputStyle}
          />
        </label>
      </fieldset>

      <fieldset className="space-y-4">
        <legend
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Hediye alıcısı (opsiyonel)
        </legend>
        <p className="text-[12px] leading-[1.55]" style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
          Kodu kendinize alıp iletmek isterseniz boş bırakabilirsiniz.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}>
              Alıcı adı
            </span>
            <input
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>
          <label className="block">
            <span className="text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}>
              Alıcı e-postası
            </span>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className={inputBase + ' mt-1.5'}
              style={inputStyle}
            />
          </label>
        </div>
      </fieldset>

      <label className="block">
        <span
          className="text-[11.5px] font-semibold tracking-[0.08em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Kısa not (opsiyonel)
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className={inputBase + ' mt-1.5'}
          style={inputStyle}
        />
      </label>

      {error && (
        <p className="text-[13px]" style={{ color: '#DC2626' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="btn-dark inline-flex items-center gap-2 rounded-[8px] px-5 py-3 text-[14px] font-semibold disabled:opacity-60"
      >
        {busy ? 'Gönderiliyor…' : 'Talep oluşturun'}
        <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
      </button>

      <p
        className="text-[11.5px] leading-[1.55]"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        Ödeme entegrasyonu hazırlanıyor. Şimdilik talebinizi aldıktan sonra
        koordinasyon için sizinle e-posta yoluyla iletişime geçilir; ödeme
        onayının ardından tek kullanımlık hediye kodunuz iletilir.
      </p>
    </form>
  );
}
