import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiFigma } from "react-icons/fi";

const socialLinks = [
  { href: "https://github.com",          icon: FaGithub,    label: "GitHub",    hoverColor: "hover:text-gray-900 dark:hover:text-white" },
  { href: "https://figma.com",           icon: FiFigma,     label: "Figma",     hoverColor: "hover:text-violet-500" },
  { href: "https://instagram.com",       icon: FaInstagram, label: "Instagram", hoverColor: "hover:text-pink-500" },
  { href: "https://wa.me/+6281351958200",icon: FaWhatsapp,  label: "WhatsApp",  hoverColor: "hover:text-green-500" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-10 px-6 md:px-12">
      <div className="container min-h-[16vh] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left ">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">© 2025 Bryan Jacquellino</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Designed and built with care.</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Elsewhere</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://figma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Figma
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Contact</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                href="https://wa.me/+6281351958200"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Message on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-6 text-gray-500 dark:text-gray-400">
        {socialLinks.map(({ href, icon: Icon, label, hoverColor }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.25, y: -3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`transition-colors duration-150 ${hoverColor}`}
          >
            <Icon size={24} />
          </motion.a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
