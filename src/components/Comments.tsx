'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { MessageSquare, Reply, Trash2 } from 'lucide-react';

type Plan = 'GOZLEMCI' | 'ORTAK' | 'MIMARI';

type Author = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  avatarUrl: string | null;
  tier: string;
  plan: Plan;
};

type Comment = {
  id: string;
  body: string;
  status: 'PENDING' | 'APPROVED' | 'HIDDEN';
  parentId: string | null;
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

const PLAN_LABEL: Record<Plan, string> = {
  GOZLEMCI: 'Gözlemci',
  ORTAK: 'Ortak',
  MIMARI: 'Mimari',
};

const PLAN_RANK: Record<Plan, number> = {
  GOZLEMCI: 1,
  ORTAK: 2,
  MIMARI: 3,
};

function canReply(viewer: Plan | null, target: Plan): boolean {
  if (!viewer || viewer === 'GOZLEMCI') return false;
  if (viewer === 'MIMARI') return true;
  return PLAN_RANK[target] <= PLAN_RANK[viewer];
}

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

function PlanBadge({ plan }: { plan: Plan }) {
  return (
    <span
      className="rounded-[4px] border px-1.5 py-[1px] text-[10px] font-semibold tracking-[0.06em] uppercase"
      style={{
        borderColor: 'color-mix(in oklab, var(--fg) 25%, transparent)',
        color: 'color-mix(in oklab, var(--fg) 85%, transparent)',
      }}
    >
      {PLAN_LABEL[plan]}
    </span>
  );
}

function Avatar({ author }: { author: Author }) {
  if (author.avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={author.avatarUrl}
        alt={displayName(author)}
        className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <div
      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
      style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)', color: 'var(--fg)' }}
    >
      {displayName(author).slice(0, 1).toUpperCase()}
    </div>
  );
}

type NodeProps = {
  comment: Comment;
  parentName?: string | null;
  viewerPlan: Plan | null;
  isSignedIn: boolean;
  indent: boolean;
  onReply: (id: string) => void;
  replying: boolean;
  replyBody: string;
  setReplyBody: (v: string) => void;
  submitReply: (parentId: string) => Promise<void>;
  cancelReply: () => void;
  replyBusy: boolean;
  onDelete: (id: string) => void;
};

