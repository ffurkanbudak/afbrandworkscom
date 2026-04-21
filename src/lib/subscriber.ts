import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function getCurrentSubscriber() {
  const { userId } = await auth();
  if (!userId) return null;

  const byClerk = await db.subscriber.findUnique({ where: { clerkId: userId } });
  if (byClerk) return byClerk;

  const user = await currentUser();
  if (!user) return null;

  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    null;
  if (!primaryEmail) return null;

  const email = primaryEmail.toLowerCase();
  const firstName = user.firstName?.trim() || null;
  const lastName = user.lastName?.trim() || null;
  const composedName = [firstName, lastName].filter(Boolean).join(' ') || null;
  const avatarUrl = user.imageUrl ?? null;

  return db.subscriber.upsert({
    where: { email },
    update: {
      clerkId: userId,
      lastActiveAt: new Date(),
    },
    create: {
      clerkId: userId,
      email,
      firstName,
      lastName,
      name: composedName,
      avatarUrl,
      status: 'CONFIRMED',
      confirmedAt: new Date(),
      lastActiveAt: new Date(),
      source: 'clerk',
    },
  });
}

export async function requireSubscriber() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const sub = await getCurrentSubscriber();
  if (!sub) redirect('/sign-in');
  return sub;
}
