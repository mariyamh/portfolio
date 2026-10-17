import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { HeroIllustration } from "./hero-illustration";
import { Container } from "./layout";

/** Start time for a first-paint fade, read by `.intro` in globals.css. */
const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}


export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading">
      <Container className="pt-8 pb-2 sm:pt-12 sm:pb-4">
        <div className="sm:grid sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-center sm:gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="max-w-[40rem]">
            <p className="intro label" style={at(0)}>
              {site.role} · {site.location}
              {site.availability.open && " · Open to remote roles"}
            </p>

            <h1
              id="hero-heading"
              className="intro mt-4 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.025em] text-balance sm:text-[2.25rem]"
              style={at(60)}
            >
              I break things to understand how to make them better.
            </h1>

            <div
              className="intro mt-5 space-y-3 text-[0.9375rem] leading-relaxed text-pretty text-muted"
              style={at(120)}
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
              className="intro mt-7 flex flex-wrap items-center gap-2.5"
              style={at(180)}
            >
              <a
                href={site.links.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary"
              >
                Download résumé
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact me
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                title="GitHub"
                className="btn btn-secondary btn-icon"
              >
                <GitHubIcon />
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="btn btn-secondary btn-icon"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div className="mt-10 hidden w-[14rem] lg:w-[17rem] sm:mt-1 sm:block">
            <HeroIllustration style={at(120)} />
          </div>
        </div>
      </Container>
    </section>
  );
}
