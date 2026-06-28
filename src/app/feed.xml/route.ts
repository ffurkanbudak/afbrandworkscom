import { db } from '@/lib/db';

export const revalidate = 1800; // 30 dk

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com')
  .trim()
  .replace(/\/+$/, '');

const SITE_NAME = 'Ahmet Furkan Budak';
const SITE_DESC =
  'Marka, pazarlama ve strateji üzerine yazılar; dünyadan marka haberleri. Stratejik marka danışmanı Ahmet Furkan Budak.';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await db.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 50,
    include: { author: true, tags: { include: { tag: true } } },
  });

  const lastBuild = (posts[0]?.publishedAt ?? new Date()).toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/posts/${p.slug}`;
      const cats = p.tags.map((t) => `<category>${esc(t.tag.labelTr)}</category>`).join('');
      const img = p.coverImageUrl
        ? `\n      <enclosure url="${esc(
            p.coverImageUrl.startsWith('http') ? p.coverImageUrl : `${SITE_URL}${p.coverImageUrl}`,
          )}" type="image/jpeg" />`
        : '';
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <pubDate>${(p.publishedAt ?? p.createdAt).toUTCString()}</pubDate>
      <dc:creator>${esc(p.author?.name ?? SITE_NAME)}</dc:creator>
      <description>${esc(p.excerpt ?? '')}</description>${img}
      ${cats}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(SITE_DESC)}</description>
    <language>tr-TR</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800',
    },
  });
}
