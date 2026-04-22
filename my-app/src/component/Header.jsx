import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from "react-icons/fa";

const GREETINGS = ["Hello!", "Halo!", "你好!", "こんにちは!", "Bonjour!"];

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [greetIdx, setGreetIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setGreetIdx(i => (i + 1) % GREETINGS.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsVisible(y <= lastScrollY || y <= 50);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navLinks = ["Home", "About", "Projects", "Contact"];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-16 z-50 px-6 md:px-12 flex justify-between items-center
          transition-transform duration-300 ease-out
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Backdrop blur pill */}
        <div className="absolute inset-0 bg-white/70 dark:bg-[#09090b]/70 backdrop-blur-md border-b border-gray-100 dark:border-white/[0.04]" />

        {/* Greeting */}
        <div className="relative overflow-hidden h-8 flex items-center z-10">
          <h1
            key={greetIdx}
            className="font-semibold text-lg text-gray-900 dark:text-white whitespace-nowrap"
            style={{ animation: 'greet-in 0.32s cubic-bezier(0.23,1,0.32,1) both' }}
          >
            {GREETINGS[greetIdx]}
          </h1>
        </div>

        {/* Right controls */}
        <div className="relative flex items-center gap-3 z-10">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 flex items-center justify-center rounded-full
              text-gray-500 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-white/8
              active:scale-[0.9] transition-all duration-150 ease-out focus:outline-none"
            aria-label="Toggle dark mode"
          >
            <div key={isDarkMode ? 'dark' : 'light'} style={{ animation: 'icon-in 0.25s ease-out both' }}>
              {isDarkMode
                ? <FaSun className="text-amber-400" size={16} />
                : <FaMoon className="text-gray-500" size={16} />
              }
            </div>
          </button>

          {/* Burger */}
          <button
            onClick={() => setIsMenuOpen(o => !o)}
            className="flex flex-col justify-center gap-[5px] w-9 h-9 focus:outline-none
              text-gray-700 dark:text-gray-200"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className="block w-5 h-[1.5px] bg-current transition-all duration-200 ease-out origin-center"
              style={isMenuOpen ? { transform: 'translateY(6.5px) rotate(45deg)' } : {}}
            />
            <span
              className="block w-5 h-[1.5px] bg-current transition-opacity duration-150"
              style={isMenuOpen ? { opacity: 0 } : {}}
            />
            <span
              className="block w-5 h-[1.5px] bg-current transition-all duration-200 ease-out origin-center"
              style={isMenuOpen ? { transform: 'translateY(-6.5px) rotate(-45deg)' } : {}}
            />
          </button>
        </div>
      </header>

      {/* Fullscreen nav overlay */}
      <nav
        className={`fixed inset-0 z-40 flex flex-col justify-center items-start px-10 md:px-24
          bg-white dark:bg-[#09090b]
          transition-transform duration-300
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
      >
        <div className="flex flex-col gap-2 w-full">
          {navLinks.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-5xl sm:text-6xl font-light text-gray-800 dark:text-white
                hover:text-violet-500 dark:hover:text-violet-400
                transition-colors duration-150 py-2 border-b border-gray-100 dark:border-white/[0.05]
                active:opacity-70"
              style={isMenuOpen ? {
                animation: `greet-in 0.35s ${i * 0.07}s cubic-bezier(0.23,1,0.32,1) both`
              } : { opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>

        <p
          className="absolute bottom-12 left-10 md:left-24 text-xs font-mono text-gray-400 dark:text-gray-600 tracking-widest uppercase"
          style={isMenuOpen ? { animation: 'greet-in 0.4s 0.3s ease-out both' } : { opacity: 0 }}
        >
          Bryan Jacquellino — 2025
        </p>
      </nav>
    </>
  );
};

export default Header;
