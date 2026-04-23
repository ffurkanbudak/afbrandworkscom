'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Td } from '../../_components/DataTable';
import { Pill } from '../../_components/Pill';

type Row = {
  id: string;
  code: string;
  plan: string;
  planLabel: string;
  status: string;
  statusLabel: string;
  statusTone: 'neutral' | 'green' | 'accent' | 'red' | 'violet';
  senderName: string | null;
  senderEmail: string | null;
  recipientEmail: string | null;
  note: string | null;
  redeemedByEmail: string | null;
  redeemedByName: string | null;
  redeemedAt: string | null;
  expiresAt: string;
  createdAt: string;
};

export function GiftCodeRow({ row }: { row: Row }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function revoke() {
    if (!confirm(`${row.code} kodu iptal edilsin mi?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/gift-codes/${row.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'revoke' }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(`${row.code} kaydı silinsin mi?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/gift-codes/${row.id}`, {
        method: 'DELETE',
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <tr>
      <Td>
        <div className="font-mono text-[13px] font-semibold tracking-wider">
          {row.code}
        </div>
        {row.senderName && (
          <div
            className="mt-0.5 text-[11px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Gönderen: {row.senderName}
          </div>
        )}
        {row.recipientEmail && (
          <div
            className="mt-0.5 truncate text-[11px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Alıcı: {row.recipientEmail}
          </div>
        )}
      </Td>
      <Td>
        <Pill tone="accent">{row.planLabel}</Pill>
      </Td>
      <Td>
        <Pill tone={row.statusTone}>{row.statusLabel}</Pill>
      </Td>
      <Td>
        {row.redeemedByEmail ? (
          <div>
            <div className="text-[12.5px]">
              {row.redeemedByName ?? row.redeemedByEmail.split('@')[0]}
            </div>
            <div
              className="text-[11px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              {row.redeemedByEmail} · {row.redeemedAt}
            </div>
          </div>
        ) : (
          <span
            className="text-[12px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 45%, transparent)' }}
          >
            ·
          </span>
        )}
      </Td>
      <Td className="text-right">
        <div className="text-[12.5px]">{row.expiresAt}</div>
        <div
          className="text-[10.5px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
        >
          üretim: {row.createdAt}
        </div>
      </Td>
      <Td className="text-right">
        {row.status === 'ACTIVE' && (
          <button
            onClick={revoke}
            disabled={busy}
            className="rounded-[6px] border px-2.5 py-1 text-[11.5px] font-medium transition hover:bg-[color-mix(in_oklab,#DC2626_8%,transparent)] disabled:opacity-50"
            style={{
              borderColor: 'color-mix(in oklab, #DC2626 45%, transparent)',
              color: '#DC2626',
            }}
          >
            İptal edin
          </button>
        )}
        {row.status !== 'ACTIVE' && (
          <button
            onClick={remove}
            disabled={busy}
            className="rounded-[6px] border px-2.5 py-1 text-[11.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-50"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            Silin
          </button>
        )}
      </Td>
    </tr>
  );
}
