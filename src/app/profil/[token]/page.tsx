import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { formatDateCaps } from '@/lib/format';
import { TIER_DESCRIPTION, TIER_LABEL, nextTier, tierProgress } from '@/app/admin/_lib/tier';
import { ProfileForm } from './ProfileForm';

export const metadata = {
  title: 'Profil · Ahmet Furkan Budak',
};

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const sub = await db.subscriber.findUnique({
    where: { unsubscribeToken: token },
  });
  if (!sub) notFound();

  const prog = tierProgress(sub.activityScore, sub.tier);
  const next = nextTier(sub.tier);

  return (
    <div className="fade-up mx-auto max-w-[720px] py-16 md:py-24">
      <p className="eyebrow">Profil</p>
      <h1 className="font-display mt-3 text-[36px] leading-[1.05] tracking-tight md:text-[44px]">
        Merhaba{sub.firstName || sub.name ? `, ${sub.firstName ?? sub.name}` : ''}.
      </h1>
      <p
        className="mt-4 max-w-[56ch] text-[15px] leading-[1.6]"
        style={{ color: 'color-mix(in oklab, var(--fg) 62%, transparent)' }}
      >
        Topluluk sayfasında görünen bilgilerini buradan yönetebilirsin. Soyadın güvenlik için
        yalnızca baş harfiyle gösterilir, fotoğrafın ve isteğe bağlı kısa tanıtımın eklenir.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
          <p className="eyebrow">Kademe</p>
          <p className="font-display mt-3 text-[26px] leading-none tracking-tight">
            {TIER_LABEL[sub.tier]}
          </p>
          <p className="mt-2 text-[12.5px]" style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>
            {TIER_DESCRIPTION[sub.tier]}
          </p>
          <div
            className="mt-4 h-[4px] w-full overflow-hidden rounded-full"
            style={{ background: 'color-mix(in oklab, var(--fg) 8%, transparent)' }}
          >
            <div className="h-full" style={{ width: `${prog.pct}%`, background: 'var(--fg)' }} />
          </div>
          <p
            className="mt-2 text-[11.5px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
          >
            {next
              ? `${TIER_LABEL[next]} kademesine ${prog.toNext} aktivite`
              : 'En üst kademedesin.'}
          </p>
        </div>

        <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)' }}>
          <p className="eyebrow">Hesap</p>
          <dl className="mt-4 space-y-2 text-[12.5px]">
            <Row label="E-posta" value={sub.email} />
            <Row label="Katılım" value={formatDateCaps(sub.createdAt)} />
            <Row
              label="Son aktivite"
              value={sub.lastActiveAt ? formatDateCaps(sub.lastActiveAt) : '·'}
            />
            <Row label="Aktivite puanı" value={sub.activityScore.toString()} />
          </dl>
        </div>
      </div>

      <div className="mt-10">
        <ProfileForm
          token={token}
          initial={{
            firstName: sub.firstName ?? sub.name?.split(' ')[0] ?? '',
            lastName: sub.lastName ?? sub.name?.split(' ').slice(1).join(' ') ?? '',
            avatarUrl: sub.avatarUrl ?? '',
            bio: sub.bio ?? '',
            city: sub.city ?? '',
            country: sub.country ?? '',
            showInCommunity: sub.showInCommunity,
          }}
        />
      </div>

      <div
        className="mt-12 rounded-2xl border p-5 text-[12.5px]"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="eyebrow">Ayrılmak istiyorsan</p>
        <p className="mt-2" style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}>
          E-posta listesinden çıkmak için şu bağlantıyı kullan.
        </p>
        <Link
          href={`/api/subscribe/unsubscribe?token=${token}`}
          className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold"
          style={{ color: '#DC2626' }}
        >
          Aboneliği iptal et
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}>{label}</dt>
      <dd className="min-w-0 truncate text-right font-medium">{value}</dd>
    </div>
  );
}
