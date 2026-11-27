# Portfolio v1 Implementation Plan

> Executed natively in the authoring session (user approved direction and asked for phased implementation).

**Goal:** Static Next.js portfolio + interactive CV for Cosmin-Ionel Enachescu, with a generated PDF CV.
**Architecture:** Next.js App Router, statically rendered single page (`/`) + print route (`/cv`). All facts live in typed modules under `src/content/`; components only render them. PDF is printed from `/cv` by a Playwright script into `public/cv.pdf`.
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, motion (Framer Motion), lucide-react, @playwright/test (dev).
**Spec:** `docs/superpowers/specs/2026-11-27-portfolio-design.md`

## Global Constraints
- Location string exactly "Oslo, Norway". No phone, DOB, address, age.
- No aviation-security training, no air-cargo role, no Sector Alarm.
- No skill percentages. Tiers only: "Practical use", "Currently developing", "Academic foundations".
- Degree shown as ongoing, planned completion spring 2028.
- Accent colours: violet #7C5CFF (signal), cyan #5FB3B3 (status/data only).
- Every animation respects `prefers-reduced-motion`.

## Review Focus
1. Reduced motion on → hero canvas renders one static frame, no reveal transforms.
2. 320px-wide phone → name does not overflow horizontally; nav collapses to a menu operable by keyboard (Esc closes, focus returns).
3. Keyboard-only user → skip link, visible focus on every link/button, skills filter usable via tab/arrow.
4. `/cv` printed → single-column, black on white, no nav/canvas, fits 2 A4 pages.
5. External links → `target="_blank"` with `rel="noopener noreferrer"`; all resolve (checked by e2e).

## Tasks
1. **Scaffold** — create-next-app (TS, Tailwind, App Router, src/), add motion + lucide-react, fonts via `next/font` (Instrument Serif, Geist, Geist Mono), tokens in `src/app/globals.css`, `CLAUDE.md`. Verify: `npm run build` passes.
2. **Content** — `src/content/{profile,experience,education,skills,projects,qualifications}.ts` with exported typed arrays. Verify: `npx tsc --noEmit`.
3. **Shell** — `Header` (desktop nav + mobile menu), `Footer`, `Section` wrapper, `Reveal` motion wrapper, skip link, grain/light background.
4. **Sections** — `Hero` (+ `ClusterField` canvas), `About`, `Experience`, `Education`, `Skills` (filterable), `Projects`, `Qualifications`, `Contact`.
5. **CV** — `src/app/cv/page.tsx` + print CSS; `scripts/build-cv.mjs` (Playwright → `public/cv.pdf`); `npm run cv`.
6. **SEO/a11y** — metadata, OG image (`opengraph-image.tsx`), `sitemap.ts`, `robots.ts`, JSON-LD Person.
7. **QA** — `e2e/site.spec.ts`: renders sections, mobile menu, skills filter, links valid, cv.pdf served, no console errors; screenshots at 375/768/1440; build; code review; README; commit; push.
