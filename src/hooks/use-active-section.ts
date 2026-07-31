"use client";

import { useEffect, useState } from "react";

import type { SectionId } from "@/types";

/**
 * Tracks which section currently owns the viewport. Uses a top-weighted
 * rootMargin so a section becomes "active" once it reaches the reading area
 * rather than the moment it appears at the bottom edge.
 */
export function useActiveSection(sectionIds: readonly SectionId[], fallback: SectionId): SectionId {
  const [activeId, setActiveId] = useState<SectionId>(fallback);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId: string | null = null;
        let bestRatio = 0;

        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveId(bestId as SectionId);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.9],
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
