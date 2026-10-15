"use client";

import { useState } from "react";

/**
 * The request path, walkable. Selecting a step explains what happens there and
 * what it protects against — the detail that otherwise only exists in the code.
 *
 * This is the one client component on the page. It is a tablist, so arrow keys
 * and screen readers get the behaviour they expect for free.
 */
export function WorkflowDemo({
  steps,
  details,
  footer,
  aiStep,
}: {
  steps: string[];
  details: string[];
  footer: string;
  aiStep?: number;
}) {
  const [active, setActive] = useState(0);

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (active + 1) % steps.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (active - 1 + steps.length) % steps.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? steps.length - 1
              : null;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`step-${next}`)?.focus();
  }

  return (
    <figure className="mt-6 max-w-3xl border border-panel-line bg-navy">
      <div className="flex items-center justify-between gap-4 border-b border-panel-line px-3 py-2 sm:px-4">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="pulse size-1.5 rounded-full bg-emerald" />
          <span className="font-mono text-[0.625rem] tracking-[0.16em] text-teal uppercase">
            Request path · select a step
          </span>
        </span>
        {aiStep !== undefined && (
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-violet" />
            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-violet-text uppercase">
              Model
            </span>
          </span>
        )}
      </div>

      <div
        role="tablist"
        aria-label="Request path"
        className="flex flex-wrap items-center gap-y-2 p-3 sm:p-4"
      >
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="px-1.5 font-mono text-xs text-panel-line sm:px-2"
              >
                →
              </span>
            )}
            <button
              id={`step-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls="step-detail"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={`cursor-pointer border px-2 py-1.5 font-mono text-[0.6875rem] leading-tight transition-colors ${
                i === active
                  ? i === aiStep
                    ? "border-violet bg-violet/20 text-violet-text"
                    : "border-emerald bg-emerald/15 text-emerald"
                  : i === aiStep
                    ? "border-violet/50 bg-navy-soft text-violet-text hover:border-violet"
                    : "border-panel-line bg-navy-soft text-panel-ink hover:border-teal"
              }`}
            >
              {step}
            </button>
          </div>
        ))}
      </div>

      <div
        id="step-detail"
        role="tabpanel"
        aria-live="polite"
        className="border-t border-panel-line px-3 py-3.5 sm:px-4"
      >
        <p className="font-mono text-[0.625rem] tracking-[0.16em] text-teal uppercase">
          {String(active + 1).padStart(2, "0")} · {steps[active]}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-panel-ink">
          {details[active]}
        </p>
      </div>

      <figcaption className="border-t border-panel-line px-3 py-2.5 text-xs leading-relaxed text-panel-muted sm:px-4">
        {footer}
      </figcaption>
    </figure>
  );
}
