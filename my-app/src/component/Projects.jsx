import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const projects = [
  {
    id: 1,
    title: "Bashion Fashion",
    description: "E-commerce fashion platform with modern UI, product filtering, and smooth checkout experience.",
    tags: ["React", "Tailwind", "AOS"],
    gradient: "from-violet-500 to-fuchsia-500",
    link: "https://zeraphys57.github.io/Bashion/",
  },
  {
    id: 2,
    title: "Dentist Workshop",
    description: "Clinic booking system with appointment scheduling, patient management, and responsive design.",
    tags: ["HTML", "CSS", "JS", "Bootstrap", "PHP"],
    gradient: "from-teal-500 to-cyan-500",
    link: "https://zeraphys57.github.io/Klinik-Gigi-UI/",
  },
  {
    id: 3,
    title: "Lawcorps",
    description: "Legal services landing page with consultation booking and secure document submission flow.",
    tags: ["React", "Tailwind", "Vite", "PostgreSQL"],
    gradient: "from-amber-500 to-orange-500",
    link: "#",
  },
  {
    id: 4,
    title: "Tumbuh AI",
    description: "AI-powered business automation platform for Indonesian SMEs — converts WhatsApp & Instagram conversations into automated sales pipelines with RAG-based intelligence.",
    tags: ["AI / RAG", "Meta API", "React", "Node.js", "PostgreSQL"],
    gradient: "from-blue-500 to-indigo-500",
    link: "https://www.tumbuh.tech/",
  },
];

const Projects = () => {
  const [current, setCurrent]         = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef  = useRef(null);
  const dirRef   = useRef(1);
  const firstRun = useRef(true);
  const n = projects.length;

  // Fires synchronously after React commits — card has new content, browser hasn't painted yet
  useLayoutEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    gsap.fromTo(
      cardRef.current,
      { x: dirRef.current * 110, opacity: 0, scale: 0.88, rotation: dirRef.current * 6 },
      {
        x: 0, opacity: 1, scale: 1, rotation: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.38)",   // oscillates 3× — the water-bounce feel
        onComplete: () => setIsAnimating(false),
      }
    );
  }, [current]);

  const go = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    dirRef.current = dir;
    gsap.to(cardRef.current, {
      x: dir * -80, opacity: 0, scale: 0.9, rotation: dir * -5,
      duration: 0.15, ease: "power3.in",
      onComplete: () => setCurrent(c => (c + dir + n) % n),
    });
  };

  const goTo = (idx) => {
    if (idx === current || isAnimating) return;
    dirRef.current = idx > current ? 1 : -1;
    setIsAnimating(true);
    gsap.to(cardRef.current, {
      x: dirRef.current * -80, opacity: 0, scale: 0.9, rotation: dirRef.current * -5,
      duration: 0.15, ease: "power3.in",
      onComplete: () => setCurrent(idx),
    });
  };

  const p    = projects[current];
  const prev = projects[(current - 1 + n) % n];
  const next = projects[(current + 1) % n];

  return (
    <div className="py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48">
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-4">
          Selected Work
        </p>
        <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white mb-16" data-delay="60ms">
          What I&apos;ve Built
        </h2>

        {/* Carousel stage */}
        <div className="relative max-w-[860px] mx-auto">

          {/* Silhouette — prev project peeks behind-left (gradient area only) */}
          <div
            aria-hidden="true"
            className={`absolute top-0 left-0 right-0 h-52 md:h-64 xl:h-80 rounded-2xl bg-gradient-to-br ${prev.gradient} pointer-events-none select-none`}
            style={{
              transform: "translateX(-28px) rotate(-3.5deg) scale(0.9)",
              opacity: 0.45,
              zIndex: 1,
            }}
          />

          {/* Silhouette — next project peeks behind-right (gradient area only) */}
          <div
            aria-hidden="true"
            className={`absolute top-0 left-0 right-0 h-52 md:h-64 xl:h-80 rounded-2xl bg-gradient-to-br ${next.gradient} pointer-events-none select-none`}
            style={{
              transform: "translateX(28px) rotate(3.5deg) scale(0.9)",
              opacity: 0.45,
              zIndex: 2,
            }}
          />

          {/* Current card */}
          <div
            ref={cardRef}
            className="relative z-10 will-change-transform rounded-2xl overflow-hidden
              bg-white dark:bg-[#111114]
              border border-gray-100 dark:border-white/[0.07]
              shadow-xl"
          >
            {/* Gradient visual + nav arrows */}
            <div className={`relative h-52 md:h-64 xl:h-80 bg-gradient-to-br ${p.gradient} opacity-80 dark:opacity-60`}>

              {/* Counter */}
              <span className="absolute top-5 right-5 text-white/70 text-xs font-mono tracking-widest tabular-nums pointer-events-none select-none">
                {String(current + 1).padStart(2, "0")}  /  {String(n).padStart(2, "0")}
              </span>

              {/* Prev */}
              <button
                onClick={() => go(-1)}
                disabled={isAnimating}
                aria-label="Previous project"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                  bg-black/20 backdrop-blur-sm text-white
                  flex items-center justify-center
                  hover:bg-black/35 active:scale-90
                  transition-all duration-150 disabled:opacity-30"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M9.5 2.5l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Next */}
              <button
                onClick={() => go(1)}
                disabled={isAnimating}
                aria-label="Next project"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                  bg-black/20 backdrop-blur-sm text-white
                  flex items-center justify-center
                  hover:bg-black/35 active:scale-90
                  transition-all duration-150 disabled:opacity-30"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M5.5 2.5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-7 md:p-8 xl:p-10">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl md:text-2xl xl:text-3xl font-light text-gray-900 dark:text-white leading-tight">
                  {p.title}
                </h3>
                {p.link !== "#" && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${p.title}`}
                    className="shrink-0 mt-1 text-gray-400 dark:text-gray-600
                      hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-150"
                  >
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2.5 11.5l9-9M5 2.5h6.5V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>

              <p className="text-sm md:text-base xl:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-[10px] font-mono rounded-full
                      bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-500
                      border border-gray-200 dark:border-white/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                disabled={isAnimating}
                aria-label={`Go to project ${i + 1}`}
                className={`rounded-full transition-all duration-200 disabled:cursor-default
                  ${i === current
                    ? "w-6 h-1.5 bg-violet-500"
                    : "w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
