import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ unread: 0 });

  const sub = await db.subscriber.findUnique({
    where: { clerkId: userId },
    select: { id: true, email: true, notificationsReadAt: true },
  });
  if (!sub) return NextResponse.json({ unread: 0 });

  const since = sub.notificationsReadAt ?? new Date(0);

  const [decidedApps, repliedMessages, approvedComments] = await Promise.all([
    db.writerApplication.count({
      where: {
        OR: [{ subscriberId: sub.id }, { email: sub.email }],
        status: { in: ['ACCEPTED', 'REJECTED'] },
        decidedAt: { gt: since },
      },
    }),
    db.contactMessage.count({
      where: {
        OR: [{ subscriberId: sub.id }, { email: sub.email }],
        repliedAt: { gt: since },
      },
    }),
    db.postComment.count({
      where: {
        subscriberId: sub.id,
        status: 'APPROVED',
        updatedAt: { gt: since },
      },
    }),
  ]);

  return NextResponse.json({
    unread: decidedApps + repliedMessages + approvedComments,
    breakdown: {
      applications: decidedApps,
      messages: repliedMessages,
      comments: approvedComments,
    },
  });
}
