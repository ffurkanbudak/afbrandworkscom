import { PageHeader } from '../../_components/PageHeader';
import { BrandStoryForm } from '../_components/BrandStoryForm';

export default function NewBrandStoryPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Marka Hikayeleri"
        title="Yeni marka"
        description="7 bölümlü hikaye şablonu. Bölüm kelime hedefleri formda görünür."
      />
      <BrandStoryForm mode={{ kind: 'create' }} />
    </div>
  );
}
