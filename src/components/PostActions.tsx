'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bookmark,
  Check,
  Heart,
  Link as LinkIcon,
  Linkedin,
  Share2,
  Twitter,
} from 'lucide-react';

type Props = {
  slug: string;
  title: string;
  initialLikes: number;
  initialFavorites: number;
  initialShares: number;
  isSignedIn: boolean;
};

export function PostActions({
  slug,
  title,
  initialLikes,
  initialFavorites,
  initialShares,
  isSignedIn,
}: Props) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [favCount, setFavCount] = useState(initialFavorites);
  const [shareCount, setShareCount] = useState(initialShares);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [busyLike, setBusyLike] = useState(false);
  const [busyFav, setBusyFav] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSignedIn) return;
    fetch(`/api/me/posts/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        setLiked(!!d.liked);
        setFavorited(!!d.favorited);
      })
      .catch(() => {});
  }, [slug, isSignedIn]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!shareRef.current) return;
      if (!shareRef.current.contains(e.target as Node)) setShareOpen(false);
    }
    if (shareOpen) document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [shareOpen]);

  function requireAuth(): boolean {
    if (isSignedIn) return true;
    router.push(`/sign-in?redirect_url=/posts/${slug}`);
    return false;
  }

  async function toggleLike() {
    if (!requireAuth() || busyLike) return;
    setBusyLike(true);
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikeCount((n) => n + (wasLiked ? -1 : 1));
    try {
      const res = await fetch(`/api/posts/${slug}/like`, { method: 'POST' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLiked(!!data.liked);
    } catch {
      setLiked(wasLiked);
      setLikeCount((n) => n + (wasLiked ? 1 : -1));
    } finally {
      setBusyLike(false);
    }
  }

  async function toggleFavorite() {
    if (!requireAuth() || busyFav) return;
    setBusyFav(true);
    const wasFav = favorited;
    setFavorited(!wasFav);
    setFavCount((n) => n + (wasFav ? -1 : 1));
    try {
      const res = await fetch(`/api/posts/${slug}/favorite`, { method: 'POST' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFavorited(!!data.favorited);
    } catch {
      setFavorited(wasFav);
      setFavCount((n) => n + (wasFav ? 1 : -1));
    } finally {
      setBusyFav(false);
    }
  }

  function logShare() {
    setShareCount((n) => n + 1);
    fetch(`/api/posts/${slug}/share`, { method: 'POST' }).catch(() => {});
  }

  function getUrl(): string {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/posts/${slug}`;
  }

  async function onShareClick() {
    const url = getUrl();
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, url });
        logShare();
        return;
      } catch {
        // user cancelled or unsupported context, fall through to menu
      }
    }
    setShareOpen((v) => !v);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      logShare();
    } catch {}
  }

  function shareTwitter() {
    const u = encodeURIComponent(getUrl());
    const t = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${u}&text=${t}`, '_blank', 'noopener');
    logShare();
    setShareOpen(false);
  }

  function shareLinkedIn() {
    const u = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`, '_blank', 'noopener');
    logShare();
    setShareOpen(false);
  }

  function shareWhatsapp() {
    const u = encodeURIComponent(`${title} ${getUrl()}`);
    window.open(`https://wa.me/?text=${u}`, '_blank', 'noopener');
    logShare();
    setShareOpen(false);
  }

  return (
    <div
      className="mx-auto mt-12 flex max-w-[680px] flex-wrap items-center gap-3"
      style={{ color: 'var(--fg)' }}
    >
      <button
        type="button"
        onClick={toggleLike}
        aria-pressed={liked}
        disabled={busyLike}
        className="group inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.08em] uppercase transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-60"
        style={{
          borderColor: liked ? 'transparent' : 'var(--border)',
          background: liked ? 'var(--color-flame)' : 'transparent',
          color: liked ? '#FFFFFF' : 'var(--fg)',
        }}
      >
        <Heart
          className="h-[11px] w-[11px] transition-transform group-active:scale-90"
          strokeWidth={2}
          fill={liked ? '#FFFFFF' : 'none'}
          style={{ opacity: liked ? 1 : 0.65 }}
        />
        <span>{liked ? 'Beğenildi' : 'Beğen'}</span>
        <span className="font-mono tabular-nums" style={{ opacity: liked ? 0.9 : 0.55 }}>
          {likeCount}
        </span>
      </button>

      <button
        type="button"
        onClick={toggleFavorite}
        aria-pressed={favorited}
        disabled={busyFav}
        className="inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.08em] uppercase transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)] disabled:opacity-60"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--fg)',
          background: favorited ? 'color-mix(in oklab, var(--fg) 10%, transparent)' : 'transparent',
        }}
      >
        <Bookmark
          className="h-[11px] w-[11px]"
          strokeWidth={2}
          fill={favorited ? 'var(--fg)' : 'none'}
          style={{ opacity: favorited ? 1 : 0.65 }}
        />
        <span>{favorited ? 'Favoride' : 'Favori'}</span>
        <span className="font-mono tabular-nums" style={{ opacity: 0.55 }}>
          {favCount}
        </span>
      </button>

      <div className="relative" ref={shareRef}>
        <button
          type="button"
          onClick={onShareClick}
          aria-haspopup="menu"
          aria-expanded={shareOpen}
          className="inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.08em] uppercase transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
          style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
        >
          <Share2 className="h-[11px] w-[11px] opacity-65" strokeWidth={2} />
          Paylaş
          <span className="font-mono tabular-nums" style={{ opacity: 0.55 }}>
            {shareCount}
          </span>
        </button>

        {shareOpen && (
          <div
            role="menu"
            className="absolute left-0 top-[calc(100%+8px)] z-20 min-w-[260px] overflow-hidden rounded-[12px] p-1.5"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: '0 18px 44px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <MenuItem onClick={copyLink} icon={copied ? Check : LinkIcon}>
              {copied ? 'Bağlantı kopyalandı' : 'Bağlantıyı kopyala'}
            </MenuItem>
            <MenuItem onClick={shareTwitter} icon={Twitter}>
              Twitter
            </MenuItem>
            <MenuItem onClick={shareLinkedIn} icon={Linkedin}>
              LinkedIn
            </MenuItem>
            <MenuItem onClick={shareWhatsapp} icon={WhatsappIcon}>
              WhatsApp
            </MenuItem>
          </div>
        )}
      </div>
    </div>
  );
}

