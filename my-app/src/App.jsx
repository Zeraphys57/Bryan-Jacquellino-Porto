import React, { useEffect, useState } from 'react';
import Cursor from './component/Cursor';
import ScrollProgress from './component/ScrollProgress';
import AmbientBackground from './component/AmbientBackground';
import Header from './component/Header';
import Hero from './component/Hero';
import Projects from './component/Projects';
import Services from './component/Services';
import Process from './component/Process';
import About from './component/About';
import FAQ from './component/FAQ';
import ContactCTA from './component/ContactCTA';
import Footer from './component/Footer';
import FloatingWhatsApp from './component/FloatingWhatsApp';
import SecretPitch from './component/SecretPitch';
import SecretPitchAUS from './component/SecretPitchAUS';

const REVEAL = '.scroll-reveal, .reveal-line-x, .reveal-line-y';

/* Adds .visible to .scroll-reveal / .reveal-line-* elements as they enter the viewport.
   A MutationObserver also picks up elements mounted later (e.g. after a language switch),
   so nothing is left waiting at opacity 0. */
const useScrollReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.animationDelay = e.target.dataset.delay ?? '0ms';
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const watch = (root) => {
      if (root.matches?.(REVEAL) && !root.classList.contains('visible')) obs.observe(root);
      root.querySelectorAll?.(REVEAL).forEach((el) => {
        if (!el.classList.contains('visible')) obs.observe(el);
      });
    };
    watch(document.body);
    const mo = new MutationObserver((records) => {
      records.forEach((r) => r.addedNodes.forEach((n) => { if (n.nodeType === 1) watch(n); }));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { obs.disconnect(); mo.disconnect(); };
  }, []);
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
    } catch { /* storage blocked */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    try { localStorage.setItem("theme", isDarkMode ? "dark" : "light"); } catch { /* storage blocked */ }
  }, [isDarkMode]);

  useScrollReveal();

  useEffect(() => {
    console.log(
      "%c👋 Hey, you found the console!",
      "font-size:18px;font-weight:bold;color:#7c3aed"
    );
    console.log(
      "%cBuilt with React + Tailwind. Want to collaborate?\n→ jacquellinobryan@gmail.com",
      "font-size:13px;color:#6b7280"
    );
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-gray-900 dark:text-gray-100 overflow-x-clip">
        <AmbientBackground isDarkMode={isDarkMode} />

        <div className="relative z-10">
          <Header toggleDarkMode={() => setIsDarkMode((d) => !d)} isDarkMode={isDarkMode} />

          <main id="main">
            <Hero />
            <Projects />
            <Services />
            <Process />
            <About />
            <FAQ />
            <ContactCTA isDarkMode={isDarkMode} />
          </main>

          <Footer />
        </div>

        <FloatingWhatsApp />
        <SecretPitch />
        <SecretPitchAUS />
      </div>
    </>
  );
}

export default App;
