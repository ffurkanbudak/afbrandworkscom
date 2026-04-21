import { db } from '@/lib/db';
import { resend, FROM_ADDRESS, SITE_URL, renderBroadcastHtml } from '@/lib/email';
import { getRelatedPosts } from '@/lib/related';

export async function triggerPostBroadcast(postId: string, authorId: string) {
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post || post.status !== 'PUBLISHED') return;

  const subscribers = await db.subscriber.findMany({ where: { status: 'CONFIRMED' } });
  if (subscribers.length === 0) return;

  const related = await getRelatedPosts(post.id, 3);
  const postUrl = `${SITE_URL}/posts/${post.slug}`;

  const broadcast = await db.broadcast.create({
    data: {
      subject: post.title,
      previewText: post.excerpt,
      bodyHtml: `<h1 style="font:500 32px/1.1 'Fraunces',Georgia,serif;margin:0 0 8px">${post.title}</h1>
        ${post.subtitle ? `<p style="color:#8B8B8B;margin:0 0 24px">${post.subtitle}</p>` : ''}
        <p>${post.excerpt}</p>
        <p style="margin-top:28px"><a href="${postUrl}" style="color:#ECECEC;border:1px solid #ECECEC;padding:10px 18px;border-radius:999px;text-decoration:none;display:inline-block">Yazıyı oku ↗</a></p>`,
      status: 'SENDING',
      triggerPostId: post.id,
      authorId,
    },
  });

  const BATCH = 80;
  for (let i = 0; i < subscribers.length; i += BATCH) {
    const chunk = subscribers.slice(i, i + BATCH);
    const emails = chunk.map((s) => {
      const unsubscribeUrl = `${SITE_URL}/api/subscribe/unsubscribe?token=${s.unsubscribeToken}`;
      return {
        from: FROM_ADDRESS,
        to: s.email,
        subject: post.title,
        html: renderBroadcastHtml({
          subject: post.title,
          previewText: post.excerpt,
          bodyHtml: `<h1 style="font:500 32px/1.1 'Fraunces',Georgia,serif;margin:0 0 8px">${post.title}</h1>
            ${post.subtitle ? `<p style="color:#8B8B8B;margin:0 0 24px">${post.subtitle}</p>` : ''}
            <p>${post.excerpt}</p>
            <p style="margin-top:28px"><a href="${postUrl}" style="color:#ECECEC;border:1px solid #ECECEC;padding:10px 18px;border-radius:999px;text-decoration:none;display:inline-block">Yazıyı oku ↗</a></p>`,
          unsubscribeUrl,
          related: related.map((r) => ({
            title: r.title,
            url: `${SITE_URL}/posts/${r.slug}`,
            excerpt: r.excerpt,
          })),
        }),
        headers: { 'List-Unsubscribe': `<${unsubscribeUrl}>` },
      };
    });
    const res = await resend.batch.send(emails);
    const data = res.data?.data ?? [];
    await db.broadcastDelivery.createMany({
      data: chunk.map((s, idx) => ({
        broadcastId: broadcast.id,
        subscriberId: s.id,
        providerId: data[idx]?.id ?? null,
        sentAt: new Date(),
      })),
      skipDuplicates: true,
    });
  }

  await db.broadcast.update({
    where: { id: broadcast.id },
    data: { status: 'SENT', sentAt: new Date() },
  });
}
