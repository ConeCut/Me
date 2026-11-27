"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Every <section> is watched, so the hero and Qualifications (not in the nav) clear the highlight.
    const navIds: string[] = navItems.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(navIds.includes(e.target.id) ? e.target.id : "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    // Keep Tab inside the menu: the page behind it is inert while it is open.
    const behind = [document.getElementById("main"), document.querySelector("body footer")];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-4 sm:px-8 lg:px-12">
        <a href="#top" className="group flex items-baseline gap-3" aria-label="Cosmin-Ionel Enachescu, back to top">
          <span className="font-display text-2xl leading-none text-fg italic">CE</span>
          <span className="label hidden transition-colors group-hover:text-fg sm:inline">Enachescu / Oslo</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  className={`relative font-mono text-xs tracking-[0.12em] uppercase transition-colors hover:text-fg ${
                    active === id ? "text-fg" : "text-muted"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1.5 left-0 h-px bg-violet transition-all duration-500 ${
                      active === id ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/cv.pdf"
            download="Cosmin-Ionel_Enachescu_CV.pdf"
            className="hidden items-center gap-2 border border-line-strong px-4 py-2 font-mono text-xs tracking-[0.12em] text-fg uppercase transition-colors hover:border-violet hover:bg-violet/10 sm:inline-flex"
          >
            <ArrowDownToLine className="size-3.5" aria-hidden />
            CV
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex size-10 items-center justify-center border border-line-strong text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            // absolute, not fixed: the header's backdrop-filter makes it the containing block
            className="absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-1 px-4 pt-10 sm:px-8">
              {navItems.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl text-fg"
                  >
                    <span className="label text-violet-soft">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-8">
                <a
                  href="/cv.pdf"
                  download="Cosmin-Ionel_Enachescu_CV.pdf"
                  className="inline-flex items-center gap-2 bg-violet-deep px-5 py-3 font-mono text-xs tracking-[0.12em] text-white uppercase"
                >
                  <ArrowDownToLine className="size-3.5" aria-hidden />
                  Download CV
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
