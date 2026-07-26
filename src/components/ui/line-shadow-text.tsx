import { type CSSProperties, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type Etiket = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'section' | 'article';

interface LineShadowTextProps extends HTMLAttributes<HTMLElement> {
  children: string;
  shadowColor?: string;
  as?: Etiket;
}

/**
 * Metnin arkasında çapraz çizgili, akan bir gölge.
 *
 * Efektin tamamı `::after` sözde öğesi ve CSS animasyonuyla üretilir; bu
 * yüzden bileşen istemci tarafında çalışmak zorunda değil. Sunucu bileşeni
 * olarak kalması sayfaya ek JavaScript getirmesini engeller.
 *
 * `children` string olmalı: gölge, metni `data-text` özniteliğinden okur.
 */
export function LineShadowText({
  children,
  shadowColor = 'black',
  className,
  as: Component = 'span',
  ...props
}: LineShadowTextProps) {
  return (
    <Component
      style={{ '--shadow-color': shadowColor } as CSSProperties}
      className={cn(
        'relative z-0 inline-flex',
        'after:absolute after:top-[0.04em] after:left-[0.04em] after:w-full after:content-[attr(data-text)]',
        'after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]',
        'after:-z-10 after:bg-size-[0.06em_0.06em] after:bg-clip-text after:text-transparent',
        'motion-safe:after:animate-line-shadow',
        className,
      )}
      data-text={children}
      {...props}
    >
      {children}
    </Component>
  );
}
