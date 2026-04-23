'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function FlagActions({
  id,
  resolved,
  hidden,
}: {
  id: string;
  resolved: boolean;
  hidden: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function call(action: 'resolve' | 'hide') {
    if (busy) return;
    if (action === 'hide' && !confirm('İçerik gizlensin mi?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/forum-flags/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm('Bildirim kaydı silinsin mi?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/forum-flags/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {!resolved && (
        <>
          <button
            onClick={() => call('resolve')}
            disabled={busy}
            className="rounded-[6px] border px-3 py-1.5 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-50"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            İçerik sorunsuz, kapat
          </button>
          {!hidden && (
            <button
              onClick={() => call('hide')}
              disabled={busy}
              className="rounded-[6px] border px-3 py-1.5 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,#DC2626_8%,transparent)] disabled:opacity-50"
              style={{
                borderColor: 'color-mix(in oklab, #DC2626 45%, transparent)',
                color: '#DC2626',
              }}
            >
              İçeriği gizle
            </button>
          )}
        </>
      )}
      <button
        onClick={remove}
        disabled={busy}
        className="rounded-[6px] px-3 py-1.5 text-[12px]"
        style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
      >
        Kaydı sil
      </button>
    </div>
  );
}
