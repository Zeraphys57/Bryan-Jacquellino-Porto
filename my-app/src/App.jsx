import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import Header from './component/Header';
import Cursor from './component/Cursor';
import InteractiveDots from './component/InteractiveDots';
import ImBryan from './component/ImBryan';
import Services from './component/Services';
import About from './component/About';
import Projects from './component/Projects';
import Process from './component/Process';
import Footer from './component/Footer';

import SecretPitch from './component/SecretPitch';
function App() {
  const cursorOrbRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ctaPos, setCtaPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? (doc.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = e.target.dataset.delay ?? '0ms';
            e.target.style.animationDelay = delay;
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Cursor-following ambient orb — direct DOM, zero re-render
  useEffect(() => {
    const orb = cursorOrbRef.current;
    if (!orb || !window.matchMedia("(pointer: fine)").matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let lx = mx, ly = my;
    let raf;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      lx += (mx - lx) * 0.05;
      ly += (my - ly) * 0.05;
      orb.style.transform = `translate(${lx - 160}px,${ly - 160}px)`;
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    console.log(
      "%c👋 Hey, you found the console!",
      "font-size:18px;font-weight:bold;color:#7c3aed"
    );
    console.log(
      "%cBuilt with React + Tailwind + Three.js. Want to collaborate?\n→ bryanjacquellino5757@gmail.com",
      "font-size:13px;color:#6b7280"
    );
  }, []);

  return (
    <>
      <Cursor />
      <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-gray-900 dark:text-gray-100 overflow-x-hidden">

        {/* Scroll progress */}
        <div
          className="fixed top-0 left-0 h-[2px] z-[60] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg,#7c3aed,#0d9488)' }}
        />

        {/* Ambient background layers */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">

          {/* Orb 1 — violet, top-right */}
          <div className="absolute rounded-full" style={{
            width: 750, height: 750,
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            top: '-280px', right: '-220px',
            filter: 'blur(100px)',
            opacity: isDarkMode ? 0.18 : 0.20,
            animation: 'orb-a 22s ease-in-out infinite',
          }} />

          {/* Orb 2 — teal, bottom-left */}
          <div className="absolute rounded-full" style={{
            width: 650, height: 650,
            background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)',
            bottom: '-200px', left: '-160px',
            filter: 'blur(100px)',
            opacity: isDarkMode ? 0.14 : 0.16,
            animation: 'orb-b 28s ease-in-out infinite',
          }} />

          {/* Orb 3 — fuchsia, center-left */}
          <div className="absolute rounded-full" style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            top: '38%', left: '-120px',
            filter: 'blur(110px)',
            opacity: isDarkMode ? 0.10 : 0.12,
            animation: 'orb-c 32s ease-in-out infinite',
          }} />

          {/* Orb 4 — cyan, bottom-right */}
          <div className="absolute rounded-full" style={{
            width: 420, height: 420,
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            bottom: '20%', right: '-80px',
            filter: 'blur(100px)',
            opacity: isDarkMode ? 0.09 : 0.11,
            animation: 'orb-d 36s ease-in-out infinite',
          }} />

          {/* Interactive dot grid — reacts to cursor */}
          <InteractiveDots isDarkMode={isDarkMode} />

          {/* Cursor-following ambient orb */}
          <div ref={cursorOrbRef}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 320, height: 320,
              background: 'radial-gradient(circle, #7c3aed 0%, #0d9488 60%, transparent 100%)',
              filter: 'blur(72px)',
              opacity: isDarkMode ? 0.13 : 0.11,
              top: 0, left: 0,
            }}
          />

          {/* Noise grain — static texture */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" opacity={isDarkMode ? 0.10 : 0.09} />
          </svg>

        </div>

        <div className="relative z-10">
          <Header toggleDarkMode={() => setIsDarkMode(d => !d)} isDarkMode={isDarkMode} />

          {/* ── Hero ── */}
          <main className="relative flex flex-col justify-center min-h-screen px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48" aria-label="Hero">
            <div className="max-w-[1500px] w-full mx-auto pt-28 pb-20">

              <p
                className="text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-6"
                style={{ animation: 'fade-up 0.5s 0.05s cubic-bezier(0.23,1,0.32,1) both' }}
              >
                Available for freelance
              </p>

              <h1
                data-cursor-xl
                className="font-light text-[clamp(3.2rem,8vw,13rem)] leading-[0.9] tracking-tight text-gray-900 dark:text-white mb-8 w-fit"
                style={{ animation: 'fade-up 0.6s 0.12s cubic-bezier(0.23,1,0.32,1) both' }}
              >
                Bryan<br />Jacquellino
              </h1>

              <p
                className="text-lg md:text-xl xl:text-2xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed mb-12"
                style={{ animation: 'fade-up 0.6s 0.22s cubic-bezier(0.23,1,0.32,1) both' }}
              >
                Freelance web developer crafting fast, beautiful websites — from design to deployment.
              </p>

              <div
                className="flex flex-wrap gap-3"
                style={{ animation: 'fade-up 0.6s 0.32s cubic-bezier(0.23,1,0.32,1) both' }}
              >
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium
                    transition-all duration-150 ease-out
                    hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
                >
                  View Work
                </a>
                <a
                  href="https://wa.me/+6281351958200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-gray-200 dark:border-white/10
                    text-gray-700 dark:text-gray-300 text-sm font-medium
                    transition-all duration-150 ease-out
                    hover:-translate-y-0.5 hover:bg-gray-100 dark:hover:bg-white/5 active:scale-[0.97]"
                >
                  Get in Touch
                </a>
              </div>

              {/* Stats strip */}
              <div
                className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-8 xl:gap-16 mt-14 pt-10 border-t border-gray-100 dark:border-white/[0.06]"
                style={{ animation: 'fade-up 0.6s 0.42s cubic-bezier(0.23,1,0.32,1) both' }}
              >
                {[
                  { n: "50+",    label: "Projects" },
                  { n: "7 Years",    label: "Experience" },
                  { n: "Education",    label: "IT — Taiwan" },
                  { n: "Open",  label: "For freelance" },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl md:text-3xl xl:text-4xl font-light text-gray-900 dark:text-white">{s.n}</p>
                    <p className="text-[10px] xl:text-xs font-mono text-gray-400 dark:text-gray-600 tracking-widest uppercase mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll cue */}
            <button
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                text-gray-400 dark:text-gray-600 cursor-pointer select-none border-none bg-transparent p-0"
              style={{ animation: 'bounce-y 2.2s ease-in-out infinite' }}
              onClick={() => document.getElementById('bio')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Scroll down"
            >
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase">scroll</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </main>

          <section id="bio" aria-label="About Me"><ImBryan /></section>
          <section id="services" aria-label="Services"><Services /></section>
          <section id="education" aria-label="Education Timeline"><About /></section>
          <section id="projects" aria-label="Selected Projects"><Projects /></section>
          <section id="process" aria-label="My Process"><Process /></section>

          {/* CTA block */}
          <section
            className="min-h-screen relative flex items-center overflow-hidden
                       bg-[#fafafa] dark:bg-[#030712]
                       px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48"
            aria-label="Call to Action"
            onMouseMove={e => {
              const r = e.currentTarget.getBoundingClientRect();
              setCtaPos({ x: e.clientX - r.left, y: e.clientY - r.top });
            }}
          >
            {/* Cursor spotlight */}
            <div className="pointer-events-none absolute inset-0 z-0"
                 style={{ background: `radial-gradient(520px circle at ${ctaPos.x}px ${ctaPos.y}px, rgba(124,58,237,${isDarkMode ? '0.11' : '0.06'}), transparent 65%)` }} />

            {/* Ambient orbs */}
            <div className="absolute pointer-events-none rounded-full"
                 style={{ width: 700, height: 700, top: -220, right: -180,
                   background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
                   filter: 'blur(100px)', opacity: isDarkMode ? 0.14 : 0.07,
                   animation: 'orb-a 20s ease-in-out infinite' }} />
            <div className="absolute pointer-events-none rounded-full"
                 style={{ width: 600, height: 600, bottom: -160, left: -140,
                   background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)',
                   filter: 'blur(100px)', opacity: isDarkMode ? 0.10 : 0.06,
                   animation: 'orb-b 26s ease-in-out infinite' }} />

            {/* Background word — cursor acts as flashlight */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden"
                 style={{
                   maskImage: `radial-gradient(circle 340px at ${ctaPos.x}px ${ctaPos.y}px, black 0%, rgba(0,0,0,0.13) 75%)`,
                   WebkitMaskImage: `radial-gradient(circle 340px at ${ctaPos.x}px ${ctaPos.y}px, black 0%, rgba(0,0,0,0.13) 75%)`,
                 }}>
              <span aria-hidden="true"
                    className="absolute -bottom-6 right-0 text-[22vw] font-black leading-none select-none
                               tracking-tight pointer-events-none
                               text-gray-900/[0.22] dark:text-white/[0.14]">
                START.
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[1500px] mx-auto w-full">
              <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-8">
                Let&apos;s collaborate
              </p>

              <h2 className="scroll-reveal text-[clamp(2.2rem,7vw,8.5rem)] font-light
                             leading-[0.92] tracking-tight text-gray-900 dark:text-white mb-10"
                  data-delay="60ms">
                Punya project<br />
                <em className="not-italic text-violet-600 dark:text-violet-400">di pikiran?</em>
              </h2>

              <p className="scroll-reveal text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed mb-14"
                 data-delay="120ms">
                Siap bantu dari konsep sampai live. Ceritain kebutuhanmu dan kita mulai wujudkan.
              </p>

              <div className="scroll-reveal flex flex-wrap gap-4" data-delay="180ms">
                <a
                  href="https://wa.me/+6281351958200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full text-white text-sm font-medium
                             bg-gray-900 dark:bg-violet-600
                             hover:-translate-y-0.5
                             hover:bg-gray-700 dark:hover:bg-violet-500
                             hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(124,58,237,0.45)]
                             active:scale-[0.97] transition-all duration-150 ease-out"
                >
                  Start a Project →
                </a>
                <a
                  href="#projects"
                  className="px-8 py-4 rounded-full text-sm font-medium
                             border border-gray-200 dark:border-white/15
                             text-gray-700 dark:text-white
                             hover:bg-gray-100 dark:hover:bg-white/[0.07]
                             hover:border-gray-300 dark:hover:border-white/25
                             active:scale-[0.97] transition-all duration-150 ease-out"
                >
                  View Work
                </a>
              </div>
            </div>
          </section>

          <Footer />

          <SecretPitch />
        </div>
      </div>
    </>
  );
}

export default App;
