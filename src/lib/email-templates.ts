import { SITE_URL } from './email';
import { CID, inlineEmailAttachments, type InlineAttachment } from './email-assets';

const FONT_SANS =
  "-apple-system,BlinkMacSystemFont,'SF Pro Text','Segoe UI',Helvetica,Arial,sans-serif";
const FONT_DISPLAY =
  "-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Helvetica,Arial,sans-serif";

const INK = '#0A0A0A';
const TEXT = '#1F1F1F';
const MUTED = '#5E5E5E';
const SUBTLE = '#8B8B8B';
const LINE = '#E7E5E4';
const CANVAS = '#F5F5F4';
const CARD = '#FFFFFF';
const ACCENT = '#DC2626';

export type EmailPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  cover?: InlineAttachment;
};

export type RenderedEmail = {
  subject: string;
  html: string;
  attachments: InlineAttachment[];
};

const SOCIAL: Array<{ label: string; href: string; cid: string }> = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmetfurkanbudak/', cid: CID.linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/afbrandworks', cid: CID.instagram },
  { label: 'X', href: 'https://x.com/afurkanbudakcom', cid: CID.twitter },
  { label: 'YouTube', href: 'https://www.youtube.com/@ahmetfurkanbudak', cid: CID.youtube },
  { label: 'Medium', href: 'https://medium.com/@ahmetfurkanbudak', cid: CID.medium },
];

function socialPills(): string {
  return SOCIAL.map(
    (s) =>
      `<a href="${s.href}" title="${s.label}" aria-label="${s.label}" style="display:inline-block;margin:0 2px 0 0;text-decoration:none;width:32px;height:32px;border-radius:6px;line-height:0;vertical-align:middle">
         <img src="cid:${s.cid}" width="15" height="15" alt="${s.label}" style="display:inline-block;border:0;outline:none;width:15px;height:15px;margin:8.5px">
       </a>`,
  ).join('');
}

function socialIcons(): string {
  return `
  <tr><td style="padding:22px 36px 0;line-height:0">
    ${socialPills()}
  </td></tr>`;
}

function header(): string {
  return `
  <tr><td style="padding:40px 40px 0">
    <a href="${SITE_URL}" style="display:inline-block;text-decoration:none">
      <img src="cid:${CID.logo}" width="96" height="96" alt="afbrandworks" style="display:block;border:0;outline:none;width:96px;height:96px">
    </a>
  </td></tr>
  <tr><td style="padding:24px 40px 0">
    <div style="height:1px;background:${LINE};line-height:1px;font-size:0">&nbsp;</div>
  </td></tr>`;
}

function relatedBlock(posts: EmailPost[] | undefined): string {
  if (!posts || posts.length === 0) return '';

  const cards = posts
    .map((p) => {
      const href = `${SITE_URL}/yazi/${p.slug}`;
      const alt = escapeHtml(p.coverImageAlt || p.title);
      const thumb = p.cover
        ? `<img src="cid:${p.cover.inlineContentId}" alt="${alt}" width="64" height="64" style="display:block;width:64px;height:64px;border:0;outline:none;border-radius:8px">`
        : `<div style="width:64px;height:64px;background:${CANVAS};border-radius:8px"></div>`;
      return `
      <tr><td style="padding:14px 0">
        <a href="${href}" style="display:block;text-decoration:none">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="64" valign="middle" style="width:64px;line-height:0">${thumb}</td>
              <td valign="middle" style="padding-left:14px">
                <div style="font:500 14.5px/1.4 ${FONT_DISPLAY};color:${INK};letter-spacing:-0.005em">${escapeHtml(p.title)}</div>
              </td>
            </tr>
          </table>
        </a>
      </td></tr>`;
    })
    .join('');

  return `
  <tr><td style="padding:32px 40px 0">
    <div style="height:1px;background:${LINE};line-height:1px;font-size:0;margin-bottom:18px">&nbsp;</div>
    <div style="font:600 10.5px/1 ${FONT_SANS};letter-spacing:.22em;text-transform:uppercase;color:${SUBTLE};margin-bottom:6px">Son Yazılar</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${cards}
    </table>
  </td></tr>`;
}

