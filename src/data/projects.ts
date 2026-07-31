import type { Project, ProjectCategory } from "@/types";

export const projectFilters: readonly { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI Automation" },
] as const;

/**
 * Add `links` entries (github / demo) as they become available — the card
 * hides its link affordances entirely when both are absent.
 */
export const projects: readonly Project[] = [
  {
    id: "titan-n8n-workflows",
    title: "Titan n8n Workflows",
    description:
      "End-to-end SOC automation built in n8n with custom nodes, wiring external APIs, databases and internal services into reliable alert-handling pipelines.",
    category: "ai",
    status: "live",
    year: "2025",
    links: {},
  },
  {
    id: "automated-accessors-portal",
    title: "Automated Accessors Portal",
    description:
      "Property-owner identification portal for U.S. real estate data. Playwright scraping and enrichment APIs lifted owner-lead match rates by 25%.",
    category: "web",
    status: "live",
    year: "2025",
    links: {},
  },
  {
    id: "tutor-expertz",
    title: "Tutor Expertz",
    description:
      "Educational web and mobile platform supporting five user roles and 10,000+ interactions, backed by an Express API serving 500k+ requests a month.",
    category: "mobile",
    status: "live",
    year: "2024",
    links: {},
  },
  {
    id: "multi-tenant-hypermarket",
    title: "Multi-Tenant Hypermarket",
    description:
      "Marketplace and dispatching system letting 1000+ vendors run customisable storefronts, with auto-dispatch routing orders to the nearest available rider.",
    category: "mobile",
    status: "live",
    year: "2025",
    links: {},
  },
  {
    id: "pdf-edit-tool",
    title: "PDF Edit Tool",
    description:
      "Next.js SaaS for merging, splitting and editing PDFs, with an S3-backed Node service handling 1000+ operations a month at 99% uptime.",
    category: "web",
    status: "live",
    year: "2024",
    links: {},
  },
  {
    id: "voice-meet-room",
    title: "Voice Meet Room",
    description:
      "Room-based conferencing app in Vue with P2P connectivity over STUN/TURN, push-to-talk controls and real-time profanity filtering.",
    category: "web",
    status: "live",
    year: "2023",
    links: {},
  },
] as const;
