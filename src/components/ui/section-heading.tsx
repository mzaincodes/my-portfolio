"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT, fadeUp, viewportOnce } from "@/lib/motion";

type SectionHeadingProps = {
  /** Two-digit index rendered in the eyebrow, e.g. "02". */
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Applied to the h2 so the parent section can reference it via aria-labelledby. */
  headingId?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  headingId,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className={cn("flex flex-col gap-3", centered ? "items-center text-center" : "items-start", className)}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-2.5">
        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-accent-soft tabular-nums">
          {index}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          className="h-px w-7 origin-left bg-gradient-to-r from-accent-soft to-transparent"
        />
        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-subtle uppercase">{eyebrow}</span>
      </motion.div>

      <motion.h2
        id={headingId}
        variants={fadeUp}
        className={cn(
          "max-w-2xl text-[1.375rem] leading-[1.2] font-semibold sm:text-[1.625rem] lg:text-[1.875rem]",
          centered && "mx-auto",
        )}
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "max-w-xl text-[0.8125rem] leading-relaxed text-muted sm:text-sm",
            centered && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
