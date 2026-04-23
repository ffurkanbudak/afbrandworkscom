export function truncateHtmlByPercent(
  html: string,
  percent: number,
): { truncated: string; wasCut: boolean } {
  if (!html || percent >= 100 || percent <= 0) {
    return { truncated: html, wasCut: false };
  }

  const parts = html.split(/(<\/p>)/i);
  const paragraphs: string[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    const content = parts[i] ?? '';
    const closer = parts[i + 1] ?? '';
    const pair = content + closer;
    if (pair.trim()) paragraphs.push(pair);
  }

  if (paragraphs.length <= 2) {
    return { truncated: html, wasCut: false };
  }

  const plainLen = (s: string) => s.replace(/<[^>]*>/g, '').length;
  const total = paragraphs.reduce((n, p) => n + plainLen(p), 0);
  if (total === 0) return { truncated: html, wasCut: false };

  const target = Math.ceil((total * percent) / 100);
  let acc = 0;
  const kept: string[] = [];
  for (const p of paragraphs) {
    kept.push(p);
    acc += plainLen(p);
    if (acc >= target) break;
  }

  if (kept.length === paragraphs.length) {
    return { truncated: html, wasCut: false };
  }

  return { truncated: kept.join(''), wasCut: true };
}
