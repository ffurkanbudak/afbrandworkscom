import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

function clear() {
  const res = NextResponse.redirect(
    new URL('/admin-login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  );
  res.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
  return res;
}

export async function GET() {
  return clear();
}

export async function POST() {
  return clear();
}
