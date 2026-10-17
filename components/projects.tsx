import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { Section } from "./layout";
import { ProjectCard } from "./project-card";
import { reveal } from "./reveal";

const clientWork = projects.filter((p) => p.category === "Client");
const independentWork = projects.filter((p) => p.category === "Independent");

const intro = "text-[0.9375rem] leading-relaxed text-pretty text-muted";
const list = "mt-6 border-b border-line";

export function ClientWork() {
  return (
    <Section id="work" title="Work">
      <p {...reveal("up")} className={intro}>
        I&apos;ve worked on production software at Tensorark, Cinnova, Holisto
        Systems, InvoZone, Softech Systems, and The Hexaa. Most of that work
        lives in private repositories, so I can&apos;t share the code publicly.
        Instead, I&apos;ve included the problems I worked on, the technical
        decisions behind them, and what I learned along the way. I&apos;ve kept
        the details factual and avoided adding numbers or results I can&apos;t
        verify.
      </p>

      <ul {...reveal("stagger")} className={list}>
        {clientWork.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </Section>
  );
}

export function IndependentWork() {
  return (
    <Section id="independent" title="Projects">
      <p {...reveal("up")} className={intro}>
        Here are a few personal projects I&apos;ve built in my spare time. Some
        are still in progress, and I&apos;ve shared the code for the ones that
        are public.
      </p>

      <ul {...reveal("stagger")} className={list}>
        {independentWork.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>

      <p {...reveal("up")} className="mt-6 text-sm leading-relaxed text-muted">
        Also public: a NestJS e-commerce REST API with TypeORM, PostgreSQL, JWT
        auth and Stripe payments, on{" "}
        <a
          href={site.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="link text-ink"
        >
          GitHub
        </a>
        .
      </p>
    </Section>
  );
}
