import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteChrome } from '@/components/SiteChrome';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SmoothCursorLoader } from '@/components/ui/smooth-cursor-loader';
import { SiteJsonLd } from '@/components/SiteJsonLd';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ahmet Furkan Budak · Stratejik Marka Danışmanı',
    template: '%s · Ahmet Furkan Budak',
  },
  description:
    "Türkiye'nin stratejik marka danışmanı ve Toganworks Stratejik Marka Danışmanlığı Ofisi kurucusu Ahmet Furkan Budak'ın resmi kişisel web sitesi. Markalaşma, marka yönetimi, pazarlama, kurumsal iletişim ve iş dünyasına yönelik stratejik analizler ile özgün içerikler.",
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
    siteName: 'Afbrandworks',
    title: 'Ahmet Furkan Budak · Stratejik Marka Danışmanı',
    description:
      "Türkiye'nin stratejik marka danışmanı ve Toganworks Stratejik Marka Danışmanlığı Ofisi kurucusu Ahmet Furkan Budak'ın resmi kişisel web sitesi. Markalaşma, marka yönetimi, pazarlama, kurumsal iletişim ve iş dünyasına yönelik stratejik analizler ile özgün içerikler.",
    images: [
      {
        url: '/afbn.png',
        width: 1200,
        height: 630,
        alt: 'Ahmet Furkan Budak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmet Furkan Budak · Stratejik Marka Danışmanı',
    description:
      "Türkiye'nin stratejik marka danışmanı ve Toganworks Stratejik Marka Danışmanlığı Ofisi kurucusu Ahmet Furkan Budak'ın resmi kişisel web sitesi. Markalaşma, marka yönetimi, pazarlama, kurumsal iletişim ve iş dünyasına yönelik stratejik analizler ile özgün içerikler.",
    images: [
      {
        url: '/afbn.png',
        width: 1200,
        height: 630,
        alt: 'Ahmet Furkan Budak',
      },
    ],
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
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/vnd.microsoft.icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION ?? '',
    },
  },
  // Facebook Insights için opsiyonel; tanımlıysa fb:app_id etiketi eklenir.
  ...(process.env.NEXT_PUBLIC_FB_APP_ID
    ? { other: { 'fb:app_id': process.env.NEXT_PUBLIC_FB_APP_ID } }
    : {}),
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
    <html lang="tr" suppressHydrationWarning className={inter.variable}>
      <head>
        <SiteJsonLd />
      </head>
      <body>
        <ThemeProvider>
          <SmoothCursorLoader />
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
