import { db } from './db';

export async function getRelatedPosts(postId: string, limit = 3) {
  const post = await db.post.findUnique({
    where: { id: postId },
    include: { tags: { select: { tagId: true } } },
  });
  if (!post) return [];
  const tagIds = post.tags.map((t) => t.tagId);
  if (tagIds.length === 0) {
    return db.post.findMany({
      where: { status: 'PUBLISHED', NOT: { id: postId } },
      include: { author: true, tags: { include: { tag: true } } },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  }
  const candidates = await db.post.findMany({
    where: {
      status: 'PUBLISHED',
      NOT: { id: postId },
      tags: { some: { tagId: { in: tagIds } } },
    },
    include: { author: true, tags: { include: { tag: true } } },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  });
  return candidates
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tagIds.includes(t.tagId)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}
