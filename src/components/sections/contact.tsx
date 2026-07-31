"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Copy, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { siteConfig, socialLinks } from "@/data/site";
import { EASE_OUT, slideInLeft, slideInRight } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-shell">
      <div className="container-page">
        <SectionHeading
          headingId="contact-heading"
          index="05"
          eyebrow="Contact"
          title="Have something worth building? Let's talk."
          description="Open to full stack engineering roles, automation work, and interesting product collaborations."
          align="center"
          className="mx-auto max-w-xl"
        />

        <div className="mt-9 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" variants={slideInLeft}>
            <div className="flex h-full flex-col gap-4">
              <SpotlightCard className="p-5 sm:p-6">
                <h3 className="font-mono text-[0.625rem] tracking-[0.18em] text-subtle uppercase">
                  Direct lines
                </h3>

                <div className="mt-4 flex flex-col gap-2.5">
                  <CopyableEmail />
                  <InfoRow icon={MapPin} label="Location" value={siteConfig.location} />
                  <InfoRow icon={Clock} label="Local time" value={`${siteConfig.timezone} · replies in 48h`} />
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-5 sm:p-6">
                <h3 className="font-mono text-[0.625rem] tracking-[0.18em] text-subtle uppercase">
                  Elsewhere
                </h3>

                <ul className="mt-3 flex flex-col">
                  {socialLinks.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group/link flex items-center gap-3 border-b border-line py-2.5 last:border-b-0"
                      >
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line text-muted transition-[color,border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-0.5 group-hover/link:border-accent-soft/50 group-hover/link:bg-accent/10 group-hover/link:text-accent-soft">
                          <social.icon className="size-3.5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.8125rem] font-medium text-foreground">
                            {social.label}
                          </span>
                          <span className="block truncate text-[0.6875rem] text-subtle">{social.handle}</span>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-3.5 shrink-0 text-subtle transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent-soft"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>

              <SpotlightCard className="flex items-center gap-3 p-5">
                <span className="relative grid size-3.5 shrink-0 place-items-center" aria-hidden>
                  <span className="absolute size-2 rounded-full bg-emerald-400 motion-safe:animate-pulse-ring" />
                  <span className="relative size-2 rounded-full bg-emerald-400" />
                </span>
                <p className="text-[0.8125rem] text-muted">
                  <span className="font-medium text-foreground">{siteConfig.availability}</span> — happy to talk
                  about roles or project work.
                </p>
              </SpotlightCard>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" variants={slideInRight} delay={0.06}>
            <SpotlightCard className="h-full p-5 sm:p-6">
              <h3 className="text-base font-semibold tracking-tight text-foreground">Send a message</h3>
              <p className="mt-1 text-[0.8125rem] text-muted">
                Fill this in and it lands straight in my inbox. No forms-to-nowhere.
              </p>

              <div className="mt-5">
                <ContactForm />
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-[color-mix(in_oklab,var(--foreground)_3%,transparent)] px-3.5 py-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line text-muted">
        <Icon className="size-3.5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.5625rem] tracking-wider text-subtle uppercase">{label}</span>
        <span className="mt-0.5 block truncate text-[0.8125rem] text-foreground">{value}</span>
      </span>
    </div>
  );
}

/** Email row with an inline copy affordance and transient confirmation. */
function CopyableEmail() {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <div className="group/email flex items-center gap-3 rounded-xl border border-line bg-[color-mix(in_oklab,var(--foreground)_3%,transparent)] px-3.5 py-2.5 transition-colors duration-300 hover:border-line-strong">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line text-accent-soft transition-colors duration-300 group-hover/email:border-accent-soft/50 group-hover/email:bg-accent/10">
        <Mail className="size-3.5" aria-hidden />
      </span>

      <a href={`mailto:${siteConfig.email}`} className="min-w-0 flex-1">
        <span className="block font-mono text-[0.5625rem] tracking-wider text-subtle uppercase">Email</span>
        <span className="underline-sweep mt-0.5 inline-block max-w-full truncate text-[0.8125rem] text-foreground">
          {siteConfig.email}
        </span>
      </a>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="relative grid size-7 shrink-0 place-items-center rounded-lg border border-line text-muted transition-[color,border-color,background-color] duration-300 hover:border-line-strong hover:text-foreground"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="absolute grid place-items-center"
          >
            {copied ? (
              <Check className="size-3 text-emerald-400" aria-hidden />
            ) : (
              <Copy className="size-3" aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
