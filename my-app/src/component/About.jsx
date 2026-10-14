import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import { SOCIALS } from "../contact";
import { PAGE_X, CONTAINER, SECTION_Y, H2 } from "./layout";
import photo from "../assets/bryan.jpeg";

const TECH = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL",
  "Python", "GSAP", "Three.js", "LLM API & RAG", "Figma",
];

/* Who builds your site: a face, a short story, and the practical facts. */
const About = () => {
  const { t } = useLanguage();
  const ta = t.about;
  return (
    <section id="about" aria-labelledby="about-title" className={`${PAGE_X} ${SECTION_Y}`}>
      <div className={`${CONTAINER} grid md:grid-cols-12 gap-12 lg:gap-20 items-start`}>

        <div className="md:col-span-5 lg:col-span-4 scroll-reveal">
          <div className="relative max-w-[300px]">
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-violet-500/15 dark:bg-violet-500/20 blur-2xl" />
            <img
              src={photo}
              alt={ta.photoAlt}
              width="352"
              height="404"
              loading="lazy"
              decoding="async"
              className="relative w-full aspect-[352/404] object-cover rounded-2xl"
            />
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8">
          <h2 id="about-title" className={`scroll-reveal ${H2}`}>{ta.heading}</h2>
          {ta.paragraphs.map((para, i) => (
            <p
              key={i}
              className="scroll-reveal mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl"
              data-delay={`${60 + i * 60}ms`}
            >
              {para}
            </p>
          ))}

          <dl className="scroll-reveal mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-7 max-w-3xl" data-delay="180ms">
            {ta.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-sm text-gray-600 dark:text-gray-400">{f.label}</dt>
                <dd className="mt-1 text-base md:text-lg text-gray-900 dark:text-white">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="scroll-reveal mt-12 max-w-3xl" data-delay="240ms">
            <p className="text-sm text-gray-600 dark:text-gray-400">{ta.techLabel}</p>
            <p className="mt-2 text-base text-gray-800 dark:text-gray-200 leading-relaxed">{TECH.join(" · ")}</p>
          </div>

          <div className="scroll-reveal mt-10 flex items-center gap-5" data-delay="300ms">
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <FaGithub size={18} aria-hidden="true" /> GitHub
            </a>
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              <FaInstagram size={18} aria-hidden="true" /> Instagram
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
