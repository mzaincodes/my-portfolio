import { Bot, Braces, Database, Layers, Server, Wrench } from "lucide-react";

import type { SkillCategory } from "@/types";

export const skillCategories: readonly SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    caption: "What I reach for first",
    icon: Braces,
    gradient: ["#60A5FA", "#3B82F6"],
    skills: [
      { name: "JavaScript", level: "core" },
      { name: "TypeScript", level: "core" },
      { name: "Python", level: "strong" },
      { name: "SQL", level: "strong" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Mobile",
    caption: "Interfaces on web and device",
    icon: Layers,
    gradient: ["#38BDF8", "#0284C7"],
    skills: [
      { name: "React", level: "core" },
      { name: "Next.js", level: "core" },
      { name: "React Native", level: "strong" },
      { name: "Tailwind CSS", level: "core" },
      { name: "Bootstrap", level: "strong" },
      { name: "Vue", level: "working" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    caption: "APIs built for throughput",
    icon: Server,
    gradient: ["#3B82F6", "#1D4ED8"],
    skills: [
      { name: "Node.js", level: "core" },
      { name: "Express", level: "core" },
      { name: "NestJS", level: "strong" },
      { name: "REST APIs", level: "core" },
      { name: "WebRTC", level: "working" },
    ],
  },
  {
    id: "data",
    title: "Databases & Search",
    caption: "Modelling, indexing and querying",
    icon: Database,
    gradient: ["#22D3EE", "#0891B2"],
    skills: [
      { name: "MongoDB", level: "core" },
      { name: "SQL", level: "strong" },
      { name: "Supabase", level: "strong" },
      { name: "OpenSearch", level: "strong" },
    ],
  },
  {
    id: "automation",
    title: "Automation & Scraping",
    caption: "Removing the manual steps",
    icon: Bot,
    gradient: ["#0EA5E9", "#1D4ED8"],
    skills: [
      { name: "n8n", level: "core" },
      { name: "Playwright", level: "strong" },
      { name: "Puppeteer", level: "strong" },
      { name: "Apify", level: "strong" },
      { name: "Selenium", level: "working" },
    ],
  },
  {
    id: "tooling",
    title: "Tooling & AI",
    caption: "From local commit to production",
    icon: Wrench,
    gradient: ["#5EEAD4", "#0D9488"],
    skills: [
      { name: "Docker", level: "strong" },
      { name: "Git", level: "core" },
      { name: "Cursor", level: "core" },
      { name: "Claude Code", level: "core" },
      { name: "Codex", level: "strong" },
    ],
  },
] as const;
