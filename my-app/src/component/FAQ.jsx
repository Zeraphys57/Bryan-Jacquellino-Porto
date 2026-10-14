import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import { waLink } from "../contact";
import { PAGE_X, CONTAINER, SECTION_Y, H2, LEAD } from "./layout";

/* Answers to what clients ask before they commit. Native <details>: works without JS. */
const FAQ = () => {
  const { t } = useLanguage();
  const tf = t.faq;
  return (
    <section id="faq" aria-labelledby="faq-title" className={`${PAGE_X} ${SECTION_Y}`}>
      <div className={`${CONTAINER} grid lg:grid-cols-12 gap-12 lg:gap-16`}>

        <div className="lg:col-span-4">
          <h2 id="faq-title" className={`scroll-reveal ${H2}`}>{tf.heading}</h2>
          <p className={`scroll-reveal mt-5 ${LEAD}`} data-delay="60ms">{tf.intro}</p>
          <a
            href={waLink(t.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="scroll-reveal mt-8 inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-medium
              border border-gray-300 dark:border-white/15 text-gray-800 dark:text-gray-200
              transition-[translate,background-color] duration-150 ease-out
              hover:-translate-y-0.5 hover:bg-gray-100 dark:hover:bg-white/5"
            data-delay="120ms"
          >
            <FaWhatsapp size={16} aria-hidden="true" />
            {tf.cta}
          </a>
        </div>

        <div className="lg:col-span-8 border-b border-gray-200 dark:border-white/10">
          {tf.items.map((item, i) => (
            <details
              key={i}
              className="scroll-reveal group border-t border-gray-200 dark:border-white/10"
              data-delay={`${i * 60}ms`}
            >
              <summary className="flex items-center justify-between gap-6 py-6 text-lg md:text-xl text-gray-900 dark:text-white">
                <span>{item.q}</span>
                <span aria-hidden="true" className="relative w-4 h-4 shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current transition-[rotate] duration-200 group-open:rotate-90" />
                </span>
              </summary>
              <p className="pb-7 -mt-1 pr-10 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                {item.a}
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
