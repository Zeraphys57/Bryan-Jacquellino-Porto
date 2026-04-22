# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `my-app/`:

```bash
npm run dev       # Start dev server (Vite, http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Serve the dist/ build locally
npm run lint      # ESLint check
```

There are no tests.

## Architecture

**Stack:** React 19 + Vite 6 + Tailwind CSS v4 + Framer Motion + GSAP + AOS + Three.js

**Tailwind v4 note:** Uses `@tailwindcss/vite` plugin (not PostCSS). Dark mode is configured via `@custom-variant dark` in `index.css`, not in `tailwind.config.js`. Class-based dark mode: `document.documentElement.classList.add("dark")`.

### Dark mode — known duplication

Dark mode state lives in **two places** that must stay in sync:
1. `App.jsx` — local `isDarkMode` state, passed as props to `<Header>` and used for MetaBalls color.
2. `ThemeContext.jsx` — a separate `isDarkMode` state exposed via context. Currently unused by any consumer (no component calls `useContext(ThemeContext)`).

The `<ThemeProvider>` wrapper in `App.jsx` is effectively a no-op right now. If you add context consumers, they will have their own independent state.

### Component naming mismatch

- `ImBryan.jsx` — personal bio section (photo + multi-paragraph text + Lanyard 3D card). Not "About".
- `About.jsx` — education timeline with GSAP scroll-driven line animation. Not the bio.

### Animation layers

| Library | Used in | Pattern |
|---|---|---|
| AOS | `App.jsx`, `ImBryan.jsx` | `data-aos="fade-up"` attributes; initialized once in `App.jsx` (authoritative) and again in `ImBryan.jsx` (redundant) |
| GSAP + ScrollTrigger | `About.jsx` | Programmatic `gsap.fromTo()` with `scrollTrigger`; registered via `gsap.registerPlugin(ScrollTrigger)` |
| Framer Motion | `Header.jsx` | Spring/easing on burger menu icon and dark mode toggle icon |

### 3D / WebGL components

**`Lanyard.jsx`** — Physics-simulated ID card on a rope. Uses `@react-three/fiber` canvas, `@react-three/rapier` for rope joints (`useRopeJoint`, `useSphericalJoint`), `@react-three/drei` for GLTF/texture loading. Assets: `assets/card.glb`, `assets/lanyard.png`. Rendered inside `ImBryan.jsx` at desktop widths only (`hidden md:block`).

**`MetaBalls.jsx`** — Custom WebGL metaball shader via OGL (not Three.js). Renders to a full-bleed `absolute` canvas behind all content (`z-5 blur-3xl`). Color is driven by `isDarkMode` from `App.jsx` props.

### Background

Aurora gradient is a pure CSS animation defined in `index.css` under `.aurora-bg` / `.dark .aurora-bg`. MetaBalls renders on top of it at `z-5` with `blur-3xl`, creating the layered fluid effect.
