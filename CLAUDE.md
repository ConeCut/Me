# CLAUDE.md — Cosmin-Ionel Enachescu portfolio

@AGENTS.md

Personal website + interactive CV. Static Next.js app; no backend, no database, no auth.

## Commands
- `npm run dev` — dev server on :3000
- `npm run build` — production build (must pass before any commit)
- `npm run typecheck` / `npm run lint`
- `npm run cv` — prints `/cv` to `public/cv.pdf` (needs a fresh `npm run build`; uses Playwright Chromium)
- `npx playwright test` — e2e + axe accessibility + content guard (runs against the production build on :3100)
- `node scripts/screenshots.mjs <dir> [url]` — full-page shots at 375/768/1440 + console-error and overflow check

## Architecture
- Hosting: Cloudflare Workers (Workers Builds auto-configures OpenNext). Keep `package.json` `name` = `me`, and do not enable `cacheComponents` (requests hang on Workers).
- `src/content/*.ts` — **the only place facts live.** Profile, experience, education, skills, projects, qualifications. The site and `/cv` both render from here; never hard-code a fact in a component.
- `src/app/(site)/` — the one-page site (layout adds header, footer, grain, MotionConfig, JSON-LD). `src/app/cv/` — print-styled CV outside the site chrome.
- `src/components/sections/*` — one file per section. `src/components/ui/*` — `Section` frame, `Reveal`, `MotionProvider`.
- `ClusterField.tsx` — canvas k-means (Lloyd iterations). Decorative, `aria-hidden`, static frame under reduced motion, paused off-screen.
- Server components by default; `"use client"` only for interaction (Header, Skills filter, ProjectCard, CopyEmail, motion wrappers, canvas).

## Content rules (non-negotiable)
- Source of truth: the dossier of 27 Nov 2026 plus Cosmin's decisions. Do not invent achievements, metrics, titles or completion status.
- Location is exactly "Oslo, Norway". No phone, address, date of birth or age.
- Excluded on purpose: aviation cargo security training (EU 2015/1998) **and** the MIKA AS "Responsible Person – Air Cargo Security" role; Sector Alarm. `e2e/site.spec.ts` "content guard" fails if they appear.
- Degree is ongoing (planned completion spring 2028). Autumn 2026 courses are "in progress"; earlier ones "completed".
- Skills use three tiers only — Practical use / Currently developing / Academic foundations. Never percentages. React, Tailwind, FastAPI stay "developing"; ML topics stay "academic".
- Projects state what is not finished (MIKA AS back-end, tracking, placeholder copy). Kuben VGS PHP work is labelled "earlier work".
- No LinkedIn link until Cosmin supplies the URL.
- Tone: confident but measured, specific, evidence-led. First person sparingly.

## Design system — "Obsidian / Signal"
- Dark-only (`color-scheme: dark`; print switches to light). Tokens in `src/app/globals.css` `@theme`.
- Colours: ink `#0b0b0d`, surface `#121216`, fg `#e8e8ec`, silver `#b9b9c2`, muted `#9898a2`. Signal: violet `#7c5cff` (accents/lines), `violet-deep #6d4aff` for filled buttons with white text (AA), cyan `#5fb3b3` for status/data only.
- Type: Instrument Serif (display, `font-display`), Geist (body), Geist Mono (`label` utility for technical labels).
- Layout: 12-col grid, max-w 90rem, mono index rail on the left of each section (`Section`).
- Motion: slow ease-out-expo reveals, once. Nothing moves at idle except the hero canvas. `MotionConfig reducedMotion="user"` + CSS reduced-motion guard.
- Avoid: neon glows, glassmorphism, gradient text, random floating shapes, 3D.

## Quality gate before commit
build ✓, typecheck ✓, lint ✓, `npx playwright test` ✓ (incl. axe AA), regenerate `public/cv.pdf` if content changed.
