import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile, siteUrl } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Cosmin-Ionel Enachescu — Informatics student at the University of Oslo specialising in Machine Learning and AI, with professional experience in transport operations, administration and web development. Oslo, Norway.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — Informatics · ML & AI`, template: `%s — ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: ["Cosmin-Ionel Enachescu", "Informatics", "Machine Learning", "University of Oslo", "Portfolio", "CV", "Oslo"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: profile.name,
    description,
    url: "/",
    siteName: profile.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: profile.name, description },
};

export const viewport: Viewport = { themeColor: "#0b0b0d", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
