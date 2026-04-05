"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Clock, Sparkles, LogOut, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

interface Project {
    id: string
    title: string
    description: string | null
    status: string
    updatedAt: string
    html?: string | null
    css?: string | null
    puckData?: string | null
}

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { t } = useLanguage()
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    useEffect(() => {
        if (status === "authenticated") {
            fetchProjects()
        }
    }, [status])

    const fetchProjects = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await fetch("/api/projects")
            if (response.ok) {
                const data = await response.json()
                setProjects(data)
            } else if (response.status === 401) {
                router.push("/login")
            } else {
                setError(t('dashboard.projects.error.load'))
                toast.error(t('dashboard.projects.error.load'))
            }
        } catch (error) {
            console.error("Error fetching projects:", error)
            setError(t('dashboard.projects.error.load'))
            toast.error(t('dashboard.projects.error.load'))
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteClick = (id: string) => {
        setShowDeleteConfirm(id)
    }

    const handleDeleteConfirm = () => {
        if (pendingDeleteId) {
            executeDelete(pendingDeleteId)
        }
        setShowDeleteConfirm(null)
        setPendingDeleteId(null)
    }

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(null)
        setPendingDeleteId(null)
    }

    const executeDelete = async (id: string) => {
        try {
            setDeletingId(id)
            const response = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setProjects(projects.filter(p => p.id !== id))
                toast.success(t('dashboard.projects.success.delete'))
            } else {
                toast.error(t('dashboard.projects.error.delete'))
            }
        } catch (error) {
            console.error("Error deleting project:", error)
            toast.error(t('dashboard.projects.error.delete'))
        } finally {
            setDeletingId(null)
        }
    }

    if (status === "loading" || isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center space-y-4" role="status" aria-live="polite">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" aria-hidden="true" />
                    <p className="text-muted-foreground">{t('dashboard.projects.loading')}</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center space-y-4 text-center" role="alert">
                    <div className="p-4 rounded-full bg-destructive/10">
                        <Sparkles className="h-8 w-8 text-destructive" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-semibold">{error}</h2>
                    <Button onClick={fetchProjects} className="gradient-bg">
                        <Loader2 className="h-4 w-4 mr-2" aria-hidden="true" />
                        {t('dashboard.projects.error.retry')}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
            {showDeleteConfirm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="delete-dialog-title"
                    aria-describedby="delete-dialog-description"
                >
                    <div className="bg-background rounded-lg p-6 max-w-md mx-4 shadow-lg">
                        <h3 id="delete-dialog-title" className="text-lg font-semibold mb-2">
                            {t('dashboard.projects.delete')}
                        </h3>
                        <p id="delete-dialog-description" className="text-muted-foreground mb-4">
                            {t('dashboard.projects.empty.subtitle')}
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={handleDeleteCancel}>
                                {t('dashboard.projects.empty.button')}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                                aria-label={t('dashboard.projects.delete')}
                            >
                                {t('dashboard.projects.delete')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary">
                                <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
                            </div>
                            <span className="text-lg font-bold gradient-text">PageCraft</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">
                                {session?.user?.email}
                            </span>
                            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
                                {t('dashboard.projects.backToHome')}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label={t('dashboard.projects.logout')}
                            >
                                <LogOut className="h-4 w-4" aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container-custom py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">{t('dashboard.projects.title')}</h1>
                        <p className="text-muted-foreground mt-1">
                            {t('dashboard.projects.subtitle')}
                        </p>
                    </div>
                    <Link href="/editor/new">
                        <Button className="gradient-bg">
                            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                            {t('dashboard.projects.new')}
                        </Button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardHeader>
                                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-muted rounded w-1/2" />
                                </CardHeader>
                                <CardContent>
                                    <div className="h-4 bg-muted rounded w-full mb-2" />
                                    <div className="h-4 bg-muted rounded w-2/3" />
                                </CardContent>
                                <CardFooter>
                                    <div className="h-8 bg-muted rounded w-full" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : projects.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-4 rounded-full bg-muted">
                                    <Plus className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-semibold">{t('dashboard.projects.empty.title')}</h3>
                                <p className="text-muted-foreground max-w-md">
                                    {t('dashboard.projects.empty.subtitle')}
                                </p>
                                <Link href="/editor/new">
                                    <Button className="gradient-bg">
                                        <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                                        {t('dashboard.projects.empty.button')}
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <CardTitle className="text-lg">{project.title}</CardTitle>
                                            <Badge variant={project.status?.toUpperCase() === "PUBLISHED" ? "default" : "secondary"}>
                                                {project.status}
                                            </Badge>
                                        </div>
                                        <CardDescription>
                                            {project.description || t('dashboard.projects.noDescription')}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
                                            <span>{t('dashboard.projects.updated')} {new Date(project.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <div className="flex space-x-2">
                                            <Link href={`/editor/${project.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4 mr-1" aria-hidden="true" />
                                                    {t('dashboard.projects.edit')}
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    const previewData = {
                                                        html: project.html,
                                                        css: project.css,
                                                        puckData: project.puckData
                                                    };
                                                    try {
                                                        localStorage.setItem('previewData', JSON.stringify(previewData));
                                                        window.open('/preview', '_blank');
                                                    } catch (error) {
                                                        toast.error(t('dashboard.projects.error.preview'));
                                                    }
                                                }}
                                            >
                                                <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                                                {t('dashboard.projects.preview')}
                                            </Button>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => {
                                                setPendingDeleteId(project.id)
                                                handleDeleteClick(project.id)
                                            }}
                                            disabled={deletingId === project.id}
                                            aria-label={t('dashboard.projects.delete')}
                                        >
                                            {deletingId === project.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
