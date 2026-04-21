import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://afbrandworks.com';

export default function robots(): MetadataRoute.Robots {
  const disallowed = ['/admin', '/admin/', '/api/', '/hesap/', '/profil/', '/sign-in', '/sign-up'];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: disallowed },
      { userAgent: 'Googlebot', allow: '/', disallow: disallowed },
      { userAgent: 'Googlebot-Image', allow: '/', disallow: disallowed },
      { userAgent: 'Google-Extended', allow: '/', disallow: disallowed },
      { userAgent: 'Bingbot', allow: '/', disallow: disallowed },
      { userAgent: 'YandexBot', allow: '/', disallow: disallowed },
      { userAgent: 'DuckDuckBot', allow: '/', disallow: disallowed },
      { userAgent: 'GPTBot', allow: '/', disallow: disallowed },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: disallowed },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: disallowed },
      { userAgent: 'ClaudeBot', allow: '/', disallow: disallowed },
      { userAgent: 'Claude-Web', allow: '/', disallow: disallowed },
      { userAgent: 'anthropic-ai', allow: '/', disallow: disallowed },
      { userAgent: 'PerplexityBot', allow: '/', disallow: disallowed },
      { userAgent: 'Perplexity-User', allow: '/', disallow: disallowed },
      { userAgent: 'Applebot', allow: '/', disallow: disallowed },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: disallowed },
      { userAgent: 'Meta-ExternalAgent', allow: '/', disallow: disallowed },
      { userAgent: 'Meta-ExternalFetcher', allow: '/', disallow: disallowed },
      { userAgent: 'Bytespider', allow: '/', disallow: disallowed },
      { userAgent: 'Amazonbot', allow: '/', disallow: disallowed },
      { userAgent: 'cohere-ai', allow: '/', disallow: disallowed },
      { userAgent: 'Diffbot', allow: '/', disallow: disallowed },
      { userAgent: 'FacebookBot', allow: '/', disallow: disallowed },
      { userAgent: 'CCBot', allow: '/', disallow: disallowed },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
