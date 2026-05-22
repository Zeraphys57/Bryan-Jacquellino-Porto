import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

/* Non-translatable per-service data — copy lives in i18n/translations.js */
const SERVICE_META = [
  {
    num: "01",
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
    tags: ["Vercel", "GitHub", "Domain"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2L20 20H2L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "04",
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
                className="scroll-reveal group flex flex-col gap-5 p-7 xl:p-9 rounded-2xl
                  bg-white dark:bg-white/[0.03]
                  border border-gray-100 dark:border-white/[0.07]
                  hover:-translate-y-1 hover:shadow-lg hover:border-gray-200 dark:hover:border-white/12
                  transition-all duration-200 ease-out"
                data-delay={`${i * 80}ms`}
              >
                {/* Icon + number */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10
                    text-violet-600 dark:text-violet-400
                    flex items-center justify-center
                    group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20
                    transition-colors duration-200">
                    {s.icon}
                  </div>
                  <span className="text-xs font-mono text-gray-300 dark:text-gray-700">{s.num}</span>
                </div>

                {/* Title + desc */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-base xl:text-lg font-semibold text-gray-900 dark:text-white">{copy.title}</h3>
                  <p className="text-sm xl:text-base text-gray-500 dark:text-gray-400 leading-relaxed">{copy.desc}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-white/[0.05]">
                  {s.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-gray-400 dark:text-gray-600">
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
