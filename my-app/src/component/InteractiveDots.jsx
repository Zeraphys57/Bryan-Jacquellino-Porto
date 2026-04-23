import { useRef, useEffect } from "react";

const SPACING       = 32;
const DOT_BASE_R    = 0.6;
const PUSH_RADIUS   = 90;
const PUSH_STRENGTH = 38;

const InteractiveDots = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    let W = 0, H = 0;
    let mouseX = -999, mouseY = -999;
    let dots = [];
    let raf;

    const build = (w, h) => {
      dots = [];
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push({ ox: c * SPACING, oy: r * SPACING, x: c * SPACING, y: r * SPACING });
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      build(W, H);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove  = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onLeave = ()  => { mouseX = -999; mouseY = -999; };
    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = isDarkMode
        ? "rgba(255,255,255,0.22)"
        : "rgba(0,0,0,0.28)";

      for (const d of dots) {
        const dx   = d.ox - mouseX;
        const dy   = d.oy - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Push target
        let tx = d.ox, ty = d.oy;
        if (dist < PUSH_RADIUS && dist > 0) {
          const force = (1 - dist / PUSH_RADIUS) * PUSH_STRENGTH;
          tx = d.ox + (dx / dist) * force;
          ty = d.oy + (dy / dist) * force;
        }

        // Smooth lerp — spring feel
        d.x += (tx - d.x) * 0.14;
        d.y += (ty - d.y) * 0.14;

        // Dot swells slightly near cursor
        const closeness = Math.max(0, 1 - dist / 110);
        const r = DOT_BASE_R + closeness * 0.8;

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

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
