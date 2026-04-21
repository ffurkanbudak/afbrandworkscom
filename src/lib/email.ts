import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'Ahmet Furkan Budak <merhaba@afbrandworks.com>';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afbrandworks.com';

export function renderBroadcastHtml(opts: {
  subject: string;
  previewText?: string;
  bodyHtml: string;
  unsubscribeUrl: string;
  related?: Array<{ title: string; url: string; excerpt: string }>;
}): string {
  const related = opts.related?.length
    ? `
      <tr><td style="padding:32px 40px 0">
        <div style="font:500 11px/1.4 'Geist',system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#8B8B8B">İlgili Yazılar</div>
        ${opts.related
          .map(
            (r) => `
          <a href="${r.url}" style="display:block;margin-top:18px;text-decoration:none;border-top:1px solid #1F1F1F;padding-top:16px">
            <div style="font:400 20px/1.25 'Fraunces',Georgia,serif;color:#ECECEC">${r.title}</div>
            <div style="font:400 14px/1.5 'Geist',system-ui,sans-serif;color:#8B8B8B;margin-top:6px">${r.excerpt}</div>
          </a>`
          )
          .join('')}
      </td></tr>`
    : '';

  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${opts.subject}</title></head>
<body style="margin:0;background:#0A0A0A;color:#ECECEC">
<div style="display:none;max-height:0;overflow:hidden">${opts.previewText ?? ''}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px">
      <tr><td style="padding:40px 40px 0">
        <div style="font:500 11px/1.4 'Geist',system-ui,sans-serif;letter-spacing:.28em;text-transform:uppercase;color:#8B8B8B">AHMET FURKAN BUDAK · YAZI</div>
      </td></tr>
      <tr><td style="padding:24px 40px 0;font:400 16px/1.75 'Geist',system-ui,sans-serif;color:#ECECEC">
        ${opts.bodyHtml}
      </td></tr>
      ${related}
      <tr><td style="padding:48px 40px 40px;border-top:1px solid #1F1F1F;margin-top:32px">
        <div style="font:400 12px/1.6 'Geist',system-ui,sans-serif;color:#6B6B6B">
          Bu e-postayı ${SITE_URL} abonelik listesinde olduğunuz için aldınız.
          <a href="${opts.unsubscribeUrl}" style="color:#ECECEC;text-decoration:underline">Aboneliği iptal et</a>.
        </div>
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;
}
