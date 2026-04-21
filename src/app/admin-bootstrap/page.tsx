import { redirect } from 'next/navigation';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export default async function AdminBootstrapPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in?redirect_url=/admin-bootstrap');

  const existing = await db.admin.findUnique({ where: { clerkId: userId } });
  if (existing) redirect('/admin');

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    null;

  if (!email) {
    return (
      <div className="mx-auto max-w-[560px] py-24 text-center">
        <h1 className="font-display text-[24px]">E-posta bulunamadı</h1>
        <p className="mt-3 text-[14px]">Clerk hesabına bir e-posta ekleyip tekrar dene.</p>
      </div>
    );
  }

  const byEmail = await db.admin.findUnique({ where: { email } });
  if (byEmail) {
    await db.admin.update({
      where: { id: byEmail.id },
      data: {
        clerkId: userId,
        name:
          byEmail.name ??
          ([user?.firstName, user?.lastName].filter(Boolean).join(' ') || null),
      },
    });
    redirect('/admin');
  }

  const anyAdmin = await db.admin.findFirst();
  if (anyAdmin) {
    return (
      <div className="mx-auto max-w-[560px] py-24 text-center">
        <p className="eyebrow">Yetkisiz</p>
        <h1 className="font-display mt-4 text-[28px] leading-tight tracking-tight">
          Bu hesap yönetici değil.
        </h1>
        <p className="mt-4 text-[15px] leading-[1.6]" style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}>
          Sistemde zaten en az bir yönetici var. Giriş yaptığın hesap admin
          listesinde değil. Farklı bir hesapla giriş yap ya da sistemdeki OWNER
          hesabından seni ekletmesini iste.
        </p>
      </div>
    );
  }

  await db.admin.create({
    data: {
      clerkId: userId,
      email,
      name: [user?.firstName, user?.lastName].filter(Boolean).join(' ') || null,
      role: 'OWNER',
    },
  });

  redirect('/admin');
}
