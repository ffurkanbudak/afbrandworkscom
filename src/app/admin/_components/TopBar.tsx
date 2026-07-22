import Link from 'next/link';
import { Bell } from 'lucide-react';
import { Avatar } from './Avatar';
import { MobileNav } from './MobileNav';

export function TopBar({
  admin,
  inboxCount,
  counts,
}: {
  admin: { name: string | null; email: string; avatarUrl: string | null; title: string | null; role: string };
  inboxCount: number;
  counts: {
    applications: number;
    sponsorships: number;
    messages: number;
    comments: number;
  };
}) {
  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 md:px-10"
      style={{
        background: 'color-mix(in oklab, var(--bg) 85%, transparent)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center gap-3">
        <MobileNav counts={counts} />
        <div>
          <p className="eyebrow">Panel</p>
          <p className="font-display mt-0.5 text-[15px] tracking-tight">
            Ahmet Furkan Budak · Yönetim
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/admin/messages"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-[8px] border transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
          style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
          aria-label="Bildirimler"
        >
          <Bell className="h-[15px] w-[15px]" strokeWidth={1.75} />
          {inboxCount > 0 && (
            <span
              className="absolute -right-1 -top-1 inline-flex h-[16px] min-w-[16px] items-center justify-center rounded-full px-1 text-[9.5px] font-bold"
              style={{ background: '#EA4E0D', color: '#fff' }}
            >
              {inboxCount > 9 ? '9+' : inboxCount}
            </span>
          )}
        </Link>

        <Link
          href="/admin/profile"
          className="flex items-center gap-2.5 rounded-[8px] border px-2 py-1.5 transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
          style={{ borderColor: 'var(--border)' }}
        >
          <Avatar
            src={admin.avatarUrl}
            name={admin.name}
            email={admin.email}
            size={26}
          />
          <div className="hidden flex-col leading-tight pr-1 md:flex">
            <span className="text-[12.5px] font-semibold tracking-tight">
              {admin.name || admin.email.split('@')[0]}
            </span>
            <span
              className="mt-0.5 text-[9.5px] font-semibold tracking-[0.16em] uppercase"
              style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
            >
              {admin.title ?? admin.role}
            </span>
          </div>
        </Link>

        <a
          href="/api/admin/logout"
          title="Çıkış yap"
          className="rounded-[8px] border px-3 py-2 text-[12.5px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
          style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
        >
          Çıkış
        </a>
      </div>
    </header>
  );
}
