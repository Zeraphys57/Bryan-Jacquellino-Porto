import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { PAGE_X, CONTAINER, SECTION_Y, H2, LEAD } from "./layout";

/* Four steps on one line that draws itself as the section scrolls in
   (vertical on phones). Order comes from the <ol>, not from numbers. */
const Process = () => {
  const { t } = useLanguage();
  const tp = t.process;
  return (
    <section id="process" aria-labelledby="process-title" className={`${PAGE_X} ${SECTION_Y}`}>
      <div className={CONTAINER}>

        <header className="max-w-3xl mb-14 md:mb-20">
          <h2 id="process-title" className={`scroll-reveal ${H2}`}>{tp.heading}</h2>
          <p className={`scroll-reveal mt-5 ${LEAD}`} data-delay="60ms">{tp.intro}</p>
        </header>

        <div className="relative">
          {/* Track — horizontal on desktop, vertical on phones */}
          <span aria-hidden="true" className="hidden lg:block absolute left-0 right-0 top-[7px] h-px bg-gray-200 dark:bg-white/10">
            <span className="reveal-line-x block h-full w-full bg-teal-500" />
          </span>
          <span aria-hidden="true" className="lg:hidden absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 dark:bg-white/10">
            <span className="reveal-line-y block h-full w-full bg-teal-500" />
          </span>

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-10">
            {tp.items.map((step, i) => (
              <li key={i}className="scroll-reveal relative pl-10 lg:pl-0 lg:pt-12" data-delay={`${150 + i * 110}ms`}>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 lg:top-0 w-[15px] h-[15px] rounded-full border-2 border-teal-500
                    bg-[#fafafa] dark:bg-[#09090b]"
                />
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
};

export default Process;
