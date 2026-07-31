"use client";

import { ArrowUp } from "lucide-react";

import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { navItems, siteConfig, socialLinks } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="relative border-t border-line">
      <div className="container-page py-10">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xs">
              <a href="#home" className="group inline-flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-deep text-xs font-semibold text-white shadow-[0_5px_16px_-8px_var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
                  {siteConfig.initials}
                </span>
                <span className="text-[0.9375rem] font-semibold tracking-tight">{siteConfig.name}</span>
              </a>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{siteConfig.tagline}</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="underline-sweep mt-3 inline-block text-[0.8125rem] text-accent-soft"
              >
                {siteConfig.email}
              </a>
            </div>

            <div className="flex gap-12 sm:gap-16">
              <nav aria-label="Footer">
                <h2 className="font-mono text-[0.5625rem] tracking-[0.18em] text-subtle uppercase">
                  Navigate
                </h2>
                <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-1">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className="underline-sweep text-[0.8125rem] text-muted transition-colors duration-300 hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div>
                <h2 className="font-mono text-[0.5625rem] tracking-[0.18em] text-subtle uppercase">
                  Connect
                </h2>
                <ul className="mt-3 flex gap-2">
                  {socialLinks.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={social.label}
                        className="grid size-9 place-items-center rounded-lg border border-line text-muted transition-[color,border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent-soft/50 hover:bg-accent/10 hover:text-accent-soft"
                      >
                        <social.icon className="size-3.5" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-center text-[0.6875rem] text-subtle sm:text-left">
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-[0.6875rem] text-subtle">
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted transition-colors duration-300 hover:text-accent-soft"
              >
                Next.js
              </a>
              ,{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted transition-colors duration-300 hover:text-accent-soft"
              >
                Tailwind
              </a>{" "}
              &amp;{" "}
              <a
                href="https://www.framer.com/motion/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted transition-colors duration-300 hover:text-accent-soft"
              >
                Framer Motion
              </a>
            </p>

            <Magnetic strength={8}>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="group grid size-9 place-items-center rounded-full border border-line text-muted transition-[color,border-color,background-color] duration-300 hover:border-accent-soft/50 hover:bg-accent/10 hover:text-accent-soft"
              >
                <ArrowUp
                  className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
