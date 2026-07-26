'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/**
 * SmoothCursor'ı yalnızca gerçek işaretçisi olan cihazlarda ve hidrasyondan
 * sonra yükler. Statik import edildiğinde animasyon kütüphanesi (~255 KB)
 * dokunmatik cihazlar dahil her sayfanın kritik yoluna giriyordu.
 */
const SmoothCursor = dynamic(
  () => import('@/components/ui/smooth-cursor').then((m) => m.SmoothCursor),
  { ssr: false },
);

const DESKTOP_POINTER_QUERY = '(any-hover: hover) and (any-pointer: fine)';

export function SmoothCursorLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_POINTER_QUERY);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return enabled ? <SmoothCursor /> : null;
}
