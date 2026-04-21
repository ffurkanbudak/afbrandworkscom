import { db } from '@/lib/db';
import { requireAdmin } from './_lib/auth';
import { Sidebar } from './_components/Sidebar';
import { TopBar } from './_components/TopBar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  const [applications, sponsorships, messages, postComments, newsComments, news] = await Promise.all([
    db.writerApplication.count({ where: { status: 'PENDING' } }),
    db.sponsorshipRequest.count({ where: { status: 'PENDING' } }),
    db.contactMessage.count({ where: { status: 'UNREAD' } }),
    db.postComment.count({ where: { status: 'PENDING' } }),
    db.newsComment.count({ where: { status: 'PENDING' } }),
    db.newsItem.count({ where: { status: { in: ['DRAFT', 'PENDING_REVIEW'] } } }),
  ]);
  const comments = postComments + newsComments;

  return (
    <div
      className="grid min-h-dvh w-full md:grid-cols-[240px_1fr]"
      style={{ background: 'var(--bg)' }}
    >
      <div
        className="hidden md:block"
        style={{ borderRight: '1px solid var(--border)' }}
      >
        <Sidebar counts={{ applications, sponsorships, messages, comments, news }} />
      </div>
      <div className="flex min-w-0 flex-col">
        <TopBar
          admin={{
            name: admin.name,
            email: admin.email,
            avatarUrl: admin.avatarUrl,
            title: admin.title,
            role: admin.role,
          }}
          inboxCount={applications + sponsorships + messages + comments + news}
        />
        <main className="min-w-0 flex-1 px-6 py-10 md:px-10 md:py-12">
          <div className="mx-auto w-full max-w-[1180px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
