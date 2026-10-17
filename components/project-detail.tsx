import Image from "next/image";
import type { Project } from "@/content/projects";
import { Field } from "./layout";
import { Reveal, reveal } from "./reveal";
import { Flow } from "./flow";
import { WorkflowDemo } from "./workflow-demo";

const heading = "mt-12 text-sm font-medium text-muted";
const body = "mt-3 text-[0.9375rem] leading-relaxed text-pretty";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <p {...reveal("up", 150)} className="mt-8 text-[1.0625rem] leading-relaxed text-pretty">
        {project.summary}
      </p>

      {project.media && (
        <figure {...reveal("up")} className="mt-10">
          <div className="overflow-hidden rounded-md border border-line bg-surface">
            <Image
              src={project.media.src}
              width={project.media.width}
              height={project.media.height}
              unoptimized={project.media.animated}
              alt={project.media.alt}
              sizes="(max-width: 700px) 100vw, 672px"
              className="h-auto w-full"
              priority
            />
          </div>
          <figcaption className="label mt-2.5">{project.media.caption}</figcaption>
        </figure>
      )}

      <h2 {...reveal("soft")} className={heading}>
        The problem
      </h2>
      <p {...reveal("up")} className={`${body} text-muted`}>
        {project.problem}
      </p>

      <h2 {...reveal("soft")} className={heading}>
        What I built
      </h2>
      <ul {...reveal("stagger")} className="mt-3 list-disc space-y-2.5 pl-5 marker:text-line-strong">
        {project.highlights.map((point) => (
          <li key={point} className="text-[0.9375rem] leading-relaxed text-pretty text-muted">
            {point}
          </li>
        ))}
      </ul>

      {project.flow && (
        <Reveal className="mt-10">
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

      <h2 {...reveal("soft")} className={heading}>
        Details
      </h2>
      <dl {...reveal("stagger")} className="mt-3 border-t border-line">
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
        {project.stack.length > 0 && <Field label="Stack">{project.stack.join(", ")}</Field>}
        {project.links?.length ? (
          <Field label="Source">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link mr-4"
              >
                {link.href.replace("https://", "")}
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
    </>
  );
}
