'use client';

import { Instagram, Linkedin, Mail, Twitter, Youtube } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Dock, DockIcon } from '@/components/ui/dock';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden role="img">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.765.462 3.489 1.34 5.007L2 22l5.11-1.34A9.96 9.96 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.2a8.19 8.19 0 0 1-4.174-1.14l-.299-.177-3.03.795.81-2.955-.195-.303A8.2 8.2 0 1 1 12.004 20.2z" />
    </svg>
  );
}

type DockLink = {
  label: string;
  href: string;
  icon?: LucideIcon;
};

const LINKS: DockLink[] = [
  { label: 'WhatsApp', href: '' }, // href, bileşene prop olarak gelir
  { label: 'E-posta', href: 'mailto:info@toganworks.com', icon: Mail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmetfurkanbudak/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/afbrandworks', icon: Instagram },
  { label: 'X (Twitter)', href: 'https://x.com/afurkanbudakcom', icon: Twitter },
  { label: 'YouTube', href: 'https://www.youtube.com/@ahmetfurkanbudak', icon: Youtube },
];

export function HeroDock({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <Dock
      className="border-white/15 bg-white/5"
      iconSize={40}
      iconMagnification={56}
      iconDistance={120}
    >
      {LINKS.map((l) => {
        const href = l.label === 'WhatsApp' ? whatsappUrl : l.href;
        const Icon = l.icon;
        return (
          <DockIcon key={l.label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={l.label}
              title={l.label}
              className="text-white/85 transition-colors hover:text-white"
            >
              {Icon ? (
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <WhatsAppIcon className="h-5 w-5" />
              )}
            </a>
          </DockIcon>
        );
      })}
    </Dock>
  );
}
