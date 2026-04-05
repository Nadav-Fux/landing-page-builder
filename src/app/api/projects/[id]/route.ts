import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rateLimit"
import { validateCsrf, csrfErrorResponse } from "@/lib/csrf"
import { parseProject } from "@/lib/json"
import * as z from "zod"

const MAX_PUCK_DATA_SIZE = 1024 * 1024

const updateProjectSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(1000).optional().nullable(),
    puckData: z.string().refine(
        (val) => {
            if (!val || val === "null") return true
            try {
                const parsed = JSON.parse(val)
                const size = new Blob([JSON.stringify(parsed)]).size
                return size <= MAX_PUCK_DATA_SIZE
            } catch {
                return false
            }
        },
        { message: "puckData must be valid JSON and under 1MB" }
    ).optional().nullable(),
    content: z.string().optional().nullable(),
    html: z.string().optional().nullable(),
    css: z.string().optional().nullable(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
})

type UpdateProjectInput = z.infer<typeof updateProjectSchema>

interface RouteParams {
    params: Promise<{ id: string }>
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
    const rateLimitResult = await rateLimit(_request)
    if (rateLimitResult) return rateLimitResult

    if (!validateCsrf(_request)) {
        return csrfErrorResponse()
    }

    try {
        const { id } = await params
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const project = await prisma.project.findFirst({
            where: { id, userId: session.user.id },
        })

        if (!project) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: parseProject(project) })
    } catch (error) {
        console.error("Error fetching project:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const rateLimitResult = await rateLimit(request)
    if (rateLimitResult) return rateLimitResult

    if (!validateCsrf(request)) {
        return csrfErrorResponse()
    }

    try {
        const { id } = await params
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validationResult = updateProjectSchema.safeParse(body)

        if (!validationResult.success) {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
                details: validationResult.error.flatten()
            }, { status: 400 })
        }

        const validated: UpdateProjectInput = validationResult.data

        const updateData: Parameters<typeof prisma.project.update>[0]["data"] = {}
        if (validated.title !== undefined) updateData.title = validated.title
        if (validated.description !== undefined) updateData.description = validated.description
        if (validated.puckData !== undefined) updateData.puckData = validated.puckData
        if (validated.content !== undefined) updateData.content = validated.content
        if (validated.html !== undefined) updateData.html = validated.html
        if (validated.css !== undefined) updateData.css = validated.css
        if (validated.status !== undefined) updateData.status = validated.status

        const project = await prisma.project.update({
            where: { id, userId: session.user.id },
            data: updateData,
        })

        return NextResponse.json({ success: true, data: parseProject(project) })
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
        }
        console.error("Error updating project:", error)
        return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 })
    }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
    const rateLimitResult = await rateLimit(_request)
    if (rateLimitResult) return rateLimitResult

    if (!validateCsrf(_request)) {
        return csrfErrorResponse()
    }

    try {
        const { id } = await params
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }

        const result = await prisma.project.deleteMany({
            where: { id, userId: session.user.id },
        })

        if (result.count === 0) {
            return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting project:", error)
        return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 })
    }
}
