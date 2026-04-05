/**
 * Auth Helper Functions
 * 
 * This file re-exports NextAuth functions for convenience.
 * All Supabase auth dependencies have been removed.
 * 
 * For authentication, use these imports:
 * - Client-side: import { signIn, signOut, useSession } from "next-auth/react"
 * - Server-side: import { getServerSession } from "next-auth/next"; import { authOptions } from "@/lib/nextauth"
 */

export { signIn, signOut, useSession } from "next-auth/react"
export { getServerSession } from "next-auth/next"
export { authOptions } from "./nextauth"

// Re-export for compatibility with any code that might import from here
import { getServerSession } from "next-auth/next"
import { authOptions } from "./nextauth"

/**
 * Get the current user session on the server side
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user ?? null
}

/**
 * Check if user is authenticated on the server side
 */
export async function isAuthenticated() {
  const session = await getServerSession(authOptions)
  return !!session?.user
}