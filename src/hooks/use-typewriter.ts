"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Phase = "typing" | "holding" | "deleting";

type TypewriterOptions = {
  /** Milliseconds between characters while typing. */
  typeSpeed?: number;
  /** Milliseconds between characters while erasing. */
  deleteSpeed?: number;
  /** How long a completed phrase stays on screen. */
  holdTime?: number;
  /** Pause after erasing, before the next phrase starts. */
  switchDelay?: number;
};

/**
 * Types a phrase out one character at a time, holds it, erases it, then moves
 * to the next. Every state change is scheduled from a timer rather than run
 * synchronously in the effect body, so there are no cascading renders.
 *
 * Under reduced-motion the first phrase is returned in full, with no cycling.
 */
export function useTypewriter(phrases: readonly string[], options: TypewriterOptions = {}) {
  const { typeSpeed = 58, deleteSpeed = 26, holdTime = 1900, switchDelay = 320 } = options;

  const reduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (reduceMotion || phrases.length === 0) return;

    const current = phrases[phraseIndex % phrases.length] ?? "";
    let timer: number;

    if (phase === "typing") {
      timer =
        text.length < current.length
          ? window.setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
          : window.setTimeout(() => setPhase("holding"), holdTime);
    } else if (phase === "holding") {
      timer = window.setTimeout(() => setPhase("deleting"), 60);
    } else {
      timer =
        text.length > 0
          ? window.setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
          : window.setTimeout(() => {
              setPhraseIndex((index) => (index + 1) % phrases.length);
              setPhase("typing");
            }, switchDelay);
    }

    return () => window.clearTimeout(timer);
  }, [phrases, phraseIndex, phase, text, typeSpeed, deleteSpeed, holdTime, switchDelay, reduceMotion]);

  if (reduceMotion) {
    return { text: phrases[0] ?? "", isTyping: false };
  }

  return { text, isTyping: phase === "typing" };
}
