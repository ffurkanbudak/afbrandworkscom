import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) redirect('/');
  return admin;
}
