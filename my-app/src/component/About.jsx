import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";
import AbstractGraphic from "./AbstractGraphic";

gsap.registerPlugin(ScrollTrigger);

/* Non-translatable per-entry data — copy lives in i18n/translations.js */
const educationData = [
  { num: "01" }, { num: "02" }, { num: "03" }, { num: "04" },
];

const QUERY_DESKTOP = "(min-width: 768px)";
const QUERY_REDUCED = "(prefers-reduced-motion: reduce)";
const VIOLET = "rgb(139 92 246)";

/* Horizontal pinned scroll is desktop-only; mobile and reduced-motion
   users get a plain vertical timeline instead. */
const resolveMode = () => {
  const reduced = window.matchMedia(QUERY_REDUCED).matches;
  const desktop = window.matchMedia(QUERY_DESKTOP).matches;
  return desktop && !reduced ? "horizontal" : "vertical";
};

const About = () => {
  const { t } = useLanguage();
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const progressRef = useRef(null);
  const yearRefs    = useRef([]);
  const hintRef     = useRef(null);
  const markersRef  = useRef([]);

  const [mode, setMode]       = useState(resolveMode);
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY_REDUCED).matches);

  /* Keep layout in sync with viewport / motion-preference changes */
  useEffect(() => {
    const mqDesktop = window.matchMedia(QUERY_DESKTOP);
    const mqReduced = window.matchMedia(QUERY_REDUCED);
    const sync = () => { setMode(resolveMode()); setReduced(mqReduced.matches); };
    mqDesktop.addEventListener("change", sync);
    mqReduced.addEventListener("change", sync);
    return () => {
      mqDesktop.removeEventListener("change", sync);
      mqReduced.removeEventListener("change", sync);
    };
  }, []);

  /* ── Horizontal mode: pinned scroll + per-panel reveal + parallax ── */
  useEffect(() => {
    if (mode !== "horizontal") return;
    const section = sectionRef.current;
    const track   = trackRef.current;
    const n       = educationData.length;

    const ctx = gsap.context(() => {
      const scrollTween = gsap.to(track, {
        x: () => -(n - 1) * section.offsetWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${(n - 1) * section.offsetWidth}`,
          scrub: 1,
          snap: {
            snapTo: 1 / (n - 1),
            duration: { min: 0.3, max: 0.6 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const passed = self.progress * (n - 1);
            yearRefs.current.forEach((el, i) => {
              if (el) {
                const isActive = passed >= i - 0.05;
                el.style.opacity = isActive ? "1" : "0";
                el.style.transform = isActive ? "translateY(0)" : "translateY(4px)";
              }
            });
            if (hintRef.current) {
              hintRef.current.style.opacity = self.progress > 0.06 ? "0" : "1";
            }
            const reached = Math.round(self.progress * (n - 1));
            markersRef.current.forEach((m, i) => {
              if (m) m.style.backgroundColor = i <= reached ? VIOLET : "";
            });
          },
        },
      });

      /* Each panel's content staggers in; the ghost numeral parallaxes */
      gsap.utils.toArray(".tl-panel").forEach((panel, i) => {
        gsap.from(panel.querySelectorAll(".tl-item"), {
          opacity: 0,
          y: 44,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: i === 0
            ? { trigger: section, start: "top 60%" }
            : { trigger: panel, containerAnimation: scrollTween, start: "left 70%" },
        });

        const ghost = panel.querySelector(".tl-ghost");
        if (ghost) {
          gsap.fromTo(ghost, { xPercent: 10 }, {
            xPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [mode]);

  /* ── Vertical mode: lightweight scroll-in for each row ── */
  useEffect(() => {
    if (mode !== "vertical" || reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".tl-vrow").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 36,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });

        const node = row.querySelector(".tl-vnode");
        if (node) {
          gsap.to(node, {
            backgroundColor: "var(--tw-colors-violet-500, #8b5cf6)",
            color: "#ffffff",
            borderColor: "var(--tw-colors-violet-400, #a78bfa)",
            boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
            duration: 0.3,
            scrollTrigger: {
              trigger: row,
              start: "top 55%",
              end: "bottom 45%",
              toggleActions: "play reverse play reverse",
            }
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [mode, reduced]);

  /* ─────────────────────────  Vertical layout  ───────────────────────── */
  if (mode === "vertical") {
    return (
      <section
        ref={sectionRef}
        className="relative bg-white dark:bg-gray-950
                   py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48"
      >
        <div className="max-w-[1500px] mx-auto">
          <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-3">
            {t.education.eyebrow}
          </p>
          <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white" data-delay="60ms">
            {t.education.heading}
          </h2>

          {/* Vertical spine + nodes */}
          <div className="relative mt-14">
            <span
              aria-hidden="true"
              className="absolute left-[13px] top-3 bottom-3 w-px
                         bg-gradient-to-b from-violet-500/70 via-violet-400/30 to-transparent
                         dark:from-violet-400/70 dark:via-violet-400/20"
            />
            <div className="flex flex-col gap-12">
              {educationData.map((edu, i) => {
                const copy = t.education.items[i];
                return (
                  <div key={i} className="tl-vrow relative pl-12">
                    {/* Node */}
                    <span
                      className="tl-vnode absolute left-0 top-0 w-[27px] h-[27px] rounded-full
                                 flex items-center justify-center
                                 border border-violet-500/60 dark:border-violet-400/60
                                 bg-white dark:bg-gray-950
                                 text-[10px] font-mono text-violet-600 dark:text-violet-400
                                 transition-colors duration-300"
                    >
                      {edu.num}
                    </span>

                    <p className="text-[11px] font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-2">
                      {copy.year}
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white leading-tight mb-2.5">
                      {copy.status}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-3.5 max-w-md">
                      {copy.desc}
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 shrink-0" />
                      <span className="text-sm font-mono text-teal-600 dark:text-teal-400">{copy.location}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ───────────────────────  Horizontal layout  ──────────────────────── */
  const n = educationData.length;
  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Header — stays fixed while section is pinned */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48 pt-20 md:pt-24">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-3">
                {t.education.eyebrow}
              </p>
              <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white" data-delay="60ms">
                {t.education.heading}
              </h2>
            </div>

          </div>

          {/* Progress bar with one marker per stop */}
          <div className="relative h-px bg-gray-100 dark:bg-white/[0.06]">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full bg-violet-500 origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
            {educationData.map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${(i / (n - 1)) * 100}%` }}
              >
                <span
                  ref={(el) => (yearRefs.current[i] = el)}
                  className="absolute bottom-4 text-[10px] font-mono tracking-widest text-violet-600 dark:text-violet-400 uppercase whitespace-nowrap transition-all duration-300"
                  style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? "translateY(0)" : "translateY(4px)" }}
                >
                  {t.education.items[i].year}
                </span>
                <span
                  ref={(el) => (markersRef.current[i] = el)}
                  className="w-1.5 h-1.5 rounded-full -translate-y-1/2 bg-gray-200 dark:bg-white/15 transition-colors duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: `${n * 100}vw` }}
      >
        {educationData.map((edu, i) => {
          const copy = t.education.items[i];
          return (
            <div
              key={i}
              className="tl-panel relative flex-shrink-0 w-screen h-full flex items-center
                         px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48"
            >
              {/* Decorative big number (parallax) */}
              <span
                aria-hidden="true"
                className="tl-ghost absolute inset-0 flex items-center justify-center
                           text-[28vw] font-black leading-none select-none pointer-events-none
                           text-gray-100 dark:text-white/[0.025] will-change-transform"
              >
                {edu.num}
              </span>

              {/* Content */}
              <div className="relative z-10 max-w-[1500px] mx-auto w-full flex items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <h3 className="tl-item text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-light
                                 text-gray-900 dark:text-white mb-5 leading-none">
                    {copy.status}
                  </h3>
                  <p className="tl-item text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                    {copy.desc}
                  </p>
                  <div className="tl-item flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 shrink-0" />
                    <span className="text-sm font-mono text-teal-600 dark:text-teal-400">{copy.location}</span>
                  </div>
                </div>
                
                {/* Abstract Graphic Right Side */}
                <div className="hidden md:flex w-1/2 justify-center items-center">
                  <div className="tl-item">
                    <AbstractGraphic index={i} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2
                   text-[10px] font-mono text-gray-300 dark:text-gray-700 tracking-[0.2em] uppercase
                   transition-opacity duration-500 pointer-events-none"
      >
        <span>{t.education.scrollHint}</span>
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
          <path d="M1 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
};

export default About;
