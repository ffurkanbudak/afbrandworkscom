import { NextResponse } from 'next/server';
import { auth } from '@/lib/admin-auth';
import { db } from '@/lib/db';
import { triggerPostBroadcast } from '@/server/broadcast';
import { pingIndexNow, postUrl } from '@/lib/indexnow';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const posts = await db.post.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { tags: { include: { tag: true } } },
  });
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const body = await req.json();
  const {
    slug, title, subtitle, excerpt, contentHtml, contentJson,
    coverImageUrl, coverImageAlt, tagIds, featured, status,
    metaTitle, metaDescription, scheduledFor,
  } = body;

  if (!Array.isArray(tagIds) || tagIds.length === 0) {
    return NextResponse.json({ error: 'En az bir etiket seçilmeli.' }, { status: 400 });
  }
  const validTags = await db.tag.findMany({ where: { id: { in: tagIds } }, select: { id: true } });
  if (validTags.length !== tagIds.length) {
    return NextResponse.json({ error: 'Geçersiz etiket.' }, { status: 400 });
  }

  const publishing = status === 'PUBLISHED';
  const post = await db.post.create({
    data: {
      slug, title, subtitle, excerpt, contentHtml, contentJson,
      coverImageUrl, coverImageAlt,
      featured: !!featured,
      status,
      metaTitle, metaDescription,
      scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
      publishedAt: publishing ? new Date() : null,
      authorId: admin.id,
      tags: { create: tagIds.map((id: string) => ({ tagId: id })) },
    },
  });

  if (publishing) {
    await triggerPostBroadcast(post.id, admin.id).catch(console.error);
    pingIndexNow([postUrl(post.slug)]).catch(console.error);
  }

  return NextResponse.json({ post });
}
