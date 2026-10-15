import { site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Section } from "./layout";
import { Recommendations } from "./recommendations";
import { Reveal, reveal } from "./reveal";
import { SplitWords } from "./split-words";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          {/* A statement, not a heading: the section already has one, and a
              second h2 made the two columns compete. */}
          <p
            {...reveal("words")}
            className="max-w-xl text-pretty text-2xl leading-tight font-semibold tracking-[-0.03em] sm:text-3xl"
          >
            <SplitWords text="Let’s talk about your next project." />
          </p>
          <p
            {...reveal("soft", 100)}
            className="mt-4 max-w-xl text-sm leading-relaxed text-muted"
          >
            If you are hiring for backend, full-stack or AI engineering work,
            this is the fastest way to reach me. I am in {site.location} (
            {site.timezone}) and work remotely — happy to overlap with European
            or US hours.
          </p>

          <ContactForm />
        </div>

        <Reveal variant="right" delay={150}>
          <Recommendations />
        </Reveal>
      </div>
    </Section>
  );
}
