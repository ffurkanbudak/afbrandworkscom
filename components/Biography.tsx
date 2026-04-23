import React, { useState } from 'react';
import { Target, ChevronDown, Linkedin, Instagram, Twitter } from 'lucide-react';

const Biography = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="hakkimda" className="relative w-full bg-black py-24 border-t border-zinc-50/10 overflow-hidden">
      
      {/* --- Arka Plan Efektleri --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-zinc-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* --- Sol Kısım: Fotoğraf Alanı --- */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start sticky top-24">
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              
              <div className="relative aspect-[4/5] w-full rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden flex items-center justify-center glass-card">
                
                {/* --- FOTOĞRAF BURADA ÇAĞRILIYOR --- */}
                <img 
                  src="/ahmetfurkanbudak.jpeg" 
                  alt="Ahmet Furkan Budak" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

              </div>
            </div>

            {/* --- Sosyal Medya Linkleri (Yeni Eklenen Kısım) --- */}
            <div className="flex gap-4 mt-8 w-full max-w-md justify-center lg:justify-start">
              <a 
                href="https://www.linkedin.com/in/ahmetfurkanbudak" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/afbrandworks/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/afurkanbudakcom" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* --- Sağ Kısım: Biyografi Metni --- */}
          <div className="lg:col-span-7 flex flex-col pt-8 lg:pt-0">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6 backdrop-blur-sm">
              <Target className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-[11px] font-semibold text-zinc-300 font-manrope uppercase tracking-widest">Hakkımda</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-manrope tracking-tight">
              Ahmet Furkan Budak <span className="text-zinc-500 font-normal">Kimdir?</span>
            </h2>

            {/* Biyografi İçeriği */}
            <div className="text-[15px] text-zinc-400 font-manrope leading-relaxed">
              
              <div className="space-y-5">
                <p>
                  <span className="text-zinc-200">Ahmet Furkan Budak</span>, Türkiye’de tanınan bir stratejik marka danışmanı, mentör, eğitmen ve yayıncıdır. Markaların konumlandırma, farklılaşma ve sürdürülebilir büyüme süreçlerinde geliştirdiği sistematik yaklaşım ile iş dünyasında güçlü bir konuma sahiptir. Trabzonlu bir ailenin mensubu olarak İstanbul’da doğmuştur.
                </p>
                <p>
                  Lisans eğitimini İstanbul İstinye Üniversitesi Uluslararası Ticaret ve İşletmecilik bölümünde tamamlamış; ardından IESE Business School, IE Business School ve University of Illinois at Urbana-Champaign bünyesinde pazarlama, marka yönetimi ve küresel pazarlama alanlarında ileri düzey programlara katılarak uzmanlığını uluslararası ölçekte geliştirmiştir.
                </p>
              </div>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1500px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'}`}>
                
                <div className="space-y-5">
                  <p>
                    Kariyerinin ilk döneminde bireysel olarak stratejik marka danışmanlığı sunmuş; farklı sektörlerde faaliyet gösteren ulusal ve uluslararası markalara konumlandırma, rekabet stratejisi ve büyüme mimarisi alanlarında danışmanlık vermiştir. 2024 yılında bu birikimi kurumsal bir yapıya dönüştürerek <span className="text-zinc-200">Toganworks Brand Agency</span>'yi kurmuştur.
                  </p>
                  <p>
                    Toganworks, kuruluş aşamasında yalnızca strateji odaklı bir danışmanlık şirketi olarak yapılandırılmış; markaların zihinsel konumunu netleştirmeye ve uzun vadeli büyüme çerçevesi oluşturmaya odaklanmıştır. Zamanla stratejiyi merkezde tutan yaklaşımını koruyarak; iletişim, tasarım ve uygulama süreçlerini de kapsayan bütüncül bir marka yapılanmasına evrilmiştir.
                  </p>
                  <p>
                    Budak, markalaşma kültürünü yaygınlaştırmak amacıyla Marka İnisiyatifi adı altında bir topluluk kurmuş; üniversitelerde marka ve girişimcilik zirveleri düzenlemiş ve onlarca sponsorun katkısıyla geniş katılımlı organizasyonlar gerçekleştirmiştir. Bu çalışmalar, akademi ile iş dünyası arasında sürdürülebilir bir etkileşim zemini oluşturmuştur.
                  </p>
                  <p>
                    Mentorluk faaliyetlerini İstinye Garage Incubation ve THK & ORION TEKMER bünyesinde sürdürmekte; girişimlere strateji ve markalaşma alanlarında rehberlik etmektedir. Aynı zamanda Eureflect’de marka, pazarlama ve iletişim alanlarında makaleler yazmakta; yapımcısı ve sunucusu olduğu Me Talks: Markalaşma Sohbetleri ile Stratejiden Pazara: Markalaşma serileri aracılığıyla sektörel bilgi birikimini geniş kitlelerle paylaşmaktadır.
                  </p>
                  <p className="pt-5 border-t border-white/5 mt-8">
                    Ulusal ve uluslararası ölçekte faaliyet gösteren markalarla çalışarak; şirketlerin pazarda net, güçlü ve sürdürülebilir konumlar elde etmelerine stratejik katkı sunmaktadır. Çalışmalarında kısa vadeli görünürlükten ziyade, uzun vadeli marka değeri ve rekabetçi dayanıklılık esas alınmaktadır.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-6 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-white hover:text-zinc-300 transition-colors font-manrope group bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-full border border-white/10"
              >
                {isExpanded ? 'Daha Az Göster' : 'Devamını Oku'}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
