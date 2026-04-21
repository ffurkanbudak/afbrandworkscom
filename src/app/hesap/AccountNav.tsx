'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserCircle,
  Heart,
  Bookmark,
  MessageSquare,
  PenLine,
  Inbox,
  Shield,
} from 'lucide-react';

type Item = { href: string; label: string; icon: React.ElementType };
type Group = { label: string; items: Item[] };

export function AccountNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  const groups: Group[] = [
    {
      label: 'Hesap',
      items: [
        { href: '/hesap', label: 'Genel', icon: LayoutDashboard },
        { href: '/hesap/profil', label: 'Profilim', icon: UserCircle },
      ],
    },
    {
      label: 'Etkileşim',
      items: [
        { href: '/hesap/begendiklerim', label: 'Beğendiklerim', icon: Heart },
        { href: '/hesap/favoriler', label: 'Favorilerim', icon: Bookmark },
        { href: '/hesap/yorumlarim', label: 'Yorumlarım', icon: MessageSquare },
      ],
    },
  ];

  if (!isAdmin) {
    groups.push({
      label: 'Talepler',
      items: [
        { href: '/hesap/yazar-basvurusu', label: 'Yazar başvurusu', icon: PenLine },
        { href: '/hesap/mesaj', label: 'Admine mesaj', icon: Inbox },
      ],
    });
  } else {
    groups.push({
      label: 'Yönetim',
      items: [{ href: '/admin', label: 'Yönetim paneli', icon: Shield }],
    });
  }

  const isActive = (href: string) => {
    if (href === '/hesap') return pathname === '/hesap';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="lg:sticky lg:top-24 lg:self-start">
      <div className="space-y-6">
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
                      <Icon className="h-[15px] w-[15px]" strokeWidth={active ? 2 : 1.65} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
