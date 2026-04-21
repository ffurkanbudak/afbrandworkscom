import { db } from '@/lib/db';
import { PageHeader } from '../../_components/PageHeader';
import { PostForm } from '../_components/PostForm';

export default async function NewPostPage() {
  const tags = await db.tag.findMany({ orderBy: [{ group: 'asc' }, { order: 'asc' }] });
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="İçerik"
        title="Yeni Yazı"
        description="Yayın, taslak ya da zamanlanmış gönderi. Yayına aldığında onaylı abonelere bildirim e-postası otomatik çıkar."
      />
      <PostForm
        mode={{ kind: 'create' }}
        tags={tags.map((t) => ({ id: t.id, labelTr: t.labelTr, group: t.group }))}
      />
    </div>
  );
}
