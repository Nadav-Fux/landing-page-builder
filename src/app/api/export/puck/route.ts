import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Data } from "@measured/puck"
import { rateLimit } from "@/lib/rateLimit"
import { renderPuckDataToHTML } from "@/lib/puck/renderer"
import { validateCsrf, csrfErrorResponse } from "@/lib/csrf"

function sanitizeFilename(filename: string): string {
    return filename
        .replace(/[^a-z0-9א-ת\s\-_]/gi, '')
        .trim()
        .substring(0, 100)
        .replace(/\.{2,}/g, '.')
        .replace(/[\s\-]+/g, '-')
        || 'landing-page';
}

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
        const { puckData, title } = body

        if (!puckData) {
            return NextResponse.json({ success: false, error: "Puck data is required" }, { status: 400 })
        }

        const safeTitle = sanitizeFilename(title || "landing-page")
        const html = renderPuckDataToHTML(puckData as Data, safeTitle)

        return new NextResponse(html, {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Content-Disposition": `attachment; filename="${safeTitle}.html"`,
            },
        })
    } catch (error) {
        console.error("Export error:", error)
        return NextResponse.json({ success: false, error: "Failed to export HTML" }, { status: 500 })
    }
}
