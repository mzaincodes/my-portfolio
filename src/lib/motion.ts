import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language for the whole site. Every surface pulls its easing and
 * timing from here so that transitions feel like one continuous system.
 */

type Bezier = [number, number, number, number];

export const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

export const transitionBase: Transition = {
  duration: 0.7,
  ease: EASE_OUT,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionBase,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: transitionBase },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: transitionBase },
};

/** Parent container that staggers its children on reveal. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Viewport config used by every scroll-triggered reveal. */
export const viewportOnce = { once: true, margin: "-96px 0px -96px 0px" } as const;
