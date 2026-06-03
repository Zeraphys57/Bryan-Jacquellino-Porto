import React, { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

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
      <p className="text-2xl md:text-3xl xl:text-4xl font-light text-gray-900 dark:text-white tabular-nums">
        {match ? `${value}${match[2]}` : n}
      </p>
      <p className="text-[10px] xl:text-xs font-mono text-gray-500 dark:text-gray-400 tracking-widest uppercase mt-1">
        {label}
      </p>
    </div>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <main
      id="hero"
      className="relative flex flex-col justify-center min-h-screen px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48"
      aria-label={t.sections.hero}
    >
      <div className="max-w-[1500px] w-full mx-auto pt-28 pb-20">

        {/* Eyebrow — live availability dot */}
        <p
          className="flex items-center gap-2.5 text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-6"
          style={{ animation: `fade-up 0.5s 0.05s ${EASE} both` }}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t.hero.eyebrow}
        </p>

        {/* Name — masked line reveal, gradient surname */}
        <h1
          data-cursor-xl
          className="font-light text-[clamp(3.2rem,8vw,13rem)] leading-[0.9] tracking-tight
            text-gray-900 dark:text-white mb-8 w-fit"
        >
          <span className="block overflow-hidden -my-[0.18em]">
            <span className="hero-line block py-[0.18em]" style={{ animationDelay: "0.1s" }}>
              Bryan
            </span>
          </span>
          <span className="block overflow-hidden -my-[0.18em]">
            <span
              className="hero-line block py-[0.18em]
                bg-gradient-to-br from-violet-600 via-violet-500 to-teal-500
                dark:from-violet-400 dark:via-violet-400 dark:to-teal-300
                bg-clip-text text-transparent"
              style={{ animationDelay: "0.22s" }}
            >
              Jacquellino
            </span>
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="text-lg md:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed mb-12"
          style={{ animation: `fade-up 0.6s 0.38s ${EASE} both` }}
        >
          {t.hero.tagline}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-3"
          style={{ animation: `fade-up 0.6s 0.48s ${EASE} both` }}
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 rounded-full
              bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium
              transition-all duration-150 ease-out
              hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
          >
            {t.hero.viewWork}
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            >
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="https://wa.me/+6281351958200?text=Hi%20Bryan!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 rounded-full
              border border-gray-200 dark:border-white/10
              text-gray-700 dark:text-gray-300 text-sm font-medium
              transition-all duration-150 ease-out
              hover:-translate-y-0.5 hover:bg-gray-100 dark:hover:bg-white/5 active:scale-[0.97]"
          >
            {t.hero.getInTouch}
            <svg
              width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M3.5 10.5l7-7M5 3.5h5.5V9" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Stats — numbers count up on load */}
        <div
          className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-8 xl:gap-16 mt-14 pt-10
            border-t border-gray-100 dark:border-white/[0.06]"
          style={{ animation: `fade-up 0.6s 0.58s ${EASE} both` }}
        >
          {t.hero.stats.map((s) => (
            <Stat key={s.label} n={s.n} label={s.label} />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          text-gray-400 dark:text-gray-600 cursor-pointer select-none border-none bg-transparent p-0"
        style={{ animation: "bounce-y 2.2s ease-in-out infinite" }}
        onClick={() => document.getElementById("bio")?.scrollIntoView({ behavior: "smooth" })}
        aria-label={t.hero.scroll}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase">{t.hero.scroll}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </main>
  );
};

export default Hero;
