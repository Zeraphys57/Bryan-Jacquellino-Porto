import React from "react";
import { FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiFigma } from "react-icons/fi";

const socials = [
  { href: "https://github.com",            Icon: FaGithub,    label: "GitHub",    color: "hover:text-gray-900 dark:hover:text-white" },
  { href: "https://figma.com",             Icon: FiFigma,     label: "Figma",     color: "hover:text-violet-600 dark:hover:text-violet-400" },
  { href: "https://instagram.com",         Icon: FaInstagram, label: "Instagram", color: "hover:text-pink-500" },
  { href: "https://wa.me/+6281351958200",  Icon: FaWhatsapp,  label: "WhatsApp",  color: "hover:text-green-500" },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-white/[0.06] py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Bryan Jacquellino</p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">Freelance Web Developer · 2025</p>
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/+6281351958200"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full text-sm font-medium
            bg-gray-900 dark:bg-white text-white dark:text-gray-900
            hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]
            transition-all duration-150 ease-out"
        >
          Let's work together →
        </a>

        {/* Socials */}
        <div className="flex items-center gap-4 text-gray-400 dark:text-gray-600">
          {socials.map(({ href, Icon, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`transition-all duration-150 ease-out hover:-translate-y-0.5 active:scale-90 ${color}`}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-100 dark:border-white/[0.04]">
        <p className="text-center text-[11px] font-mono text-gray-300 dark:text-gray-700 tracking-widest uppercase">
          Designed & built by Bryan Jacquellino — React · Tailwind · Three.js
        </p>
      </div>
    </footer>
  );
};

export default Footer;
