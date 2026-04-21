import React from 'react';
import { ArrowRight, ArrowDown, Share2, Triangle, Hexagon, Circle, Box, Sparkles, ArrowUpRight, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col justify-center items-center overflow-hidden pt-20" id="top">
      
      {/* --- Ambient Background --- */}
      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      {/* Corner Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zinc-900/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-900/40 rounded-full blur-[100px] pointer-events-none" />


      {/* --- Network Lines (SVG Layer) --- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
         <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="transparent" />
               <stop offset="50%" stopColor="white" />
               <stop offset="100%" stopColor="transparent" />
            </linearGradient>
         </defs>
         
         {/* Connecting Lines (Coordinates approximated to match absolute positions of nodes) */}
         <path d="M240,225 Q500,300 800,450" fill="none" stroke="url(#line-gradient)" strokeWidth="1" className="hidden lg:block" />
         <path d="M1360,250 Q1100,350 800,450" fill="none" stroke="url(#line-gradient)" strokeWidth="1" className="hidden lg:block" />
         <path d="M288,630 Q500,550 800,450" fill="none" stroke="url(#line-gradient)" strokeWidth="1" className="hidden lg:block" />
         <path d="M1312,585 Q1100,550 800,450" fill="none" stroke="url(#line-gradient)" strokeWidth="1" className="hidden lg:block" />
      </svg>


      {/* --- Floating Nodes (Absolute Elements) --- */}
      
      {/* Node: Top Left (Triangle) */}
      <div className="absolute top-[25%] left-[10%] lg:left-[15%] hidden md:flex flex-col items-start gap-2 animate-float" style={{ animationDelay: '0s' }}>
         <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-md group-hover:bg-white/20 transition-all" />
            <div className="relative h-12 w-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
               <Triangle className="h-5 w-5 text-zinc-300 fill-zinc-300/20" />
            </div>
         </div>
         <div className="pl-2">
            <div className="flex items-center gap-2">
               <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
               <span className="text-sm font-medium text-zinc-200 font-manrope">Strateji</span>
            </div>
            <p className="text-xs text-zinc-500 font-manrope pl-3.5">%100 Odak</p>
         </div>
      </div>

      {/* Node: Top Right (Sparkles) */}
      <div className="absolute top-[28%] right-[10%] lg:right-[15%] hidden md:flex flex-col items-end gap-2 animate-float" style={{ animationDelay: '1.5s' }}>
         <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-md group-hover:bg-white/20 transition-all" />
            <div className="relative h-12 w-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
               <Sparkles className="h-5 w-5 text-zinc-300" />
            </div>
         </div>
         <div className="pr-2 text-right">
            <div className="flex items-center gap-2 justify-end">
               <span className="text-sm font-medium text-zinc-200 font-manrope">Tasarım</span>
               <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <p className="text-xs text-zinc-500 font-manrope pr-3.5">Global Standart</p>
         </div>
      </div>

      {/* Node: Bottom Left (Share) */}
      <div className="absolute bottom-[30%] left-[12%] lg:left-[18%] hidden md:flex flex-col items-start gap-2 animate-float" style={{ animationDelay: '2.5s' }}>
         <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-md group-hover:bg-white/20 transition-all" />
            <div className="relative h-12 w-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
               <Share2 className="h-5 w-5 text-zinc-300" />
            </div>
         </div>
         <div className="pl-2">
            <div className="flex items-center gap-2">
               <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
               <span className="text-sm font-medium text-zinc-200 font-manrope">Büyüme</span>
            </div>
            <p className="text-xs text-zinc-500 font-manrope pl-3.5">Veri Odaklı</p>
         </div>
      </div>

      {/* Node: Bottom Right (Hexagon) */}
      <div className="absolute bottom-[35%] right-[12%] lg:right-[18%] hidden md:flex flex-col items-end gap-2 animate-float" style={{ animationDelay: '3.5s' }}>
         <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-white/10 rounded-full blur-md group-hover:bg-white/20 transition-all" />
            <div className="relative h-12 w-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center transition-transform group-hover:scale-110">
               <Hexagon className="h-5 w-5 text-zinc-300" />
            </div>
         </div>
         <div className="pr-2 text-right">
            <div className="flex items-center gap-2 justify-end">
               <span className="text-sm font-medium text-zinc-200 font-manrope">Yönetim</span>
               <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
            <p className="text-xs text-zinc-500 font-manrope pr-3.5">Sürdürülebilir</p>
         </div>
      </div>


      {/* --- Main Center Content --- */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6 animate-fade-in">
        
        {/* Badge - (Play Butonu Buradan Kaldırıldı) */}
        <div className="flex flex-col items-center gap-6 mb-8">
            <a href="mailto:info@afbrandworks.com" className="group flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-5 py-2 transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm">
                <Globe className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors font-manrope tracking-wide uppercase">Yeni Projeler İçin Aktif</span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors -rotate-45 group-hover:rotate-0 duration-300" />
            </a>
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-manrope bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 drop-shadow-2xl">
           Markaları Görünür ve<br />Etkili Kılıyorum
        </h1>
        
        <p className="text-lg text-zinc-400 font-manrope max-w-2xl leading-relaxed mb-10">
          Markaların stratejisini doğru şekilde kurgulayarak net, güçlü ve akılda kalıcı bir kimlik oluşturmalarına; bulundukları pazarda etkili şekilde farklılaşmalarına yardımcı oluyorum.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="mailto:info@afbrandworks.com" className="group flex h-12 items-center gap-2 rounded-full bg-zinc-900/80 border border-zinc-700 px-8 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:border-zinc-500 hover:scale-105 active:scale-95 backdrop-blur-md">
               Projeler İçin Uygunum
               <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>
            <a href="#hizmetler" className="group flex h-12 items-center rounded-full bg-white px-8 text-sm font-bold text-black transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
               Hizmetleri İncele
            </a>
        </div>

      </div>


      {/* --- Bottom UI Elements --- */}
      
      {/* Scroll Indicator (Bottom Left) */}
      <div className="absolute bottom-10 left-8 hidden lg:flex items-center gap-3">
         <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center animate-bounce">
            <ArrowDown className="h-4 w-4 text-white" />
         </div>
         <span className="text-xs font-medium text-zinc-500 font-manrope uppercase tracking-wide">Scroll down</span>
      </div>

      {/* Pagination/Status (Bottom Right) */}
      <div className="absolute bottom-10 right-8 hidden lg:flex flex-col items-end gap-2">
         <span className="text-xs font-medium text-zinc-400 font-manrope">Marka Ufukları</span>
         <div className="flex gap-1.5">
            <div className="h-1 w-8 rounded-full bg-white" />
            <div className="h-1 w-2 rounded-full bg-white/20" />
            <div className="h-1 w-2 rounded-full bg-white/20" />
            <div className="h-1 w-2 rounded-full bg-white/20" />
         </div>
      </div>

    </div>
  );
};

export default Hero;
