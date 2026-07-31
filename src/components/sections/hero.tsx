"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";

import { ProfileCard } from "@/components/sections/profile-card";
import { Button } from "@/components/ui/button";
import { siteConfig, socialLinks, typewriterPhrases } from "@/data/site";
import { useTypewriter } from "@/hooks/use-typewriter";
import { EASE_OUT } from "@/lib/motion";

/** Name split so the surname can carry the accent without breaking mid-word. */
const [firstName = siteConfig.name, ...surnameParts] = siteConfig.name.split(" ");
const surname = surnameParts.join(" ");

/** Staggered entrance shared by every block in the left column. */
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
});

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh w-full items-center overflow-hidden"
    >
      <div className="container-page w-full pt-28 pb-24 sm:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start lg:col-span-7">
            <motion.p
              {...enter(0.08)}
              className="flex items-center gap-2.5 font-mono text-[0.625rem] tracking-[0.14em] text-subtle uppercase"
            >
              <span className="relative grid size-2 place-items-center" aria-hidden>
                <span className="absolute size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse-ring" />
                <span className="relative size-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-emerald-400">{siteConfig.availability}</span>
              <span className="h-2.5 w-px bg-line-strong" aria-hidden />
              <span>{siteConfig.location}</span>
            </motion.p>

            <motion.h1
              id="hero-heading"
              {...enter(0.18)}
              className="mt-6 text-[clamp(2.25rem,4.8vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.035em]"
            >
              <span className="text-foreground">{firstName}</span>{" "}
              <span className="text-gradient-accent">{surname}</span>
            </motion.h1>

            <Typewriter />

            <motion.p {...enter(0.4)} className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {siteConfig.intro}
            </motion.p>

            <motion.div {...enter(0.5)} className="mt-8 flex flex-wrap items-center gap-2.5">
              <Button asChild size="lg">
                <a href="#projects">
                  View my work
                  <ArrowUpRight
                    className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </Button>

              <Button asChild size="lg" variant="secondary">
                <a href={siteConfig.resumeUrl} download>
                  <FileText aria-hidden />
                  Download CV
                </a>
              </Button>

              <span className="mx-1.5 hidden h-5 w-px bg-line-strong sm:block" aria-hidden />

              <ul className="flex items-center gap-1.5">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="grid size-10 place-items-center rounded-full border border-line text-muted transition-[color,border-color,transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent-soft/50 hover:bg-accent/10 hover:text-accent-soft"
                    >
                      <social.icon className="size-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <ProfileCard />
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to the about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.1 }}
        className="group absolute bottom-8 left-1/2 grid size-9 -translate-x-1/2 place-items-center rounded-full border border-line text-subtle transition-colors duration-300 hover:border-accent-soft/60 hover:text-accent-soft"
      >
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          className="grid place-items-center"
        >
          <ArrowDown className="size-3.5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}

/**
 * Typed in monospace on purpose: every glyph is the same width, so the line
 * never reflows as characters are added or removed.
 */
function Typewriter() {
  const { text } = useTypewriter(typewriterPhrases);

  return (
    <motion.div
      {...enter(0.3)}
      className="mt-5 flex min-h-7 w-full items-center gap-2.5 font-mono text-sm sm:text-[0.9375rem]"
    >
      <span className="shrink-0 text-accent-soft select-none" aria-hidden>
        $
      </span>
      <p className="min-w-0 text-foreground/90">
        {/* The full list is exposed to assistive tech; the animation is decorative. */}
        <span className="sr-only">{typewriterPhrases.join(" ")}</span>
        <span aria-hidden>{text}</span>
        <span
          aria-hidden
          className="ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[0.18em] bg-accent-soft motion-safe:animate-caret"
        />
      </p>
    </motion.div>
  );
}
