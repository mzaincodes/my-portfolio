import type { Credential } from "@/types";

export const education = {
  degree: "BSc Computer Science",
  institution: "COMSATS University Lahore",
} as const;

export const certifications: readonly Credential[] = [
  { title: "Supervised Machine Learning", issuer: "Stanford Online", year: "2024" },
  { title: "Introduction to Networks", issuer: "Cisco", year: "2024" },
  { title: "Web Frontend", issuer: "Meta", year: "2023" },
] as const;

export const achievements: readonly string[] = ["2nd position, University Final Year Project"] as const;
