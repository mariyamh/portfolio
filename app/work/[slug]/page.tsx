import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Footer } from "@/components/footer";
import { Container } from "@/components/layout";
import { ProjectDetail } from "@/components/project-detail";
import { reveal } from "@/components/reveal";
import { projects } from "@/content/projects";

/** Every project is known at build time. Without this, an unknown slug streams
 *  a 200 shell before notFound() resolves, which crawlers would index. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const backHref = project.category === "Client" ? "/#work" : "/#independent";
  const backLabel =
    project.category === "Client" ? "Client work" : "Independent work";

  return (
    <>
      <main id="main" className="flex-1">
        <Container className="pt-10 pb-20 sm:pt-14 sm:pb-24">
          <Link
            href={backHref}
            {...reveal("left")}
            className="label inline-block transition-colors hover:text-accent"
          >
            ← {backLabel}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-b border-line-strong pb-3">
            {/* The card title morphs into this heading, so it is never
                hidden by a reveal of its own. */}
            <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
              <h1 className="text-2xl tracking-[-0.02em] sm:text-3xl">
                {project.name}
              </h1>
            </ViewTransition>
            <span
              aria-hidden="true"
              {...reveal("line", 200)}
              className="gradient-rule h-0.5 w-8 shrink-0"
            />
            <span
              aria-hidden="true"
              {...reveal("line", 300)}
              className="h-px flex-1 bg-line"
            />
            <span
              {...reveal("soft", 400)}
              className={`label ${project.kind !== "Production" ? "text-amber-ink" : ""}`}
            >
              {project.kind}
            </span>
          </div>

          <ProjectDetail project={project} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
