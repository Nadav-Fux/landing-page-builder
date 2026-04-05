import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rateLimit"
import { validateCsrf, csrfErrorResponse } from "@/lib/csrf"
import { safeJsonParse, parseProject } from "@/lib/json"
import * as z from "zod"

const MAX_PUCK_DATA_SIZE = 1024 * 1024

const createProjectSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(1000).optional(),
    puckData: z.string().refine(
        (val) => {
            if (!val) return true
            try {
                const parsed = JSON.parse(val)
                const size = new Blob([JSON.stringify(parsed)]).size
                return size <= MAX_PUCK_DATA_SIZE
            } catch {
                return false
            }
        },
        { message: "puckData must be valid JSON and under 1MB" }
    ).optional(),
    content: z.string().optional(),
    html: z.string().optional(),
    css: z.string().optional(),
})

const paginationSchema = z.object({
    take: z.coerce.number().int().min(1).max(100).default(20),
    skip: z.coerce.number().int().min(0).default(0),
})

type CreateProjectInput = z.infer<typeof createProjectSchema>

export async function GET(request: NextRequest) {
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

        const searchParams = request.nextUrl.searchParams
        const paginationResult = paginationSchema.safeParse(Object.fromEntries(searchParams))

        if (!paginationResult.success) {
            return NextResponse.json({
                success: false,
                error: "Invalid pagination parameters",
                details: paginationResult.error.flatten()
            }, { status: 400 })
        }

        const { take, skip } = paginationResult.data

        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                where: { userId: session.user.id },
                orderBy: { updatedAt: "desc" },
                take,
                skip,
            }),
            prisma.project.count({
                where: { userId: session.user.id },
            }),
        ])

        const parsedProjects = projects.map(parseProject)

        return NextResponse.json({
            success: true,
            data: parsedProjects,
            pagination: { take, skip, total }
        })
    } catch (error) {
        console.error("Error fetching projects:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 })
    }
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
        const validationResult = createProjectSchema.safeParse(body)

        if (!validationResult.success) {
            return NextResponse.json({
                success: false,
                error: "Validation failed",
                details: validationResult.error.flatten()
            }, { status: 400 })
        }

        const validated: CreateProjectInput = validationResult.data

        const project = await prisma.project.create({
            data: {
                title: validated.title,
                description: validated.description || "",
                puckData: validated.puckData ? validated.puckData : null,
                content: validated.content ? validated.content : null,
                html: validated.html || null,
                css: validated.css || null,
                userId: session.user.id,
                status: "DRAFT",
            },
        })

        return NextResponse.json({
            success: true,
            data: {
                ...project,
                puckData: safeJsonParse(project.puckData, null),
                content: safeJsonParse(project.content, null),
            }
        }, { status: 201 })
    } catch (error) {
        console.error("Error creating project:", error)
        return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 })
    }
}
