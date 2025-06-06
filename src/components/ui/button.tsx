import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-black text-slate-50 hover:bg-black/85 dark:bg-xtraDarkAccent dark:text-white dark:hover:bg-xtraDarkAccent/70",
        destructive:
          "bg-destructive text-slate-50 hover:bg-destructive/70 dark:bg-red-700 dark:text-white dark:hover:bg-red-700/90",
        outline:
          "border border-slate-200 bg-transparent hover:bg-white/90 dark:bg-transparent hover:text-slate-900 dark:border-xtraDarkText  dark:hover:bg-xtraDarkText dark:hover:text-black",
        secondary:
          "bg-secondary text-foreground font-semibold hover:bg-secondary/70 dark:bg-xtraDarkSecondary dark:text-white dark:hover:bg-xtraDarkSecondary/90",
        ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-xtraDarkSecondary dark:hover:text-white",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
