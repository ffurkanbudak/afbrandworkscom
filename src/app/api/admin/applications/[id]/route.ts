import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { resend, FROM_ADDRESS, SITE_URL } from '@/lib/email';

const ALLOWED = ['PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED'] as const;
type Status = (typeof ALLOWED)[number];

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const admin = await db.admin.findUnique({ where: { clerkId: userId } });
  if (!admin) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const { status, adminNote, rejectionReason } = body ?? {};

  if (status && !ALLOWED.includes(status)) {
    return NextResponse.json({ error: 'Geçersiz durum.' }, { status: 400 });
  }

  if (status === 'REJECTED' && !String(rejectionReason ?? '').trim()) {
    return NextResponse.json(
      { error: 'Red gerekçesi zorunludur.' },
      { status: 400 }
    );
  }

  const isDecision = status === 'ACCEPTED' || status === 'REJECTED';

  const app = await db.writerApplication.update({
    where: { id },
    data: {
      ...(status ? { status: status as Status } : {}),
      ...(adminNote !== undefined ? { adminNote } : {}),
      ...(status === 'REJECTED'
        ? { rejectionReason: String(rejectionReason).trim() }
        : status === 'ACCEPTED'
          ? { rejectionReason: null }
          : {}),
      ...(status && status !== 'PENDING' ? { reviewedAt: new Date() } : {}),
      ...(isDecision ? { decidedAt: new Date() } : {}),
    },
  });

  if (isDecision && app.email) {
    const accepted = status === 'ACCEPTED';
    const subject = accepted
      ? `Başvurun kabul edildi · ${app.proposedTitle}`
      : `Başvurun hakkında · ${app.proposedTitle}`;
    const intro = accepted
      ? 'Merhaba,<br><br>Gönderdiğin yazar başvurusu kabul edildi. Yakında editöryel süreç için seninle iletişime geçeceğim.'
      : 'Merhaba,<br><br>Gönderdiğin yazar başvurusunu inceledim. Bu kez yayımlamamaya karar verdim. Aşağıda gerekçemi bulabilirsin.';
    const reasonBlock =
      !accepted && app.rejectionReason
        ? `<blockquote style="margin:16px 0;padding:12px 16px;border-left:2px solid #DC2626;background:rgba(220,38,38,0.06);font:400 14px/1.55 system-ui,sans-serif;color:#ECECEC;white-space:pre-wrap">${escapeHtml(app.rejectionReason)}</blockquote>`
        : '';
    const closing = accepted
      ? `<p>Sevgiler,<br>Ahmet Furkan Budak</p>`
      : `<p>Tekrar yazmak istersen kapı her zaman açık.<br><br>Sevgiler,<br>Ahmet Furkan Budak</p>`;

    await resend.emails
      .send({
        from: FROM_ADDRESS,
        to: app.email,
        subject,
        html: `<div style="font:400 15px/1.65 system-ui,sans-serif;color:#ECECEC;background:#0A0A0A;padding:32px">
          <p>${intro}</p>
          ${reasonBlock}
          <p><a href="${SITE_URL}/hesap/yazar-basvurusu" style="color:#ECECEC;text-decoration:underline">Başvurunun durumunu hesabından da görebilirsin.</a></p>
          ${closing}
        </div>`,
      })
      .catch(() => null);
  }

  return NextResponse.json({ application: app });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
