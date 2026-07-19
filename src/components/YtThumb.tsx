'use client';

import { useState } from 'react';

/** YouTube küçük görseli: 16:9 maxresdefault; yoksa hqdefault'a düşer. */
export function YtThumb({ id }: { id: string }) {
  const [level, setLevel] = useState<'max' | 'hq'>('max');
  const src = `https://i.ytimg.com/vi/${id}/${level === 'max' ? 'maxresdefault' : 'hqdefault'}.jpg`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={() => setLevel((l) => (l === 'max' ? 'hq' : 'hq'))}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
  );
}
