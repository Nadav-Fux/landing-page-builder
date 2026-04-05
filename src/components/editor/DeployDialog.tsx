"use client"

import { useState } from "react"
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
import { Badge } from "@/components/ui/badge"
import { Rocket, Loader2, ExternalLink, Check, Globe } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"

interface DeployDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    projectId: string
    projectTitle: string
}

const platforms = [
    {
        id: "vercel",
        name: "Vercel",
        descriptionKey: "deploy.vercelDesc",
        color: "bg-black text-white"
    },
    {
        id: "netlify",
        name: "Netlify",
        descriptionKey: "deploy.netlifyDesc",
        color: "bg-[#00AD9F] text-white"
    },
    {
        id: "custom",
        name: "Custom Domain",
        descriptionKey: "deploy.customDesc",
        color: "bg-blue-600 text-white"
    },
]

export function DeployDialog({
    isOpen,
    onOpenChange,
    projectId: _projectId,
    projectTitle,
}: DeployDialogProps) {
    const { t } = useLanguage()
    const [platform, setPlatform] = useState("vercel")
    const [customDomain, setCustomDomain] = useState("")
    const [isDeploying, setIsDeploying] = useState(false)
    const [deployedUrl, setDeployedUrl] = useState<string | null>(null)

    const handleDeploy = async () => {
        setIsDeploying(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 3000))

            const mockUrl = `https://${projectTitle.toLowerCase().replace(/\s+/g, '-')}.vercel.app`
            setDeployedUrl(mockUrl)

            toast.success(t("deploy.started"))
        } catch (error) {
            console.error("Deployment error:", error)
            toast.error(t("deploy.failed"))
        } finally {
            setIsDeploying(false)
        }
    }

    const resetAndClose = () => {
        setDeployedUrl(null)
        setPlatform("vercel")
        setCustomDomain("")
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={resetAndClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-primary" />
                        {t("deploy.title")}
                    </DialogTitle>
                    <DialogDescription>
                        {t("deploy.subtitle")}
                    </DialogDescription>
                </DialogHeader>

                {deployedUrl ? (
                    <div className="py-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                            <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{t("deploy.deployed")}</h3>
                        <p className="text-muted-foreground mb-4">{t("deploy.deployedDesc")}</p>
                        <div className="flex items-center justify-center gap-2 p-3 bg-muted rounded-lg">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a
                                href={deployedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-mono text-sm"
                            >
                                {deployedUrl}
                            </a>
                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 py-4">
                        <div className="space-y-3">
                            <Label>{t("deploy.selectPlatform")}</Label>
                            <div className="grid grid-cols-3 gap-3">
                                {platforms.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setPlatform(p.id)}
                                        className={`p-4 rounded-lg border-2 transition-all text-center ${platform === p.id
                                            ? "border-primary bg-primary/5"
                                            : "border-muted hover:border-muted-foreground/50"
                                            }`}
                                    >
                                        <Badge className={`${p.color} mb-2`}>{p.name}</Badge>
                                        <p className="text-xs text-muted-foreground">{t(p.descriptionKey)}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {platform === "custom" && (
                            <div className="space-y-2">
                                <Label htmlFor="domain">{t("deploy.customDomain")}</Label>
                                <Input
                                    id="domain"
                                    placeholder={t("deploy.domainPlaceholder")}
                                    value={customDomain}
                                    onChange={(e) => setCustomDomain(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    {t("deploy.dnsNote")}
                                </p>
                            </div>
                        )}

                        <div className="rounded-lg bg-muted p-4 text-sm">
                            <p className="font-medium mb-2">{t("deploy.whatNext")}</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>{t("deploy.step1")}</li>
                                <li>{t("deploy.step2")}</li>
                                <li>{t("deploy.step3")}</li>
                                <li>{t("deploy.step4")}</li>
                            </ul>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    {deployedUrl ? (
                        <Button onClick={resetAndClose}>
                            {t("deploy.close")}
                        </Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={resetAndClose}>
                                {t("deploy.cancel")}
                            </Button>
                            <Button
                                onClick={handleDeploy}
                                disabled={isDeploying || (platform === "custom" && !customDomain)}
                                className="gradient-bg"
                            >
                                {isDeploying ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t("deploy.deploying")}
                                    </>
                                ) : (
                                    <>
                                        <Rocket className="mr-2 h-4 w-4" />
                                        {t("deploy.deployNow")}
                                    </>
                                )}
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
