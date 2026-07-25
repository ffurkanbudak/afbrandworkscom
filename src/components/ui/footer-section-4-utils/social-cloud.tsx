'use client';

import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden role="img">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

type Social = { label: string; href: string; icon?: LucideIcon };

const SOCIALS: Social[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmetfurkanbudak/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/afbrandworks', icon: Instagram },
  { label: 'X (Twitter)', href: 'https://x.com/afurkanbudakcom', icon: Twitter },
  { label: 'YouTube', href: 'https://www.youtube.com/@ahmetfurkanbudak', icon: Youtube },
  { label: 'Medium', href: 'https://medium.com/@ahmetfurkanbudak' },
];

export function SocialCloud({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center ${className ?? ''}`}>
      {SOCIALS.map((s) => {
        const Icon = s.icon;
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/25 transition hover:bg-white/10"
          >
            {Icon ? (
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <MediumIcon className="h-[18px] w-[18px]" />
            )}
          </a>
        );
      })}
    </div>
  );
}
