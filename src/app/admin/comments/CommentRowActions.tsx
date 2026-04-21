'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, EyeOff, RotateCcw, Trash2 } from 'lucide-react';

type Status = 'PENDING' | 'APPROVED' | 'HIDDEN';

export function CommentRowActions({
  id,
  status,
  kind = 'post',
}: {
  id: string;
  status: Status;
  kind?: 'post' | 'news';
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const base = kind === 'news' ? '/api/admin/news-comments' : '/api/admin/comments';

  async function patch(next: Status) {
    setBusy(next);
    try {
      await fetch(`${base}/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function remove() {
    if (!confirm('Yorumu kalıcı olarak silmek istiyor musun?')) return;
    setBusy('DELETE');
    try {
      await fetch(`${base}/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      {status !== 'APPROVED' && (
        <ActionButton
          onClick={() => patch('APPROVED')}
          busy={busy === 'APPROVED'}
          tone="green"
          icon={Check}
          label="Onayla"
        />
      )}
      {status !== 'HIDDEN' && (
        <ActionButton
          onClick={() => patch('HIDDEN')}
          busy={busy === 'HIDDEN'}
          tone="amber"
          icon={EyeOff}
          label="Gizle"
        />
      )}
      {status !== 'PENDING' && (
        <ActionButton
          onClick={() => patch('PENDING')}
          busy={busy === 'PENDING'}
          tone="neutral"
          icon={RotateCcw}
          label="Beklet"
        />
      )}
      <ActionButton
        onClick={remove}
        busy={busy === 'DELETE'}
        tone="red"
        icon={Trash2}
        label="Sil"
      />
    </div>
  );
}

const TONE: Record<'green' | 'amber' | 'neutral' | 'red', { fg: string; border: string }> = {
  green: { fg: '#16A34A', border: 'color-mix(in oklab, #16A34A 40%, transparent)' },
  amber: { fg: '#D97706', border: 'color-mix(in oklab, #D97706 40%, transparent)' },
  neutral: { fg: 'var(--fg)', border: 'var(--border)' },
  red: { fg: '#DC2626', border: 'color-mix(in oklab, #DC2626 40%, transparent)' },
};

function ActionButton({
  onClick,
  busy,
  tone,
  icon: Icon,
  label,
}: {
  onClick: () => void;
  busy: boolean;
  tone: keyof typeof TONE;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}) {
  const t = TONE[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-50"
      style={{ borderColor: t.border, color: t.fg }}
    >
      <Icon className="h-[12px] w-[12px]" strokeWidth={2} />
      {busy ? '…' : label}
    </button>
  );
}
