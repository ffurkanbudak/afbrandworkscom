import { PageHeader } from '../../_components/PageHeader';
import { SponsorForm } from '../_components/SponsorForm';

export default function NewSponsorPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Sponsorlar"
        title="Yeni sponsor"
        description="Bitiş tarihinde sistem sponsoru otomatik olarak görünürden kaldırır."
      />
      <SponsorForm mode={{ kind: 'create' }} />
    </div>
  );
}
