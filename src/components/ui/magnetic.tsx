"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  /** How far the element may drift toward the cursor, in pixels. */
  strength?: number;
};

/**
 * Pulls its child gently toward the pointer while hovered, then springs home.
 * Disabled entirely on coarse pointers and under reduced-motion.
 */
export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springSoft);
  const springY = useSpring(y, springSoft);

  const handleMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || event.pointerType !== "mouse") return;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);

      x.set((offsetX / (rect.width / 2)) * strength);
      y.set((offsetY / (rect.height / 2)) * strength);
    },
    [reduceMotion, strength, x, y],
  );

  const reset = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
