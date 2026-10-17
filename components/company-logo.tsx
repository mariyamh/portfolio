import Image from "next/image";
import type { Role } from "@/content/experience";

/**
 * A company's logo at a small, fixed size. Each file has its own quirks
 * (`logoTile` in content/experience.ts): a white mark needs a dark ground,
 * some files ship with their own white square, some carry wide margins.
 */
export function CompanyLogo({ role }: { role: Role }) {
  const kind = role.logoTile ?? "light";
  const ground =
    kind === "dark" ? "bg-[#161616]" : kind === "light" ? "bg-surface" : "bg-white";
  const inset = kind === "bleed" ? "" : "p-1";

  return (
    <span
      aria-hidden="true"
      className={`grid size-8 shrink-0 place-items-center overflow-hidden rounded-md border border-line text-[0.625rem] font-medium text-muted ${ground} ${inset}`}
    >
      {role.logo ? (
        <Image
          src={role.logo.src}
          width={role.logo.width}
          height={role.logo.height}
          alt=""
          unoptimized={role.logo.src.endsWith(".svg")}
          style={{ transform: `scale(${Math.min(role.logoZoom ?? 1, 1.3)})` }}
          className={kind === "bleed" ? "size-full object-cover" : "h-full w-auto object-contain"}
        />
      ) : (
        role.monogram
      )}
    </span>
  );
}
