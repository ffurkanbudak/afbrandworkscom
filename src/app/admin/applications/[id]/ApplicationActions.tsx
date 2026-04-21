'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, Eye, X, ArrowLeft } from 'lucide-react';
import { inputClass, inputStyle } from '../../_components/FormField';

type Status = 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'REJECTED';

const ACCENT: Record<
  'violet' | 'green' | 'red',
  { bg: string; fg: string; border: string; hover: string }
> = {
  violet: {
    bg: 'color-mix(in oklab, #7C3AED 10%, transparent)',
    fg: '#7C3AED',
    border: 'color-mix(in oklab, #7C3AED 35%, transparent)',
    hover: 'color-mix(in oklab, #7C3AED 16%, transparent)',
  },
  green: {
    bg: 'color-mix(in oklab, #16A34A 10%, transparent)',
    fg: '#16A34A',
    border: 'color-mix(in oklab, #16A34A 35%, transparent)',
    hover: 'color-mix(in oklab, #16A34A 16%, transparent)',
  },
  red: {
    bg: 'color-mix(in oklab, #DC2626 10%, transparent)',
    fg: '#DC2626',
    border: 'color-mix(in oklab, #DC2626 35%, transparent)',
    hover: 'color-mix(in oklab, #DC2626 16%, transparent)',
  },
};

