import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { ProjectIcon } from "./project-icons";
import { RevealItem } from "./reveal";

/** How many "What I built" points and stack pills a card shows. The
 *  project page has the full lists. */
const MAX_POINTS = 3;
const MAX_STACK = 6;

/**
 * The image: a real screenshot where one exists. Client repositories are
 * private, so those get a quiet tile with the project's mark instead of an
 * invented image.
 */
function Thumb({ project }: { project: Project }) {
  const frame =
    "tilt relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-surface group-hover:border-accent/60 group-hover:shadow-[0_24px_48px_-24px_var(--accent)]";

  // Hover: a glare follows the pointer and a caption rises from the bottom.
  // The tilt itself is CSS (.tilt), fed the pointer position by <Motion />.
  const overlay = (
    <>
      <span aria-hidden="true" className="tilt-glare" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between bg-gradient-to-t from-black/75 via-black/35 to-transparent px-4 pt-10 pb-3.5 opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
      >
        <span className="text-sm font-medium text-white">View project</span>
        <span className="grid size-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-500 ease-out group-hover:-rotate-45">
          →
        </span>
      </span>
    </>
  );

  if (project.media) {
    return (
      <div className={frame} data-tilt>
        <Image
          src={project.media.src}
          width={project.media.width}
          height={project.media.height}
          unoptimized={project.media.animated}
          alt=""
          sizes="(min-width: 1024px) 30rem, 100vw"
          className="size-full object-cover object-top group-hover:scale-[1.08] group-hover:brightness-[1.06] group-hover:saturate-[1.12]"
        />
        {overlay}
      </div>
    );
  }

  return (
    <div
      className={`${frame} grid place-items-center text-accent-hover [&_svg]:size-12`}
    >
      <span className="flex flex-col items-center gap-3">
        <ProjectIcon slug={project.slug} />
        <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
          {project.org ? "Private repository" : project.kind}
        </span>
      </span>
      {overlay}
    </div>
  );
}

/**
 * One project as a large card: the image on one side, and on the other the
 * facts line, title, role, summary, the first few things built
 * and the stack. Cards alternate sides down the list. The whole card links to
 * the project page; hovering one lifts it and dims the rest.
 */
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const flip = index % 2 === 1;
  const points = project.highlights.slice(0, MAX_POINTS);
  const stack = project.stack.slice(0, MAX_STACK);
  const moreStack = project.stack.length - stack.length;

  return (
    <RevealItem className="h-full">
      <Link
        href={`/work/${project.slug}`}
        className="group grid h-full content-start items-center gap-6 rounded-2xl border border-line bg-paper/60 p-5 transition-[opacity,border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_32px_64px_-36px_rgba(15,23,42,0.5)] sm:p-6 lg:grid-cols-2 lg:content-center lg:gap-10 lg:p-8 lg:group-hover/list:opacity-60 lg:hover:opacity-100!"
      >
        {/* On a phone only real screenshots are shown; the placeholder tile
            would cost a screen of scrolling and say nothing new. */}
        <div
          className={`${flip ? "lg:order-2" : ""} ${project.media ? "" : "hidden lg:block"}`}
        >
          <Thumb project={project} />
        </div>

        <div className="min-w-0">
          <p className="label">
            {project.org ?? "Independent"}
            <span aria-hidden="true" className="px-1.5 text-line-strong">
              ·
            </span>
            <span
              className={project.kind !== "Production" ? "text-amber-ink" : ""}
            >
              {project.kind}
            </span>
            <span aria-hidden="true" className="px-1.5 text-line-strong">
              ·
            </span>
            {project.period}
          </p>

          {/* Morphs into the heading of the project page on navigation. */}
          <ViewTransition
            name={`title-${project.slug}`}
            share="morph"
            default="none"
          >
            <h3 className="mt-3 inline-flex items-baseline gap-2 font-sans text-2xl leading-tight font-semibold tracking-[-0.025em] transition-colors duration-300 group-hover:text-accent sm:text-[1.75rem]">
              {project.name}
              <span
                aria-hidden="true"
                className="text-xl transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </h3>
          </ViewTransition>

          <p className="mt-1.5 line-clamp-1 text-sm font-medium">
            {project.role}
          </p>

          <p className="mt-4 line-clamp-3 text-[0.9375rem] leading-relaxed text-pretty text-muted">
            {project.summary}
          </p>

          {points.length > 0 && (
            <ul className="mt-5 space-y-2.5" aria-label="What I built">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] h-px w-3 shrink-0 bg-accent-hover"
                  />
                  <span className="line-clamp-2">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {stack.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
              {stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {tech}
                </li>
              ))}
              {moreStack > 0 && (
                <li className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  +{moreStack} more
                </li>
              )}
            </ul>
          )}

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
            Read case study
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </RevealItem>
  );
}
