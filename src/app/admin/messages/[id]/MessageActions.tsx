'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function MessageActions({
  id,
  status,
  email,
  topic,
}: {
  id: string;
  status: string;
  email: string;
  topic: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function patch(nextStatus: 'READ' | 'UNREAD' | 'ARCHIVED') {
    setBusy(true);
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm('Bu mesaj kalıcı olarak silinecek. Emin misin?')) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      router.push('/admin/messages');
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
      <p className="eyebrow">İşlemler</p>
      <div className="mt-4 grid grid-cols-1 gap-2">
        <a
          href={`mailto:${email}?subject=${encodeURIComponent(`Yanıt: ${topic}`)}`}
          className="btn-dark rounded-[6px] px-3 py-2 text-center text-[13px] font-medium"
        >
          E-postayla yanıtla
        </a>
        {status !== 'UNREAD' && (
          <button
            disabled={busy}
            onClick={() => patch('UNREAD')}
            className="rounded-[6px] border px-3 py-2 text-[13px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-50"
            style={{ borderColor: 'var(--border)' }}
          >
            Okunmadı olarak işaretle
          </button>
        )}
        {status !== 'ARCHIVED' && (
          <button
            disabled={busy}
            onClick={() => patch('ARCHIVED')}
            className="rounded-[6px] border px-3 py-2 text-[13px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-50"
            style={{ borderColor: 'var(--border)' }}
          >
            Arşivle
          </button>
        )}
        {status === 'ARCHIVED' && (
          <button
            disabled={busy}
            onClick={() => patch('READ')}
            className="rounded-[6px] border px-3 py-2 text-[13px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-50"
            style={{ borderColor: 'var(--border)' }}
          >
            Arşivden çıkar
          </button>
        )}
        <button
          disabled={busy}
          onClick={remove}
          className="rounded-[6px] border px-3 py-2 text-[13px] font-medium transition hover:bg-[color-mix(in_oklab,#DC2626_6%,transparent)] disabled:opacity-50"
          style={{ borderColor: 'color-mix(in oklab, #DC2626 35%, var(--border))', color: '#DC2626' }}
        >
          Sil
        </button>
      </div>
    </div>
  );
}
