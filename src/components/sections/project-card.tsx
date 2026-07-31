"use client";

import { ArrowUpRight, Github } from "lucide-react";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory, ProjectStatus } from "@/types";

const categoryLabel: Record<ProjectCategory, string> = {
  web: "Web",
  mobile: "Mobile",
  ai: "AI Automation",
};

const statusMeta: Record<ProjectStatus, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-emerald-400" },
  "in-development": { label: "In development", dot: "bg-amber-400" },
  archived: { label: "Archived", dot: "bg-subtle" },
};

export function ProjectCard({ project }: { project: Project }) {
  const status = statusMeta[project.status];
  const primaryHref = project.links.demo ?? project.links.github;
  const hasLinks = Boolean(primaryHref);

  return (
    <SpotlightCard tilt tiltStrength={2.5} spotlightSize={280} className="flex h-full flex-col p-5">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[0.5625rem] tracking-[0.16em] text-accent-soft uppercase">
          {categoryLabel[project.category]}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className={cn("size-1.5 rounded-full", status.dot)} aria-hidden />
          <span className="font-mono text-[0.5625rem] tracking-wide text-subtle uppercase">
            {status.label}
          </span>
        </span>
      </div>

      <h3 className="mt-3.5 text-base font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-soft">
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

      <p className="mt-2 line-clamp-3 text-[0.8125rem] leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-auto flex items-center gap-3 pt-5">
        <span className="font-mono text-[0.625rem] text-subtle tabular-nums">{project.year}</span>

        {/* Link affordances only appear when there is somewhere to go. */}
        {hasLinks ? (
          <div className="relative z-20 ml-auto flex items-center gap-1">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} source on GitHub`}
                className="grid size-7 place-items-center rounded-lg border border-transparent text-subtle transition-[color,border-color,background-color] duration-300 hover:border-line hover:bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] hover:text-foreground"
              >
                <Github className="size-3.5" aria-hidden />
              </a>
            ) : null}

            <span
              aria-hidden
              className="grid size-7 place-items-center rounded-lg text-subtle transition-[transform,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-soft"
            >
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        ) : null}
      </div>

      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent-soft to-transparent transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </SpotlightCard>
  );
}
