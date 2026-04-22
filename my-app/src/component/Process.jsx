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

const Process = () => {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const progressRef = useRef(null);
  const counterRef  = useRef(null);
  const hintRef     = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    const n       = processData.length;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(n - 1) * section.offsetWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${(n - 1) * section.offsetWidth}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate(self) {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (counterRef.current) {
              const idx = Math.min(Math.floor(self.progress * n) + 1, n);
              counterRef.current.textContent = `0${idx}  /  0${n}`;
            }
            if (hintRef.current) {
              hintRef.current.style.opacity = self.progress > 0.06 ? "0" : "1";
            }
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48 pt-24">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="scroll-reveal text-xs font-mono text-teal-600 dark:text-teal-400 tracking-[0.2em] uppercase mb-3">
                How I Work
              </p>
              <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white" data-delay="60ms">
                My Process
              </h2>
            </div>
            <span
              ref={counterRef}
              className="text-xs font-mono text-gray-300 dark:text-gray-700 tracking-widest pb-1 tabular-nums"
            >
              01  /  04
            </span>
          </div>

          {/* Progress bar — teal */}
          <div className="h-px bg-gray-100 dark:bg-white/[0.06] overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-teal-500 origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: `${processData.length * 100}vw` }}
      >
        {processData.map((item, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-screen h-full flex items-center
                       px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48"
          >
            {/* Big decorative word — bottom-aligned for visual contrast */}
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-0 right-0 flex justify-center
                         text-[20vw] font-black leading-none select-none pointer-events-none
                         text-gray-100 dark:text-white/[0.025] tracking-tight"
            >
              {item.word}
            </span>

            {/* Content */}
            <div className="relative z-10 max-w-[1500px] mx-auto w-full">

              {/* Step badge */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 tracking-[0.2em] uppercase">
                  Step {item.step}
                </span>
                <span className="w-8 h-px bg-teal-400/40 dark:bg-teal-500/30" />
                <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600 tracking-widest">
                  {item.note}
                </span>
              </div>

              <h3 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-light
                             text-gray-900 dark:text-white mb-5 leading-none">
                {item.title}
              </h3>

              <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2
                   text-[10px] font-mono text-gray-300 dark:text-gray-700 tracking-[0.2em] uppercase
                   transition-opacity duration-500 pointer-events-none"
      >
        <span>scroll to explore</span>
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
          <path d="M1 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
};

export default Process;
