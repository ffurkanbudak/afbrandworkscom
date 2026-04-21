'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';

type Author = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  avatarUrl: string | null;
  tier: string;
};

type Comment = {
  id: string;
  body: string;
  status: 'PENDING' | 'APPROVED' | 'HIDDEN';
  createdAt: string;
  mine: boolean;
  author: Author;
};

const TIER_LABEL: Record<string, string> = {
  CIRAK: 'Çırak',
  KALFA: 'Kalfa',
  USTA: 'Usta',
  PIR: 'Pîr',
};

function displayName(a: Author): string {
  const first = a.firstName || a.name?.split(' ')[0] || 'Abone';
  const last = a.lastName || a.name?.split(' ').slice(1).join(' ') || '';
  return last ? `${first} ${last.slice(0, 1).toUpperCase()}★.` : first;
}

function relative(date: string): string {
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'az önce';
  if (m < 60) return `${m} dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} saat önce`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days} gün önce`;
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function Comments({
  listUrl,
  deleteUrlBase,
  signInRedirect,
  isSignedIn,
}: {
  listUrl: string;
  deleteUrlBase: string;
  signInRedirect: string;
  isSignedIn: boolean;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(listUrl)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setComments(d.comments ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [listUrl]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSignedIn) return;
    if (body.trim().length < 3) {
      setMsg({ kind: 'err', text: 'Yorum çok kısa.' });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(listUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ body: body.trim() }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ kind: 'err', text: json.error ?? 'Gönderilemedi.' });
      } else {
        setMsg({ kind: 'ok', text: 'İletildi. Onaylandığında yayınlanır.' });
        setBody('');
        const r = await fetch(listUrl);
        const d = await r.json();
        setComments(d.comments ?? []);
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Yorumu silmek istediğine emin misin?')) return;
    const res = await fetch(`${deleteUrlBase}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setComments((list) => list.filter((c) => c.id !== id));
    }
  }

  return (
    <section className="border-t pt-12" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2">
        <MessageSquare
          className="h-[15px] w-[15px]"
          strokeWidth={1.75}
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        />
        <p className="eyebrow">Yorumlar</p>
      </div>

      {isSignedIn ? (
        <form onSubmit={submit} className="mt-5">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            maxLength={2000}
            placeholder="Bu yazı sende ne uyandırdı?"
            className="w-full rounded-[10px] border px-3.5 py-3 text-[16px] outline-none transition focus:border-[color-mix(in_oklab,var(--fg)_55%,var(--border))] md:text-[14px]"
            style={{
              borderColor: 'var(--border)',
              background: 'transparent',
              color: 'var(--fg)',
            }}
          />
          <div className="mt-3 flex items-center gap-4">
            <button
              type="submit"
              disabled={busy}
              className="btn-dark rounded-[8px] px-4 py-2 text-[12.5px] font-medium disabled:opacity-60"
            >
              {busy ? 'Gönderiliyor…' : 'Gönder'}
            </button>
            {msg && (
              <span
                className="text-[12px]"
                style={{ color: msg.kind === 'ok' ? '#16A34A' : '#DC2626' }}
              >
                {msg.text}
              </span>
            )}
          </div>
        </form>
      ) : (
        <div
          className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4 text-[13px]"
          style={{ borderColor: 'var(--border)' }}
        >
          <span style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}>
            Yorum yapmak için üye girişi gerekir.
          </span>
          <div className="flex items-center gap-2">
            <Link
              href={`/sign-in?redirect_url=${encodeURIComponent(signInRedirect)}`}
              className="rounded-[6px] border px-3 py-1.5 text-[12px] font-medium"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              Giriş
            </Link>
            <Link
              href={`/sign-up?redirect_url=${encodeURIComponent(signInRedirect)}`}
              className="btn-dark rounded-[6px] px-3 py-1.5 text-[12px] font-medium"
            >
              Abone Olun!
            </Link>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-5">
        {loading ? (
          <p
            className="text-[12.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Yükleniyor…
          </p>
        ) : comments.length === 0 ? (
          <p
            className="text-[12.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            İlk yorumu sen yaz.
          </p>
        ) : (
          comments.map((c) => (
            <article
              key={c.id}
              className="flex gap-3"
              style={{
                opacity: c.status === 'APPROVED' ? 1 : c.mine ? 0.75 : 0.4,
              }}
            >
              {c.author.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.author.avatarUrl}
                  alt={displayName(c.author)}
                  className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={{
                    background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
                    color: 'var(--fg)',
                  }}
                >
                  {displayName(c.author).slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[13px] font-semibold">{displayName(c.author)}</span>
                  <span
                    className="text-[10.5px] font-semibold tracking-[0.1em] uppercase"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    {TIER_LABEL[c.author.tier] ?? c.author.tier}
                  </span>
                  <span
                    className="text-[11px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
                  >
                    {relative(c.createdAt)}
                  </span>
                  {c.status !== 'APPROVED' && c.mine && (
                    <span
                      className="rounded-[4px] px-1.5 py-[1px] text-[10px] font-semibold"
                      style={{
                        background: 'color-mix(in oklab, #B45309 10%, transparent)',
                        color: '#B45309',
                      }}
                    >
                      {c.status === 'PENDING' ? 'Onay bekliyor' : 'Gizlendi'}
                    </span>
                  )}
                  {c.mine && (
                    <button
                      onClick={() => remove(c.id)}
                      aria-label="Yorumu sil"
                      className="ml-auto inline-flex items-center gap-1 text-[11px]"
                      style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                    >
                      <Trash2 className="h-[11px] w-[11px]" strokeWidth={1.75} />
                      Sil
                    </button>
                  )}
                </div>
                <p className="mt-1.5 text-[14px] leading-[1.55] whitespace-pre-wrap break-words">{c.body}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
