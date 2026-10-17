/**
 * Single source of truth for personal details and external links.
 * Nothing in the UI hard-codes an address, a URL or a date.
 */

export const site = {
  name: "Maryam Saleem",
  role: "Senior Software Engineer",
  roleLong:
    "Senior Software Engineer — backend systems, full-stack delivery and AI engineering",
  yearsExperience: "8+",
  location: "Lahore, Pakistan",
  timezone: "UTC+5",
  email: "maryamsaleem874@gmail.com",

  /** Shown as a small indicator in the hero. Set `open: false` to hide it. */
  availability: {
    open: true,
    label: "Open to remote roles worldwide",
  },

  /** Shown in the footer, the way a drawing carries a revision. */
  revision: "2026.10",

  /** Personal mark, shown in the header. */

  links: {
    github: "https://github.com/mariyamh",
    linkedin: "https://www.linkedin.com/in/maryam-saleem-5258a9124",
    resume: "/Maryam_Saleem_Resume.pdf",
  },

  /**
   * Canonical origin, used for metadata, Open Graph, sitemap and robots.
   * Set NEXT_PUBLIC_SITE_URL in the deploy environment before going live.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const sections = [
  { id: "about", label: "About" },
  { id: "employment", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "independent", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
