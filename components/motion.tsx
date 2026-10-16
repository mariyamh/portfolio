"use client";

import { useEffect } from "react";

/** Elements entering in the same frame cascade this far apart… */
const STAGGER_MS = 50;
/** …but never so far that the last one feels late. */
const STAGGER_CAP_MS = 200;
/** After this long, a script arriving late shows what is on screen as it is. */
const LATE_MS = 2800;

/**
 * The page's one motion controller, mounted once in the root layout.
 *
 * - Reveals every [data-reveal] element as it scrolls in, with a single
 *   IntersectionObserver for the whole document. Entries that arrive together
 *   are ordered by position and staggered, so grids cascade row by row.
 * - Picks up elements added later (client navigation) with a MutationObserver.
 *
 * All the visual work is CSS; this only flips attributes and custom properties.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const late = performance.now() > LATE_MS;
    root.dataset.motion = "ready";

    const seen = new WeakSet<Element>();
    let observer: IntersectionObserver | null = null;

    const reveal = (entries: IntersectionObserverEntry[]) => {
      const entering = entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        );

      entering.forEach((entry, i) => {
        const el = entry.target as HTMLElement;
        el.style.setProperty(
          "--stagger",
          `${Math.min(i * STAGGER_MS, STAGGER_CAP_MS)}ms`,
        );
        el.dataset.revealed = "true";
        observer?.unobserve(el);
      });
    };

    const scan = () => {
      const nodes = document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-revealed])",
      );
      nodes.forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (!observer) {
          el.dataset.revealed = "static";
          return;
        }
        observer.observe(el);
      });
    };

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(reveal, {
        rootMargin: "0px 0px -4% 0px",
        threshold: 0,
      });
    }

    // A late script: whatever is already on screen stays exactly as the
    // failsafe left it, and only what is still below the fold animates.
    if (late) {
      const fold = window.innerHeight;
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < fold) {
            el.dataset.revealed = "static";
            seen.add(el);
          }
        });
    }

    scan();

    let pending = 0;
    const mutations = new MutationObserver(() => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        scan();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(pending);
    };
  }, []);

  return null;
}
