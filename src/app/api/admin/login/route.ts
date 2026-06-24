import { NextResponse } from 'next/server';
import { verifyCredentials, createSessionToken, COOKIE_NAME, COOKIE_OPTIONS } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!verifyCredentials(email ?? '', password ?? '')) {
    return NextResponse.json({ error: 'invalid-credentials' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, createSessionToken(), COOKIE_OPTIONS);
  return res;
}
