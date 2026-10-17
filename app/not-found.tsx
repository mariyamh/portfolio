import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Container } from "@/components/layout";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <main id="main" className="flex-1">
        <Container narrow className="py-24 sm:py-32">
          <p className="label">404</p>
          <h1 className="mt-3 text-[1.75rem] leading-tight font-semibold tracking-[-0.025em]">
            This page does not exist
          </h1>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
            The link may be out of date, or the address mistyped.
          </p>
          <Link href="/" className="link mt-6 inline-block text-[0.9375rem]">
            Back to the home page
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
