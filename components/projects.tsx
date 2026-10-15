import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { Section } from "./layout";
import { ProjectCard } from "./project-card";
import { Reveal, reveal } from "./reveal";

const clientWork = projects.filter((p) => p.category === "Client");
const independentWork = projects.filter((p) => p.category === "Independent");

/** A column of large cards, all the same height: equal grid rows size every
 *  card to the tallest one, at any width. Hovering one dims the rest. */
const list = "group/list mt-10 grid auto-rows-fr gap-6 lg:gap-8";

export function ClientWork() {
  return (
    <Section id="work" title="Client work">
      <Reveal variant="soft">
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Production systems built for Tensorark, Cinnova, Holisto Systems,
          InvoZone, Softech Systems and The Hexaa. These repositories are
          private, so the entries describe the engineering rather than link to
          it, and stay at a level the work allows. Nothing here is measured
          unless it says so.
        </p>
      </Reveal>

      <ul className={list}>
        {clientWork.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </ul>
    </Section>
  );
}

export function IndependentWork() {
  return (
    <Section id="independent" title="Independent work">
      <Reveal variant="soft">
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Built outside client work, on my own time. These are honest about what
          they are: one tool I use myself, and two prototypes. Where the source
          is public it is linked.
        </p>
      </Reveal>

      <ul className={list}>
        {independentWork.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </ul>

      <p
        {...reveal("soft")}
        className="mt-10 border-t border-line pt-5 text-sm leading-relaxed text-muted"
      >
        Also public: a NestJS e-commerce REST API with TypeORM, PostgreSQL, JWT
        auth and Stripe payments —{" "}
        <a
          href={site.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent underline decoration-line-strong underline-offset-4 hover:decoration-accent"
        >
          github.com/mariyamh ↗
        </a>
      </p>
    </Section>
  );
}
