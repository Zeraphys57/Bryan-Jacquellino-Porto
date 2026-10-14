import React, { useEffect, useRef } from "react";

/* Reading progress bar. Writes a transform straight to the DOM once per frame —
   no React state, so scrolling never re-renders the page. */
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? doc.scrollTop / max : 0})`;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-[2px] z-[60] origin-left"
      style={{ transform: "scaleX(0)", background: "linear-gradient(90deg,#7c3aed,#0d9488)" }}
    />
  );
};

export default ScrollProgress;
