import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Data } from "@measured/puck"
import { rateLimit } from "@/lib/rateLimit"
import { renderPuckDataToHTML } from "@/lib/puck/renderer"
import { validateCsrf, csrfErrorResponse } from "@/lib/csrf"

export async function POST(request: NextRequest) {
    const rateLimitResult = await rateLimit(request)
    if (rateLimitResult) return rateLimitResult

    if (!validateCsrf(request)) {
        return csrfErrorResponse()
    }

    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const html = renderPuckDataToHTML(body as Data, "Preview")

        return new NextResponse(html, {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "X-Frame-Options": "SAMEORIGIN",
            },
        })
    } catch (error) {
        console.error("Preview error:", error)
        return NextResponse.json({ success: false, error: "Failed to generate preview" }, { status: 500 })
    }
}
