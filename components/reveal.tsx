import type { CSSProperties, ReactNode } from "react";

/**
 * How an element arrives when it scrolls into view. The animations live in
 * globals.css and are driven by the single observer in <Motion />:
 *
 * - up       short fade with a small lift — the default
 * - rise     the same, for cards and panels
 * - left / right   the same
 * - soft     a plain fade, for running copy
 * - words    headings: each word rises into the line in turn (<SplitWords>)
 * - line     draw a rule from its left end
 * - stagger  the element stays put and its children fade up in turn
 */
export type RevealVariant =
  | "up"
  | "soft"
  | "rise"
  | "left"
  | "right"
  | "words"
  | "line"
  | "stagger";

/** Props to spread onto any element to make it reveal on scroll. */
export function reveal(
  variant: RevealVariant = "up",
  delay?: number,
): { "data-reveal": RevealVariant; style?: CSSProperties } {
  return {
    "data-reveal": variant,
    ...(delay
      ? { style: { "--reveal-delay": `${delay}ms` } as CSSProperties }
      : {}),
  };
}

export function Reveal({
  children,
  variant = "up",
  delay,
  className = "",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  return (
    <div {...reveal(variant, delay)} className={className}>
      {children}
    </div>
  );
}

/** The same thing, as a list item, so it can sit directly in a grid. */
export function RevealItem({
  children,
  variant = "rise",
  delay,
  className = "",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  return (
    <li {...reveal(variant, delay)} className={className}>
      {children}
    </li>
  );
}
