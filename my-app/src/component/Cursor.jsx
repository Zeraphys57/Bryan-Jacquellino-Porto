import { useEffect, useRef } from "react";

const SIZE = { default: 12, link: 48, heading: 110 };
const RING = (1.5 * SIZE.heading) / SIZE.link; // a 1.5px ring once scaled down to link size
const LINK = "a, button, summary, [role='button']";
const HEADING = "[data-cursor-xl], h2";

/* A dot that inverts whatever is under it: a ring around anything clickable, a lens over
   big headings. Drawn at its largest size and scaled down, so it is sharp at every size.
   Position goes straight to the DOM and the loop stops once the dot has caught up. */
const Cursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    let mx = 0, my = 0, x = 0, y = 0;
    let hidden = true;
    let raf = 0;

    const tick = () => {
      x += (mx - x) * 0.45;
      y += (my - y) * 0.45;
      el.style.translate = `${x}px ${y}px`;
      raf = Math.abs(mx - x) + Math.abs(my - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (hidden) { // appear where the pointer is instead of flying in
        hidden = false;
        x = mx;
        y = my;
        el.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => { hidden = true; el.style.opacity = "0"; };

    /* mouseover fires for every element the pointer enters, parents included,
       so this one handler also covers leaving a link or a heading */
    const onOver = (e) => {
      const mode = e.target.closest(LINK) ? "link" : e.target.closest(HEADING) ? "heading" : "default";
      el.style.scale = `${SIZE[mode] / SIZE.heading}`;
      el.style.backgroundColor = mode === "link" ? "transparent" : "white";
    };

    document.addEventListener("mousemove",  onMove, { passive: true });
    document.addEventListener("mouseover",  onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full mix-blend-difference opacity-0 will-change-transform"
      style={{
        width: SIZE.heading, height: SIZE.heading,
        marginLeft: -SIZE.heading / 2, marginTop: -SIZE.heading / 2,
        border: `${RING}px solid white`,
        backgroundColor: "white",
        scale: `${SIZE.default / SIZE.heading}`,
        transition: "scale 0.35s cubic-bezier(0.23,1,0.32,1), background-color 0.2s, opacity 0.25s",
      }}
    />
  );
};

export default Cursor;
