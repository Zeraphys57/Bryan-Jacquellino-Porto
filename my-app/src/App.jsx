import React, { useEffect, useState } from 'react';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { ThemeProvider } from "./ThemeContext";
import MetaBalls from './component/MetaBalls';
import Header from './component/Header';
import About from './component/About';
import ImBryan from './component/ImBryan';
import Projects from './component/Projects';
import Footer from './component/Footer';



function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);
  

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-out',
      offset: 50,
      once: false,
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    /* eslint-disable no-console */
    console.log(
      "%c👋 Hey, you found the console!",
      "font-size:18px;font-weight:bold;color:#8b5cf6"
    );
    console.log(
      "%cI built this with React + Tailwind + Three.js. Want to collaborate?\n" +
      "→ bryanjacquellino5757@gmail.com",
      "font-size:13px;color:#6b7280"
    );
    /* eslint-enable no-console */
  }, []);

  

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider>
      <div className="App relative overflow-x-hidden aurora-bg dark:aurora-bg">

        {/* Scroll progress bar */}
        <div
          className="fixed top-0 left-0 h-[2px] z-[60] bg-violet-400 dark:bg-teal-400 transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="absolute inset-0 z-5 blur-3xl">
          <MetaBalls 
            color={isDarkMode ? "#54828F" : "#E7CCFF"}
            cursorBallColor={isDarkMode ? "#719AA6" : "#E7CCFF"}
            enableTransparency={true} 
            speed={0.2}
            cursorBallSize={1.8}
            ballCount={25}
            clumpFactor={1.5}
            enableMouseInteraction={true}
            hoverSmoothness={0.05}
            animationSize={30}
          />
        </div>

        <div className="relative z-10">
          <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <div data-aos="fade-down" data-aos-once="false" className="relative flex flex-col justify-center items-center h-screen px-6 gap-0">
          <h1 className="font-extralight text-5xl sm:text-7xl md:text-8xl lg:text-9xl bg-transparent text-black dark:text-white text-left sm:text-center leading-tight">
            Bryan Jacquellino
          </h1>


          {/* Scroll down indicator */}
          <motion.div
            className="absolute bottom-10 flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 cursor-pointer select-none"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => document.querySelector("#imbr-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-xs tracking-widest uppercase opacity-70">scroll</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-60">
              <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
          
          <div id="imbr-section"><ImBryan /></div>

          <About />

          <Projects />

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
