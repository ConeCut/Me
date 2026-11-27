"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Section } from "../ui/Section";
import { skills, tiers, tools, type Tier } from "@/content/skills";

const tierKeys = Object.keys(tiers) as Tier[];

/** Distinct glyphs per tier — deliberately not a scale or percentage. */
function TierGlyph({ tier }: { tier: Tier }) {
  if (tier === "practical") return <span aria-hidden className="inline-block size-2.5 rounded-full bg-violet" />;
  if (tier === "developing")
    return (
      <span
        aria-hidden
        className="inline-block size-2.5 rounded-full border border-cyan bg-[linear-gradient(90deg,var(--color-cyan)_50%,transparent_50%)]"
      />
    );
  return <span aria-hidden className="inline-block size-2.5 rounded-full border border-silver" />;
}

export function Skills() {
  const [filter, setFilter] = useState<Tier | "all">("all");
  const visible = skills.filter((s) => filter === "all" || s.tier === filter);
  const groups = [...new Set(visible.map((s) => s.group))];

  return (
    <Section id="skills" index="04" title="Capabilities, stated honestly." kicker="Technical skills">
      <p className="max-w-2xl text-base leading-relaxed text-silver sm:text-lg">
        No percentage bars. Each skill is placed in one of three tiers, with the evidence behind it.
      </p>

      <div role="group" aria-label="Filter skills by tier" className="mt-10 flex flex-wrap gap-2">
        {(["all", ...tierKeys] as const).map((k) => {
          const pressed = filter === k;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={pressed}
              onClick={() => setFilter(k)}
              className={`inline-flex items-center gap-2.5 border px-4 py-2.5 font-mono text-xs tracking-[0.1em] uppercase transition-colors ${
                pressed ? "border-violet bg-violet/15 text-fg" : "border-line-strong text-muted hover:border-silver hover:text-fg"
              }`}
            >
              {k !== "all" && <TierGlyph tier={k} />}
              {k === "all" ? `All · ${skills.length}` : tiers[k].label}
            </button>
          );
        })}
      </div>
      <p className="mt-4 min-h-6 text-sm text-muted" aria-live="polite">
        {filter === "all" ? `Showing all ${skills.length} skills.` : `${tiers[filter].label}: ${tiers[filter].description}`}
      </p>

      <div className="mt-10 space-y-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((g) => (
            <motion.div
              key={g}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="label mb-3">{g}</h3>
              <ul className="border-t border-line">
                {visible
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <li
                      key={s.name}
                      className="group grid grid-cols-1 gap-x-6 gap-y-1 border-b border-line py-4 transition-colors hover:bg-white/[0.02] sm:grid-cols-[1fr_auto] xl:grid-cols-[14rem_12rem_1fr]"
                    >
                      <span className="text-lg text-fg transition-colors group-hover:text-violet-soft">{s.name}</span>
                      <span className="flex items-center gap-2.5 font-mono text-xs text-silver">
                        <TierGlyph tier={s.tier} />
                        {tiers[s.tier].label}
                      </span>
                      <span className="text-sm leading-relaxed text-muted sm:col-span-2 xl:col-span-1">{s.evidence}</span>
                    </li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-14">
        <p className="label mb-3">Tools &amp; environment</p>
        <p className="font-mono text-sm text-silver">{tools.join("  ·  ")}</p>
      </div>
    </Section>
  );
}
