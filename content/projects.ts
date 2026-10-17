export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  /** One line a recruiter can read at a glance. */
  summary: string;
  /** Professional work, or something built outside client work. */
  kind: "Production" | "Prototype" | "Personal tool";
  /** Which section the entry belongs to. */
  category: "Client" | "Independent";
  /** The company the work was done for. Omitted for independent work. */
  org?: string;
  role: string;
  period: string;
  /** The situation the system exists to deal with. */
  problem: string;
  /** Specific, verifiable engineering work. No metrics that were not measured. */
  highlights: string[];
  stack: string[];
  links?: ProjectLink[];
  /** Shown on the card when there is no screenshot or diagram to preview.
   *  Facts only — nothing here is decorative. */
  facts?: string[];
  /** A screenshot of the thing actually running. Captured locally, not mocked. */
  media?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
    /** An animated image: served as-is, since optimising would flatten it. */
    animated?: boolean;
  };
  /** Renders as a request-path diagram. Steps are drawn in order; `aiStep`
   *  is the index of the step the model is responsible for. */
  flow?: {
    steps: string[];
    footer: string;
    aiStep?: number;
    /** Renders the walk-through version, where each step can be opened. */
    interactive?: boolean;
    /** One note per step, in the same order. Required when interactive. */
    details?: string[];
  };
  /** Rendered as a caveat under the card. Used to keep claims honest. */
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "remi",
    name: "Remi",
    summary:
      "An AI-powered Shopify app for merchants: order tracking, returns, cancellations, address changes and product recommendations, answered from the merchant's own data and policies. Live with pilot merchants.",
    kind: "Production",
    category: "Client",
    org: "Tensorark",
    role: "Senior Full Stack & AI Engineer — architected and shipped end to end",
    period: "Dec 2025 – Present",
    problem:
      "Merchants answer the same four questions all day — where is my order, can I return this, can I cancel, can I change the address. A support bot that guesses at those is worse than none: refunds and cancellations move money, and a wrong answer about a return window becomes a chargeback.",
    highlights: [
      "Architected and shipped Remi end to end: an AI-powered Shopify app handling order tracking, returns, cancellations, address changes and product recommendations, now live with pilot merchants.",
      "Built the LangGraph.js agent, retrieval-augmented generation on PostgreSQL with pgvector, multi-turn memory, and policy-aware workflows, using LLMs through OpenRouter.",
      "Kept LangChain behind a single adapter so the agent stays portable across model providers, and used LangSmith for tracing and evaluating its outputs.",
      "Integrated Shopify through the Admin GraphQL API, Theme App Extensions and an HMAC-secured App Proxy, with a Polaris admin dashboard and an audit trail of every agent action.",
      "Owned security, GDPR, idempotency, PII protection, human escalation, billing and usage controls.",
      "Set up the full Docker and GitHub Actions deployment pipeline, with 113 passing Vitest tests and zero TypeScript errors.",
    ],
    stack: [
      "TypeScript",
      "LangGraph.js",
      "PostgreSQL + pgvector",
      "OpenRouter",
      "LangChain",
      "LangSmith",
      "Shopify Admin GraphQL",
      "Shopify Polaris",
      "React Router 7",
      "Prisma",
      "Redis",
      "Docker",
      "GitHub Actions",
      "Vitest",
    ],
    flow: {
      steps: [
        "storefront widget",
        "App Proxy · HMAC",
        "rate limit · token budget",
        "LangGraph agent",
        "tools · Admin GraphQL + pgvector",
        "guardrail · auto / approve / deny",
        "reply",
      ],
      aiStep: 3,
      interactive: true,
      details: [
        "A Theme App Extension on the storefront. It holds no keys and knows nothing about the agent — it can only talk to the app proxy.",
        "Every request carries a Shopify HMAC signature, verified in constant time. An unsigned or tampered request is refused before any work is done.",
        "Per-IP, per-shop and per-conversation limits, plus hard token and turn caps, so a single conversation cannot run up an unbounded model bill.",
        "A LangGraph.js ReAct loop. LangChain sits behind one adapter, so the model provider can change without the graph changing with it.",
        "Order facts come from live Shopify Admin GraphQL queries. Policy answers come from the merchant's own documents in pgvector, ingested by content hash so re-uploading an unchanged file costs nothing.",
        "Deterministic, and outside the model's reach. Anything that moves money is classified before the reply leaves: act automatically, wait for a human, or refuse.",
        "Streamed back to the shopper. The message and every tool call it made are written to an append-only audit trail, with PII stripped from logs and traces.",
      ],
      footer:
        "Every message and tool call is written to an append-only audit trail, with PII stripped from logs and traces.",
    },
    media: {
      src: "/media/remi-chat.webp",
      width: 808,
      height: 596,
      alt: "Remi's chat widget on a storefront: a 'Hi! I'm Remi — ask me about your order, returns, or shipping' greeting above a message box",
      caption:
        "Remi's chat widget, as a merchant's customers see it on the storefront.",
      animated: true,
    },
    note: "Live with pilot merchants. The repository is private company work, so there is no public link.",
  },
  {
    slug: "loopstart",
    name: "LOOPSTART",
    summary:
      "An enterprise telecom platform handling 10,000+ transactions a day on the Bandwidth and NetSapiens carrier APIs: bulk ordering of 100+ phone numbers at a time, number porting, reseller operations and customer domains, on Azure serverless functions.",
    kind: "Production",
    category: "Client",
    org: "Cinnova",
    role: "Team Lead / Senior Software Engineer — led delivery, 5+ engineers",
    period: "2022 – 2025",
    problem:
      "Telecom operations are unforgiving: a number port is a regulated, multi-party process with no undo, and a reseller ordering a hundred numbers at once expects every one of them to land. The platform had to hold 10,000+ transactions a day across carrier APIs it did not control.",
    highlights: [
      "Led delivery of the platform with a team of 5+ engineers, across sprint planning, technical design and code review, and owned the architecture decisions.",
      "Developed the number ordering and porting workflows: availability lookup, inventory management, validation, and the regulatory compliance rules around port-outs and SMS campaigns.",
      "Wrote the agent communication and agent-availability features for the embedded chat, running across 100+ customer and reseller domains.",
      "Locked down chat abuse with session-level rate limiting, abusive-user blocking, abusive-word masking and a three-level warning system for repeated spam.",
      "Integrated Kuma as a separate service-health layer, with the checks written in Python and FastAPI over SIP REGISTER and OPTIONS, then extended it with per-domain site configuration and status pages created from the portal.",
      "Optimised the Node.js and Express order-management endpoint that filtered and searched large datasets across several modals at once: traced the slow paths to N+1 queries and image data stored in the database, then moved image handling to Azure Blob Storage, keeping only URLs in the records.",
      "Reorganised data loading in the React and Next.js frontends (TypeScript) so the order-management screens stopped fetching several record sets and modals in series.",
      "Cleaned up customer-specific chat problems, from domain restrictions to theme conflicts and CSS overlaps, while keeping the configurations reusable.",
    ],
    facts: [
      "10,000+ transactions a day",
      "100+ phone numbers per bulk order",
      "100+ customer and reseller domains",
      "Azure serverless functions",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Express",
      "React",
      "Next.js",
      "Azure Functions",
      "Azure Blob Storage",
      "Python",
      "FastAPI",
      "Socket.io",
      "AWS",
    ],
    media: {
      src: "/media/loopstart.jpg",
      width: 1600,
      height: 1000,
      alt: "Loop Start Technologies' website: the hero reading 'Get the Most Out of Selling UCaaS with Loop Start'",
      caption:
        "Loop Start's public website. The telecom platform I worked on runs behind it and is private.",
    },
    note: "Client platform. Described at the level of detail the work allows; no proprietary implementation is reproduced here.",
  },
  {
    slug: "procamps",
    name: "ProCamps",
    summary:
      "Performance and infrastructure work for ProCamps, the athlete-led youth sports camps platform: the slowest queries traced and fixed, and AWS run in production.",
    kind: "Production",
    category: "Client",
    org: "Cinnova",
    role: "Team Lead / Senior Software Engineer — query tuning and AWS",
    period: "2022 – 2025",
    problem:
      "The slowest parts of the platform came down to the database: queries doing full-table scans.",
    highlights: [
      "Traced the slowest queries to full-table scans and fixed them with indexing and query rewrites.",
      "Looked after the AWS infrastructure across EC2 and Lambda.",
      "Looked after deployments and production monitoring.",
    ],
    stack: ["AWS EC2", "AWS Lambda", "SQL", "Indexing"],
    media: {
      src: "/media/procamps.jpg",
      width: 1600,
      height: 1000,
      alt: "ProCamps website: the hero reading 'Have fun. Compete. Make memories.' above upcoming camps",
      caption: "ProCamps' public website as it is today.",
    },
    note: "Client platform at Cinnova. No public source.",
  },
  {
    slug: "smartfi",
    name: "SmartFi",
    summary:
      "A fintech platform for earning, trading and lending crypto: Plaid bank connectivity and financial-data aggregation, the financial-management modules, and a lighter database through PostgreSQL tuning and Redis caching.",
    kind: "Production",
    category: "Client",
    org: "Cinnova",
    role: "Team Lead / Senior Software Engineer — Plaid, finance modules, database",
    period: "2022 – 2025",
    problem:
      "Users' bank and financial data has to come in reliably from outside, and the database has to keep up as that data grows.",
    highlights: [
      "Connected Plaid for bank connectivity and financial-data aggregation.",
      "Shipped the financial-management modules.",
      "Cut database load with PostgreSQL query tuning and Redis caching.",
    ],
    stack: ["Plaid", "PostgreSQL", "Redis"],
    media: {
      src: "/media/smartfi.jpg",
      width: 1024,
      height: 538,
      alt: "SmartFi's member sign-up page: a phone-number step in a four-step sign-up flow beside the 'Digital Wealth Creation Platform' banner",
      caption: "SmartFi's public sign-up page, from the platform's beta.",
    },
    note: "Client platform at Cinnova. No public source.",
  },
  {
    slug: "holisto",
    name: "Holisto",
    summary:
      "A multi-tenant food safety, compliance and operations SaaS for multi-outlet businesses — digital checklists, audits, asset tracking and IoT temperature monitoring.",
    kind: "Production",
    category: "Client",
    org: "Holisto Systems",
    role: "Senior Full Stack Engineer (Independent Contractor)",
    period: "Dec 2025 – Jul 2026",
    problem:
      "Food safety compliance is evidence, not intent: an outlet has to show that the fridge was checked, by whom, and what it read. Every tenant in the platform shares a single database, which makes isolation a property of the queries rather than of the infrastructure.",
    highlights: [
      "Added enterprise features to the platform, where every tenant shares one database: React with React Router 7, Node.js, and MySQL through Prisma, on AWS with CloudWatch monitoring.",
      "Wrote the REST APIs and backend services behind digital checklists, audits, task management and equipment/asset tracking.",
      "Handled the IoT side, pulling live temperature readings off connected equipment into the platform.",
      "Put together the analytics side: KPI reporting, compliance insights, task-completion tracking, and PDF and Excel exports across outlets.",
      "Cleared legacy bugs across the existing codebase while shipping new features on top of it.",
      "Sat with stakeholders to turn operational and regulatory requirements into something buildable, using Claude, ChatGPT, Copilot and Cursor throughout.",
    ],
    facts: [
      "Multi-tenant on a single database",
      "Live IoT temperature feeds",
      "KPI reporting · PDF and Excel exports",
      "AWS with CloudWatch",
    ],
    stack: [
      "React Router 7",
      "Node.js",
      "MySQL",
      "Prisma",
      "AWS",
      "CloudWatch",
    ],
    media: {
      src: "/media/holisto.jpg",
      width: 1600,
      height: 1000,
      alt: "Holisto Systems' website: 'Streamlining and digitising compliance and task management' above a photo of a chef checking her phone",
      caption:
        "Holisto Systems' public website. The multi-tenant platform behind it is private.",
    },
    note: "Client platform, no public link.",
  },
  {
    slug: "artfy",
    name: "Artfy",
    summary:
      "The NFT marketplace for Artfy (artfy.io), a platform for artists: NFT minting, marketplace listings and wallet integration, kept in sync through Web3.js and Socket.io.",
    kind: "Production",
    category: "Client",
    org: "InvoZone",
    role: "Senior Software Engineer — NFT minting, listings and wallet integration",
    period: "2021",
    problem:
      "A marketplace where the state that matters lives on a blockchain: a mint, a listing or a wallet change has to show up in the app as it happens, not on the next page load.",
    highlights: [
      "NFT minting and marketplace listings, built on React and Node.js with Solidity smart contracts.",
      "Wallet integration through Web3.js.",
      "Marketplace state kept in sync with the chain over Socket.io, so listings and wallet changes reach the app live.",
    ],
    stack: ["React", "Node.js", "Web3.js", "Solidity", "Socket.io"],
    media: {
      src: "/media/artfy.jpg",
      width: 1600,
      height: 707,
      alt: "Artfy promotional artwork: the mobile app's feed, artist search and event list, with the artfy.io app icon",
      caption:
        "Artfy's own promotional artwork for the app at artfy.io. My work was the NFT marketplace described here.",
    },
    note: "Client platform, built at InvoZone. No public source.",
  },
  {
    slug: "arswap",
    name: "ArSwap",
    summary:
      "A crypto wallet and swap app (arswap.org): wallet functionality, blockchain transaction workflows and smart-contract integrations, backed by services for crypto transactions and account management.",
    kind: "Production",
    category: "Client",
    org: "InvoZone",
    role: "Senior Software Engineer — wallet, transaction workflows and contract integrations",
    period: "2021",
    problem:
      "Every transaction runs through smart contracts, so the app's wallet and account views have to stay true to what actually happened on the chain.",
    highlights: [
      "Wallet functionality and the blockchain transaction workflows behind it.",
      "Smart-contract integrations, built with Web3.js and Solidity.",
      "Backend services for crypto transactions and account management.",
    ],
    stack: ["React", "Node.js", "Web3.js", "Solidity"],
    media: {
      src: "/media/arswap.jpg",
      width: 1600,
      height: 732,
      alt: "ArSwap's swap screen: 'You send' and 'You receive' token pickers with a Connect wallet button",
      caption: "ArSwap's swap screen as the site stands today, on testnet.",
    },
    note: "Client project at InvoZone. No public source.",
  },
  {
    slug: "rd-link",
    name: "The RD Link",
    summary:
      "A platform connecting health and wellness brands with registered dietitians. I built the first version of its front end, and its live chat module end to end.",
    kind: "Production",
    category: "Client",
    org: "InvoZone",
    role: "Senior Software Engineer — first front end and the live chat module",
    period: "2021",
    problem:
      "Health and wellness brands and registered dietitians need one place to find each other, trial products and work together.",
    highlights: [
      "Built the first version of the front end, in React with Redux, Vite, Tailwind CSS and Bootstrap.",
      "Took the live chat module end to end: Redux on the front, Node.js behind it.",
    ],
    stack: ["React", "Redux", "Vite", "Tailwind CSS", "Bootstrap", "Node.js"],
    media: {
      src: "/media/rd-link.jpg",
      width: 1600,
      height: 1000,
      alt: "The RD Link website: 'It's never been easier for brands and dietitians to connect' beside laptops showing the dietitian directory",
      caption:
        "The RD Link's public site as it is today. I built the first version of the front end and the live chat module.",
    },
    note: "Client project at InvoZone. No public source.",
  },
  {
    slug: "healthcare-pk",
    name: "Healthcare.pk",
    summary:
      "A healthcare platform for Pakistan (healthcare.pk): doctor discovery, appointment scheduling, patient profiles and lab integration.",
    kind: "Production",
    category: "Client",
    org: "Softech Systems",
    role: "Software Engineer — doctor discovery, appointments, patient profiles and the lab module",
    period: "2020 – 2021",
    problem:
      "Patients need to find a doctor, book an appointment and get lab work handled in one place, against a single patient profile.",
    highlights: [
      "Doctor discovery, built on React, Node.js and MongoDB.",
      "Appointment scheduling and patient profiles.",
      "Lab integration, with the lab module written in core PHP.",
    ],
    stack: ["React", "Node.js", "MongoDB", "PHP"],
    media: {
      src: "/media/healthcare-pk.jpg",
      width: 1600,
      height: 1000,
      alt: "healthcare.pk home page: a search for doctors, hospitals and medicines, with quick-access links below",
      caption:
        "healthcare.pk as it looks today. The site has grown since 2021; my work was the parts described here.",
    },
    note: "Client project at Softech Systems.",
  },
  {
    slug: "next-pharmaceutical",
    name: "NEXT Pharmaceutical",
    summary:
      "A medical and pharmacy eCommerce platform for NEXT Pharmaceutical, built in PHP.",
    kind: "Production",
    category: "Client",
    org: "Softech Systems",
    role: "Software Engineer — medical and pharmacy eCommerce in PHP",
    period: "2020 – 2021",
    problem:
      "Medical and pharmacy products sold online: a catalogue customers can browse and order from.",
    highlights: ["A medical and pharmacy eCommerce platform, built in PHP."],
    stack: ["PHP"],
    media: {
      src: "/media/next-pharma.jpg",
      width: 1600,
      height: 1000,
      alt: "NEXT Pharmaceutical's website: product boxes for Esonext, Omecap, Obetinext and Domflash",
      caption: "NEXT Pharmaceutical's website as it is today.",
    },
    note: "Client project at Softech Systems.",
  },
  {
    slug: "mahum-asad",
    name: "Mahum Asad",
    summary:
      "A full eCommerce platform for the Mahum Asad fashion label, built solo: product catalogue, cart, checkout and admin dashboard.",
    kind: "Production",
    category: "Client",
    org: "The Hexaa",
    role: "Software Engineer — solo build, end to end",
    period: "2018 – 2019",
    problem:
      "A fashion label selling online needs the whole store, from catalogue to checkout, and an admin side to run it.",
    highlights: [
      "Solo build of a full eCommerce platform, end to end.",
      "Product catalogue, cart and checkout.",
      "An admin dashboard for running the store.",
    ],
    stack: [],
    media: {
      src: "/media/mahum-asad.jpg",
      width: 1600,
      height: 1000,
      alt: "Mahum Asad's online store: a 'Ready To Ship' banner over a model in an embroidered outfit, above best sellers",
      caption:
        "Mahum Asad's store as it is today. The site has changed since 2019; my build was the platform described here.",
    },
    note: "Client project at The Hexaa.",
  },
  {
    slug: "applywise",
    name: "ApplyWise",
    summary:
      "A local tool that reads a job posting, tailors my CV to it, mechanically checks the result for invented claims, and only then sends the application.",
    kind: "Personal tool",
    category: "Independent",
    role: "Sole author",
    period: "2026",
    problem:
      "Tailoring a CV per application is slow, and handing the job to a model is how a CV quietly starts claiming Kubernetes. The interesting half of this is not the generation — it is refusing to send anything the master CV cannot support.",
    highlights: [
      "A deterministic validator checks every tailored CV against facts extracted from the master CV. It catches added technologies, added numbers, inflated years and structural forgery, and it is biased toward rejection: a false rejection costs one regeneration, an unsupported claim reaches a real employer.",
      "The validator is mechanical rather than an LLM grading its own homework, and its limits are written down in the code — it cannot tell whether a rewrite distorts emphasis while staying inside the source vocabulary.",
      "The technology lexicon deliberately omits names that are also ordinary English — rest, spring, swift, chef, linear — because case-insensitive matching on those rejects truthful CVs.",
      "Job postings are untrusted input, so the model is given explicit rules for handling them and the extracted JSON is isolated before it is parsed.",
      "Application addresses are never guessed or derived from a domain. No address in the posting means the application stops and says so.",
      "Upload limits are shared by client and server so the two cannot drift, and the server re-checks all of them: 30 images, 10 MB each, 100 MB per batch, and a 50-megapixel ceiling that refuses decompression bombs regardless of how small the file is.",
      "Postings process five at a time with every failure caught per application, so one unreadable screenshot never takes down the batch — and dry-run is the default, so sending has to be switched on deliberately.",
    ],
    stack: [
      "Next.js 15",
      "TypeScript",
      "Anthropic API",
      "react-pdf",
      "Nodemailer",
      "sharp",
      "Zod",
      "node:test",
    ],
    flow: {
      steps: [
        "posting · screenshot or text",
        "vision extraction",
        "tailor against master facts",
        "deterministic validator",
        "PDF render",
        "send",
      ],
      aiStep: 2,
      footer:
        "A tailored CV that adds a technology the master CV does not contain is rejected and regenerated once, not sent.",
    },
    media: {
      src: "/media/applywise.jpg",
      width: 1200,
      height: 1383,
      alt: "ApplyWise running locally: the master CV, job input with screenshot upload, two queued applications, and a Process button in dry-run mode",
      caption:
        "ApplyWise running locally in dry-run mode: everything is generated, nothing is sent. Job-posting screenshots are blurred.",
    },
    note: "A personal tool rather than a product. It runs locally against my own CV, that data is gitignored, and there is no public repository or hosted instance.",
  },
  {
    slug: "lead-intelligence-console",
    name: "Lead Intelligence Console",
    summary:
      "An acquisition-sourcing tool that scores and prioritises companies deterministically, and keeps the LLM strictly on the explaining side of the line.",
    kind: "Prototype",
    category: "Independent",
    role: "Sole author",
    period: "2026",
    problem:
      "Lead platforms return hundreds of companies. The buyer still has to decide which deserve enrichment credits and a phone call — and be able to defend that decision later. An opaque AI score cannot be defended.",
    highlights: [
      "Two scores kept deliberately separate: how well a company fits the buy box, and whether the record is complete enough to act on. A good target with a thin record is a different problem from a bad target.",
      "Scoring is rule-based and reproducible — six weighted factors, every point traceable to a rule, the same input always producing the same score. The drawer shows the arithmetic.",
      "The LLM reads the scored record and writes the reasoning, the missing-information summary and the suggested next action. It never calculates or changes a score.",
      "Company identity is a SHA-256 of the normalised domain rather than the name, so 'Acme Inc' and 'ACME LLC' converge; contacts deduplicate on normalised email.",
      "Any scores present in an imported CSV are discarded and recomputed, so there is exactly one scoring engine.",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Anthropic API",
    ],
    media: {
      src: "/media/lead-intelligence-console.png",
      width: 1600,
      height: 1000,
      alt: "The console's target list: KPI tiles for total companies, high-fit targets and enrichment opportunities, filters, and a ranked table of companies with fit scores, data-quality scores, contacts and recommended next actions.",
      caption:
        "The target list, running locally. The synthetic-data badge is part of the app, not added for this page.",
    },
    links: [
      {
        label: "Source",
        href: "https://github.com/mariyamh/lead-intelligence-console",
      },
    ],
    note: "A prototype running on synthetic data — fictional companies and .example domains. It does not perform enrichment itself, and there is no hosted demo.",
  },
  {
    slug: "ai-lead-qualification",
    name: "AI Lead Qualification Workflow",
    summary:
      "A contact-form-to-outreach pipeline where the model produces data and the workflow makes the decisions — with human approval on anything risky.",
    kind: "Prototype",
    category: "Independent",
    role: "Sole author",
    period: "2026",
    problem:
      "A founder reading, qualifying and replying to inbound leads by hand is the bottleneck. Handing that to a chat model is worse: in the baseline, the same lead scored 68, 82 and 62 across three fresh conversations.",
    highlights: [
      "Because the model's scores were not reproducible, it was given no authority over them. Classification thresholds, escalation, safety checks, approval state and delivery state all live in the workflow.",
      "The path is explicit: validation and spam checks, idempotent lead creation, AI qualification, deterministic classification, drafting, human approval where required, then delivery and audit.",
      "Pricing and legal questions escalate to a person by rule, not by the model's own assessment of its confidence.",
      "The acceptance pass covered 15 cases — duplicates, spam, prompt injection, malformed model output, escalation, delivery failure and approval recovery — and recorded 15/15.",
      "Testing surfaced two real integration bugs: an approval decision lost after the asynchronous Slack step, and a successful send wired to the wrong branch. Both fixed and regression-tested.",
    ],
    stack: ["n8n", "PostgreSQL / Supabase", "OpenRouter", "Slack", "Gmail"],
    media: {
      src: "/media/ai-lead-qualification-n8n.jpg",
      width: 2048,
      height: 601,
      alt: "The workflow open in the n8n editor: a lead webhook on the left feeding validation, de-duplication, AI qualification, guardrails, human approval and email sending nodes across the canvas.",
      caption:
        "The workflow open in the n8n editor, from the lead webhook on the left through qualification, guardrails and human approval to sending.",
    },
    links: [
      {
        label: "Source",
        href: "https://github.com/mariyamh/ai-lead-qualification-n8n",
      },
    ],
    flow: {
      steps: [
        "contact form",
        "validation · spam",
        "idempotent lead create",
        "AI qualification",
        "deterministic classification",
        "human approval when required",
        "send · audit",
      ],
      aiStep: 3,
      footer:
        "Thresholds, escalation, approval state and delivery state live in the workflow. The model produces data; it does not decide.",
    },
    note: "A prototype. Production latency and cost per lead have not been measured, and it does not track replies after the first outbound email.",
  },
];
