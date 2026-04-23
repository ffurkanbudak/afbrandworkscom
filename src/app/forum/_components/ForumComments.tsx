'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { MessageSquare, Reply } from 'lucide-react';
import { ReportButton } from './ReportButton';

type Plan = 'GOZLEMCI' | 'ORTAK' | 'MIMARI';

type Author = {
  id: string;
  firstName: string | null;
  name: string | null;
  avatarUrl: string | null;
  plan: Plan;
};

type Comment = {
  id: string;
  body: string;
  parentId: string | null;
  createdAt: string;
  publishAt: string;
  mine: boolean;
  author: Author;
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

function authorName(a: Author): string {
  return a.firstName || a.name?.split(' ')[0] || 'Üye';
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

export function ForumComments({
  postId,
  isSignedIn,
}: {
  postId: string;
  isSignedIn: boolean;
}) {
  const listUrl = `/api/forum/posts/${postId}/comments`;
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
    if (!isSignedIn || body.trim().length < 5) return;
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
        setMsg({ kind: 'ok', text: 'Yanıtınız bir saat içinde yayına alınacaktır.' });
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
    if (replyBody.trim().length < 5) return;
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
    for (const [, list] of replies) {
      list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    tops.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return { tops, replies, byId };
  }, [comments]);

  return (
    <section className="border-t pt-10" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-2">
        <MessageSquare
          className="h-[15px] w-[15px]"
          strokeWidth={1.75}
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        />
        <p className="eyebrow">Yanıtlar</p>
      </div>

      {isSignedIn ? (
        <form onSubmit={submit} className="mt-5">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            maxLength={3000}
            placeholder="Konuya düşüncenle katkı ver."
            className="w-full rounded-[10px] border px-3.5 py-3 text-[15px] outline-none transition focus:border-[color-mix(in_oklab,var(--fg)_55%,var(--border))] md:text-[14px]"
            style={{ borderColor: 'var(--border)', background: 'transparent', color: 'var(--fg)' }}
          />
          <div className="mt-3 flex items-center gap-4">
            <button
              type="submit"
              disabled={busy}
              className="btn-dark rounded-[8px] px-4 py-2 text-[12.5px] font-medium disabled:opacity-60"
            >
              {busy ? 'Gönderiliyor…' : 'Yanıt gönder'}
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
          className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[12px] border p-4 text-[13px]"
          style={{ borderColor: 'var(--border)' }}
        >
          <span style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}>
            Yanıt vermek için üye girişi gerekir.
          </span>
          <Link
            href="/sign-in?redirect_url=/forum"
            className="btn-dark rounded-[6px] px-3 py-1.5 text-[12px] font-medium"
          >
            Giriş
          </Link>
        </div>
      )}

      {isSignedIn && viewerPlan === 'GOZLEMCI' && (
        <p
          className="mt-3 text-[11.5px]"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Gözlemci üyeliğinde yalnızca yeni yorum bırakabilirsiniz. Başka
          yorumlara yanıt vermek Ortak ve Mimari paketlerinde açıktır.
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
            İlk yanıtı sen yaz.
          </p>
        ) : (
          threaded.tops.map((top) => (
            <div key={top.id} className="space-y-4">
              <Node
                c={top}
                parentName={null}
                viewerPlan={viewerPlan}
                isSignedIn={isSignedIn}
                indent={false}
                replying={replyingTo === top.id}
                replyBody={replyBody}
                setReplyBody={setReplyBody}
                onReply={(id) => {
                  setReplyingTo(id);
                  setReplyBody('');
                }}
                cancelReply={() => {
                  setReplyingTo(null);
                  setReplyBody('');
                }}
                submitReply={submitReply}
                replyBusy={replyBusy}
              />
              {(threaded.replies.get(top.id) ?? []).map((r) => {
                const parent = r.parentId ? threaded.byId.get(r.parentId) : null;
                const parentName =
                  parent && parent.id !== top.id ? authorName(parent.author) : null;
                return (
                  <Node
                    key={r.id}
                    c={r}
                    parentName={parentName}
                    viewerPlan={viewerPlan}
                    isSignedIn={isSignedIn}
                    indent
                    replying={replyingTo === r.id}
                    replyBody={replyBody}
                    setReplyBody={setReplyBody}
                    onReply={(id) => {
                      setReplyingTo(id);
                      setReplyBody('');
                    }}
                    cancelReply={() => {
                      setReplyingTo(null);
                      setReplyBody('');
                    }}
                    submitReply={submitReply}
                    replyBusy={replyBusy}
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

function Node({
  c,
  parentName,
  viewerPlan,
  isSignedIn,
  indent,
  replying,
  replyBody,
  setReplyBody,
  onReply,
  cancelReply,
  submitReply,
  replyBusy,
}: {
  c: Comment;
  parentName: string | null;
  viewerPlan: Plan | null;
  isSignedIn: boolean;
  indent: boolean;
  replying: boolean;
  replyBody: string;
  setReplyBody: (v: string) => void;
  onReply: (id: string) => void;
  cancelReply: () => void;
  submitReply: (id: string) => Promise<void>;
  replyBusy: boolean;
}) {
  const replyable = isSignedIn && canReply(viewerPlan, c.author.plan);
  const now = Date.now();
  const pending = new Date(c.publishAt).getTime() > now;
  return (
    <article
      className="flex gap-3"
      style={{
        opacity: pending && !c.mine ? 0.5 : 1,
        paddingLeft: indent ? 44 : 0,
      }}
    >
      {c.author.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={c.author.avatarUrl}
          alt={authorName(c.author)}
          className="mt-0.5 h-8 w-8 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
          style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)' }}
        >
          {authorName(c.author).slice(0, 1).toUpperCase()}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[13px] font-semibold">{authorName(c.author)}</span>
          <span
            className="rounded-[4px] border px-1.5 py-[1px] text-[10px] font-semibold tracking-[0.06em] uppercase"
            style={{
              borderColor: 'color-mix(in oklab, var(--fg) 25%, transparent)',
              color: 'color-mix(in oklab, var(--fg) 85%, transparent)',
            }}
          >
            {PLAN_LABEL[c.author.plan]}
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
          {pending && c.mine && (
            <span
              className="rounded-[4px] px-1.5 py-[1px] text-[10px] font-semibold"
              style={{
                background: 'color-mix(in oklab, #B45309 10%, transparent)',
                color: '#B45309',
              }}
            >
              Bir saat sonra yayında
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[14px] leading-[1.55] whitespace-pre-wrap break-words">
          {c.body}
        </p>
        {!replying && (
          <div className="mt-2 flex items-center gap-4">
            {replyable && (
              <button
                onClick={() => onReply(c.id)}
                className="inline-flex items-center gap-1 text-[11.5px] font-medium"
                style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
              >
                <Reply className="h-[11px] w-[11px]" strokeWidth={2} />
                Yanıtla
              </button>
            )}
            {isSignedIn && !c.mine && (
              <ReportButton target="comment" id={c.id} size="sm" />
            )}
          </div>
        )}
        {replying && (
          <div className="mt-3">
            <textarea
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              rows={3}
              maxLength={3000}
              autoFocus
              placeholder={`${authorName(c.author)}'e yanıt…`}
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
