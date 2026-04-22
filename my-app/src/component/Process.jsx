import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processData = [
  {
    step: "01",
    word: "DISCOVER",
    title: "Discovery",
    desc: "Kita ngobrol dulu soal bisnis, tujuan, dan target audiensmu. Dari sini aku petakan apa yang benar-benar dibutuhkan — bukan cuma fitur, tapi solusinya.",
    note: "Brief · Goals",
  },
  {
    step: "02",
    word: "DESIGN",
    title: "Design",
    desc: "Wireframe dan mockup UI dibuat di Figma. Kamu bisa lihat, kasih feedback, dan revisi sebelum satu baris kode pun ditulis.",
    note: "Figma · Mockup",
  },
  {
    step: "03",
    word: "BUILD",
    title: "Build",
    desc: "Development dimulai dengan React + Tailwind sebagai fondasi — clean, cepat, dan scalable. Setiap komponen dibangun dengan standar yang jelas.",
    note: "React · Tailwind",
  },
  {
    step: "04",
    word: "LAUNCH",
    title: "Launch",
    desc: "Deploy ke Vercel atau hosting pilihanmu. Domain setup, performance check, dan pastiin semuanya jalan sempurna sebelum go-live.",
    note: "Vercel · Domain",
  },
];

const n = processData.length;

const Process = () => {
  const sectionRef  = useRef(null);
  const stepRefs    = useRef([]);
  const wordRefs    = useRef([]);
  const progressRef = useRef(null);
  const counterRef  = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // Hide steps 2–4 before first paint
    stepRefs.current.forEach((el, i) => {
      if (i > 0) gsap.set(el, { opacity: 0, y: 80 });
    });
    wordRefs.current.forEach((el, i) => {
      if (i > 0) gsap.set(el, { opacity: 0, scale: 0.75 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${(n - 1) * section.offsetHeight}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
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
            { opacity: 0, scale: 1.45, duration: 0.45, ease: "power2.in" },
            i)
          .to(stepRefs.current[i],
            { opacity: 0, y: -90, duration: 0.38, ease: "power3.in" },
            i + 0.02)

        // ── Enter next step ──
          .fromTo(wordRefs.current[i + 1],
            { opacity: 0, scale: 0.75 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
            i + 0.35)
          .fromTo(stepRefs.current[i + 1],
            { opacity: 0, y: 90 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            i + 0.37);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Header — stays fixed while pinned */}
      <div className="absolute top-0 left-0 right-0 z-20
                      px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48 pt-24">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="scroll-reveal text-xs font-mono text-teal-600 dark:text-teal-400
                            tracking-[0.2em] uppercase mb-3">
                How I Work
              </p>
              <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light
                             text-gray-900 dark:text-white"
                  data-delay="60ms">
                My Process
              </h2>
            </div>
            <span ref={counterRef}
                  className="text-xs font-mono text-gray-300 dark:text-gray-700 tracking-widest pb-1 tabular-nums">
              01  /  04
            </span>
          </div>

          {/* Teal progress bar */}
          <div className="h-px bg-gray-100 dark:bg-white/[0.06] overflow-hidden">
            <div ref={progressRef}
                 className="h-full bg-teal-500 origin-left will-change-transform"
                 style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>

      {/* Stacked steps — all occupy the same space, GSAP shows one at a time */}
      {processData.map((item, i) => (
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
            className="absolute inset-0 flex items-center justify-center
                       text-[26vw] font-black leading-none select-none pointer-events-none
                       text-gray-100 dark:text-white/[0.03] tracking-tight will-change-transform"
          >
            {item.word}
          </span>

          {/* Content */}
          <div className="relative z-10 max-w-[1500px] mx-auto w-full">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400
                               tracking-[0.2em] uppercase">
                Step {item.step}
              </span>
              <span className="w-8 h-px bg-teal-400/50 dark:bg-teal-500/30" />
              <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600 tracking-widest">
                {item.note}
              </span>
            </div>

            <h3 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-light
                           text-gray-900 dark:text-white mb-5 leading-none">
              {item.title}
            </h3>

            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400
                          max-w-lg leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Process;
