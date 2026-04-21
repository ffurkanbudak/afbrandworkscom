import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mail, Check, Quote, Globe, GraduationCap, Sparkles, Users, CheckCircle2, Phone, MapPin, CornerDownRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import Hero from './components/Hero';
import Biography from './components/Biography'; // <-- Biyografi bileşenini içe aktardık

// Helper for FAQ Accordion
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border-b border-white/5 pb-2">
      <button 
        className="flex w-full items-center justify-between py-5 text-left focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-white font-manrope">{question}</span>
        <ChevronDown 
          className={`h-5 w-5 text-zinc-500 transition-transform duration-300 group-hover:text-white ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="pb-6 text-zinc-400 font-manrope leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-black text-zinc-100 font-manrope">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-x-0 top-[-10%] mx-auto h-[30rem] w-full max-w-[60rem] rounded-full bg-white/5 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8 relative">
          
          {/* LOGO / İSİM VE UNVAN ALANI */}
          <a href="#top" className="flex flex-col justify-center group relative z-50">
            <span className="text-sm font-bold uppercase tracking-widest text-zinc-100 font-manrope">AHMET FURKAN BUDAK</span>
            <div className="flex flex-col mt-0.5">
               <span className="text-[10px] sm:text-[11px] text-zinc-400 font-medium font-manrope tracking-wide">Kurucu, Toganworks Brand Agency</span>
               <span className="text-[10px] sm:text-[11px] text-zinc-500 font-manrope tracking-wide">Marka Danışmanı</span>
            </div>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#hakkimda" className="text-[11px] uppercase hover:text-white transition-colors font-semibold text-zinc-500 tracking-widest font-manrope">HAKKIMDA</a>
            <a href="#hizmetler" className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors font-manrope">METODOLOJİ</a>
            <a href="#hizmetler" className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors font-manrope">HİZMETLER</a>
            <a href="#hizmetler" className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors font-manrope">PAKETLER</a>
            <a href="#referanslar" className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors font-manrope">İŞ ORTAKLARIM</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
                className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-white/10 md:hidden relative z-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* MASAÜSTÜ BUTONU */}
            <a href="#iletisim" className="hidden items-center gap-2 transition hover:bg-white hover:scale-105 active:scale-95 sm:flex text-xs font-bold text-black font-manrope bg-slate-50 rounded-md pt-2.5 pr-5 pb-2.5 pl-5">
              <span className="font-manrope">Strateji Görüşmesi</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* --- YENİLENMİŞ MOBİL MENÜ --- */}
        <div 
          className={`fixed inset-0 z-40 overflow-y-auto bg-zinc-950/95 backdrop-blur-2xl transition-all duration-500 ease-out md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        >
            {/* Arka Plan Işıltısı */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />

            {/* İçerik Konteyneri: pt-28 ile menü çubuğunun altında başlar, böylece yukarıda kaybolmaz */}
            <div className={`flex flex-col min-h-full px-6 pt-28 pb-10 relative z-10 transition-transform duration-500 delay-100 ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-8'}`}>
                
                {/* Menü Linkleri (Kompakt, Estetik Kutu Tasarımı) */}
                <div className="flex flex-col border border-white/10 bg-zinc-900/30 rounded-xl overflow-hidden mb-8 backdrop-blur-sm">
                    <a href="#hakkimda" onClick={() => setIsMobileMenuOpen(false)} className="py-4 px-6 text-center border-b border-white/5 text-[13px] font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-manrope tracking-widest uppercase">Hakkımda</a>
                    <a href="#hizmetler" onClick={() => setIsMobileMenuOpen(false)} className="py-4 px-6 text-center border-b border-white/5 text-[13px] font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-manrope tracking-widest uppercase">Metodoloji</a>
                    <a href="#hizmetler" onClick={() => setIsMobileMenuOpen(false)} className="py-4 px-6 text-center border-b border-white/5 text-[13px] font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-manrope tracking-widest uppercase">Hizmetler</a>
                    <a href="#hizmetler" onClick={() => setIsMobileMenuOpen(false)} className="py-4 px-6 text-center border-b border-white/5 text-[13px] font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-manrope tracking-widest uppercase">Paketler</a>
                    <a href="#referanslar" onClick={() => setIsMobileMenuOpen(false)} className="py-4 px-6 text-center text-[13px] font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors font-manrope tracking-widest uppercase">İş Ortaklarım</a>
                </div>
                
                {/* MOBİL MENÜ BUTONU (Masaüstüyle aynı minimal, köşeli yapı - rounded-md) */}
                <a href="#iletisim" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 transition hover:bg-white hover:scale-105 active:scale-95 text-xs font-bold text-black font-manrope bg-slate-50 rounded-md py-3.5 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    Strateji Görüşmesi
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <Hero />

      {/* BİYOGRAFİ SECTION */}
      <Biography />

      {/* HİZMETLER SECTION */}
      <section className="z-10 bg-black border-zinc-50/10 border-t pt-24 pb-24 relative" id="hizmetler">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-10 items-start justify-between">
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight font-manrope">Neler Yapıyorum?</h2>
              <p className="text-lg text-zinc-500 font-manrope mt-3">Markalar için stratejik rehberlik, girişimler için mentorluk ve sürdürülebilir büyüme için danışmanlık hizmetleri sunuyorum.</p>
            </div>
            <a href="#hizmetler" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors border-b border-zinc-700 pb-0.5 hover:border-white font-manrope">
                Tüm Detayları Gör
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* CARD 1 */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-black p-8 transition-colors duration-300 hover:border-zinc-700 lg:col-span-2 flex flex-col justify-between min-h-[340px]">
              <div className="absolute -right-6 -top-6 h-64 w-64 opacity-5 transition-opacity duration-300 group-hover:opacity-10 text-white pointer-events-none">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
              </div>

              <div className="relative z-10">
                <div className="mb-6 inline-block rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 font-manrope">
                  EN ÇOK TERCİH EDİLEN
                </div>
                
                <h3 className="mb-4 text-3xl font-medium text-white tracking-tight font-manrope">Marka Tasarımı ve Yönetimi</h3>
                
                <p className="mb-8 max-w-lg text-[15px] leading-relaxed text-zinc-400 font-manrope">
                  Pasif bir görünüm yerine etkili bir kimlik arayan markalar için anahtar teslim yönetim. Marka stratejisinin kurulumundan, günlük iletişim diline ve görsel dünyasına kadar tüm süreç profesyonel ekibimiz tarafından yönetilir.
                </p>

                <ul className="mb-8 space-y-3">
                   <li className="flex items-center gap-3 text-sm text-zinc-400 font-manrope">
                      <Check className="h-4 w-4 text-white" />
                      Kurumsal Kimlik & Logo Tasarımı
                   </li>
                   <li className="flex items-center gap-3 text-sm text-zinc-400 font-manrope">
                      <Check className="h-4 w-4 text-white" />
                      Marka Stratejisi ve Konumlandırma
                   </li>
                </ul>
              </div>
              
              <a href="#iletisim" className="relative z-10 flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors font-manrope">
                 Detaylı Bilgi
                 <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* CARD 2 */}
            <div className="group relative flex flex-col justify-start rounded-[2rem] border border-zinc-800 bg-black p-8 transition-colors duration-300 hover:border-zinc-700 min-h-[340px]">
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded bg-zinc-800/40 text-white ring-1 ring-white/5">
                 <Users className="h-5 w-5" />
              </div>
              <h3 className="mb-4 text-xl font-medium text-white font-manrope">Birebir Mentorluk</h3>
              <p className="text-[15px] leading-relaxed text-zinc-400 font-manrope">
                Kendi sistemini kurmak isteyen girişimciler için özel strateji seansları. Hata yaparak öğrenmek yerine, tecrübeyi satın alın ve büyüme sürecinizi hızlandırın.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="group flex flex-col transition-colors duration-300 hover:border-zinc-700 min-h-[280px] bg-black border-zinc-800 border rounded-[2rem] pt-8 pr-8 pb-8 pl-8 relative justify-start">
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded bg-zinc-800/40 text-white ring-1 ring-white/5">
                 <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-medium text-white font-manrope mb-4">Kişisel Markalaşma</h3>
              <p className="text-[15px] leading-relaxed text-zinc-400 font-manrope">Uzmanlık konumlandırması ve kişisel marka stratejisiyle dijital dünyada güçlü, net ve güven veren bir algı oluşturulur. Görünürlük sadece artmaz, doğru kitle nezdinde otoriteye dönüşür.</p>
            </div>

            {/* CARD 4 */}
            <div className="group relative flex flex-col justify-start rounded-[2rem] border border-zinc-800 bg-black p-8 transition-colors duration-300 hover:border-zinc-700 min-h-[280px]">
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded bg-zinc-800/40 text-white ring-1 ring-white/5">
                 <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-medium text-white font-manrope mb-4">Marka & Pazarlama Eğitimi</h3>
              <p className="text-[15px] leading-relaxed text-zinc-400 font-manrope">Bireysel ve kurumsal Marka & Pazarlama eğitimleri, kişilerin ve ekiplerin stratejik bakış açısını güçlendirerek markayı bilinçli, tutarlı ve sürdürülebilir şekilde yönetmesini sağlar.</p>
            </div>

            {/* CARD 5 */}
            <div className="group relative flex flex-col justify-start rounded-[2rem] border border-zinc-800 bg-black p-8 transition-colors duration-300 hover:border-zinc-700 min-h-[280px]">
              <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded bg-zinc-800/40 text-white ring-1 ring-white/5">
                 <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-medium text-white font-manrope mb-4">Diğer / Özel Proje</h3>
              <p className="text-[15px] leading-relaxed text-zinc-400 font-manrope mb-8">Listede aradığınız hizmet yok mu? Projenizi detaylandırın, size özel bir yol haritası belirleyelim.</p>
              <a href="#iletisim" className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white hover:text-zinc-300 transition-colors font-manrope">
                 İLETİŞİME GEÇ
                 <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative z-10 overflow-hidden border-t bg-black pt-24 pb-24 border-zinc-50/10" id="referanslar">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-zinc-400 font-manrope">İş Ortaklarım</p>
              <h2 className="sm:text-4xl text-3xl font-bold text-white tracking-tight font-manrope">Ne Dediler?</h2>
            </div>
            <div className="hidden items-center gap-2 sm:flex text-zinc-400">
              <Quote className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-manrope">Gerçek müşteri yorumları</span>
            </div>
          </div>
        
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-zinc-50/10 bg-zinc-900/10">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent sm:w-40"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent sm:w-40"></div>
        
            {/* Row 1 — left to right */}
            <div className="relative py-6 sm:py-8">
              <div className="flex gap-4 will-change-transform animate-[marquee-ltr_45s_linear_infinite] sm:gap-5">
                {[
                  { name: "Ayşe Yılmaz", role: "Kurucu Ortak", text: "Markamızı sıfırdan yeniledik. Daha profesyonel bir görünüme kavuştuk. Her zaman destek oldu Furkan Bey.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=320&h=320" },
                  { name: "Caner Demir", role: "E-ticaret Markası Kurucusu", text: "Mağazamızın hikayesi ve banner tasarımı gibi konularda yardımcı oldu. Teşekkürler.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=320&h=320" },
                  { name: "Zeynep Kaya", role: "Pazarlama Müdürü", text: "Süreçler o kadar akıcı ki, sanki kendi ekibimizden biriymiş gibi çalışıyorlar. Marka dilimiz hiç olmadığı kadar net.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=320&h=320" },
                  { name: "Burak Çelik", role: "Girişimci", text: "Marka görünürlüğümüz ciddi oranda arttı. Veri odaklı kararlar artık çok daha kolay alınıyor.", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=320&h=320&fit=crop&crop=faces" },
                  { name: "Ayşe Yılmaz", role: "Kurucu Ortak", text: "Entegrasyon süreci inanılmaz hızlıydı. Ekip dakikalar içinde sistemimize adapte oldu.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=320&h=320" },
                ].map((testimonial, i) => (
                  <article key={i} className="shrink-0 w-[280px] rounded-2xl border p-5 sm:w-[360px] md:w-[420px] border-zinc-50/10 bg-zinc-900/40">
                    <div className="flex items-center gap-3">
                      <img src={testimonial.img} alt="Avatar" className="size-9 rounded-full object-cover grayscale opacity-80" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-zinc-100 font-manrope">{testimonial.name}</span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-white/50" />
                        </div>
                        <p className="text-xs text-zinc-500 font-manrope">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="sm:text-base text-sm text-zinc-300 font-manrope mt-4">{testimonial.text}</p>
                  </article>
                ))}
              </div>
            </div>
        
            <div className="border-t border-white/5"></div>
        
            {/* Row 2 — right to left */}
            <div className="relative py-6 sm:py-8">
              <div className="flex gap-4 will-change-transform animate-[marquee-rtl_45s_linear_infinite] sm:gap-5">
                 {[
                  { name: "Elif Sönmez", role: "Ürün Yöneticisi", text: "Otomasyon kurguları sayesinde operasyonel yükümüz yarı yarıya azaldı. Arayüz sade ve tam ihtiyacımız olanı sunuyor.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=320&h=320" },
                  { name: "Mert Yıldız", role: "E-Ticaret Direktörü", text: "Global yolculuğumuzda markamıza yaptığı dokunuşlarla daha kurumsal bir imaj elde ettik. Havalı bir markamız oldu :)", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=320&h=320" },
                  { name: "Selin Arslan", role: "Marka Yöneticisi", text: "Fikirden ürüne geçiş sürecinde aldığımız mentorluk paha biçilemezdi. En iyi onboarding deneyimini yaşadık.", img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" },
                  { name: "Emre Koç", role: "Yazılım Mimarı", text: "İletişim dili çok net, raporlamalar detaylı ve hata yönetimi kusursuz. Küçük detaylara verdikleri önem fark yaratıyor.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=320&h=320" },
                  { name: "Elif Sönmez", role: "Ürün Yöneticisi", text: "Otomasyon kurguları sayesinde operasyonel yükümüz yarı yarıya azaldı. Arayüz sade ve tam ihtiyacımız olanı sunuyor.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=320&h=320" },
                ].map((testimonial, i) => (
                  <article key={i} className="shrink-0 w-[280px] rounded-2xl border p-5 sm:w-[360px] md:w-[420px] border-zinc-50/10 bg-zinc-900/40">
                    <div className="flex items-center gap-3">
                      <img src={testimonial.img} alt="Avatar" className="size-9 rounded-full object-cover grayscale opacity-80" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-zinc-100 font-manrope">{testimonial.name}</span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-white/50" />
                        </div>
                        <p className="text-xs text-zinc-500 font-manrope">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="sm:text-base text-sm text-zinc-300 font-manrope mt-4">{testimonial.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RAKAMLAR VE İSTATİSTİKLER */}
      <section className="relative z-10 border-t bg-black pt-20 pb-20 border-zinc-50/10" id="rakamlar">
        <div className="mr-auto ml-auto max-w-7xl pl-4 pr-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight font-manrope">Rakamlarla Etki</h2>
            <p className="mt-4 max-w-2xl text-zinc-400 font-manrope">
              Yıllardır markalar ve girişimlerle birlikte büyüyor, sürdürülebilir başarı için çalışıyorum.
            </p>
          </div>

          <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative flex flex-col justify-between rounded-2xl border p-6 transition-all hover:border-white/30 border-zinc-50/10 bg-zinc-900/20 hover:bg-zinc-900/40">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 font-manrope">Mentorluk</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-google-sans text-5xl font-medium tracking-tight text-white transition group-hover:text-zinc-200 font-manrope">50</span>
                  <span className="font-google-sans text-3xl font-normal text-zinc-500 font-manrope">+</span>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-zinc-400 font-manrope">Mentee</p>
            </div>
            <div className="group relative flex flex-col justify-between rounded-2xl border p-6 transition-all hover:border-white/30 border-zinc-50/10 bg-zinc-900/20 hover:bg-zinc-900/40">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 font-manrope">Deneyim</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-google-sans text-5xl font-medium tracking-tight text-white transition group-hover:text-zinc-200 font-manrope">240</span>
                  <span className="font-google-sans text-3xl font-normal text-zinc-500 font-manrope">+</span>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-zinc-400 font-manrope">Saat Stratejik Görüşme</p>
            </div>
            <div className="group relative flex flex-col justify-between rounded-2xl border p-6 transition-all hover:border-white/30 border-zinc-50/10 bg-zinc-900/20 hover:bg-zinc-900/40">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 font-manrope">Projeler</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-google-sans text-5xl font-medium tracking-tight text-white transition group-hover:text-zinc-200 font-manrope">42</span>
                  <span className="font-google-sans text-3xl font-normal text-zinc-500 font-manrope">+</span>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-zinc-400 font-manrope">Marka ile çalıştım</p>
            </div>
            <div className="group relative flex flex-col justify-between rounded-2xl border p-6 transition-all hover:border-white/30 border-zinc-50/10 bg-zinc-900/20 hover:bg-zinc-900/40">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 font-manrope">Podcast</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-google-sans text-5xl font-medium tracking-tight text-white transition group-hover:text-zinc-200 font-manrope">2</span>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-zinc-400 font-manrope">Aktif Podcast</p>
            </div>
          </div>

          <div className="rounded-3xl border p-8 lg:p-12 border-zinc-50/10 bg-zinc-900/10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16">
              {/* Left Side: Text */}
              <div className="flex flex-col justify-start lg:col-span-5">
                <h2 className="text-3xl font-bold text-white font-manrope mb-6">Biraz kendimden</h2>
                <div className="space-y-6 text-base leading-relaxed text-zinc-400">
                  <p className="font-manrope">
                    Markaları daha görünür, daha etkili ve daha sürdürülebilir kılmak için girişimlere stratejik rehberlik sağlıyorum. İş dünyasında stratejik tasarım ve hikaye anlatımının gücüne inanıyorum.
                  </p>
                  <p className="font-manrope">
                    Toganworks Agency'nin kurucusu olarak, işletmelerin temel değerlerini ifade etmelerine ve etkilerini ölçeklendirmelerine yardımcı oluyorum.
                  </p>
                </div>
              </div>
              
              {/* Right Side: Podcast & Lists */}
              <div className="mt-12 flex flex-col gap-10 lg:col-span-7 lg:mt-0">
                <div className="grid grid-cols-1 gap-8 gap-x-8 gap-y-8 border-t border-white/5 pt-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-4 border-b pb-2 text-sm font-semibold uppercase tracking-wider text-white border-zinc-50/10 font-manrope">Uzmanlık Alanlarım</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm text-zinc-400 font-manrope">
                        <span className="mr-3 h-1.5 w-1.5 rounded-full bg-white"></span>
                        Marka Stratejisi & Konumlandırma
                      </li>
                      <li className="flex items-center text-sm text-zinc-400 font-manrope">
                        <span className="mr-3 h-1.5 w-1.5 rounded-full bg-white"></span>
                        Pazara Giriş (GTM) Stratejileri
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 border-b pb-2 text-sm font-semibold uppercase tracking-wider text-white border-zinc-50/10 font-manrope">İlgi Alanlarım</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm text-zinc-400 font-manrope">
                        <span className="mr-3 h-1.5 w-1.5 rounded-full bg-zinc-600"></span>
                        Startup Ekosistemi
                      </li>
                      <li className="flex items-center text-sm text-zinc-400 font-manrope">
                        <span className="mr-3 h-1.5 w-1.5 rounded-full bg-zinc-600"></span>
                        Hikaye Anlatımı (Storytelling)
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full">
                   <div className="mb-4 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-400 font-manrope">Öne Çıkan Podcastler</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <iframe style={{borderRadius: '12px', backgroundColor: '#000'}} src="https://open.spotify.com/embed/show/5ZavqjLuzDk7b2FxTrQOE8?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="border shadow-2xl border-zinc-50/10"></iframe>
                    <iframe style={{borderRadius: '12px', backgroundColor: '#000'}} src="https://open.spotify.com/embed/show/69CrvJvDXdhEPQQuSlXCyT?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="border shadow-2xl border-zinc-50/10"></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative z-10 border-t bg-black py-24 border-zinc-50/10" id="faq">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 font-manrope"># FAQ</span>
              <h2 className="leading-tight text-4xl font-medium text-white tracking-tight font-google-sans mt-4">En çok sorulan sorulara yanıt bulabilirsin.</h2>
            </div>
            
            <div className="lg:col-span-2 space-y-2">
              <FaqItem question="Hangi hizmetleri sunuyorsunuz?" answer="Marka stratejisi geliştirme, kurumsal kimlik tasarımı, dijital pazarlama danışmanlığı ve yapay zeka destekli içerik operasyonları gibi alanlarda uçtan uca hizmetler sunuyorum. İhtiyacınıza göre özelleştirilmiş çözümler üretiyoruz." />
              <FaqItem question="Sizinle projeye nasıl başlayabilirim?" answer="İlk adım olarak bir keşif toplantısı yapıyoruz. Bu toplantıda markanızın mevcut durumunu ve hedeflerinizi analiz ediyoruz. Ardından size özel bir yol haritası ve teklif sunuyorum. Onayınızla birlikte sürece başlıyoruz." />
              <FaqItem question="Yurtdışı projeleri kabul ediyor musunuz?" answer="Evet, global ölçekte çalışıyorum. Şu ana kadar Amerika, İngiltere ve Avrupa'da birçok girişimle uzaktan (remote) çalışma deneyimim oldu. İngilizce dilinde tam hizmet verebiliyorum." />
              <FaqItem question="Ortalama proje süreci ne kadar sürer?" answer="Projenin kapsamına göre değişmekle birlikte, kapsamlı bir marka kimliği ve strateji çalışması ortalama 4-6 hafta sürmektedir. Sadece danışmanlık hizmetleri için saatlik veya aylık retainer modelleri uygulanır." />
              <FaqItem question="Mevcut ekibimizle çalışabilir misiniz?" answer="Elbette. Mevcut pazarlama veya tasarım ekibinize liderlik edebilir, onlara mentorluk yapabilir veya onlarla entegre şekilde projeyi yürütebilirim. Amacım ekibinizin yetkinliklerini artırmaktır." />
              <FaqItem question="Hizmet ücretleriniz nedir?" answer="Her projenin gereksinimleri farklı olduğu için standart bir fiyat listesi sunmak doğru olmaz. İhtiyaçlarınıza en uygun çözümü ve bütçeyi belirlemek için lütfen iletişime geçin." />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="bg-black z-10 border-zinc-50/10 border-t pt-24 pb-24 relative" id="iletisim">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 font-manrope">BİZE ULAŞIN</h3>
                <h2 className="sm:text-5xl text-4xl font-bold text-white tracking-tight font-manrope">Marka oluşturmak veya markan üzerine konuşmak istersen buradayım!</h2>
                <p className="leading-relaxed text-base text-zinc-400 font-manrope max-w-md">Hizmetlerim hakkında daha fazla bilgi almak veya destek almak için formu doldurmanız gerekir.</p>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-zinc-300 font-manrope">Sistem ve Model Geliştirme</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-zinc-300 font-manrope">Kapsamlı Marka Analizi & Raporlama</span>
                </li>
              </ul>

              <div className="space-y-4 pt-4">
                 <h4 className="text-base font-semibold text-white font-manrope">Genel İletişim Bilgileri</h4>
                 <p className="text-sm text-zinc-400 font-manrope max-w-sm">Hem soruların hem de tanışmak için bana aşağıdaki kanallardan ulaşabilirsin.</p>
                 <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-sm text-zinc-300 font-manrope">
                       <Phone className="h-4 w-4 text-zinc-500" />
                       +90 (537) 434 95 66
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300 font-manrope">
                       <Mail className="h-4 w-4 text-zinc-500" />
                       info@afbrandworks.com
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-300 font-manrope">
                       <MapPin className="h-4 w-4 text-zinc-500" />
                       Kolektif House, Levent, İstanbul
                    </div>
                 </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8 backdrop-blur-sm">
               <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                       <label className="text-xs font-medium text-zinc-400 font-manrope">Adınız</label>
                       <input type="text" className="w-full rounded-full bg-black/50 border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all focus:border-white/20 font-manrope" placeholder="Ahmet" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-medium text-zinc-400 font-manrope">Soyadınız</label>
                       <input type="text" className="w-full rounded-full bg-black/50 border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all focus:border-white/20 font-manrope" placeholder="Yılmaz" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400 font-manrope">E-posta Adresi</label>
                      <input type="email" className="w-full rounded-full bg-black/50 border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all focus:border-white/20 font-manrope" placeholder="ahmet@sirketiniz.com" />
                  </div>

                  <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400 font-manrope">Sizi en iyi ne tanımlar?</label>
                      <div className="relative">
                        <select className="w-full appearance-none rounded-full bg-black/50 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all focus:border-white/20 font-manrope text-zinc-400">
                            <option>Birini seçin</option>
                            <option>Girişimci</option>
                            <option>Marka Yöneticisi</option>
                            <option>Yatırımcı</option>
                            <option>Diğer</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                            <ChevronDown className="h-4 w-4 text-zinc-500" />
                        </div>
                      </div>
                  </div>

                  <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400 font-manrope">Mesajınız</label>
                      <div className="relative">
                        <textarea rows={4} className="w-full resize-none rounded-2xl bg-black/50 border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all focus:border-white/20 font-manrope" placeholder="Mesajınızı buraya yazın..."></textarea>
                        <div className="absolute bottom-3 right-3 text-zinc-600">
                            <CornerDownRight className="h-3 w-3" />
                        </div>
                      </div>
                  </div>

                  <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                          <div className="relative flex items-center">
                            <input type="checkbox" className="peer h-4 w-4 appearance-none rounded border border-zinc-700 bg-zinc-900 checked:bg-white checked:border-white transition-all" />
                            <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span className="text-xs text-zinc-500 font-manrope select-none">Kullanım Şartları ve Gizlilik Politikasını kabul ediyorum.</span>
                      </label>
                      <button type="button" className="inline-flex hover:bg-emerald-600 transition shadow-emerald-900/20 text-sm font-semibold text-slate-50 font-manrope bg-neutral-950 border-neutral-50 border rounded-full pt-3 pr-8 pb-3 pl-8 shadow-lg justify-center">Gönder</button>
                  </div>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="z-10 overflow-hidden bg-black mt-auto pt-24 pb-8 relative" id="footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-24">
                <h2 className="sm:text-5xl md:text-6xl lg:leading-tight text-4xl font-bold text-white tracking-tight font-manrope max-w-4xl">Marka yolculuğunuzu dönüştürmeye hazır mısınız?</h2>
                <p className="sm:text-lg leading-relaxed text-base text-zinc-400 font-manrope max-w-2xl mt-8">Stratejik marka yönetimi ve dijital büyüme araçlarını kullanarak benimle projenizi ölçeklendirin.</p>
                <a href="mailto:info@afbrandworks.com" className="transition hover:bg-zinc-200 text-base font-semibold text-black font-manrope bg-white rounded-full mt-10 pt-4 pr-8 pb-4 pl-8">info@afbrandworks.com</a>
            </div>
        </div>

        <div className="flex w-full items-center justify-center select-none overflow-hidden py-10">
            <span className="text-[11vw] leading-none whitespace-nowrap font-bold text-white tracking-tighter font-google-sans font-manrope">
                AHMET FURKAN<span className="font-light text-[8vw] align-middle mx-4 font-manrope">©</span>BUDAK
            </span>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <p className="text-sm text-zinc-500 font-manrope">
                    Copyright @ <span id="year" className="font-manrope">2026</span> Ahmet Furkan Budak. Tüm Hakları Saklıdır.
                </p>
                <nav className="flex flex-wrap justify-center gap-8">
                    <a href="#top" className="text-sm font-medium text-zinc-400 hover:text-white transition font-manrope">Ana Sayfa</a>
                    <a href="#hakkimda" className="text-sm font-medium text-zinc-400 hover:text-white transition font-manrope">Hakkımda</a>
                    <a href="#hizmetler" className="text-sm font-medium text-zinc-400 hover:text-white transition font-manrope">Hizmetler</a>
                    <a href="#referanslar" className="text-sm font-medium text-zinc-400 hover:text-white transition font-manrope">Referanslar</a>
                </nav>
            </div>
        </div>
      </footer>

    </div>
  );
}
