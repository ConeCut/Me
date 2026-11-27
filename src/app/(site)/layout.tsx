import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { profile } from "@/content/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  givenName: profile.givenName,
  familyName: profile.familyName,
  description: profile.summary,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Oslo", addressCountry: "NO" },
  affiliation: { "@type": "CollegeOrUniversity", name: "University of Oslo" },
  knowsLanguage: ["ro", "no", "en", "it"],
  sameAs: [profile.github],
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <MotionProvider>
      <div className="grain">
        <a
          href="#main"
          className="sr-only z-[70] bg-violet-deep px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </div>
      <script
        type="application/ld+json"
        // Static, author-controlled object; no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
    </MotionProvider>
  );
}
