import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from "react-icons/fa";

const NAV = [
  { label: "About",    href: "#bio" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process",  href: "#process" },
];

const GREETINGS = ["Hello!", "你好!", "Halo!", "こんにちは!", "Bonjour!"];

const Greeting = () => {
  const [greetIdx, setGreetIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setGreetIdx(i => (i + 1) % GREETINGS.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative z-10 overflow-hidden h-10 flex items-center">
      <h1
        key={greetIdx}
        className="font-semibold text-2xl text-gray-900 dark:text-white whitespace-nowrap"
        style={{ animation: 'greet-in 0.32s cubic-bezier(0.23,1,0.32,1) both' }}
      >
        {GREETINGS[greetIdx]}
      </h1>
    </div>
  );
};

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible]   = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsVisible(y <= lastScrollY || y <= 50);
      setScrolled(y > 24);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-16 z-50 px-6 md:px-12
          flex items-center justify-between
          md:grid md:grid-cols-3
          transition-transform duration-300 ease-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Backdrop — only visible after scrolling */}
        <div className={`absolute inset-0 transition-all duration-300 border-b
          ${scrolled
            ? 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-gray-100 dark:border-white/[0.04]'
            : 'bg-transparent border-transparent'
          }`}
        />

        {/* Greeting */}
        <Greeting />

        {/* Desktop nav links */}
        <nav className="relative z-10 hidden md:flex items-center justify-center gap-8">
          {NAV.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative text-sm text-gray-500 dark:text-gray-400
                hover:text-gray-900 dark:hover:text-white
                transition-colors duration-150 group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-violet-500 dark:bg-violet-400
                group-hover:w-full transition-all duration-200 ease-out" />
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="relative flex items-center justify-end gap-0.5 z-10">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full
              text-gray-500 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-white/[0.08]
              active:scale-[0.9] transition-all duration-150 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            <div key={isDarkMode ? 'dark' : 'light'} style={{ animation: 'icon-in 0.25s ease-out both' }}>
              {isDarkMode
                ? <FaSun  className="text-amber-400" size={18} />
                : <FaMoon className="text-gray-500"  size={18} />}
            </div>
          </button>

          {/* Burger — mobile only */}
          <button
            onClick={() => setIsMenuOpen(o => !o)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px]
              rounded-full
              hover:bg-gray-100 dark:hover:bg-white/[0.08]
              active:scale-[0.9] transition-all duration-150
              focus:outline-none text-gray-700 dark:text-gray-200"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className="block w-[18px] h-[1.5px] bg-current transition-all duration-200 ease-out origin-center"
              style={isMenuOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}}
            />
            <span
              className="block w-[18px] h-[1.5px] bg-current transition-opacity duration-150"
              style={isMenuOpen ? { opacity: 0 } : {}}
            />
            <span
              className="block w-[18px] h-[1.5px] bg-current transition-all duration-200 ease-out origin-center"
              style={isMenuOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}}
            />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <nav
        className={`fixed inset-0 z-40 flex flex-col justify-center
          px-8 sm:px-12
          bg-white dark:bg-[#09090b]
          transition-transform duration-[380ms]
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
      >
        <div className="flex flex-col w-full">
          {NAV.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              className="group flex items-baseline gap-5 py-5
                border-b border-gray-100 dark:border-white/[0.06]
                active:opacity-60"
              style={isMenuOpen
                ? { animation: `greet-in 0.38s ${i * 0.06}s cubic-bezier(0.23,1,0.32,1) both` }
                : { opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-mono text-[10px] text-gray-300 dark:text-gray-600 w-5 shrink-0">
                0{i + 1}
              </span>
              <span className="text-[clamp(2.4rem,9vw,4.5rem)] font-light leading-none
                text-gray-800 dark:text-white
                group-hover:text-violet-500 dark:group-hover:text-violet-400
                transition-colors duration-150">
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="absolute bottom-10 left-8 sm:left-12 right-8 sm:right-12
            flex items-center justify-between"
          style={isMenuOpen
            ? { animation: 'greet-in 0.4s 0.28s ease-out both' }
            : { opacity: 0 }}
        >
          <a
            href="https://wa.me/+6281351958200"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono tracking-widest uppercase
              text-gray-400 dark:text-gray-600
              hover:text-violet-500 dark:hover:text-violet-400
              transition-colors duration-150"
          >
            Get in touch ↗
          </a>
          <span className="text-[11px] font-mono tracking-widest uppercase text-gray-300 dark:text-gray-700">
            © 2026
          </span>
        </div>
      </nav>
    </>
  );
};

export default Header;
