"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A figure that counts up to its value when it scrolls into view.
 *
 * The real value is what renders on the server, so it is what search engines,
 * no-script visitors and reduced-motion users see. The count only starts from
 * `from` once the figure is confirmed off screen, so a visible number never
 * jumps backwards.
 */
export function CountUp({
  value,
  from = 0,
  duration = 1000,
  delay = 100,
}: {
  value: number;
  from?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer = 0;
    let armed = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        // Exponential settle, matching --ease-out.
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setShown(Math.round(from + (value - from) * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Off screen: safe to wind back without anyone seeing it.
          if (!armed) {
            armed = true;
            setShown(from);
          }
          return;
        }
        observer.disconnect();
        setShown(from);
        timer = window.setTimeout(run, delay);
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [value, from, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
