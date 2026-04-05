"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Search, Download, Star, Eye, ArrowLeft, Loader2, Sparkles, Crown, AlertCircle } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"
import { useLanguage } from "@/components/language-provider"

interface Template {
    id: string
    name: string
    category: string
    description: string
    thumbnail: string
    isPremium: boolean
    rating: number
    downloads: number
    tags: string[]
}

const categories = [
    { id: "all", nameKey: "templates.category.all" },
    { id: "saas", nameKey: "templates.category.saas" },
    { id: "agency", nameKey: "templates.category.agency" },
    { id: "startup", nameKey: "templates.category.startup" },
    { id: "e-commerce", nameKey: "templates.category.ecommerce" },
    { id: "portfolio", nameKey: "templates.category.portfolio" },
]

export default function TemplatesPage() {
    const { data: session, status } = useSession()
    const { t } = useLanguage()
    const router = useRouter()
    const [templates, setTemplates] = useState<Template[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 300)
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean
        title: string
        message: string
        onConfirm: () => void
    }>({ isOpen: false, title: "", message: "", onConfirm: () => {} })

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/templates")
        }
    }, [status, router])

    useEffect(() => {
        fetchTemplates()
    }, [selectedCategory, debouncedSearch])

    const fetchTemplates = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const params = new URLSearchParams()
            if (selectedCategory !== "all") params.append("category", selectedCategory)
            if (debouncedSearch) params.append("search", debouncedSearch)

            const response = await fetch(`/api/templates?${params.toString()}`)
            if (response.ok) {
                const data = await response.json()
                setTemplates(data)
            } else {
                setError(t("templates.error.load"))
            }
        } catch (err) {
            console.error("Error fetching templates:", err)
            setError(t("templates.error.load"))
        } finally {
            setIsLoading(false)
        }
    }

    const handleUseTemplate = (templateId: string) => {
        router.push(`/editor/new?template=${templateId}`)
    }

    const handlePreview = (templateId: string) => {
        window.open(`/api/templates/${templateId}/preview`, "_blank")
    }

    const handleRetry = () => {
        fetchTemplates()
    }

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center space-y-4" role="status" aria-live="polite">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" aria-hidden="true" />
                    <p className="text-muted-foreground">{t("templates.loading")}</p>
                </div>
            </div>
        )
    }

    if (!session) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
            {/* Header */}
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
                            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>
                                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                                {t("templates.backToDashboard")}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container-custom py-8">
                {/* Page Title */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">{t("templates.title")}</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t("templates.subtitle")}
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <Input
                            id="template-search"
                            placeholder={t("templates.search.placeholder")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                            aria-label={t("templates.search.ariaLabel")}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap" role="group" aria-label={t("templates.filters.ariaLabel")}>
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant={selectedCategory === cat.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(cat.id)}
                                aria-pressed={selectedCategory === cat.id}
                                aria-label={t(cat.nameKey)}
                            >
                                {t(cat.nameKey)}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-12 text-center" role="alert">
                        <AlertCircle className="h-12 w-12 text-destructive mb-4" aria-hidden="true" />
                        <h2 className="text-xl font-semibold mb-2">{t("templates.error.title")}</h2>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button onClick={handleRetry}>
                            {t("templates.error.retry")}
                        </Button>
                    </div>
                )}

                {/* Templates Grid */}
                {!error && isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden="true" />
                    </div>
                ) : !error && templates.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">{t("templates.empty")}</p>
                        <Button
                            variant="link"
                            onClick={() => { setSearch(""); setSelectedCategory("all"); }}
                        >
                            {t("templates.clear")}
                        </Button>
                    </div>
                ) : !error ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-48 overflow-hidden bg-muted">
                                        <img
                                            src={template.thumbnail}
                                            alt={template.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {template.isPremium && (
                                            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500">
                                                <Crown className="h-3 w-3 mr-1" aria-hidden="true" />
                                                {t("templates.premium")}
                                            </Badge>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <Button size="sm" variant="secondary" onClick={() => handlePreview(template.id)}>
                                                <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                                                {t("templates.preview")}
                                            </Button>
                                            <Button size="sm" onClick={() => handleUseTemplate(template.id)}>
                                                {t("templates.useTemplate")}
                                            </Button>
                                        </div>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-lg">{template.name}</CardTitle>
                                                <Badge variant="outline" className="mt-1">{template.category}</Badge>
                                            </div>
                                            <div 
                                                className="flex items-center text-amber-500" 
                                                aria-label={`${t("templates.rating.ariaLabel")} ${template.rating}`}
                                            >
                                                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                                                <span className="ml-1 text-sm font-medium">{template.rating}</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                                    </CardContent>
                                    <CardFooter className="pt-2">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                                            <span>{template.downloads.toLocaleString()} {t("templates.uses")}</span>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : null}
            </main>

            {/* Custom Accessible Dialog */}
            <Dialog open={confirmDialog.isOpen} onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, isOpen: open }))}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{confirmDialog.title}</DialogTitle>
                        <DialogDescription>{confirmDialog.message}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                        >
                            {t("templates.dialog.cancel")}
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => {
                                confirmDialog.onConfirm()
                                setConfirmDialog(prev => ({ ...prev, isOpen: false }))
                            }}
                        >
                            {t("templates.dialog.confirm")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
