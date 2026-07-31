"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed atmospheric layer behind the whole page: drifting aurora blobs, a
 * masked grid, and a fine grain overlay. Pointer-inert and hidden from
 * assistive tech.
 */
export function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const blobShift = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const gridFade = useTransform(scrollYProgress, [0, 0.35], [1, 0.25]);

  return (
    <div aria-hidden className="noise-overlay pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_60%)]" />

      <motion.div style={{ y: blobShift }} className="absolute inset-0">
        <div
          className="absolute -top-40 left-[8%] size-[38rem] rounded-full blur-[120px] motion-safe:animate-aurora"
          style={{ background: "var(--glow-a)" }}
        />
        <div
          className="absolute top-[28%] right-[2%] size-[32rem] rounded-full blur-[130px] motion-safe:animate-aurora-slow"
          style={{ background: "var(--glow-b)" }}
        />
        <div
          className="absolute bottom-[6%] left-[26%] size-[30rem] rounded-full blur-[140px] motion-safe:animate-aurora"
          style={{ background: "var(--glow-c)", animationDelay: "-8s" }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: reduceMotion ? 0.5 : gridFade }}
        className="grid-mask absolute inset-x-0 top-0 h-[70vh]"
      />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background-deep to-transparent" />
    </div>
  );
}
