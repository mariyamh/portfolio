import { site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Section } from "./layout";
import { reveal } from "./reveal";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p {...reveal("up")} className="text-[0.9375rem] leading-relaxed text-pretty text-muted">
        Looking for someone for a backend, full-stack, or AI engineering role?
        Feel free to reach out. I&apos;m based in {site.location} (
        {site.timezone}), and I&apos;m open to working with teams across Europe
        and the US. You can also email me directly at{" "}
        <a href={`mailto:${site.email}`} className="link text-ink">
          {site.email}
        </a>
        .
      </p>

      <ContactForm />
    </Section>
  );
}
