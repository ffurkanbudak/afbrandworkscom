const X_URL = 'https://x.com/afbrandworks';

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden role="img">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Doğrulanmış hesap" role="img">
      <g fill="currentColor">
        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
      </g>
    </svg>
  );
}

export function XCard() {
  const muted = 'color-mix(in oklab, var(--fg) 60%, transparent)';

  return (
    <a
      href={X_URL}
      target="_blank"
      rel="noreferrer"
      className="group flex w-full min-w-0 flex-col gap-4 rounded-[10px] border p-5 transition hover:-translate-y-0.5"
      style={{
        borderColor: 'var(--border)',
        background: 'color-mix(in oklab, var(--fg) 3%, transparent)',
        color: 'var(--fg)',
      }}
    >
      <div className="flex flex-row items-start justify-between gap-3 tracking-normal">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className="block h-11 w-11 shrink-0 overflow-hidden rounded-full border"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ahmetfurkanbudak.jpeg"
              alt=""
              width={48}
              height={48}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 20%' }}
            />
          </span>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="flex items-center text-[13.5px] leading-[1.25] font-semibold tracking-tight">
              Ahmet Furkan Budak
              <VerifiedIcon className="ml-1 inline h-[13px] w-[13px] shrink-0" />
            </span>
            <span className="truncate text-[12.5px]" style={{ color: muted }}>
              @afbrandworks
            </span>
          </span>
        </div>
        <XIcon className="h-[17px] w-[17px] shrink-0 transition group-hover:scale-105" />
      </div>

      <p className="text-[13.5px] leading-[1.6]" style={{ color: muted, fontWeight: 300 }}>
        Marka, pazarlama ve iletişim üzerine günlük notlarımı X hesabımdan
        paylaşıyorum.
      </p>

      <span
        className="mt-auto inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-[8px] px-4 py-2 text-[13px] font-semibold"
        style={{ background: 'var(--fg)', color: 'var(--bg)' }}
      >
        <XIcon className="h-[12px] w-[12px]" />
        X&apos;te Takip Edin!
      </span>
    </a>
  );
}
