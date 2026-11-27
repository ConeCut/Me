import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { experience, sortedExperience, type Role, type Track } from "@/content/experience";
import { kuben, uio } from "@/content/education";

const trackLabel: Record<Track, string> = { operations: "Operations & admin", field: "Field & logistics" };

// Timeline built from content. "Now" is the build date, so present roles end at the last deploy.
const now = new Date().toISOString().slice(0, 7);
const START = 2022;
const END = Number(now.slice(0, 4)) + 1;

type Bar = { label: string; from: string; to: string; tone: string; approx?: boolean };
const roleBars = (track: Track, tone: string, label: (r: Role) => string): Bar[] =>
  experience
    .filter((r) => r.track === track)
    .map((r) => ({ label: label(r), from: r.start, to: r.end ?? now, tone, approx: r.approximate }))
    .sort((a, b) => Number(!!b.approx) - Number(!!a.approx)); // approximate ranges drawn first, underneath

const lanes: { name: string; bars: Bar[] }[] = [
  {
    name: "Study",
    bars: [
      { label: "Kuben VGS", from: kuben.start, to: kuben.end, tone: "bg-white/[0.06] border-l-2 border-silver/60" },
      { label: "UiO · Informatics → 2028", from: uio.start, to: uio.end, tone: "bg-violet/25 border-l-2 border-violet" },
    ],
  },
  { name: "Operations", bars: roleBars("operations", "bg-cyan/20 border-l-2 border-cyan", (r) => `${r.company} · ${r.title}`) },
  { name: "Field", bars: roleBars("field", "bg-raised border-l-2 border-silver/60", (r) => r.company) }, // opaque: bars overlap the approximate Wolt range
];

const pos = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return Math.min(100, ((y + (m - 1) / 12 - START) / (END - START)) * 100);
};

export function Experience() {
  return (
    <Section id="experience" index="02" title="Experience" kicker="Experience">
      <Reveal>
        <figure className="mb-20 hidden md:block">
          <div
            role="img"
            aria-label={`Timeline ${START} to ${now.slice(0, 4)}: upper secondary school then University of Oslo, running in parallel with administration and transport leadership at MIKA AS and several field and logistics roles.`}
            className="relative"
          >
            {lanes.map((lane) => (
              <div key={lane.name} className="grid grid-cols-[7rem_1fr] items-center border-b border-line py-3">
                <span className="label">{lane.name}</span>
                <div className="relative h-7">
                  {lane.bars.map((b) => (
                    <div
                      key={b.label}
                      title={b.approx ? `${b.label} — exact months not documented` : b.label}
                      className={`absolute top-0 flex h-full items-center overflow-hidden px-2 ${
                        b.approx ? "border border-dashed border-silver/40 bg-transparent" : b.tone
                      }`}
                      style={{ left: `${pos(b.from)}%`, width: `${pos(b.to) - pos(b.from)}%` }}
                    >
                      <span className="truncate font-mono text-[0.625rem] tracking-wider text-fg uppercase">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[7rem_1fr] pt-2">
              <span />
              <div className="relative h-4">
                {Array.from({ length: END - START }, (_, i) => START + i).map((y) => (
                  <span key={y} className="label absolute" style={{ left: `${pos(`${y}-01`)}%` }}>
                    {y}
                  </span>
                ))}
                <span className="absolute top-[-8.5rem] h-[8.5rem] w-px bg-violet" style={{ left: `${pos(now)}%` }} />
              </div>
            </div>
          </div>
        </figure>
      </Reveal>

      <ol className="border-t border-line">
        {sortedExperience.map((r, i) => (
          <li key={`${r.company}-${r.title}`} className="border-b border-line">
            <Reveal delay={Math.min(i * 0.04, 0.2)}>
              <article className="group grid grid-cols-9 gap-x-6 gap-y-3 py-8 transition-colors hover:bg-white/[0.015] md:py-10">
                <div className="col-span-9 md:col-span-2">
                  <p className="font-mono text-xs text-silver">{r.period}</p>
                  <p className="label mt-2 flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`size-1.5 rounded-full ${r.track === "operations" ? "bg-cyan" : "bg-silver"}`}
                    />
                    {trackLabel[r.track]}
                  </p>
                  {r.end === null && <p className="label mt-2 text-violet-soft">Current</p>}
                </div>
                <div className="col-span-9 md:col-span-3">
                  <h3 className="font-display text-3xl leading-tight text-fg">{r.title}</h3>
                  <p className="mt-1 text-silver">{r.company}</p>
                </div>
                <ul className="col-span-9 space-y-2 md:col-span-4">
                  {r.points.map((p) => (
                    <li key={p} className="relative pl-5 text-sm leading-relaxed text-silver">
                      <span aria-hidden className="absolute top-[0.6em] left-0 h-px w-2.5 bg-muted" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
