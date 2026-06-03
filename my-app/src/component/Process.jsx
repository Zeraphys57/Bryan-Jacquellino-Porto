import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

/* Non-translatable per-step data — copy lives in i18n/translations.js */
const PROCESS_META = [
  {
    step: "01",
    word: "DISCOVER",
    gradLight: "from-violet-100 to-purple-100",
    gradDark:  "dark:from-violet-400/[0.09] dark:to-purple-300/[0.05]",
  },
  {
    step: "02",
    word: "DESIGN",
    gradLight: "from-teal-100 to-cyan-100",
    gradDark:  "dark:from-teal-400/[0.09] dark:to-cyan-300/[0.05]",
  },
  {
    step: "03",
    word: "BUILD",
    gradLight: "from-amber-100 to-orange-100",
    gradDark:  "dark:from-amber-400/[0.09] dark:to-orange-300/[0.05]",
  },
  {
    step: "04",
    word: "LAUNCH",
    gradLight: "from-blue-100 to-indigo-100",
    gradDark:  "dark:from-blue-400/[0.09] dark:to-indigo-300/[0.05]",
  },
];

const n = PROCESS_META.length;

const QUERY_DESKTOP = "(min-width: 768px)";
const QUERY_REDUCED = "(prefers-reduced-motion: reduce)";

/* The pinned scrub is desktop-only; mobile and reduced-motion
   users get a plain vertical flow instead. */
const resolveMode = () => {
  const reduced = window.matchMedia(QUERY_REDUCED).matches;
  const desktop = window.matchMedia(QUERY_DESKTOP).matches;
  return desktop && !reduced ? "pinned" : "flow";
};

