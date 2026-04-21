import type { ReactNode } from 'react';

export function DataTable({
  head,
  children,
  empty = 'Kayıt yok.',
  emptyWhen = false,
  colCount = 5,
}: {
  head: ReactNode;
  children: ReactNode;
  empty?: string;
  emptyWhen?: boolean;
  colCount?: number;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead style={{ background: 'color-mix(in oklab, var(--fg) 3.5%, transparent)' }}>
            <tr className="text-left">{head}</tr>
          </thead>
          <tbody>
            {children}
            {emptyWhen && (
              <tr>
                <td
                  colSpan={colCount}
                  className="px-5 py-14 text-center text-[13px]"
                  style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                >
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Th({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={`px-4 py-3 text-[10.5px] font-semibold tracking-[0.18em] uppercase ${className}`}
      style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <td className={`px-4 py-3.5 align-top ${className}`} style={{ borderTop: '1px solid var(--border)' }}>
      {children}
    </td>
  );
}
