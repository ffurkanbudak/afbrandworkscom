import Image from 'next/image';
import { TextAnimate } from '@/components/ui/text-animate';
import { AvatarCircles } from '@/components/ui/avatar-circles';
import { HeroDock } from './HeroDock';
import { SectionEtiket } from '@/components/SectionEtiket';
import { KART_STILI } from './kartStili';

const WHATSAPP_MESSAGE = 'Merhaba Ahmet Bey, 1:1 Marka Danışmanlığı hakkında bilgi almak istiyorum.';
export const WHATSAPP_URL = `https://wa.me/905374349566?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/**
 * Marka Masası açılış bölümü. Hem /1-1 sayfasında hem ana sayfada kullanılır;
 * `KART_STILI` sayesinde her kapsayıcıda footer kartıyla aynı çerçevede ortalanır.
 */
export function MarkaMasasiHero({
  headingAs = 'h1',
  gorselBaslik = false,
}: {
  headingAs?: 'h1' | 'h2';
  /** true: "Marka Masası" yazısı yerine şeffaf zeminli başlık görseli gösterilir. */
  gorselBaslik?: boolean;
}) {
  const Heading = headingAs;
  return (
    <section
      id="marka-masasi"
      style={{ ...KART_STILI, background: '#0A0A0A' }}
    >
      <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center px-6 pb-20 pt-16 text-center md:pt-20">
        <SectionEtiket tema="koyu">Birebir Danışmanlık</SectionEtiket>
        <AvatarCircles
          numPeople={30}
          avatarUrls={[1, 2, 3, 4].map((n) => ({
            imageUrl: `https://api.dicebear.com/9.x/notionists/svg?seed=danisan-${n}&backgroundColor=ffffff`,
            profileUrl: WHATSAPP_URL,
          }))}
        />
        {gorselBaslik ? (
          <Heading className="mt-8 w-full leading-none">
            <Image
              src="/marka-masasi-yazi.png"
              alt="Marka Masası"
              width={1293}
              height={255}
              sizes="(min-width: 768px) 620px, 90vw"
              className="mx-auto block h-auto w-full max-w-[620px]"
            />
          </Heading>
        ) : (
          <TextAnimate
            as={headingAs}
            by="character"
            animation="blurInUp"
            once
            duration={0.6}
            className="font-display mt-8 whitespace-nowrap text-[clamp(40px,10.5vw,96px)] leading-[1.02] tracking-tight text-white"
            style={{ fontWeight: 800 }}
          >
            Marka Masası
          </TextAnimate>
        )}
        <TextAnimate
          as="p"
          by="word"
          animation="blurInUp"
          once
          delay={0.4}
          duration={0.5}
          className="mt-6 text-[14px] leading-[1.6] text-white/70 sm:whitespace-nowrap sm:text-[clamp(12px,1.9vw,15px)]"
          style={{ fontWeight: 300 }}
        >
          Markanızın mevcut durumu, hedefleri ve büyüme fırsatları düzenli olarak analiz edilir.
        </TextAnimate>

        <HeroDock whatsappUrl={WHATSAPP_URL} />

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="#surec"
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-[8px] border border-white/25 px-5 py-3 text-[13.5px] font-medium text-white transition hover:bg-white/10 sm:w-auto"
          >
            Nasıl İlerliyor?
          </a>
        </div>
      </div>
    </section>
  );
}
