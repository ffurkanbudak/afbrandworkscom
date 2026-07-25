import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { db } from '@/lib/db';

/**
 * Basit, kendi kendine yeten admin kimlik doğrulama.
 * Clerk yerine: e-posta + şifre (ortam değişkenlerinden) → imzalı oturum çerezi.
 * `auth()` ve `currentUser()` Clerk ile aynı imzaya sahiptir; rotalar değişmeden çalışır.
 */

export const COOKIE_NAME = 'afb_admin';
export const ADMIN_USER_ID = 'afb-admin'; // Admin.clerkId bu değerle eşleşir
const MAX_AGE = 60 * 60 * 24 * 30; // 30 gün (saniye)

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'degistir-bu-gizli-anahtari'
  );
}

export function adminEmail(): string {
  return (process.env.ADMIN_EMAIL || 'ffurkanbudak@gmail.com').trim().toLowerCase();
}

function sign(value: string): string {
  return createHmac('sha256', secret()).update(value).digest('hex');
}

export function createSessionToken(): string {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = `${ADMIN_USER_ID}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [uid, exp, sig] = parts;
  const expected = sign(`${uid}.${exp}`);
  try {
    if (sig.length !== expected.length) return false;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  if (uid !== ADMIN_USER_ID) return false;
  if (!Number(exp) || Number(exp) < Date.now()) return false;
  return true;
}

export function verifyCredentials(email: string, password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  const okEmail = (email ?? '').trim().toLowerCase() === adminEmail();
  let okPass = false;
  try {
    const a = Buffer.from(password ?? '');
    const b = Buffer.from(expected);
    okPass = a.length === b.length && timingSafeEqual(a, b);
  } catch {
    okPass = false;
  }
  return okEmail && okPass;
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE,
};

/** Clerk uyumlu shim. */
export async function auth(): Promise<{ userId: string | null }> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return { userId: verifySessionToken(token) ? ADMIN_USER_ID : null };
}

/** Clerk uyumlu shim. */
export async function currentUser() {
  const { userId } = await auth();
  if (!userId) return null;
  const email = adminEmail();
  return {
    id: ADMIN_USER_ID,
    primaryEmailAddressId: 'primary',
    primaryEmailAddress: { id: 'primary', emailAddress: email },
    emailAddresses: [{ id: 'primary', emailAddress: email }],
    firstName: null as string | null,
    lastName: null as string | null,
    imageUrl: null as string | null,
  };
}

/** Sayfalar için: oturum yoksa /admin-login'e yönlendirir, varsa Admin kaydını döndürür. */
export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) redirect('/admin-login');

  const existing = await db.admin.findUnique({ where: { clerkId: ADMIN_USER_ID } });
  if (existing) return existing;

  // Oturum geçerli olduğu hâlde Admin kaydı yoksa panele hiç girilemez.
  // Kimlik doğrulaması geçildiği için kaydı ilk girişte oluştururuz.
  const email = adminEmail();
  const byEmail = await db.admin.findUnique({ where: { email } });
  if (byEmail) {
    return db.admin.update({
      where: { id: byEmail.id },
      data: { clerkId: ADMIN_USER_ID },
    });
  }

  return db.admin.create({
    data: {
      clerkId: ADMIN_USER_ID,
      email,
      name: 'Ahmet Furkan Budak',
      role: 'OWNER',
    },
  });
}