export function ApplicationActions({
  id,
  status,
  note,
  rejectionReason,
}: {
  id: string;
  status: string;
  note: string;
  rejectionReason: string;
}) {
  const router = useRouter();
  const [noteText, setNoteText] = useState(note);
  const [reasonText, setReasonText] = useState(rejectionReason);
  const [rejecting, setRejecting] = useState(false);
  const [busy, setBusy] = useState<Status | null>(null);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err' | 'info'; text: string } | null>(null);

  async function patch(next: Status) {
    if (next === 'REJECTED' && !reasonText.trim()) {
      setRejecting(true);
      setMsg({ kind: 'info', text: 'Reddetmeden önce bir gerekçe yaz.' });
      return;
    }
    setBusy(next);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          status: next,
          adminNote: noteText || null,
          ...(next === 'REJECTED' ? { rejectionReason: reasonText.trim() } : {}),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg({ kind: 'err', text: j.error ?? 'Hata oluştu.' });
      } else {
        setMsg({
          kind: 'ok',
          text:
            next === 'ACCEPTED'
              ? 'Kabul edildi. Adaya bilgilendirme e-postası gitti.'
              : next === 'REJECTED'
                ? 'Reddedildi. Gerekçe adaya iletildi.'
                : 'İncelemeye alındı.',
        });
        setRejecting(false);
        router.refresh();
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(null);
    }
  }

  async function saveNote() {
    setBusy('PENDING');
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ adminNote: noteText || null }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setMsg({ kind: 'err', text: j.error ?? 'Kaydedilemedi.' });
      } else {
        setMsg({ kind: 'ok', text: 'İç not kaydedildi.' });
        router.refresh();
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(null);
    }
  }

  const noteDirty = noteText !== note;

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="px-5 pt-5 pb-4">
        <p className="eyebrow">Karar</p>
        <p
          className="mt-2 text-[12.5px] leading-[1.55]"
          style={{ color: 'color-mix(in oklab, var(--fg) 58%, transparent)' }}
        >
          Kabul ya da ret kararı bildirim e-postası üretir. İç not yalnızca yönetici
          ekranında kalır.
        </p>
      </div>

      {!rejecting ? (
        <>
          <div className="grid grid-cols-1 gap-1.5 px-5">
            <DecisionButton
              tone="violet"
              icon={Eye}
              label="İncelemeye al"
              active={status === 'REVIEWING'}
              busy={busy === 'REVIEWING'}
              disabled={!!busy || status === 'REVIEWING'}
              onClick={() => patch('REVIEWING')}
            />
            <DecisionButton
              tone="green"
              icon={Check}
              label="Kabul et"
              active={status === 'ACCEPTED'}
              busy={busy === 'ACCEPTED'}
              disabled={!!busy || status === 'ACCEPTED'}
              onClick={() => patch('ACCEPTED')}
            />
            <DecisionButton
              tone="red"
              icon={X}
              label="Reddet"
              active={status === 'REJECTED'}
              busy={false}
              disabled={!!busy || status === 'REJECTED'}
              onClick={() => setRejecting(true)}
            />
          </div>

          <div
            className="mt-5 border-t px-5 py-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="eyebrow">İç not</p>
              {noteDirty && (
                <span
                  className="text-[10.5px] font-semibold tracking-[0.14em] uppercase"
                  style={{ color: '#EA4E0D' }}
                >
                  · kaydedilmedi
                </span>
              )}
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={3}
              placeholder="Sadece senin göreceğin bir not bırak."
              className={inputClass + ' mt-2 resize-y text-[13px]'}
              style={inputStyle}
            />
            {noteDirty && (
              <button
                type="button"
                disabled={!!busy}
                onClick={saveNote}
                className="mt-3 inline-flex items-center gap-1.5 rounded-[6px] border px-3 py-1.5 text-[12px] font-medium transition disabled:opacity-50"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              >
                Notu kaydet
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="px-5 pb-5">
          <div
            className="rounded-[10px] border-l-2 px-3.5 py-3"
            style={{
              borderColor: '#DC2626',
              background: 'color-mix(in oklab, #DC2626 5%, transparent)',
            }}
          >
            <p
              className="text-[11px] font-semibold tracking-[0.16em] uppercase"
              style={{ color: '#DC2626' }}
            >
              Red gerekçesi · zorunlu
            </p>
            <p
              className="mt-1.5 text-[12px] leading-[1.55]"
              style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
            >
              Adaya e-posta ile iletilir ve hesabında görünür. Kısa, saygılı, net olsun.
            </p>
          </div>

          <textarea
            value={reasonText}
            onChange={(e) => setReasonText(e.target.value)}
            rows={5}
            autoFocus
            placeholder="Örn. Konuyu yeterince açan bir çerçeve çıkmamış. Kişisel bir deneyim eklenirse tekrar okumak isterim."
            className={inputClass + ' mt-3 resize-y text-[13px]'}
            style={inputStyle}
          />

          <div className="mt-4 grid grid-cols-[auto_1fr] gap-2">
            <button
              type="button"
              disabled={!!busy}
              onClick={() => {
                setRejecting(false);
                setMsg(null);
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-[6px] border px-3 py-2.5 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_4%,transparent)] disabled:opacity-50"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              <ArrowLeft className="h-[13px] w-[13px]" strokeWidth={1.75} />
              Vazgeç
            </button>
            <DecisionButton
              tone="red"
              icon={X}
              label={busy === 'REJECTED' ? 'Gönderiliyor…' : 'Reddi onayla ve ilet'}
              active={false}
              busy={busy === 'REJECTED'}
              disabled={!!busy || !reasonText.trim()}
              onClick={() => patch('REJECTED')}
            />
          </div>
        </div>
      )}

      {msg && (
        <div
          className="border-t px-5 py-3 text-[12.5px]"
          style={{
            borderColor: 'var(--border)',
            color:
              msg.kind === 'ok'
                ? '#16A34A'
                : msg.kind === 'err'
                  ? '#DC2626'
                  : 'color-mix(in oklab, var(--fg) 60%, transparent)',
            background:
              msg.kind === 'ok'
                ? 'color-mix(in oklab, #16A34A 5%, transparent)'
                : msg.kind === 'err'
                  ? 'color-mix(in oklab, #DC2626 5%, transparent)'
                  : 'transparent',
          }}
        >
          {msg.text}
        </div>
      )}
    </div>
  );
}

function DecisionButton({
  tone,
  icon: Icon,
  label,
  active,
  busy,
  disabled,
  onClick,
}: {
  tone: 'violet' | 'green' | 'red';
  icon: React.ElementType;
  label: string;
  active: boolean;
  busy: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const t = ACCENT[tone];
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="group flex items-center justify-between gap-3 rounded-[8px] border px-3.5 py-2.5 text-[13px] font-medium transition disabled:cursor-not-allowed disabled:opacity-45"
      style={{
        borderColor: active ? t.border : 'var(--border)',
        background: active ? t.bg : 'transparent',
        color: t.fg,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = t.bg;
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.background = active ? t.bg : 'transparent';
      }}
    >
      <span className="inline-flex items-center gap-2">
        <Icon className="h-[14px] w-[14px]" strokeWidth={1.85} />
        {label}
      </span>
      {active && (
        <span
          className="text-[10px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: t.fg, opacity: 0.75 }}
        >
          · mevcut
        </span>
      )}
      {busy && !active && (
        <span className="h-[10px] w-[10px] animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
    </button>
  );
}
