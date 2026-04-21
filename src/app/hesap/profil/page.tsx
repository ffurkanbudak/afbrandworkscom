import { requireSubscriber } from '@/lib/subscriber';
import { ProfileForm } from './ProfileForm';

export default async function AccountProfilePage() {
  const sub = await requireSubscriber();

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Profil</p>
        <h2 className="font-display mt-2 text-[28px] leading-[1.08] tracking-tight">
          Görünen bilgilerin
        </h2>
        <p
          className="mt-2 max-w-[58ch] text-[13.5px] leading-[1.55]"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Ana sayfadaki topluluk şeridinde ve yorumlarında bu bilgiler görünür. Soyadın yalnızca
          baş harfiyle gösterilir.
        </p>
      </div>
      <ProfileForm
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
  );
}
