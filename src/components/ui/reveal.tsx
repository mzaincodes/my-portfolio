"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/** Reduced-motion stand-in: a plain opacity fade with no transform or blur. */
const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  variants?: Variants;
};

/** Scroll-triggered reveal. Falls back to a plain fade when motion is reduced. */
export function Reveal({ children, className, delay = 0, variants = fadeUp }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={reduceMotion ? reducedVariants : variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

/** Parent wrapper that cascades `StaggerItem` children into view. */
export function Stagger({ children, className, stagger = 0.08, delayChildren = 0 }: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/** Child of `Stagger` — inherits the parent's orchestration. */
export function StaggerItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div className={cn(className)} variants={reduceMotion ? reducedVariants : variants}>
      {children}
    </motion.div>
  );
}
