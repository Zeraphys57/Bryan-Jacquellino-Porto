import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "../i18n/LanguageContext";

import shotBashion from "../assets/projects/bashion.webp";
import shotDentist from "../assets/projects/dentist.webp";
import shotPlastik from "../assets/projects/plastik.webp";
import shotTumbuh  from "../assets/projects/tumbuh.webp";
import shotLink    from "../assets/projects/link2026.webp";
import shotLumiere from "../assets/projects/lumiere.webp";

/* ── Abstract wireframe — fallback preview for projects with no live screenshot ── */
const MockPreview = () => (
  <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" fill="none"
    xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <rect x="32" y="34" width="64" height="9" rx="3" fill="white" fillOpacity="0.5"/>
    <rect x="300" y="36" width="26" height="6" rx="2" fill="white" fillOpacity="0.22"/>
    <rect x="338" y="36" width="26" height="6" rx="2" fill="white" fillOpacity="0.22"/>
    <rect x="392" y="32" width="58" height="14" rx="7" fill="white" fillOpacity="0.34"/>
    <rect x="32" y="96"  width="296" height="17" rx="4" fill="white" fillOpacity="0.55"/>
    <rect x="32" y="122" width="244" height="17" rx="4" fill="white" fillOpacity="0.4"/>
    <rect x="32" y="160" width="206" height="7"  rx="2" fill="white" fillOpacity="0.22"/>
    <rect x="32" y="174" width="172" height="7"  rx="2" fill="white" fillOpacity="0.16"/>
    <rect x="32"  y="200" width="104" height="26" rx="13" fill="white" fillOpacity="0.36"/>
    <rect x="148" y="200" width="104" height="26" rx="13" fill="white" fillOpacity="0.14"/>
    {[0,1,2].map(i => (
      <rect key={i} x={32 + i*150} y="252" width="134" height="34" rx="8"
        fill="white" fillOpacity={0.12 - i*0.025}/>
    ))}
    <circle cx="394" cy="152" r="58" fill="white" fillOpacity="0.05"/>
    <circle cx="394" cy="152" r="34" fill="white" fillOpacity="0.07"/>
  </svg>
);

/* Non-translatable per-project data — category & description live in i18n/translations.js */
const projects = [
  {
    id: 1,
    title: "Bashion Fashion",
    tags: ["React", "Tailwind", "AOS"],
    accent: "#7c3aed",
    shot: shotBashion,
    domain: "zeraphys57.github.io/Bashion",
    link: "https://zeraphys57.github.io/Bashion/",
    locked: true,  // live screenshot shown, but Visit Site stays non-clickable
  },
  {
    id: 2,
    title: "Dentist Workshop",
    tags: ["HTML", "CSS", "JS", "Bootstrap", "PHP"],
    accent: "#14b8a6",
    shot: shotDentist,
    domain: "zeraphys57.github.io/Klinik-Gigi-UI",
    link: "https://zeraphys57.github.io/Klinik-Gigi-UI/",
  },
  {
    id: 3,
    title: "Lumière Beauty Clinic",
    tags: ["React", "Tailwind", "Vite", "GSAP", "R3F"],
    accent: "#c46b81",
    shot: shotLumiere,
    domain: "lumiere-beauty-clinic.vercel.app",
    link: "https://lumiere-beauty-clinic.vercel.app/",
  },
  {
    id: 4,
    title: "Tumbuh AI",
    tags: ["AI / RAG", "Meta API", "React", "Node.js", "PostgreSQL"],
    accent: "#6366f1",
    shot: shotTumbuh,
    domain: "tumbuh.tech",
    link: "https://www.tumbuh.tech/",
  },
  {
    id: 5,
    title: "Sumber Aneka Plastik & Kemasan",
    tags: ["Next.js", "Tailwind", "GSAP"],
    accent: "#10b981",
    shot: shotPlastik,
    domain: "sumberanekaplastikdankemasan.com",
    link: "https://sumberanekaplastikdankemasan.com",
  },
  {
    id: 6,
    title: "Link 2026",
    tags: ["Next.js", "React", "Tailwind"],
    accent: "#f43f5e",
    shot: shotLink,
    domain: "link-2026-seven.vercel.app",
    link: "https://link-2026-seven.vercel.app",
  },
  {
    id: 7,
    title: "Neo Brutalism Fashion",
    tags: ["React", "Vite", "Tailwind"],
    accent: "#eab308",
    shot: null,
    domain: "neo-brutalism-fashion.vercel.app",
    link: "https://neo-brutalism-fashion.vercel.app/",
  },
];

