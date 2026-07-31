"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Building2, Check } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { experience } from "@/data/experience";
import { EASE_OUT, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ExperienceItem } from "@/types";

export function Experience() {
  const timelineRef = React.useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScale = useSpring(rawScale, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-shell">
      <div className="container-page">
        <SectionHeading
          headingId="experience-heading"
          index="04"
          eyebrow="Experience"
          title="Three years, three teams, one direction."
          description="Each role has moved me further up the stack — from React front ends to full stack security tooling."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <ol ref={timelineRef} className="relative mt-12">
          {/* Rail: left-aligned on small screens, centred from lg up. */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-[7px] w-px bg-line lg:left-1/2 lg:-translate-x-1/2"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute inset-y-0 left-[7px] w-px origin-top bg-gradient-to-b from-accent via-accent-soft to-cyan lg:left-1/2 lg:-translate-x-1/2"
          />

          {experience.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} alignRight={index % 2 === 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  alignRight,
}: {
  item: ExperienceItem;
  index: number;
  alignRight: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className={cn(
        "relative pb-4 pl-7 last:pb-0 lg:pl-0",
        // Nest each card up into the gap left by the one on the opposite side.
        index > 0 && "lg:-mt-16",
      )}
    >
      {/* Node on the rail */}
      <span className="absolute top-5 left-0 grid size-4 place-items-center lg:left-1/2 lg:-translate-x-1/2">
        {item.current ? (
          <span aria-hidden className="absolute size-2 rounded-full bg-accent-soft motion-safe:animate-pulse-ring" />
        ) : null}
        <span
          aria-hidden
          className={cn(
            "relative size-2 rounded-full ring-4 ring-background transition-colors duration-500",
            item.current ? "bg-accent shadow-[0_0_10px_var(--accent)]" : "bg-line-strong",
          )}
        />
      </span>

      <div className={cn("lg:w-[calc(50%-1.75rem)]", alignRight ? "lg:ml-auto" : "lg:mr-auto")}>
        <SpotlightCard className="p-5" spotlightSize={320}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[0.9375rem] leading-snug font-semibold tracking-tight text-foreground">
                {item.role}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-accent-soft">
                <Building2 className="size-3 shrink-0" aria-hidden />
                <span className="truncate">{item.company}</span>
              </p>
            </div>

            {item.current ? (
              <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[0.5625rem] font-medium tracking-wide text-emerald-400 uppercase">
                Current
              </span>
            ) : null}
          </div>

          <p className="mt-2.5 font-mono text-[0.625rem] tracking-wide text-subtle uppercase">
            {item.period} · {item.location}
          </p>

          <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{item.summary}</p>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            className="mt-3.5 space-y-2"
          >
            {item.achievements.slice(0, 3).map((achievement) => (
              <motion.li
                key={achievement}
                variants={{ hidden: { opacity: 0, x: -6 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="group/item flex gap-2 text-[0.8125rem] leading-relaxed text-muted"
              >
                <span
                  aria-hidden
                  className="mt-1 grid size-3.5 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent-soft transition-transform duration-300 group-hover/item:scale-110"
                >
                  <Check className="size-2" strokeWidth={3.5} />
                </span>
                <span className="transition-colors duration-300 group-hover/item:text-foreground">
                  {achievement}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <ul className="mt-4 flex flex-wrap gap-1 border-t border-line pt-3.5" aria-label="Technologies used">
            {item.stack.map((tech) => (
              <li key={tech}>
                <span className="inline-flex rounded border border-line bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] px-1.5 py-0.5 font-mono text-[0.5625rem] text-subtle transition-colors duration-300 hover:border-line-strong hover:text-foreground">
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </div>
    </motion.li>
  );
}
