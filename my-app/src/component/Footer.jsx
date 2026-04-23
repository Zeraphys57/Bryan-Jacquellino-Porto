import React from "react";
import { FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";

const NAV = [
  { label: "About",    href: "#bio" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process",  href: "#process" },
];

const SOCIALS = [
  { href: "https://github.com/Zeraphys57",               Icon: FaGithub,    label: "GitHub",    hover: "hover:text-gray-900 dark:hover:text-white" },
  { href: "https://www.instagram.com/bryanjacquellino/", Icon: FaInstagram, label: "Instagram", hover: "hover:text-pink-500" },
  { href: "https://wa.me/+6281351958200",                Icon: FaWhatsapp,  label: "WhatsApp",  hover: "hover:text-green-500" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 dark:border-white/[0.06]
      px-6 md:px-16 lg:px-24 xl:px-36 2xl:px-48 py-10">
      <div className="max-w-[1500px] mx-auto space-y-8">

        {/* Main row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

          {/* Brand + status */}
          <div className="flex items-center gap-4">
            <p className="text-base font-light text-gray-900 dark:text-white tracking-tight">
              Bryan<span className="text-violet-500 dark:text-violet-400">.</span>
            </p>
            <span className="w-px h-4 bg-gray-200 dark:bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
              </span>
              <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 tracking-widest uppercase">
                Available
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {NAV.map(({ label, href }) => (
              <a key={label} href={href}
                className="text-xs font-mono text-gray-400 dark:text-gray-600 tracking-wide
                  hover:text-gray-900 dark:hover:text-white transition-colors duration-150">
                {label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4 text-gray-300 dark:text-gray-700">
            {SOCIALS.map(({ href, Icon, label, hover }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className={`transition-all duration-150 hover:-translate-y-0.5 active:scale-90 ${hover}`}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-100 dark:border-white/[0.05] pt-6">
          <p className="text-center text-[11px] font-mono text-gray-300 dark:text-gray-700 tracking-widest uppercase">
            © {year} Bryan Jacquellino · React · Tailwind · GSAP
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
