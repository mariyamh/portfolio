import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Employment } from "@/components/employment";
import { ClientWork, IndependentWork } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Section } from "@/components/layout";
import { Recommendations } from "@/components/recommendations";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Employment />
        <ClientWork />
        <IndependentWork />
        <Skills />
        <Section id="recommendations" title="Recommendations">
          <Recommendations />
        </Section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
