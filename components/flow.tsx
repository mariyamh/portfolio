/**
 * A request path, drawn as a dark technical panel against the light page.
 *
 * Built from borders and text rather than an SVG so it reflows on a phone and
 * needs no second set of colours. The connectors light in sequence, which is
 * the one piece of motion here that carries information: it reads the path in
 * the order a request actually takes it.
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
    <figure className="mt-6 max-w-3xl border border-panel-line bg-navy">
      <div className="flex items-center justify-between gap-4 border-b border-panel-line px-3 py-2 sm:px-4">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="pulse size-1.5 rounded-full bg-emerald" />
          <span className="font-mono text-[0.625rem] tracking-[0.16em] text-teal uppercase">
            Request path
          </span>
        </span>
        {aiStep !== undefined && (
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-violet" />
            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-violet uppercase">
              Model
            </span>
          </span>
        )}
      </div>

      <ol
        className="flex flex-wrap items-center gap-y-2 p-3 sm:p-4"
        aria-label={`Path: ${steps.join(", then ")}`}
      >
        {steps.map((step, i) => (
          <li key={step} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="signal px-1.5 font-mono text-xs sm:px-2"
                style={{ animationDelay: `${i * 0.26}s` }}
              >
                →
              </span>
            )}
            <span
              className={`border bg-navy-soft px-2 py-1.5 font-mono text-[0.6875rem] leading-tight ${
                i === aiStep
                  ? "border-violet text-violet"
                  : "border-panel-line text-panel-ink"
              }`}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="border-t border-panel-line px-3 py-2.5 text-xs leading-relaxed text-panel-muted sm:px-4">
        {footer}
      </figcaption>
    </figure>
  );
}
