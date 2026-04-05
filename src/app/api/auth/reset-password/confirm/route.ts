import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { rateLimit, strictAuthLimiter } from "@/lib/rateLimit"

const confirmResetSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, strictAuthLimiter)
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()
    const validation = confirmResetSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      )
    }

    const { token, password } = validation.data

    const users = await prisma.$queryRaw`
      SELECT id FROM User WHERE passwordResetToken = ${token} AND passwordResetExpiry > ${new Date()}
    ` as any[]

    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

    const userId = users[0].id
    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.$executeRaw`
      UPDATE User SET password = ${hashedPassword}, passwordResetToken = NULL, passwordResetExpiry = NULL
      WHERE id = ${userId}
    `

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    console.error("Password reset confirm error:", error)
    return NextResponse.json(
      { success: false, error: "An error occurred while resetting your password" },
      { status: 500 }
    )
  }
}
