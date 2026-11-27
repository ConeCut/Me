const lines = [
  { text: "Cosmin-Ionel", className: "italic text-silver md:col-start-1", delay: "150ms" },
  { text: "Enachescu", className: "text-fg md:col-start-2", delay: "290ms" },
];

/** The name is the primary visual: two lines rising out of a clipped baseline. Pure CSS so it shows without JS. */
export function HeroName() {
  return (
    <h1 className="col-span-12 font-display leading-[0.86] tracking-[-0.02em]">
      <span className="sr-only">Cosmin-Ionel Enachescu</span>
      {lines.map((l) => (
        <span key={l.text} aria-hidden className="block overflow-hidden pb-[0.06em] md:grid md:grid-cols-12">
          <span
            className={`rise block text-[clamp(3.4rem,17vw,14rem)] md:col-span-11 md:text-[clamp(3.4rem,14.5vw,14rem)] ${l.className}`}
            style={{ animationDelay: l.delay }}
          >
            {l.text}
          </span>
        </span>
      ))}
    </h1>
  );
}
