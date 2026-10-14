import React, { useEffect, useRef } from "react";
import InteractiveDots from "./InteractiveDots";

/* Soft radial gradients instead of filter: blur() — same glow, a fraction of the GPU cost. */
const glow = (rgb) =>
  `radial-gradient(circle, rgba(${rgb},0.9) 0%, rgba(${rgb},0.35) 35%, rgba(${rgb},0) 70%)`;

const ORBS = [
  { cls: "orb-a", rgb: "124,58,237", size: 750, pos: { top: -280, right: -220 },     op: [0.18, 0.20] },
  { cls: "orb-b", rgb: "13,148,136",  size: 650, pos: { bottom: -200, left: -160 },  op: [0.14, 0.16] },
  { cls: "orb-c", rgb: "168,85,247",  size: 500, pos: { top: "38%", left: -120 },    op: [0.10, 0.12] },
  { cls: "orb-d", rgb: "6,182,212",   size: 420, pos: { bottom: "20%", right: -80 }, op: [0.09, 0.11] },
];

/* Fixed layer behind the page: drifting orbs (desktop), a cursor-reactive dot grid,
   a slow orb that follows the mouse, and a static grain texture. */
const AmbientBackground = ({ isDarkMode }) => {
  const cursorOrbRef = useRef(null);

  /* Cursor-following orb — runs only while it is catching up to the pointer */
  useEffect(() => {
    const orb = cursorOrbRef.current;
    if (!orb || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let lx = mx, ly = my;
    let raf = 0;
    const tick = () => {
      lx += (mx - lx) * 0.05;
      ly += (my - ly) * 0.05;
      orb.style.transform = `translate(${lx - 160}px,${ly - 160}px)`;
      raf = Math.abs(mx - lx) + Math.abs(my - ly) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    orb.style.transform = `translate(${lx - 160}px,${ly - 160}px)`;
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {ORBS.map((o) => (
        <div
          key={o.cls}
          className={`${o.cls} absolute rounded-full`}
          style={{ width: o.size, height: o.size, ...o.pos, background: glow(o.rgb), opacity: isDarkMode ? o.op[0] : o.op[1] }}
        />
      ))}

      <InteractiveDots isDarkMode={isDarkMode} />

      <div
        ref={cursorOrbRef}
        className="absolute top-0 left-0 rounded-full hidden [@media(pointer:fine)]:block"
        style={{
          width: 320, height: 320,
          background: "radial-gradient(circle, rgba(124,58,237,0.8) 0%, rgba(13,148,136,0.45) 45%, rgba(13,148,136,0) 70%)",
          opacity: isDarkMode ? 0.13 : 0.11,
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
  );
};

export default AmbientBackground;
