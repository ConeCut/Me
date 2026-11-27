import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4 px-4 py-8 sm:px-8 lg:px-12">
        <p className="label">
          © 2026 {profile.name} · {profile.location}
        </p>
        <p className="label hidden md:block">Next.js · TypeScript · Tailwind CSS · Motion</p>
        <a href="#top" className="label inline-flex items-center gap-2 transition-colors hover:text-fg">
          Back to top <ArrowUp className="size-3.5" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