function footer(unsubscribeUrl?: string): string {
  const unsub = unsubscribeUrl
    ? `<div style="font:400 12px/1.7 ${FONT_SANS};color:${SUBTLE}">
         Bu e-postayı Afbrandworks bültenine abone olduğun için aldın.
         <a href="${unsubscribeUrl}" style="color:${INK};text-decoration:underline">Aboneliği iptal et</a>.
       </div>`
    : '';
  return `
  <tr><td style="padding:36px 40px 40px">
    <div style="height:1px;background:${LINE};line-height:1px;font-size:0;margin-bottom:20px">&nbsp;</div>
    ${unsub}
  </td></tr>`;
}

function wrap(opts: {
  subject: string;
  previewText?: string;
  inner: string;
  related?: EmailPost[];
  unsubscribeUrl?: string;
}): string {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${opts.subject}</title></head>
<body style="margin:0;background:${CANVAS};color:${INK};-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden">${opts.previewText ?? ''}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CANVAS}">
  <tr><td align="center" style="padding:28px 12px">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:${CARD};border-radius:14px;border:1px solid ${LINE}">
      ${header()}
      ${opts.inner}
      ${socialIcons()}
      ${relatedBlock(opts.related)}
      ${footer(opts.unsubscribeUrl)}
    </table>
  </td></tr>
