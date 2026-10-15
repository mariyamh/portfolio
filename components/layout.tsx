import type { ReactNode } from "react";
import { reveal } from "./reveal";
import { SplitWords } from "./split-words";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Every section shares one header: the title, a short gradient rule, and a
 * hairline that runs out to the right. It is what gives the page its sheet-like
 * spine without numbering anything.
 */
export function Section({
  id,
  title,
  tinted = false,
  children,
}: {
  id: string;
  title: string;
  /** The warm-white-to-soft-green band, used to break up the page. */
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-16 ${tinted ? "bg-gradient-to-b from-paper to-surface" : ""}`}
    >
      <Container>
        <div className="flex items-center gap-3 pt-3 sm:gap-4">
          <h2
            id={`${id}-heading`}
            {...reveal("words")}
            className="text-xs tracking-[0.18em] uppercase sm:text-sm"
          >
            <SplitWords text={title} />
          </h2>
          <span
            aria-hidden="true"
            {...reveal("line")}
            className="gradient-rule h-0.5 w-8 shrink-0"
          />
          <span
            aria-hidden="true"
            {...reveal("line", 120)}
            className="h-px flex-1 bg-line"
          />
        </div>
        <div className="pt-8 pb-16 sm:pt-10 sm:pb-20">{children}</div>
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
      <dt className="label pt-0.5">{label}</dt>
      <dd className="text-sm leading-relaxed text-pretty">{children}</dd>
    </div>
  );
}
