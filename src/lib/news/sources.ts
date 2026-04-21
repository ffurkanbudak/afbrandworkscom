import type { NewsLanguage, NewsSourceType } from '@prisma/client';

export type SeedSource = {
  slug: string;
  name: string;
  homepageUrl: string;
  feedUrl: string;
  logoDomain: string;
  language: NewsLanguage;
  type: NewsSourceType;
  keywordFilter?: string;
};

export const DEFAULT_SOURCES: SeedSource[] = [
  {
    slug: 'marketing-dive',
    name: 'Marketing Dive',
    homepageUrl: 'https://www.marketingdive.com/',
    feedUrl: 'https://www.marketingdive.com/feeds/news/',
    logoDomain: 'marketingdive.com',
    language: 'EN',
    type: 'RSS',
  },
  {
    slug: 'the-drum',
    name: 'The Drum',
    homepageUrl: 'https://www.thedrum.com/',
    feedUrl:
      'https://news.google.com/rss/search?q=site%3Athedrum.com&hl=en-US&gl=US&ceid=US:en',
    logoDomain: 'thedrum.com',
    language: 'EN',
    type: 'GOOGLE_NEWS',
  },
  {
    slug: 'adweek',
    name: 'Adweek',
    homepageUrl: 'https://www.adweek.com/',
    feedUrl: 'https://www.adweek.com/feed/',
    logoDomain: 'adweek.com',
    language: 'EN',
    type: 'RSS',
  },
  {
    slug: 'campaign',
    name: 'Campaign',
    homepageUrl: 'https://www.campaignlive.co.uk/',
    feedUrl:
      'https://news.google.com/rss/search?q=site%3Acampaignlive.co.uk+OR+site%3Acampaignasia.com&hl=en-US&gl=US&ceid=US:en',
    logoDomain: 'campaignlive.co.uk',
    language: 'EN',
    type: 'GOOGLE_NEWS',
  },
  {
    slug: 'marketing-week',
    name: 'Marketing Week',
    homepageUrl: 'https://www.marketingweek.com/',
    feedUrl: 'https://www.marketingweek.com/feed/',
    logoDomain: 'marketingweek.com',
    language: 'EN',
    type: 'RSS',
  },
  {
    slug: 'underconsideration-brandnew',
    name: 'Brand New',
    homepageUrl: 'https://www.underconsideration.com/brandnew/',
    feedUrl:
      'https://news.google.com/rss/search?q=site%3Aunderconsideration.com&hl=en-US&gl=US&ceid=US:en',
    logoDomain: 'underconsideration.com',
    language: 'EN',
    type: 'GOOGLE_NEWS',
  },
  {
    slug: 'marketing-turkiye',
    name: 'Marketing Türkiye',
    homepageUrl: 'https://www.marketingturkiye.com.tr/',
    feedUrl: 'https://www.marketingturkiye.com.tr/rss',
    logoDomain: 'marketingturkiye.com.tr',
    language: 'TR',
    type: 'RSS',
  },
  {
    slug: 'mediacat',
    name: 'MediaCat',
    homepageUrl: 'https://mediacat.com/',
    feedUrl: 'https://mediacat.com/feed/',
    logoDomain: 'mediacat.com',
    language: 'TR',
    type: 'RSS',
  },
  {
    slug: 'google-news-tr-markalasma',
    name: 'Google News — Türkiye',
    homepageUrl: 'https://news.google.com/',
    feedUrl:
      'https://news.google.com/rss/search?q=%22marka%20stratejisi%22%20OR%20%22marka%20kimli%C4%9Fi%22%20OR%20%22marka%20dan%C4%B1%C5%9Fman%22%20OR%20%22rebranding%22%20OR%20%22yeni%20logo%22&hl=tr&gl=TR&ceid=TR:tr',
    logoDomain: 'news.google.com',
    language: 'TR',
    type: 'GOOGLE_NEWS',
    keywordFilter: 'marka,logo,kimlik,rebranding,kampanya,reklam,pazarlama,iletişim',
  },
  {
    slug: 'google-news-branding',
    name: 'Google News — Branding',
    homepageUrl: 'https://news.google.com/',
    feedUrl:
      'https://news.google.com/rss/search?q=branding+OR+%22brand+strategy%22+OR+%22brand+identity%22&hl=en-US&gl=US&ceid=US:en',
    logoDomain: 'news.google.com',
    language: 'EN',
    type: 'GOOGLE_NEWS',
    keywordFilter: 'brand,branding,identity,strategy,marketing',
  },
];

export function logoUrlFor(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}
