import { CountUp } from "./count-up";
import { Section } from "./layout";
import { reveal } from "./reveal";

/**
 * Each figure here is checkable against the résumé. No project counts, no
 * "happy clients" — a number nobody can verify is worth less than no number.
 */
const stats = [
  { value: 8, from: 0, suffix: "+", label: "Years building production systems" },
  { value: 5, from: 0, suffix: "+", label: "Engineers led through design and review" },
  { value: 2022, from: 2010, suffix: "", label: "Working remotely since" },
];

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <p
            {...reveal("words")}
            className="text-[clamp(3rem,7vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
          >
            <span className="split-word">
              <span>
                Intro
                <span className="text-accent-hover">.</span>
              </span>
            </span>
          </p>
          <p {...reveal("soft", 120)} className="label mt-3">
            Know me better
          </p>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            <p {...reveal("soft")}>
              The work I enjoy most is figuring out why something isn&apos;t
              working the way it should. Sometimes a slow page comes down to a
              few bad database queries or images being stored the wrong way.
              Sometimes an AI support agent gives the wrong answer because the
              problem isn&apos;t the prompt, but how the business rules are
              handled. I like getting to the root of these problems and fixing
              them properly, rather than just patching the symptoms.
            </p>
            <p {...reveal("soft")}>
              I have worked remotely with international teams since 2022, from
              Lahore. I like codebases with tests, reviews that are allowed to be
              blunt, and release schedules other people can plan around.
            </p>
          </div>
        </div>

        <div>
          <p
            {...reveal("soft", 80)}
            className="text-pretty text-lg leading-relaxed sm:text-xl"
          >
            I&apos;ve spent the last eight years building software, mostly
            working on the backend. That includes designing databases, building
            APIs, connecting different services, and making sure things keep
            working when they&apos;re deployed. I&apos;ve also led a team of
            five, working on technical decisions, reviewing code, and managing
            releases.
          </p>

          <p {...reveal("soft")} className="mt-5 text-base leading-relaxed text-muted">
            Over the past year, I&apos;ve started working more with LLMs. What
            interests me isn&apos;t just getting AI to generate a good response,
            but making sure the application around it actually works. That
            means handling incorrect answers, keeping data secure, managing
            failures, and making it easier to figure out what went wrong when
            something doesn&apos;t behave as expected.
          </p>

          <dl
            {...reveal("stagger")}
            className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-paper p-4 transition-colors duration-200 hover:bg-surface"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="text-[clamp(1.75rem,4vw,2.5rem)] leading-none font-semibold tracking-[-0.04em]">
                    <CountUp value={stat.value} from={stat.from} />
                    <span className="text-accent-hover">{stat.suffix}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2.5 block text-xs leading-snug text-muted"
                  >
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
