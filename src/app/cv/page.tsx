import type { Metadata } from "next";
import Link from "next/link";
import { profile, languages } from "@/content/profile";
import { sortedExperience } from "@/content/experience";
import { kuben, uio } from "@/content/education";
import { skills, tiers, tools, type Tier } from "@/content/skills";
import { projects } from "@/content/projects";
import { qualifications } from "@/content/qualifications";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae of ${profile.name}.`,
  alternates: { canonical: "/cv" },
};

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-7 mb-2 border-b border-neutral-300 pb-1 text-[11pt] font-semibold tracking-[0.08em] text-neutral-900 uppercase">
      {children}
    </h2>
  );
}

/** ATS-friendly CV: one column, real text, standard headings. Printed to /public/cv.pdf by scripts/build-cv.mjs. */
export default function CvPage() {
  const byTier = (t: Tier) => skills.filter((s) => s.tier === t).map((s) => s.name).join(", ");
  const featuredProjects = projects.filter((p) => !p.status.includes("archive"));
  const archive = projects.filter((p) => p.status.includes("archive"));

  return (
    <div className="min-h-dvh bg-neutral-200 py-10 text-neutral-800 print:bg-white print:py-0">
      <nav className="mx-auto mb-6 flex max-w-[210mm] justify-between px-4 font-mono text-xs print:hidden">
        <Link href="/" className="underline underline-offset-4">
          ← Back to portfolio
        </Link>
        <a href="/cv.pdf" download="Cosmin-Ionel_Enachescu_CV.pdf" className="underline underline-offset-4">
          Download PDF
        </a>
      </nav>

      <main className="mx-auto max-w-[210mm] bg-white px-[16mm] py-[14mm] font-sans text-[9.5pt] leading-[1.45] shadow-xl print:max-w-none print:p-0 print:shadow-none">
        <header>
          <h1 className="text-[22pt] leading-tight font-semibold text-neutral-950">{profile.name}</h1>
          <p className="mt-1 text-[11pt] text-neutral-700">{profile.role}</p>
          <p className="mt-2 text-neutral-700">
            {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
            <a href={profile.github}>github.com/{profile.githubHandle}</a>
          </p>
        </header>

        <H>Profile</H>
        <p>{profile.summary}</p>

        <H>Experience</H>
        {sortedExperience.map((r) => (
          <section key={`${r.company}-${r.title}`} className="mb-3 break-inside-avoid">
            <div className="flex justify-between gap-4">
              <h3 className="font-semibold text-neutral-950">
                {r.title}, {r.company}
              </h3>
              <span className="shrink-0 text-neutral-600">{r.period}</span>
            </div>
            <ul className="mt-0.5 list-disc pl-4">
              {r.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        ))}

        <H>Education</H>
        <section className="mb-3 break-inside-avoid">
          <div className="flex justify-between gap-4">
            <h3 className="font-semibold text-neutral-950">
              {uio.programme}, {uio.institution}
            </h3>
            <span className="shrink-0 text-neutral-600">{uio.period}</span>
          </div>
          <p>{uio.status}</p>
          <p className="mt-1">
            <span className="font-medium">In progress:</span>{" "}
            {uio.courses.filter((c) => c.status === "in-progress").map((c) => `${c.code} ${c.title}`).join("; ")}.
          </p>
          <p>
            <span className="font-medium">Completed:</span>{" "}
            {uio.courses.filter((c) => c.status === "completed").map((c) => `${c.code} ${c.title}`).join("; ")}.
          </p>
        </section>
        <section className="break-inside-avoid">
          <div className="flex justify-between gap-4">
            <h3 className="font-semibold text-neutral-950">
              {kuben.programme}, {kuben.institution}
            </h3>
            <span className="shrink-0 text-neutral-600">{kuben.period}</span>
          </div>
        </section>

        <H>Technical skills</H>
        {(Object.keys(tiers) as Tier[]).map((t) => (
          <p key={t}>
            <span className="font-medium">{tiers[t].label}:</span> {byTier(t)}.
          </p>
        ))}
        <p>
          <span className="font-medium">Tools:</span> {tools.join(", ")}.
        </p>

        <H>Projects</H>
        {featuredProjects.map((p) => (
          <section key={p.slug} className="mb-2 break-inside-avoid">
            <h3 className="font-semibold text-neutral-950">
              {p.title} <span className="font-normal text-neutral-600">· {p.period}</span>
            </h3>
            <p>
              {p.summary} <span className="text-neutral-600">({p.stack.join(", ")})</span>
            </p>
          </section>
        ))}
        <p className="break-inside-avoid">
          <span className="font-medium">Earlier school projects (Kuben VGS):</span>{" "}
          {archive.map((p) => p.title).join("; ")} — PHP and MySQL.
        </p>

        <div className="grid grid-cols-2 gap-8 break-inside-avoid">
          <div>
            <H>Licences</H>
            <ul className="list-disc pl-4">
              {qualifications.map((q) => (
                <li key={q.title}>{q.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <H>Languages</H>
            <ul className="list-disc pl-4">
              {languages.map((l) => (
                <li key={l.name}>
                  {l.name} — {l.level}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
