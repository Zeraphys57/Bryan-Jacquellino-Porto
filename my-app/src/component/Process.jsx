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
  const rowRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          el,
          { x: fromLeft ? -70 : 70, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48 overflow-x-hidden">
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <p className="scroll-reveal text-xs font-mono text-teal-600 dark:text-teal-400 tracking-[0.2em] uppercase mb-4">
          How I Work
        </p>
        <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white mb-20" data-delay="60ms">
          My Process
        </h2>

        {/* Zigzag steps */}
        <div className="flex flex-col gap-16 md:gap-24 xl:gap-32">
          {processData.map((item, i) => {
            const contentLeft = i % 2 === 0;
            return (
              <div
                key={i}
                ref={el => { rowRefs.current[i] = el; }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-16 items-center"
              >
                {/* Content block */}
                <div className={contentLeft ? "md:order-1" : "md:order-2"}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 tracking-[0.2em] uppercase">
                      Step {item.step}
                    </span>
                    <span className="w-6 h-px bg-teal-400/50 dark:bg-teal-500/30" />
                    <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600 tracking-widest">
                      {item.note}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl xl:text-6xl font-light text-gray-900 dark:text-white mb-5 leading-none">
                    {item.title}
                  </h3>

                  <p className="text-base md:text-lg xl:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>

                {/* Decorative word block */}
                <div
                  className={`overflow-hidden flex ${contentLeft ? "md:order-2 justify-end" : "md:order-1 justify-start"}`}
                >
                  <span
                    className="block font-black leading-none select-none pointer-events-none
                      text-gray-100 dark:text-white/[0.05] tracking-tight
                      text-[22vw] md:text-[13vw] xl:text-[11vw]"
                  >
                    {item.word}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Process;
