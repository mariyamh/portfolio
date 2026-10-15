export type SkillGroup = {
  title: string;
  /** Short note on how this group is actually used. */
  note: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend & APIs",
    note: "Where most of the eight years went.",
    items: [
      "TypeScript",
      "Node.js",
      "Express",
      "REST API design",
      "GraphQL",
      "WebSockets / Socket.io",
      "Microservices",
      "Auth (JWT, OAuth2, HMAC, RBAC)",
      "Rate limiting",
      "Idempotency",
      "Python / FastAPI",
      "PHP / Laravel",
    ],
  },
  {
    title: "Frontend",
    note: "Enough to own a feature end to end rather than hand it over.",
    items: [
      "React",
      "Next.js",
      "React Router 7",
      "Redux",
      "TypeScript",
      "Tailwind CSS",
      "Shopify Polaris",
      "Vite",
    ],
  },
  {
    title: "Data",
    note: "Schema design, and the query work that follows when a screen gets slow.",
    items: [
      "PostgreSQL",
      "pgvector",
      "MySQL",
      "MongoDB",
      "Redis",
      "Prisma",
      "Query & index optimisation",
    ],
  },
  {
    title: "Cloud & delivery",
    note: "Deploying and operating what I build, not just writing it.",
    items: [
      "AWS (EC2, S3, RDS, Lambda, CloudWatch)",
      "Azure Functions",
      "Docker & Compose",
      "GitHub Actions",
      "GHCR",
      "Traefik / TLS",
      "Serverless",
      "Self-hosted VPS",
    ],
  },
  {
    title: "AI & LLM engineering",
    note: "The newest column — about a year of it, on Remi and two prototypes.",
    items: [
      "LangGraph",
      "LangChain",
      "LangSmith",
      "ReAct agents",
      "Tool calling",
      "RAG",
      "Embeddings & semantic search",
      "OpenRouter",
      "OpenAI & Anthropic APIs",
      "Guardrails & human escalation",
      "Tracing & evaluation",
    ],
  },
  {
    title: "Ways of working",
    note: "The part that is not code. All of it from the résumé, not aspiration.",
    items: [
      "Technical documentation",
      "Agile / Scrum",
      "Team leadership",
      "Mentoring",
      "Client communication",
    ],
  },
  {
    title: "Quality & security",
    note: "The habits that keep the above from becoming someone else's incident.",
    items: [
      "Vitest",
      "Unit & integration testing",
      "Code review",
      "Structured logging (pino)",
      "Threat modelling",
      "Access-control hardening",
      "PII redaction",
      "Audit logging",
      "GDPR data-subject webhooks",
    ],
  },
];
