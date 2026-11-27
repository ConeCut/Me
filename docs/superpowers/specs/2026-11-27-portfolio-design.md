# Portfolio v1 — Design

Approved by Cosmin on 2026-11-27 ("Approve direction").

## Intent
A personal website that works as CV, portfolio and digital identity. A recruiter should understand within one screen who Cosmin is (UiO Informatics: ML & AI student, Oslo), what he has worked on, what he knows, and where he is developing.

## Goals / non-goals / anti-goals
- Goals: credible, evidence-led copy; distinctive dark editorial look; downloadable ATS-friendly CV generated from the same data as the site; accessible, fast, static.
- Non-goals: backend, CMS, auth, Norwegian translation (v1 is English), blog.
- Anti-goals: invented metrics, skill percentages, inflated claims, generic template look, neon/glassmorphism, constant motion.

## Content decisions (from user)
- Experience: MIKA AS (Transport Leader; Administrative Secretary), P-Norge AS, VestPark AS, Wolt, Wolves Services AS. The MIKA "Responsible Person – Air Cargo Security" role is removed entirely. Sector Alarm omitted.
- Qualifications: national van transport licence (nasjonalt varebilløyve), driving licences B and A, languages. No aviation-security training.
- Contact: email + GitHub. No phone. No LinkedIn until a URL is provided.
- Courses: show completed vs in progress. User is in 2nd year, 1st semester (autumn 2026), exams not yet taken. In progress = autumn courses: IN2010, IN2090. Completed (year 1) = IN1020, MAT1080 (autumn 2025), IN1010, STK-IN1050, IN1160 (spring 2026). Teaching semesters verified on uio.no except IN1160 (page 404) — *builder's inference, confirm with user*.
- Projects: MIKA AS (live static front-end at mika-as.eu, back-end planned), this portfolio, UiO coursework topics (no public code), earlier Kuben VGS work: cars4u, ace ticket system, PHP auth (MVC split), Python exercises.

## Approaches considered
1. **Next.js App Router, static, typed content (chosen)** — matches the brief, good metadata/SEO, `/cv` print route reuses data.
2. Astro — lighter, but user asked for Next/React and React skill development is part of the story.
3. Plain HTML/CSS — fastest, but weaker as a technical showcase and duplicates CV data.

## Design
- Concept "Obsidian / Signal". Tokens: bg #0B0B0D, surfaces charcoal, text silver, accent electric violet #7C5CFF, secondary muted cyan #5FB3B3 (status/data only). Film grain + one soft violet light.
- Type: Instrument Serif (display), Geist (body), Geist Mono (labels).
- Hero: oversized name, asymmetric 12-col grid, k-means point field on canvas (static under reduced motion).
- Skills: three tiers (Practical / Developing / Academic) with evidence per skill, filterable. No percentages.
- Experience: timeline with two tracks (operations, study).
- Projects: case-study cards (problem, role, stack, status, learned) with status badges Live / In progress / Archive.
- CV: `/cv` print route → `public/cv.pdf` via Playwright script.

## Left to the builder
Exact copy wording within the dossier's facts, component breakdown, animation timings, OG image design.
