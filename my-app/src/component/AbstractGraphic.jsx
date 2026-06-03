import React from "react";

const AbstractGraphic = ({ index }) => {
  const baseClass =
    "w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 xl:w-96 xl:h-96 opacity-10 dark:opacity-20 stroke-current text-violet-500 dark:text-violet-400";

  switch (index) {
    case 0:
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <path d="M50 15L85 35V65L50 85L15 65V35L50 15Z" strokeWidth="1.5" />
          <path d="M50 15V50M15 35L50 50M85 35L50 50" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="50" cy="15" r="2" fill="currentColor" />
          <circle cx="15" cy="35" r="2" fill="currentColor" />
          <circle cx="85" cy="35" r="2" fill="currentColor" />
        </svg>
      );
    case 1:
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <rect x="15" y="25" width="70" height="50" rx="3" strokeWidth="1.5" />
          <path d="M15 35H85" strokeWidth="1" />
          <circle cx="22" cy="30" r="1.5" fill="currentColor" />
          <circle cx="28" cy="30" r="1.5" fill="currentColor" />
          <circle cx="34" cy="30" r="1.5" fill="currentColor" />
          <path d="M35 55L45 45L35 35" strokeWidth="1.5" />
          <path d="M50 55H65" strokeWidth="1.5" />
        </svg>
      );
    case 2:
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <path d="M50 20L85 35L50 50L15 35L50 20Z" strokeWidth="1.5" />
          <path d="M15 45L50 60L85 45" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M15 55L50 70L85 55" strokeWidth="1.5" />
          <line x1="50" y1="20" x2="50" y2="70" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );
    case 3:
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <circle
            cx="50"
            cy="50"
            r="20"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            style={{ transformOrigin: "center", animation: "spin 12s linear infinite" }}
          />
          <circle cx="50" cy="50" r="30" strokeWidth="1" opacity="0.5" />
          <circle
            cx="50"
            cy="50"
            r="40"
            strokeWidth="1"
            strokeDasharray="2 6"
            style={{ transformOrigin: "center", animation: "spin 16s linear infinite reverse" }}
          />
          <circle cx="50" cy="50" r="5" fill="currentColor" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
          <circle cx="20" cy="50" r="2" fill="currentColor" />
          <circle cx="80" cy="50" r="2" fill="currentColor" />
          <circle cx="50" cy="20" r="2" fill="currentColor" />
          <circle cx="50" cy="80" r="2" fill="currentColor" />
          <line x1="20" y1="50" x2="30" y2="50" strokeWidth="1" />
          <line x1="70" y1="50" x2="80" y2="50" strokeWidth="1" />
          <line x1="50" y1="20" x2="50" y2="30" strokeWidth="1" />
          <line x1="50" y1="70" x2="50" y2="80" strokeWidth="1" />
        </svg>
      );
    default:
      return null;
  }
};

export default AbstractGraphic;
