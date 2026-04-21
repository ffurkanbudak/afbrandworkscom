'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubscriberTier } from '@prisma/client';
import { TIER_LABEL, TIER_ORDER } from '../../_lib/tier';

export function SubscriberActions({
  id,
  currentTier,
  showInCommunity,
  activityScore,
}: {
  id: string;
  currentTier: SubscriberTier;
  showInCommunity: boolean;
  activityScore: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function patch(body: Record<string, unknown>, ok: string) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg(j.error ?? 'Hata');
      } else {
        setMsg(ok);
        router.refresh();
      }
    } catch {
      setMsg('Ağ hatası.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
      <p className="eyebrow">Yönetici işlemleri</p>

      <div className="mt-4">
        <p className="text-[12px] font-semibold">Kademe</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TIER_ORDER.map((t) => (
            <button
              key={t}
              disabled={busy}
              onClick={() => patch({ tier: t }, `Kademe ${TIER_LABEL[t]} olarak ayarlandı.`)}
              className="rounded-[6px] border px-2.5 py-1 text-[12px] transition disabled:opacity-50"
              style={{
                borderColor: currentTier === t ? 'var(--fg)' : 'var(--border)',
                background: currentTier === t ? 'color-mix(in oklab, var(--fg) 10%, transparent)' : 'transparent',
                fontWeight: currentTier === t ? 600 : 400,
              }}
            >
              {TIER_LABEL[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[12px] font-semibold">Aktivite puanı</p>
        <div className="mt-2 flex items-center gap-1.5">
          {[10, 25, 50].map((delta) => (
            <button
              key={delta}
              disabled={busy}
              onClick={() => patch({ activityScoreDelta: delta }, `+${delta} puan eklendi.`)}
              className="rounded-[6px] border px-2.5 py-1 text-[12px] disabled:opacity-50"
              style={{ borderColor: 'var(--border)' }}
            >
              +{delta}
            </button>
          ))}
          <span className="ml-auto tabular-nums text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
            şu an: {activityScore}
          </span>
        </div>
      </div>

      <label className="mt-5 flex items-center gap-2 text-[13px]">
        <input
          type="checkbox"
          defaultChecked={showInCommunity}
          disabled={busy}
          onChange={(e) =>
            patch({ showInCommunity: e.target.checked }, e.target.checked ? 'Topluluk akışında görünür.' : 'Toplulukta gizlendi.')
          }
        />
        Anasayfa topluluk akışında göster
      </label>

      {msg && (
        <p className="mt-4 text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}>
          {msg}
        </p>
      )}
    </div>
  );
}
