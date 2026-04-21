import { db } from '@/lib/db';
import { formatDateShort } from '@/lib/format';
import { BroadcastForm } from './BroadcastForm';

export default async function BroadcastPage() {
  const [broadcasts, confirmedCount] = await Promise.all([
    db.broadcast.findMany({
      orderBy: { createdAt: 'desc' },
      take: 30,
      include: { _count: { select: { deliveries: true } } },
    }),
    db.subscriber.count({ where: { status: 'CONFIRMED' } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-[40px] leading-tight tracking-tight">Yayın</h1>
      <p className="eyebrow mt-2">{confirmedCount} onaylı abone</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">Yeni yayın</p>
          <div className="mt-4">
            <BroadcastForm />
          </div>
        </div>

        <div>
          <p className="eyebrow">Geçmiş yayınlar</p>
          <div className="mt-4 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
            <table className="w-full text-[13px]">
              <thead style={{ background: 'color-mix(in oklab, var(--fg) 4%, transparent)' }}>
                <tr className="text-left">
                  <Th>Konu</Th>
                  <Th>Durum</Th>
                  <Th>Alıcı</Th>
                  <Th>Tarih</Th>
                </tr>
              </thead>
              <tbody>
                {broadcasts.map((b) => (
                  <tr key={b.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <Td>{b.subject}</Td>
                    <Td><span className="eyebrow text-[10px]">{b.status}</span></Td>
                    <Td className="tabular-nums">{b._count.deliveries}</Td>
                    <Td className="tabular-nums">{b.sentAt ? formatDateShort(b.sentAt) : formatDateShort(b.createdAt)}</Td>
                  </tr>
                ))}
                {broadcasts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center opacity-60">
                      Henüz yayın yok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="px-4 py-3 text-[11px] font-medium tracking-[0.18em] uppercase"
      style={{ color: 'var(--muted)' }}
    >
      {children}
    </th>
  );
}
function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
