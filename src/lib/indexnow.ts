const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com').trim().replace(/\/+$/, '');
const INDEXNOW_KEY = 'dc8f40da378c49bbac4c221d76f0b822';

export async function pingIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0) return;

  const host = new URL(SITE_URL).host;

  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    if (!res.ok && res.status !== 202) {
      console.warn(`IndexNow ping failed: ${res.status}`);
    }
  } catch (err) {
    console.warn('IndexNow ping error:', err);
  }
}

export function postUrl(slug: string): string {
  return `${SITE_URL}/posts/${slug}`;
}
