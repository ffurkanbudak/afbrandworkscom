'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Gift } from 'lucide-react';

export function GiftCodeRedeem({ currentPlan }: { currentPlan: 'GOZLEMCI' | 'ORTAK' | 'MIMARI' }) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setMsg(null);
    if (!code.trim()) return;
    setBusy(true);
    try {
      const res = await fetch('/api/gift-codes/redeem', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMsg({ kind: 'err', text: json.error ?? 'Kullanılamadı.' });
      } else {
        setMsg({
          kind: 'ok',
          text: `Paketiniz ${json.plan === 'MIMARI' ? 'Mimari' : 'Ortak'} olarak güncellendi.`,
        });
        setCode('');
        router.refresh();
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(false);
    }
  }

  if (currentPlan === 'MIMARI') return null;

  return (
    <section
      className="rounded-2xl border p-6"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-2">
        <Gift
          className="h-[15px] w-[15px]"
          strokeWidth={1.75}
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        />
        <p className="eyebrow">Hediye Kodu Kullan</p>
      </div>
      <p
        className="mt-2 text-[12.5px] leading-[1.55]"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        Aldığınız Ortak veya Mimari hediye kodunu buraya girerek paketinizi
        yükseltebilirsiniz.
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="AFB-XXXXX-XXXXX"
          className="flex-1 rounded-[8px] border px-3 py-2.5 font-mono text-[13.5px] tracking-wider uppercase"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)', color: 'var(--fg)' }}
        />
        <button
          type="submit"
          disabled={busy}
          className="btn-dark rounded-[8px] px-5 py-2.5 text-[13px] font-semibold disabled:opacity-60"
        >
          {busy ? 'Kontrol ediliyor…' : 'Kullan'}
        </button>
      </form>
      {msg && (
        <p
          className="mt-3 text-[12.5px]"
          style={{ color: msg.kind === 'ok' ? '#16A34A' : '#DC2626' }}
        >
          {msg.text}
        </p>
      )}
    </section>
  );
}
