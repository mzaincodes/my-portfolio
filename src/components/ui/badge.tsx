import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full border font-medium",
    "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "[&_svg]:size-2.5 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "border-line bg-[color-mix(in_oklab,var(--foreground)_5%,transparent)] text-muted",
        accent: "border-accent/30 bg-accent/10 text-accent-soft",
        cyan: "border-cyan/30 bg-cyan/10 text-cyan",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
        outline: "border-line-strong bg-transparent text-muted",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.625rem]",
        md: "px-2.5 py-0.5 text-[0.6875rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type BadgeProps = React.ComponentPropsWithoutRef<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
