"use client";

import { motion } from "framer-motion";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { skillCategories } from "@/data/skills";
import { EASE_OUT, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Skill, SkillCategory, SkillLevel } from "@/types";

const levelLabel: Record<SkillLevel, string> = {
  core: "Daily driver",
  strong: "Strong working knowledge",
  working: "Comfortable",
};

const levelDots: Record<SkillLevel, number> = {
  core: 3,
  strong: 2,
  working: 1,
};

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-shell">
      <div className="container-page">
        <SectionHeading
          headingId="skills-heading"
          index="02"
          eyebrow="Skills"
          title="The stack I actually build with."
          description="Six areas I work across day to day. The dots signal depth — three means it is something I use most weeks."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <Stagger className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {skillCategories.map((category) => (
            <StaggerItem key={category.id} variants={fadeUp}>
              <CategoryCard category={category} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-7" delay={0.08}>
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center font-mono text-[0.5625rem] tracking-wider text-subtle uppercase">
            {(Object.keys(levelDots) as SkillLevel[]).map((level) => (
              <span key={level} className="flex items-center gap-1.5">
                <LevelDots level={level} />
                {levelLabel[level]}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: SkillCategory }) {
  const [from, to] = category.gradient;

  return (
    <SpotlightCard className="h-full p-5" spotlightSize={240}>
      {/* Category accent rail */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="absolute inset-x-0 top-0 h-px origin-left"
        style={{ background: `linear-gradient(90deg, ${from}, ${to}, transparent)` }}
      />

      <div className="flex items-start gap-3">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-xl border border-line transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-105"
          style={{ background: `linear-gradient(140deg, ${from}22, ${to}12)`, color: from }}
        >
          <category.icon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <h3 className="text-[0.9375rem] font-semibold tracking-tight text-foreground">
            {category.title}
          </h3>
          <p className="mt-0.5 text-xs text-subtle">{category.caption}</p>
        </div>
        <span className="ml-auto font-mono text-[0.625rem] text-subtle tabular-nums">
          {String(category.skills.length).padStart(2, "0")}
        </span>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
        className="mt-4 flex flex-wrap gap-1.5"
      >
        {category.skills.map((skill) => (
          <SkillChip key={skill.name} skill={skill} accent={from} />
        ))}
      </motion.ul>
    </SpotlightCard>
  );
}

function SkillChip({ skill, accent }: { skill: Skill; accent: string }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 5 },
        visible: { opacity: 1, scale: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      <span
        title={levelLabel[skill.level]}
        className={cn(
          "group/chip relative flex cursor-default items-center gap-1.5 overflow-hidden rounded-full border border-line",
          "bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] py-1 pr-2 pl-2.5",
          "text-[0.6875rem] text-muted",
          "transition-[transform,color,border-color,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:-translate-y-0.5 hover:border-line-strong hover:text-foreground",
        )}
      >
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100"
          style={{ background: `linear-gradient(120deg, ${accent}1f, transparent 70%)` }}
        />
        <span className="relative">{skill.name}</span>
        <span className="relative flex gap-[2px]" aria-hidden>
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="size-[3px] rounded-full transition-colors duration-300"
              style={{
                backgroundColor: dot < levelDots[skill.level] ? accent : "var(--line-strong)",
              }}
            />
          ))}
        </span>
        <span className="sr-only">— {levelLabel[skill.level]}</span>
      </span>
    </motion.li>
  );
}

function LevelDots({ level }: { level: SkillLevel }) {
  return (
    <span className="flex gap-[2px]" aria-hidden>
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className={cn("size-[3px] rounded-full", dot < levelDots[level] ? "bg-accent-soft" : "bg-line-strong")}
        />
      ))}
    </span>
  );
}
