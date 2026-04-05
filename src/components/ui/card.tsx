import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isRtl?: boolean
    variant?: "default" | "outlined" | "elevated" | "glass"
  }
>(({ className, isRtl = false, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm",
    outlined: "bg-transparent border-2 border-neutral-300 dark:border-neutral-600",
    elevated: "bg-white dark:bg-neutral-800 border-0 shadow-medium hover:shadow-hard transition-shadow duration-300",
    glass: "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl transition-all duration-200",
        variantStyles[variant],
        isRtl && "text-right",
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isRtl?: boolean
  }
>(({ className, isRtl = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", isRtl && "items-start text-right", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    isRtl?: boolean
  }
>(({ className, isRtl = false, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      isRtl && "text-right",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    isRtl?: boolean
  }
>(({ className, isRtl = false, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-neutral-600 dark:text-neutral-400",
      isRtl && "text-right",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isRtl?: boolean
  }
>(({ className, isRtl = false, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", isRtl && "text-right", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isRtl?: boolean
  }
>(({ className, isRtl = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      isRtl && "flex-row-reverse justify-start",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }