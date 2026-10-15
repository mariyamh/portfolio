"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/** Where a visitor's explicit choice is kept. Absent means "follow system". */
export const THEME_KEY = "theme";

/** Accent colours, in the order the picker lists them. Green is the default. */
export const ACCENTS = [
  { id: "violet", label: "Violet", swatch: "#7c3aed" },
  { id: "berry", label: "Berry", swatch: "#be185d" },
  { id: "copper", label: "Copper", swatch: "#c2410c" },
  { id: "green", label: "Green", swatch: "#10b981" },
  { id: "blue", label: "Blue", swatch: "#2563eb" },
] as const;

export type Accent = (typeof ACCENTS)[number]["id"];
export const ACCENT_KEY = "accent";

/**
 * Runs in <head> before first paint (see app/layout.tsx), so a saved theme
 * and accent are applied before anything renders — the page never flashes
 * the wrong colours.
 */
export const themeScript = `try{var d=document.documentElement,t=localStorage.getItem("${THEME_KEY}"),a=localStorage.getItem("${ACCENT_KEY}");if(t==="light"||t==="dark")d.dataset.theme=t;if(${JSON.stringify(ACCENTS.map((x) => x.id))}.indexOf(a)>-1&&a!=="green")d.dataset.accent=a}catch(e){}`;

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

/**
 * Applies a colour change. Where the browser supports view transitions (and
 * motion is welcome), the new colours spread out in a circle from the point
 * that was clicked; otherwise they simply switch.
 */
function transitionColors(
  update: () => void,
  origin?: { x: number; y: number },
) {
  const doc = document as ViewTransitionDoc;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || still) {
    update();
    return;
  }
  const root = document.documentElement;
  if (origin) {
    root.style.setProperty("--vt-x", `${origin.x}px`);
    root.style.setProperty("--vt-y", `${origin.y}px`);
  }
  root.dataset.vt = "colors";
  doc
    .startViewTransition(update)
    .finished.finally(() => delete root.dataset.vt);
}

/** The centre of the element that was clicked, as the reveal's origin. */
const centreOf = (el: Element) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

const query = "(prefers-color-scheme: dark)";
const CHANGE = "themechange";

/** The theme actually showing: the explicit choice, else the system's. */
function current(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia(query).matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  window.addEventListener(CHANGE, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(CHANGE, onChange);
  };
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private mode or blocked storage: the switch still works for this visit.
  }
  window.dispatchEvent(new Event(CHANGE));
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4.5 fill-none stroke-current"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4.5 fill-none stroke-current"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

/**
 * Light/dark switch. Shows the theme it will switch *to*. The server cannot
 * know the visitor's theme, so it renders as "light" and the real value takes
 * over straight after hydration without a mismatch.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(
    subscribe,
    current,
    () => "light" as Theme,
  );
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={(e) =>
        transitionColors(() => applyTheme(next), centreOf(e.currentTarget))
      }
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`grid size-9 shrink-0 place-items-center rounded-md text-muted transition-colors duration-200 hover:text-ink ${className}`}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

/* ---------------------------------------------------------------- accent */

const ACCENT_CHANGE = "accentchange";

function currentAccent(): Accent {
  const a = document.documentElement.dataset.accent;
  return ACCENTS.some((x) => x.id === a) ? (a as Accent) : "green";
}

function subscribeAccent(onChange: () => void) {
  window.addEventListener(ACCENT_CHANGE, onChange);
  return () => window.removeEventListener(ACCENT_CHANGE, onChange);
}

function applyAccent(accent: Accent) {
  const root = document.documentElement;
  if (accent === "green") delete root.dataset.accent;
  else root.dataset.accent = accent;
  try {
    localStorage.setItem(ACCENT_KEY, accent);
  } catch {
    // Storage unavailable: the choice holds for this visit only.
  }
  window.dispatchEvent(new Event(ACCENT_CHANGE));
}

/**
 * Accent colour picker: a swatch of the current colour that opens a short
 * column of the others. Picking one sweeps the new colour across the page
 * from that swatch. Escape or a click outside closes it.
 */
export function AccentPicker({ className = "" }: { className?: string }) {
  const accent = useSyncExternalStore(
    subscribeAccent,
    currentAccent,
    () => "green" as Accent,
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const swatch = ACCENTS.find((x) => x.id === accent)!.swatch;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="accent-menu"
        aria-label="Change accent colour"
        title="Change accent colour"
        className={`grid size-9 place-items-center rounded-md border transition-colors duration-200 ${
          open
            ? "border-accent bg-surface"
            : "border-transparent hover:bg-surface"
        }`}
      >
        <span
          aria-hidden="true"
          className="size-4 rounded-full ring-2 ring-paper"
          style={{ background: swatch }}
        />
      </button>

      {open && (
        <div
          id="accent-menu"
          role="radiogroup"
          aria-label="Accent colour"
          className="accent-menu absolute top-full right-1/2 z-50 mt-2 flex translate-x-1/2 flex-col gap-1 rounded-xl border border-line bg-paper p-1.5 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.45)]"
        >
          {ACCENTS.map((option) => {
            const selected = option.id === accent;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={option.label}
                title={option.label}
                onClick={(e) => {
                  const origin = centreOf(e.currentTarget);
                  setOpen(false);
                  if (!selected)
                    transitionColors(() => applyAccent(option.id), origin);
                }}
                className="grid size-9 place-items-center rounded-lg transition-colors duration-200 hover:bg-surface"
              >
                <span
                  aria-hidden="true"
                  className={`size-5 rounded-full transition-transform duration-200 ${
                    selected
                      ? "scale-110 ring-2 ring-offset-2 ring-offset-paper"
                      : ""
                  }`}
                  style={{
                    background: option.swatch,
                    ["--tw-ring-color" as string]: option.swatch,
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
