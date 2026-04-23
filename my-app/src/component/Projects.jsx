import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/* ── Abstract SVG visual per project ── */
const PatternFashion = () => (
  <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    {/* Product cards grid */}
    <rect x="32"  y="28"  width="118" height="158" rx="10" fill="white" fillOpacity="0.13"/>
    <rect x="168" y="16"  width="118" height="168" rx="10" fill="white" fillOpacity="0.10"/>
    <rect x="304" y="24"  width="118" height="160" rx="10" fill="white" fillOpacity="0.08"/>
    {/* Image placeholders inside cards */}
    <rect x="44"  y="40"  width="94"  height="88"  rx="6"  fill="white" fillOpacity="0.15"/>
    <rect x="180" y="28"  width="94"  height="94"  rx="6"  fill="white" fillOpacity="0.13"/>
    <rect x="316" y="36"  width="94"  height="86"  rx="6"  fill="white" fillOpacity="0.10"/>
    {/* Price tags */}
    <rect x="44"  y="142" width="52"  height="10"  rx="4"  fill="white" fillOpacity="0.25"/>
    <rect x="180" y="140" width="44"  height="10"  rx="4"  fill="white" fillOpacity="0.22"/>
    <rect x="316" y="141" width="48"  height="10"  rx="4"  fill="white" fillOpacity="0.18"/>
    <rect x="44"  y="158" width="36"  height="8"   rx="4"  fill="white" fillOpacity="0.15"/>
    <rect x="180" y="156" width="40"  height="8"   rx="4"  fill="white" fillOpacity="0.12"/>
    <rect x="316" y="157" width="34"  height="8"   rx="4"  fill="white" fillOpacity="0.10"/>
    {/* Filter / nav bar */}
    <rect x="32"  y="204" width="416" height="30"  rx="8"  fill="white" fillOpacity="0.09"/>
    <rect x="44"  y="211" width="48"  height="10"  rx="5"  fill="white" fillOpacity="0.2"/>
    <rect x="104" y="211" width="40"  height="10"  rx="5"  fill="white" fillOpacity="0.12"/>
    <rect x="156" y="211" width="52"  height="10"  rx="5"  fill="white" fillOpacity="0.12"/>
    {/* Cart badge */}
    <circle cx="432" cy="50" r="28"   fill="white" fillOpacity="0.08"/>
    <circle cx="432" cy="50" r="14"   fill="white" fillOpacity="0.10"/>
    {/* Decorative circle bg */}
    <circle cx="460" cy="260" r="70"  fill="white" fillOpacity="0.05"/>
  </svg>
);

const PatternClinic = () => (
  <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    {/* Calendar grid */}
    {[0,1,2,3,4,5].map(col =>
      [0,1,2,3].map(row => {
        const active = col === 2 && row === 1;
        return (
          <rect key={`${col}-${row}`}
            x={28 + col * 58} y={24 + row * 54}
            width="50" height="46" rx="8"
            fill="white" fillOpacity={active ? 0.28 : 0.08}
          />
        );
      })
    )}
    {/* Day labels */}
    {[0,1,2,3,4,5].map(i => (
      <rect key={i} x={38 + i * 58} y={12} width="28" height="8" rx="4" fill="white" fillOpacity="0.18"/>
    ))}
    {/* Appointment card — right side */}
    <rect x="384" y="16" width="84" height="248" rx="12" fill="white" fillOpacity="0.14"/>
    <rect x="394" y="32" width="64" height="10"  rx="4"  fill="white" fillOpacity="0.3"/>
    <rect x="394" y="50" width="48" height="8"   rx="4"  fill="white" fillOpacity="0.2"/>
    <rect x="394" y="72" width="64" height="48"  rx="8"  fill="white" fillOpacity="0.12"/>
    <rect x="394" y="72" width="64" height="48"  rx="8"  fill="white" fillOpacity="0.12"/>
    {/* Plus / cross icon */}
    <rect x="418" y="142" width="8"  height="28" rx="4"  fill="white" fillOpacity="0.4"/>
    <rect x="406" y="152" width="30" height="8"  rx="4"  fill="white" fillOpacity="0.4"/>
    {/* Decorative circle */}
    <circle cx="20" cy="280" r="60"  fill="white" fillOpacity="0.05"/>
  </svg>
);

