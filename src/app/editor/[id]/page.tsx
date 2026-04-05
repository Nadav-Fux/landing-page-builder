import { Suspense } from "react"
import { redirect, notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import PuckEditorWrapper from "@/components/puck/PuckEditorWrapper"
import ErrorBoundary from "@/components/ErrorBoundary"

interface PageProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ template?: string }>
}

async function EditorContent({ projectId, templateId }: { projectId: string; templateId?: string | null }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")
    }

    if (projectId !== "new") {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            select: { userId: true },
        })

        if (!project) {
            notFound()
        }

        if (project.userId !== session.user?.id) {
            redirect("/dashboard")
        }
    }

    return (
        <ErrorBoundary>
            <PuckEditorWrapper
                projectId={projectId}
                templateId={templateId || null}
            />
        </ErrorBoundary>
    )
}

export default async function EditorPage({ params, searchParams }: PageProps) {
    const resolvedParams = await params
    const resolvedSearchParams = await searchParams

    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <EditorContent
                projectId={resolvedParams.id}
                templateId={resolvedSearchParams.template || null}
            />
        </Suspense>
    )
}