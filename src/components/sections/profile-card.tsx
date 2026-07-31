"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ImagePlus } from "lucide-react";

import { siteConfig } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Registration marks framing the portrait — a precise, technical motif. */
const cornerMarks = [
  "-top-2.5 -left-2.5 border-t border-l",
  "-top-2.5 -right-2.5 border-t border-r",
  "-bottom-2.5 -left-2.5 border-b border-l",
  "-bottom-2.5 -right-2.5 border-b border-r",
] as const;

/**
 * Hero portrait. Renders `siteConfig.photo` when one is configured, and a
 * styled monogram placeholder until then, so the layout is identical either
 * way and adding a photo is a one-line change.
 */
export function ProfileCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.3 }}
      className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:mr-0 lg:ml-auto lg:max-w-[25rem]"
    >
      {/* Ambient halo */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl motion-safe:animate-spin-slow"
        style={{
          background: "conic-gradient(from 0deg, var(--glow-a), var(--glow-b), var(--glow-c), var(--glow-a))",
        }}
      />

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        className="relative"
      >
        {cornerMarks.map((position, index) => (
          <motion.span
            key={position}
            aria-hidden
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.9 + index * 0.07 }}
            className={cn("absolute size-4 border-accent-soft/50", position)}
          />
        ))}

        <div className="border-gradient relative rounded-2xl border border-line bg-card-translucent p-1.5 shadow-lifted backdrop-blur-xl">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-surface to-background-deep">
            {siteConfig.photo ? (
              <Image
                src={siteConfig.photo}
                alt={`Portrait of ${siteConfig.name}`}
                fill
                priority
                sizes="(max-width: 640px) 20rem, (max-width: 1024px) 22rem, 25rem"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
              />
            ) : (
              <PhotoPlaceholder />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Shown until `siteConfig.photo` is pointed at a real image. */
function PhotoPlaceholder() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(85% 65% at 50% 30%, color-mix(in oklab, var(--accent) 20%, transparent), transparent 72%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-deep text-lg font-semibold text-white shadow-[0_12px_30px_-12px_var(--accent)]">
          {siteConfig.initials}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-line bg-card-translucent px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.12em] text-subtle uppercase backdrop-blur-md">
          <ImagePlus className="size-2.5" aria-hidden />
          Add your photo
        </span>
      </div>
    </div>
  );
}
