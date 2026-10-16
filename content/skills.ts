export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend & APIs",
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
