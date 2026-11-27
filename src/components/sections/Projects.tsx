import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { ProjectCard } from "../ProjectCard";
import { projects } from "@/content/projects";

export function Projects() {
  const [featured, ...rest] = projects;
  const current = rest.filter((p) => !p.status.includes("archive"));
  const archive = rest.filter((p) => p.status.includes("archive"));

  return (
    <Section id="work" index="05" title="Selected work" kicker="Projects">
      <p className="max-w-2xl text-base leading-relaxed text-silver sm:text-lg">
        Each project is described as it actually stands, including what is not finished yet.
      </p>

      <div className="mt-12 space-y-6">
        <Reveal>
          <ProjectCard
            project={featured}
            featured
            image={{
              src: "/projects/mika-as.png",
              alt: "Screenshot of the MIKA AS website home page",
              width: 1440,
              height: 900,
            }}
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {current.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <p className="label mb-2">Earlier work · Kuben VGS, 2023–2024</p>
        <p className="mb-8 max-w-2xl text-sm text-muted">
          School projects in PHP and MySQL. Kept for context: they show where my web and database work started.
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {archive.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
