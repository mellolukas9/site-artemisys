# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing/landing page for Artemisys, a Brazilian AI automation consulting company. Pure HTML/CSS/JS — no build tools, no framework, no package manager.

## Running Locally

No build step needed. Serve directly:

```bash
python -m http.server 8000
# or
npx http-server
```

Then open `http://localhost:8000`.

## Architecture

Single-page site with three files:

- **`index.html`** — All content and structure. Sections in order: Navbar → Hero → Features → How It Works → Cases → About → CTA → Contact → Footer. Language is Portuguese (pt-BR).
- **`style.css`** — All styles. Uses CSS custom properties defined at `:root` (colors, spacing, radii). Responsive via `clamp()` and CSS Grid/Flexbox.
- **`main.js`** — Interactivity only: navbar scroll state, mobile hamburger menu, Intersection Observer for scroll-triggered fade-in animations, active nav link highlighting, cases carousel prev/next navigation, and contact form submission (formats a WhatsApp message and opens `wa.me/` URL — no backend).

## Key Design Details

**CSS variables (`:root`):**
- Primary: `--primary: #6c63ff` (purple)
- Accent: `--accent: #00b896` (green)
- Radii: `--radius: 16px`, `--radius-sm: 10px`, `--radius-full: 999px`

**Contact flow:** The form has no backend. On submit, `main.js` encodes the user's name, company, and message into a `wa.me/` URL that opens WhatsApp with a pre-filled message. WhatsApp number: `+55 21 99036-6370`.

**Animations:** Elements with `.fade-up` class are hidden initially and revealed by an `IntersectionObserver` in `main.js` with staggered delays driven by `data-delay` attributes.

**Features grid:** 3-column CSS Grid with 6 cards. Cards 1, 4, and 6 use `.feature-card-large` (`grid-column: span 2`). Order: Agentes de IA → Automação → Integração → Software Sob Medida → Gestão de Processos → Transformação Digital. This produces a clean 3×2 alternating layout without any explicit `grid-row`/`grid-column` overrides — just natural auto-placement.

**Cases carousel (`#cases`):** Horizontal scroll carousel using `scroll-snap-type: x mandatory` + `scroll-behavior: smooth`. No library. 6 cards (one per solution type). Arrow buttons (`cases-btn-prev` / `cases-btn-next`) handled in `main.js`. Cards are `.fade-up` with stagger. Arrows hidden on mobile (swipe only).
