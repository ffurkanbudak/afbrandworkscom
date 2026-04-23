'use client';

import { useState } from 'react';
import { Flag } from 'lucide-react';

export function ReportButton({
  target,
  id,
  size = 'md',
}: {
  target: 'post' | 'comment';
  id: string;
  size?: 'sm' | 'md';
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onClick() {
    if (busy) return;
    const reason = window.prompt(
      'Neden raporlamak istiyorsunuz? (opsiyonel, kısa bir açıklama)',
      '',
    );
    if (reason === null) return;
    setBusy(true);
    setMsg(null);
    try {
      const url =
        target === 'post'
          ? `/api/forum/posts/${id}/flag`
          : `/api/forum/comments/${id}/flag`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(json.error ?? 'Raporlanamadı.');
      } else if (json.duplicate) {
        setMsg('Bu içeriği zaten raporlamışsınız.');
      } else {
        setMsg('Rapor alındı. Yönetim değerlendirecek.');
      }
    } catch {
      setMsg('Ağ hatası.');
    } finally {
      setBusy(false);
    }
  }

  const textSize = size === 'sm' ? 'text-[11px]' : 'text-[12px]';

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className={`inline-flex items-center gap-1 ${textSize} font-medium disabled:opacity-50`}
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        <Flag className={size === 'sm' ? 'h-[11px] w-[11px]' : 'h-[12px] w-[12px]'} strokeWidth={2} />
        {busy ? 'Gönderiliyor…' : 'Raporlayın'}
      </button>
      {msg && (
        <span
          className={`${textSize}`}
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          {msg}
        </span>
      )}
    </span>
  );
}
