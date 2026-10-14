import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import { waLink } from "../contact";
import { CLIENT_PROJECTS } from "../data/projects";
import BrowserFrame from "./BrowserFrame";
import { PAGE_X, CONTAINER } from "./layout";
import photo from "../assets/bryan.jpeg";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

/* Eases a number up to its target once, on mount.
   Snaps straight to the target when reduced motion is requested. */
const useCountUp = (target, duration = 1400) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
};

/* One stat — counts up a leading number, renders text-only values as-is */
const Stat = ({ n, label }) => {
  const match = /^(\d+)(.*)$/.exec(n);
  const value = useCountUp(match ? parseInt(match[1], 10) : 0);
  return (
    <div>
      <p className="text-3xl xl:text-4xl font-light text-gray-900 dark:text-white tabular-nums whitespace-nowrap">
        {match ? `${value}${match[2]}` : n}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</p>
    </div>
  );
};

/* Headline words rise out of their own masks one after another; wrapping stays natural. */
const RisingWords = ({ text }) => {
  const words = text.split(" ");
  return words.map((word, i) => (
    <React.Fragment key={`${word}-${i}`}>
      <span className="inline-block overflow-hidden align-top -my-[0.12em]">
        <span className="hero-word inline-block py-[0.12em]" style={{ animationDelay: `${0.05 + i * 0.045}s` }}>
          {word}
        </span>
      </span>
      {i < words.length - 1 && " "}
    </React.Fragment>
  ));
};

/* Three real client screenshots, fanned out; opens the work section.
   All three sit in the first viewport, so none of them is lazy. */
const Showcase = ({ label }) => {
  const [front, middle, back] = CLIENT_PROJECTS;
  const shot = (p, priority) => (
    <img
      src={p.img}
      srcSet={`${p.imgSm} 800w, ${p.img} 1600w`}
      sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 36vw, 62vw"
      width="1600"
      height="1000"
      alt=""
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className="block w-full aspect-[16/10] object-cover object-top"
    />
  );
  return (
    <a
      href="#work"
      aria-label={label}
      className="group relative block aspect-[16/12] w-full"
      style={{ animation: `fade-up 0.9s 0.45s ${EASE} both` }}
    >
      <div className="absolute right-0 top-0 w-[70%] rotate-[4deg] transition-[rotate,translate] duration-700 ease-out
        group-hover:rotate-[6deg] group-hover:translate-x-2">
        <div className="float-c"><BrowserFrame domain={back.domain}>{shot(back)}</BrowserFrame></div>
      </div>
      <div className="absolute left-0 top-[16%] w-[70%] -rotate-[3deg] transition-[rotate,translate] duration-700 ease-out
        group-hover:-rotate-[5deg] group-hover:-translate-x-2">
        <div className="float-b"><BrowserFrame domain={middle.domain}>{shot(middle)}</BrowserFrame></div>
      </div>
      <div className="absolute left-[13%] bottom-0 w-[74%] transition-[translate] duration-700 ease-out group-hover:-translate-y-2">
        <div className="float-a"><BrowserFrame domain={front.domain}>{shot(front, true)}</BrowserFrame></div>
      </div>
    </a>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={`relative flex flex-col justify-center min-h-svh ${PAGE_X}`}
    >
      <div className={`${CONTAINER} pt-28 pb-16 md:pt-32 md:pb-20`}>

        {/* Availability */}
        <p
          className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-6"
          style={{ animation: `fade-up 0.5s 0.05s ${EASE} both` }}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t.hero.available}
        </p>

        {/* What I do, for whom */}
        <h1
          id="hero-title"
          data-cursor-xl
          className="font-light text-[clamp(2rem,6.6vw,6.75rem)] leading-[1.02] tracking-tight
            text-gray-900 dark:text-white text-balance max-w-[17ch]"
        >
          <RisingWords text={t.hero.headline} />
        </h1>

        <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-x-12 xl:gap-x-16 gap-y-12 lg:gap-y-0">
          <div className="lg:col-span-6 xl:col-span-5 lg:row-start-1">
            <div className="flex items-start gap-4" style={{ animation: `fade-up 0.6s 0.38s ${EASE} both` }}>
              <img
                src={photo}
                alt={t.about.photoAlt}
                width="56"
                height="56"
                className="w-14 h-14 shrink-0 rounded-full object-cover object-top ring-2 ring-violet-500/30"
              />
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-pretty">
                {t.hero.intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8" style={{ animation: `fade-up 0.6s 0.48s ${EASE} both` }}>
              <a
                href={waLink(t.whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-base font-medium
                  bg-gray-900 text-white dark:bg-white dark:text-gray-900
                  transition-[translate,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
              >
                <FaWhatsapp size={18} aria-hidden="true" />
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-base font-medium
                  border border-gray-300 dark:border-white/15 text-gray-800 dark:text-gray-200
                  transition-[translate,background-color] duration-150 ease-out
                  hover:-translate-y-0.5 hover:bg-gray-100 dark:hover:bg-white/5 active:scale-[0.97]"
              >
                {t.hero.ctaSecondary}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-y-0.5">
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-7 lg:col-start-7 xl:col-start-6 lg:row-start-1 lg:row-span-2 lg:self-center lg:pl-4">
            <Showcase label={t.hero.showcaseLabel} />
          </div>

          {/* Stats — numbers count up on load */}
          <div className="lg:col-span-6 xl:col-span-5 lg:row-start-2">
            <div
              className="grid grid-cols-2 gap-x-6 gap-y-7 lg:mt-12 pt-8 border-t border-gray-200 dark:border-white/10"
              style={{ animation: `fade-up 0.6s 0.58s ${EASE} both` }}
            >
              {t.hero.stats.map((s) => (
                <Stat key={s.label} n={s.n} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
