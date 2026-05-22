import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

/* Tech stack grouped by domain — easier to scan than one flat list */
const TECH_GROUPS = [
  { group: "Frontend",  items: ["React", "Tailwind CSS", "GSAP", "Three.js"] },
  { group: "Backend",   items: ["Node.js", "PostgreSQL"] },
  { group: "AI",        items: ["LLM API", "RAG"] },
  { group: "Languages", items: ["Python", "Java", "C"] },
  { group: "Tooling",   items: ["Vite", "Figma"] },
];

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
  { prompt: false, text: "  wa    +62 813 5195 8200",          href: "https://wa.me/6281351958200" },
  { prompt: false, text: "  mail  jacquellinobryan@gmail.com", href: "mailto:jacquellinobryan@gmail.com" },
  { prompt: false, text: "" },
  { prompt: true,  text: "_" },
];

const isKVLine = (text) => /^  \w/.test(text) && !/[·→]/.test(text);

const TerminalCard = () => {
  /* Evaluated once at first render so the very first paint is already correct */
  const reducedRef = useRef(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const rootRef    = useRef(null);

  const [started, setStarted] = useState(false);
  const [lineIdx, setLineIdx] = useState(() => (reducedRef.current ? LINES.length : 0));
  const [charIdx, setCharIdx] = useState(0);
  const [blink, setBlink]     = useState(true);

  /* Start the reveal only when the card actually scrolls into view */
  useEffect(() => {
    if (reducedRef.current) return;          // reduced motion: already fully shown
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); io.disconnect(); }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Typing engine — chars for prompt lines, whole-line pop for output */
  useEffect(() => {
    if (!started || reducedRef.current || lineIdx >= LINES.length) return;
    const line = LINES[lineIdx];
    const typable = line.prompt && line.text !== "_";

    if (typable && charIdx < line.text.length) {
      const id = setTimeout(() => setCharIdx((c) => c + 1), 30);
      return () => clearTimeout(id);
    }
    const pause = line.prompt ? 220 : line.text === "" ? 22 : 55;
    const id = setTimeout(() => { setLineIdx((i) => i + 1); setCharIdx(0); }, pause);
    return () => clearTimeout(id);
  }, [started, lineIdx, charIdx]);

  /* Cursor blink for the trailing prompt */
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  const renderLine = (line, i) => {
    if (line.text === "_") {
      return (
        <span className={`inline-block w-[8px] h-[1.1em] align-middle rounded-sm
          bg-violet-500 dark:bg-violet-400 transition-opacity duration-75
          ${blink ? "opacity-100" : "opacity-0"}`} />
      );
    }

    const isCurrent = i === lineIdx && !reducedRef.current && lineIdx < LINES.length;

    if (line.prompt) {
      const shown  = isCurrent ? line.text.slice(0, charIdx) : line.text;
      const typing = isCurrent && charIdx < line.text.length;
      return (
        <span className="text-gray-900 dark:text-white">
          {shown}
          {typing && (
            <span className="inline-block w-[2px] h-[0.95em] ml-[1px] align-middle
              bg-violet-500 dark:bg-violet-400" />
          )}
        </span>
      );
    }

    if (!isKVLine(line.text)) {
      return <span className="text-teal-600 dark:text-teal-400">{line.text}</span>;
    }

    const parts = line.text.trim().split(/\s+/);
    const key   = parts[0];
    const val   = parts.slice(1).join(" ");
    return (
      <span>
        <span className="text-gray-400 dark:text-gray-500">{key}</span>
        {line.href ? (
          <a
            href={line.href}
            {...(line.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="ml-2 text-gray-700 dark:text-gray-200
              underline decoration-dotted decoration-1 underline-offset-4
              decoration-gray-300 dark:decoration-white/25
              hover:text-violet-500 dark:hover:text-violet-400
              hover:decoration-violet-400 transition-colors duration-150"
          >
            {val}
          </a>
        ) : (
          <span className="ml-2 text-gray-700 dark:text-gray-200">{val}</span>
        )}
      </span>
    );
  };

  return (
    <div ref={rootRef} className="relative group w-full">
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
          {LINES.slice(0, lineIdx + 1).map((line, i) => (
            <div
              key={i}
              className="flex gap-2"
              style={reducedRef.current ? undefined : { animation: "term-line 0.3s ease-out both" }}
            >
              {line.prompt
                ? <span className="text-violet-500 dark:text-violet-400 select-none">❯</span>
                : <span className="w-4 shrink-0" />}
              {renderLine(line, i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImBryan = () => {
  const { t } = useLanguage();
  return (
    <div className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48">
      <div className="max-w-[1500px] mx-auto">

        {/* Section label */}
        <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-4">
          {t.bio.eyebrow}
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
                {t.bio.headLead}<br />
                <span className="text-violet-600 dark:text-violet-400">{t.bio.headAccent}</span>{t.bio.headRest}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg xl:text-xl">
                {t.bio.para1}
              </p>
            </div>

            <div className="scroll-reveal" data-delay="180ms">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg xl:text-xl">
                {t.bio.para2}
              </p>
            </div>

            <div className="scroll-reveal" data-delay="240ms">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg xl:text-xl">
                {t.bio.para3}
              </p>
            </div>

            {/* Tech stack — grouped by domain */}
            <div className="scroll-reveal" data-delay="290ms">
              <p className="text-xs font-mono text-gray-400 dark:text-gray-600 tracking-widest uppercase mb-4">
                {t.bio.techStack}
              </p>
              <div className="flex flex-col gap-3.5">
                {TECH_GROUPS.map(({ group, items }) => (
                  <div
                    key={group}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4"
                  >
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-wider shrink-0 sm:w-20 sm:text-right">
                      {group}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {items.map((name) => (
                        <span
                          key={name}
                          className="px-3 py-1 text-xs font-mono rounded-full
                            bg-gray-100 dark:bg-white/5
                            border border-gray-200 dark:border-white/8
                            text-gray-700 dark:text-gray-300
                            hover:border-violet-400 dark:hover:border-violet-500
                            hover:text-violet-600 dark:hover:text-violet-400
                            transition-colors duration-150"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
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
