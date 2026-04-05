import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isRtl?: boolean
  error?: boolean
  helperText?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isRtl = false, error = false, helperText, startAdornment, endAdornment, ...props }, ref) => {
    const inputPadding = startAdornment
      ? (isRtl ? 'pe-10' : 'ps-10')
      : endAdornment
        ? (isRtl ? 'ps-10' : 'pe-10')
        : ''

    return (
      <div className="relative w-full">
        {startAdornment && (
          <div
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400",
              isRtl && "left-auto right-3"
            )}
          >
            {startAdornment}
          </div>
        )}

        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            error && "border-error-500 focus-visible:ring-error-500",
            isRtl && "text-right",
            inputPadding,
            className
          )}
          ref={ref}
          {...props}
        />

        {endAdornment && (
          <div
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400",
              isRtl && "right-auto left-3"
            )}
          >
            {endAdornment}
          </div>
        )}

        {helperText && (
          <p className={cn(
            "mt-1 text-xs",
            error
              ? "text-error-600 dark:text-error-400"
              : "text-neutral-500 dark:text-neutral-400"
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }