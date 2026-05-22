import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "lang";
const SUPPORTED = ["en", "zh", "id"];

/* Loads the Traditional Chinese webfont once, only when needed. */
const ensureChineseFont = () => {
  if (document.getElementById("zh-font")) return;
  const link = document.createElement("link");
  link.id = "zh-font";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@200;300;400;500;700&display=swap";
  document.head.appendChild(link);
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-TW" : lang;
    if (lang === "zh") ensureChineseFont();
  }, [lang]);

  const setLang = useCallback((next) => {
    if (SUPPORTED.includes(next)) setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((l) => SUPPORTED[(SUPPORTED.indexOf(l) + 1) % SUPPORTED.length]);
  }, []);

  const value = { lang, setLang, toggleLang, t: translations[lang] };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
