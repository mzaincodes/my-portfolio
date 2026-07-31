import { Github, Linkedin } from "lucide-react";

import type { NavItem, SocialLink, Stat } from "@/types";

export const siteConfig = {
  name: "Muhammad Zain",
  initials: "MZ",
  role: "Software Engineer",
  tagline: "I build full stack products, automation workflows, and the backends that keep them running.",
  description:
    "Software Engineer with 3 years of experience in full stack development, Python automation and workflow optimisation. I build scalable automation, integrate APIs, and apply AI to improve business processes.",
  url: "https://muhammadzain.dev",
  email: "mzain4148@gmail.com",
  phone: "+92 303 4329878",
  location: "Lahore, Pakistan",
  timezone: "GMT+5",
  availability: "Open to opportunities",
  intro:
    "Software Engineer with 3+ years of experience in Python automation, backend development, AI/LLM integration, API development, and workflow automation. Skilled in building scalable automation solutions and AI-powered applications.",
  resumeUrl: "/resume.pdf",
  /**
   * Portrait shown in the hero card, served from `public/`. Set to null to fall
   * back to the styled monogram placeholder. The card frame is 3:4, so a
   * portrait crop at that ratio fills it without cropping.
   */
  photo: "/pic.jpg" as string | null,
  keywords: [
    "Muhammad Zain",
    "Software Engineer",
    "MERN Stack Developer",
    "Next.js Developer",
    "Node.js",
    "React Native",
    "n8n Automation",
    "Python Automation",
    "Lahore",
  ],
} as const;

export const navItems: readonly NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

export const socialLinks: readonly SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/mzaincodes",
    handle: "@MuhammadZain",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "linkedin.com/in/muhammad-zain-25a602266/",
    handle: "/in/MuhammadZain",
    icon: Linkedin,
  },
] as const;

/** Every figure here is taken directly from the CV. */
export const stats: readonly Stat[] = [
  { value: 3, suffix: "+", label: "Years of experience" },
  { value: 10, suffix: "+", label: "MSSPs running Titan" },
  { value: 70, suffix: "%", label: "Manual analyst effort cut" },
  { value: 99, suffix: "%", label: "Uptime maintained" },
] as const;

/** Sentences typed and erased one character at a time beneath the hero name. */
export const typewriterPhrases: readonly string[] = [
  "Building scalable web applications.",
  "Developing AI-powered solutions.",
  "Automating workflows and business processes.",
  "Creating cross-platform Android & iOS apps.",
] as const;