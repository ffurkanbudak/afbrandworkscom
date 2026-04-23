import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { PageHeader } from '../../_components/PageHeader';
import { BrandStoryForm, type BrandStoryInitial } from '../_components/BrandStoryForm';

type Decision = { title: string; body: string };

function decisionsFromJson(raw: unknown): Decision[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((d): d is Decision =>
      !!d && typeof d === 'object' && typeof (d as Decision).title === 'string' && typeof (d as Decision).body === 'string',
    );
}

export default async function EditBrandStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = await db.brandStory.findUnique({ where: { id } });
  if (!s) notFound();

  const initial: BrandStoryInitial = {
    name: s.name,
    slug: s.slug,
    sector: s.sector,
    foundedYear: s.foundedYear,
    headquartersCity: s.headquartersCity ?? '',
    headquartersCountry: s.headquartersCountry,
    origin: s.origin,
    logoUrl: s.logoUrl ?? '',
    coverImageUrl: s.coverImageUrl ?? '',
    founderImageUrl: s.founderImageUrl ?? '',
    positioning: s.positioning,
    foundingStory: s.foundingStory,
    founderVision: s.founderVision,
    strategicDecisions: decisionsFromJson(s.strategicDecisions),
    crisesAndTurningPoints: s.crisesAndTurningPoints,
    currentPosition: s.currentPosition,
    editorialNote: s.editorialNote,
    metaTitle: s.metaTitle ?? '',
    metaDescription: s.metaDescription ?? '',
    status: s.status,
    featured: s.featured,
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Marka"
        title={s.name}
        description={`${s.sector} · ${s.headquartersCountry} · ${s.foundedYear}`}
      />
      <BrandStoryForm mode={{ kind: 'edit', id: s.id }} initial={initial} />
    </div>
  );
}
