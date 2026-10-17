import { Section } from "./layout";
import { reveal } from "./reveal";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-4 text-[0.9375rem] leading-relaxed text-pretty">
        <p {...reveal("up")}>
          I&apos;ve spent the last eight years building software, mostly working
          on the backend. That includes designing databases, building APIs,
          connecting different services, and making sure things keep working
          when they&apos;re deployed. I&apos;ve also led a team of five, working
          on technical decisions, reviewing code, and managing releases.
        </p>
        <p {...reveal("up")} className="text-muted">
          Over the past year, I&apos;ve started working more with LLMs. What
          interests me isn&apos;t just getting AI to generate a good response,
          but making sure the application around it actually works. That means
          handling incorrect answers, keeping data secure, managing failures,
          and making it easier to figure out what went wrong when something
          doesn&apos;t behave as expected.
        </p>
        <p {...reveal("up")} className="text-muted">
          The work I enjoy most is figuring out why something isn&apos;t working
          the way it should. Sometimes a slow page comes down to a few bad
          database queries or images being stored the wrong way. Sometimes an
          AI support agent gives the wrong answer because the problem isn&apos;t
          the prompt, but how the business rules are handled. I like getting to
          the root of these problems and fixing them properly, rather than just
          patching the symptoms.
        </p>
        <p {...reveal("up")} className="text-muted">
          I have worked remotely with international teams since 2022, from
          Lahore. I like codebases with tests, reviews that are allowed to be
          blunt, and release schedules other people can plan around.
        </p>
      </div>
    </Section>
  );
}
