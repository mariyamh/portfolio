export type Recommendation = {
  /** Verbatim, as written on LinkedIn. Line breaks are preserved on render. */
  quote: string;
  /** True when LinkedIn truncated it and the rest has not been supplied. */
  excerpt?: boolean;
  name: string;
  /** Their headline at the time they wrote it. */
  role: string;
  /** How they worked with me, in LinkedIn's own words. */
  relationship: string;
  /** When it was written. */
  date: string;
};

/**
 * Real LinkedIn recommendations, newest first. Nothing here is paraphrased or
 * tidied — where LinkedIn cut a quote off behind "see more", the entry is
 * marked `excerpt` and ends in an ellipsis rather than being completed.
 */
export const recommendations: Recommendation[] = [
  {
    quote: `Maryam is a highly adaptable and dependable professional. Having worked with her across various technology stacks, I can attest to several of her key strengths:

- Rapid Adaptability: She possesses a remarkable ability to learn and implement new technologies quickly, making her an invaluable asset for complex technical challenges.

- Strong Ownership: Her high level of responsibility and commitment guarantees…`,
    excerpt: true,
    name: "Atif Mumtaz",
    role: "Co-Founder @ Fivex Labs · Member of Technical Staff @ NIL Club",
    relationship: "Managed Maryam directly",
    date: "August 2026",
  },
  {
    quote: `Having collaborated closely with Maryam on various complex corporate projects at Cinnova, I highly recommend her.

She is an exceptionally responsible, professional, and standout performer on our team. Her proactive mindset, willingness to tackle tough challenges, and strong sense of ownership ensure she always consistently meets tight deadlines…`,
    excerpt: true,
    name: "Momin Bin Shahid",
    role: "Engineering Manager · MEAN, MERN, Ionic, Azure, AWS",
    relationship: "Managed Maryam directly",
    date: "July 2026",
  },
  {
    quote: `I had the pleasure of working with Maryam on several complex builds, and her technical range is truly impressive. Whether she was managing legacy PHP environments or implementing modern, real-time features using Node.js and React, her approach was always methodical and efficient. She's a fast learner who stays on the cutting edge of web technologies, making her an invaluable asset to any engineering team looking to scale.`,
    name: "Farrukh Raza Bhatti",
    role: "Managing Consultant · .NET Team Lead",
    relationship: "Worked with Maryam on the same team",
    date: "April 2026",
  },
  {
    quote: `I had the pleasure of working with MS Maryam Saleem for one year, from 2020 to 2021, and I can confidently say that she is one of the most outstanding and brilliant PHP developers I have ever worked with.

Maryam worked on several complex projects during her time with us, including the multi-merchant ecommerce portal, OgoulMall, and the pharmacy chain ecommerce portal for our client NEXTHEALTH. Her expertise in core PHP, PHP frameworks, WordPress, PHP-based CRM,…`,
    excerpt: true,
    name: "Syed Abid Ali",
    role: "Senior Project Manager · Agile, ERP & Fintech Leader",
    relationship: "Managed Maryam directly",
    date: "April 2023",
  },
];
