import { db } from '@/lib/db';
import { requireSubscriber } from '@/lib/subscriber';
import { formatDateCaps } from '@/lib/format';
import { MessageForm } from './MessageForm';

export default async function AccountMessagePage() {
  const sub = await requireSubscriber();
  const recent = await db.contactMessage.findMany({
    where: { email: sub.email },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Mesaj</p>
        <h2 className="font-display mt-2 text-[28px] leading-[1.08] tracking-tight">
          Bana yaz
        </h2>
        <p
          className="mt-2 max-w-[58ch] text-[13.5px] leading-[1.55]"
          style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
        >
          Sorunu, fikrini ya da gözüne çarpan bir şeyi doğrudan iletebilirsin. Okur, hak ettiğiyse
          yanıt veririm.
        </p>
      </div>

      <MessageForm
        prefill={{
          name: sub.name ?? [sub.firstName, sub.lastName].filter(Boolean).join(' ') ?? '',
          email: sub.email,
        }}
      />

      {recent.length > 0 && (
        <section>
          <p className="eyebrow">Son mesajların</p>
          <ul className="mt-3 space-y-3">
            {recent.map((m) => (
              <li
                key={m.id}
                className="rounded-2xl border p-4 text-[13px]"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold">{m.topic ?? 'Konu yok'}</span>
                  <span
                    className="shrink-0 text-[11px]"
                    style={{ color: 'color-mix(in oklab, var(--fg) 55%, transparent)' }}
                  >
                    {formatDateCaps(m.createdAt)}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-wrap">{m.message}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
