import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-svh flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-accent-soft uppercase">Error 404</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">This page took a wrong turn.</h1>
      <p className="max-w-md text-base leading-relaxed text-muted">
        The link is broken or the page has moved. Everything worth seeing lives on the home page.
      </p>
      <Button asChild size="lg" className="mt-2">
        <Link href="/">
          <ArrowLeft aria-hidden />
          Back to portfolio
        </Link>
      </Button>
    </section>
  );
}
