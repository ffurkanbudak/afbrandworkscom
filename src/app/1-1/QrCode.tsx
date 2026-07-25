'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export function QrCode({ value, size = 200 }: { value: string; size?: number }) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, {
      width: size * 2,
      margin: 1,
      color: { dark: '#000000', light: '#FFFFFF' },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white p-3"
      style={{ borderColor: 'var(--border)', width: size, height: size }}
    >
      {dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={dataUrl} alt="WhatsApp QR kodu" width={size - 24} height={size - 24} />
      ) : (
        <div className="h-full w-full animate-pulse rounded-lg bg-neutral-100" />
      )}
    </div>
  );
}
