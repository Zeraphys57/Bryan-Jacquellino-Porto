import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/* ── Browser chrome — shared across all mockups ── */
const Chrome = () => (
  <>
    <rect x="16" y="8" width="448" height="264" rx="12" fill="white" fillOpacity="0.10"/>
    <rect x="16" y="8" width="448" height="34" rx="12" fill="white" fillOpacity="0.18"/>
    <rect x="16" y="32" width="448" height="10" fill="white" fillOpacity="0.18"/>
    <circle cx="38" cy="25" r="5" fill="white" fillOpacity="0.62"/>
    <circle cx="54" cy="25" r="5" fill="white" fillOpacity="0.42"/>
    <circle cx="70" cy="25" r="5" fill="white" fillOpacity="0.26"/>
    <rect x="94"  y="16" width="214" height="18" rx="9" fill="white" fillOpacity="0.15"/>
    <rect x="106" y="23" width="72"  height="4"  rx="2" fill="white" fillOpacity="0.38"/>
  </>
);

/* ── Fashion — E-Commerce ── */
const PatternFashion = () => (
  <svg viewBox="0 0 480 280" preserveAspectRatio="xMidYMid slice" fill="none"
    xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <Chrome />

    {/* Site nav */}
    <rect x="16" y="42" width="448" height="26" fill="white" fillOpacity="0.07"/>
    <rect x="28"  y="49" width="48" height="8" rx="3" fill="white" fillOpacity="0.5"/>
    <rect x="178" y="51" width="26" height="6" rx="2" fill="white" fillOpacity="0.2"/>
    <rect x="214" y="51" width="26" height="6" rx="2" fill="white" fillOpacity="0.2"/>
    <rect x="250" y="51" width="26" height="6" rx="2" fill="white" fillOpacity="0.2"/>
    <rect x="286" y="51" width="26" height="6" rx="2" fill="white" fillOpacity="0.2"/>
    <rect x="396" y="48" width="54" height="12" rx="6" fill="white" fillOpacity="0.28"/>

    {/* Hero — left text */}
    <rect x="28" y="80"  width="192" height="13" rx="3" fill="white" fillOpacity="0.55"/>
    <rect x="28" y="100" width="154" height="8"  rx="2" fill="white" fillOpacity="0.28"/>
    <rect x="28" y="113" width="164" height="8"  rx="2" fill="white" fillOpacity="0.22"/>
    <rect x="28" y="132" width="78"  height="22" rx="11" fill="white" fillOpacity="0.3"/>
    <rect x="116" y="132" width="78" height="22" rx="11" fill="white" fillOpacity="0.14"/>

    {/* Hero — right product image */}
    <rect x="268" y="70"  width="176" height="112" rx="10" fill="white" fillOpacity="0.12"/>
    <rect x="280" y="80"  width="152" height="94"  rx="7"  fill="white" fillOpacity="0.09"/>
    <circle cx="356" cy="127" r="28" fill="white" fillOpacity="0.07"/>

    {/* Divider */}
    <line x1="28" y1="186" x2="452" y2="186" stroke="white" strokeOpacity="0.1" strokeWidth="1"/>

    {/* Product grid — 4 cards */}
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x={28 + i*107} y="192" width="96" height="72" rx="7"
          fill="white" fillOpacity={0.13 - i*0.02}/>
        <rect x={36 + i*107} y="199" width="80" height="42" rx="5"
          fill="white" fillOpacity="0.09"/>
        <rect x={36 + i*107} y="247" width="50" height="6" rx="2"
          fill="white" fillOpacity={0.32 - i*0.05}/>
        <rect x={36 + i*107} y="257" width="34" height="5" rx="2"
          fill="white" fillOpacity={0.2  - i*0.03}/>
      </g>
    ))}
  </svg>
);

