const HARD_BLOCK_STEMS = [
  'amk', 'aq', 'aw', 'oç', 'oc',
  'orospu', 'orospç', 'orosp',
  'sikt', 'sikim', 'sikem', 'sikey', 'sikic', 'sikis', 'sikis',
  'sikis', 'siktir', 'siktirgit',
  'göt', 'götver', 'götoğlan', 'gotlek',
  'piç', 'pic', 'piçlik',
  'ibne', 'ibneli',
  'amcık', 'amcik',
  'yarrak', 'yarak', 'yarraklamak',
  'pezevenk', 'pezeven',
  'kahpe',
  'puşt', 'pust',
  'dalyarak',
  'bok', 'boktan',
  'fuck', 'fuk', 'fucking', 'shit', 'bitch', 'asshole',
  'cunt', 'motherfucker', 'dick', 'dipshit',
];

const SOFT_FLAG_STEMS = [
  'salak', 'salaklık', 'aptal', 'aptallık',
  'gerizekalı', 'gerizekali', 'beyinsiz',
  'şerefsiz', 'serefsiz',
  'aşağılık', 'asagilik',
  'hain', 'haysiyetsiz', 'onursuz',
  'köpek',
  'hayvan',
  'rezil',
  'sahtekar', 'sahtekâr',
  'dolandırıcı', 'dolandirici',
  'yalakalık', 'yalaka',
  'idiot', 'moron', 'stupid', 'dumb', 'scam', 'fraud',
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
