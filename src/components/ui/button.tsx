import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full",
    "font-medium tracking-tight outline-none select-none",
    "transition-[transform,background-color,border-color,color,box-shadow,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:ring-2 focus-visible:ring-accent-soft/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-55",
    "active:scale-[0.97]",
    "[&_svg]:size-3.5 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-accent to-accent-deep text-white",
          "shadow-[0_6px_20px_-8px_var(--accent)] hover:shadow-[0_10px_28px_-8px_var(--accent)]",
          "hover:-translate-y-0.5",
        ],
        secondary: [
          "glass text-foreground",
          "hover:border-line-strong hover:bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)]",
          "hover:-translate-y-0.5",
        ],
        outline: [
          "border border-line bg-transparent text-foreground",
          "hover:border-accent-soft/60 hover:text-accent-soft",
        ],
        ghost: [
          "bg-transparent text-muted",
          "hover:bg-[color-mix(in_oklab,var(--foreground)_6%,transparent)] hover:text-foreground",
        ],
        link: ["text-accent-soft underline-offset-4 hover:underline rounded-md"],
      },
      size: {
        sm: "h-8 px-3.5 text-xs",
        md: "h-9.5 px-4 text-[0.8125rem]",
        lg: "h-11 px-5 text-sm",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
