import React from "react";

/* A minimal browser window around a real screenshot: traffic lights + address bar. */
const BrowserFrame = ({ domain, className = "", children }) => (
  <div
    className={`overflow-hidden rounded-xl border border-black/10 dark:border-white/10
      bg-[#0c0c0f] shadow-2xl ${className}`}
  >
    <div className="flex items-center gap-3 h-8 px-3 bg-white/[0.05] border-b border-white/[0.07]" aria-hidden="true">
      <div className="flex gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/[0.16]" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/[0.1]" />
      </div>
      <div className="flex-1 min-w-0 flex items-center gap-1.5 h-5 px-2.5 rounded-md bg-white/[0.06]">
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" className="shrink-0">
          <rect x="2.5" y="5.5" width="7" height="5" rx="1" stroke="white" strokeOpacity="0.45" strokeWidth="1.1" />
          <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="white" strokeOpacity="0.45" strokeWidth="1.1" />
        </svg>
        <span className="truncate text-xs font-mono text-white/55">{domain}</span>
      </div>
    </div>
    {children}
  </div>
);

export default BrowserFrame;
