import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { kuben, uio } from "@/content/education";

export function Education() {
  const inProgress = uio.courses.filter((c) => c.status === "in-progress");
  const completed = uio.courses.filter((c) => c.status === "completed");

  return (
    <Section id="education" index="03" title="Education" kicker="Education">
      <Reveal>
        <article className="border border-line bg-surface/60 p-6 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="label">{uio.institution}</p>
              <h3 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-fg sm:text-4xl">{uio.programme}</h3>
              <p className="mt-3 font-mono text-xs text-silver">{uio.period}</p>
            </div>
            <span className="border border-violet/60 bg-violet/10 px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-violet-soft uppercase">
              {uio.status}
            </span>
          </div>

          <div className="mt-10">
            <p className="label mb-3">Progress · semester {uio.currentSemester + 1} of {uio.semesters.length}</p>
            <ol className="grid grid-cols-6 gap-1" aria-label={`Semester ${uio.currentSemester + 1} of ${uio.semesters.length}`}>
              {uio.semesters.map((s, i) => (
                <li key={s}>
                  <span
                    aria-hidden
                    className={`block h-1.5 ${
                      i < uio.currentSemester ? "bg-silver/60" : i === uio.currentSemester ? "bg-violet" : "bg-line-strong"
                    }`}
                  />
                  <span className={`mt-2 block font-mono text-[0.625rem] ${i === uio.currentSemester ? "text-violet-soft" : "text-muted"}`}>
                    {s}
                    <span className="sr-only">{i < uio.currentSemester ? " completed" : i === uio.currentSemester ? " current" : " upcoming"}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {[
              { title: "In progress · autumn 2026", list: inProgress, tone: "text-cyan", dot: "bg-cyan" },
              { title: "Completed", list: completed, tone: "text-silver", dot: "bg-silver" },
            ].map((group) => (
              <div key={group.title}>
                <p className="label mb-4 flex items-center gap-2">
                  <span aria-hidden className={`size-1.5 rounded-full ${group.dot}`} />
                  {group.title}
                </p>
                <ul className="border-t border-line">
                  {group.list.map((c) => (
                    <li key={c.code} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
                      <span className={`font-mono text-sm ${group.tone}`}>{c.code}</span>
                      <span>
                        <span className="block text-fg">{c.title}</span>
                        <span className="mt-1 block text-sm text-muted">{c.topics}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.1}>
        <article className="mt-6 grid gap-4 border border-line p-6 sm:grid-cols-[1fr_auto] sm:p-10">
          <div>
            <p className="label">{kuben.institution}</p>
            <h3 className="mt-3 font-display text-2xl text-fg sm:text-3xl">{kuben.programme}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-silver">{kuben.note}</p>
          </div>
          <p className="font-mono text-xs text-silver sm:text-right">
            {kuben.period}
            <span className="label mt-2 block">{kuben.status}</span>
          </p>
        </article>
      </Reveal>
    </Section>
  );
}
