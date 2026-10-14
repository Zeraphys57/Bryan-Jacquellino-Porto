import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import { waLink } from "../contact";

/* Always-reachable WhatsApp button: appears once the hero is out of view,
   steps aside while the contact section (which has its own button) is on screen. */
const FloatingWhatsApp = () => {
  const { t } = useLanguage();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");
    if (!hero) return;
    let pastHero = false;
    let atContact = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting;
        if (e.target === contact) atContact = e.isIntersecting;
      }
      setShown(pastHero && !atContact);
    });
    io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={waLink(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      title={t.whatsapp.label}
      className={`group fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex items-center justify-center
        w-14 h-14 rounded-full bg-green-700 text-white shadow-xl shadow-green-900/25
        transition-[opacity,translate] duration-300 ease-out
        ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <FaWhatsapp size={26} aria-hidden="true" className="transition-transform duration-200 group-hover:scale-110" />
    </a>
  );
};

export default FloatingWhatsApp;