/* ── Clinic — Booking System ── */
const PatternClinic = () => (
  <svg viewBox="0 0 480 280" preserveAspectRatio="xMidYMid slice" fill="none"
    xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <Chrome />

    {/* App nav */}
    <rect x="16" y="42" width="448" height="26" fill="white" fillOpacity="0.07"/>
    <rect x="28"  y="49" width="56" height="8"  rx="3" fill="white" fillOpacity="0.45"/>
    <rect x="376" y="48" width="74" height="12" rx="6" fill="white" fillOpacity="0.26"/>

    {/* Sidebar divider */}
    <line x1="162" y1="68" x2="162" y2="272" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>

    {/* Sidebar title */}
    <rect x="24" y="76" width="82" height="7" rx="2" fill="white" fillOpacity="0.38"/>

    {/* Appointment cards */}
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x="20" y={92 + i*54} width="134" height="46" rx="8"
          fill="white" fillOpacity={i === 0 ? 0.22 : 0.09}/>
        <rect x="30" y={99  + i*54} width="44" height="6" rx="2"
          fill="white" fillOpacity={i === 0 ? 0.5  : 0.28}/>
        <rect x="30" y={111 + i*54} width="86" height="5" rx="2"
          fill="white" fillOpacity={i === 0 ? 0.32 : 0.16}/>
        <rect x="30" y={121 + i*54} width="62" height="4" rx="2"
          fill="white" fillOpacity={i === 0 ? 0.22 : 0.10}/>
      </g>
    ))}

    {/* Calendar — month header */}
    <rect x="178" y="74" width="96" height="8" rx="2" fill="white" fillOpacity="0.38"/>
    <rect x="424" y="73" width="20" height="10" rx="4" fill="white" fillOpacity="0.15"/>
    <rect x="448" y="73" width="14" height="10" rx="4" fill="white" fillOpacity="0.15"/>

    {/* Day labels */}
    {[0,1,2,3,4,5,6].map(i => (
      <rect key={i} x={178 + i*41} y="92" width="28" height="6" rx="2"
        fill="white" fillOpacity="0.18"/>
    ))}

    {/* Calendar cells — 5 rows × 7 cols */}
    {Array.from({length:5}).map((_,row) =>
      Array.from({length:7}).map((_,col) => {
        const active = row===1 && col===2;
        const today  = row===0 && col===4;
        return (
          <rect key={`${row}-${col}`}
            x={178 + col*41} y={106 + row*32}
            width="28" height="24" rx="6"
            fill="white"
            fillOpacity={active ? 0.38 : today ? 0.18 : 0.08}
          />
        );
      })
    )}
  </svg>
);

/* ── Legal — Landing Page ── */
const PatternLegal = () => (
  <svg viewBox="0 0 480 280" preserveAspectRatio="xMidYMid slice" fill="none"
    xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <Chrome />

    {/* Nav */}
    <rect x="16" y="42" width="448" height="26" fill="white" fillOpacity="0.07"/>
    <rect x="28"  y="49" width="60" height="8"  rx="3" fill="white" fillOpacity="0.45"/>
    <rect x="200" y="51" width="24" height="6"  rx="2" fill="white" fillOpacity="0.2"/>
    <rect x="234" y="51" width="24" height="6"  rx="2" fill="white" fillOpacity="0.2"/>
    <rect x="268" y="51" width="24" height="6"  rx="2" fill="white" fillOpacity="0.2"/>
    <rect x="302" y="51" width="24" height="6"  rx="2" fill="white" fillOpacity="0.2"/>
    <rect x="396" y="48" width="54" height="12" rx="6" fill="white" fillOpacity="0.28"/>

    {/* Hero headline — big text blocks */}
    <rect x="28" y="78"  width="272" height="14" rx="3" fill="white" fillOpacity="0.55"/>
    <rect x="28" y="98"  width="236" height="14" rx="3" fill="white" fillOpacity="0.44"/>
    <rect x="28" y="118" width="200" height="14" rx="3" fill="white" fillOpacity="0.34"/>

    {/* Subtext */}
    <rect x="28" y="142" width="196" height="6" rx="2" fill="white" fillOpacity="0.2"/>
    <rect x="28" y="153" width="172" height="6" rx="2" fill="white" fillOpacity="0.15"/>

    {/* CTA buttons */}
    <rect x="28"  y="172" width="92" height="24" rx="12" fill="white" fillOpacity="0.32"/>
    <rect x="130" y="172" width="92" height="24" rx="12" fill="white" fillOpacity="0.14"/>

    {/* Right — scales of justice illustration */}
    <circle cx="388" cy="118" r="58" fill="white" fillOpacity="0.04"/>
    <circle cx="388" cy="118" r="38" fill="white" fillOpacity="0.06"/>
    <rect x="385" y="88"  width="6" height="34" rx="3" fill="white" fillOpacity="0.28"/>
    <rect x="374" y="88"  width="28" height="4" rx="2" fill="white" fillOpacity="0.32"/>
    <circle cx="368" cy="126" r="10" fill="white" fillOpacity="0.18"/>
    <circle cx="408" cy="122" r="10" fill="white" fillOpacity="0.14"/>
    <line x1="376" y1="92" x2="368" y2="118" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>
    <line x1="400" y1="92" x2="408" y2="114" stroke="white" strokeOpacity="0.22" strokeWidth="1.5"/>

    {/* Feature columns */}
    <line x1="28" y1="206" x2="452" y2="206" stroke="white" strokeOpacity="0.1" strokeWidth="1"/>
    {[0,1,2].map(i => (
      <g key={i}>
        <rect x={28 + i*148} y="213" width="136" height="50" rx="8"
          fill="white" fillOpacity={0.10 - i*0.02}/>
        <rect x={40 + i*148} y="221" width="58"  height="7" rx="2"
          fill="white" fillOpacity={0.38 - i*0.06}/>
        <rect x={40 + i*148} y="233" width="100" height="5" rx="2"
          fill="white" fillOpacity={0.18 - i*0.03}/>
        <rect x={40 + i*148} y="242" width="84"  height="5" rx="2"
          fill="white" fillOpacity={0.14 - i*0.02}/>
      </g>
    ))}
  </svg>
);

