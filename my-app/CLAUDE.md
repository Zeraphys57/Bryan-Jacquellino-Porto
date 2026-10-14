# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `my-app/`:

```bash
npm run dev       # Start dev server (Vite, http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Serve the dist/ build locally
npm run lint      # ESLint check
node screenshot.js <url> <name>   # Capture a project screenshot into src/assets/projects/
```

There are no tests.

## Architecture

**Stack:** React 19 + Vite 6 + Tailwind CSS v4 (`@tailwindcss/vite`, no PostCSS config). No animation libraries: motion is CSS keyframes in `index.css` plus small IntersectionObserver / rAF helpers.

Audience and goals live in `PRODUCT.md`: Indonesian small-business owners first (non-technical), Australian clients second. Copy is outcome-first, no jargon.

### Page structure (`App.jsx`)

`Hero → Projects (#work) → Services → Process → About → FAQ → ContactCTA (#contact) → Footer`, plus fixed layers: `Cursor`, `ScrollProgress`, `AmbientBackground`, `FloatingWhatsApp`, and the hidden pricing modals `SecretPitch` (Alt+P, IDR) / `SecretPitchAUS` (Alt+Q, AUD).

- Shared margins, widths and heading styles: `src/component/layout.js` (`PAGE_X`, `CONTAINER`, `SECTION_Y`, `H2`, `LEAD`).
- Contact details (WhatsApp number, email, socials) and `waLink(message)`: `src/contact.js` only.
- Portrait: `src/assets/bryan-portrait.webp` (4:5, About) and `bryan-avatar.webp` (square, hero) are crops of a white-background studio photo. They sit on a light panel with `mix-blend-multiply`, which turns the white backdrop into the panel colour in both themes. Keep that treatment (and `isolate` on the panel) if the photo changes.
- Project data (titles, links, tags, screenshots): `src/data/projects.js`. `CLIENT_PROJECTS` = real work (1600w + 800w images); `CONCEPT_PROJECTS` = self-initiated concepts, always labelled "Konsep" on the page. Never present a concept as client work or give it client results.

### i18n

`src/i18n/translations.js` holds all copy for `id`, `en`, `zh` (Traditional Chinese). `LanguageContext` picks the language: saved choice → browser language → Indonesian time zone → `en`, and sets `<html lang>` and `document.title`. The WhatsApp pre-filled message is per language (`t.whatsapp.message`).

### Dark mode

Class-based (`@custom-variant dark` in `index.css`). `main.jsx` sets the `.dark` class before first render; `App.jsx` owns `isDarkMode` state and passes it to `Header`, `AmbientBackground`, `ContactCTA`.

### Performance rules (keep them)

- Never put scroll or mousemove positions in React state. `ScrollProgress`, `Header`, `ContactCTA`, `AmbientBackground` write to the DOM / CSS variables directly, at most once per frame.
- `InteractiveDots` only animates while dots move and never on touch devices.
- Background glows are radial gradients, not `filter: blur()`.
- Below-the-fold images are `loading="lazy"`; hero screenshots are eager.
- `/invoice` (`src/invoice/InvoiceApp.jsx`, jsPDF + html2canvas) is lazy-loaded in `main.jsx` so portfolio visitors never download it.

### Scroll reveal

Add `scroll-reveal` (fade-up) or `reveal-line-x` / `reveal-line-y` (line draw) to an element; optional `data-delay="120ms"`. The observer lives in `App.jsx` and runs once on mount, so these classes only work on elements present at first render. `prefers-reduced-motion` shows everything immediately.

### Invoice tool

`/invoice` is an open invoice/PDF generator, with no login by design. It is lazy-loaded, marked noindex and disallowed in `robots.txt`. Never put secrets in client code: everything in the bundle is public.

### SEO

Meta tags, Open Graph (`public/og-cover.jpg`, 1200×630, under ~300 KB for WhatsApp; keep text out of the centre 630×630 square, which WhatsApp crops for thumbnails) and JSON-LD are in `index.html`; `public/robots.txt` and `public/sitemap.xml` exist. All absolute URLs use `https://bryan-jacquellino.vercel.app/` — update them together when moving to a custom domain.
