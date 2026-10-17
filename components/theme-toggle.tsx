"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/** Where a visitor's explicit choice is kept. Absent means "follow system". */
export const THEME_KEY = "theme";

/**
 * Runs in <head> before first paint (see app/layout.tsx), so a saved theme
 * is applied before anything renders and the page never flashes the other.
 */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

const query = "(prefers-color-scheme: dark)";
const CHANGE = "themechange";

/** Switch colours with a short crossfade where the browser supports it. */
function transitionColors(update: () => void) {
  const doc = document as ViewTransitionDoc;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // A transition in a hidden tab is aborted by the browser; the update still
  // runs, so the rejection is expected and safe to ignore.
  if (!doc.startViewTransition || still || document.hidden) {
    update();
    return;
  }
  const transition = doc.startViewTransition(update);
  transition.ready.catch(() => {});
  transition.finished.catch(() => {});
}

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
      className="size-4 fill-none stroke-current"
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
      className="size-4 fill-none stroke-current"
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
      onClick={() => transitionColors(() => applyTheme(next))}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`grid size-8 shrink-0 place-items-center text-muted transition-colors duration-200 hover:text-ink ${className}`}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
