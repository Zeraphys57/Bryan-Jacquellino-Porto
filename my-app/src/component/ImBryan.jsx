import React from "react";
import fotoBryan from '../assets/bryan.jpeg';
// import Lanyard from './Lanyard'; // commented out — heavy 3D physics

const TECH = ["React", "Tailwind CSS", "GSAP", "Vite", "Figma", "Node.js", "PostgreSQL", "LLM API", "RAG", "Three.js", "Python", "Java", "C"];

const ImBryan = () => {
  return (
    <div className="py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48">
      <div className="max-w-[1500px] mx-auto">

        {/* Section label */}
        <p
          className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-4"
        >
          About Me
        </p>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-start">

          {/* Photo placeholder diubah jadi Real Photo */}
            <div className="scroll-reveal flex justify-center md:justify-start" data-delay="60ms">
              <div className="relative group w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] aspect-[3/4]">
                {/* Efek Glow di belakang foto (biarkan saja, ini udah keren) */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500/20 to-teal-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Container Foto */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-gray-100 dark:border-white/8 flex items-center justify-center shadow-sm">
                  
                  {/* 2. SVG Dihapus, diganti dengan tag img ini */}
                  <img 
                    src={fotoBryan} 
                    alt="Bryan Jacquellino" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                </div>
              </div>
            </div>

          {/* Text */}
          <div className="flex flex-col gap-8">
            <div className="scroll-reveal" data-delay="120ms">
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
                Hi, I'm Bryan —<br />
                <span className="text-violet-600 dark:text-violet-400">web developer</span> & AI integrator.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg xl:text-xl">
                Aku freelance web developer berbasis di Yogyakarta, spesialis membangun website yang
                tidak cuma kelihatan keren — tapi juga cepat, responsif, dan beneran bekerja buat
                bisnis kamu. Dari personal branding, portofolio, toko online, sampai integrasi AI,
                aku handle semuanya dari awal sampai live.
              </p>
            </div>

            <div className="scroll-reveal" data-delay="180ms">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg xl:text-xl">
                Stack utamaku adalah React + Tailwind CSS — kombinasi yang ngasih kontrol penuh
                atas performa dan tampilan sekaligus. Ditambah pengalaman D3 IT di Taiwan yang
                melatih fondasi teknis dan cara berpikir terstruktur, setiap project yang aku
                kerjain punya standar yang jelas: clean, efisien, dan tepat sasaran.
              </p>
            </div>

            <div className="scroll-reveal" data-delay="240ms">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg xl:text-xl">
                Belakangan ini aku juga aktif mengintegrasikan AI ke dalam product web — mulai dari
                sistem AI berbasis RAG yang beneran paham konteks bisnis, otomatisasi alur kerja,
                sampai pipeline cerdas yang langsung nyambung ke operasional kamu. AI bukan sekedar
                tren, kalau dipasang dengan benar, itu jadi leverage nyata buat bisnis kamu tumbuh.
              </p>
            </div>

            {/* Tech stack */}
            <div className="scroll-reveal" data-delay="290ms">
              <p className="text-xs font-mono text-gray-400 dark:text-gray-600 tracking-widest uppercase mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH.map(t => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-mono rounded-full
                      bg-gray-100 dark:bg-white/5
                      border border-gray-200 dark:border-white/8
                      text-gray-700 dark:text-gray-300
                      hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400
                      transition-colors duration-150"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImBryan;
