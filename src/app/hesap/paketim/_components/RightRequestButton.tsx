'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export function RightRequestButton({
  rightLabel,
  planLabel,
}: {
  rightLabel: string;
  planLabel: string;
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  async function onClick() {
    if (busy) return;
    if (!confirm(`"${rightLabel}" için bir talep oluşturulsun mu? Yönetici size doğrudan dönüş yapacak.`)) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch('/api/me/message', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          topic: `${planLabel} · ${rightLabel}`,
          message: `${planLabel} paketi kapsamındaki "${rightLabel}" hakkımı kullanmak istiyorum. Uygun bir zamanda geri dönüş rica ederim.`,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ kind: 'err', text: json.error ?? 'Gönderilemedi.' });
      } else {
        setMsg({ kind: 'ok', text: 'Talep iletildi. Yönetici size dönüş yapacak.' });
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[11.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-50"
        style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
      >
        <Send className="h-[11px] w-[11px]" strokeWidth={2} />
        {busy ? 'Gönderiliyor…' : 'Hakkımı talep edin'}
      </button>
      {msg && (
        <span
          className="text-[11.5px]"
          style={{ color: msg.kind === 'ok' ? '#16A34A' : '#DC2626' }}
        >
          {msg.text}
        </span>
      )}
    </span>
  );
}