function MenuItem({
  onClick,
  icon: Icon,
  children,
}: {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="menuitem"
      className="flex w-full items-center gap-3 whitespace-nowrap rounded-[8px] px-3 py-2.5 text-left text-[13.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
      style={{ color: 'var(--fg)' }}
    >
      <Icon className="h-[15px] w-[15px] opacity-80" strokeWidth={1.9} />
      <span>{children}</span>
    </button>
  );
}

function WhatsappIcon({
  className = '',
  strokeWidth = 1.9,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21l1.65-4.84A9 9 0 1 1 8.2 19.8L3 21" />
      <path d="M8.4 9.1c.3-.1.7 0 .9.3.2.3.6 1 .7 1.2.1.2.1.4 0 .6l-.4.5c-.2.2-.2.3-.1.5.3.6 1.2 1.8 2.5 2.4.2.1.4.1.5-.1l.5-.5c.2-.2.4-.2.6-.1.6.3 1 .5 1.3.6.2.1.2.3.2.5-.1.5-.5 1-.9 1.2-.4.2-1 .4-1.5.3-1.5-.3-3.5-1.2-5.2-3-1.6-1.7-2.2-3.4-2.1-4.5.1-.6.3-.9.6-1.1.2-.1.4-.2.6-.2Z" />
    </svg>
  );
}