const isLive = (p) => Boolean(p.link) && p.link !== "#";

const Projects = () => {
  const { t } = useLanguage();
  const [current, setCurrent]         = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const frameRef  = useRef(null);   // GSAP swap target
  const tiltRef   = useRef(null);   // cursor-tracked tilt target
  const dirRef    = useRef(1);
  const firstRun  = useRef(true);
  const reduced   = useRef(false);
  const finePtr   = useRef(false);
  const touchRef  = useRef(null);  // swipe start coords
  const swipedRef = useRef(false); // suppress link tap after a swipe

  const n = projects.length;
  const p = projects[current];
  const copy = t.projects.items[current];
  const locked = Boolean(p.locked);  // Visit Site visible but non-clickable

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    finePtr.current = window.matchMedia("(pointer: fine)").matches;
  }, []);

  /* Entrance of the new preview after current changes */
  useLayoutEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const el = frameRef.current;
    if (!el) return;
    if (reduced.current) {
      gsap.set(el, { opacity: 1, scale: 1, x: 0 });
      setIsAnimating(false);
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.95, x: dirRef.current * 52 },
      {
        opacity: 1, scale: 1, x: 0,
        duration: 0.62, ease: "expo.out",
        onComplete: () => setIsAnimating(false),
      }
    );
  }, [current]);

  const change = (idx, dir) => {
    if (isAnimating || idx === current) return;
    dirRef.current = dir;
    setIsAnimating(true);
    if (reduced.current) { setCurrent(idx); return; }
    gsap.to(frameRef.current, {
      opacity: 0, scale: 0.95, x: dir * -44,
      duration: 0.2, ease: "power3.in",
      onComplete: () => setCurrent(idx),
    });
  };

  const go = (dir) => change((current + dir + n) % n, dir);

  /* Cursor-tracked tilt — pointer-fine devices only */
  const onTiltMove = (e) => {
    if (reduced.current || !finePtr.current || !tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width  - 0.5;
    const py = (e.clientY - r.top)  / r.height - 0.5;
    tiltRef.current.style.transform =
      `rotateX(${(-py * 6.5).toFixed(2)}deg) rotateY(${(px * 8.5).toFixed(2)}deg)`;
  };
  const onTiltLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  /* Swipe gesture — touch devices */
  const onTouchStart = (e) => {
    const tch = e.touches[0];
    touchRef.current = { x: tch.clientX, y: tch.clientY };
    swipedRef.current = false;
  };
  const onTouchEnd = (e) => {
    if (!touchRef.current) return;
    const tch = e.changedTouches[0];
    const dx = tch.clientX - touchRef.current.x;
    const dy = tch.clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      swipedRef.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };
  /* Cancel the screenshot link if the touch was actually a swipe */
  const onShotClick = (e) => {
    if (swipedRef.current) { e.preventDefault(); swipedRef.current = false; }
  };

  const onKeyNav = (e) => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); go(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(1);  }
  };

  return (
    <div
      className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48"
      style={{ "--accent": p.accent }}
    >
      <div className="max-w-[1500px] mx-auto">

        {/* ── Header ── */}
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p
              className="scroll-reveal text-xs font-mono tracking-[0.2em] uppercase mb-4 transition-colors duration-500"
              style={{ color: "var(--accent)" }}
            >
              {t.projects.eyebrow}
            </p>
            <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white" data-delay="60ms">
              {t.projects.heading}
            </h2>
          </div>
        </div>

        {/* ── Stage ── */}
        <div
          className="relative mx-auto max-w-[940px]"
          role="group"
          aria-roledescription="carousel"
          aria-label={t.projects.regionLabel}
          onKeyDown={onKeyNav}
        >
          {/* Oversized index numeral */}
          <span
            key={`num-${current}`}
            aria-hidden="true"
            className="proj-rise hidden lg:block absolute -top-14 -left-7 z-0 select-none
              font-mono font-bold leading-none tabular-nums text-[8.5rem] xl:text-[10rem]
              transition-colors duration-500"
            style={{ color: "var(--accent)", opacity: 0.12 }}
          >
            {String(current + 1).padStart(2, "0")}
          </span>

          {/* Perspective wrapper */}
          <div
            className="relative z-10"
            style={{ perspective: "1500px" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >

            {/* Accent glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-5 md:-inset-8 rounded-[2.2rem] blur-[60px] -z-10
                opacity-25 dark:opacity-30 transition-colors duration-500"
              style={{ backgroundColor: "var(--accent)" }}
            />

            {/* Tilt layer */}
            <div
              ref={tiltRef}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
              className="transition-transform duration-200 ease-out will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* GSAP swap layer — the browser frame */}
              <div
                ref={frameRef}
                className="will-change-transform overflow-hidden rounded-xl
                  border border-black/10 dark:border-white/10
                  bg-[#0c0c0f] shadow-2xl"
              >
                {/* Chrome bar */}
                <div className="flex items-center gap-3 h-9 px-3.5 bg-white/[0.05] border-b border-white/[0.07]">
                  <div className="flex gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/[0.16]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/[0.1]" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-1.5 h-5 px-2.5 rounded-md bg-white/[0.06]">
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
                      <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="white" strokeOpacity="0.4" strokeWidth="1.1"/>
                      <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.1"/>
                    </svg>
                    <span className="truncate text-[11px] font-mono text-white/45">{p.domain}</span>
                  </div>
                  <span className="shrink-0 text-[11px] font-mono text-white/35 tabular-nums">
                    {String(current + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                  </span>
                  {isLive(p) && !locked && (
                    <a
                      href={p.link} target="_blank" rel="noopener noreferrer"
                      aria-label={`${t.projects.openNewTab} — ${p.title}`}
                      className="shrink-0 text-white/40 hover:text-white transition-colors duration-150"
                    >
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2.5 11.5l9-9M5 2.5h6.5V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Screenshot */}
                {isLive(p) ? (
                  <a
                    {...(locked
                      ? {}
                      : { href: p.link, target: "_blank", rel: "noopener noreferrer", onClick: onShotClick })}
                    aria-label={locked ? p.title : `${t.projects.visitSite} — ${p.title}`}
                    className="group/shot relative block aspect-[16/10] overflow-hidden"
                    style={{ background: "linear-gradient(135deg, var(--accent), #18181b)" }}
                  >
                    <img
                      src={p.shot} alt={`${p.title} — ${copy.category}`} draggable="false"
                      className="w-full h-full object-cover object-top"
                    />
                    <div
                      className="absolute inset-0 flex items-end justify-center pb-8
                        opacity-0 group-hover/shot:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 58%)" }}
                    >
                      <span
                        className="px-5 py-2.5 rounded-full text-sm font-medium text-white
                          shadow-lg transition-colors duration-500"
                        style={{ backgroundColor: "var(--accent)" }}
                      >
                        {t.projects.visitSite} ↗
                      </span>
                    </div>
                  </a>
                ) : (
                  <div
                    className="relative block aspect-[16/10] overflow-hidden"
                    style={{ background: "linear-gradient(135deg, var(--accent), #18181b)" }}
                  >
                    {p.shot
                      ? <img src={p.shot} alt={`${p.title} preview`} draggable="false" className="w-full h-full object-cover object-top" />
                      : <MockPreview />}
                    <span className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-white/70 bg-black/35 backdrop-blur-sm">
                      {t.projects.inDevelopment}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Prev / Next */}
            <button
              onClick={() => go(-1)} disabled={isAnimating} aria-label={t.projects.prev}
              className="absolute top-1/2 -translate-y-1/2 left-3 md:-left-5 z-20
                w-10 h-10 md:w-11 md:h-11 rounded-full
                bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-sm
                border border-black/10 dark:border-white/10
                text-gray-700 dark:text-gray-200 shadow-lg
                flex items-center justify-center
                transition-all duration-150 ease-out
                hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
            >
              <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M9.5 2.5l-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => go(1)} disabled={isAnimating} aria-label={t.projects.next}
              className="absolute top-1/2 -translate-y-1/2 right-3 md:-right-5 z-20
                w-10 h-10 md:w-11 md:h-11 rounded-full
                bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-sm
                border border-black/10 dark:border-white/10
                text-gray-700 dark:text-gray-200 shadow-lg
                flex items-center justify-center
                transition-all duration-150 ease-out
                hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
            >
              <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M5.5 2.5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Dynamic detail panel ── */}
        <div key={`detail-${current}`} className="mx-auto max-w-[940px] mt-9 md:mt-11">
          <p
            className="proj-rise text-xs font-mono tracking-[0.18em] uppercase transition-colors duration-500"
            style={{ color: "var(--accent)", animationDelay: "0ms" }}
          >
            {copy.category}
          </p>
          <h3
            className="proj-rise text-2xl md:text-3xl xl:text-4xl font-light text-gray-900 dark:text-white leading-tight mt-2.5"
            style={{ animationDelay: "70ms" }}
          >
            {p.title}
          </h3>
          <p
            className="proj-rise text-sm md:text-base xl:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mt-3.5"
            style={{ animationDelay: "140ms" }}
          >
            {copy.description}
          </p>
          <div
            className="proj-rise flex flex-wrap items-center justify-between gap-x-8 gap-y-5 mt-7"
            style={{ animationDelay: "210ms" }}
          >
            <ul className="flex flex-wrap gap-1.5">
              {p.tags.map(tag => (
                <li key={tag}
                  className="px-2.5 py-0.5 text-[10px] font-mono rounded-full
                    bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400
                    border border-gray-200 dark:border-white/10">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              {isLive(p) ? (
                <a
                  {...(locked
                    ? {}
                    : { href: p.link, target: "_blank", rel: "noopener noreferrer" })}
                  className={`group/cta inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                    text-sm font-medium text-white shadow-md transition-all duration-150 ease-out
                    ${locked ? "cursor-default" : "hover:-translate-y-0.5 active:scale-95"}`}
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {t.projects.visitSite}
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                    className="transition-transform duration-150 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5">
                    <path d="M2.5 11.5l9-9M5 2.5h6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 dark:text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  {t.projects.comingSoon}
                </span>
              )}
            </div>
          </div>
          
          {copy.caseStudy && (
            <div
              className="mt-8 p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-[#121215] border border-gray-200 dark:border-white/10 shadow-sm"
              style={{ animation: "fade-up 0.4s ease-out both" }}
            >
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-gray-400 mb-2 uppercase" style={{ color: "var(--accent)" }}>The Problem</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{copy.caseStudy.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-gray-400 mb-2 uppercase" style={{ color: "var(--accent)" }}>The Solution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{copy.caseStudy.solution}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-gray-400 mb-2 uppercase" style={{ color: "var(--accent)" }}>The Result</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{copy.caseStudy.result}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Filmstrip ── */}
        <div className="mx-auto max-w-[940px] mt-12 md:mt-14">
          <div className="flex gap-2.5 md:gap-3 overflow-x-auto md:justify-center
            py-4 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden">
            {projects.map((proj, i) => {
              const active = i === current;
              return (
                <button
                  key={proj.id}
                  onClick={() => change(i, i > current ? 1 : -1)}
                  disabled={isAnimating}
                  aria-label={`${t.projects.view} ${proj.title}`}
                  aria-current={active ? "true" : undefined}
                  className={`group/th relative shrink-0 w-[104px] sm:w-[120px] md:w-[136px]
                    aspect-[16/10] rounded-lg overflow-hidden
                    transition-all duration-300 ease-out disabled:cursor-default
                    ${active ? "opacity-100" : "opacity-45 hover:opacity-85"}`}
                  style={{
                    transform: active ? "scale(1.07)" : "scale(1)",
                    outline: active ? "2px solid var(--accent)" : "2px solid transparent",
                    outlineOffset: "2px",
                  }}
                >
                  {proj.shot ? (
                    <img src={proj.shot} alt="" draggable="false"
                      className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="relative w-full h-full"
                      style={{ background: `linear-gradient(135deg, ${proj.accent}, #18181b)` }}>
                      <MockPreview />
                    </div>
                  )}
                  {!active && (
                    <span className="absolute inset-0 bg-black/25 group-hover/th:bg-black/5 transition-colors duration-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
