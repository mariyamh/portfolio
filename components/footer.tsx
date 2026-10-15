import { site } from "@/content/site";
import { Container } from "./layout";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line-strong">
      <Container className="flex flex-wrap items-center justify-between gap-3 py-6">
        <p className="label">© {site.name}</p>
        <p className="label">Next.js · TypeScript · Tailwind CSS · rev {site.revision}</p>
      </Container>
    </footer>
  );
}
