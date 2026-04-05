import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600",
        secondary:
          "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
        destructive:
          "border-transparent bg-error-600 text-white hover:bg-error-700 dark:bg-error-500 dark:hover:bg-error-600",
        outline:
          "text-neutral-950 dark:text-neutral-50 border-neutral-200 dark:border-neutral-700",
        success:
          "border-transparent bg-success-600 text-white hover:bg-success-700 dark:bg-success-500 dark:hover:bg-success-600",
        warning:
          "border-transparent bg-warning-600 text-white hover:bg-warning-700 dark:bg-warning-500 dark:hover:bg-warning-600",
        info:
          "border-transparent bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
        gradient:
          "border-transparent bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.25 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      dir: {
        ltr: "",
        rtl: "flex-row-reverse",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      dir: "ltr",
    },
  }
)

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'dir'>,
    Omit<VariantProps<typeof badgeVariants>, 'dir'> {
  dir?: VariantProps<typeof badgeVariants>['dir']
  isRtl?: boolean
}

function Badge({ className, variant, size, dir, isRtl = false, ...props }: BadgeProps) {
  const direction = isRtl ? "rtl" : dir

  return (
    <div className={cn(badgeVariants({ variant, size, dir: direction }), className)} {...props} />
  )
}

export { Badge, badgeVariants }