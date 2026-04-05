"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Save, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

interface SaveProjectDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    projectId: string | undefined
    onSave: (projectData: { id?: string | undefined; title: string; description: string }) => Promise<void>
    initialTitle?: string
    initialDescription?: string
}

export function SaveProjectDialog({
    isOpen,
    onOpenChange,
    projectId,
    onSave,
    initialTitle = "",
    initialDescription = "",
}: SaveProjectDialogProps) {
    const { t } = useLanguage()
    const [title, setTitle] = useState(initialTitle)
    const [description, setDescription] = useState(initialDescription)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (initialTitle !== title) setTitle(initialTitle)
        if (initialDescription !== description) setDescription(initialDescription)
    }, [initialTitle, initialDescription])

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error(t("save.titleRequired"))
            return
        }

        setIsSaving(true)
        try {
            await onSave({
                id: projectId ?? undefined,
                title: title.trim(),
                description: description.trim(),
            })
            toast.success(projectId ? t("save.updated") : t("save.saved"))
            onOpenChange(false)
        } catch (error) {
            console.error("Save error:", error)
            toast.error(t("save.failed"))
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {projectId ? t("save.updateTitle") : t("save.createTitle")}
                    </DialogTitle>
                    <DialogDescription>
                        {projectId
                            ? t("save.updateDesc")
                            : t("save.createDesc")}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">{t("save.projectTitle")}</Label>
                        <Input
                            id="title"
                            placeholder={t("save.titlePlaceholder")}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">{t("save.description")}</Label>
                        <Input
                            id="description"
                            placeholder={t("save.descPlaceholder")}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        {t("save.cancel")}
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving || !title.trim()}>
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t("save.saving")}
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                {t("save.submit")}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
