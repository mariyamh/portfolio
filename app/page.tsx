import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Employment } from "@/components/employment";
import { ClientWork, IndependentWork } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      {/* The gradient field. Sits behind the header as well as the hero, and is
          masked out before it reaches the first section. */}
      <div className="mesh" aria-hidden="true" />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Employment />
        <ClientWork />
        <IndependentWork />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
