import React from "react";

const projects = [
  {
    id: 1,
    title: "Bashion Fashion",
    description: "E-commerce fashion platform with modern UI, product filtering, and smooth checkout experience.",
    tags: ["React", "Tailwind", "Node.js"],
    gradient: "from-violet-500 to-fuchsia-500",
    link: "#",
  },
  {
    id: 2,
    title: "Dentist Workshop",
    description: "Clinic booking system with appointment scheduling, patient management, and responsive design.",
    tags: ["React", "GSAP", "REST API"],
    gradient: "from-teal-500 to-cyan-500",
    link: "#",
  },
  {
    id: 3,
    title: "Lawcorps",
    description: "Legal services landing page with consultation booking and secure document submission flow.",
    tags: ["React", "Tailwind", "Vite"],
    gradient: "from-amber-500 to-orange-500",
    link: "#",
  },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 11.5l9-9M5 2.5h6.5V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Projects = () => {
  return (
    <div className="py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <p className="scroll-reveal text-xs font-mono text-violet-600 dark:text-violet-400 tracking-[0.2em] uppercase mb-4">
          Selected Work
        </p>
        <h2 className="scroll-reveal text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-16" data-delay="60ms">
          What I&apos;ve Built
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <a
              key={p.id}
              href={p.link}
              className="scroll-reveal group flex flex-col rounded-2xl overflow-hidden
                bg-white dark:bg-white/[0.03]
                border border-gray-100 dark:border-white/[0.07]
                shadow-sm
                hover:-translate-y-1 hover:shadow-xl hover:border-gray-200 dark:hover:border-white/12
                active:scale-[0.98]
                transition-all duration-200 ease-out"
              data-delay={`${i * 80}ms`}
            >
              {/* Gradient header */}
              <div className={`h-40 bg-gradient-to-br ${p.gradient} opacity-80 dark:opacity-60`} />

              {/* Body */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {p.title}
                  </h3>
                  <span className="shrink-0 text-gray-400 dark:text-gray-600 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-150 mt-0.5">
                    <ArrowIcon />
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded-full
                        bg-gray-100 dark:bg-white/5
                        text-gray-500 dark:text-gray-500
                        border border-gray-200 dark:border-white/8"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
