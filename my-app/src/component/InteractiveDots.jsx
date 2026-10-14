import { useRef, useEffect } from "react";

const SPACING       = 32;
const DOT_BASE_R    = 0.6;
const PUSH_RADIUS   = 90;
const PUSH_STRENGTH = 38;

/* Dot grid that parts around the cursor. The animation loop only runs while dots
   are moving; touch screens and reduced-motion users get one static frame. */
const InteractiveDots = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const interactive =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    let mouseX = -999, mouseY = -999;
    let dots = [];
    let raf = 0;

    const build = () => {
      dots = [];
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push({ ox: c * SPACING, oy: r * SPACING, x: c * SPACING, y: r * SPACING });
    };

    /* Draws one frame; returns true while any dot is still travelling */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = isDarkMode ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.28)";
      let moving = false;
      for (const d of dots) {
        const dx   = d.ox - mouseX;
        const dy   = d.oy - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let tx = d.ox, ty = d.oy;
        if (dist < PUSH_RADIUS && dist > 0) {
          const force = (1 - dist / PUSH_RADIUS) * PUSH_STRENGTH;
          tx = d.ox + (dx / dist) * force;
          ty = d.oy + (dy / dist) * force;
        }

        d.x += (tx - d.x) * 0.14;   // spring toward target
        d.y += (ty - d.y) * 0.14;
        if (Math.abs(tx - d.x) > 0.05 || Math.abs(ty - d.y) > 0.05) moving = true;

        const closeness = Math.max(0, 1 - dist / 110);
        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_BASE_R + closeness * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      return moving;
    };

    const tick = () => {
      // Stop once every dot has settled; the next mouse move wakes the loop again
      raf = draw() ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      build();
      draw();
    };

    const onMove  = (e) => { mouseX = e.clientX; mouseY = e.clientY; wake(); };
    const onLeave = ()  => { mouseX = -999; mouseY = -999; wake(); };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (interactive) {
      document.addEventListener("mousemove",  onMove,  { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

export default InteractiveDots;
