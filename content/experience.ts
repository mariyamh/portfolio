export type Role = {
  org: string;
  /** Initials, used for the tile when there is no logo. */
  monogram: string;
  /** A real logo file, where I have one. Falls back to the monogram. */
  logo?: { src: string; width: number; height: number };
  /**
   * How the mark sits in its tile:
   *  light — the default, on the warm surface
   *  dark  — for white marks that vanish on a light ground
   *  plain — for files that ship with their own white background
   *  bleed — artwork that is already a filled square; fills the tile edge to edge
   */
  logoTile?: "light" | "dark" | "plain" | "bleed";
  /** Some supplied files carry wide margins. Scales the mark up inside the
   *  tile, which the tile then clips — cheaper than re-cutting the asset. */
  logoZoom?: number;
  role: string;
  period: string;
  location: string;
};

export const experience: Role[] = [
  {
    org: "Tensorark",
    monogram: "T",
    logo: { src: "/logos/tensorark.svg", width: 189, height: 218 },
    role: "Senior Full Stack & AI Engineer",
    period: "Dec 2025 – Present",
    location: "Remote",
  },
  {
    org: "Holisto Systems",
    monogram: "H",
    logo: { src: "/logos/holisto.png", width: 800, height: 854 },
    logoTile: "dark",
    role: "Senior Full Stack Engineer (Independent Contractor)",
    period: "Dec 2025 – Jul 2026",
    location: "Remote",
  },
  {
    org: "Cinnova",
    monogram: "C",
    logo: { src: "/logos/cinnova.jpg", width: 400, height: 400 },
    logoTile: "bleed",
    role: "Team Lead / Senior Software Engineer",
    period: "Jan 2022 – Dec 2025",
    location: "Remote",
  },
  {
    org: "InvoZone",
    monogram: "IZ",
    logo: { src: "/logos/invozone.jpg", width: 400, height: 400 },
    logoTile: "bleed",
    role: "Senior Software Engineer",
    period: "Mar 2021 – Dec 2021",
    location: "Lahore, Pakistan",
  },
  {
    org: "Softech Systems",
    monogram: "SS",
    logo: { src: "/logos/softech.jpg", width: 400, height: 400 },
    logoTile: "plain",
    logoZoom: 1.75,
    role: "Software Engineer",
    period: "Jan 2020 – Feb 2021",
    location: "Lahore, Pakistan",
  },
  {
    org: "The Hexaa",
    monogram: "TH",
    logo: { src: "/logos/hexaa.jpg", width: 400, height: 400 },
    logoTile: "plain",
    logoZoom: 1.5,
    role: "Software Engineer",
    period: "Jun 2018 – Dec 2019",
    location: "Lahore, Pakistan",
  },
];
