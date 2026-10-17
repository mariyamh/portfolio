"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { CodeWindow } from "./code-window";

/**
 * The illustration of Maryam at her laptop, beside the hero copy.
 *
 * At rest she cycles on her own between thinking and typing. Clicking her
 * opens a small editor that types out a snippet about her (<CodeWindow>);
 * she types while it types and holds the still pose once it is done.
 */
/** The idle cycle while the editor is closed: think, type, pause, repeat (ms). */
const IDLE = { think: 6000, typing: 4500, still: 1500 } as const;
type Pose = keyof typeof IDLE;
const NEXT: Record<Pose, Pose> = {
  think: "typing",
  typing: "still",
  still: "think",
};

export function HeroIllustration({ style }: { style?: CSSProperties }) {
  const [open, setOpen] = useState(false);
  // Typing finished: she holds the still typing pose instead of the loop.
  const [done, setDone] = useState(false);
  // The typing images load once she is hovered, focused or clicked, or once
  // the page has settled, ahead of the first idle cycle.
  const [warm, setWarm] = useState(false);
  // Her pose while the editor is closed, cycled on a timer.
  const [idle, setIdle] = useState<Pose>("think");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only cycle while she is on screen and the tab is in front.
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(
        entry.isIntersecting && document.visibilityState === "visible",
      ),
    );
    const onVisibility = () => {
      observer.unobserve(node);
      observer.observe(node);
    };
    observer.observe(node);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Fetch the typing images shortly after load, before the first cycle.
  useEffect(() => {
    const timer = window.setTimeout(() => setWarm(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  // The idle cycle. Paused while the editor is open, while she is off screen,
  // and never run at all when reduced motion is requested.
  useEffect(() => {
    if (open || !visible || !warm) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setIdle((p) => NEXT[p]), IDLE[idle]);
    return () => window.clearTimeout(timer);
  }, [open, visible, warm, idle]);

  const toggle = () => {
    setWarm(true);
    setDone(false);
    setIdle("think");
    setOpen((v) => !v);
  };
  const close = useCallback(() => {
    setIdle("think");
    setOpen(false);
  }, []);
  const finish = useCallback(() => setDone(true), []);

  const pose: Pose = !open ? idle : done ? "still" : "typing";

  return (
    <div
      className="intro relative w-full"
      style={style}
      ref={ref}
      onPointerEnter={() => setWarm(true)}
      onFocus={() => setWarm(true)}
    >
      {/* She is the trigger: clicking her opens the code window. */}
      <button
        type="button"
        data-code-trigger
        onClick={toggle}
        aria-expanded={open}
        aria-controls="code-window"
        aria-label={open ? "Close code editor" : "Open code editor"}
        className="group relative block w-full cursor-pointer"
      >
        {/* Three poses, crossfaded: thinking (at rest), typing (while the
            code types out) and the still typing pose (once it is done). */}
        <Image
          src="/media/maryam-illustration.png"
          width={750}
          height={900}
          alt="Illustration of Maryam sitting cross-legged with a laptop"
          sizes="17rem"
          priority
          className={`pose h-auto w-full ${pose === "think" ? "" : "opacity-0"}`}
        />
        {/* Hover hint. A custom tooltip rather than `title`, which browsers
            only show after a long delay. Hidden while the editor is open. */}
        {!open && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded-md bg-ink px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-paper opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            Click me to see what I&apos;m writing
          </span>
        )}
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
              sizes="17rem"
              className={`pose absolute inset-0 h-auto w-full ${pose === "still" ? "" : "opacity-0"}`}
            />
          </>
        )}
      </button>

      {open && <CodeWindow onClose={close} onDone={finish} />}
    </div>
  );
}
