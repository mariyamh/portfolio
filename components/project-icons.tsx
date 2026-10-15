/**
 * One mark per project, drawn here rather than pulled from an icon package —
 * six small paths are not worth a dependency, and each one says something about
 * the project rather than being decorative.
 */

const base = {
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
  className: "size-5 fill-none stroke-current",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A conversation: the support agent. */
function Chat() {
  return (
    <svg {...base}>
      <path d="M20 14.5a3 3 0 0 1-3 3H9l-4 3V6.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3z" />
      <path d="M9 10.5h7M9 13.5h4" />
    </svg>
  );
}

/** Carrier signal: the telecom platform. */
function Signal() {
  return (
    <svg {...base}>
      <path d="M4.5 11a8 8 0 0 1 15 0" />
      <path d="M8 14a4.5 4.5 0 0 1 8 0" />
      <circle cx="12" cy="18.5" r="1.4" />
    </svg>
  );
}

/** A checklist: the compliance platform. */
function Clipboard() {
  return (
    <svg {...base}>
      <rect x="5" y="4.5" width="14" height="16" rx="2" />
      <path d="M9.5 4.5h5v2.5h-5z" />
      <path d="m9 13 2 2 4-4" />
    </svg>
  );
}

/** A document that gets checked: the CV tool. */
function Document() {
  return (
    <svg {...base}>
      <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8z" />
      <path d="M14 3.5V8h4.5" />
      <path d="m9 14.5 1.8 1.8 3.7-3.7" />
    </svg>
  );
}

/** Ranked bars: the scoring console. */
function Chart() {
  return (
    <svg {...base}>
      <path d="M4.5 20V11M11 20V4.5M17.5 20v-6" />
    </svg>
  );
}

/** Connected nodes: the workflow. */
function Nodes() {
  return (
    <svg {...base}>
      <circle cx="6" cy="6.5" r="2.2" />
      <circle cx="18" cy="12" r="2.2" />
      <circle cx="6" cy="17.5" r="2.2" />
      <path d="m8.1 7.6 7.8 3.3M15.9 13.1 8.1 16.4" />
    </svg>
  );
}

const icons: Record<string, () => React.JSX.Element> = {
  remi: Chat,
  loopstart: Signal,
  holisto: Clipboard,
  applywise: Document,
  "lead-intelligence-console": Chart,
  "ai-lead-qualification": Nodes,
};

export function ProjectIcon({ slug }: { slug: string }) {
  const Icon = icons[slug] ?? Document;
  return <Icon />;
}
