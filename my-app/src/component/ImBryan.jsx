import React, { useEffect, useState } from "react";

const TECH = ["React", "Tailwind CSS", "GSAP", "Vite", "Figma", "Node.js", "PostgreSQL", "LLM API", "RAG", "Three.js", "Python", "Java", "C"];

const LINES = [
  { prompt: true,  text: "bryan --info" },
  { prompt: false, text: "" },
  { prompt: false, text: "  name      Bryan Jacquellino" },
  { prompt: false, text: "  role      Freelance Web Developer" },
  { prompt: false, text: "  location  Yogyakarta, ID" },
  { prompt: false, text: "  edu       IT — Engineering" },
  { prompt: false, text: "  status    ✓ Available for projects" },
  { prompt: false, text: "" },
  { prompt: true,  text: "bryan --stats" },
  { prompt: false, text: "" },
  { prompt: false, text: "  projects    50+" },
  { prompt: false, text: "  experience  7 years" },
  { prompt: false, text: "  clients     Indonesia · Taiwan · Remote" },
  { prompt: false, text: "" },
  { prompt: true,  text: "bryan --focus" },
  { prompt: false, text: "" },
  { prompt: false, text: "  React · Tailwind · Node.js" },
  { prompt: false, text: "  AI Integration · RAG · LLM API" },
  { prompt: false, text: "  Design → Deployment" },
  { prompt: false, text: "" },
  { prompt: true,  text: "bryan --contact" },
  { prompt: false, text: "" },
  { prompt: false, text: "  wa    +62 813 5195 8200" },
  { prompt: false, text: "  mail  jacquellinobryan@gmail.com" },
  { prompt: false, text: "" },
  { prompt: true,  text: "_" },
];

const TerminalCard = () => {
  const [visible, setVisible] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (visible < LINES.length - 1) {
      const t = setTimeout(() => setVisible(v => v + 1), 80);
      return () => clearTimeout(t);
    }
  }, [visible]);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative group w-full">
      {/* glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500/20 to-teal-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/8 bg-gray-50 dark:bg-zinc-900 shadow-sm font-mono text-[11px] sm:text-sm">
        {/* title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-white/8 bg-gray-100 dark:bg-zinc-800/60">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <span className="w-3 h-3 rounded-full bg-green-400/70" />
          <span className="ml-2 text-[11px] text-gray-400 dark:text-gray-500 tracking-widest">bryan@portfolio ~ zsh</span>
        </div>

        {/* content */}
        <div className="p-5 md:p-7 space-y-[3px] leading-relaxed">
          {LINES.slice(0, visible + 1).map((line, i) => {
            const isLast = i === LINES.length - 1;
            const isBlinkLine = isLast && line.text === "_";
            return (
              <div key={i} className="flex gap-2">
                {line.prompt && (
                  <span className="text-violet-500 dark:text-violet-400 select-none">❯</span>
                )}
                {!line.prompt && <span className="w-4 shrink-0" />}
                <span className={
                  line.prompt
                    ? "text-gray-900 dark:text-white"
                    : /^  \w/.test(line.text) && !/[·→]/.test(line.text)
                      ? "text-gray-500 dark:text-gray-400"
                      : "text-teal-600 dark:text-teal-400"
                }>
                  {isBlinkLine
                    ? <span className={`inline-block w-[8px] h-[1.1em] align-middle bg-violet-500 dark:bg-violet-400 rounded-sm transition-opacity duration-75 ${blink ? 'opacity-100' : 'opacity-0'}`} />
                    : /^  \w/.test(line.text) && !/[·→]/.test(line.text)
                      ? <>
                          <span className="text-gray-400 dark:text-gray-500">{line.text.trim().split(/\s+/)[0]}</span>
                          <span className="text-gray-700 dark:text-gray-200 ml-2">{line.text.trim().split(/\s+/).slice(1).join(" ")}</span>
                        </>
                      : line.text
                  }
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ImBryan = () => {
  return (
    <div className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48">
      <div className="max-w-[1500px] mx-auto">

        {/* Section label */}
        <p
          className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-4"
        >
          About Me
        </p>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-start">

          {/* Terminal card — replaces photo */}
          <div className="scroll-reveal" data-delay="60ms">
            <TerminalCard />
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
