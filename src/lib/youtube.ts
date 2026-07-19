export const YOUTUBE_CHANNEL_ID = 'UCicMTpr_R7JHZG0etsFFAnA';
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@ahmetfurkanbudak';
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

export const YOUTUBE_CHANNEL = {
  name: 'Ahmet Furkan Budak',
  handle: '@ahmetfurkanbudak',
  url: YOUTUBE_CHANNEL_URL,
  avatar:
    'https://yt3.googleusercontent.com/5zG_BjWe3RDxrF5gSCiOT33mUm99zDfxSyesqwt4u2iuRALlfNxScn6ZqVCETHBK3Mn0MKRJ8Q=s400-c-k-c0x00ffffff-no-rj',
  description:
    'Marka, pazarlama ve iletişim üzerine videolar. Stratejik marka danışmanı Ahmet Furkan Budak’ın resmî YouTube kanalı.',
  // Abone sayısı çalışma anında çekilemezse gösterilecek yedek değer.
  subscribersFallback: '125 abone',
};

/** Abone sayısını kanal sayfasından en iyi çabayla çeker (elde edilemezse null). */
export async function fetchYouTubeSubscribers(): Promise<string | null> {
  try {
    const r = await fetch(YOUTUBE_CHANNEL_URL, {
      headers: { 'user-agent': 'Mozilla/5.0', 'accept-language': 'tr' },
      next: { revalidate: 21600 },
    });
    if (!r.ok) return null;
    const html = await r.text();
    const m =
      html.match(/(\d[\d.,]*\s*(?:B|bin|Mn|Mr|K|M)?\s*abone)/i) ??
      html.match(/"(\d[\d.,]*[^"]*subscribers)"/i);
    return m?.[1]?.trim() ?? null;
  } catch {
    return null;
  }
}

export type YouTubeVideo = {
  id: string;
  title: string;
  url: string;
  publishedAt: Date;
  thumbnail: string;
};

function extract(block: string, tag: string): string | null {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1].trim() : null;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/** Kanalın son videolarını YouTube'un herkese açık RSS akışından çeker (token gerekmez). */
export async function fetchYouTubeVideos(limit = 12): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; afbrandworks/1.0)' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];
    const videos: YouTubeVideo[] = [];
    for (const e of entries) {
      const id = extract(e, 'yt:videoId');
      const title = extract(e, 'title');
      const published = extract(e, 'published');
      if (!id || !title) continue;
      const date = published ? new Date(published) : new Date();
      videos.push({
        id,
        title: decode(title),
        url: `https://www.youtube.com/watch?v=${id}`,
        publishedAt: Number.isNaN(date.getTime()) ? new Date() : date,
        thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      });
    }
    return videos.slice(0, limit);
  } catch {
    return [];
  }
}
