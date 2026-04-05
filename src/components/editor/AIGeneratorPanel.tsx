"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Loader2, Wand2 } from "lucide-react"
import { toast } from "sonner"
import { Data } from "@measured/puck"
import { useLanguage } from "@/components/language-provider"

interface AIGeneratorPanelProps {
    onGenerate: (puckData: Data) => void
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const industries = [
    { value: "saas", label: "SaaS" },
    { value: "e-commerce", label: "E-commerce" },
    { value: "agency", label: "Agency" },
    { value: "startup", label: "Startup" },
    { value: "portfolio", label: "Portfolio" },
    { value: "restaurant", label: "Restaurant" },
    { value: "real-estate", label: "Real Estate" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
]

const styleKeys = [
    { value: "modern", labelKey: "ai.style.modern" },
    { value: "bold", labelKey: "ai.style.bold" },
    { value: "minimal", labelKey: "ai.style.minimal" },
    { value: "classic", labelKey: "ai.style.classic" },
    { value: "playful", labelKey: "ai.style.playful" },
]

const sectionKeys = [
    { value: "Hero", labelKey: "ai.section.hero" },
    { value: "Features", labelKey: "ai.section.features" },
    { value: "Pricing", labelKey: "ai.section.pricing" },
    { value: "Testimonials", labelKey: "ai.section.testimonials" },
    { value: "FAQ", labelKey: "ai.section.faq" },
    { value: "Contact", labelKey: "ai.section.contact" },
    { value: "About", labelKey: "ai.section.about" },
    { value: "Team", labelKey: "ai.section.team" },
    { value: "Gallery", labelKey: "ai.section.gallery" },
    { value: "Stats", labelKey: "ai.section.stats" },
]

export function AIGeneratorPanel({ onGenerate, isOpen, onOpenChange }: AIGeneratorPanelProps) {
    const { t } = useLanguage()
    const [prompt, setPrompt] = useState("")
    const [industry, setIndustry] = useState("")
    const [style, setStyle] = useState("modern")
    const [selectedSections, setSelectedSections] = useState<string[]>(["Hero", "Features"])
    const [isGenerating, setIsGenerating] = useState(false)

    const toggleSection = (section: string) => {
        setSelectedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        )
    }

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error(t("ai.promptRequired"))
            return
        }

        setIsGenerating(true)

        try {
            const response = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    industry: industry || undefined,
                    style,
                    sections: selectedSections,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate content")
            }

            const data = await response.json()
            onGenerate(data.puckData)
            toast.success(t("ai.generated"))
            onOpenChange(false)
        } catch (error) {
            console.error("Generation error:", error)
            toast.error(t("ai.failed"))
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        {t("ai.title")}
                    </SheetTitle>
                    <SheetDescription>
                        {t("ai.subtitle")}
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 py-6">
                    <div className="space-y-2">
                        <Label htmlFor="prompt">{t("ai.promptLabel")}</Label>
                        <Textarea
                            id="prompt"
                            placeholder={t("ai.promptPlaceholder")}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>{t("ai.industryLabel")}</Label>
                        <Select value={industry} onValueChange={setIndustry}>
                            <SelectTrigger>
                                <SelectValue placeholder={t("ai.industryPlaceholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                {industries.map((ind) => (
                                    <SelectItem key={ind.value} value={ind.value}>
                                        {ind.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>{t("ai.styleLabel")}</Label>
                        <Select value={style} onValueChange={setStyle}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {styleKeys.map((s) => (
                                    <SelectItem key={s.value} value={s.value}>
                                        {t(s.labelKey)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>{t("ai.sectionsLabel")}</Label>
                        <div className="flex flex-wrap gap-2">
                            {sectionKeys.map((section) => (
                                <Badge
                                    key={section.value}
                                    variant={selectedSections.includes(section.value) ? "default" : "outline"}
                                    className="cursor-pointer select-none"
                                    role="button"
                                    tabIndex={0}
                                    aria-pressed={selectedSections.includes(section.value)}
                                    onClick={() => toggleSection(section.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault()
                                            toggleSection(section.value)
                                        }
                                    }}
                                >
                                    {t(section.labelKey)}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <Button
                        className="w-full"
                        size="lg"
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t("ai.generating")}
                            </>
                        ) : (
                            <>
                                <Wand2 className="mr-2 h-4 w-4" />
                                {t("ai.generate")}
                            </>
                        )}
                    </Button>

                    <div className="rounded-lg bg-muted p-4 text-sm">
                        <p className="font-medium mb-2">{t("ai.tips")}</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>{t("ai.tip1")}</li>
                            <li>{t("ai.tip2")}</li>
                            <li>{t("ai.tip3")}</li>
                        </ul>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
