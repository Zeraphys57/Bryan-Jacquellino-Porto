import React, { useEffect, useRef } from "react";
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

const Process = () => {
  const { t } = useLanguage();
  const sectionRef    = useRef(null);
  const stepRefs      = useRef([]);
  const wordRefs      = useRef([]);
  const timelineRef   = useRef(null);
  const dotRefs       = useRef([]);
  const counterRef    = useRef(null);

  useEffect(() => {
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
            // Light up dots as each step is reached
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
            });
            // Counter
            if (counterRef.current) {
              const idx = Math.min(Math.floor(self.progress * n) + 1, n);
              counterRef.current.textContent = `0${idx}  /  0${n}`;
            }
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
  }, []);

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
          <span ref={counterRef}
                className="text-xs font-mono text-gray-300 dark:text-gray-700 tracking-widest pb-1 tabular-nums">
            01  /  04
          </span>
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
            {/* Step label — floats left, never shifts the dot */}
            <span className="absolute right-[calc(100%+7px)] top-1/2 -translate-y-1/2
                             text-[9px] font-mono tracking-widest whitespace-nowrap
                             text-gray-400 dark:text-gray-600 select-none hidden md:block">
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

              <p className="text-base sm:text-xl md:text-2xl text-gray-500 dark:text-gray-400
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
