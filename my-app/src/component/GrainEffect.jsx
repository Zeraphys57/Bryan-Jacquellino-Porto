import { useRef, useEffect } from "react";

const GrainEffect = ({ isDarkMode }) => {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = -400, mouseY = -400;
    let lerpX  = -400, lerpY  = -400;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onLeave = () => {
      mouseX = -400;
      mouseY = -400;
    };

    const tick = () => {
      // Slow lerp — trail terasa seperti dissolve, bukan snap
      lerpX += (mouseX - lerpX) * 0.07;
      lerpY += (mouseY - lerpY) * 0.07;

      const mask = `radial-gradient(circle 150px at ${lerpX}px ${lerpY}px, transparent 0%, transparent 35%, black 85%)`;
      el.style.maskImage       = mask;
      el.style.WebkitMaskImage = mask;

      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove",  onMove,   { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.62"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%" height="100%"
          filter="url(#grain)"
          opacity={isDarkMode ? 0.10 : 0.09}
        />
      </svg>
    </div>
  );
};

export default GrainEffect;
