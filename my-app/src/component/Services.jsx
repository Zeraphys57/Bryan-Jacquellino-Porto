import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

/* Non-translatable per-service data — copy lives in i18n/translations.js.
   Each service owns an accent; soft/glow are pre-mixed so no runtime
   colour-mixing is needed. */
const SERVICE_META = [
  {
    num: "01",
    accent: "#8b5cf6", accentSoft: "rgba(139,92,246,0.10)", accentGlow: "rgba(139,92,246,0.22)",
    tags: ["Figma", "Responsive", "Branding"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="12" y="2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="2" y="12" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: "02",
    accent: "#14b8a6", accentSoft: "rgba(20,184,166,0.10)", accentGlow: "rgba(20,184,166,0.22)",
    tags: ["React", "Tailwind", "Vite", "GSAP"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <polyline points="6,8 2,11 6,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16,8 20,11 16,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="13" y1="4" x2="9" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    accent: "#f59e0b", accentSoft: "rgba(245,158,11,0.10)", accentGlow: "rgba(245,158,11,0.22)",
    tags: ["Vercel", "GitHub", "Domain"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2L20 20H2L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    accent: "#3b82f6", accentSoft: "rgba(59,130,246,0.10)", accentGlow: "rgba(59,130,246,0.22)",
    featured: true,
    tags: ["OpenAI", "RAG", "Automation", "API"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="4"  cy="4"  r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="18" cy="4"  r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="4"  cy="18" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="18" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="5.1"  y1="5.1"  x2="9.2"  y2="9.2"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16.9" y1="5.1"  x2="12.8" y2="9.2"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="5.1"  y1="16.9" x2="9.2"  y2="12.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16.9" y1="16.9" x2="12.8" y2="12.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const Services = () => {
  const { t } = useLanguage();
  return (
    <div className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48">
      <div className="max-w-[1500px] mx-auto">

        <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-4">
          {t.services.eyebrow}
        </p>
        <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white mb-16" data-delay="60ms">
          {t.services.heading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {SERVICE_META.map((s, i) => {
            const copy = t.services.items[i];
            return (
              <div
                key={s.num}
                className={`scroll-reveal group relative overflow-hidden flex flex-col gap-5
                  p-7 xl:p-9 rounded-2xl border
                  transition-[transform,box-shadow,border-color] duration-300 ease-out
                  hover:-translate-y-1.5 hover:shadow-xl
                  bg-white dark:bg-white/[0.03]
                  ${s.featured
                    ? "border-[var(--accent)]/40"
                    : "border-gray-100 dark:border-white/[0.07] hover:border-[var(--accent)]/40"}`}
                style={{
                  "--accent": s.accent,
                  "--accent-soft": s.accentSoft,
                  "--accent-glow": s.accentGlow,
                }}
                data-delay={`${i * 80}ms`}
              >
                {/* Featured: faint gradient wash */}
                {s.featured && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                    style={{ background: "linear-gradient(155deg, var(--accent-soft), transparent 55%)" }}
                  />
                )}

                {/* Top accent rail — draws across on hover, always-on when featured */}
                <span
                  aria-hidden="true"
                  className={`absolute top-0 left-0 h-[3px] bg-[var(--accent)]
                    transition-all duration-300 ease-out
                    ${s.featured ? "w-full" : "w-0 group-hover:w-full"}`}
                />

                {/* Corner glow */}
                <span
                  aria-hidden="true"
                  className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl
                    bg-[var(--accent-glow)] pointer-events-none transition-opacity duration-500
                    ${s.featured ? "opacity-60" : "opacity-0 group-hover:opacity-100"}`}
                />

                {/* Oversized ghost numeral */}
                <span
                  aria-hidden="true"
                  className="absolute -top-5 -right-1 text-[6.5rem] font-black leading-none
                    select-none pointer-events-none text-[var(--accent)]
                    opacity-[0.08] group-hover:opacity-[0.16] transition-opacity duration-300"
                >
                  {s.num}
                </span>

                {/* Icon */}
                <div
                  className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center
                    text-[var(--accent)] bg-[var(--accent-soft)]
                    transition-transform duration-300 ease-out
                    group-hover:scale-110 group-hover:rotate-3"
                >
                  {s.icon}
                </div>

                {/* Title + desc */}
                <div className="relative z-10 flex flex-col gap-2 flex-1">
                  <h3 className="text-base xl:text-lg font-semibold text-gray-900 dark:text-white">
                    {copy.title}
                  </h3>
                  <p className="text-sm xl:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                    {copy.desc}
                  </p>
                </div>

                {/* Tags — accent dot + label */}
                <div className="relative z-10 flex flex-wrap gap-x-3 gap-y-1.5 pt-4
                  border-t border-gray-100 dark:border-white/[0.06]">
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 dark:text-gray-500"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
