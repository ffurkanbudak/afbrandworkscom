import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags, news] = await Promise.all([
    db.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    }),
    db.tag.findMany({ select: { slug: true } }),
    db.newsItem.findMany({
      where: { status: 'APPROVED' },
      select: { id: true, approvedAt: true, publishedAt: true },
      orderBy: { approvedAt: 'desc' },
      take: 500,
    }),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/posts`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${SITE_URL}/gundem`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/konular`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/oneriler`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/hakkinda`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/marka-danismanligi`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/marka-stratejisi`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/marka-yonetimi`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/dijital-markalasma`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/konumlandirma`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/marka-kimligi`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/farklilasma`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/sozluk`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/oneriler/kitaplar`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/oneriler/podcastler`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/oneriler/videolar`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/oneriler/etkinlikler`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/sponsorluk`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/yazar`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/posts/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt ?? now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((t) => ({
    url: `${SITE_URL}/posts?tag=${t.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE_URL}/gundem/${n.id}`,
    lastModified: n.approvedAt ?? n.publishedAt ?? now,
    changeFrequency: 'monthly',
    priority: 0.55,
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes, ...newsRoutes];
}
