/**
 * A request path: the steps a request takes, in order. Built from borders and
 * text rather than an SVG so it reflows on a phone.
 */
export function Flow({
  steps,
  footer,
  aiStep,
}: {
  steps: string[];
  footer: string;
  aiStep?: number;
}) {
  return (
    <figure className="rounded-md border border-line">
      <p className="border-b border-line px-4 py-2.5 text-sm font-medium text-muted">
        Request path
      </p>

      <ol
        className="flex flex-wrap items-center gap-y-2 p-4"
        aria-label={`Path: ${steps.join(", then ")}`}
      >
        {steps.map((step, i) => (
          <li key={step} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="px-2 text-sm text-line-strong">
                →
              </span>
            )}
            <span
              className={`rounded border px-2 py-1 text-xs ${
                i === aiStep
                  ? "border-ink font-medium"
                  : "border-line-strong text-muted"
              }`}
            >
              {step}
              {i === aiStep && <span className="sr-only"> (the model)</span>}
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="border-t border-line px-4 py-2.5 text-sm leading-relaxed text-muted">
        {footer}
      </figcaption>
    </figure>
  );
}
