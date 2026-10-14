/* Non-translatable project data. Copy (category, description, case study)
   lives in i18n/translations.js under projects.items[id].
   Client screenshots ship at 1600w + 800w; concept thumbnails at 800w only. */

import tumbuh from "../assets/projects/tumbuh.webp";
import tumbuhSm from "../assets/projects/tumbuh-800.webp";
import plastik from "../assets/projects/plastik.webp";
import plastikSm from "../assets/projects/plastik-800.webp";
import ksp from "../assets/projects/ksp-uajy.webp";
import kspSm from "../assets/projects/ksp-uajy-800.webp";
import link2026 from "../assets/projects/link2026.webp";
import link2026Sm from "../assets/projects/link2026-800.webp";

import meridianSm from "../assets/projects/meridian-800.webp";
import lumiereSm from "../assets/projects/lumiere-800.webp";
import neoBrutSm from "../assets/projects/neo-brutalism-800.webp";
import bashionSm from "../assets/projects/bashion-800.webp";
import dentistSm from "../assets/projects/dentist-800.webp";

/* Real work: clients, a live product, a campus community, a contest. */
export const CLIENT_PROJECTS = [
  {
    id: "tumbuh",
    title: "Tumbuh AI",
    domain: "tumbuh.tech",
    link: "https://www.tumbuh.tech/",
    tags: ["AI / RAG", "Meta API", "React", "Node.js", "PostgreSQL"],
    img: tumbuh,
    imgSm: tumbuhSm,
  },
  {
    id: "plastik",
    title: "Sumber Aneka Plastik & Kemasan",
    domain: "sumberanekaplastikdankemasan.com",
    link: "https://sumberanekaplastikdankemasan.com",
    tags: ["Next.js", "Tailwind", "GSAP"],
    img: plastik,
    imgSm: plastikSm,
  },
  {
    id: "ksp",
    title: "Kelompok Studi Pemrograman UAJY",
    domain: "ksp-uajy.vercel.app",
    link: "https://ksp-uajy.vercel.app/",
    tags: ["Next.js", "React", "Tailwind"],
    img: ksp,
    imgSm: kspSm,
  },
  {
    id: "link",
    title: "LINK 2026",
    domain: "link-2026-seven.vercel.app",
    link: "https://link-2026-seven.vercel.app",
    tags: ["Next.js", "React", "Tailwind"],
    img: link2026,
    imgSm: link2026Sm,
  },
];

/* Concept work: self-initiated explorations, labelled as such on the page.
   link: null keeps a demo private (screenshot only). */
export const CONCEPT_PROJECTS = [
  {
    id: "meridian",
    title: "Meridian Architecture",
    link: "https://meridian-architecture-one.vercel.app/",
    img: meridianSm,
  },
  {
    id: "lumiere",
    title: "Lumière Beauty Clinic",
    link: "https://lumiere-beauty-clinic.vercel.app/",
    img: lumiereSm,
  },
  {
    id: "neobrut",
    title: "Neo Brutalism Fashion",
    link: "https://neo-brutalism-fashion.vercel.app/",
    img: neoBrutSm,
  },
  {
    id: "bashion",
    title: "Bashion Fashion",
    link: null,
    img: bashionSm,
  },
  {
    id: "dentist",
    title: "Dentist Workshop",
    link: "https://zeraphys57.github.io/Klinik-Gigi-UI/",
    img: dentistSm,
  },
];
