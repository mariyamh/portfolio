import Image from "next/image";
import type { CSSProperties } from "react";
import type { Role } from "@/content/experience";

/** The tile behind each mark; see `logoTile` in content/experience.ts. */
const ground = {
  light: "border-line bg-surface text-muted",
  dark: "border-navy bg-navy text-panel-muted",
  plain: "border-line bg-white text-muted",
  bleed: "border-line bg-white text-muted",
} as const;

/**
 * A company mark in its square tile, or the monogram where there is no file.
 * Kept separate from the employment list so the tile rules live in one
 * place.
 */
export function LogoTile({
  role,
  className = "",
  imageClassName = "",
}: {
  role: Role;
  className?: string;
  imageClassName?: string;
}) {
  const kind = role.logoTile ?? "light";
  const inset = kind === "bleed" ? "" : kind === "plain" ? "p-2" : "p-2.5";

  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden border font-mono tracking-[0.1em] size-14 text-sm ${inset} ${ground[kind]} ${className}`}
    >
      {role.logo ? (
        <Image
          src={role.logo.src}
          width={role.logo.width}
          height={role.logo.height}
          alt=""
          unoptimized={role.logo.src.endsWith(".svg")}
          style={{ "--z": role.logoZoom ?? 1 } as CSSProperties}
          className={`scale-[var(--z)] ${
            kind === "bleed" ? "size-full object-cover" : "h-full w-auto object-contain"
          } ${imageClassName}`}
        />
      ) : (
        role.monogram
      )}
    </span>
  );
}
