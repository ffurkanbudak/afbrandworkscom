'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { NewsPulse } from './NewsPulse';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;
  const isAuthPage = pathname?.startsWith('/sign-in') ?? false;

  if (isAdmin) {
    return <div className="min-h-dvh">{children}</div>;
  }

  return (
    <div
      className="relative flex min-h-dvh flex-col"
      style={{
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <Header />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 pb-24 md:px-10 lg:px-14">
        {children}
      </main>
      <Footer />
      {!isAuthPage && <NewsPulse />}
    </div>
  );
}
