import { experience } from "@/content/experience";
import { CompanyLogo } from "./company-logo";
import { Section } from "./layout";
import { reveal } from "./reveal";

export function Employment() {
  return (
    <Section id="employment" title="Experience">
      <p {...reveal("up")} className="text-[0.9375rem] leading-relaxed text-muted">
        I&apos;ve spent eight years working with product-based and SaaS
        companies, and I&apos;ve been working remotely since 2022.
      </p>

      <ol {...reveal("stagger")} className="mt-6">
        {experience.map((item) => (
          <li
            key={item.org}
            className="grid gap-1 border-t border-line py-3 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6"
          >
            <p className="label tabular-nums">{item.period}</p>
            <div className="flex items-start gap-3">
              <CompanyLogo role={item} />
              <div>
                <p className="text-[0.9375rem] font-medium">{item.role}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {item.org} · {item.location}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
