import type { ExperienceItem } from "@/types";

export const experience: readonly ExperienceItem[] = [
  {
    id: "ebryx",
    company: "Ebryx (Pvt) Ltd",
    role: "Software Engineer",
    type: "Full-time",
    location: "Lahore, PK",
    period: "Sep 2025 — Present",
    summary:
      "Building Titan, a SOC alert analysis platform used by more than ten international MSSPs.",
    achievements: [
      "Developed and maintained Titan, a SOC alert analysis platform used by 10+ international MSSPs.",
      "Built and optimised full stack features with Next.js, Node.js, SQL and OpenSearch, enabling real-time querying of 100k+ alerts per day.",
      "Implemented case management and workflow automation, cutting manual analyst effort by 70% and shortening threat investigation time.",
    ],
    stack: ["Next.js", "Node.js", "SQL", "OpenSearch", "n8n", "Docker"],
    current: true,
  },
  {
    id: "tecsofiy",
    company: "Tecsofiy",
    role: "MERN Stack Developer",
    type: "Full-time",
    location: "Lahore, PK",
    period: "Oct 2023 — Aug 2025",
    summary:
      "Delivered full stack MERN products end to end, from data model and API layer through to shipped web and mobile clients.",
    achievements: [
      "Developed scalable full stack applications on the MERN stack, improving overall system performance.",
      "Created SEO-friendly websites in Next.js with structured metadata, improving search engine rankings.",
      "Built robust forms with Zod and React Hook Form at 99% accuracy, and integrated real-time APIs to boost app efficiency.",
    ],
    stack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "React Native"],
    current: false,
  },
  {
    id: "360-synergy",
    company: "360 Synergy Tech",
    role: "React JS Developer",
    type: "Full-time",
    location: "Lahore, PK",
    period: "Jul 2023 — Sep 2023",
    summary: "Delivered client-facing React front ends with a focus on performance and responsiveness.",
    achievements: [
      "Delivered 9+ React.js websites, optimising state management, performance and responsiveness for 100% cross-device compatibility.",
      "Built mobile-first websites with Bootstrap and Tailwind CSS, ensuring 99% cross-browser compatibility.",
    ],
    stack: ["React", "JavaScript", "Bootstrap", "Tailwind CSS"],
    current: false,
  },
] as const;
