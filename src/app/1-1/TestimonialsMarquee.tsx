'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Marquee } from '@/components/ui/3d-testimonials';

const TESTIMONIALS = [
  { name: 'Kaan T.', body: 'Markamızın kimliğini yeniden inşa ederken birlikte çalıştık; işine gösterdiği özen gerçekten fark yaratıyor.' },
  { name: 'Emre Y.', body: 'Dijital markalaşma konusunda aldığımız destek, stratejik önceliklerimizi netleştirmemizi sağladı.' },
  { name: 'Sude K.', body: 'Görüşmelerde hep somut ve uygulanabilir çıktılarla ayrıldık. Rastgele tavsiyelerin ötesinde, gerçek bir strateji.' },
  { name: 'Mert D.', body: 'Konumlandırma çalışmasından sonra pazarlama kararlarımızı çok daha net alır olduk.' },
  { name: 'Zeynep A.', body: 'Furkan Bey’le tanıştığımızda işine duyduğu tutku hemen hissediliyordu. Marka kimliğimizi onunla şekillendirdik.' },
  { name: 'Barış S.', body: 'Kurumsal marka mimarimizi yeniden kurarken aldığımız danışmanlık, ekibimize de yön verdi.' },
  { name: 'Elif M.', body: 'Bir araya geldiğimiz her görüşmede markamıza dair bakış açımız derinleşti.' },
] as const;

function TestimonialCard({ name, body }: (typeof TESTIMONIALS)[number]) {
  return (
    <figure
      className="flex h-auto w-[300px] shrink-0 flex-col self-stretch rounded-2xl border sm:w-[360px]"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
    >
      <blockquote
        className="flex-1 p-6 text-[14.5px] leading-[1.6]"
        style={{ color: 'var(--fg)', fontWeight: 300 }}
      >
        &ldquo;{body}&rdquo;
      </blockquote>
      <figcaption
        className="flex items-center gap-3 border-t px-6 py-4"
        style={{ borderColor: 'var(--border)' }}
      >
        <Avatar className="size-9">
          <AvatarFallback
            className="text-[12px] font-semibold"
            style={{
              background: 'color-mix(in oklab, var(--fg) 8%, transparent)',
              color: 'var(--fg)',
            }}
          >
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-[13.5px] font-semibold" style={{ color: 'var(--fg)' }}>
            {name}
          </p>
          <p
            className="text-[12px]"
            style={{ color: 'color-mix(in oklab, var(--fg) 50%, transparent)', fontWeight: 300 }}
          >
            Danışan
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsMarquee() {
  return (
    <div className="relative overflow-hidden">
      <Marquee pauseOnHover repeat={3} className="items-stretch [--duration:60s]" ariaLabel="Danışan yorumları">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </Marquee>

      {/* Kenar solmaları */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />
    </div>
  );
}
