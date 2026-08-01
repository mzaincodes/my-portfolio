"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EASE_OUT, viewportOnce } from "@/lib/motion";
import type { Project, ProjectCategory } from "@/types";

const categoryMeta: Record<ProjectCategory, { label: string; color: string }> = {
  web: { label: "Web", color: "#60A5FA" },
  mobile: { label: "Mobile", color: "#22D3EE" },
  ai: { label: "AI Automation", color: "#5EEAD4" },
};

/* No `uppercase` on the store chips — it would render "iOS" as "IOS". */
const storeChipStyles =
  "relative z-20 rounded-md border border-line px-2 py-1 font-mono text-[0.625rem] text-subtle transition-[color,border-color,background-color] duration-300 hover:border-accent-soft/50 hover:bg-accent/10 hover:text-accent-soft";

export function ProjectCard({ project }: { project: Project }) {
  const { demo, github, ios, android } = project.links;
  const primaryHref = demo ?? github ?? ios ?? android;
  const { label, color } = categoryMeta[project.category];

  const storeLinks = [
    { label: "iOS", href: ios },
    { label: "Android", href: android },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <SpotlightCard tilt tiltStrength={2.5} spotlightSize={320} className="flex h-full flex-col p-6">
      {/* Category rail, mirroring the skills cards so the two sections read as one system */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="absolute inset-x-0 top-0 h-px origin-left"
        style={{ background: `linear-gradient(90deg, ${color}, transparent 85%)` }}
      />

      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1"
          style={{ borderColor: `${color}33`, backgroundColor: `${color}14` }}
        >
          <span className="size-1 rounded-full" style={{ backgroundColor: color }} aria-hidden />
          <span className="font-mono text-[0.5625rem] tracking-[0.14em] uppercase" style={{ color }}>
            {label}
          </span>
        </span>

        <span className="font-mono text-[0.625rem] text-subtle tabular-nums">{project.year}</span>
      </div>

      <h3 className="mt-4 text-[1.0625rem] leading-snug font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-soft">
        {primaryHref ? (
          <a href={primaryHref} target="_blank" rel="noreferrer noopener" className="outline-none">
            {/* Stretched hit area makes the whole card clickable without nesting links. */}
            <span className="absolute inset-0 z-10 rounded-2xl" />
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>

      <p className="mt-2.5 text-sm leading-[1.65] text-muted">{project.description}</p>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3.5">
          {storeLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} on ${link.label}`}
              className={storeChipStyles}
            >
              {link.label}
            </a>
          ))}

          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} source on GitHub`}
              className="relative z-20 grid size-7 place-items-center rounded-md text-subtle transition-colors duration-300 hover:text-foreground"
            >
              <Github className="size-3.5" aria-hidden />
            </a>
          ) : null}

          {/* Always present so the grid reads evenly; inert where there is no public link. */}
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${project.title}`}
              className="relative z-20 ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors duration-300 hover:text-accent-soft"
            >
              View project
              <ExternalLink
                className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          ) : (
            <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-subtle/55">
              Private
              <ExternalLink className="size-3.5" aria-hidden />
            </span>
          )}
        </div>
      </div>

      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent-soft to-transparent transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </SpotlightCard>
  );
}
