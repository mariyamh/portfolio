"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/** Token kinds, coloured like a standard dark editor theme. */
type Kind = "kw" | "id" | "key" | "str" | "bool" | "punc" | "comment";

const colour: Record<Kind, string> = {
  kw: "text-[#ff7b72]",
  id: "text-[#e6edf3]",
  key: "text-[#79c0ff]",
  str: "text-[#a5d6ff]",
  bool: "text-[#79c0ff]",
  punc: "text-[#8b949e]",
  comment: "text-[#8b949e] italic",
};

const str = (items: string[]): [string, Kind][] =>
  items.flatMap((item, i) => [
    [`"${item}"`, "str"] as [string, Kind],
    ...(i < items.length - 1 ? ([[", ", "punc"]] as [string, Kind][]) : []),
  ]);

/**
 * The snippet, pre-tokenised so it is highlighted as it types. Every value is
 * read from content/site.ts or the stack named in the site description.
 */
const tokens: [string, Kind][] = [
  ["const ", "kw"],
  ["maryam", "id"],
  [" = {\n", "punc"],
  ["  role", "key"],
  [": ", "punc"],
  [`"${site.role}"`, "str"],
  [",\n", "punc"],
  ["  experience", "key"],
  [": ", "punc"],
  [`"${site.yearsExperience} years"`, "str"],
  [",\n", "punc"],
  ["  based", "key"],
  [": ", "punc"],
  [`"${site.location}"`, "str"],
  [",\n", "punc"],
  ["  stack", "key"],
  [": [\n    ", "punc"],
  ...str(["TypeScript", "Node.js"]),
  [",\n    ", "punc"],
  ...str(["PostgreSQL", "AWS"]),
  [",\n  ],\n", "punc"],
  ["  remote", "key"],
  [": ", "punc"],
  ["true", "bool"],
  [",\n", "punc"],
  ["};", "punc"],
];

/** Where each token starts in the full text, so a typed prefix maps to tokens. */
const starts = tokens.reduce<number[]>(
  (acc, _, i) => [...acc, i === 0 ? 0 : acc[i - 1] + tokens[i - 1][0].length],
  [],
);
const total = tokens.reduce((n, [text]) => n + text.length, 0);
const lineCount = tokens
  .map(([t]) => t)
  .join("")
  .split("\n").length;

/** Characters per tick, and the tick. ~3.5s for the whole snippet. */
const TICK_MS = 16;

/**
 * A small dark editor that types out the snippet, with line numbers, a
 * blinking cursor and a status bar. Mounted fresh on every open, so typing
 * always starts from the top. With reduced motion it shows the finished code.
 */
export function CodeWindow({
  onClose,
  onDone,
}: {
  onClose: () => void;
  /** Called once, when the last character has been typed. */
  onDone?: () => void;
}) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  // Latest callback, without restarting the typing when the parent re-renders.
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    const timer = window.setInterval(() => {
      n = still ? total : n + 1;
      setShown(n);
      if (n >= total) {
        window.clearInterval(timer);
        doneRef.current?.();
      }
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  // Escape closes; so does a press anywhere outside the window and its
  // triggers (they toggle it themselves).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element;
      if (
        ref.current?.contains(target) ||
        target.closest("[data-code-trigger]")
      )
        return;
      onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [onClose]);

  const done = shown >= total;

  // Render the typed prefix of the token stream.
  const visible = tokens.map(([text, kind], i) =>
    shown > starts[i] ? (
      <span key={i} className={colour[kind]}>
        {text.slice(0, shown - starts[i])}
      </span>
    ) : null,
  );

  return (
    <div
      ref={ref}
      id="code-window"
      role="region"
      aria-label="Code editor"
      className="code-window absolute top-full right-0 z-20 mt-2 w-[19rem] overflow-hidden rounded-lg border border-[#30363d] bg-[#0d1117] text-left shadow-xl"
    >
      <div className="flex items-center gap-3 border-b border-[#30363d] px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="size-2.5 rounded-full bg-[#febc2e]" />
          <i className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex-1 text-center font-mono text-[0.6875rem] text-[#8b949e]">
          maryam.ts
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close code editor"
          className="grid size-5 place-items-center rounded text-[#8b949e] transition-colors hover:bg-[#161b22] hover:text-[#e6edf3]"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-3.5 fill-none stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div className="flex gap-3 px-3 py-3 font-mono text-[0.71875rem] leading-[1.15rem]">
        <ol
          aria-hidden="true"
          className="shrink-0 text-right text-[#484f58] select-none"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <li key={i}>{i + 1}</li>
          ))}
        </ol>
        <pre className="min-w-0 flex-1 overflow-hidden whitespace-pre">
          <code>
            {visible}
            <span aria-hidden="true" className="code-caret" />
          </code>
        </pre>
      </div>

      <div className="flex items-center gap-2 border-t border-[#30363d] px-3 py-2 font-mono text-[0.625rem] tracking-[0.08em] text-[#8b949e] uppercase">
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full ${done ? "bg-[#3fb950]" : "pulse bg-[#d29922]"}`}
        />
        <span role="status">{done ? "Ready" : "Typing…"}</span>
        <span className="ml-auto">TypeScript</span>
      </div>
    </div>
  );
}
