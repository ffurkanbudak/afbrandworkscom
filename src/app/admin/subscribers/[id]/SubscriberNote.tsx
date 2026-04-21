'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { inputClass, inputStyle } from '../../_components/FormField';

export function SubscriberNote({ subscriberId }: { subscriberId: string }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/subscribers/${subscriberId}/notes`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setErr(j.error ?? 'Eklenemedi.');
      } else {
        setBody('');
        router.refresh();
      }
    } catch {
      setErr('Ağ hatası.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        placeholder="Bu kişi hakkında yönetici notu…"
        className={inputClass + ' text-[13px]'}
        style={inputStyle}
      />
      <div className="flex items-center justify-between gap-3">
        {err ? (
          <span className="text-[12px]" style={{ color: '#DC2626' }}>{err}</span>
        ) : <span />}
        <button
          type="submit"
          disabled={busy || !body.trim()}
          className="btn-dark rounded-[6px] px-3 py-1.5 text-[12px] font-medium disabled:opacity-60"
        >
          {busy ? 'Ekleniyor…' : 'Not ekle'}
        </button>
      </div>
    </form>
  );
}
