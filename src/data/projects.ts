import type { Project, ProjectCategory } from "@/types";

export const projectFilters: readonly { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI Automation" },
] as const;

export const projects: readonly Project[] = [
  {
    id: "titan",
    title: "Titan",
    description:
      "Ebryx's SOC platform for real-time alert investigation. Every alert opens a case with enrichment, triage workflow and a full analyst audit trail, serving 10+ international MSSPs.",
    category: "web",
    year: "2025",
    links: {},
  },
  {
    id: "titan-ai-chatbot",
    title: "Titan AI Chatbot",
    description:
      "Conversational assistant for SOC analysts, wired into threat-intelligence APIs so it can judge whether an alert is malicious and explain the reasoning behind the verdict.",
    category: "ai",
    year: "2025",
    links: {},
  },
  {
    id: "soar-n8n-workflows",
    title: "SOAR n8n Workflows",
    description:
      "End-to-end SOAR automation built in n8n with custom nodes, connecting external APIs, databases and internal services into reliable alert-handling pipelines.",
    category: "ai",
    year: "2025",
    links: {},
  },
  {
    id: "invoice-magnet",
    title: "Invoice Magnet",
    description:
      "Automated invoice collection pipeline. Playwright signs in to vendor portals, scrapes invoices on a schedule and files them into a database ready for reconciliation.",
    category: "ai",
    year: "2025",
    links: {},
  },
  {
    id: "tutor-expertz-web",
    title: "Tutor Expertz — Web",
    description:
      "Tutoring marketplace web app supporting five user roles and 10,000+ interactions, backed by an Express API and MongoDB analytics serving 500k+ requests a month.",
    category: "web",
    year: "2024",
    links: { demo: "https://app.tutorexpertz.com/auth/login-reg" },
  },
  {
    id: "tutor-expertz-mobile",
    title: "Tutor Expertz — Mobile",
    description:
      "React Native build of the tutoring platform, shipped to both the App Store and Google Play from a single shared codebase against the same API.",
    category: "mobile",
    year: "2024",
    links: {
      ios: "https://apps.apple.com/pk/app/tutor-expertz/id6752723112",
      android: "https://play.google.com/store/apps/details?id=com.tecsofiy.tutorexpertzllc&hl=en",
    },
  },
  {
    id: "aeya-web",
    title: "AEYA — Web",
    description:
      "Product site for AEYA, a women's health and fitness tracker built for a German client. Delivered in Webflow as the public face of the mobile product.",
    category: "web",
    year: "2025",
    links: { demo: "https://www.aeya-app.com/" },
  },
  {
    id: "aeya-mobile",
    title: "AEYA — Mobile",
    description:
      "Women's health and fitness tracker for a German client. Users log daily symptoms and habits and receive tailored feedback, shipped on iOS and Android.",
    category: "mobile",
    year: "2025",
    links: {
      ios: "https://apps.apple.com/ug/app/aeya/id6757761560",
      android: "https://play.google.com/store/apps/details?id=com.aeya_app.app&hl=en_ZA",
    },
  },
  {
    id: "fleetily",
    title: "Fleetily",
    description:
      "On-demand cab booking platform in the mould of Uber, connecting riders with nearby drivers across booking, dispatch and trip tracking.",
    category: "web",
    year: "2025",
    links: { demo: "https://fleetily.com/" },
  },
  {
    id: "jobxity",
    title: "Jobxity Recruiters Portal",
    description:
      "Job marketplace along the lines of Indeed. Recruiters publish and manage openings while candidates search, filter and apply from a single dashboard.",
    category: "web",
    year: "2025",
    links: { demo: "https://jobxity-recruiters-platofrm.vercel.app/" },
  },
  {
    id: "automated-accessors-portal",
    title: "Automated Accessors Portal",
    description:
      "Property-owner identification portal for U.S. real estate data. Playwright scraping and enrichment APIs lifted owner-lead match rates by 25%.",
    category: "web",
    year: "2025",
    links: {},
  },
  {
    id: "multi-tenant-hypermarket",
    title: "Multi-Tenant Hypermarket",
    description:
      "Marketplace and dispatching system letting 1000+ vendors run customisable storefronts, with auto-dispatch routing orders to the nearest available rider.",
    category: "web",
    year: "2025",
    links: {},
  },
  {
    id: "ecommerce-mobile-app",
    title: "Ecommerce Mobile App",
    description:
      "React Native shopping app for the multi-tenant marketplace, surfacing 500+ product listings across vendor storefronts and handling both vendor and customer interactions.",
    category: "mobile",
    year: "2025",
    links: {},
  },
  {
    id: "pdf-edit-tool",
    title: "PDF Edit Tool",
    description:
      "Next.js SaaS for merging, splitting and editing PDFs, with an S3-backed Node service handling 1000+ operations a month at 99% uptime.",
    category: "web",
    year: "2024",
    links: { demo: "https://pdf-edit-toois.vercel.app/" },
  },
  {
    id: "voice-meet-room",
    title: "Voice Meet Room",
    description:
      "Room-based conferencing app in Vue using WebRTC for peer-to-peer audio over STUN/TURN servers, with push-to-talk controls and real-time profanity filtering.",
    category: "web",
    year: "2023",
    links: { demo: "https://vercel.com/zains-projects-c6ad0216/voice-meet" },
  },
] as const;
