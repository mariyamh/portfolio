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
  const backLabel = project.category === "Client" ? "Work" : "Projects";

  return (
    <>
      <main id="main" className="flex-1">
        <Container narrow className="pt-12 pb-20 sm:pt-16 sm:pb-24">
          <Link
            href={backHref}
            className="label inline-block transition-colors hover:text-ink"
          >
            ← {backLabel}
          </Link>

          <header className="mt-8">
            {/* The row title morphs into this heading, so it is never hidden
                by a reveal of its own. */}
            <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
              <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.025em]">
                {project.name}
              </h1>
            </ViewTransition>
            <p {...reveal("soft", 120)} className="label mt-2">
              {project.org ?? "Independent"} · {project.kind} · {project.period}
            </p>
          </header>

          <ProjectDetail project={project} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
