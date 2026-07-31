"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navItems, siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { useScrollState } from "@/hooks/use-scroll-state";
import { EASE_OUT, springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

const sectionIds = navItems.map((item) => item.id) as readonly SectionId[];

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const scrolled = useScrollState(24);
  const activeSection = useActiveSection(sectionIds, "home");

  useLockBodyScroll(menuOpen);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3.5 sm:px-6"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-2.5 py-2",
            "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "glass border-line shadow-ambient"
              : "border-transparent bg-transparent shadow-none backdrop-blur-0",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-3 py-1.5 text-[0.8125rem] transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={springSnappy}
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)]"
                      />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle className="hidden size-9 sm:grid" />

            <Magnetic strength={7} className="hidden lg:inline-flex">
              <Button asChild size="sm">
                <a href="#contact">
                  Let&rsquo;s talk
                  <ArrowUpRight
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={cn(
                "grid size-9 place-items-center rounded-full border border-line text-foreground lg:hidden",
                "transition-colors duration-300 hover:border-line-strong",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  className="grid place-items-center"
                >
                  {menuOpen ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} activeSection={activeSection} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function Logo() {
  return (
    <a
      href="#home"
      className="group flex shrink-0 items-center gap-2 rounded-full py-0.5 pr-2.5 pl-0.5"
      aria-label={`${siteConfig.name} — back to top`}
    >
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-accent to-accent-deep text-xs font-semibold text-white shadow-[0_5px_16px_-8px_var(--accent)]">
        <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        <span className="relative">{siteConfig.initials}</span>
      </span>
      <span className="hidden text-[0.8125rem] font-semibold tracking-tight sm:block">
        {siteConfig.name}
      </span>
    </a>
  );
}

function MobileMenu({
  open,
  activeSection,
  onClose,
}: {
  open: boolean;
  activeSection: SectionId;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <motion.div
            className="absolute inset-0 bg-background-deep/88 backdrop-blur-2xl"
            onClick={onClose}
            aria-hidden
          />

          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative flex h-full flex-col justify-center px-7 pt-20 pb-10"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } } }}
              className="flex flex-col"
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
                      visible: { opacity: 1, x: 0, filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    <a
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className="group flex items-baseline gap-3.5 border-b border-line py-3"
                    >
                      <span className="font-mono text-[0.625rem] text-subtle tabular-nums">
                        0{index + 1}
                      </span>
                      <span
                        className={cn(
                          "text-xl font-semibold tracking-tight transition-colors duration-300",
                          isActive ? "text-gradient-accent" : "text-foreground group-hover:text-accent-soft",
                        )}
                      >
                        {item.label}
                      </span>
                      {isActive ? (
                        <span className="ml-auto size-1.5 self-center rounded-full bg-accent-soft" aria-hidden />
                      ) : null}
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.3 }}
              className="mt-8 flex items-center justify-between gap-4"
            >
              <a
                href={`mailto:${siteConfig.email}`}
                className="underline-sweep text-[0.8125rem] text-muted transition-colors hover:text-foreground"
              >
                {siteConfig.email}
              </a>
              <ThemeToggle className="size-9" />
            </motion.div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
