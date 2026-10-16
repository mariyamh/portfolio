import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Container } from "./layout";
import { HeroIllustration } from "./hero-illustration";
import { SocialRail } from "./social-rail";

/** Four things I actually do, in the order the page then evidences them. */
const capabilities = [
  "Backend & APIs",
  "AI & LLM engineering",
  "Cloud & delivery",
  "Testing & security",
];

/** Start time for a load-sequence element, read by `.intro` in globals.css. */
const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;


export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading">
      <Container className="relative pt-12 pb-10 sm:pt-16 sm:pb-12">
        {/* Two columns from lg up: the copy, and the illustration beside it. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            <p className="label intro text-accent" style={at(0)}>
              {site.role}
            </p>

            <h1
              id="hero-heading"
              className="intro mt-5 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.03em] text-balance"
              style={at(80)}
            >
              I break things to understand{" "}
              <span className="text-accent">how to make them better.</span>
            </h1>

            <div
              className="intro mt-6 max-w-xl space-y-4 text-pretty text-base leading-relaxed text-muted sm:text-lg"
              style={at(160)}
            >
              <p>
                I like figuring out how things break, why they break, and what
                it takes to fix them properly. Over the past{" "}
                {site.yearsExperience} years, I&apos;ve worked across frontend,
                backend, and cloud infrastructure, from complex integrations
                and performance issues to security and data-heavy systems.
              </p>
              <p>
                More recently, I&apos;ve been working with LLMs, building
                AI-powered applications and dealing with the engineering
                challenges that come with them.
              </p>
            </div>

            <div
              className="intro mt-8 flex flex-wrap items-center gap-2.5"
              style={at(240)}
            >
              <a
                href="#work"
                className="group bg-accent px-4 py-2.5 font-mono text-xs tracking-wider text-paper uppercase transition-colors hover:bg-accent-hover hover:text-navy"
              >
                Selected work{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href={site.links.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="border border-line-strong bg-paper/60 px-4 py-2.5 font-mono text-xs tracking-wider uppercase backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
              >
                Résumé ↓
              </a>
            </div>

            {site.availability.open && (
              <p
                className="label intro mt-6 flex items-center gap-2"
                style={at(320)}
              >
                <span
                  aria-hidden="true"
                  className="pulse inline-block size-1.5 shrink-0 rounded-full bg-accent-hover"
                />
                {site.availability.label}
                <span aria-hidden="true" className="px-1 text-line-strong">
                  ·
                </span>
                {site.location} · {site.timezone}
              </p>
            )}
          </div>

          <HeroIllustration style={at(200)} />
        </div>

        <div className="intro mt-12 sm:mt-14" style={at(400)}>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:gap-10">
            {capabilities.map((item) => (
              <li key={item}>
                <span
                  aria-hidden="true"
                  className="block h-px w-6 bg-line-strong"
                />
                <span className="mt-2.5 block text-xs text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <SocialRail />
      </Container>
    </section>
  );
}
