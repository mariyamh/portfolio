import { site } from "@/content/site";
import { Container } from "./layout";

export function Footer() {
  return (
    <footer className="mt-auto">
      <Container className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-8">
        <p className="label">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-5 text-sm text-muted">
          <li>
            <a href={site.links.github} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-ink">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-ink">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
              Email
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
