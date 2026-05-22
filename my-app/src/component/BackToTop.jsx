import React, { useEffect, useState } from "react";

/* A back-to-#hero anchor wrapped in a scroll-progress ring.
   Reveals itself once the page is scrolled past the hero. */
const R = 21;                       // ring radius
const CIRC = 2 * Math.PI * R;

const BackToTop = () => {
  const [progress, setProgress] = useState(0);
  const [shown, setShown]       = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? doc.scrollTop / total : 0);
      setShown(doc.scrollTop > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = (e) => {
    e.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <a
      href="#hero"
      onClick={toTop}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-30 w-12 h-12
        transition-[opacity,transform] duration-300 ease-out
        ${shown
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"}`}
    >
      {/* Scroll-progress ring */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24" cy="24" r={R} fill="none" strokeWidth="2"
          className="stroke-gray-200 dark:stroke-white/10"
        />
        <circle
          cx="24" cy="24" r={R} fill="none" strokeWidth="2" strokeLinecap="round"
          stroke="url(#btt-grad)"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
          style={{ transition: "stroke-dashoffset 0.12s linear" }}
        />
        <defs>
          <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#0d9488" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center disc + arrow */}
      <span
        className="absolute inset-[5px] rounded-full flex items-center justify-center
          bg-white dark:bg-[#18181b]
          border border-gray-100 dark:border-white/10
          shadow-lg transition-transform duration-150 ease-out
          group-hover:scale-105 group-active:scale-95"
      >
        <svg
          width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"
          className="text-gray-700 dark:text-gray-200
            transition-transform duration-150 group-hover:-translate-y-0.5"
        >
          <path d="M7.5 12V3M3.5 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
};

export default BackToTop;
