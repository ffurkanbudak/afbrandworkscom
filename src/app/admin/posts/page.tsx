import Link from 'next/link';
import { Plus, Pencil, Eye } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { PageHeader } from '../_components/PageHeader';
import { Pill, statusTone, STATUS_LABEL } from '../_components/Pill';
import { DataTable, Th, Td } from '../_components/DataTable';

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { tags: { include: { tag: true } } },
  });

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="İçerik"
        title="Yazılar"
        description={`${posts.length} kayıt. Buradan yayımla, düzenle veya arşivle.`}
        actions={
          <Link
            href="/admin/posts/new"
            className="btn-dark inline-flex items-center gap-1.5 rounded-[6px] px-3.5 py-2 text-[13px] font-medium"
          >
            <Plus className="h-[14px] w-[14px]" strokeWidth={2.25} />
            Yeni yazı
          </Link>
        }
      />

      <DataTable
        colCount={6}
        emptyWhen={posts.length === 0}
        empty="Henüz yazı yok. Sağ üstten yeni yazı ekle."
        head={
          <>
            <Th>Başlık</Th>
            <Th>Durum</Th>
            <Th>Etiketler</Th>
            <Th className="text-right">Okuma</Th>
            <Th>Yayın</Th>
            <Th className="text-right">İşlem</Th>
          </>
        }
      >
        {posts.map((p) => (
          <tr key={p.id}>
            <Td>
              <div className="font-medium">{p.title}</div>
              <div
                className="mt-0.5 truncate text-[11.5px]"
                style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
              >
                /{p.slug} · {formatDateCaps(p.updatedAt)}
              </div>
            </Td>
            <Td>
              <div className="flex flex-wrap gap-1.5">
                <Pill tone={statusTone(p.status)}>{STATUS_LABEL[p.status] ?? p.status}</Pill>
                {p.featured && <Pill tone="accent">Öne çıkan</Pill>}
              </div>
            </Td>
            <Td>
              <span className="text-[12px]" style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}>
                {p.tags.map((t) => t.tag.labelTr).join(', ') || '·'}
              </span>
            </Td>
            <Td className="tabular-nums text-right">{p.viewCount}</Td>
            <Td className="tabular-nums">
              {p.publishedAt ? formatDateCaps(p.publishedAt) : '·'}
            </Td>
            <Td className="text-right">
              <div className="inline-flex items-center gap-1">
                <Link
                  href={`/posts/${p.slug}`}
                  target="_blank"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] transition hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
                  aria-label="Görüntüle"
                  style={{ color: 'color-mix(in oklab, var(--fg) 70%, transparent)' }}
                >
                  <Eye className="h-[14px] w-[14px]" strokeWidth={1.75} />
                </Link>
                <Link
                  href={`/admin/posts/${p.id}/edit`}
                  className="inline-flex items-center gap-1 rounded-[6px] border px-2.5 py-1.5 text-[12px] font-medium transition hover:bg-[color-mix(in_oklab,var(--fg)_5%,transparent)]"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Pencil className="h-[12px] w-[12px]" strokeWidth={2} />
                  Düzenle
                </Link>
              </div>
            </Td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
