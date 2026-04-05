import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
import { RateLimiterMemory } from "rate-limiter-flexible"

const credentialsSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const loginLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
})

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV === "production" ? (() => { throw new Error("NEXTAUTH_SECRET is required in production") })() : "dev-secret"),
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentialsSchema.parse(credentials)

          const forwardedFor = (credentials as any).headers?.["x-forwarded-for"]
          const realIp = (credentials as any).headers?.["x-real-ip"]
          const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown"

          try {
            await loginLimiter.consume(ip)
          } catch {
            return null
          }

          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (!user || !user.password) {
            return null
          }

          const isValid = await bcrypt.compare(password, user.password)
          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
      }

      if (trigger === "update" && session) {
        token.name = session.user.name
        token.email = session.user.email
        token.image = session.user.image
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async signIn({ user, account }) {
      // Allow OAuth sign-ins
      if (account?.provider !== "credentials") {
        return true
      }
      // Allow credentials sign-ins (already validated in authorize)
      return !!user
    },
  },
}

// Auth config for middleware (without adapter for edge compatibility)
export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnEditor = nextUrl.pathname.startsWith("/editor")

      if (isOnDashboard || isOnEditor) {
        if (isLoggedIn) return true
        return false
      }

      if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return true
    },
  },
}