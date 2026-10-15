import Image from "next/image";
import type { Project } from "@/content/projects";
import { Field } from "./layout";
import { Reveal, reveal } from "./reveal";
import { Flow } from "./flow";
import { WorkflowDemo } from "./workflow-demo";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <p
        {...reveal("soft", 250)}
        className="max-w-2xl text-pretty text-lg leading-relaxed"
      >
        {project.summary}
      </p>

      <h2
        {...reveal("up")}
        className="label label-strong mt-10 border-b border-line-strong pb-2"
      >
        The problem
      </h2>
      <p
        {...reveal("soft")}
        className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted"
      >
        {project.problem}
      </p>

      {project.media && (
        <figure {...reveal("rise")} className="mt-10 max-w-3xl">
          <div className="overflow-hidden border border-line-strong bg-surface">
            <Image
              src={project.media.src}
              width={project.media.width}
              height={project.media.height}
              unoptimized={project.media.animated}
              alt={project.media.alt}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
              priority
            />
          </div>
          <figcaption className="mt-2.5 text-xs leading-relaxed text-muted">
            {project.media.caption}
          </figcaption>
        </figure>
      )}

      {project.flow && (
        <Reveal variant="rise">
          {project.flow.interactive && project.flow.details ? (
            <WorkflowDemo
              steps={project.flow.steps}
              details={project.flow.details}
              footer={project.flow.footer}
              aiStep={project.flow.aiStep}
            />
          ) : (
            <Flow
              steps={project.flow.steps}
              footer={project.flow.footer}
              aiStep={project.flow.aiStep}
            />
          )}
        </Reveal>
      )}

      <dl
        {...reveal("stagger")}
        className="mt-10 max-w-2xl border-t border-line-strong"
      >
        {project.org && <Field label="Built for">{project.org}</Field>}
        <Field label="Role">{project.role}</Field>
        {project.facts?.length ? (
          <Field label="Scale">
            <ul className="space-y-0.5">
              {project.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </Field>
        ) : null}
        <Field label="Period">{project.period}</Field>
        {project.stack.length > 0 && (
          <Field label="Stack">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line-strong bg-surface px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted transition-colors duration-200 hover:border-accent hover:text-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Field>
        )}
        {project.links?.length ? (
          <Field label="Source">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mr-4 text-accent underline decoration-line-strong underline-offset-4 hover:decoration-accent"
              >
                {link.href.replace("https://", "")} ↗
              </a>
            ))}
          </Field>
        ) : null}
        {project.note && (
          <Field label="Status">
            <span className="text-muted">{project.note}</span>
          </Field>
        )}
      </dl>

      <h2
        {...reveal("up")}
        className="label label-strong mt-12 border-b border-line-strong pb-2"
      >
        What I built
      </h2>
      <ul {...reveal("stagger")} className="mt-5 max-w-2xl space-y-3.5">
        {project.highlights.map((point) => (
          <li
            key={point}
            className="border-l border-line pl-4 text-sm leading-relaxed text-muted"
          >
            {point}
          </li>
        ))}
      </ul>
    </>
  );
}
