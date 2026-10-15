"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { sections, site } from "@/content/site";
import { Container } from "./layout";
import { AccentPicker, ThemeToggle } from "./theme-toggle";

/**
 * Which section is currently in view.
 *
 * An IntersectionObserver with a narrow band across the middle of the viewport:
 * whichever section is crossing that band owns the underline. No scroll
 * handlers, and the observer is disconnected on unmount.
 */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null);

    if (nodes.length === 0 || typeof IntersectionObserver === "undefined")
      return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Keep document order, so scrolling up and down agree.
        const next = sections.find((s) => visible.has(s.id))?.id ?? null;
        setActive(next);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return active;
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5 fill-none stroke-current"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      {open ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
    </svg>
  );
}

export function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  // Escape closes the menu, matching what a disclosure is expected to do.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkBase =
    "relative inline-block py-1 text-sm transition-colors duration-200";

  return (
    <header
      className="navbar sticky top-0 z-40 border-b border-line"
      style={{ viewTransitionName: "site-header" }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          {/* The logo mark, then the monogram: initials in a heavy italic
              serif, closed with the same emerald full stop as "Intro.". The
              full name is the link's accessible name. */}
          <a
            href="#top"
            onClick={() => setOpen(false)}
            aria-label={`${site.name} — back to top`}
            className="group flex shrink-0 items-center gap-2.5 transition-colors duration-300 hover:text-accent"
          >
            <Image
              src="/logos/maryam-mark-transparent.png"
              width={192}
              height={192}
              alt=""
              priority
              className="size-10 shrink-0 object-contain transition-opacity duration-300 group-hover:opacity-80 lg:size-11"
            />
            <span className="wordmark text-[2rem] leading-none lg:text-[2.25rem]">
              MS<span className="text-accent-hover">.</span>
            </span>
          </a>

          <div className="flex items-center gap-3 lg:gap-5">
            <nav aria-label="Sections" className="hidden md:block">
              <ul className="flex items-center gap-6 lg:gap-8">
                {sections.map((s) => {
                  const current = active === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={current ? "true" : undefined}
                        className={`${linkBase} ${
                          current ? "text-ink" : "text-muted hover:text-ink"
                        }`}
                      >
                        {s.label}
                        {/* A plain rule under the current section only. */}
                        {current && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-0.5 h-px bg-ink"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1">
              <AccentPicker />
              <ThemeToggle />
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 shrink-0 place-items-center rounded-md border border-line text-muted transition-colors hover:border-accent hover:text-accent md:hidden"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </Container>

      {/* Reading progress, drawn by the scroll position itself (globals.css). */}
      <span
        aria-hidden="true"
        className="scroll-progress pointer-events-none absolute inset-x-0 -bottom-px h-0.5"
      />

      {open && (
        <nav
          id="site-menu"
          aria-label="Sections"
          className="menu-in border-t border-line md:hidden"
        >
          <Container>
            <ul className="py-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === s.id ? "true" : undefined}
                    className={`block py-3 text-base transition-colors duration-200 ${
                      active === s.id
                        ? "font-medium text-ink"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
