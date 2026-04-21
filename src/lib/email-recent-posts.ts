import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { db } from './db';
import type { EmailPost } from './email-templates';

const publicDir = path.join(process.cwd(), 'public');

async function loadCoverPng(coverUrl: string | null, slug: string) {
  if (!coverUrl) return null;
  try {
    const rel = coverUrl.replace(/^\//, '');
    const filePath = path.join(publicDir, rel);
    const buffer = await fs.promises.readFile(filePath);
    const png = await sharp(buffer)
      .resize(160, 160, { fit: 'cover', position: 'centre' })
      .png({ compressionLevel: 9 })
      .toBuffer();
    return {
      filename: `post-${slug}.png`,
      content: png,
      contentType: 'image/png',
      inlineContentId: `afb-post-${slug}`,
    };
  } catch {
    return null;
  }
}

export async function getRecentPostsForEmail(take = 3): Promise<EmailPost[]> {
  const posts = await db.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      coverImageUrl: true,
      coverImageAlt: true,
    },
  });

  return Promise.all(
    posts.map(async (p) => {
      const cover = await loadCoverPng(p.coverImageUrl, p.slug);
      return {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        coverImageUrl: p.coverImageUrl,
        coverImageAlt: p.coverImageAlt,
        cover: cover ?? undefined,
      };
    }),
  );
}
