/**
 * Yayınlanmış yazıları depoya aktarır.
 *
 * Yazılar veritabanında tutulduğu için sürüm geçmişi ve yedeği yoktu. Bu araç
 * her yazıyı content/posts altına tek bir JSON dosyası olarak yazar; böylece
 * içerik değişiklikleri git geçmişinde görünür ve veritabanı kaybında geri
 * yüklenebilir.
 *
 * Dışa aktarılan dosyalar bir yedektir, kaynak değildir: sitenin okuduğu yer
 * veritabanıdır. Yazı eklendikten ya da düzenlendikten sonra bu araç yeniden
 * çalıştırılmalıdır, aksi hâlde dosyalar veritabanının gerisinde kalır.
 *
 *   npm run export:posts
 */

import { mkdir, writeFile, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { db } from '../src/lib/db';

const HEDEF = path.join(process.cwd(), 'content', 'posts');

async function main() {
  const posts = await db.post.findMany({
    where: { status: 'PUBLISHED' },
    include: { tags: { include: { tag: true } } },
    orderBy: { publishedAt: 'desc' },
  });

  await mkdir(HEDEF, { recursive: true });

  // Silinen ya da yayından kaldırılan yazılar dizinde kalmasın.
  const guncelDosyalar = new Set(posts.map((p) => `${p.slug}.json`));
  for (const dosya of await readdir(HEDEF).catch(() => [])) {
    if (dosya.endsWith('.json') && !guncelDosyalar.has(dosya)) {
      await unlink(path.join(HEDEF, dosya));
      console.log(`  silindi: ${dosya}`);
    }
  }

  for (const p of posts) {
    const veri = {
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      excerpt: p.excerpt,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      coverImageUrl: p.coverImageUrl,
      coverImageAlt: p.coverImageAlt,
      readingMinutes: p.readingMinutes,
      publishedAt: p.publishedAt?.toISOString() ?? null,
      tags: p.tags.map((t) => t.tag.slug),
      contentHtml: p.contentHtml,
    };
    await writeFile(path.join(HEDEF, `${p.slug}.json`), JSON.stringify(veri, null, 2) + '\n', 'utf8');
    const kelime = p.contentHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    console.log(`  ${p.slug.padEnd(48)} ${String(kelime).padStart(4)} kelime`);
  }

  console.log(`\n${posts.length} yazı content/posts altına aktarıldı.`);
  await db.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
