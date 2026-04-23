import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { PageHeader } from '../../_components/PageHeader';
import { SponsorForm } from '../_components/SponsorForm';

function dateInput(d: Date | null | undefined): string {
  if (!d) return '';
  return d.toISOString().slice(0, 10);
}

export default async function EditSponsorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const s = await db.sponsor.findUnique({ where: { id } });
  if (!s) notFound();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Sponsor"
        title={s.name}
        description="Tarih aralığı ve logo güncellenebilir."
      />
      <SponsorForm
        mode={{ kind: 'edit', id: s.id }}
        initial={{
          name: s.name,
          logoUrl: s.logoUrl ?? '',
          bio: s.bio ?? '',
          websiteUrl: s.websiteUrl ?? '',
          linkedinUrl: s.linkedinUrl ?? '',
          instagramUrl: s.instagramUrl ?? '',
          xUrl: s.xUrl ?? '',
          tier: s.tier,
          startDate: dateInput(s.startDate),
          endDate: dateInput(s.endDate),
          active: s.active,
        }}
      />
    </div>
  );
}