/* ── AI — Dashboard ── */
const PatternAI = () => (
  <svg viewBox="0 0 480 280" preserveAspectRatio="xMidYMid slice" fill="none"
    xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
    <Chrome />

    {/* Dashboard nav */}
    <rect x="16" y="42" width="448" height="26" fill="white" fillOpacity="0.07"/>
    <rect x="28"  y="49" width="52" height="8"  rx="3" fill="white" fillOpacity="0.45"/>
    <rect x="100" y="51" width="36" height="6"  rx="2" fill="white" fillOpacity="0.18"/>
    <rect x="146" y="51" width="36" height="6"  rx="2" fill="white" fillOpacity="0.18"/>
    <rect x="192" y="51" width="36" height="6"  rx="2" fill="white" fillOpacity="0.18"/>
    <circle cx="440" cy="55" r="10" fill="white" fillOpacity="0.2"/>

    {/* Metric cards row */}
    {[
      { v: "12.4k", l: "Messages", o: 0.14 },
      { v: "94%",   l: "Resolved", o: 0.11 },
      { v: "3.2×",  l: "ROI",      o: 0.09 },
    ].map((m, i) => (
      <g key={i}>
        <rect x={20 + i*150} y="76" width="138" height="54" rx="8"
          fill="white" fillOpacity={m.o}/>
        <rect x={32 + i*150} y="84" width="52"  height="6" rx="2"
          fill="white" fillOpacity="0.24"/>
        <rect x={32 + i*150} y="96" width="80"  height="13" rx="3"
          fill="white" fillOpacity={0.48 - i*0.06}/>
        <rect x={32 + i*150} y="115" width="46" height="5" rx="2"
          fill="white" fillOpacity="0.16"/>
      </g>
    ))}

    {/* Vertical divider */}
    <line x1="182" y1="140" x2="182" y2="272" stroke="white" strokeOpacity="0.1" strokeWidth="1"/>

    {/* Chat panel */}
    <rect x="24" y="142" width="72" height="6" rx="2" fill="white" fillOpacity="0.28"/>
    {/* Bot bubbles */}
    <rect x="24" y="156" width="134" height="20" rx="8" fill="white" fillOpacity="0.18"/>
    <rect x="24" y="182" width="106" height="20" rx="8" fill="white" fillOpacity="0.12"/>
    {/* User bubbles (right-aligned) */}
    <rect x="58"  y="208" width="100" height="20" rx="8" fill="white" fillOpacity="0.22"/>
    <rect x="72"  y="234" width="88"  height="20" rx="8" fill="white" fillOpacity="0.16"/>

    {/* Bar chart */}
    <rect x="196" y="142" width="58" height="6" rx="2" fill="white" fillOpacity="0.28"/>
    {[58,88,44,112,70,96,130].map((h, i) => (
      <rect key={i}
        x={196 + i*38} y={264-h} width="26" height={h} rx="4"
        fill="white" fillOpacity={0.18 + i*0.04}/>
    ))}
    <line x1="192" y1="264" x2="462" y2="264"
      stroke="white" strokeOpacity="0.14" strokeWidth="1"/>
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

              {PATTERNS[p.pattern]}

              {/* Counter */}
              <span className="absolute bottom-14 right-5 text-white/60 text-xs font-mono tracking-widest tabular-nums pointer-events-none select-none">
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
