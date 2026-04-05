export function safeJsonParse<T>(json: string | null, fallback: T): T {
    if (!json) return fallback
    try {
        return JSON.parse(json)
    } catch (error) {
        console.error("JSON parse error:", error)
        return fallback
    }
}

export interface ParsedProject {
    id: string
    title: string
    description: string | null
    content: unknown
    html: string | null
    css: string | null
    puckData: unknown
    status: string
    isPublic: boolean
    isTemplate: boolean
    thumbnail: string | null
    tags: string[]
    meta: unknown
    createdAt: Date
    updatedAt: Date
    userId: string
}

export function parseProject(project: {
    id: string
    title: string
    description: string | null
    content: string | null
    html: string | null
    css: string | null
    puckData: string | null
    status: string
    isPublic: boolean
    isTemplate: boolean
    thumbnail: string | null
    tags: string | null
    meta: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
}): ParsedProject {
    return {
        ...project,
        content: safeJsonParse(project.content, null),
        puckData: safeJsonParse(project.puckData, null),
        tags: project.tags ? project.tags.split(",") : [],
        meta: safeJsonParse(project.meta, null),
    }
}
