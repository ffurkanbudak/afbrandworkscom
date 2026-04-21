import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { SiteChrome } from '@/components/SiteChrome';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteJsonLd } from '@/components/SiteJsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://afbrandworks.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ahmet Furkan Budak · Stratejik Marka Danışmanı',
    template: '%s · Ahmet Furkan Budak',
  },
  description:
    'Stratejik marka danışmanı Ahmet Furkan Budak. Konumlandırma, marka kimliği ve sürdürülebilir büyüme üzerine günlük yazılar; küresel marka haberleri.',
  applicationName: 'Ahmet Furkan Budak',
  authors: [{ name: 'Ahmet Furkan Budak', url: SITE_URL }],
  creator: 'Ahmet Furkan Budak',
  publisher: 'Ahmet Furkan Budak',
  generator: 'Next.js',
  keywords: [
    'Ahmet Furkan Budak',
    'marka danışmanı',
    'stratejik marka danışmanı',
    'marka stratejisi',
    'markalaşma',
    'konumlandırma',
    'marka kimliği',
    'marka iletişimi',
    'Toganworks',
    'Afbrandworks',
    'marka inisiyatifi',
    'branding',
    'brand strategy',
    'pazarlama',
    'farklılaşma',
    'sürdürülebilir büyüme',
  ],
  category: 'Marka Stratejisi',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/',
    },
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: 'Ahmet Furkan Budak',
    title: 'Ahmet Furkan Budak · Stratejik Marka Danışmanı',
    description:
      'Konumlandırma, farklılaşma ve sürdürülebilir büyüme üzerine günlük markalaşma yazıları. Stratejik marka danışmanı Ahmet Furkan Budak.',
    images: [
      {
        url: '/ahmetfurkanbudak.jpeg',
        width: 1200,
        height: 1200,
        alt: 'Ahmet Furkan Budak',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmet Furkan Budak · Stratejik Marka Danışmanı',
    description:
      'Konumlandırma, farklılaşma ve sürdürülebilir büyüme üzerine günlük markalaşma yazıları.',
    images: ['/ahmetfurkanbudak.jpeg'],
    creator: '@afurkanbudak',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/afbrandworks-mark.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/afbrandworks-mark.svg',
    apple: '/ahmetfurkanbudak.jpeg',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION ?? '',
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="tr" suppressHydrationWarning>
        <head>
          <SiteJsonLd />
        </head>
        <body>
          <ThemeProvider>
            <SiteChrome>{children}</SiteChrome>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
