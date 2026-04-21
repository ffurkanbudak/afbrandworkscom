import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { PageHeader } from '../../../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../../../_components/Pill';
import { PostForm } from '../../_components/PostForm';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, tags] = await Promise.all([
    db.post.findUnique({
      where: { id },
      include: { tags: true },
    }),
    db.tag.findMany({ orderBy: [{ group: 'asc' }, { order: 'asc' }] }),
  ]);

  if (!post) notFound();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Yazı düzenle"
        title={post.title}
        description={`/${post.slug}`}
        actions={<Pill tone={statusTone(post.status)}>{STATUS_LABEL[post.status] ?? post.status}</Pill>}
      />
      <PostForm
        mode={{ kind: 'edit', postId: post.id }}
        tags={tags.map((t) => ({ id: t.id, labelTr: t.labelTr, group: t.group }))}
        initial={{
          slug: post.slug,
          title: post.title,
          subtitle: post.subtitle ?? '',
          excerpt: post.excerpt,
          contentHtml: post.contentHtml,
          coverImageUrl: post.coverImageUrl ?? '',
          coverImageAlt: post.coverImageAlt ?? '',
          metaTitle: post.metaTitle ?? '',
          metaDescription: post.metaDescription ?? '',
          tagIds: post.tags.map((t) => t.tagId),
          featured: post.featured,
          status: post.status,
          scheduledFor: post.scheduledFor
            ? new Date(post.scheduledFor).toISOString().slice(0, 16)
            : '',
        }}
      />
    </div>
  );
}
