"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { AIGeneratorPanel } from "@/components/editor/AIGeneratorPanel"
import { SaveProjectDialog } from "@/components/editor/SaveProjectDialog"
import {
    Save,
    ArrowLeft,
    Sparkles,
    FileCode,
    ExternalLink,
    Edit,
    Eye,
} from "lucide-react"
import { toast } from "sonner"
import { puckConfig } from "@/lib/puck/config"
import type { Data } from "@measured/puck"
import { useLanguage } from "@/components/language-provider"

// Dynamic import for Puck to disable SSR
const Puck = dynamic(
    () => import("@measured/puck").then((mod) => mod.Puck),
    { ssr: false }
)

// Render only Puck preview without editing capabilities
const PuckRender = dynamic(
    () => import("@measured/puck").then((mod) => ({ default: mod.Render })),
    { ssr: false }
)

interface PuckEditorWrapperProps {
    projectId: string
    templateId?: string | null
    userId: string
}

interface ProjectData {
    id: string | undefined
    title: string
    description: string
    puckData?: Data
}

export default function PuckEditorWrapper({
    projectId,
    templateId,
}: Omit<PuckEditorWrapperProps, 'userId'>) {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const [isEditMode, setIsEditMode] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isAIPanelOpen, setIsAIPanelOpen] = useState(false)
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
    const [projectData, setProjectData] = useState<ProjectData>({
        id: projectId === "new" ? undefined : projectId,
        title: "",
        description: "",
    })
    const [initialData, setInitialData] = useState<Data>({
        content: [],
        root: { props: {} },
        zones: {}
    })
    const [language, setLanguage] = useState<"en" | "he">("en")
    const { t } = useLanguage()
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    // Handle client-side mounting
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Auto-save to localStorage every 30 seconds
    useEffect(() => {
        if (!isClient || !projectData.id) return

        const interval = setInterval(() => {
            if (hasUnsavedChanges) {
                localStorage.setItem(`autosave_${projectData.id}`, JSON.stringify(initialData))
            }
        }, 30000)

        return () => clearInterval(interval)
    }, [isClient, projectData.id, initialData, hasUnsavedChanges])

    // Restore from autosave if available
    useEffect(() => {
        if (!isClient || projectId === "new") return

        const autosaved = localStorage.getItem(`autosave_${projectId}`)
        if (autosaved) {
            try {
                const parsed = JSON.parse(autosaved)
                setInitialData(parsed)
            } catch {
                localStorage.removeItem(`autosave_${projectId}`)
            }
        }
    }, [isClient, projectId])

    // Unsaved changes warning
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault()
                e.returnValue = ""
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }, [hasUnsavedChanges])

    // Load project or template data
    useEffect(() => {
        if (!isClient) return

        let isMounted = true
        const abortController = new AbortController()

        const loadData = async () => {
            try {
                if (projectId !== "new") {
                    // Load existing project
                    const response = await fetch(`/api/projects/${projectId}`, {
                        signal: abortController.signal
                    })
                    if (response.ok) {
                        const project = await response.json()
                        if (!isMounted) return
                        setProjectData({
                            id: project.id,
                            title: project.title,
                            description: project.description || "",
                            puckData: project.puckData
                        })

                        if (project.puckData) {
                            setInitialData(project.puckData)
                        } else {
                            // Fallback for projects without Puck data
                            setInitialData({
                                content: [
                                    {
                                        type: "Hero",
                                        props: {
                                            title: project.title || "Welcome to PageCraft",
                                            subtitle: "Create amazing pages with our builder",
                                            primaryButtonText: "Get Started",
                                            primaryButtonLink: "#"
                                        }
                                    }
                                ],
                                root: { props: {} },
                                zones: {}
                            })
                        }
                    }
                } else if (templateId) {
                    // Load template
                    const response = await fetch(`/api/templates/${templateId}`, {
                        signal: abortController.signal
                    })
                    if (response.ok) {
                        const template = await response.json()
                        if (!isMounted) return
                        if (template.puckData) {
                            setInitialData(template.puckData)
                            toast.success(`Loaded template: ${template.name}`)
                        }
                    }
                } else {
                    // Default content for new projects
                    setInitialData({
                        content: [
                            {
                                type: "Hero",
                                props: {
                                    title: "Welcome to PageCraft",
                                    subtitle: "Start building your landing page by adding components from the left panel",
                                    primaryButtonText: "Get Started",
                                    primaryButtonLink: "#"
                                }
                            }
                        ],
                        root: { props: {} },
                        zones: {}
                    })
                }
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    return
                }
                console.error("Error loading data:", error)
                if (isMounted) {
                    toast.error("Failed to load project data")
                }
            }
        }

        loadData()

        return () => {
            isMounted = false
            abortController.abort()
        }
    }, [projectId, templateId, isClient])

    // Transform bilingual data to single language
    const transformToLanguage = useCallback((data: Data, lang: "en" | "he"): Data => {
        const getText = (text: string | { en: string; he: string } | undefined): string => {
            if (!text) return ''
            if (typeof text === 'string') return text
            return text[lang] || text.en || ''
        }

        const transformComponent = (component: Record<string, unknown>): Record<string, unknown> => {
            const transformed = { ...component }
            if (transformed.props && typeof transformed.props === 'object') {
                transformed.props = transformProps(transformed.props as Record<string, unknown>)
            }
            return transformed
        }

        const transformProps = (props: Record<string, unknown>): Record<string, unknown> => {
            const result: Record<string, unknown> = {}

            for (const [key, value] of Object.entries(props)) {
                if (key === 'links' && Array.isArray(value)) {
                    result[key] = (value as Record<string, unknown>[]).map((link) => ({
                        ...link,
                        label: getText(link.label as string | { en: string; he: string } | undefined)
                    }))
                } else if (key === 'features' && Array.isArray(value)) {
                    result[key] = (value as Record<string, unknown>[]).map((feature) => ({
                        ...feature,
                        title: getText(feature.title as string | { en: string; he: string } | undefined),
                        description: getText(feature.description as string | { en: string; he: string } | undefined)
                    }))
                } else if (key === 'tiers' && Array.isArray(value)) {
                    result[key] = (value as Record<string, unknown>[]).map((tier) => ({
                        ...tier,
                        name: getText(tier.name as string | { en: string; he: string } | undefined),
                        description: getText(tier.description as string | { en: string; he: string } | undefined),
                        buttonText: getText(tier.buttonText as string | { en: string; he: string } | undefined),
                        features: Array.isArray(tier.features) ? (tier.features as Record<string, unknown>[]).map((f) => ({
                            ...f,
                            text: getText(f.text as string | { en: string; he: string } | undefined)
                        })) : tier.features
                    }))
                } else if (key === 'testimonials' && Array.isArray(value)) {
                    result[key] = (value as Record<string, unknown>[]).map((t) => ({
                        ...t,
                        name: getText(t.name as string | { en: string; he: string } | undefined),
                        role: getText(t.role as string | { en: string; he: string } | undefined),
                        company: getText(t.company as string | { en: string; he: string } | undefined),
                        content: getText(t.content as string | { en: string; he: string } | undefined)
                    }))
                } else if (key === 'items' && Array.isArray(value)) {
                    result[key] = (value as Record<string, unknown>[]).map((item) => ({
                        ...item,
                        question: getText(item.question as string | { en: string; he: string } | undefined),
                        answer: getText(item.answer as string | { en: string; he: string } | undefined)
                    }))
                } else if (key === 'stats' && Array.isArray(value)) {
                    result[key] = (value as Record<string, unknown>[]).map((stat) => ({
                        ...stat,
                        label: getText(stat.label as string | { en: string; he: string } | undefined)
                    }))
                } else if (key === 'columns' && Array.isArray(value)) {
                    result[key] = (value as Record<string, unknown>[]).map((col) => ({
                        ...col,
                        title: getText(col.title as string | { en: string; he: string } | undefined),
                        links: Array.isArray(col.links) ? (col.links as Record<string, unknown>[]).map((l) => ({
                            ...l,
                            label: getText(l.label as string | { en: string; he: string } | undefined)
                        })) : col.links
                    }))
                } else if (typeof value === 'object' && value !== null && 'en' in value && 'he' in value) {
                    result[key] = getText(value as { en: string; he: string })
                } else {
                    result[key] = value
                }
            }

            return result
        }

        const result: Data = {
            content: data.content.map((item: Record<string, unknown>) => transformComponent(item)) as any,
            root: {
                props: {
                    ...data.root.props,
                    dir: lang === 'he' ? 'rtl' : 'ltr',
                    lang: lang
                } as any
            },
            zones: data.zones || {}
        }
        return result
    }, [])

    // Get data for the current language
    const displayData = useMemo(() => transformToLanguage(initialData, language), [initialData, language, transformToLanguage])

    // Handle save functionality
    const handleSave = useCallback(async (data: { id?: string | undefined; title: string; description: string }) => {
        const currentData = initialData

        const endpoint = data.id ? `/api/projects/${data.id}` : "/api/projects"
        const method = data.id ? "PUT" : "POST"

        const response = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                puckData: JSON.stringify(currentData),
                html: null,
                css: null,
            }),
        })

        if (!response.ok) {
            throw new Error("Failed to save project")
        }

        const savedProject = await response.json()
        setProjectData({
            id: savedProject.id,
            title: savedProject.title,
            description: savedProject.description || "",
            puckData: currentData
        })

        if (!data.id && projectId === "new") {
            router.replace(`/editor/${savedProject.id}`)
        }
    }, [initialData, projectId, router])

    // Handle quick save
    const handleQuickSave = useCallback(async () => {
        if (!projectData.id) {
            setIsSaveDialogOpen(true)
            return
        }

        setIsSaving(true)
        try {
            const response = await fetch(`/api/projects/${projectData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: projectData.title,
                    description: projectData.description,
                    puckData: JSON.stringify(initialData),
                    html: null,
                    css: null
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to save project")
            }

            await response.json()
            setProjectData(prev => ({
                ...prev,
                puckData: initialData
            }))

            toast.success(t("editor.projectSaved"))
            setHasUnsavedChanges(false)
        } catch (error) {
            toast.error(t("editor.failedToSave"))
        } finally {
            setIsSaving(false)
        }
    }, [projectData.id, projectData.title, projectData.description, initialData, t])

    // Handle AI generation
    const handleAIGenerate = useCallback((puckData: Data) => {
        setInitialData(puckData)
        toast.success("AI content generated successfully!")
    }, [])

    // Handle export
    const handleExport = useCallback(async () => {
        try {
            const response = await fetch("/api/export/puck", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    puckData: initialData,
                    title: projectData.title || "landing-page"
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to export")
            }

            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `${projectData.title || "landing-page"}.html`
            a.click()
            URL.revokeObjectURL(url)
            toast.success("HTML exported!")
        } catch (error) {
            toast.error("Failed to export HTML")
        }
    }, [initialData, projectData.title])

    // Handle preview
    const handlePreview = useCallback(async () => {
        try {
            const response = await fetch("/api/preview/puck", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initialData),
            })

            if (!response.ok) {
                throw new Error("Failed to generate preview")
            }

            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const newWindow = window.open(url, "_blank")
            
            // Release the blob URL after a short delay
            setTimeout(() => {
                if (newWindow && !newWindow.closed) {
                    URL.revokeObjectURL(url)
                }
            }, 1000)
        } catch (error) {
            toast.error("Failed to generate preview")
        }
    }, [initialData])

    // Handle data changes
    const handleDataChange = useCallback((data: Data) => {
        setInitialData(data)
        setHasUnsavedChanges(true)
    }, [])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isCtrl = e.ctrlKey || e.metaKey

            if (isCtrl && e.key === "s") {
                e.preventDefault()
                handleQuickSave()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleQuickSave])

    if (!isClient) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="h-screen flex flex-col bg-neutral-900">
            {/* Toolbar */}
            <header className="h-14 border-b border-neutral-700 bg-neutral-800 flex items-center justify-between px-4 z-50">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/dashboard")}
                        className="text-white hover:bg-neutral-700"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {t("editor.back")}
                    </Button>

                    {projectData.title && (
                        <span className="text-white font-medium">{projectData.title}</span>
                    )}

                    <div className="h-6 w-px bg-neutral-600" />

                    {/* Language Toggle */}
                    <div className="flex items-center space-x-1">
                        <Button
                            variant={language === "en" ? "secondary" : "ghost"}
                            size="sm"
                            className="text-white hover:bg-neutral-700"
                            onClick={() => setLanguage("en")}
                            aria-pressed={language === "en"}
                        >
                            EN
                        </Button>
                        <Button
                            variant={language === "he" ? "secondary" : "ghost"}
                            size="sm"
                            className="text-white hover:bg-neutral-700"
                            onClick={() => setLanguage("he")}
                            aria-pressed={language === "he"}
                        >
                            עב
                        </Button>
                    </div>

                    {/* Edit/Preview Mode Toggle */}
                    <div className="flex items-center space-x-1">
                        <Button
                            variant={isEditMode ? "secondary" : "ghost"}
                            size="sm"
                            className="text-white hover:bg-neutral-700"
                            onClick={() => setIsEditMode(true)}
                            aria-pressed={isEditMode}
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            {t("editor.editMode")}
                        </Button>
                        <Button
                            variant={!isEditMode ? "secondary" : "ghost"}
                            size="sm"
                            className="text-white hover:bg-neutral-700"
                            onClick={() => setIsEditMode(false)}
                            aria-pressed={!isEditMode}
                        >
                            <Eye className="h-4 w-4 mr-2" />
                            {t("editor.previewMode")}
                        </Button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                        onClick={() => setIsAIPanelOpen(true)}
                    >
                        <Sparkles className="h-4 w-4 mr-2" />
                        {t("editor.aiGenerate")}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-neutral-600 text-white hover:bg-neutral-700"
                        onClick={handleExport}
                    >
                        <FileCode className="h-4 w-4 mr-2" />
                        {t("editor.export")}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-neutral-600 text-white hover:bg-neutral-700"
                        onClick={handlePreview}
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t("editor.previewNewWindow")}
                    </Button>
                    <Button
                        size="sm"
                        className="gradient-bg"
                        onClick={handleQuickSave}
                        disabled={isSaving}
                    >
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? t("editor.saving") : t("editor.save")}
                    </Button>
                </div>
            </header>

            {/* Puck Editor */}
            <div className="flex-1">
                {isEditMode ? (
                    <Puck
                        config={puckConfig}
                        data={displayData}
                        onChange={handleDataChange}
                        onPublish={handleQuickSave}
                    />
                ) : (
                    <div className="h-full overflow-auto bg-white">
                        <PuckRender
                            config={puckConfig}
                            data={displayData}
                        />
                    </div>
                )}
            </div>

            {/* AI Generator Panel */}
            <AIGeneratorPanel
                isOpen={isAIPanelOpen}
                onOpenChange={setIsAIPanelOpen}
                onGenerate={handleAIGenerate}
            />

            {/* Save Dialog */}
            <SaveProjectDialog
                isOpen={isSaveDialogOpen}
                onOpenChange={setIsSaveDialogOpen}
                projectId={projectData.id}
                onSave={handleSave}
                initialTitle={projectData.title}
                initialDescription={projectData.description}
            />
        </div>
    )
}