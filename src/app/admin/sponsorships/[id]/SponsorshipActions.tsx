'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { inputClass, inputStyle } from '../../_components/FormField';

type Status = 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'REJECTED';

const TRANSITIONS: Array<{ status: Status; label: string; tone: 'violet' | 'green' | 'red' }> = [
  { status: 'REVIEWING', label: 'Görüşmeye al', tone: 'violet' },
  { status: 'ACCEPTED', label: 'Anlaşma', tone: 'green' },
  { status: 'REJECTED', label: 'Uygun değil', tone: 'red' },
];

const BG: Record<string, string> = {
  violet: 'color-mix(in oklab, #7C3AED 10%, transparent)',
  green: 'color-mix(in oklab, #16A34A 10%, transparent)',
  red: 'color-mix(in oklab, #DC2626 10%, transparent)',
};
const FG: Record<string, string> = {
  violet: '#7C3AED',
  green: '#16A34A',
  red: '#DC2626',
};

export function SponsorshipActions({
  id,
  status,
  note,
}: {
  id: string;
  status: string;
  note: string;
}) {
  const router = useRouter();
  const [noteText, setNoteText] = useState(note);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function patch(status: Status) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/sponsorships/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status, adminNote: noteText || null }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg(j.error ?? 'Hata.');
      } else {
        setMsg('Güncellendi.');
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
      <p className="eyebrow">Karar</p>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        rows={4}
        placeholder="İç not…"
        className={inputClass + ' mt-4 text-[13px]'}
        style={inputStyle}
      />
      <div className="mt-4 grid grid-cols-1 gap-2">
        {TRANSITIONS.map((t) => (
          <button
            key={t.status}
            disabled={busy || status === t.status}
            onClick={() => patch(t.status)}
            className="rounded-[6px] border px-3 py-2 text-[13px] font-medium transition disabled:opacity-50"
            style={{ borderColor: 'var(--border)', background: BG[t.tone], color: FG[t.tone] }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {msg && (
        <p className="mt-3 text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
          {msg}
        </p>
      )}
    </div>
  );
}
