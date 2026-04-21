'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sparkles, Check, X, Archive, RotateCcw } from 'lucide-react';
import { Field, inputClass, inputStyle } from '../../_components/FormField';

type Defaults = {
  titleTr: string;
  summaryTr: string;
  editorialNote: string;
  rejectionReason: string;
};

type Msg = { kind: 'ok' | 'err'; text: string } | null;

export function NewsReviewForm({
  id,
  status,
  language,
  defaults,
}: {
  id: string;
  status: string;
  language: 'EN' | 'TR';
  defaults: Defaults;
}) {
  const router = useRouter();
  const [titleTr, setTitleTr] = useState(defaults.titleTr);
  const [summaryTr, setSummaryTr] = useState(defaults.summaryTr);
  const [note, setNote] = useState(defaults.editorialNote);
  const [rejectionReason, setRejectionReason] = useState(defaults.rejectionReason);
  const [rejectMode, setRejectMode] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [busy, setBusy] = useState<'save' | 'approve' | 'reject' | 'archive' | 'restore' | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  async function translate() {
    setTranslating(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/news/${id}/translate`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) {
        setMsg({ kind: 'err', text: json.error ?? 'Çeviri yapılamadı.' });
        return;
      }
      setTitleTr(json.item.titleTr ?? '');
      setSummaryTr(json.item.summaryTr ?? '');
      setNote(json.item.editorialNote ?? '');
      setMsg({ kind: 'ok', text: 'AI çevirisi geldi. Düzenleyip onaylayabilirsin.' });
      router.refresh();
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setTranslating(false);
    }
  }

  async function send(action: 'save' | 'approve' | 'reject' | 'archive' | 'restore') {
    setBusy(action);
    setMsg(null);
    try {
      const body: Record<string, unknown> = { action };
      if (action === 'save' || action === 'approve') {
        body.titleTr = titleTr || null;
        body.summaryTr = summaryTr || null;
        body.editorialNote = note || null;
      }
      if (action === 'reject') body.rejectionReason = rejectionReason || null;

      const res = await fetch(`/api/admin/news/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ kind: 'err', text: json.error ?? 'İşlem başarısız.' });
        return;
      }
      const label =
        action === 'save'
          ? 'Kaydedildi.'
          : action === 'approve'
            ? 'Onaylandı. /gundem sayfasında görünüyor.'
            : action === 'reject'
              ? 'Reddedildi.'
              : action === 'archive'
                ? 'Arşivlendi.'
                : 'Geri alındı.';
      setMsg({ kind: 'ok', text: label });
      if (action === 'reject') setRejectMode(false);
      router.refresh();
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(null);
    }
  }

  const isApproved = status === 'APPROVED';
  const isRejected = status === 'REJECTED';
  const isArchived = status === 'ARCHIVED';
  const isClosed = isApproved || isRejected || isArchived;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">Türkçe sürüm</p>
        <button
          type="button"
          onClick={translate}
          disabled={translating}
          className="inline-flex items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-55"
          style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
        >
          <Sparkles className="h-[13px] w-[13px]" strokeWidth={1.85} />
          {translating
            ? 'Çeviriliyor…'
            : defaults.titleTr
              ? 'Yeniden çevir'
              : language === 'TR'
                ? 'AI ile toparla'
                : 'AI ile Türkçeleştir'}
        </button>
      </div>

      <Field label="Başlık (Türkçe)" required hint="90 karakteri geçme; başlık /gundem kartında görünür.">
        <input
          value={titleTr}
          onChange={(e) => setTitleTr(e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="Örn. Lego Studios yeni marka kimliğini tanıttı"
          maxLength={140}
        />
      </Field>

      <Field label="Özet (Türkçe)" required hint="2 kısa cümle, 260 karakteri geçmesin. Orijinalin tamamı olmasın.">
        <textarea
          value={summaryTr}
          onChange={(e) => setSummaryTr(e.target.value)}
          rows={4}
          className={inputClass}
          style={inputStyle}
          maxLength={400}
        />
      </Field>

      <Field label="Editör notu" hint="Neden okunması gerektiğine dair bir cümle. İstersen boş bırak.">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="Türkiye'deki marka ekipleri için önemli çünkü…"
          maxLength={220}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-2 border-t pt-5" style={{ borderColor: 'var(--border)' }}>
        {!isClosed && (
          <>
            <button
              type="button"
              onClick={() => send('save')}
              disabled={!!busy}
              className="inline-flex items-center gap-1.5 rounded-[8px] border px-3.5 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-55"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              {busy === 'save' ? 'Kaydediliyor…' : 'Taslağı kaydet'}
            </button>

            <button
              type="button"
              onClick={() => send('approve')}
              disabled={!!busy || !titleTr || !summaryTr}
              className="inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-2 text-[12.5px] font-semibold transition disabled:opacity-55"
              style={{
                background: 'color-mix(in oklab, #16A34A 14%, transparent)',
                color: '#16A34A',
                border: '1px solid color-mix(in oklab, #16A34A 35%, transparent)',
              }}
            >
              <Check className="h-[13px] w-[13px]" strokeWidth={2} />
              {busy === 'approve' ? 'Onaylanıyor…' : 'Onayla ve yayımla'}
            </button>

            {!rejectMode ? (
              <button
                type="button"
                onClick={() => setRejectMode(true)}
                disabled={!!busy}
                className="inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-2 text-[12.5px] font-medium transition disabled:opacity-55"
                style={{
                  background: 'color-mix(in oklab, #DC2626 10%, transparent)',
                  color: '#DC2626',
                  border: '1px solid color-mix(in oklab, #DC2626 30%, transparent)',
                }}
              >
                <X className="h-[13px] w-[13px]" strokeWidth={2} />
                Reddet
              </button>
            ) : (
              <div className="flex w-full flex-col gap-2.5 rounded-[10px] border p-4" style={{ borderColor: 'color-mix(in oklab, #DC2626 30%, transparent)' }}>
                <p className="text-[12.5px] font-semibold" style={{ color: '#DC2626' }}>
                  Neden reddediyorsun?
                </p>
                <textarea
                  autoFocus
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={2}
                  className={inputClass}
                  style={inputStyle}
                  placeholder="Konu alakasız / kaynak zayıf / zaten yayında…"
                  maxLength={240}
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => send('reject')}
                    disabled={!!busy || !rejectionReason.trim()}
                    className="inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-2 text-[12.5px] font-semibold transition disabled:opacity-55"
                    style={{ background: '#DC2626', color: '#fff' }}
                  >
                    {busy === 'reject' ? 'Reddediliyor…' : 'Reddi onayla'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRejectMode(false)}
                    className="rounded-[8px] border px-3 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    Vazgeç
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {isApproved && (
          <button
            type="button"
            onClick={() => send('archive')}
            disabled={!!busy}
            className="inline-flex items-center gap-1.5 rounded-[8px] border px-3.5 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-55"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            <Archive className="h-[13px] w-[13px]" strokeWidth={1.85} />
            {busy === 'archive' ? 'Arşivleniyor…' : 'Arşivle'}
          </button>
        )}

        {(isRejected || isArchived) && (
          <button
            type="button"
            onClick={() => send('restore')}
            disabled={!!busy}
            className="inline-flex items-center gap-1.5 rounded-[8px] border px-3.5 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-55"
            style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          >
            <RotateCcw className="h-[13px] w-[13px]" strokeWidth={1.85} />
            {busy === 'restore' ? 'Geri alınıyor…' : 'İncelemeye geri al'}
          </button>
        )}

        {msg && (
          <span
            className="text-[12px]"
            style={{ color: msg.kind === 'ok' ? '#16A34A' : '#DC2626' }}
          >
            {msg.text}
          </span>
        )}
      </div>

      {isRejected && defaults.rejectionReason && (
        <div
          className="rounded-[10px] border-l-[3px] px-4 py-3 text-[12.5px]"
          style={{
            borderLeftColor: '#DC2626',
            background: 'color-mix(in oklab, #DC2626 5%, transparent)',
            color: 'color-mix(in oklab, var(--fg) 80%, transparent)',
          }}
        >
          <p className="mb-1 font-semibold" style={{ color: '#DC2626' }}>
            Ret gerekçesi
          </p>
          {defaults.rejectionReason}
        </div>
      )}
    </div>
  );
}
