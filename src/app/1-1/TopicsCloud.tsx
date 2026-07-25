'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';

const TOPICS = [
  'Marka stratejisi',
  'Konumlandırma',
  'Fiyatlandırma',
  'Pazarlama',
  'Reklam',
  'Satış süreçleri',
  'Dijital büyüme',
  'Kurumsallaşma',
  'İhracat',
  'Yeni pazarlar',
  'Kurucu kişisel markası',
  'Yönetim kararları',
];

export function TopicsCloud() {
  const areaRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={areaRef} className="mx-auto mt-10 max-w-[760px] px-2">
      <ul className="flex flex-wrap justify-center gap-2.5">
        {TOPICS.map((topic, i) => (
          <motion.li
            key={topic}
            drag
            dragConstraints={areaRef}
            dragElastic={0.25}
            dragTransition={{ bounceStiffness: 380, bounceDamping: 18 }}
            whileHover={{ scale: 1.07, rotate: i % 2 === 0 ? 2.5 : -2.5 }}
            whileDrag={{ scale: 1.12, rotate: i % 2 === 0 ? -3 : 3, zIndex: 30 }}
            transition={{ type: 'spring', stiffness: 320, damping: 16 }}
            className="cursor-grab list-none select-none rounded-[8px] border px-4 py-2 text-[13.5px] text-white active:cursor-grabbing"
            style={{
              borderColor: 'rgba(255,255,255,0.15)',
              background: '#141414',
              fontWeight: 300,
              touchAction: 'none',
            }}
          >
            {topic}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
