import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getCurrentSubscriber } from '@/lib/subscriber';
import { db } from '@/lib/db';
import { isProfileComplete } from '@/lib/forum-guard';
import { NewPostForm } from '../_components/NewPostForm';

export const metadata: Metadata = {
  title: 'Yeni konu · Forum',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

export default async function NewForumPostPage() {
  const viewer = await getCurrentSubscriber();
  if (!viewer) {
    redirect('/sign-in?redirect_url=/forum/new');
  }

  const tags = await db.forumTag.findMany({
    orderBy: { order: 'asc' },
    select: { slug: true, label: true },
  });

  const profileComplete = isProfileComplete(viewer);
  const notConfirmed = viewer.status !== 'CONFIRMED';

  return (
    <div className="fade-up mx-auto max-w-[720px] pt-8 md:pt-14">
      <Link
        href="/forum"
        className="inline-flex items-center gap-1 text-[12px] font-medium"
        style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
      >
        <ArrowLeft className="h-[12px] w-[12px]" strokeWidth={2} />
        Forum
      </Link>

      <header className="mt-6">
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
        >
          Yeni konu
        </p>
        <h1 className="font-display mt-3 text-[30px] leading-[1.1] tracking-tight md:text-[38px]">
          Markalaşma üzerine bir konu açın.
        </h1>
        <p
          className="mt-4 max-w-[56ch] text-[14.5px] leading-[1.6]"
          style={{ color: 'color-mix(in oklab, var(--fg) 65%, transparent)' }}
        >
          Etiket havuzundan bir etiket seçin, konunuzu ve düşüncelerinizi yazın.
          Paylaşımınız gönderimden bir saat sonra yayına alınır.
        </p>
      </header>

      {notConfirmed ? (
        <div
          className="mt-10 rounded-[12px] border p-6 text-[13.5px] leading-[1.6]"
          style={{
            borderColor: 'color-mix(in oklab, #B45309 40%, transparent)',
            background: 'color-mix(in oklab, #B45309 6%, transparent)',
          }}
        >
          <p className="font-semibold" style={{ color: '#B45309' }}>
            Üyeliğiniz henüz onaylanmamış.
          </p>
          <p
            className="mt-2"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            Yöneticinin aboneliğinizi onaylamasının ardından konu açabilirsiniz.
          </p>
        </div>
      ) : !profileComplete ? (
        <div
          className="mt-10 rounded-[12px] border p-6"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-soft)' }}
        >
          <p className="eyebrow">Önce profilinizi tamamlayın</p>
          <p
            className="mt-2 text-[13.5px] leading-[1.6]"
            style={{ color: 'color-mix(in oklab, var(--fg) 75%, transparent)' }}
          >
            Forumda konu açmak için profil fotoğrafınız ve kısa bir tanıtım
            metniniz olmalı. Anonim katılım bu platformda mümkün değildir.
          </p>
          <Link
            href="/hesap/profil"
            className="mt-5 inline-flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-[13px] font-semibold transition hover:opacity-90"
            style={{ background: 'var(--fg)', color: 'var(--bg)' }}
          >
            Profili tamamla
            <ArrowRight className="h-[13px] w-[13px]" strokeWidth={2.25} />
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <NewPostForm tags={tags} />
        </div>
      )}
    </div>
  );
}