const PatternLegal = () => (
  <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    {/* Document left column */}
    <rect x="28"  y="16" width="194" height="248" rx="12" fill="white" fillOpacity="0.11"/>
    {/* Document right column */}
    <rect x="242" y="16" width="194" height="248" rx="12" fill="white" fillOpacity="0.08"/>
    {/* Header bar left */}
    <rect x="44"  y="32" width="160" height="14" rx="5"  fill="white" fillOpacity="0.25"/>
    {/* Text lines left */}
    {[0,1,2,3,4,5,6,7,8].map(i => (
      <rect key={i} x="44" y={58 + i * 22} width={i % 3 === 2 ? 90 : 160} height="8" rx="4" fill="white" fillOpacity="0.16"/>
    ))}
    {/* Header bar right */}
    <rect x="258" y="32" width="160" height="14" rx="5"  fill="white" fillOpacity="0.2"/>
    {/* Text lines right */}
    {[0,1,2,3,4,5,6].map(i => (
      <rect key={i} x="258" y={58 + i * 22} width={i % 4 === 1 ? 80 : 160} height="8" rx="4" fill="white" fillOpacity="0.12"/>
    ))}
    {/* Divider */}
    <line x1="232" y1="16" x2="232" y2="264" stroke="white" strokeOpacity="0.08" strokeWidth="2"/>
    {/* Scale of justice */}
    <line x1="50"  y1="232" x2="100" y2="232" stroke="white" strokeOpacity="0.25" strokeWidth="2"/>
    <line x1="75"  y1="210" x2="75"  y2="248" stroke="white" strokeOpacity="0.25" strokeWidth="2"/>
    <circle cx="50"  cy="240" r="10"  fill="white" fillOpacity="0.15"/>
    <circle cx="100" cy="240" r="10"  fill="white" fillOpacity="0.15"/>
    {/* Decorative circles */}
    <circle cx="460" cy="260" r="60"  fill="white" fillOpacity="0.05"/>
    <circle cx="460" cy="10"  r="40"  fill="white" fillOpacity="0.05"/>
  </svg>
);