const Process = () => {
  const { t } = useLanguage();
  const sectionRef  = useRef(null);
  const stepRefs    = useRef([]);
  const wordRefs    = useRef([]);
  const timelineRef = useRef(null);
  const dotRefs     = useRef([]);
  const labelRefs   = useRef([]);
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

  /* ── Pinned mode: scrub through the stacked steps ── */
  useEffect(() => {
    if (mode !== "pinned") return;
    const section = sectionRef.current;

    // Hide steps 2–4 before first paint
    stepRefs.current.forEach((el, i) => {
      if (i > 0) gsap.set(el, { opacity: 0, y: 50 });
    });
    wordRefs.current.forEach((el, i) => {
      if (i > 0) gsap.set(el, { opacity: 0, scale: 0.85 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${(n - 1) * section.offsetHeight}`,
          scrub: 1.4,
          invalidateOnRefresh: true,
          onUpdate(self) {
            // Grow the teal line downward
            if (timelineRef.current) {
              timelineRef.current.style.transform = `scaleY(${self.progress})`;
            }
            // Light up dots + reveal the step word on the active one
            const passed = self.progress * (n - 1);
            dotRefs.current.forEach((dot, i) => {
              if (!dot) return;
              const active = Math.round(passed) === i;
              const done   = i <= Math.floor(passed + 0.1);
              dot.style.backgroundColor = done ? '#14b8a6' : 'transparent';
              dot.style.borderColor     = done ? '#14b8a6' : '#d1d5db';
              if (active) {
                dot.style.width        = '11px';
                dot.style.height       = '16px';
                dot.style.borderRadius = '50% 50% 50% 50% / 30% 30% 70% 70%';
                dot.style.transform    = 'translateY(-3px)';
                dot.style.boxShadow    = '0 4px 10px rgba(20,184,166,0.45), 0 0 0 3px rgba(20,184,166,0.18)';
              } else {
                dot.style.width        = '10px';
                dot.style.height       = '10px';
                dot.style.borderRadius = '50%';
                dot.style.transform    = '';
                dot.style.boxShadow    = 'none';
              }
              const label = labelRefs.current[i];
              if (label) {
                label.textContent = active ? PROCESS_META[i].word : PROCESS_META[i].step;
                label.style.color = active ? '#14b8a6' : '';
              }
            });

          },
        },
      });

      for (let i = 0; i < n - 1; i++) {
        // ── Exit current step ──
        tl
          .to(wordRefs.current[i],
            { opacity: 0, scale: 1.2, duration: 0.4, ease: "power2.inOut" },
            i)
          .to(stepRefs.current[i],
            { opacity: 0, y: -50, duration: 0.35, ease: "power2.inOut" },
            i + 0.02)

        // ── Enter next step ──
          .fromTo(wordRefs.current[i + 1],
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
            i + 0.25)
          .fromTo(stepRefs.current[i + 1],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
            i + 0.27);
      }
    }, section);

    return () => ctx.revert();
  }, [mode]);

  /* ── Flow mode: reveal each step row on scroll ── */
  useEffect(() => {
    if (mode !== "flow" || reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".pf-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });

        const node = row.querySelector(".pf-node");
        if (node) {
          gsap.to(node, {
            backgroundColor: "var(--tw-colors-teal-500, #14b8a6)",
            color: "#ffffff",
            borderColor: "var(--tw-colors-teal-400, #2dd4bf)",
            boxShadow: "0 0 15px rgba(20, 184, 166, 0.5)",
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

  /* ─────────────────────────  Flow layout  ───────────────────────── */
  if (mode === "flow") {
    return (
      <section
        ref={sectionRef}
        className="relative bg-white dark:bg-gray-950
                   py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48"
      >
        <div className="max-w-[1500px] mx-auto">
          <p className="scroll-reveal text-xs font-mono text-teal-600 dark:text-teal-400 tracking-[0.2em] uppercase mb-3">
            {t.process.eyebrow}
          </p>
          <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white" data-delay="60ms">
            {t.process.heading}
          </h2>

          {/* Vertical spine + steps */}
          <div className="relative mt-14">
            <span
              aria-hidden="true"
              className="absolute left-[13px] top-3 bottom-3 w-px
                         bg-gradient-to-b from-teal-500/70 via-teal-400/30 to-transparent
                         dark:from-teal-400/70 dark:via-teal-400/20"
            />
            <div className="flex flex-col gap-14">
              {PROCESS_META.map((item, i) => {
                const copy = t.process.items[i];
                return (
                  <div key={i} className="pf-row relative pl-12 overflow-hidden">
                    {/* Node */}
                    <span
                      className="pf-node absolute left-0 top-0 w-[27px] h-[27px] rounded-full
                                 flex items-center justify-center
                                 border border-teal-500/60 dark:border-teal-400/60
                                 bg-white dark:bg-gray-950
                                 text-[10px] font-mono text-teal-600 dark:text-teal-400
                                 transition-colors duration-300"
                    >
                      {item.step}
                    </span>

                    {/* Watermark word */}
                    <span
                      aria-hidden="true"
                      className={`absolute -right-4 -top-6 text-[19vw] sm:text-[15vw]
                                 font-black leading-none tracking-tight select-none pointer-events-none
                                 bg-gradient-to-br ${item.gradLight} ${item.gradDark}
                                 bg-clip-text text-transparent`}
                    >
                      {item.word}
                    </span>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 tracking-[0.2em] uppercase">
                          {t.process.stepLabel} {item.step}
                        </span>
                        <span className="w-8 h-px bg-teal-400/50 dark:bg-teal-500/30" />
                        <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600 tracking-widest">
                          {copy.note}
                        </span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white leading-tight mb-3">
                        {copy.title}
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                        {copy.desc}
                      </p>
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

  /* ───────────────────────  Pinned layout  ──────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20
                      px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48 pt-20 md:pt-24">
        <div className="max-w-[1500px] mx-auto flex items-end justify-between">
          <div>
            <p className="scroll-reveal text-xs font-mono text-teal-600 dark:text-teal-400
                          tracking-[0.2em] uppercase mb-3">
              {t.process.eyebrow}
            </p>
            <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light
                           text-gray-900 dark:text-white"
                data-delay="60ms">
              {t.process.heading}
            </h2>
          </div>

        </div>
      </div>

      {/* Vertical timeline — right side, hidden on mobile */}
      <div className="hidden md:block absolute right-6 md:right-10 xl:right-16 2xl:right-24
                      top-1/2 -translate-y-1/2 z-20"
           style={{ height: 'min(640px, 68vh)', width: 20 }}>

        {/* Background line */}
        <div className="absolute left-1/2 -translate-x-px inset-y-0 w-px
                        bg-gray-200 dark:bg-white/[0.08]" />

        {/* Teal progress line — grows downward */}
        <div ref={timelineRef}
             className="absolute left-1/2 -translate-x-px top-0 w-px
                        bg-teal-500 origin-top will-change-transform"
             style={{ height: '100%', transform: 'scaleY(0)' }} />

        {/* Dots + step labels */}
        {PROCESS_META.map((item, i) => (
          <div key={i}
               className="absolute left-1/2"
               style={{ top: `${(i / (n - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}>
            {/* Step label — turns into the step word when active */}
            <span ref={el => { labelRefs.current[i] = el; }}
                  className="absolute right-[calc(100%+7px)] top-1/2 -translate-y-1/2
                             text-[9px] font-mono tracking-widest whitespace-nowrap
                             text-gray-400 dark:text-gray-600 select-none
                             transition-colors duration-300">
              {item.step}
            </span>
            {/* Dot — always exactly on the line */}
            <div ref={el => { dotRefs.current[i] = el; }}
                 className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
                 style={{ borderColor: '#d1d5db', backgroundColor: 'transparent' }} />
          </div>
        ))}
      </div>

      {/* Stacked steps — all occupy the same space, GSAP shows one at a time */}
      {PROCESS_META.map((item, i) => {
        const copy = t.process.items[i];
        return (
          <div
            key={i}
            ref={el => { stepRefs.current[i] = el; }}
            className="absolute inset-0 flex items-center will-change-transform
                       px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48"
          >
            {/* Giant background word — zooms in/out on transition */}
            <span
              ref={el => { wordRefs.current[i] = el; }}
              aria-hidden="true"
              className={`absolute inset-0 flex items-center justify-center
                         text-[26vw] font-black leading-none select-none pointer-events-none
                         bg-gradient-to-br ${item.gradLight} ${item.gradDark}
                         bg-clip-text text-transparent
                         tracking-tight will-change-transform`}
            >
              {item.word}
            </span>

            {/* Content */}
            <div className="relative z-10 max-w-[1500px] mx-auto w-full">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400
                                 tracking-[0.2em] uppercase">
                  {t.process.stepLabel} {item.step}
                </span>
                <span className="w-8 h-px bg-teal-400/50 dark:bg-teal-500/30" />
                <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600 tracking-widest">
                  {copy.note}
                </span>
              </div>

              <h3 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-light
                             text-gray-900 dark:text-white mb-5 leading-none">
                {copy.title}
              </h3>

              <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400
                            max-w-lg leading-relaxed">
                {copy.desc}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Process;
