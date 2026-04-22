import React, { useEffect, useState } from 'react';
import './index.css';
import Header from './component/Header';
import ImBryan from './component/ImBryan';
import Services from './component/Services';
import About from './component/About';
import Projects from './component/Projects';
import Footer from './component/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [scrollProgress, setScrollProgress] = useState(0);

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
      <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-gray-900 dark:text-gray-100 overflow-x-hidden">

        {/* Scroll progress */}
        <div
          className="fixed top-0 left-0 h-[2px] z-[60] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg,#7c3aed,#0d9488)' }}
        />

        {/* CSS gradient orbs — zero JS overhead, GPU-accelerated */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute rounded-full"
            style={{
              width: 700, height: 700,
              background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
              top: '-250px', right: '-200px',
              filter: 'blur(90px)',
              opacity: isDarkMode ? 0.14 : 0.06,
              animation: 'orb-a 22s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 600, height: 600,
              background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)',
              bottom: '-180px', left: '-150px',
              filter: 'blur(90px)',
              opacity: isDarkMode ? 0.10 : 0.05,
              animation: 'orb-b 28s ease-in-out infinite',
            }}
          />
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
                className="font-light text-[clamp(3.2rem,8vw,13rem)] leading-[0.9] tracking-tight text-gray-900 dark:text-white mb-8"
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
                className="flex flex-wrap gap-8 xl:gap-16 mt-14 pt-10 border-t border-gray-100 dark:border-white/[0.06]"
                style={{ animation: 'fade-up 0.6s 0.42s cubic-bezier(0.23,1,0.32,1) both' }}
              >
                {[
                  { n: "100+",    label: "Projects" },
                  { n: "7+",    label: "Tahun belajar" },
                  { n: "D3",    label: "IT — Taiwan" },
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

          {/* CTA block */}
          <section className="py-24 px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48" aria-label="Call to Action">
            <div className="max-w-[1500px] mx-auto">
              <div className="scroll-reveal rounded-3xl bg-gray-900 dark:bg-white/[0.04] border border-gray-800 dark:border-white/[0.08]
                p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10">
                <div>
                  <p className="text-xs font-mono text-violet-400 tracking-[0.2em] uppercase mb-4">Let&apos;s collaborate</p>
                  <h2 className="text-3xl md:text-4xl font-light text-white leading-tight mb-3">
                    Punya project<br />di pikiran?
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed">
                    Aku siap bantu dari konsep sampai live. Ceritain kebutuhanmu dan kita mulai bareng.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href="https://wa.me/+6281351958200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 rounded-full bg-white text-gray-900 text-sm font-medium text-center
                      hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.97]
                      transition-all duration-150 ease-out"
                  >
                    Start a Project →
                  </a>
                  <a
                    href="#projects"
                    className="px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium text-center
                      hover:bg-white/10 active:scale-[0.97]
                      transition-all duration-150 ease-out"
                  >
                    View Work
                  </a>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
