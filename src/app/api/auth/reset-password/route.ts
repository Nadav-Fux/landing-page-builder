import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { rateLimit, strictAuthLimiter } from "@/lib/rateLimit"
import crypto from "crypto"
import bcrypt from "bcryptjs"

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, strictAuthLimiter)
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const validation = resetSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      )
    }

    const { email } = validation.data

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      await bcrypt.hash("dummy-password-for-timing", 10)
      return NextResponse.json(
        { success: true, message: "If an account with that email exists, a reset link has been sent" },
        { status: 200 }
      )
    }

    if (!user.password) {
      return NextResponse.json(
        { success: false, error: "This account uses OAuth login. Please sign in with your OAuth provider." },
        { status: 400 }
      )
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000)

    await prisma.$executeRaw`
      UPDATE User SET passwordResetToken = ${resetToken}, passwordResetExpiry = ${resetTokenExpiry}
      WHERE id = ${user.id}
    `

    console.log(`Password reset URL for ${email}: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`)
    console.log("TODO: Send this URL via email to the user")

    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a reset link has been sent",
    })
  } catch (error) {
    console.error("Password reset request error:", error)
    return NextResponse.json(
      { success: false, error: "An error occurred while processing your request" },
      { status: 500 }
    )
  }
}
