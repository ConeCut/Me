import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { ClusterField } from "../ClusterField";
import { HeroName } from "./HeroName";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* atmospheric light */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-[-20%] h-[90vh] w-[90vh] rounded-full bg-violet/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-30%] left-[-10%] h-[60vh] w-[60vh] rounded-full bg-cyan/8 blur-[140px]"
      />
      <ClusterField className="absolute inset-0 opacity-75 [mask-image:linear-gradient(to_right,transparent_0%,black_45%)] max-lg:opacity-40 max-lg:[mask-image:linear-gradient(to_bottom,transparent_10%,black_60%)]" />

      <div className="relative mx-auto grid w-full max-w-[90rem] flex-1 grid-cols-12 content-center gap-x-6 px-4 pt-28 pb-16 sm:px-8 lg:px-12">
        <div className="col-span-12 mb-10 flex flex-wrap justify-between gap-4 md:mb-14">
          <p className="label">Portfolio &amp; CV — 2026</p>
          <p className="label">
            59.91° N · 10.75° E — <span className="text-fg">{profile.location}</span>
          </p>
        </div>

        <HeroName />

        <div className="col-span-12 mt-12 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-16">
          <div className="col-span-12 md:col-span-9 md:col-start-2 lg:col-span-5 lg:col-start-2">
            <p className="label mb-4 text-violet-soft">Informatics · Machine Learning &amp; AI · University of Oslo</p>
            <p className="text-lg leading-relaxed text-silver sm:text-xl">{profile.thesis}</p>
          </div>
          <div className="col-span-12 flex flex-wrap items-end gap-3 md:col-span-9 md:col-start-2 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <a
              href="/cv.pdf"
              download="Cosmin-Ionel_Enachescu_CV.pdf"
              className="group inline-flex items-center gap-3 bg-violet-deep px-6 py-4 font-mono text-xs tracking-[0.14em] text-white uppercase transition-colors hover:bg-violet-deeper"
            >
              <ArrowDownToLine className="size-4" aria-hidden />
              Download CV
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-line-strong px-6 py-4 font-mono text-xs tracking-[0.14em] text-fg uppercase transition-colors hover:border-fg"
            >
              Get in touch
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-line">
        <dl className="mx-auto grid max-w-[90rem] grid-cols-2 gap-x-6 gap-y-4 px-4 py-5 sm:px-8 md:grid-cols-4 lg:px-12">
          {profile.status.map(([k, v]) => (
            <div key={k}>
              <dt className="label">{k}</dt>
              <dd className="mt-1 text-sm text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
