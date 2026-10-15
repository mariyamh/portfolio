import { skillGroups } from "@/content/skills";
import { Section } from "./layout";
import { reveal } from "./reveal";

export function Skills() {
  return (
    <Section id="skills" title="Skills" tinted>
      <p {...reveal("soft")} className="max-w-2xl text-base leading-relaxed text-muted">
        Grouped by what I actually do with them. No ratings — the work above is
        the evidence.
      </p>

      <dl className="mt-10 border-t border-line-strong">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            {...reveal("stagger")}
            className="group grid gap-x-8 gap-y-2 border-b border-line py-5 lg:grid-cols-[14rem_minmax(0,1fr)]"
          >
            <dt>
              <h3 className="text-xs tracking-[0.12em] uppercase transition-colors duration-300 group-hover:text-accent">
                {group.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {group.note}
              </p>
            </dt>
            <dd className="font-mono text-xs leading-6 text-muted">
              {group.items.join("  ·  ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
