# Alireza Pourgholam — Portfolio

Personal portfolio website built with Next.js, React Three Fiber, and Framer Motion. Bilingual (English / Persian), with full dark mode, responsive layout, and a 3D interactive element in the hero.

**Live:** [alirezapourgholam.dev](https://alirezapourgholam.dev)

---

## Features

- **Bilingual** — English and Persian (RTL) with live language switching
- **Dark / Light mode** — system-aware with manual toggle, persistent via `next-themes`
- **3D Hero element** — rotating `</>` bracket built with React Three Fiber / Three.js
- **Animated background** — aurora blobs, floating particles, parallax geometric shapes
- **Projects carousel** — responsive slide carousel with auto-rotate and RTL-aware animation
- **Skills section** — 3-column layout with primary expertise highlighted
- **Contact form** — EmailJS-powered, no backend required
- **Static export** — fully static (`output: 'export'`), deployable to Vercel / GitHub Pages

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19, Tailwind CSS 3, Framer Motion 11 |
| 3D | Three.js, React Three Fiber (@react-three/fiber) |
| Fonts | next/font/google — Space Grotesk · DM Sans · JetBrains Mono |
| Persian font | Vazirmatn (self-hosted WOFF2) |
| Theme | next-themes |
| Icons | Lucide React |
| Language | TypeScript 5 |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

The build output goes to `/out` (static export). Deploy the `/out` folder to any static host.

---

## Project Structure

```
src/
  app/           # Next.js App Router — layout, page, globals.css, not-found
  components/
    sections/    # Hero, About, Skills, Projects, AITools, Contact, Footer
    three/       # HeroOrb (React Three Fiber)
  lib/
    content.ts   # All bilingual copy — English + Persian
    LangContext  # Language / RTL context
```

---

## Fonts

Google Fonts (Space Grotesk, DM Sans, JetBrains Mono) are loaded via `next/font/google`, which downloads and bundles them at build time — no external CDN dependency at runtime.

Vazirmatn (Persian) is self-hosted under `public/fonts/` as WOFF2 files.

---

## License

MIT — feel free to use as a reference or starting point for your own portfolio.
