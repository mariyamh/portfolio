import type { ReactNode } from "react";
import { reveal } from "./reveal";

/** The page column. `narrow` is the reading measure used by articles. */
export function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${narrow ? "max-w-[46rem]" : "max-w-5xl"} ${className}`}
    >
      {children}
    </div>
  );
}

/** A section: its heading in a left column, the content beside it. On a
 *  phone the heading sits above. */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  /** Kept for callers; sections are no longer tinted. */
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20">
      <Container className="grid gap-4 py-8 sm:py-10 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
        <h2
          id={`${id}-heading`}
          {...reveal("soft")}
          className="text-sm font-medium text-muted md:pt-0.5"
        >
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  );
}

/** One row of a spec table. */
export function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`field ${className}`}>
      <dt className="label">{label}</dt>
      <dd className="text-sm leading-relaxed text-pretty">{children}</dd>
    </div>
  );
}
