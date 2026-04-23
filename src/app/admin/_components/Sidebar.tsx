'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  Users,
  Send,
  FileStack,
  Handshake,
  Mail,
  MessageSquare,
  BarChart3,
  UserCircle,
  Newspaper,
  Gift,
  Building2,
  ArrowLeft,
} from 'lucide-react';

type Item = { href: string; label: string; icon: React.ElementType; badge?: number };
type Group = { label: string; items: Item[] };

export function Sidebar({
  counts,
}: {
  counts: {
    applications: number;
    sponsorships: number;
    messages: number;
    comments: number;
    news: number;
  };
}) {
  const pathname = usePathname();

  const groups: Group[] = [
    {
      label: 'Merkez',
      items: [
        { href: '/admin', label: 'Genel Bakış', icon: LayoutDashboard },
        { href: '/admin/analytics', label: 'Analitik', icon: BarChart3 },
      ],
    },
    {
      label: 'İçerik',
      items: [
        { href: '/admin/posts', label: 'Yazılar', icon: FileText },
        { href: '/admin/posts/new', label: 'Yeni Yazı', icon: PenSquare },
        { href: '/admin/news', label: 'Gündem', icon: Newspaper, badge: counts.news },
        { href: '/admin/brand-stories', label: 'Marka Hikayeleri', icon: Building2 },
        { href: '/admin/broadcast', label: 'Yayın (E-posta)', icon: Send },
      ],
    },
    {
      label: 'Topluluk',
      items: [
        { href: '/admin/subscribers', label: 'Aboneler', icon: Users },
        { href: '/admin/comments', label: 'Yorumlar', icon: MessageSquare, badge: counts.comments },
        { href: '/admin/forum-moderation', label: 'Forum Moderasyon', icon: MessageSquare },
        { href: '/admin/gift-codes', label: 'Hediye Kodları', icon: Gift },
        { href: '/admin/gift-requests', label: 'Hediye Talepleri', icon: Gift },
      ],
    },
    {
      label: 'Talepler',
      items: [
        { href: '/admin/applications', label: 'Yazar Başvuruları', icon: FileStack, badge: counts.applications },
        { href: '/admin/sponsorships', label: 'Sponsorluk Talepleri', icon: Handshake, badge: counts.sponsorships },
        { href: '/admin/sponsors', label: 'Aktif Sponsorlar', icon: Handshake },
        { href: '/admin/messages', label: 'Mesajlar', icon: Mail, badge: counts.messages },
      ],
    },
    {
      label: 'Ben',
      items: [
        { href: '/admin/profile', label: 'Profilim', icon: UserCircle },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    if (href === '/admin/posts') return pathname === '/admin/posts' || pathname.startsWith('/admin/posts/') && !pathname.startsWith('/admin/posts/new');
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className="sticky top-0 h-dvh overflow-y-auto px-4 py-6 md:px-5">
      <div className="pl-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12.5px] font-medium"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          <ArrowLeft className="h-[13px] w-[13px]" strokeWidth={1.75} />
          Siteye dön
        </Link>
        <p className="wordmark mt-5 text-[17px]">Yönetim</p>
      </div>

      <nav className="mt-8 space-y-6">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="eyebrow px-2 text-[10px]">{g.label}</p>
            <ul className="mt-2 space-y-0.5">
              {g.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[13.5px] transition"
                      style={{
                        background: active
                          ? 'color-mix(in oklab, var(--fg) 7%, transparent)'
                          : 'transparent',
                        color: active
                          ? 'var(--fg)'
                          : 'color-mix(in oklab, var(--fg) 78%, transparent)',
                        fontWeight: active ? 600 : 500,
                      }}
                    >
                      <Icon
                        className="h-[15px] w-[15px]"
                        strokeWidth={active ? 2 : 1.65}
                      />
                      <span className="truncate">{item.label}</span>
                      {typeof item.badge === 'number' && item.badge > 0 && (
                        <span
                          className="ml-auto inline-flex min-w-[18px] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold"
                          style={{
                            background: '#EA4E0D',
                            color: '#fff',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
