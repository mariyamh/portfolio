import { skillGroups } from "@/content/skills";
import { Section } from "./layout";
import { reveal } from "./reveal";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <p {...reveal("up")} className="text-[0.9375rem] leading-relaxed text-muted">
        Technologies and tools I&apos;ve worked with across different projects.
      </p>

      <dl {...reveal("stagger")} className="mt-6 border-b border-line">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="grid gap-1 border-t border-line py-3 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6"
          >
            <dt className="label">{group.title}</dt>
            <dd className="text-sm leading-relaxed text-pretty">
              {group.items.join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
