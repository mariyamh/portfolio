import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";

/**
 * One project as a row: a small screenshot, then name and period, who it was
 * for, and a two-line summary. The whole row links to the project page.
 */
export function ProjectCard({ project }: { project: Project; index?: number }) {
  return (
    <li className="border-t border-line">
      <Link
        href={`/work/${project.slug}`}
        className="group grid gap-4 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5"
      >
        {project.media && (
          <div className="hidden aspect-[16/10] overflow-hidden rounded-md border border-line bg-surface sm:block">
            <Image
              src={project.media.src}
              width={project.media.width}
              height={project.media.height}
              unoptimized={project.media.animated}
              alt=""
              sizes="9rem"
              className="size-full object-cover object-top"
            />
          </div>
        )}

        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-4">
            {/* Morphs into the heading of the project page on navigation. */}
            <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
              <h3 className="text-[0.9375rem] font-medium underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-line-strong">
                {project.name}
              </h3>
            </ViewTransition>
            <span className="label shrink-0 tabular-nums">{project.period}</span>
          </div>
          <p className="mt-0.5 text-sm text-muted">
            {project.org ?? "Independent"}
            {project.kind !== "Production" && ` · ${project.kind}`}
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-pretty text-muted">
            {project.summary}
          </p>
        </div>
      </Link>
    </li>
  );
}
