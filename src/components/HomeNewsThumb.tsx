'use client';

import { useState } from 'react';
import { Newspaper } from 'lucide-react';

/** Ana sayfa gündem küçük görseli — bozuk/erişilemeyen URL'lerde logoya/placeholder'a düşer. */
export function HomeNewsThumb({ src, logoUrl }: { src: string | null; logoUrl: string | null }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt=""
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className="h-8 w-8 rounded-[6px] opacity-30"
        />
      ) : (
        <Newspaper className="h-8 w-8 opacity-25" strokeWidth={1.25} aria-hidden />
      )}
    </div>
  );
}
