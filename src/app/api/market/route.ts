import { NextResponse } from 'next/server';

const SYMBOLS: { s: string; label: string }[] = [
  { s: 'XU100.IS', label: 'BIST 100' },
  { s: 'XBANK.IS', label: 'BIST Bank' },
  { s: 'TRY=X', label: 'USD/TRY' },
  { s: 'EURTRY=X', label: 'EUR/TRY' },
  { s: 'GC=F', label: 'Altın Ons' },
  { s: '^IXIC', label: 'NASDAQ' },
  { s: '^NDX', label: 'NASDAQ 100' },
  { s: '^GSPC', label: 'S&P 500' },
  { s: '^DJI', label: 'Dow Jones' },
  { s: 'BTC-USD', label: 'BITCOIN' },
];

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

type Tick = {
  symbol: string;
  label: string;
  price: number;
  change: number;
  changePct: number;
};

type Session = { cookie: string; crumb: string; expiresAt: number };

let cachedSession: Session | null = null;
let cachedTicks: { ticks: Tick[]; updatedAt: number } | null = null;

async function getSession(): Promise<Session | null> {
  if (cachedSession && cachedSession.expiresAt > Date.now()) return cachedSession;

  try {
    const bootstrap = await fetch('https://fc.yahoo.com/', {
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml' },
      redirect: 'manual',
      cache: 'no-store',
    });

    const setCookies = bootstrap.headers.getSetCookie?.() ?? [];
    const cookie = setCookies
      .map((c) => c.split(';')[0])
      .filter(Boolean)
      .join('; ');

    if (!cookie) {
      console.warn('[market] no cookie from fc.yahoo.com', bootstrap.status);
      return null;
    }

    const crumbRes = await fetch('https://query2.finance.yahoo.com/v1/test/getcrumb', {
      headers: { 'User-Agent': UA, Cookie: cookie, Accept: 'text/plain' },
      cache: 'no-store',
    });
    if (!crumbRes.ok) {
      console.warn('[market] crumb non-ok', crumbRes.status);
      return null;
    }
    const crumb = (await crumbRes.text()).trim();
    if (!crumb) return null;

    cachedSession = { cookie, crumb, expiresAt: Date.now() + 6 * 60 * 60 * 1000 };
    return cachedSession;
  } catch (err) {
    console.warn('[market] session bootstrap failed', err);
    return null;
  }
}

async function fetchOne(
  { s, label }: { s: string; label: string },
  session: Session,
): Promise<Tick | null> {
  try {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s)}?interval=1d&range=5d&crumb=${encodeURIComponent(session.crumb)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        Cookie: session.cookie,
        Accept: 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) cachedSession = null;
      console.warn('[market] upstream non-ok', s, res.status);
      return null;
    }
    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta) return null;
    const price = meta.regularMarketPrice;
    const prev = meta.chartPreviousClose ?? meta.previousClose;
    if (typeof price !== 'number' || typeof prev !== 'number' || prev === 0) return null;
    const change = price - prev;
    const changePct = (change / prev) * 100;
    return { symbol: s, label, price, change, changePct };
  } catch (err) {
    console.warn('[market] fetch failed', s, err);
    return null;
  }
}

export async function GET() {
  const now = Date.now();
  if (cachedTicks && now - cachedTicks.updatedAt < 60_000) {
    return NextResponse.json(cachedTicks, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      cachedTicks ?? { ticks: [], updatedAt: now },
      { headers: { 'Cache-Control': 'public, s-maxage=30' } },
    );
  }

  const results = await Promise.all(SYMBOLS.map((sym) => fetchOne(sym, session)));
  const ticks = results.filter((t): t is Tick => t !== null);

  if (ticks.length > 0) cachedTicks = { ticks, updatedAt: now };

  return NextResponse.json(cachedTicks ?? { ticks, updatedAt: now }, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
