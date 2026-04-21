import { PageHeader } from '../_components/PageHeader';
import { requireAdmin } from '../_lib/auth';
import { ProfileForm } from './ProfileForm';

export default async function AdminProfilePage() {
  const admin = await requireAdmin();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Ben"
        title="Profilim"
        description="Panel üst çubuğunda ve yazı imzanda görünecek bilgiler."
      />
      <ProfileForm
        initial={{
          name: admin.name ?? '',
          title: admin.title ?? '',
          bio: admin.bio ?? '',
          avatarUrl: admin.avatarUrl ?? '',
          email: admin.email,
          role: admin.role,
        }}
      />
    </div>
  );
}
