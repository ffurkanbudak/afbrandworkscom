/**
 * Bilgi mimarisi denetimi.
 *
 * Yapılan iyileştirmelerin ölçülebilir kalması için tek seferlik ölçüm yerine
 * tekrarlanabilir bir araç. Veritabanı üzerinden çalışır; bir adres verilirse
 * yayındaki sayfaları da denetler.
 *
 *   npm run audit                      → yerel veritabanı
 *   npm run audit -- https://site.com  → veritabanı + yayındaki sayfalar
 */

import { db } from '../src/lib/db';
import { varlikBaglantilariniEkle } from '../src/lib/entity-links';

const PILLARLAR = [
  '/marka-danismanligi', '/marka-stratejisi', '/marka-yonetimi', '/konumlandirma',
  '/marka-kimligi', '/marka-mimarisi', '/dijital-markalasma', '/pazarlama-iletisimi',
  '/marka-sagligi', '/marka-yenilemesi', '/farklilasma',
];

/** Sunucu HTML'inde bulunması beklenen özgün içerik örnekleri. */
const TARANABILIR_OLMALI: [string, string][] = [
  ['/1-1', 'Kurmak istediğiniz markanın hangi problemi'],
  ['/1-1', 'Fikir Aşamasındasınız'],
  ['/1-1', 'Stratejik çerçeve'],
];

function ortanca(sayilar: number[]): number {
  if (!sayilar.length) return 0;
  const s = [...sayilar].sort((a, b) => a - b);
  const o = Math.floor(s.length / 2);
  return s.length % 2 ? s[o] : Math.round((s[o - 1] + s[o]) / 2);
}

function baslik(metin: string) {
  console.log(`\n${metin}\n${'─'.repeat(metin.length)}`);
}

function satir(ad: string, deger: string | number, not = '') {
  console.log(`  ${ad.padEnd(34)} ${String(deger).padStart(6)}  ${not}`);
}

async function main() {
  const kok = process.argv[2]?.replace(/\/+$/, '');

  const posts = await db.post.findMany({
    where: { status: 'PUBLISHED' },
    select: {
      slug: true, title: true, contentHtml: true, excerpt: true,
      metaDescription: true, coverImageUrl: true, coverImageAlt: true,
    },
    orderBy: { publishedAt: 'desc' },
  });

  // ---- İçerik derinliği ----
  baslik('İçerik derinliği');
  const kelimeler = posts.map((p) => p.contentHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
  const h2li = posts.filter((p) => p.contentHtml.includes('<h2')).length;
  satir('yayınlanmış yazı', posts.length);
  satir('kelime (en az / ortanca / en çok)', `${Math.min(...kelimeler)}/${ortanca(kelimeler)}/${Math.max(...kelimeler)}`);
  satir('alt başlık taşıyan yazı', `${h2li}/${posts.length}`);
  satir('metaDescription boş', posts.filter((p) => !p.metaDescription).length, 'excerpt’e düşüyor');
  satir('kapak görseli boş', posts.filter((p) => !p.coverImageUrl).length);
  satir('görsel açıklaması boş', posts.filter((p) => p.coverImageUrl && !p.coverImageAlt).length);

  // ---- Varlık bağlantı ağı ----
  baslik('Varlık bağlantı ağı');
  const hedefler = new Map<string, number>();
  let toplamBag = 0;
  let icIce = 0;
  const bagsiz: string[] = [];
  for (const p of posts) {
    const { html, varliklar } = varlikBaglantilariniEkle(p.contentHtml);
    if (/<a[^>]*>(?:(?!<\/a>)[\s\S])*<a/.test(html)) icIce += 1;
    toplamBag += varliklar.length;
    if (!varliklar.length) bagsiz.push(p.slug);
    varliklar.forEach((v) => hedefler.set(v.href, (hedefler.get(v.href) ?? 0) + 1));
  }
  const pillarKapsam = PILLARLAR.filter((h) => hedefler.has(h));
  satir('toplam iç bağlantı', toplamBag);
  satir('bağlantı taşıyan yazı', `${posts.length - bagsiz.length}/${posts.length}`);
  satir('iç bağlantı alan pillar', `${pillarKapsam.length}/${PILLARLAR.length}`);
  satir('farklı hedef varlık', hedefler.size);
  satir('iç içe <a> üreten yazı', icIce, icIce ? 'HATA' : '');
  if (bagsiz.length) console.log(`  bağlantısız yazılar: ${bagsiz.join(', ')}`);
  const bosPillar = PILLARLAR.filter((h) => !hedefler.has(h));
  if (bosPillar.length) console.log(`  iç bağlantı almayan pillar: ${bosPillar.join(', ')}`);

  // ---- Yayındaki sayfalar ----
  if (!kok) {
    baslik('Yayındaki sayfalar');
    console.log('  adres verilmedi, atlandı (örn: npm run audit -- http://localhost:3000)');
    await db.$disconnect();
    return;
  }

  baslik(`Yayındaki sayfalar — ${kok}`);
  const getir = async (yol: string) => {
    try {
      const r = await fetch(kok + yol, { headers: { 'user-agent': 'afb-audit' } });
      return r.ok ? await r.text() : null;
    } catch {
      return null;
    }
  };

  for (const [yol, aranan] of TARANABILIR_OLMALI) {
    const html = await getir(yol);
    const durum = html === null ? 'SAYFA YOK' : html.includes(aranan) ? 'var' : 'YOK';
    satir(`${yol} · ${aranan.slice(0, 26)}…`, durum, durum === 'var' ? '' : 'taranamıyor');
  }

  const sitemap = await getir('/sitemap.xml');
  if (sitemap) {
    const yaziUrl = (sitemap.match(/<loc>[^<]*\/posts\/[^<]+<\/loc>/g) ?? []).length;
    satir('sitemap yazı URL', yaziUrl, yaziUrl < posts.length ? `veritabanında ${posts.length} yazı var` : '');
  }

  const ornek = posts[0];
  if (ornek) {
    const html = await getir(`/posts/${ornek.slug}`);
    if (html) {
      const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } })
        .filter(Boolean) as Record<string, unknown>[];
      const makale = ld.find((x) => x['@type'] === 'BlogPosting');
      satir('BlogPosting şeması', makale ? 'var' : 'YOK');
      satir('about alanı', makale?.about ? 'var' : 'YOK');
      satir('mentions alanı', makale?.mentions ? 'var' : 'YOK');
      satir('BreadcrumbList', ld.some((x) => x['@type'] === 'BreadcrumbList') ? 'var' : 'YOK');
    }
  }

  const robots = await getir('/robots.txt');
  if (robots) {
    const botlar = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'OAI-SearchBot'];
    const eksik = botlar.filter((b) => !robots.includes(b));
    satir('yapay zekâ tarayıcı izni', eksik.length ? `${botlar.length - eksik.length}/${botlar.length}` : 'tam', eksik.join(' '));
  }

  await db.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
