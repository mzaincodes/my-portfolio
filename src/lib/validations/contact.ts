import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(80, "That name is a little too long."),
  email: z.email("Enter a valid email address.").max(160, "That email is too long."),
  subject: z
    .string()
    .trim()
    .min(3, "Give your message a short subject.")
    .max(120, "Keep the subject under 120 characters."),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a bit more — at least 20 characters.")
    .max(2000, "Messages are capped at 2000 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactActionResult =
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof ContactFormValues, string>> };
