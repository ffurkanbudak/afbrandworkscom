const USER_AGENT =
  'AhmetFurkanBudakBlog/1.0 (+https://afbrandworks.com; contact: info@afbrandworks.com)';

export type RssItem = {
  title: string;
  link: string;
  excerpt: string | null;
  imageUrl: string | null;
  publishedAt: Date;
};

/**
 * Bir makale sayfasını çekip og:image / twitter:image meta görselini döndürür.
 * RSS beslemesinde görsel olmadığında haberin kendi görselini bulmak için kullanılır.
 */
export async function fetchOgImage(pageUrl: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(pageUrl, {
      headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/xhtml+xml' },
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const html = (await res.text()).slice(0, 200_000);

    const candidates = [
      /<meta[^>]+property=["']og:image:secure_url["'][^>]*content=["']([^"']+)["']/i,
      /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
      /<meta[^>]+name=["']og:image["'][^>]*content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i,
      /<meta[^>]+name=["']twitter:image:src["'][^>]*content=["']([^"']+)["']/i,
    ];
    for (const re of candidates) {
      const m = html.match(re);
      if (m?.[1]) return absolutize(decode(m[1].trim()), pageUrl);
    }
    return null;
  } catch {
    return null;
  }
}

function absolutize(url: string, base: string): string | null {
  if (!url) return null;
  try {
    return new URL(url, base).toString();
  } catch {
    return url.startsWith('http') ? url : null;
  }
}

export async function fetchRss(feedUrl: string): Promise<RssItem[]> {
  const res = await fetch(feedUrl, {
    headers: { 'user-agent': USER_AGENT, accept: 'application/rss+xml, application/xml, text/xml' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`rss ${res.status}`);
  const xml = await res.text();
  return parseRss(xml);
}

export function parseRss(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const isAtom = /<feed[\s>]/i.test(xml) && !/<rss[\s>]/i.test(xml);
  const blockRegex = isAtom ? /<entry\b[\s\S]*?<\/entry>/gi : /<item\b[\s\S]*?<\/item>/gi;
  const blocks = xml.match(blockRegex) ?? [];

  for (const block of blocks) {
    const title = decode(extractTag(block, 'title'));
    let link: string | null = null;
    if (isAtom) {
      const hrefMatch = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i);
      link = hrefMatch?.[1] ?? null;
    } else {
      link = extractTag(block, 'link');
    }
    if (!title || !link) continue;

    const descRaw =
      extractTag(block, 'description') ??
      extractTag(block, 'content:encoded') ??
      extractTag(block, 'summary') ??
      extractTag(block, 'content') ??
      '';
    const excerpt = decode(stripHtml(descRaw)).trim().slice(0, 600) || null;

    const pubRaw =
      extractTag(block, 'pubDate') ??
      extractTag(block, 'published') ??
      extractTag(block, 'updated') ??
      extractTag(block, 'dc:date') ??
      '';
    const publishedAt = pubRaw ? new Date(pubRaw) : new Date();
    if (Number.isNaN(publishedAt.getTime())) continue;

    const imgFromMedia =
      block.match(/<media:content[^>]*url=["']([^"']+)["']/i)?.[1] ??
      block.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i)?.[1] ??
      null;
    const imgFromEnclosure =
      block.match(/<enclosure[^>]*type=["']image\/[^"']*["'][^>]*url=["']([^"']+)["']/i)?.[1] ??
      block.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image\/[^"']*["']/i)?.[1] ??
      null;
    const imgFromHtml = descRaw.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? null;
    const imageUrl = imgFromMedia ?? imgFromEnclosure ?? imgFromHtml ?? null;

    items.push({
      title,
      link: link.trim(),
      excerpt,
      imageUrl,
      publishedAt,
    });
  }

  return items;
}

function extractTag(block: string, tag: string): string | null {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`<${escaped}\\b[^>]*>([\\s\\S]*?)<\\/${escaped}>`, 'i');
  const match = block.match(re);
  if (!match) return null;
  const body = match[1].trim();
  const cdata = body.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return cdata ? cdata[1].trim() : body;
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
}

function decode(str: string | null): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}
