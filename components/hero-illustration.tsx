"use client";

import Image from "next/image";
import { useCallback, useState, type CSSProperties } from "react";
import { CodeWindow } from "./code-window";

/**
 * The hero's right-hand column: an illustration of Maryam at her laptop.
 *
 * Layers, back to front: a teal glow that breathes, a thin ring with one dot
 * slowly orbiting it, the illustration floating gently, a soft ground
 * shadow that shrinks as she rises, and a few small accents around her —
 * sparkles, a heart, a code chip — that drift and twinkle.
 *
 * Clicking her, or the code chip, opens a small editor beside her that types
 * out a snippet about Maryam (<CodeWindow>); she switches to a typing pose
 * while it types, and holds a still typing pose once it is done. On hover she lifts a little and the glow
 * brightens. All transform/opacity, all stopped by reduced motion.
 * Shown from `lg` up only.
 */
function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2c.5 4.6 2.9 7 7.5 7.5v1C14.9 11 12.5 13.4 12 18h-1c-.5-4.6-2.9-7-7.5-7.5v-1C8.1 9 10.5 6.6 11 2h1Z" />
    </svg>
  );
}

function Heart({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </svg>
  );
}

/**
 * Small accents around the illustration. Each sits at its own spot, moves on
 * its own slow rhythm (--dur, --delay), and eases outward by (--hx, --hy)
 * when the illustration is hovered.
 */
const accents: {
  kind: "sparkle" | "heart" | "code" | "dot";
  className: string;
  style: Record<string, string>;
}[] = [
  {
    kind: "sparkle",
    className: "accent-twinkle left-[4%] top-[16%] size-7 text-teal",
    style: { "--dur": "3.2s", "--delay": "0s", "--hx": "-8px", "--hy": "-6px" },
  },
  {
    kind: "code",
    className: "accent-drift left-[-6%] top-[54%] text-teal",
    style: { "--dur": "7s", "--delay": "-2s", "--hx": "-10px", "--hy": "0px" },
  },
  {
    kind: "heart",
    className: "accent-drift right-[2%] top-[24%] size-6 text-violet-text",
    style: { "--dur": "5.5s", "--delay": "-1s", "--hx": "8px", "--hy": "-6px" },
  },
  {
    kind: "sparkle",
    className: "accent-twinkle right-[0%] top-[66%] size-5 text-amber-ink",
    style: { "--dur": "4s", "--delay": "-1.5s", "--hx": "10px", "--hy": "4px" },
  },
  {
    kind: "dot",
    className:
      "accent-twinkle left-[22%] top-[4%] size-2 rounded-full bg-teal text-teal",
    style: {
      "--dur": "2.6s",
      "--delay": "-0.8s",
      "--hx": "-4px",
      "--hy": "-6px",
    },
  },
  {
    kind: "dot",
    className:
      "accent-twinkle right-[18%] top-[8%] size-1.5 rounded-full bg-teal text-teal",
    style: {
      "--dur": "3.4s",
      "--delay": "-2.2s",
      "--hx": "4px",
      "--hy": "-6px",
    },
  },
];

function Accent({ kind }: { kind: (typeof accents)[number]["kind"] }) {
  if (kind === "sparkle") return <Sparkle className="size-full" />;
  if (kind === "heart") return <Heart className="size-full" />;
  return null;
}

export function HeroIllustration({ style }: { style?: CSSProperties }) {
  const [open, setOpen] = useState(false);
  // Typing finished: she holds the still typing pose instead of the loop.
  const [done, setDone] = useState(false);
  // The typing images load only once she is hovered, focused or clicked.
  const [warm, setWarm] = useState(false);

  const toggle = () => {
    setWarm(true);
    setDone(false);
    setOpen((v) => !v);
  };
  const close = useCallback(() => setOpen(false), []);
  const finish = useCallback(() => setDone(true), []);

  const pose = !open ? "think" : done ? "still" : "typing";

  return (
    <div
      className="illus intro relative hidden w-full items-center justify-center lg:flex"
      style={style}
      onPointerEnter={() => setWarm(true)}
      onFocus={() => setWarm(true)}
    >
      <span aria-hidden="true" className="brand-glow illus-glow" />
      <span aria-hidden="true" className="illus-ring" />

      {/* She is the trigger: clicking her opens the code window. */}
      <button
        type="button"
        data-code-trigger
        onClick={toggle}
        aria-expanded={open}
        aria-controls="code-window"
        aria-label={open ? "Close code editor" : "Open code editor"}
        className="illus-float relative block w-full cursor-pointer rounded-xl"
      >
        {/* Three poses, crossfaded: thinking (at rest), typing (while the
            code types out) and the still typing pose (once it is done). */}
        <span className="illus-img relative block">
          <Image
            src="/media/maryam-illustration.png"
            width={750}
            height={900}
            alt="Illustration of Maryam sitting cross-legged with a laptop"
            sizes="18.5rem"
            priority
            className={`pose h-auto w-full ${pose === "think" ? "" : "opacity-0"}`}
          />
          {warm && (
            <>
              <Image
                src="/media/maryam-typing.webp"
                width={700}
                height={840}
                alt=""
                unoptimized
                className={`pose absolute inset-0 h-auto w-full ${pose === "typing" ? "" : "opacity-0"}`}
              />
              <Image
                src="/media/maryam-typing-still.png"
                width={750}
                height={900}
                alt=""
                sizes="18.5rem"
                className={`pose absolute inset-0 h-auto w-full ${pose === "still" ? "" : "opacity-0"}`}
              />
            </>
          )}
        </span>
      </button>

      <span aria-hidden="true" className="illus-shadow" />

      {accents.map((accent, i) =>
        accent.kind === "code" ? (
          // The code chip is a real control: same toggle as the illustration.
          <button
            key={i}
            type="button"
            data-code-trigger
            onClick={toggle}
            aria-expanded={open}
            aria-controls="code-window"
            aria-label={open ? "Close code editor" : "Open code editor"}
            className={`accent accent-button absolute ${accent.className}`}
            style={accent.style as CSSProperties}
          >
            <span
              className={`block rounded-md border px-2 py-1 font-mono text-xs leading-none backdrop-blur-sm transition-colors duration-200 ${
                open
                  ? "border-teal bg-teal text-navy"
                  : "border-teal/40 bg-paper/70 text-teal hover:border-teal"
              }`}
            >
              {"</>"}
            </span>
          </button>
        ) : (
          <span
            key={i}
            aria-hidden="true"
            className={`accent absolute ${accent.className}`}
            style={accent.style as CSSProperties}
          >
            <Accent kind={accent.kind} />
          </span>
        ),
      )}

      {open && <CodeWindow onClose={close} onDone={finish} />}
    </div>
  );
}