</table></body></html>`;
}

function buildAttachments(posts?: EmailPost[]): InlineAttachment[] {
  const base = inlineEmailAttachments();
  const covers = posts?.flatMap((p) => (p.cover ? [p.cover] : [])) ?? [];
  return [...base, ...covers];
}

function titleCaseTr(raw: string): string {
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => {
      const first = w.charAt(0).toLocaleUpperCase('tr-TR');
      const rest = w.slice(1).toLocaleLowerCase('tr-TR');
      return first + rest;
    })
    .join(' ');
}

export function renderConfirmEmail(opts: {
  confirmUrl: string;
  unsubscribeUrl: string;
}): RenderedEmail {
  const inner = `
  <tr><td style="padding:40px 40px 0">
    <h1 style="margin:0;font:600 28px/1.15 ${FONT_DISPLAY};color:${INK};letter-spacing:-0.02em">Son bir adım kaldı.</h1>
  </td></tr>
  <tr><td style="padding:18px 40px 0;font:400 15.5px/1.75 ${FONT_SANS};color:${TEXT}">
    <p style="margin:0">
      Afbrandworks bültenine aboneliğini doğrulamak için aşağıdaki düğmeye
      tıkla.
    </p>
  </td></tr>
  <tr><td style="padding:28px 40px 0">
    <a href="${opts.confirmUrl}" style="display:inline-block;background:${INK};color:#FFFFFF;text-decoration:none;font:600 13px/1 ${FONT_SANS};padding:14px 22px;border-radius:999px;letter-spacing:.01em">Aboneliği doğrula</a>
  </td></tr>
  <tr><td style="padding:26px 40px 0;font:400 13px/1.7 ${FONT_SANS};color:${MUTED}">
    Bu e-postayı sen istemediysen göz ardı edebilirsin.
  </td></tr>`;
  return {
    subject: 'Aboneliğini doğrula',
    html: wrap({
      subject: 'Aboneliğini doğrula',
      previewText: 'Afbrandworks bültenine aboneliğini tek tıkla onayla.',
      inner,
      unsubscribeUrl: opts.unsubscribeUrl,
    }),
    attachments: buildAttachments(),
  };
}

export function renderWelcomeEmail(opts: {
  firstName?: string | null;
  unsubscribeUrl: string;
  recentPosts?: EmailPost[];
}): RenderedEmail {
  const raw = (opts.firstName ?? '').trim();
  const name = raw ? titleCaseTr(raw) : '';
  const hello = name ? `Hoş geldin, ${escapeHtml(name)}.` : 'Hoş geldin.';
  const inner = `
  <tr><td style="padding:40px 40px 0">
    <h1 style="margin:0;font:600 30px/1.15 ${FONT_DISPLAY};color:${INK};letter-spacing:-0.02em">${hello}</h1>
  </td></tr>
  <tr><td style="padding:20px 40px 0;font:400 15.5px/1.75 ${FONT_SANS};color:${TEXT}">
    <p style="margin:0 0 14px">
      Marka inşası, strateji ve iletişim üzerine düşündüklerim bundan sonra
      senin gelen kutunda da olacak. Yazıları, etkinlik davetlerini ve zaman
      zaman paylaştığım ek içerikleri buradan takip edebilirsin.
    </p>
    <p style="margin:0">
      Amaç her gün mail göndermek değil; açtığında okumaya değer bulacağın,
      gerçekten faydalı içerikleri seninle paylaşmak.
    </p>
  </td></tr>
  <tr><td style="padding:30px 40px 0">
    <a href="${SITE_URL}" style="display:inline-block;background:${INK};color:#FFFFFF;text-decoration:none;font:600 13px/1 ${FONT_SANS};padding:14px 22px;border-radius:999px;letter-spacing:.01em">Siteyi gez</a>
  </td></tr>
  <tr><td style="padding:28px 40px 0;font:400 13.5px/1.7 ${FONT_SANS};color:${MUTED}">
    Soru ya da önerilerin için bu e-postayı doğrudan yanıtlayabilirsin.
  </td></tr>
  <tr><td style="padding:24px 40px 0;font:400 13.5px/1.7 ${FONT_SANS};color:${MUTED}">
    İlgin için teşekkür ederim.<br>— Ahmet Furkan Budak
  </td></tr>`;
  return {
    subject: 'Hoş geldin — Afbrandworks bülteni',
    html: wrap({
      subject: 'Hoş geldin',
      previewText:
        'Marka inşasından iletişim stratejisine; artık senin gelen kutunda.',
      inner,
      related: opts.recentPosts,
      unsubscribeUrl: opts.unsubscribeUrl,
    }),
    attachments: buildAttachments(opts.recentPosts),
  };
}

export function renderAutoReplyEmail(opts: {
  kind: 'contact' | 'application' | 'sponsorship';
  firstName?: string | null;
  recentPosts?: EmailPost[];
}): RenderedEmail {
  const subject = 'Merhaba, ilginiz için teşekkürler!';
  const preview = 'Form tarafıma ulaştı; 2-3 iş günü içinde dönüş sağlayacağım.';

  const inner = `
  <tr><td style="padding:40px 40px 0">
    <h1 style="margin:0;font:600 30px/1.15 ${FONT_DISPLAY};color:${INK};letter-spacing:-0.02em">Merhaba!</h1>
  </td></tr>
  <tr><td style="padding:22px 40px 0;font:400 15.5px/1.75 ${FONT_SANS};color:${TEXT}">
    <p style="margin:0">
      Form tarafıma ulaştı. Buradaki detayları inceleyeceğim ve
      2-3 iş günü içerisinde tarafınıza geri dönüş sağlayacağım.
    </p>
  </td></tr>
  <tr><td style="padding:18px 40px 0;font:400 15.5px/1.75 ${FONT_SANS};color:${TEXT}">
    <p style="margin:0">İlginiz için teşekkür ederim.</p>
  </td></tr>
  <tr><td style="padding:26px 40px 0;font:400 13.5px/1.7 ${FONT_SANS};color:${MUTED}">
    İyi günler dilerim,<br>Ahmet Furkan Budak
  </td></tr>`;

  return {
    subject,
    html: wrap({
      subject,
      previewText: preview,
      inner,
      related: opts.recentPosts,
    }),
    attachments: buildAttachments(opts.recentPosts),
  };
}

export function renderDirectMessageEmail(opts: {
  firstName?: string | null;
  subject: string;
  body: string;
}): RenderedEmail {
  const raw = (opts.firstName ?? '').trim();
  const name = raw ? titleCaseTr(raw) : '';
  const greeting = name ? `Merhaba ${escapeHtml(name)},` : 'Merhaba,';
  const body = escapeHtml(opts.body).replace(/\n/g, '<br>');

  const inner = `
  <tr><td style="padding:40px 40px 0;font:400 15.5px/1.75 ${FONT_SANS};color:${TEXT}">
    <p style="margin:0 0 16px">${greeting}</p>
    <p style="margin:0">${body}</p>
  </td></tr>
  <tr><td style="padding:28px 40px 0;font:400 13.5px/1.7 ${FONT_SANS};color:${MUTED}">
    İyi günler dilerim,<br>Ahmet Furkan Budak
  </td></tr>`;

  return {
    subject: opts.subject,
    html: wrap({
      subject: opts.subject,
      previewText: opts.body.slice(0, 120),
      inner,
    }),
    attachments: buildAttachments(),
  };
}

const KIND_META: Record<string, { label: string }> = {
  video: { label: 'Yeni video' },
  podcast: { label: 'Yeni podcast bölümü' },
  mail: { label: 'Sizin için bir not' },
  etkinlik: { label: 'Etkinlik daveti' },
  yazi: { label: 'Yeni yazı' },
  duyuru: { label: 'Duyuru' },
};

export function renderAnnouncementEmail(opts: {
  kind: keyof typeof KIND_META;
  title: string;
  intro: string;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  previewText?: string;
  unsubscribeUrl: string;
  recentPosts?: EmailPost[];
}): RenderedEmail {
  const meta = KIND_META[opts.kind] ?? KIND_META.duyuru;
  const intro = escapeHtml(opts.intro).replace(/\n/g, '<br>');
  const title = escapeHtml(opts.title);

  const cta =
    opts.ctaLabel && opts.ctaUrl
      ? `
    <tr><td style="padding:30px 40px 0">
      <a href="${opts.ctaUrl}" style="display:inline-block;background:${INK};color:#FFFFFF;text-decoration:none;font:600 13px/1 ${FONT_SANS};padding:14px 22px;border-radius:999px;letter-spacing:.01em">${escapeHtml(opts.ctaLabel)}</a>
    </td></tr>`
      : '';

  const inner = `
  <tr><td style="padding:34px 40px 0">
    <div style="display:inline-block;font:600 10.5px/1 ${FONT_SANS};letter-spacing:.18em;text-transform:uppercase;color:${ACCENT};background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.22);padding:7px 11px;border-radius:999px">${meta.label}</div>
  </td></tr>
  <tr><td style="padding:20px 40px 0">
    <h1 style="margin:0;font:600 28px/1.18 ${FONT_DISPLAY};color:${INK};letter-spacing:-0.02em">${title}</h1>
  </td></tr>
  <tr><td style="padding:18px 40px 0;font:400 15.5px/1.75 ${FONT_SANS};color:${TEXT}">
    ${intro}
  </td></tr>
  ${cta}
  <tr><td style="padding:28px 40px 0;font:400 13.5px/1.7 ${FONT_SANS};color:${MUTED}">
    İlgin için teşekkür ederim.<br>— Ahmet Furkan Budak
  </td></tr>`;
  return {
    subject: opts.title,
    html: wrap({
      subject: opts.title,
      previewText: opts.previewText ?? opts.intro.slice(0, 120),
      inner,
      related: opts.recentPosts,
      unsubscribeUrl: opts.unsubscribeUrl,
    }),
    attachments: buildAttachments(opts.recentPosts),
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
