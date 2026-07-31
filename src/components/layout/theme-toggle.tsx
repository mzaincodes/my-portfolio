"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

/**
 * Theme switch with no hydration branch: both icons are always rendered and the
 * `.dark` class — applied to <html> by the next-themes script before React
 * hydrates — decides which one is visible. That keeps the server and client
 * markup identical while still cross-fading smoothly.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const iconBase =
    "absolute size-4 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={
        mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme` : "Toggle colour theme"
      }
      className={cn(
        "relative grid size-10 place-items-center rounded-full border border-line",
        "text-muted transition-[color,border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-0.5 hover:border-line-strong hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-accent-soft/70",
        className,
      )}
    >
      <span className="relative grid size-4 place-items-center">
        <Sun
          aria-hidden
          className={cn(iconBase, "rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-50 dark:opacity-0")}
        />
        <Moon
          aria-hidden
          className={cn(iconBase, "rotate-90 scale-50 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100")}
        />
      </span>
    </button>
  );
}
