"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Smartphone, Tablet, Monitor, ExternalLink, Code } from "lucide-react"
import Link from "next/link"
import DOMPurify from "dompurify"
import { useLanguage } from "@/components/language-provider"

const MAX_SIZE = 10 * 1024 * 1024

export default function PreviewPage() {
    const { t } = useLanguage()
    const searchParams = useSearchParams()
    const [html, setHtml] = useState("")
    const [css, setCss] = useState("")
    const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop")
    const [showCode, setShowCode] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedHtml = searchParams.get("html") || localStorage.getItem("preview_html") || ""
        const storedCss = searchParams.get("css") || localStorage.getItem("preview_css") || ""

        const decodedHtml = decodeURIComponent(storedHtml)
        const decodedCss = decodeURIComponent(storedCss)

        if (decodedHtml.length > MAX_SIZE || decodedCss.length > MAX_SIZE) {
            setError("Content too large")
            setIsLoading(false)
            return
        }

        const sanitizedHtml = typeof window !== "undefined"
            ? DOMPurify.sanitize(decodedHtml)
            : decodedHtml
        const sanitizedCss = decodedCss

        setHtml(sanitizedHtml)
        setCss(sanitizedCss)
        setIsLoading(false)
    }, [searchParams])

    const deviceWidths = {
        desktop: "100%",
        tablet: "768px",
        mobile: "375px",
    }

    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; }
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>`

    const openInNewTab = () => {
        const blob = new Blob([fullHtml], { type: "text/html" })
        const url = URL.createObjectURL(blob)

        const newTab = window.open(url, "_blank")

        if (newTab) {
            newTab.onload = () => {
                URL.revokeObjectURL(url)
            }
            setTimeout(() => {
                if (!newTab.closed) {
                    URL.revokeObjectURL(url)
                }
            }, 10000)
        } else {
            URL.revokeObjectURL(url)
        }
    }

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
        )
    }

    return (
        <div className="h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900">
            {error ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-xl text-red-600 font-semibold">{t("preview.contentTooLarge")}</h1>
                        <p className="text-neutral-600 dark:text-neutral-400 mt-2">{t("preview.contentTooLargeDesc")}</p>
                        <Link href="/dashboard" className="mt-4 inline-block">
                            <Button>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {t("editor.back")}
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <header className="h-14 border-b bg-white dark:bg-neutral-800 flex items-center justify-between px-4">
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    {t("editor.back")}
                                </Button>
                            </Link>

                            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700" />

                            <div className="flex items-center space-x-1">
                                <Button
                                    variant={deviceView === "desktop" ? "default" : "ghost"}
                                    size="icon"
                                    onClick={() => setDeviceView("desktop")}
                                    aria-label="Desktop view"
                                >
                                    <Monitor className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={deviceView === "tablet" ? "default" : "ghost"}
                                    size="icon"
                                    onClick={() => setDeviceView("tablet")}
                                    aria-label="Tablet view"
                                >
                                    <Tablet className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={deviceView === "mobile" ? "default" : "ghost"}
                                    size="icon"
                                    onClick={() => setDeviceView("mobile")}
                                    aria-label="Mobile view"
                                >
                                    <Smartphone className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowCode(!showCode)}
                            >
                                <Code className="h-4 w-4 mr-2" />
                                {showCode ? t("preview.hideCode") : t("preview.viewCode")}
                            </Button>
                            <Button
                                size="sm"
                                onClick={openInNewTab}
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {t("preview.openInNewTab")}
                            </Button>
                        </div>
                    </header>

                    <div className="flex-1 overflow-auto p-4 flex justify-center">
                        {showCode ? (
                            <div className="w-full max-w-4xl">
                                <pre className="bg-neutral-900 text-green-400 p-4 rounded-lg overflow-auto text-sm font-mono">
                                    {fullHtml}
                                </pre>
                            </div>
                        ) : (
                            <div
                                className="bg-white rounded-lg shadow-lg overflow-auto transition-all duration-300"
                                style={{
                                    width: deviceWidths[deviceView],
                                    maxWidth: "100%",
                                }}
                            >
                                <iframe
                                    srcDoc={fullHtml}
                                    sandbox="allow-same-origin allow-forms"
                                    title="Preview"
                                    className="w-full h-full min-h-[600px] border-0"
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
