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
    <figure className="rounded-md border border-line">
      <p className="border-b border-line px-4 py-2.5 text-sm font-medium text-muted">
        Request path · select a step
      </p>

      <div
        role="tablist"
        aria-label="Request path"
        className="flex flex-wrap items-center gap-y-2 p-4"
      >
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="px-2 text-sm text-line-strong">
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
              className={`cursor-pointer rounded border px-2 py-1 text-xs transition-colors ${
                i === active
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {step}
              {i === aiStep && <span className="sr-only"> (the model)</span>}
            </button>
          </div>
        ))}
      </div>

      <div
        id="step-detail"
        role="tabpanel"
        aria-live="polite"
        className="border-t border-line px-4 py-3.5"
      >
        <p className="text-sm font-medium">
          {active + 1}. {steps[active]}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {details[active]}
        </p>
      </div>

      <figcaption className="border-t border-line px-4 py-2.5 text-sm leading-relaxed text-muted">
        {footer}
      </figcaption>
    </figure>
  );
}
