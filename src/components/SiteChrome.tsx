'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import Footer4 from '@/components/ui/footer-section-4';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;
  const isStandalone = pathname?.startsWith('/1-1') ?? false;

  if (isAdmin) {
    return <div className="min-h-dvh">{children}</div>;
  }

  if (isStandalone) {
    return (
      <div className="flex min-h-dvh flex-col">
        <div className="flex-1">{children}</div>
        <Footer4 />
      </div>
    );
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
      <Footer4 />
    </div>
  );
}