const PatternAI = () => (
  <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    {/* Node positions: center, and ring around */}
    {[
      { cx: 240, cy: 140, r: 22, o: 0.28 }, // center
      { cx: 100, cy: 80,  r: 13, o: 0.18 },
      { cx: 380, cy: 80,  r: 13, o: 0.18 },
      { cx: 80,  cy: 200, r: 13, o: 0.18 },
      { cx: 400, cy: 200, r: 13, o: 0.18 },
      { cx: 240, cy: 28,  r: 10, o: 0.14 },
      { cx: 155, cy: 230, r: 10, o: 0.14 },
      { cx: 325, cy: 230, r: 10, o: 0.14 },
      { cx: 448, cy: 140, r: 9,  o: 0.10 },
      { cx: 32,  cy: 140, r: 9,  o: 0.10 },
    ].map((n, i) => (
      <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill="white" fillOpacity={n.o}/>
    ))}
    {/* Edges */}
    {[
      [240,140, 100,80], [240,140, 380,80],
      [240,140, 80,200], [240,140, 400,200],
      [100,80,  240,28], [380,80,  240,28],
      [80,200,  155,230],[400,200, 325,230],
      [100,80,  32,140], [380,80,  448,140],
      [240,140, 32,140], [240,140, 448,140],
    ].map(([x1,y1,x2,y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="white" strokeOpacity="0.12" strokeWidth="1.5"/>
    ))}
    {/* Moving data dots */}
    <circle cx="170" cy="110" r="4" fill="white" fillOpacity="0.55"/>
    <circle cx="310" cy="110" r="4" fill="white" fillOpacity="0.45"/>
    <circle cx="160" cy="170" r="4" fill="white" fillOpacity="0.50"/>
    <circle cx="320" cy="170" r="3" fill="white" fillOpacity="0.38"/>
    <circle cx="240" cy="84"  r="3" fill="white" fillOpacity="0.42"/>
    {/* Outer pulse ring */}
    <circle cx="240" cy="140" r="38"  fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
    <circle cx="240" cy="140" r="60"  fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1"/>
  </svg>
);

const PATTERNS = {
  fashion: <PatternFashion />,
  clinic:  <PatternClinic />,
  legal:   <PatternLegal />,
  ai:      <PatternAI />,
};

const projects = [
  {
    id: 1,
    title: "Bashion Fashion",
    category: "E-Commerce Platform",
    description: "E-commerce fashion platform with modern UI, product filtering, and smooth checkout experience.",
    tags: ["React", "Tailwind", "AOS"],
    gradient: "from-violet-500 to-fuchsia-500",
    link: "https://zeraphys57.github.io/Bashion/",
    pattern: "fashion",
  },
  {
    id: 2,
    title: "Dentist Workshop",
    category: "Clinic Booking System",
    description: "Clinic booking system with appointment scheduling, patient management, and responsive design.",
    tags: ["HTML", "CSS", "JS", "Bootstrap", "PHP"],
    gradient: "from-teal-500 to-cyan-500",
    link: "https://zeraphys57.github.io/Klinik-Gigi-UI/",
    pattern: "clinic",
  },
  {
    id: 3,
    title: "Lawcorps",
    category: "Legal Services Landing",
    description: "Legal services landing page with consultation booking and secure document submission flow.",
    tags: ["React", "Tailwind", "Vite", "PostgreSQL"],
    gradient: "from-amber-500 to-orange-500",
    link: "#",
    pattern: "legal",
  },
  {
    id: 4,
    title: "Tumbuh AI",
    category: "AI Automation Platform",
    description: "AI-powered business automation platform for Indonesian SMEs — converts WhatsApp & Instagram conversations into automated sales pipelines with RAG-based intelligence.",
    tags: ["AI / RAG", "Meta API", "React", "Node.js", "PostgreSQL"],
    gradient: "from-blue-500 to-indigo-500",
    link: "https://www.tumbuh.tech/",
    pattern: "ai",
  },
];

const Projects = () => {
  const [current, setCurrent]         = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef  = useRef(null);
  const dirRef   = useRef(1);
  const firstRun = useRef(true);
  const n = projects.length;

  useLayoutEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    gsap.fromTo(
      cardRef.current,
      { x: dirRef.current * 110, opacity: 0, scale: 0.88, rotation: dirRef.current * 6 },
      {
        x: 0, opacity: 1, scale: 1, rotation: 0,
        duration: 0.9,
        ease: "elastic.out(1, 0.38)",
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
    <div className="py-16 md:py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48">
      <div className="max-w-[1500px] mx-auto">

        <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-4">
          Selected Work
        </p>
        <h2 className="scroll-reveal text-3xl md:text-4xl xl:text-5xl font-light text-gray-900 dark:text-white mb-16" data-delay="60ms">
          What I&apos;ve Built
        </h2>

        {/* Carousel stage */}
        <div className="relative max-w-[860px] mx-auto">

          {/* Silhouette prev */}
          <div aria-hidden="true"
            className={`hidden sm:block absolute inset-0 rounded-2xl bg-gradient-to-br ${prev.gradient} pointer-events-none select-none`}
            style={{ transform: "translateX(-28px) rotate(-3.5deg) scale(0.9)", opacity: 0.45, zIndex: 1 }}
          />
          {/* Silhouette next */}
          <div aria-hidden="true"
            className={`hidden sm:block absolute inset-0 rounded-2xl bg-gradient-to-br ${next.gradient} pointer-events-none select-none`}
            style={{ transform: "translateX(28px) rotate(3.5deg) scale(0.9)", opacity: 0.45, zIndex: 2 }}
          />

          {/* Current card */}
          <div
            ref={cardRef}
            className="relative z-10 will-change-transform rounded-2xl overflow-hidden
              bg-white dark:bg-[#111114]
              border border-gray-100 dark:border-white/[0.07]
              shadow-xl"
          >
            {/* Visual area */}
            <div className={`relative h-52 md:h-64 xl:h-80 bg-gradient-to-br ${p.gradient} overflow-hidden`}>

              {/* Abstract pattern */}
              {PATTERNS[p.pattern]}

              {/* Large faint project title watermark */}
              <span aria-hidden="true"
                className="absolute -bottom-4 -right-4 text-[11vw] font-black leading-none
                  select-none pointer-events-none text-white/[0.07] tracking-tight whitespace-nowrap">
                {p.title.split(" ")[0]}
              </span>

              {/* Category badge */}
              <span className="absolute top-5 left-5 px-3 py-1 rounded-full text-[10px] font-mono
                tracking-widest uppercase bg-black/20 backdrop-blur-sm text-white/80">
                {p.category}
              </span>

              {/* Counter */}
              <span className="absolute top-5 right-5 text-white/60 text-xs font-mono tracking-widest tabular-nums pointer-events-none select-none">
                {String(current + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>

              {/* Prev */}
              <button onClick={() => go(-1)} disabled={isAnimating} aria-label="Previous project"
                className="absolute left-4 bottom-5 w-9 h-9 rounded-full
                  bg-black/20 backdrop-blur-sm text-white
                  flex items-center justify-center
                  hover:bg-black/35 active:scale-90
                  transition-all duration-150 disabled:opacity-30">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M9.5 2.5l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Next */}
              <button onClick={() => go(1)} disabled={isAnimating} aria-label="Next project"
                className="absolute right-4 bottom-5 w-9 h-9 rounded-full
                  bg-black/20 backdrop-blur-sm text-white
                  flex items-center justify-center
                  hover:bg-black/35 active:scale-90
                  transition-all duration-150 disabled:opacity-30">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M5.5 2.5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-7 md:p-8 xl:p-10">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl md:text-2xl xl:text-3xl font-light text-gray-900 dark:text-white leading-tight">
                  {p.title}
                </h3>
                {p.link !== "#" && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    aria-label={`View ${p.title}`}
                    className="shrink-0 mt-1 text-gray-400 dark:text-gray-600
                      hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-150">
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
                  <span key={tag}
                    className="px-2.5 py-0.5 text-[10px] font-mono rounded-full
                      bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-500
                      border border-gray-200 dark:border-white/8">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {projects.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} disabled={isAnimating}
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
