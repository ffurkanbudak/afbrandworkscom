import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

async function guard() {
  const { userId } = await auth();
  if (!userId) return { error: 'unauthorized', status: 401 as const };
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return { error: 'forbidden', status: 403 as const };
  return { admin };
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));

  const existing = await db.brandStory.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (typeof body.name === 'string') data.name = body.name.trim();
  if (typeof body.slug === 'string' && body.slug.trim()) data.slug = body.slug.trim();
  if (typeof body.sector === 'string') data.sector = body.sector.trim();
  if (Number.isFinite(body.foundedYear)) data.foundedYear = Number(body.foundedYear);
  if ('headquartersCity' in body) data.headquartersCity = body.headquartersCity || null;
  if (typeof body.headquartersCountry === 'string') data.headquartersCountry = body.headquartersCountry.trim();
  if (body.origin === 'LOCAL' || body.origin === 'GLOBAL') data.origin = body.origin;
  if ('logoUrl' in body) data.logoUrl = body.logoUrl || null;
  if ('coverImageUrl' in body) data.coverImageUrl = body.coverImageUrl || null;
  if ('founderImageUrl' in body) data.founderImageUrl = body.founderImageUrl || null;
  if (typeof body.positioning === 'string') data.positioning = body.positioning.trim();
  if (typeof body.foundingStory === 'string') data.foundingStory = body.foundingStory.trim();
  if (typeof body.founderVision === 'string') data.founderVision = body.founderVision.trim();
  if (Array.isArray(body.strategicDecisions)) data.strategicDecisions = body.strategicDecisions;
  if (typeof body.crisesAndTurningPoints === 'string') data.crisesAndTurningPoints = body.crisesAndTurningPoints.trim();
  if (typeof body.currentPosition === 'string') data.currentPosition = body.currentPosition.trim();
  if (typeof body.editorialNote === 'string') data.editorialNote = body.editorialNote.trim();
  if ('metaTitle' in body) data.metaTitle = body.metaTitle || null;
  if ('metaDescription' in body) data.metaDescription = body.metaDescription || null;
  if (typeof body.featured === 'boolean') data.featured = body.featured;
  if (['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'].includes(body.status)) {
    data.status = body.status;
    if (body.status === 'PUBLISHED' && !existing.publishedAt) {
      data.publishedAt = new Date();
    }
  }

  const updated = await db.brandStory.update({ where: { id }, data });
  return NextResponse.json({ brandStory: updated });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const { id } = await ctx.params;
  const existing = await db.brandStory.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: 'not-found' }, { status: 404 });
  await db.brandStory.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
