import type { LucideIcon } from "lucide-react";

export type NavItem = {
  readonly id: SectionId;
  readonly label: string;
  readonly href: `#${string}`;
};

export type SectionId = "home" | "about" | "skills" | "projects" | "experience" | "contact";

export type SkillLevel = "core" | "strong" | "working";

export type Skill = {
  readonly name: string;
  readonly level: SkillLevel;
};

export type SkillCategory = {
  readonly id: string;
  readonly title: string;
  readonly caption: string;
  readonly icon: LucideIcon;
  /** Tailwind-safe gradient stops used for the category accent. */
  readonly gradient: readonly [from: string, to: string];
  readonly skills: readonly Skill[];
};

export type ProjectCategory = "web" | "mobile" | "ai";

export type ProjectLinks = {
  /** Primary destination — the web app or marketing site. */
  readonly demo?: string;
  readonly github?: string;
  readonly ios?: string;
  readonly android?: string;
};

export type Project = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: ProjectCategory;
  readonly year: string;
  readonly links: ProjectLinks;
};

export type Credential = {
  readonly title: string;
  readonly issuer: string;
  readonly year: string;
};

export type ExperienceItem = {
  readonly id: string;
  readonly company: string;
  readonly role: string;
  readonly type: string;
  readonly location: string;
  readonly period: string;
  readonly summary: string;
  readonly achievements: readonly string[];
  readonly stack: readonly string[];
  readonly current: boolean;
};

export type SocialLink = {
  readonly label: string;
  readonly href: string;
  readonly handle: string;
  readonly icon: LucideIcon;
};

export type Stat = {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
};
