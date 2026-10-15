"use client";

import { useEffect, useRef, useState } from "react";
import {
  recommendations,
  type Recommendation,
} from "@/content/recommendations";
import { site } from "@/content/site";
import { LinkedInMark } from "./icons";

/** Height of a collapsed quote, in px: about nine lines. Longer quotes fade
 *  out at this height and expand on click. */
const COLLAPSED_PX = 216;

/** How long each testimonial holds before the next one. */
const ROTATE_MS = 4500;

function Avatar() {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-accent-hover">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-5 fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle cx="12" cy="8.5" r="3.4" />
        <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
      </svg>
    </span>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 fill-none stroke-current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

function Quote({
  item,
  expanded,
  onToggle,
}: {
  item: Recommendation;
  expanded: boolean;
  onToggle: () => void;
}) {
  // The full text's height, measured, so the expansion can animate to it.
  const textRef = useRef<HTMLDivElement>(null);
  const [fullHeight, setFullHeight] = useState(0);

  useEffect(() => {
    const el = textRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => setFullHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const long = fullHeight > COLLAPSED_PX + 8;

  return (
    <div>
      {/* The reviewer, named before anything they say — Maryam's name appears
          inside the quotes, so attribution has to come first to be clear. */}
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar />
          <div className="min-w-0">
            <p className="text-sm leading-tight font-medium">{item.name}</p>
            <p className="mt-1 text-xs leading-snug text-muted">{item.role}</p>
          </div>
        </div>
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="See these recommendations on LinkedIn"
          className="mt-0.5 shrink-0 text-accent-hover transition-opacity hover:opacity-70"
        >
          <LinkedInMark className="size-4" />
        </a>
      </header>

      {/* The quote, marked by a rule rather than quotation marks. A long one
          fades out and opens on click; the button below does the same for
          keyboard and screen-reader users. */}
      <blockquote
        onClick={long ? onToggle : undefined}
        className={`group/quote mt-5 border-l-2 border-accent-hover/60 pl-4 transition-colors duration-300 ${
          long ? "cursor-pointer hover:border-accent-hover" : ""
        }`}
      >
        <div
          className={`overflow-hidden transition-[max-height] duration-500 ease-out ${
            long && !expanded ? "quote-fade" : ""
          }`}
          style={{ maxHeight: expanded ? fullHeight || "none" : COLLAPSED_PX }}
        >
          <div
            ref={textRef}
            className="text-[0.9375rem] leading-relaxed whitespace-pre-line transition-colors duration-300 group-hover/quote:text-ink"
          >
            {item.quote}
          </div>
        </div>
      </blockquote>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-xs leading-relaxed text-muted">
          {item.relationship} · {item.date}
          {item.excerpt && " · excerpt"}
        </p>
        {long && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-medium text-accent transition-colors duration-200 hover:border-accent hover:bg-accent/5"
          >
            {expanded ? "Show less" : "Read full recommendation"}
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={`size-3.5 fill-none stroke-current transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function Recommendations() {
  const [index, setIndex] = useState(0);
  // Which slide is expanded, rather than a boolean reset on every change: a new
  // slide is collapsed by derivation, with no effect and no extra render.
  const [expandedFor, setExpandedFor] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  // Slides enter from the side you are travelling towards, so the movement
  // reads as direction rather than as a generic fade.
  const [direction, setDirection] = useState(1);
  const regionRef = useRef<HTMLElement>(null);
  const count = recommendations.length;
  const expanded = expandedFor === index;

  /**
   * Pause while focus is anywhere inside the carousel.
   *
   * Native focusin/focusout rather than React's onFocus/onBlur: the delegated
   * version did not fire for focus moving into the region, so tabbing to a
   * control left autoplay running underneath the person using it. These are
   * explicit, and removed on unmount.
   */
  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;

    const hold = () => setPaused(true);
    const release = () => setPaused(false);

    region.addEventListener("focusin", hold);
    region.addEventListener("focusout", release);
    return () => {
      region.removeEventListener("focusin", hold);
      region.removeEventListener("focusout", release);
    };
  }, []);

  // Autoplay. `index` is a dependency, so any manual move restarts the clock
  // rather than letting a half-elapsed interval cut the new slide short.
  useEffect(() => {
    // Hold while hovered or focused, and while a quote is open for reading.
    if (count < 2 || paused || expanded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [count, paused, index, expanded]);

  if (count === 0) return null;

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + count) % count);
  };

  const jumpTo = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const control =
    "grid size-7 place-items-center rounded-full text-muted transition-colors hover:text-accent focus-visible:text-accent";

  return (
    <section
      ref={regionRef}
      aria-labelledby="recommendations-label"
      aria-roledescription="carousel"
      data-autoplay={paused || expanded ? "paused" : "running"}
      // Hover pause. Keyboard focus is handled by the effect above.
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p id="recommendations-label" className="label leading-[1.7rem]">
        Recommended by colleagues
      </p>

      <figure className="mt-4 flex flex-col rounded-xl border border-line bg-paper p-5 sm:min-h-[29rem]">
        <div className="flex-1">
          {/* Keyed so each slide mounts fresh and plays the fade-up once. */}
          <div
            key={index}
            className="quote-in"
            style={
              { "--slide-from": `${direction * 12}px` } as React.CSSProperties
            }
          >
            <Quote
              item={recommendations[index]}
              expanded={expanded}
              onToggle={() => setExpandedFor(expanded ? null : index)}
            />
          </div>
        </div>

        {count > 1 && (
          <figcaption className="mt-4 flex items-center justify-center gap-4 border-t border-line pt-3.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous recommendation"
              className={control}
            >
              <Chevron direction="left" />
            </button>

            <div className="flex items-center gap-2">
              {recommendations.map((item, i) => (
                <button
                  key={item.name + item.date}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`Recommendation ${i + 1} of ${count}, ${item.name}`}
                  aria-current={i === index}
                  className={`h-1.5 overflow-hidden rounded-full transition-all duration-200 ${
                    i === index
                      ? "w-6 bg-line-strong"
                      : "w-1.5 bg-line-strong hover:bg-muted"
                  }`}
                >
                  {i === index && (
                    <span
                      key={index}
                      aria-hidden="true"
                      className="dot-progress block h-full w-full rounded-full bg-accent-hover"
                      style={
                        {
                          "--rotate": `${ROTATE_MS}ms`,
                          animationPlayState:
                            paused || expanded ? "paused" : "running",
                        } as React.CSSProperties
                      }
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next recommendation"
              className={control}
            >
              <Chevron direction="right" />
            </button>
          </figcaption>
        )}
      </figure>

      <p aria-live="polite" className="sr-only">
        Recommendation {index + 1} of {count}, from{" "}
        {recommendations[index].name}
      </p>
    </section>
  );
}
