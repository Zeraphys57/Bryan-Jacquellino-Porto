import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from "../ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import ASCIIText from './ASCIIText';

const Header = ({isDarkMode, toggleDarkMode}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Hide header saat scroll ke bawah
      } else {
        setIsVisible(true); // Show header saat scroll ke atas
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
    className={`fixed top-0 left-0 w-full h-[12vh] z-50 bg-transparent py-4 px-12 space-x-8 flex
      justify-between items-center transform transition-transform duration-300 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"} `}
        >
      <h1 className="text-gray-900 dark:text-gray-100 font-bold sm:text-4xl z-50">Hello!</h1>
      {/* <div>
        <ASCIIText
          text='Hello!'
          enableWaves={true}
          asciiFontSize={2}
        />
      </div> */}
      

      <nav className="space-x-4 sm:text-3xl hidden">
        <a href="#home" className="text-gray-700 hover:text-gray-400">Home</a>
        <a href="#about" className="text-gray-700 hover:text-gray-400">About_Me</a>
        <a href="#projects" className="text-gray-700 hover:text-gray-400">Projects</a>
        <a href="#contact" className="text-gray-700 hover:text-gray-400">Contact</a>
      </nav>

      <div className="flex items-center space-x-4">
        <motion.button
          onClick={toggleDarkMode}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="flex items-center justify-center w-10 h-10 mx-8 rounded-full focus:outline-none z-50"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDarkMode ? (
              <motion.div
                key="sun"
                initial={{ scale: 0.95, rotate: -150, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.95, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <FaSun className="text-amber-500 text-xl" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ scale: 0.95, rotate: 150, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.95, rotate: -90, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <FaMoon className="text-gray-700 text-xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Burger Menu */}
        <button
          className="flex flex-col space-y-1 focus:outline-none z-50"
          onClick={toggleMenu}
        >
          <motion.span
            className="block w-7 h-0.5 bg-gray-700 dark:bg-gray-100"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 6 : 0,
              scaleX: isMenuOpen ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <motion.span
            className="block w-7 h-0.5 bg-gray-700 dark:bg-gray-100"
            animate={{
              opacity: isMenuOpen ? 0 : 1,
              scaleX: isMenuOpen ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-7 h-0.5 bg-gray-700 dark:bg-gray-100"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -6 : 0,
              scaleX: isMenuOpen ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      <nav
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        } fixed inset-0 top-0 right-0 text-6xl gap-8 aurora-bg dark:aurora-bg bg-gray-100 dark:bg-gray-900 w-screen h-screen shadow-lg z-40 flex flex-col justify-center items-center p-6 space-y-4 transform transition-transform duration-300`}
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
      >
        {["Home", "About_Me", "Projects", "Contact"].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.25, delay: isMenuOpen ? i * 0.06 : 0, ease: [0.23, 1, 0.32, 1] }}
            whileTap={{ scale: 0.97 }}
            className="text-gray-700 dark:text-gray-200 hover:text-gray-400"
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </motion.a>
        ))}
      </nav>
    </header>
  );
};

export default Header;

