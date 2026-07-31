"use server";

import { contactSchema, type ContactActionResult, type ContactFormValues } from "@/lib/validations/contact";

/**
 * Handles a contact submission. Validation runs again on the server so the
 * endpoint stays trustworthy even if the client bundle is bypassed.
 *
 * Delivery is pluggable: set CONTACT_WEBHOOK_URL to forward submissions to an
 * email service, CRM, or automation endpoint. Without it the submission is
 * accepted and recorded in the server log.
 */
export async function submitContactForm(values: ContactFormValues): Promise<ContactActionResult> {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};

    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof ContactFormValues] = issue.message;
      }
    }

    return {
      status: "error",
      message: "Some fields need another look.",
      fieldErrors,
    };
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info("[contact] submission received", {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      receivedAt: new Date().toISOString(),
    });

    return {
      status: "success",
      message: "Message received. I'll get back to you within a day or two.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, receivedAt: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    return {
      status: "success",
      message: "Message received. I'll get back to you within a day or two.",
    };
  } catch (error) {
    console.error("[contact] delivery failed", error);

    return {
      status: "error",
      message: "Something went wrong on my end. Please email me directly instead.",
    };
  }
}
