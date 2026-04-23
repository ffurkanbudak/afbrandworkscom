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

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function GET() {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const rows = await db.brandStory.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    take: 500,
  });
  return NextResponse.json({ brandStories: rows });
}

export async function POST(req: Request) {
  const g = await guard();
  if ('error' in g) return NextResponse.json({ error: g.error }, { status: g.status });
  const body = await req.json().catch(() => ({}));

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) return NextResponse.json({ error: 'Marka adı gerekli.' }, { status: 400 });

  const slug = (typeof body.slug === 'string' && body.slug.trim()) || slugify(name);
  const existing = await db.brandStory.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: 'Bu slug zaten kullanılıyor.' }, { status: 400 });

  const origin = body.origin === 'LOCAL' ? 'LOCAL' : 'GLOBAL';
  const foundedYear = Number.isFinite(body.foundedYear) ? Number(body.foundedYear) : new Date().getFullYear();

  const story = await db.brandStory.create({
    data: {
      slug,
      name,
      sector: String(body.sector ?? '').trim() || 'Genel',
      foundedYear,
      headquartersCity: body.headquartersCity ? String(body.headquartersCity).trim() : null,
      headquartersCountry: String(body.headquartersCountry ?? '').trim() || 'Türkiye',
      origin,
      logoUrl: body.logoUrl || null,
      coverImageUrl: body.coverImageUrl || null,
      founderImageUrl: body.founderImageUrl || null,
      positioning: String(body.positioning ?? '').trim(),
      foundingStory: String(body.foundingStory ?? '').trim(),
      founderVision: String(body.founderVision ?? '').trim(),
      strategicDecisions: Array.isArray(body.strategicDecisions) ? body.strategicDecisions : [],
      crisesAndTurningPoints: String(body.crisesAndTurningPoints ?? '').trim(),
      currentPosition: String(body.currentPosition ?? '').trim(),
      editorialNote: String(body.editorialNote ?? '').trim(),
      metaTitle: body.metaTitle ? String(body.metaTitle).trim() : null,
      metaDescription: body.metaDescription ? String(body.metaDescription).trim() : null,
      status: ['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'].includes(body.status)
        ? body.status
        : 'DRAFT',
      featured: !!body.featured,
      publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
    },
  });

  return NextResponse.json({ brandStory: story });
}
