import { PageHeader } from '../../_components/PageHeader';
import { SponsorForm } from '../_components/SponsorForm';

const VALID_TIERS = ['DAILY', 'MONTHLY', 'QUARTERLY'] as const;
type Tier = (typeof VALID_TIERS)[number];

export default async function NewSponsorPage({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    website?: string;
    bio?: string;
    tier?: string;
    linkedin?: string;
    instagram?: string;
    x?: string;
    sourceRequestId?: string;
  }>;
}) {
  const sp = await searchParams;
  const tier: Tier = VALID_TIERS.includes(sp.tier as Tier)
    ? (sp.tier as Tier)
    : 'MONTHLY';

  const initial = {
    name: sp.name ?? '',
    logoUrl: '',
    bio: sp.bio ?? '',
    websiteUrl: sp.website ?? '',
    linkedinUrl: sp.linkedin ?? '',
    instagramUrl: sp.instagram ?? '',
    xUrl: sp.x ?? '',
    tier,
    startDate: '',
    endDate: '',
    active: true,
  };

  const prefilled =
    !!(sp.name || sp.website || sp.bio || sp.linkedin || sp.instagram || sp.x);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Sponsorlar"
        title="Yeni sponsor"
        description={
          prefilled
            ? 'Sponsorluk talebinden aktarılan bilgiler ön-dolduruldu. Logo, tarih aralığı ve tier seçimini kontrol edin.'
            : 'Bitiş tarihinde sistem sponsoru otomatik olarak görünürden kaldırır.'
        }
      />
      <SponsorForm mode={{ kind: 'create' }} initial={initial} />
    </div>
  );
}
