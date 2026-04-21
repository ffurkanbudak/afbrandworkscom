'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Action = 'mark-all-read' | 'archive-all-unread' | 'empty-archive';

export function BulkActions({
  actions,
}: {
  actions: Array<{ action: Action; label: string; confirm?: string; danger?: boolean }>;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<Action | null>(null);

  async function run(a: (typeof actions)[number]) {
    if (a.confirm && !window.confirm(a.confirm)) return;
    setBusy(a.action);
    try {
      await fetch('/api/admin/messages/bulk', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: a.action }),
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {actions.map((a) => (
        <button
          key={a.action}
          disabled={busy !== null}
          onClick={() => run(a)}
          className="rounded-[6px] border px-2.5 py-1 text-[12px] font-medium tracking-tight transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-50"
          style={{
            borderColor: a.danger ? 'color-mix(in oklab, #DC2626 35%, var(--border))' : 'var(--border)',
            color: a.danger ? '#DC2626' : 'var(--fg)',
          }}
        >
          {busy === a.action ? '...' : a.label}
        </button>
      ))}
    </div>
  );
}
