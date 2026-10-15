import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Header } from "@/components/header";
import { Motion } from "@/components/motion";
import { themeScript } from "@/components/theme-toggle";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
/** The header monogram only, so just the one heavy italic cut. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: "900",
  style: "italic",
  subsets: ["latin"],
});

const description = `${site.name} is a senior software engineer with ${site.yearsExperience} years building production backend systems, full-stack web applications and, more recently, LLM-powered products. Node.js, TypeScript, React, Next.js, PostgreSQL, AWS and Azure. Based in ${site.location}, working remotely.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "Senior Software Engineer",
    "Senior Backend Engineer",
    "Full-Stack Engineer",
    "Node.js Engineer",
    "TypeScript",
    "AI Backend Engineer",
    "LLM Engineer",
    "Remote Software Engineer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description,
    url: site.url,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

/** Structured data for search results. Static, authored content only. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.roleLong,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: [site.links.github, site.links.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      // The theme script below sets data-theme before React hydrates.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        {/* Rendered once, here rather than per page: it persists across
            navigations, and each page's first element is its own content, so
            Next scrolls a newly opened page to the top. */}
        <Header />
        {children}
        <Motion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
