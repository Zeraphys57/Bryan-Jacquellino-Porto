import React, { useEffect, useState } from 'react';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

  

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider>
      <div className="App relative overflow-x-hidden aurora-bg dark:aurora-bg">
        

        <div className="absolute inset-0 z-5 blur-3xl">
          <MetaBalls 
            color={isDarkMode ? "#54828F" : "#E7CCFF"}
            cursorBallColor={isDarkMode ? "#719AA6" : "#E7CCFF"}
            enableTransparency={true} 
            speed={0.2}
            cursorBallSize={1.8} // Ukuran kursor
            ballCount={25}
            clumpFactor={1.5}
            enableMouseInteraction={true}
            hoverSmoothness={0.05}
            animationSize={30}
          />
        </div>

        <div className="relative z-10">
          <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        <div data-aos="fade-down" data-aos-once="false" className="flex justify-center items-center h-screen px-6">
          <h1 className="font-extralight text-5xl sm:text-7xl md:text-8xl lg:text-9xl bg-transparent text-black dark:text-white text-left sm:text-center leading-tight">
            Bryan Jacquellino
          </h1>
        </div>
          
          <ImBryan />

          <About />

          <Projects />

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
