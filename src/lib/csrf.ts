import { NextRequest, NextResponse } from "next/server"

export function validateCsrf(request: NextRequest): boolean {
    const origin = request.headers.get("origin")
    const referer = request.headers.get("referer")

    if (!origin && !referer) return true

    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    ]

    if (origin && allowedOrigins.some((allowed) => origin === allowed || origin.startsWith(allowed + "/"))) return true

    if (referer) {
        const refererOrigin = referer.split("/").slice(0, 3).join("/")
        if (allowedOrigins.some((allowed) => refererOrigin === allowed || refererOrigin.startsWith(allowed + "/"))) return true
    }

    return false
}

export function csrfErrorResponse() {
    return NextResponse.json({ success: false, error: "Invalid origin" }, { status: 403 })
}
