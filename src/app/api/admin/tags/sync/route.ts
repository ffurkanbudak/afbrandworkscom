import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/admin-auth';
import { db } from '@/lib/db';
import { TAXONOMY } from '@/lib/tags';

/**
 * Etiket taksonomisini kaynak dosyadan veritabanına aktarır.
 *
 * Etiket adları src/lib/tags.ts içinde tanımlı, ancak bu tanımı üretim
 * veritabanına taşıyan bir yol yoktu; tohum betiği yalnızca yerelde
 * çalıştırılabiliyordu. Bu uç, kaynak listedeki ad, etiket grubu ve sıralamayı
 * mevcut kayıtlara uygular.
 *
 * Dışarıdan veri almaz; yalnızca depodaki listeyi uygular. Slug anahtar olduğu
 * için mevcut yazı ilişkileri korunur.
 */
export const dynamic = 'force-dynamic';

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const degisenler: { slug: string; onceki: string; sonraki: string }[] = [];

  for (const [i, entry] of TAXONOMY.entries()) {
    const mevcut = await db.tag.findUnique({ where: { slug: entry.slug }, select: { labelTr: true } });
    if (mevcut && mevcut.labelTr !== entry.labelTr) {
      degisenler.push({ slug: entry.slug, onceki: mevcut.labelTr, sonraki: entry.labelTr });
    }
    await db.tag.upsert({
      where: { slug: entry.slug },
      update: { labelTr: entry.labelTr, labelEn: entry.labelEn, group: entry.group, order: i },
      create: { ...entry, order: i },
    });
  }

  revalidatePath('/');
  revalidatePath('/posts');
  // Etiket adı bütün yazı sayfalarında görünür; dinamik segmentin tamamı tazelenir.
  revalidatePath('/posts/[slug]', 'page');

  return NextResponse.json({ ok: true, toplam: TAXONOMY.length, degisenler });
}
