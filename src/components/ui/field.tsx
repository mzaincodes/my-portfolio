"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

const controlStyles = [
  "w-full rounded-xl border border-line bg-[color-mix(in_oklab,var(--surface)_60%,transparent)]",
  "px-3.5 text-[0.8125rem] text-foreground placeholder:text-subtle",
  "outline-none backdrop-blur-sm",
  "transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
  "hover:border-line-strong",
  "focus:border-accent-soft/70 focus:bg-[color-mix(in_oklab,var(--surface)_85%,transparent)]",
  "focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_14%,transparent)]",
  "aria-[invalid=true]:border-red-500/60 aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgb(239_68_68_/_0.14)]",
];

function Label({ className, ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-[0.625rem] font-medium tracking-wider text-muted uppercase transition-colors duration-300",
        className,
      )}
      {...props}
    />
  );
}

function Input({ className, ...props }: React.ComponentPropsWithRef<"input">) {
  return <input className={cn(controlStyles, "h-10", className)} {...props} />;
}

function Textarea({ className, ...props }: React.ComponentPropsWithRef<"textarea">) {
  return (
    <textarea
      className={cn(controlStyles, "min-h-28 resize-none py-2.5 leading-relaxed", className)}
      {...props}
    />
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {message ? (
        <motion.p
          key={message}
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className="flex items-center gap-1.5 overflow-hidden pt-1.5 text-xs text-red-400"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export { Label, Input, Textarea, FieldError };
