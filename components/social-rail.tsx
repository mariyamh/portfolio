import { site } from "@/content/site";
import { GitHubMark, LinkedInMark, MailMark } from "./icons";

/**
 * The rail down the right edge of the hero: three links, nothing else.
 * Shown from `lg` up only.
 */

const link =
  "text-muted transition-colors duration-200 hover:text-accent focus-visible:text-accent";

export function SocialRail() {
  return (
    <div className="absolute right-0 bottom-0 hidden lg:block">
      <ul className="flex flex-col items-center gap-5">
        <li>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className={link}
          >
            <GitHubMark />
          </a>
        </li>
        <li>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className={link}
          >
            <LinkedInMark />
          </a>
        </li>
        <li>
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.email}`}
            className={link}
          >
            <MailMark />
          </a>
        </li>
      </ul>
    </div>
  );
}
