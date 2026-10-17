"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sections, site } from "@/content/site";
import { Container } from "./layout";
import { ThemeToggle } from "./theme-toggle";

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
  // The sections live on the home page. There, links are in-page anchors;
  // on any other page (a project, the 404) they go back home first.
  const onHome = usePathname() === "/";
  const to = (id: string) => (onHome ? `#${id}` : `/#${id}`);
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

  return (
    <header
      className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md"
      style={{ viewTransitionName: "site-header" }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <a
            href={onHome ? "#top" : "/"}
            onClick={() => setOpen(false)}
            className="shrink-0 text-[0.9375rem] font-medium tracking-[-0.01em]"
          >
            {site.name}
          </a>

          <div className="flex items-center gap-4 sm:gap-5">
            <nav aria-label="Sections" className="hidden sm:block">
              <ul className="flex items-center gap-5">
                {sections.map((s) => {
                  const current = active === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={to(s.id)}
                        aria-current={current ? "true" : undefined}
                        className={`text-sm transition-colors duration-200 ${
                          current ? "text-ink" : "text-muted hover:text-ink"
                        }`}
                      >
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 grid size-9 shrink-0 place-items-center text-muted transition-colors hover:text-ink sm:hidden"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <nav id="site-menu" aria-label="Sections" className="menu-in sm:hidden">
          <Container>
            <ul className="border-t border-line py-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={to(s.id)}
                    onClick={() => setOpen(false)}
                    aria-current={active === s.id ? "true" : undefined}
                    className={`block py-2.5 text-[0.9375rem] transition-colors ${
                      active === s.id ? "text-ink" : "text-muted hover:text-ink"
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
