import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  children: ReactNode;
};

/** Asymmetric section frame: mono index rail on the left, content on the right. */
export function Section({ id, index, title, kicker, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative border-t border-line">
      <div className="mx-auto grid max-w-[90rem] grid-cols-12 gap-x-6 px-4 py-24 sm:px-8 md:py-36 lg:px-12">
        <div className="col-span-12 mb-10 md:col-span-3 md:mb-0">
          <div className="md:sticky md:top-28">
            <p className="label">
              <span className="text-violet-soft">{index}</span> / {kicker ?? title}
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2
              id={`${id}-title`}
              className="font-display text-5xl leading-[0.95] tracking-tight text-fg sm:text-6xl lg:text-7xl"
            >
              {title}
            </h2>
          </Reveal>
          <div className="mt-12 md:mt-16">{children}</div>
        </div>
      </div>
    </section>
  );
}
