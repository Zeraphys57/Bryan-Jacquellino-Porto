import React from "react";
import { FaGithub, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import { waLink, EMAIL, SOCIALS } from "../contact";
import { PAGE_X, CONTAINER } from "./layout";

const NAV = [
  { key: "work",     href: "#work" },
  { key: "services", href: "#services" },
  { key: "process",  href: "#process" },
  { key: "about",    href: "#about" },
  { key: "faq",      href: "#faq" },
];

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { href: SOCIALS.github,              Icon: FaGithub,    label: "GitHub",    hover: "hover:text-gray-900 dark:hover:text-white" },
    { href: SOCIALS.instagram,           Icon: FaInstagram, label: "Instagram", hover: "hover:text-pink-600 dark:hover:text-pink-400" },
    { href: waLink(t.whatsapp.message),  Icon: FaWhatsapp,  label: "WhatsApp",  hover: "hover:text-green-600 dark:hover:text-green-400" },
    { href: `mailto:${EMAIL}`,           Icon: FaEnvelope,  label: "Email",     hover: "hover:text-violet-600 dark:hover:text-violet-400" },
  ];

  return (
    <footer className={`border-t border-gray-200 dark:border-white/[0.06] ${PAGE_X} py-12`}>
      <div className={`${CONTAINER} flex flex-col gap-8 md:flex-row md:items-center md:justify-between`}>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            Bryan<span className="text-violet-600 dark:text-violet-400">.</span>
          </p>
          <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {t.hero.available}
          </span>
        </div>

        <nav aria-label={t.header.mainNav} className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {NAV.map(({ key, href }) => (
            <a key={key} href={href}
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150">
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-gray-600 dark:text-gray-400">
          {socials.map((s) => {
            const Icon = s.Icon;
            const external = s.href.startsWith("http");
            return (
              <a key={s.label} href={s.href} aria-label={s.label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`transition-[translate,color] duration-150 hover:-translate-y-0.5 active:scale-90 ${s.hover}`}>
                <Icon size={18} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>

      <p className={`${CONTAINER} mt-10 text-sm text-gray-600 dark:text-gray-400`}>
        © {year} Bryan Jacquellino · {t.footer.location}
      </p>
    </footer>
  );
};

export default Footer;
