"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Loader2, RotateCcw, Send } from "lucide-react";
import { useForm, useWatch, type Control } from "react-hook-form";

import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/field";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { EASE_OUT } from "@/lib/motion";

const MESSAGE_LIMIT = 2000;

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const result = await submitContactForm(values);

    if (result.status === "error") {
      if (result.fieldErrors) {
        for (const [field, message] of Object.entries(result.fieldErrors)) {
          if (message) {
            setError(field as keyof ContactFormValues, { type: "server", message });
          }
        }
      }
      setFormError(result.message);
      return;
    }

    reset();
    setSubmitted(true);
  });

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="flex min-h-[22rem] flex-col items-center justify-center gap-6 py-10 text-center"
            role="status"
          >
            <SuccessMark />
            <div className="space-y-2">
              <h3 className="text-base font-semibold tracking-tight text-foreground">Message sent</h3>
              <p className="mx-auto max-w-xs text-[0.8125rem] leading-relaxed text-muted">
                Thanks for reaching out — I read everything myself and usually reply within a day or two.
              </p>
            </div>
            <Button type="button" variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
              <RotateCcw aria-hidden />
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  {...register("name")}
                />
                <FieldError id="contact-name-error" message={errors.name?.message} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="ada@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  {...register("email")}
                />
                <FieldError id="contact-email-error" message={errors.email?.message} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-subject">Subject</Label>
              <Input
                id="contact-subject"
                placeholder="Contract work, a role, or just saying hello"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                {...register("subject")}
              />
              <FieldError id="contact-subject-error" message={errors.subject?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-4">
                <Label htmlFor="contact-message">Message</Label>
                <MessageCounter control={control} />
              </div>
              <Textarea
                id="contact-message"
                maxLength={MESSAGE_LIMIT}
                placeholder="A sentence or two about what you're building and where I could help."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                {...register("message")}
              />
              <FieldError id="contact-message-error" message={errors.message?.message} />
            </div>

            <AnimatePresence>
              {formError ? (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  role="alert"
                  className="flex items-center gap-2 overflow-hidden rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-400"
                >
                  <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
                  {formError}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <Button type="submit" disabled={isSubmitting} className="mt-1 w-full sm:w-auto sm:self-start">
              <AnimatePresence mode="wait" initial={false}>
                {isSubmitting ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Sending
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    className="flex items-center gap-2"
                  >
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                    Send message
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Isolated so that typing a message re-renders only the counter rather than
 * every field in the form.
 */
function MessageCounter({ control }: { control: Control<ContactFormValues> }) {
  const message = useWatch({ control, name: "message" });

  return (
    <span className="font-mono text-[0.6875rem] text-subtle tabular-nums" aria-hidden>
      {message?.length ?? 0}/{MESSAGE_LIMIT}
    </span>
  );
}

/** Animated tick: the ring sweeps closed, then the check draws itself. */
function SuccessMark() {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className="size-12"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        stroke="var(--accent-soft)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        style={{ rotate: -90, transformOrigin: "center" }}
      />
      <motion.path
        d="M20 33.5 L28.5 42 L44 24"
        stroke="var(--accent-soft)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.5 }}
      />
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        fill="var(--accent)"
        initial={{ scale: 0, opacity: 0.25 }}
        animate={{ scale: 1.25, opacity: 0 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.45 }}
        style={{ transformOrigin: "center" }}
      />
    </motion.svg>
  );
}
