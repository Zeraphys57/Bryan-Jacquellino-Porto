import React, { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import { waLink, EMAIL } from "../contact";
import { PAGE_X, CONTAINER } from "./layout";

/* Closing call to action. The cursor is a flashlight over the background word;
   its position is written to CSS variables on the section, so React never re-renders. */
const ContactCTA = ({ isDarkMode }) => {
  const { t } = useLanguage();
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="contact"
      ref={ref}
      onMouseMove={onMove}
      aria-labelledby="contact-title"
      className={`relative min-h-[90svh] flex items-center overflow-hidden bg-[#fafafa] dark:bg-[#030712] ${PAGE_X}`}
      style={{ "--mx": "50%", "--my": "40%" }}
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(520px circle at var(--mx) var(--my), rgba(124,58,237,${isDarkMode ? 0.11 : 0.06}), transparent 65%)` }}
      />

      {/* Ambient orbs — soft gradients, no blur filter */}
      <div aria-hidden="true" className="orb-a pointer-events-none absolute rounded-full"
        style={{ width: 700, height: 700, top: -220, right: -180, opacity: isDarkMode ? 0.16 : 0.08,
          background: "radial-gradient(circle, rgba(124,58,237,0.9) 0%, rgba(124,58,237,0.35) 35%, rgba(124,58,237,0) 70%)" }} />
      <div aria-hidden="true" className="orb-b pointer-events-none absolute rounded-full"
        style={{ width: 600, height: 600, bottom: -160, left: -140, opacity: isDarkMode ? 0.12 : 0.07,
          background: "radial-gradient(circle, rgba(13,148,136,0.9) 0%, rgba(13,148,136,0.35) 35%, rgba(13,148,136,0) 70%)" }} />

      {/* Background word revealed around the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          maskImage: "radial-gradient(circle 340px at var(--mx) var(--my), black 0%, rgba(0,0,0,0.13) 75%)",
          WebkitMaskImage: "radial-gradient(circle 340px at var(--mx) var(--my), black 0%, rgba(0,0,0,0.13) 75%)",
        }}
      >
        <span className="absolute -bottom-6 right-0 text-[22vw] font-black leading-none tracking-tight select-none
          text-gray-900/[0.22] dark:text-white/[0.14]">
          START.
        </span>
      </div>

      <div className={`relative z-10 ${CONTAINER} py-24`}>
        <h2
          id="contact-title"
          className="scroll-reveal text-[clamp(2.6rem,7vw,8.5rem)] font-light leading-[0.95] tracking-tight text-gray-900 dark:text-white"
        >
          {t.contact.headingLine1}{" "}
          <br />
          <span className="text-violet-600 dark:text-violet-400">{t.contact.headingLine2}</span>
        </h2>

        <p className="scroll-reveal mt-8 max-w-lg text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed" data-delay="80ms">
          {t.contact.body}
        </p>

        <div className="scroll-reveal mt-12 flex flex-wrap gap-4" data-delay="160ms">
          <a
            href={waLink(t.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-medium text-white
              bg-gray-900 dark:bg-violet-600 hover:bg-gray-700 dark:hover:bg-violet-500
              transition-[translate,background-color,box-shadow] duration-150 ease-out
              hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(124,58,237,0.45)] active:scale-[0.97]"
          >
            <FaWhatsapp size={18} aria-hidden="true" />
            {t.contact.primary}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium
              border border-gray-300 dark:border-white/15 text-gray-800 dark:text-white
              hover:bg-gray-100 dark:hover:bg-white/[0.07]
              transition-[translate,background-color] duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
          >
            {t.contact.secondary}
          </a>
        </div>
        <p className="scroll-reveal mt-6 text-sm text-gray-600 dark:text-gray-400" data-delay="220ms">
          {EMAIL}
        </p>
      </div>
    </section>
  );
};

export default ContactCTA;
