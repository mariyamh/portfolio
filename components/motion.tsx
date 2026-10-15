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
 * - Feeds the pointer position to [data-tilt] images, as --px/--py (0–1),
 *   so CSS can tilt them towards the cursor; resets them when it leaves.
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

    // Tilt: one listener for the document, throttled to a frame. Mouse only,
    // and not at all when reduced motion is requested.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;

    const settle = (el: HTMLElement | null) => {
      if (!el) return;
      delete el.dataset.tilting;
      el.style.setProperty("--px", "0.5");
      el.style.setProperty("--py", "0.5");
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || still) return;
      last = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!last) return;
        const target = (last.target as Element | null)?.closest<HTMLElement>(
          "[data-tilt]",
        );
        if (target !== tilted) {
          settle(tilted);
          tilted = target ?? null;
        }
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const px = Math.min(
          Math.max((last.clientX - rect.left) / rect.width, 0),
          1,
        );
        const py = Math.min(
          Math.max((last.clientY - rect.top) / rect.height, 0),
          1,
        );
        target.dataset.tilting = "true";
        target.style.setProperty("--px", px.toFixed(3));
        target.style.setProperty("--py", py.toFixed(3));
      });
    };

    // Leaving the window altogether: let the last image settle.
    const onOut = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      settle(tilted);
      tilted = null;
    };

    document.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("mouseout", onOut);

    return () => {
      observer?.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(pending);
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return null;
}