function CommentNode({
  comment: c,
  parentName,
  viewerPlan,
  isSignedIn,
  indent,
  onReply,
  replying,
  replyBody,
  setReplyBody,
  submitReply,
  cancelReply,
  replyBusy,
  onDelete,
}: NodeProps) {
  const replyable = isSignedIn && canReply(viewerPlan, c.author.plan);
  return (
    <article
      className="flex gap-3"
      style={{
        opacity: c.status === 'APPROVED' ? 1 : c.mine ? 0.75 : 0.4,
        paddingLeft: indent ? 48 : 0,
      }}
    >
      <Avatar author={c.author} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[13px] font-semibold">{displayName(c.author)}</span>
          <PlanBadge plan={c.author.plan} />
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
          {parentName && (
            <span
              className="text-[11px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)' }}
            >
              · {parentName}'e yanıt
            </span>
          )}
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
              onClick={() => onDelete(c.id)}
              aria-label="Yorumu sil"
              className="ml-auto inline-flex items-center gap-1 text-[11px]"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              <Trash2 className="h-[11px] w-[11px]" strokeWidth={1.75} />
              Sil
            </button>
          )}
        </div>
        <p className="mt-1.5 text-[14px] leading-[1.55] whitespace-pre-wrap break-words">
          {c.body}
        </p>
        {replyable && !replying && (
          <button
            onClick={() => onReply(c.id)}
            className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium"
            style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
          >
            <Reply className="h-[11px] w-[11px]" strokeWidth={2} />
            Yanıtla
          </button>
        )}
        {replying && (
          <div className="mt-3">
            <textarea
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              rows={3}
              maxLength={2000}
              autoFocus
              placeholder={`${displayName(c.author)}'e yanıt…`}
              className="w-full rounded-[8px] border px-3 py-2.5 text-[13.5px] outline-none transition focus:border-[color-mix(in_oklab,var(--fg)_55%,var(--border))]"
              style={{
                borderColor: 'var(--border)',
                background: 'transparent',
                color: 'var(--fg)',
              }}
            />
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => submitReply(c.id)}
                disabled={replyBusy}
                className="btn-dark rounded-[6px] px-3 py-1.5 text-[12px] font-medium disabled:opacity-60"
              >
                {replyBusy ? 'Gönderiliyor…' : 'Yanıtı gönder'}
              </button>
              <button
                type="button"
                onClick={cancelReply}
                className="rounded-[6px] border px-3 py-1.5 text-[12px] font-medium"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              >
                İptal
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
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
  const [viewerPlan, setViewerPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState('');
  const [replyBusy, setReplyBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(listUrl)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setComments(d.comments ?? []);
        setViewerPlan(d.viewerPlan ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [listUrl]);

  async function refresh() {
    const r = await fetch(listUrl);
    const d = await r.json();
    setComments(d.comments ?? []);
    setViewerPlan(d.viewerPlan ?? null);
  }

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
        await refresh();
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setBusy(false);
    }
  }

  async function submitReply(parentId: string) {
    if (replyBody.trim().length < 3) return;
    setReplyBusy(true);
    try {
      const res = await fetch(listUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ body: replyBody.trim(), parentId }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ kind: 'err', text: json.error ?? 'Yanıt gönderilemedi.' });
      } else {
        setReplyBody('');
        setReplyingTo(null);
        await refresh();
      }
    } catch {
      setMsg({ kind: 'err', text: 'Ağ hatası.' });
    } finally {
      setReplyBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Yorumu silmek istediğine emin misin?')) return;
    const res = await fetch(`${deleteUrlBase}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setComments((list) => list.filter((c) => c.id !== id));
    }
  }

  const threaded = useMemo(() => {
    const byId = new Map(comments.map((c) => [c.id, c] as const));
    const tops = comments.filter((c) => !c.parentId || !byId.has(c.parentId));
    const replies = new Map<string, Comment[]>();
    for (const c of comments) {
      if (!c.parentId) continue;
      let rootId = c.parentId;
      let cursor = byId.get(rootId);
      while (cursor?.parentId && byId.has(cursor.parentId)) {
        rootId = cursor.parentId;
        cursor = byId.get(rootId);
      }
      if (!byId.has(rootId)) continue;
      const list = replies.get(rootId) ?? [];
      list.push(c);
      replies.set(rootId, list);
    }
    tops.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    for (const [, list] of replies) {
      list.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
    return { tops, replies, byId };
  }, [comments]);

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
            style={{ borderColor: 'var(--border)', background: 'transparent', color: 'var(--fg)' }}
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

      {isSignedIn && viewerPlan === 'GOZLEMCI' && (
        <p
          className="mt-3 text-[11.5px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Gözlemci üyeliğinde yalnızca yeni yorum bırakılabilir. Başka yorumlara
          yanıt vermek Ortak ve Mimari paketlerinde açıktır.
        </p>
      )}

      <div className="mt-8 space-y-6">
        {loading ? (
          <p
            className="text-[12.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            Yükleniyor…
          </p>
        ) : threaded.tops.length === 0 ? (
          <p
            className="text-[12.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            İlk yorumu sen yaz.
          </p>
        ) : (
          threaded.tops.map((top) => (
            <div key={top.id} className="space-y-4">
              <CommentNode
                comment={top}
                viewerPlan={viewerPlan}
                isSignedIn={isSignedIn}
                indent={false}
                onReply={(id) => {
                  setReplyingTo(id);
                  setReplyBody('');
                }}
                replying={replyingTo === top.id}
                replyBody={replyBody}
                setReplyBody={setReplyBody}
                submitReply={submitReply}
                cancelReply={() => {
                  setReplyingTo(null);
                  setReplyBody('');
                }}
                replyBusy={replyBusy}
                onDelete={remove}
              />
              {(threaded.replies.get(top.id) ?? []).map((r) => {
                const parent = r.parentId ? threaded.byId.get(r.parentId) : null;
                const parentName = parent && parent.id !== top.id
                  ? displayName(parent.author)
                  : null;
                return (
                  <CommentNode
                    key={r.id}
                    comment={r}
                    parentName={parentName}
                    viewerPlan={viewerPlan}
                    isSignedIn={isSignedIn}
                    indent
                    onReply={(id) => {
                      setReplyingTo(id);
                      setReplyBody('');
                    }}
                    replying={replyingTo === r.id}
                    replyBody={replyBody}
                    setReplyBody={setReplyBody}
                    submitReply={submitReply}
                    cancelReply={() => {
                      setReplyingTo(null);
                      setReplyBody('');
                    }}
                    replyBusy={replyBusy}
                    onDelete={remove}
                  />
                );
              })}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
