import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { about, profile } from "@/content/profile";

export function About() {
  const [lead, ...rest] = about.paragraphs;
  return (
    <Section id="about" index="01" title="Two perspectives, one practice." kicker="About">
      <div className="grid grid-cols-9 gap-x-6 gap-y-14">
        <Reveal className="col-span-9 lg:col-span-6">
          <p className="text-xl leading-relaxed text-fg sm:text-2xl">{lead}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)} className="mt-6 text-base leading-relaxed text-silver sm:text-lg">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="col-span-9 lg:col-span-3 lg:pt-2">
          <figure className="border-l border-violet pl-6">
            <p className="label mb-3">The through-line</p>
            <blockquote className="font-display text-2xl leading-snug text-fg italic">{profile.throughLine}</blockquote>
          </figure>
          <p className="label mt-10 mb-3">Interests</p>
          <ul className="flex flex-wrap gap-2">
            {about.interests.map((i) => (
              <li key={i} className="border border-line-strong px-3 py-1.5 text-sm text-silver">
                {i}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="col-span-9">
          <p className="label mb-6">Working style</p>
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {about.workingStyle.map((w, i) => (
              <Reveal key={w.label} delay={i * 0.06} className="bg-ink p-6">
                <dt className="font-mono text-xs tracking-[0.12em] text-violet-soft uppercase">{w.label}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-silver">{w.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
