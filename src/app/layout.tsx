import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { SiteChrome } from '@/components/SiteChrome';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'Ahmet Furkan Budak · Markalaşma Günlüğü',
    template: '%s · Ahmet Furkan Budak',
  },
  description:
    'Konumlandırma, farklılaşma ve sürdürülebilir büyüme üzerine günlük markalaşma yazıları. Stratejik marka danışmanı Ahmet Furkan Budak tarafından.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Ahmet Furkan Budak',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="tr" suppressHydrationWarning>
        <body>
          <ThemeProvider>
            <SiteChrome>{children}</SiteChrome>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
