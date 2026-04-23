import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  { num: "01", status: "High School", desc: "Science — Gembala Baik", location: "Pontianak",  year: "Foundation" },
  { num: "02", status: "D3 Degree",   desc: "IT & Engineering",        location: "Taiwan",     year: "2020" },
  { num: "03", status: "University",  desc: "IT — Atma Jaya",          location: "Yogyakarta", year: "2023" },
  { num: "04", status: "Now",         desc: "Building Your Website",   location: "My Room",    year: "Today" },
];

const About = () => {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const progressRef = useRef(null);
  const counterRef  = useRef(null);
  const hintRef     = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    const n       = educationData.length;

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
      {/* Header — stays fixed while section is pinned */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48 pt-20 md:pt-24">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-3">
                Background
              </p>
              <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white" data-delay="60ms">
                Education Timeline
              </h2>
            </div>
            <span
              ref={counterRef}
              className="text-xs font-mono text-gray-300 dark:text-gray-700 tracking-widest pb-1 tabular-nums"
            >
              01  /  04
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-px bg-gray-100 dark:bg-white/[0.06] overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-violet-500 origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: `${educationData.length * 100}vw` }}
      >
        {educationData.map((edu, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-screen h-full flex items-center
                       px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48"
          >
            {/* Decorative big number */}
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center
                         text-[28vw] font-black leading-none select-none pointer-events-none
                         text-gray-100 dark:text-white/[0.025]"
            >
              {edu.num}
            </span>

            {/* Content */}
            <div className="relative z-10 max-w-[1500px] mx-auto w-full">
              <p className="text-[11px] font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-8">
                {edu.year}
              </p>
              <h3 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-light
                             text-gray-900 dark:text-white mb-5 leading-none">
                {edu.status}
              </h3>
              <p className="text-base sm:text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-8 max-w-lg">
                {edu.desc}
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 shrink-0" />
                <span className="text-sm font-mono text-teal-600 dark:text-teal-400">{edu.location}</span>
              </div>
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

export default About;
