import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { waLink } from "../contact";
import { PAGE_X, CONTAINER, SECTION_Y, H2, LEAD } from "./layout";

/* One accent per service, in the order of t.services.items */
const ACCENTS = ["#8b5cf6", "#14b8a6", "#f59e0b", "#3b82f6"];

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 shrink-0 text-teal-600 dark:text-teal-400">
    <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Services = () => {
  const { t } = useLanguage();
  const ts = t.services;
  return (
    <section id="services" aria-labelledby="services-title" className={`${PAGE_X} ${SECTION_Y}`}>
      <div className={`${CONTAINER} grid lg:grid-cols-12 gap-14 lg:gap-16`}>

        {/* Left: what you get on every project */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="services-title" className={`scroll-reveal ${H2}`}>{ts.heading}</h2>
            <p className={`scroll-reveal mt-5 ${LEAD}`} data-delay="60ms">{ts.intro}</p>

            <div className="scroll-reveal mt-10" data-delay="120ms">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{ts.includedLabel}</p>
              <ul className="mt-4 space-y-3">
                {ts.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-gray-700 dark:text-gray-300">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={waLink(t.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="scroll-reveal group mt-10 inline-flex items-center gap-2 text-base font-semibold
                text-violet-700 dark:text-violet-300 underline decoration-violet-300 dark:decoration-violet-500/50
                underline-offset-[6px] hover:decoration-current"
              data-delay="180ms"
            >
              {ts.cta}
              <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Right: the four things I build */}
        <ul className="lg:col-span-7 border-b border-gray-200 dark:border-white/10">
          {ts.items.map((s, i) => (
            <li
              key={i}
              className="scroll-reveal group border-t border-gray-200 dark:border-white/10 py-9 md:py-11"
              data-delay={`${i * 80}ms`}
            >
              <div className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="mt-[0.7em] w-2.5 h-2.5 shrink-0 rounded-full transition-[scale] duration-300 ease-out group-hover:scale-150"
                  style={{ backgroundColor: ACCENTS[i] }}
                />
                <div>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 dark:text-white
                    transition-[translate] duration-300 ease-out group-hover:translate-x-1">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                    {s.desc}
                  </p>
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{s.fit}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};

export default Services;
