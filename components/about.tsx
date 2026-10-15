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
              The work I find most interesting usually arrives as a complaint
              rather than a ticket. An order screen that takes too long turns out
              to be N+1 queries and image blobs sitting in the database. A
              support agent that answers politely but gets a refund rule wrong
              turns out to need a deterministic rule layer, not a better prompt.
              The fixes I am most pleased with have been unglamorous and
              permanent.
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
            Eight years of it, most on the server side: schema design, API
            contracts, the queue that has to survive a deploy, and the
            authorisation rules nobody notices until they are wrong. Most
            recently I led a team of five through technical design, code review
            and release.
          </p>

          <p {...reveal("soft")} className="mt-5 text-base leading-relaxed text-muted">
            For the past year that has meant LLM products, approached the way I
            would approach any other integration: the model is one unreliable
            dependency among several. The engineering sits around it — retrieval
            that is reproducible, guardrails that are deterministic, idempotent
            writes, rate limits, audit trails, and traces worth reading when
            someone says it got an answer wrong.
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
