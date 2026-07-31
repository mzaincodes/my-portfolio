"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Award, GraduationCap, Layers, LineChart, ShieldCheck, Sparkles, Workflow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { achievements, certifications, education } from "@/data/credentials";
import { siteConfig, stats } from "@/data/site";
import { useCountUp } from "@/hooks/use-count-up";
import { EASE_OUT, fadeUp, scaleIn, slideInRight } from "@/lib/motion";
import { formatCount } from "@/lib/utils";

const principles = [
  {
    icon: Workflow,
    title: "Automate the repetitive",
    body: "If a task happens twice, it belongs in a workflow. Most of my recent work is removing manual steps outright.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability by design",
    body: "Uptime is a constraint, not an outcome. Error handling and logging go in before a feature ships, not after.",
  },
  {
    icon: LineChart,
    title: "Move a number",
    body: "Every change should shift something measurable — query latency, match rate, or hours given back to a team.",
  },
  {
    icon: Layers,
    title: "Own the whole path",
    body: "Schema through deployment. I would rather understand the full stack than hand off at a boundary.",
  },
] as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-shell">
      <div className="container-page">
        <SectionHeading
          headingId="about-heading"
          index="01"
          eyebrow="About"
          title="Full stack engineering, with a bias toward automation."
          description="Three years shipping products end to end — and steadily moving the repetitive parts into workflows."
          className="max-w-2xl"
        />

        <div className="mt-9 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" variants={fadeUp}>
            <SpotlightCard className="h-full p-5 sm:p-6">
              <Badge variant="accent" className="mb-4">
                <Sparkles aria-hidden />
                The short version
              </Badge>

              <div className="space-y-3.5 text-[0.8125rem] leading-relaxed text-muted sm:text-sm">
                <p>
                  I&rsquo;m a software engineer based in {siteConfig.location}, currently at Ebryx building
                  Titan — a SOC alert analysis platform used by more than ten international MSSPs. My work
                  there spans full stack features in Next.js and Node.js, OpenSearch queries over 100k+
                  alerts a day, and workflow automation that has cut manual analyst effort by 70%.
                </p>
                <p>
                  Before that I spent two years at Tecsofiy delivering MERN products end to end — educational
                  platforms, multi-tenant marketplaces and cross-platform React Native apps — after starting
                  out building React front ends at 360 Synergy Tech.
                </p>
                <p>
                  Most of my energy now goes into automation: n8n workflows, Playwright and Puppeteer
                  scraping pipelines, and using AI tooling to take the repetitive parts out of engineering
                  work altogether.
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-deep text-xs font-semibold text-white">
                  {siteConfig.initials}
                </span>
                <div>
                  <p className="text-[0.8125rem] font-medium text-foreground">{siteConfig.name}</p>
                  <p className="font-mono text-[0.625rem] tracking-wider text-subtle uppercase">
                    {siteConfig.role} · {siteConfig.timezone}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <Reveal variants={slideInRight}>
              <SpotlightCard className="p-5 sm:p-6">
                <h3 className="font-mono text-[0.625rem] tracking-[0.18em] text-subtle uppercase">
                  By the numbers
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5">
                  {stats.map((stat, index) => (
                    <StatItem key={stat.label} {...stat} delay={index * 0.07} />
                  ))}
                </dl>
              </SpotlightCard>
            </Reveal>

            <Reveal variants={slideInRight} delay={0.08}>
              <SpotlightCard className="p-5 sm:p-6">
                <h3 className="font-mono text-[0.625rem] tracking-[0.18em] text-subtle uppercase">
                  Education &amp; certifications
                </h3>

                <div className="mt-4 flex items-start gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-accent-soft">
                    <GraduationCap className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.8125rem] font-medium text-foreground">{education.degree}</p>
                    <p className="mt-0.5 text-xs text-subtle">{education.institution}</p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 border-t border-line pt-4">
                  {certifications.map((credential) => (
                    <li
                      key={credential.title}
                      className="group flex items-baseline gap-2 text-[0.8125rem] text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-1 size-1 shrink-0 rounded-full bg-accent-soft transition-transform duration-300 group-hover:scale-150"
                      />
                      <span className="min-w-0 flex-1 transition-colors duration-300 group-hover:text-foreground">
                        {credential.title}
                        <span className="text-subtle"> · {credential.issuer}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[0.625rem] text-subtle tabular-nums">
                        {credential.year}
                      </span>
                    </li>
                  ))}
                </ul>

                {achievements.map((achievement) => (
                  <p
                    key={achievement}
                    className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-[0.8125rem] text-muted"
                  >
                    <Award className="size-3.5 shrink-0 text-accent-soft" aria-hidden />
                    {achievement}
                  </p>
                ))}
              </SpotlightCard>
            </Reveal>
          </div>
        </div>

        <Stagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {principles.map((principle) => (
            <StaggerItem key={principle.title} variants={scaleIn}>
              <SpotlightCard tilt tiltStrength={3} className="h-full p-5" spotlightSize={220}>
                <span className="grid size-8 place-items-center rounded-lg border border-line bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-accent-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-105">
                  <principle.icon className="size-4" aria-hidden />
                </span>
                <h3 className="mt-3.5 text-[0.8125rem] font-semibold tracking-tight text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{principle.body}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function StatItem({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  const animated = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
    >
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-2xl font-semibold tracking-tight text-foreground tabular-nums">
          {formatCount(animated)}
          <span className="text-accent-soft">{suffix}</span>
        </span>
        <span className="mt-1 block text-[0.6875rem] leading-snug text-subtle">{label}</span>
      </dd>
    </motion.div>
  );
}
