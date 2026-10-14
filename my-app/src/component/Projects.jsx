import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { CLIENT_PROJECTS, CONCEPT_PROJECTS } from "../data/projects";
import BrowserFrame from "./BrowserFrame";
import { PAGE_X, CONTAINER, SECTION_Y, H2, LEAD } from "./layout";

const ArrowUpRight = ({ className = "" }) => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
    <path d="M2.5 11.5l9-9M5 2.5h6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* A real project: large screenshot, what it is, the outcome, and the full story on demand. */
const ClientProject = ({ p, copy, t, delay }) => (
  <article className="scroll-reveal group flex flex-col" data-delay={`${delay}ms`}>
    {/* Duplicate of the "Visit site" link below, hidden from keyboard and screen readers */}
    <a href={p.link} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" className="block">
      <BrowserFrame domain={p.domain} className="transition-[translate] duration-500 ease-out group-hover:-translate-y-1.5">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={p.img}
            srcSet={`${p.imgSm} 800w, ${p.img} 1600w`}
            sizes="(min-width: 768px) 46vw, 100vw"
            width="1600"
            height="1000"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-[scale] duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </BrowserFrame>
    </a>

    <div className="mt-7 flex flex-col flex-1">
      <p className="text-sm font-medium text-violet-700 dark:text-violet-300">{copy.category}</p>
      <h3 className="mt-2 text-2xl md:text-3xl font-light tracking-tight text-gray-900 dark:text-white text-balance">
        {p.title}
      </h3>
      <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-pretty">
        {copy.description}
      </p>
      {copy.result && (
        <p className="mt-4 text-base text-gray-900 dark:text-gray-100 leading-relaxed">
          <span className="font-semibold">{t.result}: </span>
          {copy.result}
        </p>
      )}

      {copy.problem && (
        <details className="group/story mt-5">
          <summary className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white
            underline decoration-gray-300 dark:decoration-white/25 underline-offset-4 hover:decoration-violet-500">
            {t.story}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
              className="transition-transform duration-200 group-open/story:rotate-180">
              <path d="M1.5 3.5L5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <dl className="mt-4 space-y-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            <div>
              <dt className="font-semibold text-gray-900 dark:text-gray-100">{t.problem}</dt>
              <dd className="mt-1">{copy.problem}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 dark:text-gray-100">{t.solution}</dt>
              <dd className="mt-1">{copy.solution}</dd>
            </div>
          </dl>
        </details>
      )}

      <div className="mt-auto pt-6 flex flex-col items-start gap-5">
        <ul className="flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <li key={tag} className="px-2.5 py-1 text-[13px] rounded-full bg-gray-100 text-gray-700 dark:bg-white/[0.06] dark:text-gray-300">
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
            bg-gray-900 text-white dark:bg-white dark:text-gray-900
            transition-[translate] duration-150 ease-out hover:-translate-y-0.5 active:scale-95"
        >
          {t.visitSite}
          <span className="sr-only">: {p.title}</span>
          <ArrowUpRight className="transition-transform duration-150 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </a>
      </div>
    </div>
  </article>
);

/* A concept: compact thumbnail with an honest label. */
const ConceptProject = ({ p, copy, t, delay }) => {
  const body = (
    <>
      <div className="aspect-[16/10] overflow-hidden rounded-lg bg-gray-200 dark:bg-white/5">
        <img
          src={p.img}
          width="800"
          height="500"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-medium text-gray-600 dark:text-gray-400">
        <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-800 dark:bg-white/10 dark:text-gray-200">
          {t.conceptBadge}
        </span>
        {copy.category}
      </p>
      <h4 className="mt-2 text-base md:text-lg font-medium text-gray-900 dark:text-white">
        {p.title}
        {p.link && <ArrowUpRight className="inline ml-1.5 -mt-0.5 opacity-60 transition-opacity group-hover:opacity-100" />}
      </h4>
      <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{copy.description}</p>
    </>
  );
  return (
    <li className="scroll-reveal" data-delay={`${delay}ms`}>
      {p.link ? (
        <a href={p.link} target="_blank" rel="noopener noreferrer" className="group block">
          {body}
          <span className="sr-only"> — {t.viewDemo}</span>
        </a>
      ) : (
        <div className="group">{body}</div>
      )}
    </li>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const tp = t.projects;
  return (
    <section id="work" aria-labelledby="work-title" className={`${PAGE_X} ${SECTION_Y}`}>
      <div className={CONTAINER}>

        <header className="max-w-3xl mb-14 md:mb-20">
          <h2 id="work-title" className={`scroll-reveal ${H2}`}>{tp.heading}</h2>
          <p className={`scroll-reveal mt-5 ${LEAD}`} data-delay="60ms">{tp.intro}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-x-10 xl:gap-x-16 gap-y-20 md:gap-y-24">
          {CLIENT_PROJECTS.map((p, i) => (
            <ClientProject key={p.id} p={p} copy={tp.items[p.id]} t={tp} delay={(i % 2) * 90} />
          ))}
        </div>

        <div className="mt-28 md:mt-36">
          <div className="max-w-2xl mb-10 md:mb-12">
            <h3 className="scroll-reveal text-2xl md:text-3xl font-light tracking-tight text-gray-900 dark:text-white">
              {tp.conceptHeading}
            </h3>
            <p className="scroll-reveal mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400" data-delay="60ms">
              {tp.conceptIntro}
            </p>
          </div>
          <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-5 gap-y-12">
            {CONCEPT_PROJECTS.map((p, i) => (
              <ConceptProject key={p.id} p={p} copy={tp.items[p.id]} t={tp} delay={(i % 5) * 70} />
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default Projects;
