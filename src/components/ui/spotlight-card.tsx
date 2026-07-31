"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

type DivProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "style" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
>;

type SpotlightCardProps = DivProps & {
  children: React.ReactNode;
  /** Adds a subtle 3D tilt that follows the pointer. */
  tilt?: boolean;
  /** Maximum tilt rotation in degrees. */
  tiltStrength?: number;
  /** Radius of the pointer-following highlight, in pixels. */
  spotlightSize?: number;
};

/**
 * The core card surface: a glass panel with a pointer-tracked highlight, a
 * gradient hairline that fades in on hover, and an optional parallax tilt.
 */
export function SpotlightCard({
  children,
  className,
  tilt = false,
  tiltStrength = 5,
  spotlightSize = 360,
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(-9999);
  const pointerY = useMotionValue(-9999);

  const glowTarget = useMotionValue(0);
  const glowOpacity = useSpring(glowTarget, { stiffness: 180, damping: 28 });

  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, springSoft);
  const rotateY = useSpring(rotateYTarget, springSoft);

  const spotlight = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${pointerX}px ${pointerY}px, color-mix(in oklab, var(--accent-soft) 15%, transparent), transparent 70%)`;

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    pointerX.set(localX);
    pointerY.set(localY);
    glowTarget.set(1);

    if (tilt && !reduceMotion && event.pointerType === "mouse") {
      rotateYTarget.set(((localX - rect.width / 2) / (rect.width / 2)) * tiltStrength);
      rotateXTarget.set((-(localY - rect.height / 2) / (rect.height / 2)) * tiltStrength);
    }
  };

  const handleLeave = () => {
    glowTarget.set(0);
    rotateXTarget.set(0);
    rotateYTarget.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={tilt && !reduceMotion ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      className={cn(
        "group border-gradient relative isolate overflow-hidden rounded-3xl",
        "border border-line bg-card-translucent backdrop-blur-xl",
        "shadow-ambient transition-[box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-line-strong hover:shadow-lifted",
        className,
      )}
      {...props}
    >
      <motion.span
        aria-hidden
        style={{ backgroundImage: spotlight, opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 -z-10"
      />
      {children}
    </motion.div>
  );
}
