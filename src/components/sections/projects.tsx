"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { FolderOpen } from "lucide-react";

import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { projectFilters, projects } from "@/data/projects";
import { EASE_OUT, springSnappy, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

type Filter = ProjectCategory | "all";

export function Projects() {
  const [filter, setFilter] = React.useState<Filter>("all");

  const visibleProjects = React.useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-shell">
      <div className="container-page">
        <SectionHeading
          headingId="projects-heading"
          index="03"
          eyebrow="Selected work"
          title="Things I've built and shipped."
          description="A cross-section of web, mobile and automation work delivered for real users and real constraints."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <Reveal delay={0.1} className="mt-8 flex justify-center">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="glass flex flex-wrap justify-center gap-1 rounded-full p-1"
          >
            <LayoutGroup id="project-filters">
              {projectFilters.map((option) => {
                const isActive = filter === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFilter(option.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium whitespace-nowrap",
                      "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive ? "text-white" : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="project-filter-pill"
                        transition={springSnappy}
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-accent-deep shadow-[0_6px_18px_-8px_var(--accent)]"
                      />
                    ) : null}
                    <span className="relative">{option.label}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </Reveal>

        <motion.div
          layout
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="mt-9 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)", transition: { duration: 0.24 } }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: Math.min(index, 5) * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {visibleProjects.length === 0 ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="mt-12 flex flex-col items-center gap-2.5 text-center text-[0.8125rem] text-subtle"
            >
              <FolderOpen className="size-5" aria-hidden />
              Nothing in this category yet — check back soon.
            </motion.p>
          ) : null}
        </AnimatePresence>

        <div aria-live="polite" className="sr-only">
          Showing {visibleProjects.length} of {projects.length} projects.
        </div>
      </div>
    </section>
  );
}
