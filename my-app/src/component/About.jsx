import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  { status: "High School", desc: "Science — Gembala Baik",   location: "Pontianak",  year: "—" },
  { status: "D1",          desc: "IT & Engineering",          location: "Taiwan",     year: "2022" },
  { status: "University",  desc: "IT — Atma Jaya",            location: "Yogyakarta", year: "2023" },
  { status: "Now",         desc: "Building Your Website",     location: "My Room",    year: "2025" },
];

const About = () => {
  const lineRef   = useRef(null);
  const itemRefs  = useRef([]);
  const [visibleDots, setVisibleDots] = useState([]);
  itemRefs.current = [];

  useEffect(() => {
    const line   = lineRef.current;
    const first  = itemRefs.current[0];
    if (!line || !first) return;

    gsap.fromTo(
      line,
      { strokeDasharray: 1200, strokeDashoffset: 1200 },
      {
        strokeDashoffset: 0,
        scrollTrigger: { trigger: first, start: "top 75%", end: "bottom 10%", scrub: 1 },
        ease: "power2.out",
      }
    );

    itemRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        {
          opacity: 1, x: 0,
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: 1 },
          ease: "power3.out",
        }
      );
    });

    const observers = itemRefs.current.map((el, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisibleDots(v => v.includes(i) ? v : [...v, i]);
        },
        { threshold: 0.4 }
      );
      if (el) obs.observe(el);
      return obs;
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const addRef = (el) => {
    if (el && !itemRefs.current.includes(el)) itemRefs.current.push(el);
  };

  return (
    <div className="py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48 overflow-x-hidden">
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-4">
          Background
        </p>
        <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white mb-20" data-delay="60ms">
          Education Timeline
        </h2>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line */}
          <svg
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 z-0"
            height={educationData.length * 200}
            width="2"
          >
            <line
              x1="1" y1="0" x2="1" y2={educationData.length * 200}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gray-200 dark:text-white/10"
            />
          </svg>

          <div className="relative z-10 flex flex-col gap-40">
            {educationData.map((edu, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  ref={addRef}
                  className={`relative flex items-center ${isLeft ? 'justify-end pr-[54%]' : 'justify-start pl-[54%]'}`}
                >
                  {/* Dot + ring on the center line */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div
                      className={`timeline-dot w-3 h-3 rounded-full bg-violet-500 dark:bg-violet-400 z-20 ${visibleDots.includes(i) ? 'visible' : ''}`}
                    />
                    <div className={`timeline-ring ${visibleDots.includes(i) ? 'visible' : ''}`} />
                  </div>

                  {/* Card */}
                  <div
                    className="w-44 sm:w-52 md:w-56 xl:w-64 p-5 xl:p-6 rounded-2xl
                      bg-white dark:bg-white/[0.03]
                      border border-gray-100 dark:border-white/[0.07]
                      shadow-sm
                      hover:-translate-y-0.5 hover:shadow-md
                      transition-all duration-200 ease-out"
                  >
                    <p className="text-[10px] font-mono text-violet-600 dark:text-violet-400 tracking-widest uppercase mb-1">
                      {edu.year}
                    </p>
                    <h3 className="text-sm xl:text-base font-semibold text-gray-900 dark:text-white mb-1">{edu.status}</h3>
                    <p className="text-xs xl:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{edu.desc}</p>
                    <p className="text-xs xl:text-sm text-teal-600 dark:text-teal-400 mt-2 font-mono">{edu.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
