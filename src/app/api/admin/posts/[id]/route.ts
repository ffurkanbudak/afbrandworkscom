import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { pingIndexNow, postUrl } from '@/lib/indexnow';

async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) return { error: 'unauthorized', status: 401 as const };
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return { error: 'forbidden', status: 403 as const };
  return { admin };
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if ('error' in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });
  const { id } = await ctx.params;
  const post = await db.post.findUnique({
    where: { id },
    include: { tags: true },
  });
  if (!post) return NextResponse.json({ error: 'not-found' }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if ('error' in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });
  const { id } = await ctx.params;

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const body = await req.json();
  const {
    slug, title, subtitle, excerpt, contentHtml, contentJson,
    coverImageUrl, coverImageAlt, tagIds, featured, status,
    metaTitle, metaDescription, scheduledFor,
  } = body;

  if (Array.isArray(tagIds)) {
    if (tagIds.length === 0) {
      return NextResponse.json({ error: 'En az bir etiket seçilmeli.' }, { status: 400 });
    }
    const valid = await db.tag.findMany({ where: { id: { in: tagIds } }, select: { id: true } });
    if (valid.length !== tagIds.length) {
      return NextResponse.json({ error: 'Geçersiz etiket.' }, { status: 400 });
    }
  }

  const becamePublished =
    status === 'PUBLISHED' && existing.status !== 'PUBLISHED';

  const slugChanged =
    slug !== undefined && slug !== existing.slug && existing.status === 'PUBLISHED';

  const post = await db.post.update({
    where: { id },
    data: {
      ...(slug !== undefined ? { slug } : {}),
      ...(title !== undefined ? { title } : {}),
      ...(subtitle !== undefined ? { subtitle } : {}),
      ...(excerpt !== undefined ? { excerpt } : {}),
      ...(contentHtml !== undefined ? { contentHtml } : {}),
      ...(contentJson !== undefined ? { contentJson } : {}),
      ...(coverImageUrl !== undefined ? { coverImageUrl } : {}),
      ...(coverImageAlt !== undefined ? { coverImageAlt } : {}),
      ...(featured !== undefined ? { featured: !!featured } : {}),
      ...(status !== undefined ? { status } : {}),
      ...(metaTitle !== undefined ? { metaTitle } : {}),
      ...(metaDescription !== undefined ? { metaDescription } : {}),
      ...(scheduledFor !== undefined
        ? { scheduledFor: scheduledFor ? new Date(scheduledFor) : null }
        : {}),
      ...(becamePublished && !existing.publishedAt ? { publishedAt: new Date() } : {}),
      ...(Array.isArray(tagIds)
        ? {
            tags: {
              deleteMany: {},
              create: tagIds.map((tagId: string) => ({ tagId })),
            },
          }
        : {}),
    },
  });

  const urlsToPing: string[] = [];
  if (post.status === 'PUBLISHED') {
    urlsToPing.push(postUrl(post.slug));
    if (slugChanged) urlsToPing.push(postUrl(existing.slug));
  }
  if (urlsToPing.length > 0) {
    pingIndexNow(urlsToPing).catch(console.error);
  }

  return NextResponse.json({ post });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if ('error' in guard) return NextResponse.json({ error: guard.error }, { status: guard.status });
  const { id } = await ctx.params;
  await db.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
