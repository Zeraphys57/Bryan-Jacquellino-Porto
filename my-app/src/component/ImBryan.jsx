import React from "react";
// import Lanyard from './Lanyard'; // commented out — heavy 3D physics

const TECH = ["React", "Tailwind CSS", "Three.js", "GSAP", "Vite", "Figma", "Node.js"];

const ImBryan = () => {
  return (
    <div className="py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <p
          className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-4"
        >
          About Me
        </p>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Photo placeholder */}
          <div className="scroll-reveal flex justify-center md:justify-start" data-delay="60ms">
            <div className="relative group w-64 sm:w-72 md:w-80 lg:w-96 aspect-[3/4]">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500/20 to-teal-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 to-teal-100 dark:from-violet-950/40 dark:to-teal-950/40 border border-gray-100 dark:border-white/8 flex items-center justify-center shadow-sm">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-violet-300 dark:text-violet-800" aria-hidden="true">
                  <circle cx="32" cy="24" r="12" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 56c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-8">
            <div className="scroll-reveal" data-delay="120ms">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
                Hi, I&apos;m Bryan —<br />
                <span className="text-violet-600 dark:text-violet-400">web developer</span> & designer.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                Aku freelance web developer berbasis di Yogyakarta, spesialis membangun website yang
                tidak cuma kelihatan keren — tapi juga cepat, responsif, dan beneran bekerja buat
                bisnis kamu. Dari personal branding, portofolio, sampai toko online, aku handle
                semuanya dari awal sampai live.
              </p>
            </div>

            <div className="scroll-reveal" data-delay="180ms">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                Stack utamaku adalah React + Tailwind CSS — kombinasi yang ngasih kontrol penuh
                atas performa dan tampilan sekaligus. Ditambah pengalaman D1 IT di Taiwan yang
                melatih fondasi teknis dan cara berpikir terstruktur, setiap project yang aku
                kerjain punya standar yang jelas: clean, efisien, dan tepat sasaran.
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
