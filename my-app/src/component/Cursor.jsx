import { useEffect, useRef } from "react";

const SIZE = { default: 36, link: 64, heading: 110 };

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    let mouseX = -200, mouseY = -200;
    let lerpX  = -200, lerpY  = -200;
    let prevLX = -200, prevLY = -200;
    let mode   = "default";
    let raf;

    const applySize = (s, m) => {
      el.style.width           = `${s}px`;
      el.style.height          = `${s}px`;
      el.style.marginLeft      = `${-s / 2}px`;
      el.style.marginTop       = `${-s / 2}px`;
      el.style.backgroundColor = m === "link" ? "transparent" : "white";
      el.style.border          = m === "link" ? "1.5px solid white" : "none";
      el.style.mixBlendMode    = m === "link" ? "normal" : "difference";
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      el.style.opacity = "1";
    };

    const onLeave = () => { el.style.opacity = "0"; };

    const onOver = (e) => {
      const t = e.target;
      if (t.closest("[data-cursor-xl], h2, h3")) {
        if (mode !== "heading") { mode = "heading"; applySize(SIZE.heading, "heading"); }
      } else if (t.closest("a, button, [role='button']")) {
        if (mode !== "link") { mode = "link"; applySize(SIZE.link, "link"); }
      }
    };

    const onOut = (e) => {
      const t = e.target;
      if (t.closest("[data-cursor-xl], h2, h3") && mode === "heading") {
        mode = "default"; applySize(SIZE.default, "default");
      } else if (t.closest("a, button, [role='button']") && mode === "link") {
        mode = "default"; applySize(SIZE.default, "default");
      }
    };

    const tick = () => {
      prevLX = lerpX; prevLY = lerpY;
      lerpX += (mouseX - lerpX) * 0.18;
      lerpY += (mouseY - lerpY) * 0.18;

      const vx    = lerpX - prevLX;
      const vy    = lerpY - prevLY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const stretch = Math.min(1 + speed * 0.06, 2.2);
      const angle   = speed > 0.3 ? Math.atan2(vy, vx) * (180 / Math.PI) : 0;

      el.style.transform = `translate(${lerpX}px,${lerpY}px) rotate(${angle}deg) scaleX(${stretch.toFixed(3)}) scaleY(${(1 / stretch).toFixed(3)})`;

      raf = requestAnimationFrame(tick);
    };

    applySize(SIZE.default, "default");
    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover",  onOver,  { passive: true });
    document.addEventListener("mouseout",   onOut,   { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform rounded-full"
      style={{
        width: SIZE.default, height: SIZE.default,
        marginLeft: -SIZE.default / 2, marginTop: -SIZE.default / 2,
        backgroundColor: "white",
        mixBlendMode: "difference",
        opacity: 0,
        transition:
          "width 0.45s cubic-bezier(0.23,1,0.32,1), height 0.45s cubic-bezier(0.23,1,0.32,1), margin 0.45s cubic-bezier(0.23,1,0.32,1), opacity 0.25s, background-color 0.2s, border 0.2s",
      }}
    />
  );
};

export default Cursor;
