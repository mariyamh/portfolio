import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Container } from "@/components/layout";
import { reveal } from "@/components/reveal";
import { SplitWords } from "@/components/split-words";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <main id="main" className="flex-1">
        <Container className="py-24 sm:py-36">
          <p {...reveal("soft")} className="label label-strong">Error 404</p>
          <h1 {...reveal("words", 100)} className="mt-3 text-2xl tracking-[-0.02em] uppercase sm:text-3xl">
            <SplitWords text="This page does not exist" />
          </h1>
          <p {...reveal("soft", 200)} className="mt-5 max-w-md text-base leading-relaxed text-muted">
            The link may be out of date, or the address mistyped. Everything on
            this site lives on one page.
          </p>
          <Link
            href="/"
            {...reveal("up", 300)}
            className="mt-9 inline-block bg-ink px-4 py-2.5 font-mono text-xs tracking-wider uppercase text-paper transition-colors hover:bg-accent"
          >
            Back to the start
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
