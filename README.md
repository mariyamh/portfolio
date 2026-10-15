# maryamsaleem.dev — portfolio

A portfolio: a single page covering hero, about, employment, client work,
independent work, skills and contact, plus a detail page per project under
`/work/<slug>`. Next.js App Router, TypeScript, Tailwind CSS v4. Every route is
statically prerendered except `POST /api/contact`. Two client components — the
walkable request path on Remi, and the contact form — carry all of the page's
interactive JavaScript; everything else is server-rendered.

## Commands

| Command             | Effect                                      |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Dev server on http://localhost:3000         |
| `npm run build`     | Production build (all routes prerendered)   |
| `npm start`         | Serve the production build                  |
| `npm run lint`      | ESLint                                      |
| `npm run typecheck` | `tsc --noEmit`                              |

## Where the content lives

Nothing personal is hard-coded in a component. To change the site, edit:

- `content/site.ts` — name, role, email, location, availability indicator,
  GitHub / LinkedIn / résumé links, and the nav sections.
- `content/projects.ts` — the work. `category` decides which section an entry
  lands in (`Client` or `Independent`) and `org` names the company it
  was built for. An optional `media` entry renders a screenshot with a caption;
  the images in `public/media/` were captured from the projects running
  locally, not mocked up. Each entry also carries a `kind`
  (`Production`, `Prototype` or `Personal tool`), the problem it solves, what
  was built, the stack, optional links, and an optional `note` used for caveats
  such as "prototype, synthetic data". An optional `flow` — a list of steps plus
  a footer — draws the request-path diagram under that project. Adding
  `interactive: true` and one `details` note per step renders the walkable
  version instead. Add an object to the array and it renders in order.
- `content/skills.ts` — the skill groups and the short note under each.
- `content/experience.ts` — the employment list: company, monogram, role, period
  and location.
- `content/recommendations.ts` — ships empty, and the section renders nothing
  while it is. These are other people's words, so the only acceptable source is
  the real thing: paste them in verbatim with the name, their title at the time,
  and where they came from.
- `public/Maryam_Saleem_Resume.pdf` — the downloadable résumé. Replace the file
  and the links follow.

Prose that is specific to a section (the About paragraphs, the employment list)
sits in its own component under `components/`.

## The contact form

`POST /api/contact` is the only server route. It validates with
`lib/validate-contact.ts` — the same module the form imports, so the browser and
the server cannot drift apart, and the server re-runs every check regardless of
what the client did.

Spam is caught two ways, and both fail *silently* with a `200` so a bot learns
nothing from the response: a honeypot field no person can see, and a submission
that arrives less than two seconds after the form mounted. On top of that, five
messages per IP per hour; the counter is in memory, which is right for one
process and would want Redis behind several.

Delivery goes through Resend's HTTP API over `fetch`, so there is no SDK to
install and the key stays on the server. **If the environment is not
configured**, the route answers `503 not_configured` and the form hands the
visitor a `mailto:` link with their message already written into it, rather than
accepting something it cannot deliver.

| Status | When |
| --- | --- |
| `200` | Delivered — or silently swallowed as spam |
| `400` | Body was not JSON |
| `422` | Validation failed; the body carries per-field messages |
| `429` | Six or more messages from one IP within the hour |
| `503` | `not_configured` — the form falls back to `mailto:` |
| `502` | Resend refused or threw; the visitor is told to email directly |

## Before deploying

Copy `.env.example` to `.env.local` and fill it in.

`NEXT_PUBLIC_SITE_URL` is the one that matters: until it is set, the canonical
URL, the Open Graph image URL, `sitemap.xml` and `robots.txt` all fall back to
`http://localhost:3000`, which is fine locally and wrong in production.

`RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` are optional — the
form degrades to `mailto:` without them. `RESEND_API_KEY` is server-only; never
prefix it with `NEXT_PUBLIC_`, and nothing in `.env*` is committed.

## Design notes

The page is set as an engineering datasheet: ruled section headers, spec tables
rather than prose for metadata, and request-path diagrams for the three projects
whose flow is the point.

Each colour has exactly one job, which is what keeps the accents from becoming
noise:

| Token | Value | Used for |
| --- | --- | --- |
| Warm white | `#FAFBF8` | The page |
| Deep navy | `#0F172A` | Body text, and the ground of every diagram panel |
| Forest green | `#144D3A` | Links and primary buttons — dark enough to read as text |
| Emerald | `#10B981` | Hover fills, the live indicator, the travelling signal |
| Teal | `#06B6D4` | Panel labels, and the second half of the gradient |
| Amber | `#F59E0B` | One job: marking an entry as a prototype or personal tool |
| Violet | `#8B5CF6` | One job: marking the step the model is responsible for |

- Emerald into teal is the only gradient that runs two accents together: the
  short rule on each section header. The hero's field is a separate thing —
  three soft washes of emerald, amber and teal over the warm white.
- Dark mode inverts to a navy ground rather than black. Every
  foreground/background pair clears WCAG AA in both themes, including body text
  over the densest point of the gradient (5.28:1).
- Geist Mono carries the structure (clause numbers, field labels, headings,
  diagrams); Geist Sans carries the prose. No display serif.
- `.field` in `app/globals.css` is the spec-table row used by the hero title
  block, the project metadata and the contact list.
- Diagrams are borders and text rather than SVG, so they reflow on a phone and
  inherit the theme. On a narrow screen each wrapped row opens with an arrow, so
  it reads as a continuation.
- There are three pieces of motion, and each one means something: the hero's
  washes drift against each other, the connectors in a static diagram light in
  sequence so the path reads in request order, and the live indicator breathes.
  All three are transform- and colour-only, so they stay on the compositor.
- `prefers-reduced-motion` stops all of it, and parks the hero's washes where
  they look composed rather than wherever frame zero left them.
