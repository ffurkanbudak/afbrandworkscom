import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { resend, FROM_ADDRESS } from '@/lib/email';
import { renderDirectMessageEmail } from '@/lib/email-templates';

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const sub = await db.subscriber.findUnique({ where: { id } });
  if (!sub) return NextResponse.json({ error: 'Abone bulunamadı.' }, { status: 404 });

  const { subject, body } = (await req.json()) as { subject?: string; body?: string };
  const trimmedSubject = (subject ?? '').trim();
  const trimmedBody = (body ?? '').trim();
  if (!trimmedSubject || !trimmedBody) {
    return NextResponse.json({ error: 'Konu ve mesaj zorunlu.' }, { status: 400 });
  }
  if (trimmedSubject.length > 200 || trimmedBody.length > 8000) {
    return NextResponse.json({ error: 'Mesaj çok uzun.' }, { status: 400 });
  }

  const rendered = renderDirectMessageEmail({
    firstName: sub.firstName ?? sub.name ?? null,
    subject: trimmedSubject,
    body: trimmedBody,
  });

  const result = await resend.emails
    .send({
      from: FROM_ADDRESS,
      to: sub.email,
      subject: rendered.subject,
      html: rendered.html,
      attachments: rendered.attachments,
    })
    .catch((err) => ({ error: err instanceof Error ? err.message : 'send-failed' } as const));

  if ('error' in result && result.error) {
    return NextResponse.json({ error: String(result.error) }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
