import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes with clsx and tailwind-merge
 *
 * @param inputs - Class names to be merged
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Utility function for RTL/LTR text direction handling
 *
 * @param isRtl - Whether the content is RTL
 * @returns Object with appropriate direction classes
 */
export function getDirectionClasses(isRtl: boolean = false) {
  return {
    textAlign: isRtl ? 'text-right' : 'text-left',
    floatStart: isRtl ? 'float-right' : 'float-left',
    floatEnd: isRtl ? 'float-left' : 'float-right',
    marginStart: isRtl ? 'mr-4' : 'ml-4',
    marginEnd: isRtl ? 'ml-4' : 'mr-4',
    paddingStart: isRtl ? 'pr-4' : 'pl-4',
    paddingEnd: isRtl ? 'pl-4' : 'pr-4',
  }
}

/**
 * Debounce utility function
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}