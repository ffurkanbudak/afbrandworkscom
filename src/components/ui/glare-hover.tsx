import { cn } from '@/lib/utils';

interface GlareHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Parlama rengi (gradyanın merkezi) */
  color?: string;
  /** Süpürme süresi (ms) */
  duration?: number;
  children: React.ReactNode;
}

export function GlareHover({
  className,
  color = 'rgba(255,255,255,0.3)',
  duration = 700,
  children,
  ...props
}: GlareHoverProps) {
  return (
    <div className={cn('glare-hover relative', className)} {...props}>
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        <div
          className="glare-sheen absolute inset-0"
          style={
            {
              '--glare-color': color,
              '--glare-duration': `${duration}ms`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
