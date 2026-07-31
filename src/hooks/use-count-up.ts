"use client";

import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";

/**
 * Eases a number from zero to its target once `active` flips true.
 * Under reduced-motion the value is derived rather than animated, so the
 * final figure is shown immediately with no intermediate renders.
 */
export function useCountUp(target: number, active: boolean, duration = 1.6) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduceMotion) return;

    const controls = animate(0, target, {
      duration,
      ease: EASE_OUT,
      onUpdate: setValue,
    });

    return () => controls.stop();
  }, [active, target, duration, reduceMotion]);

  if (reduceMotion) {
    return active ? target : 0;
  }

  return value;
}
