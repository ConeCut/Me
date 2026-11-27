import { ArrowDownToLine, ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { CopyEmail } from "../CopyEmail";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-violet/15 blur-[160px]"
      />
      <div className="relative mx-auto max-w-[90rem] px-4 py-24 sm:px-8 md:py-40 lg:px-12">
        <p className="label">
          <span className="text-violet-soft">07</span> / Contact
        </p>
        <Reveal>
          <h2 id="contact-title" className="mt-10 font-display text-6xl leading-[0.9] tracking-tight text-fg sm:text-8xl lg:text-9xl">
            Let&rsquo;s talk <span className="text-silver italic">work.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-silver">
            For opportunities in software development, data or technical operations, or to talk about a project, email
            is the best way to reach me.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
            <div className="bg-ink p-6 sm:p-8">
              <p className="label mb-3">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="block text-base break-all text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-violet sm:text-lg"
              >
                {profile.email}
              </a>
              <CopyEmail email={profile.email} />
            </div>
            <div className="bg-ink p-6 sm:p-8">
              <p className="label mb-3">GitHub</p>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-lg text-fg transition-colors hover:text-violet-soft"
              >
                github.com/{profile.githubHandle}
                <ArrowUpRight className="size-4" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                <MapPin className="size-3.5" aria-hidden />
                {profile.location}
              </p>
            </div>
            <div className="bg-ink p-6 sm:p-8">
              <p className="label mb-3">Curriculum vitae</p>
              <a
                href="/cv.pdf"
                download="Cosmin-Ionel_Enachescu_CV.pdf"
                className="inline-flex items-center gap-3 bg-violet-deep px-5 py-3 font-mono text-xs tracking-[0.14em] text-white uppercase transition-colors hover:bg-violet-deeper"
              >
                <ArrowDownToLine className="size-4" aria-hidden />
                Download PDF
              </a>
              <a href="/cv" className="mt-4 block text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
                View printable version
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
