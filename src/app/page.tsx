import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { HomeJsonLd } from '@/components/HomeJsonLd';
import { HomeHero } from '@/components/HomeHero';
import { HomeAbout } from '@/components/HomeAbout';
import { MarkaMasasiHero } from './1-1/MarkaMasasiHero';
import { MarkaMasasiIcerik } from './1-1/MarkaMasasiIcerik';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');

const HOME_TITLE = 'Ahmet Furkan Budak | Marka • Pazarlama • İletişim';
const HOME_DESCRIPTION =
  "Türkiye'nin stratejik marka danışmanı ve Toganworks Stratejik Marka Danışmanlığı Ofisi kurucusu Ahmet Furkan Budak'ın resmi kişisel web sitesi. Markalaşma, marka yönetimi, pazarlama, kurumsal iletişim ve iş dünyasına yönelik stratejik analizler ile özgün içerikler.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Ahmet Furkan Budak',
    locale: 'tr_TR',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: '/og-hero.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Ahmet Furkan Budak — Stratejik Marka Danışmanı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: '/og-hero.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Ahmet Furkan Budak — Stratejik Marka Danışmanı',
      },
    ],
    creator: '@afurkanbudak',
  },
};

export default async function HomePage() {
  // Yazılar /makaleler sayfasında; burada yalnızca yapılandırılmış veri için okunur.
  // Veritabanı yoksa (ör. yerel ortam) boş listeyle devam edilir.
  const featured = await db.post
    .findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true, excerpt: true, publishedAt: true, coverImageUrl: true },
      take: 10,
    })
    .catch(() => []);

  return (
    <div className="fade-up">
      <HomeJsonLd featured={featured} />

      <HomeHero />

      <HomeAbout />

      <MarkaMasasiHero headingAs="h2" gorselBaslik />
      <MarkaMasasiIcerik />
    </div>
  );
}
