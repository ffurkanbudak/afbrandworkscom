import { auth } from '@/lib/admin-auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

function csvCell(value: unknown): string {
  const s = value == null ? '' : String(value);
  if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response('unauthorized', { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return new Response('forbidden', { status: 403 });

  const subs = await db.subscriber.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
  });

  const header = ['E-posta', 'Ad', 'Durum', 'Kaynak', 'Şehir', 'Kayıt Tarihi'];
  const rows = subs.map((s) =>
    [
      s.email,
      s.name ?? '',
      s.status,
      s.source ?? '',
      s.city ?? '',
      s.createdAt.toISOString().slice(0, 10),
    ]
      .map(csvCell)
      .join(','),
  );

  // BOM: Excel'in UTF-8 Türkçe karakterleri doğru göstermesi için
  const csv = '﻿' + [header.map(csvCell).join(','), ...rows].join('\r\n');
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="aboneler-${date}.csv"`,
    },
  });
}
