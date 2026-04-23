const HARD_BLOCK_STEMS = [
  'amk', 'aq', 'aw', 'oç',
  'orospu', 'orospç', 'orosp',
  'sikt', 'sikim', 'sikem', 'sikey', 'sikic', 'sikis', 'sikis',
  'göt',
  'piç', 'pic',
  'ibne',
  'amcık', 'amcik',
  'yarrak', 'yarak',
  'pezevenk',
  'fuck', 'fuk', 'shit', 'bitch', 'asshole',
];

const SOFT_FLAG_STEMS = [
  'salak', 'aptal', 'gerizekalı', 'gerizekali',
  'şerefsiz', 'serefsiz',
  'aşağılık', 'asagilik',
  'hain',
  'köpek',
  'idiot', 'moron', 'stupid',
];

export type ScanResult =
  | { status: 'CLEAN' }
  | { status: 'FLAGGED'; terms: string[] }
  | { status: 'BLOCKED'; terms: string[] };

function hits(text: string, stems: string[]): string[] {
  const lowered = text
    .toLocaleLowerCase('tr-TR')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ');
  const words = new Set(lowered.split(/\s+/).filter(Boolean));
  const matched: string[] = [];
  for (const stem of stems) {
    for (const w of words) {
      if (w === stem || w.startsWith(stem) || w.endsWith(stem)) {
        matched.push(stem);
        break;
      }
    }
  }
  return matched;
}

export function scanContent(text: string): ScanResult {
  if (!text || !text.trim()) return { status: 'CLEAN' };
  const blocked = hits(text, HARD_BLOCK_STEMS);
  if (blocked.length) return { status: 'BLOCKED', terms: blocked };
  const flagged = hits(text, SOFT_FLAG_STEMS);
  if (flagged.length) return { status: 'FLAGGED', terms: flagged };
  return { status: 'CLEAN' };
}

export const BLOCK_USER_MESSAGE =
  'İçerikte kurallara aykırı ifade tespit edildi. Lütfen saygılı bir üslupla tekrar yazın.';
