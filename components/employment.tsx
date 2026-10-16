import { experience } from "@/content/experience";
import { Section } from "./layout";
import { LogoTile } from "./logo-tile";
import { reveal } from "./reveal";

export function Employment() {
  return (
    <Section id="employment" title="Employment">
      <p {...reveal("soft")} className="max-w-2xl text-base leading-relaxed text-muted">
        I&apos;ve spent eight years working with product-based and SaaS
        companies, and I&apos;ve been working remotely since 2022.
      </p>

      <ol className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2">
        {experience.map((item) => (
          <li
            key={item.org}
            {...reveal("left")}
            className="group flex items-start gap-4"
          >
            <span aria-hidden="true" className="shrink-0">
              <LogoTile
                role={item}
                className="transition-colors duration-300 group-hover:border-accent"
                imageClassName="transition-transform duration-300 ease-out group-hover:scale-[calc(var(--z)*1.08)]"
              />
            </span>
            <div className="min-w-0">
              <p className="label">{item.period}</p>
              <p className="mt-1 text-base transition-colors duration-300 group-hover:text-accent">
                {item.org}
              </p>
              <p className="mt-0.5 text-sm text-pretty text-muted">
                {item.role}
              </p>
              <p className="mt-0.5 font-mono text-xs text-muted">
                {item.location}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
