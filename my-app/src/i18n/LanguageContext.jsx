import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "lang";
const SUPPORTED = ["id", "en", "zh"];

/* Indonesia's time zones — catches Indonesian visitors whose phone UI is in English. */
const ID_TIMEZONES = ["Asia/Jakarta", "Asia/Pontianak", "Asia/Makassar", "Asia/Jayapura"];

const readStored = () => {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
};

/* Saved choice first, then the browser's languages, then the time zone. */
const detectLang = () => {
  const stored = readStored();
  if (SUPPORTED.includes(stored)) return stored;

  const prefs = navigator.languages?.length ? navigator.languages : [navigator.language || ""];
  for (const pref of prefs) {
    const code = pref.toLowerCase();
    if (code.startsWith("id") || code.startsWith("in")) return "id";
    if (code.startsWith("zh")) return "zh";
    if (code.startsWith("en")) break;
  }
  try {
    if (ID_TIMEZONES.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)) return "id";
  } catch { /* Intl unavailable — fall through */ }
  return "en";
};

/* Loads the Traditional Chinese webfont once, only when needed. */
const ensureChineseFont = () => {
  if (document.getElementById("zh-font")) return;
  const link = document.createElement("link");
  link.id = "zh-font";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap";
  document.head.appendChild(link);
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(detectLang);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* private mode */ }
    document.documentElement.lang = lang === "zh" ? "zh-TW" : lang;
    document.title = translations[lang].meta.title;
    if (lang === "zh") ensureChineseFont();
  }, [lang]);

  const setLang = useCallback((next) => {
    if (SUPPORTED.includes(next)) setLangState(next);
  }, []);

  const value = { lang, setLang, t: translations[lang] };

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
