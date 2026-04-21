import { NextResponse } from 'next/server';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const sub = await getCurrentSubscriber();
  const { slug } = await ctx.params;
  const post = await db.post.findUnique({ where: { slug }, select: { id: true } });
  if (!post) return NextResponse.json({ liked: false, favorited: false });
  if (!sub) return NextResponse.json({ liked: false, favorited: false });

  const [like, fav] = await Promise.all([
    db.postLike.findUnique({
      where: { postId_subscriberId: { postId: post.id, subscriberId: sub.id } },
      select: { id: true },
    }),
    db.postFavorite.findUnique({
      where: { postId_subscriberId: { postId: post.id, subscriberId: sub.id } },
      select: { id: true },
    }),
  ]);

  return NextResponse.json({ liked: !!like, favorited: !!fav });
}
