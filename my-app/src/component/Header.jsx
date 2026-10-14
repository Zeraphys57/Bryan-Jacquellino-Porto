import React, { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import { waLink } from "../contact";

const NAV = [
  { key: "work",     href: "#work" },
  { key: "services", href: "#services" },
  { key: "process",  href: "#process" },
  { key: "about",    href: "#about" },
  { key: "faq",      href: "#faq" },
];

const LANGS = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中" },
];

/* Three languages, one tap each */
const LangSwitch = () => {
  const { t, lang, setLang } = useLanguage();
  return (
    <div role="group" aria-label={t.header.langLabel} className="flex items-center rounded-full p-0.5 bg-black/[0.05] dark:bg-white/[0.07]">
      {LANGS.map(({ code, label }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            lang={code === "zh" ? "zh-TW" : code}
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`h-8 min-w-8 px-2 rounded-full text-[13px] font-semibold transition-colors duration-150
              ${active
                ? "bg-white text-gray-900 shadow-sm dark:bg-white/15 dark:text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden]         = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const lastY = useRef(0);
  const firstLinkRef = useRef(null);

  /* Hide on scroll down, show on scroll up — one rAF per frame, state only when it changes */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      setScrolled(y > 24);
      lastY.current = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  /* Mobile menu: lock page scroll, focus the first link, close on Escape */
  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") setIsMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const close = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-16 z-50 px-6 md:px-12 flex items-center justify-between gap-4
          transition-transform duration-300 ease-out
          ${hidden && !isMenuOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        {/* Backdrop — only after scrolling */}
        <div className={`absolute inset-0 transition-colors duration-300 border-b
          ${scrolled
            ? "bg-white/85 dark:bg-[#09090b]/85 backdrop-blur-md border-gray-200/70 dark:border-white/[0.06]"
            : "bg-transparent border-transparent"}`}
        />

        <a
          href="#hero"
          onClick={close}
          aria-label={t.header.home}
          className="relative z-10 text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          Bryan<span className="text-violet-600 dark:text-violet-400">.</span>
        </a>

        <nav aria-label={t.header.mainNav} className="relative z-10 hidden lg:flex items-center gap-8">
          {NAV.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="group relative text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
            >
              {t.nav[key]}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-500 dark:bg-violet-400 group-hover:w-full transition-[width] duration-200 ease-out" />
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
          <LangSwitch />

          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={t.header.toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-white/[0.08] active:scale-[0.9] transition-[background-color,scale] duration-150"
          >
            <span key={isDarkMode ? "dark" : "light"} style={{ animation: "icon-in 0.25s ease-out both" }}>
              {isDarkMode
                ? <FaSun className="text-amber-400" size={17} aria-hidden="true" />
                : <FaMoon size={16} aria-hidden="true" />}
            </span>
          </button>

          <a
            href={waLink(t.whatsapp.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-medium
              bg-gray-900 text-white dark:bg-white dark:text-gray-900
              transition-[translate] duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <FaWhatsapp size={16} aria-hidden="true" />
            {t.header.contact}
          </a>

          {/* Burger — below desktop */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label={t.header.toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px] rounded-full
              text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.08] active:scale-[0.9]
              transition-[background-color,scale] duration-150"
          >
            <span className="block w-[18px] h-[1.5px] bg-current transition-transform duration-200 ease-out"
              style={isMenuOpen ? { transform: "translateY(6.5px) rotate(45deg)" } : undefined} />
            <span className="block w-[18px] h-[1.5px] bg-current transition-opacity duration-150"
              style={isMenuOpen ? { opacity: 0 } : undefined} />
            <span className="block w-[18px] h-[1.5px] bg-current transition-transform duration-200 ease-out"
              style={isMenuOpen ? { transform: "translateY(-6.5px) rotate(-45deg)" } : undefined} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu — inert while closed so its links can't be tabbed into */}
      <nav
        id="mobile-menu"
        aria-label={t.header.mainNav}
        inert={!isMenuOpen}
        className={`lg:hidden fixed inset-0 z-40 flex flex-col justify-center px-8 sm:px-12
          bg-white dark:bg-[#09090b] transition-transform duration-[380ms]
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
      >
        <div className="flex flex-col w-full">
          {NAV.map(({ key, href }, i) => (
            <a
              key={key}
              ref={i === 0 ? firstLinkRef : undefined}
              href={href}
              onClick={close}
              className="py-4 border-b border-gray-100 dark:border-white/[0.06]
                text-[clamp(2.2rem,9vw,4rem)] font-light leading-none text-gray-900 dark:text-white
                hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-150"
              style={isMenuOpen ? { animation: `fade-up 0.38s ${i * 0.05}s cubic-bezier(0.23,1,0.32,1) both` } : undefined}
            >
              {t.nav[key]}
            </a>
          ))}
        </div>

        <a
          href={waLink(t.whatsapp.message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="mt-10 inline-flex items-center justify-center gap-2.5 w-full py-4 rounded-full text-base font-medium
            bg-gray-900 text-white dark:bg-white dark:text-gray-900"
          style={isMenuOpen ? { animation: "fade-up 0.4s 0.28s ease-out both" } : undefined}
        >
          <FaWhatsapp size={18} aria-hidden="true" />
          {t.whatsapp.label}
        </a>
      </nav>
    </>
  );
};

export default Header;
