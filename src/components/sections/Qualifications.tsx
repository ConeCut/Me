import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { qualifications } from "@/content/qualifications";
import { languages } from "@/content/profile";

export function Qualifications() {
  return (
    <Section id="qualifications" index="06" title="Licences & languages" kicker="Qualifications">
      <div className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <h3 className="label mb-4">Licences &amp; permits</h3>
          <ul className="border-t border-line">
            {qualifications.map((q) => (
              <li key={q.title} className="border-b border-line py-5">
                <p className="text-lg text-fg">{q.title}</p>
                <p className="mt-1 text-sm text-muted">{q.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="label mb-4">Languages</h3>
          <dl className="border-t border-line">
            {languages.map((l) => (
              <div key={l.name} className="flex items-baseline justify-between gap-6 border-b border-line py-5">
                <dt className="font-display text-2xl text-fg">{l.name}</dt>
                <dd className="text-right font-mono text-xs text-silver">{l.level}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
