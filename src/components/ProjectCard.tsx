"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import { useId, useState, type PointerEvent } from "react";
import { statusLabel, type Project } from "@/content/projects";

const statusTone: Record<string, string> = {
  live: "border-cyan/60 text-cyan",
  "in-progress": "border-violet/60 text-violet-soft",
  coursework: "border-silver/40 text-silver",
  archive: "border-line-strong text-muted",
};

function Detail({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="label mb-2">{label}</dt>
      <dd className="text-sm leading-relaxed text-silver">{children}</dd>
    </div>
  );
}

export function ProjectCard({
  project: p,
  featured = false,
  image,
}: {
  project: Project;
  featured?: boolean;
  image?: { src: string; alt: string; width: number; height: number };
}) {
  const [open, setOpen] = useState(featured);
  const panelId = useId();

  const track = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <article
      onPointerMove={track}
      className="spotlight group relative border border-line bg-surface/40 transition-colors duration-500 hover:border-line-strong"
    >
      <div className={`grid gap-8 p-6 sm:p-10 ${featured && image ? "lg:grid-cols-[1fr_1.1fr]" : ""}`}>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-violet-soft">{p.index}</span>
            {p.status.map((s) => (
              <span
                key={s}
                className={`border px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] uppercase ${statusTone[s]}`}
              >
                {statusLabel[s]}
              </span>
            ))}
            <span className="font-mono text-xs text-muted">{p.period}</span>
          </div>
          <h3 className={`mt-5 font-display leading-[1.02] text-fg ${featured ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}>
            {p.title}
          </h3>
          <p className="mt-4 max-w-2xl leading-relaxed text-silver">{p.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {p.stack.map((s) => (
              <li key={s} className="bg-white/[0.04] px-2.5 py-1 font-mono text-[0.6875rem] text-silver">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-fg uppercase"
            >
              <Plus className={`size-4 transition-transform duration-500 ${open ? "rotate-45" : ""}`} aria-hidden />
              {open ? "Hide case study" : "Read case study"}
            </button>
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.12em] text-muted uppercase transition-colors hover:text-fg"
              >
                {l.label}
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  aria-hidden
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>

        {featured && image && (
          <div className="relative overflow-hidden border border-line">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full w-full object-cover object-top opacity-80 grayscale-[35%] transition-[transform,opacity,filter] duration-[1.2s] ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <dl className="grid gap-8 border-t border-line p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-3">
              <Detail label="Problem">{p.problem}</Detail>
              <Detail label="Role">{p.role}</Detail>
              <Detail label="What I learned">{p.learned}</Detail>
              <Detail label="What is built" className="sm:col-span-2 lg:col-span-2">
                <ul className="space-y-2">
                  {p.built.map((b) => (
                    <li key={b} className="relative pl-5">
                      <span aria-hidden className="absolute top-[0.6em] left-0 h-px w-2.5 bg-violet" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Detail>
              {p.next && (
                <Detail label="Not yet built">
                  <ul className="space-y-2">
                    {p.next.map((n) => (
                      <li key={n} className="relative pl-5">
                        <span aria-hidden className="absolute top-[0.6em] left-0 h-px w-2.5 bg-muted" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </Detail>
              )}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
