import { Data } from "@measured/puck"

export function escapeHtml(text: string | undefined): string {
    if (!text) return ''
    const str = String(text)
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    }
    return str.replace(/[&<>"']/g, (m) => map[m] || '')
}

export function sanitizeAttr(text: string | undefined): string {
    if (!text) return ''
    return escapeHtml(text).replace(/["'&<>]/g, '')
}

export function renderPuckDataToHTML(data: Data, pageTitle: string = "Landing Page") {
    const { content } = data

    const renderComponent = (component: any) => {
        switch (component.type) {
            case "Hero":
                return `<section style="min-height: 80vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 2rem;"><div><h1 style="font-size: 3rem; margin-bottom: 1rem;">${escapeHtml(component.props.title) || "Welcome"}</h1><p style="font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem;">${escapeHtml(component.props.subtitle)}</p>${component.props.primaryButtonText ? `<button style="background: white; color: #667eea; padding: 1rem 2rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">${escapeHtml(component.props.primaryButtonText)}</button>` : ""}</div></section>`
            case "FeatureList":
                const features = component.props.features || []
                const columns = component.props.columns || 3
                return `<section style="padding: 4rem 2rem; background: #f9fafb;"><div style="max-width: 1200px; margin: 0 auto; text-align: center;"><h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: #1f2937;">${escapeHtml(component.props.title) || "Features"}</h2><div style="display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 2rem;">${features.map((feature: any) => `<div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><div style="font-size: 2rem; margin-bottom: 1rem;">${escapeHtml(feature.icon) || "⭐"}</div><h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${escapeHtml(feature.title)}</h3><p style="color: #6b7280;">${escapeHtml(feature.description)}</p></div>`).join("")}</div></div></section>`
            case "Header":
                return `<header style="position: sticky; top: 0; z-index: 50; background: white; border-bottom: 1px solid #e5e7eb;"><div style="max-width: 1280px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;"><span style="font-size: 1.5rem; font-weight: 700; background: linear-gradient(135deg, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${escapeHtml(component.props.logoText) || "PageCraft"}</span><nav style="display: flex; gap: 2rem;">${(component.props.links || []).map((link: any) => `<a href="${sanitizeAttr(link.href)}" style="color: #4b5563; text-decoration: none;">${escapeHtml(link.label)}</a>`).join('')}</nav></div></header>`
            case "Footer":
                return `<footer style="padding: 3rem 2rem; background: #f3f4f6; text-align: center;"><p style="color: #6b7280;">© ${new Date().getFullYear()} PageCraft. All rights reserved.</p></footer>`
            case "ContactForm": {
                const fields = component.props.fields || { name: true, email: true, message: true }
                const fieldInputs = []
                if (fields.name) fieldInputs.push(`<input type="text" placeholder="Name" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem;">`)
                if (fields.email) fieldInputs.push(`<input type="email" placeholder="Email" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem;">`)
                if (fields.phone) fieldInputs.push(`<input type="tel" placeholder="Phone" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem;">`)
                if (fields.company) fieldInputs.push(`<input type="text" placeholder="Company" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem;">`)
                if (fields.subject) fieldInputs.push(`<input type="text" placeholder="Subject" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem;">`)
                if (fields.message) fieldInputs.push(`<textarea placeholder="Message" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 1rem; min-height: 120px;"></textarea>`)
                return `<section style="padding: 4rem 2rem; background: ${component.props.backgroundColor === "gray" ? "#f9fafb" : component.props.backgroundColor === "slate" ? "#f1f5f9" : component.props.backgroundColor === "blue" ? "#eff6ff" : "white"};"><div style="max-width: 600px; margin: 0 auto;"><h2 style="font-size: 2rem; margin-bottom: 0.5rem; color: #1f2937;">${escapeHtml(component.props.title) || "Contact Us"}</h2><p style="color: #6b7280; margin-bottom: 2rem;">${escapeHtml(component.props.subtitle) || ""}</p><form>${fieldInputs.join("")}<button type="submit" style="width: 100%; background: #3b82f6; color: white; padding: 0.75rem; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">${escapeHtml(component.props.submitButtonText) || "Send Message"}</button></form></div></section>`
            }
            case "Pricing": {
                const tiers = component.props.tiers || []
                return `<section style="padding: 4rem 2rem; background: ${component.props.backgroundColor === "gray" ? "#f9fafb" : component.props.backgroundColor === "slate" ? "#f1f5f9" : component.props.backgroundColor === "dark" ? "#1f2937" : "white"};"><div style="max-width: 1200px; margin: 0 auto; text-align: center;"><h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: ${component.props.backgroundColor === "dark" ? "white" : "#1f2937"};">${escapeHtml(component.props.title) || "Pricing"}</h2><p style="color: ${component.props.backgroundColor === "dark" ? "#9ca3af" : "#6b7280"}; margin-bottom: 3rem;">${escapeHtml(component.props.subtitle) || ""}</p><div style="display: grid; grid-template-columns: repeat(${tiers.length || 3}, 1fr); gap: 2rem;">${tiers.map((tier: any) => `<div style="background: ${component.props.backgroundColor === "dark" ? "#374151" : "white"}; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); ${tier.popular ? "border: 2px solid #3b82f6; position: relative;" : ""}">${tier.badge ? `<span style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #3b82f6; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.875rem;">${escapeHtml(tier.badge)}</span>` : ""}<h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: ${component.props.backgroundColor === "dark" ? "white" : "#1f2937"};">${escapeHtml(tier.name)}</h3><div style="font-size: 2.5rem; font-weight: 700; color: ${component.props.backgroundColor === "dark" ? "white" : "#1f2937"};">${escapeHtml(tier.price)}<span style="font-size: 1rem; color: #6b7280;">${escapeHtml(tier.period || "")}</span></div><p style="color: #6b7280; margin: 1rem 0;">${escapeHtml(tier.description) || ""}</p><ul style="list-style: none; padding: 0; margin: 1.5rem 0; text-align: left;">${(tier.features || []).map((f: any) => `<li style="padding: 0.5rem 0; color: ${component.props.backgroundColor === "dark" ? "#d1d5db" : "#4b5563"};">${f.included !== false ? "✓" : "✗"} ${escapeHtml(f.text)}</li>`).join("")}</ul><button style="width: 100%; background: ${tier.popular ? "#3b82f6" : "#f3f4f6"}; color: ${tier.popular ? "white" : "#1f2937"}; padding: 0.75rem; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem;">${escapeHtml(tier.buttonText) || "Get Started"}</button></div>`).join("")}</div></div></section>`
            }
            case "Testimonials": {
                const testimonials = component.props.testimonials || []
                const cols = component.props.columns || 3
                return `<section style="padding: 4rem 2rem; background: ${component.props.backgroundColor === "gray" ? "#f9fafb" : component.props.backgroundColor === "slate" ? "#f1f5f9" : component.props.backgroundColor === "dark" ? "#1f2937" : "white"};"><div style="max-width: 1200px; margin: 0 auto; text-align: center;"><h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: ${component.props.backgroundColor === "dark" ? "white" : "#1f2937"};">${escapeHtml(component.props.title) || "Testimonials"}</h2><p style="color: ${component.props.backgroundColor === "dark" ? "#9ca3af" : "#6b7280"}; margin-bottom: 3rem;">${escapeHtml(component.props.subtitle) || ""}</p><div style="display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: 2rem;">${testimonials.map((t: any) => `<div style="background: ${component.props.backgroundColor === "dark" ? "#374151" : "white"}; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: left;"><div style="color: #f59e0b; margin-bottom: 1rem;">${"★".repeat(t.rating || 5)}${"☆".repeat(5 - (t.rating || 5))}</div><p style="color: ${component.props.backgroundColor === "dark" ? "#d1d5db" : "#4b5563"}; margin-bottom: 1.5rem; font-style: italic;">${escapeHtml(t.content)}</p><div style="display: flex; align-items: center; gap: 1rem;"><div style="width: 40px; height: 40px; border-radius: 50%; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600;">${(t.name || "?").charAt(0).toUpperCase()}</div><div><strong style="color: ${component.props.backgroundColor === "dark" ? "white" : "#1f2937"};">${escapeHtml(t.name)}</strong><p style="color: #6b7280; font-size: 0.875rem;">${escapeHtml(t.role)}${t.company ? ` at ${escapeHtml(t.company)}` : ""}</p></div></div></div>`).join("")}</div></div></section>`
            }
            case "FAQ": {
                const items = component.props.items || []
                return `<section style="padding: 4rem 2rem; background: ${component.props.backgroundColor === "gray" ? "#f9fafb" : component.props.backgroundColor === "slate" ? "#f1f5f9" : component.props.backgroundColor === "dark" ? "#1f2937" : "white"};"><div style="max-width: 800px; margin: 0 auto; text-align: center;"><h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: ${component.props.backgroundColor === "dark" ? "white" : "#1f2937"};">${escapeHtml(component.props.title) || "FAQ"}</h2><p style="color: ${component.props.backgroundColor === "dark" ? "#9ca3af" : "#6b7280"}; margin-bottom: 3rem;">${escapeHtml(component.props.subtitle) || ""}</p><div style="text-align: left;">${items.map((item: any, i: number) => `<details style="border-bottom: 1px solid #e5e7eb; padding: 1rem 0;${i === 0 ? " open;" : ""}"><summary style="font-weight: 600; color: ${component.props.backgroundColor === "dark" ? "white" : "#1f2937"}; cursor: pointer; padding: 0.5rem 0; list-style: none; display: flex; justify-content: space-between; align-items: center;">${escapeHtml(item.question)}<span style="font-size: 1.5rem; color: #6b7280;">+</span></summary><p style="color: #6b7280; padding: 0.5rem 0 1rem;">${escapeHtml(item.answer)}</p></details>`).join("")}</div></div></section>`
            }
            case "Stats": {
                const stats = component.props.stats || []
                const cols = component.props.columns || 4
                const bg = component.props.backgroundColor || "gradient"
                const bgStyle = bg === "gradient" ? "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;" : bg === "dark" ? "background: #1f2937; color: white;" : bg === "gray" ? "background: #f9fafb; color: #1f2937;" : "background: white; color: #1f2937;"
                return `<section style="padding: 4rem 2rem; ${bgStyle}"><div style="max-width: 1200px; margin: 0 auto; text-align: center;">${component.props.title ? `<h2 style="font-size: 2.5rem; margin-bottom: 1rem;">${escapeHtml(component.props.title)}</h2>` : ""}${component.props.subtitle ? `<p style="opacity: 0.8; margin-bottom: 3rem;">${escapeHtml(component.props.subtitle)}</p>` : ""}<div style="display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: 2rem;">${stats.map((stat: any) => `<div><div style="font-size: 3rem; font-weight: 700;">${escapeHtml(stat.prefix)}${escapeHtml(stat.value)}${escapeHtml(stat.suffix)}</div><p style="opacity: 0.8; margin-top: 0.5rem;">${escapeHtml(stat.label)}</p></div>`).join("")}</div></div></section>`
            }
            case "CTA": {
                const variant = component.props.variant || "gradient"
                const ctaBg = variant === "gradient" ? "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;" : variant === "dark" ? "background: #1f2937; color: white;" : variant === "split" ? "background: #f9fafb; color: #1f2937;" : "background: white; color: #1f2937;"
                return `<section style="padding: 4rem 2rem; text-align: center; ${ctaBg}"><div style="max-width: 800px; margin: 0 auto;">${component.props.showIcon && variant === "gradient" ? `<div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>` : ""}<h2 style="font-size: 2.5rem; margin-bottom: 1rem;">${escapeHtml(component.props.title) || "Ready to Get Started?"}</h2><p style="opacity: 0.9; margin-bottom: 2rem; font-size: 1.125rem;">${escapeHtml(component.props.subtitle) || ""}</p><div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">${component.props.primaryButtonText ? `<a href="${sanitizeAttr(component.props.primaryButtonLink) || "#"}" style="background: ${variant === "gradient" ? "white" : "#3b82f6"}; color: ${variant === "gradient" ? "#667eea" : "white"}; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600;">${escapeHtml(component.props.primaryButtonText)}</a>` : ""}${component.props.secondaryButtonText ? `<a href="${sanitizeAttr(component.props.secondaryButtonLink) || "#"}" style="background: transparent; color: inherit; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; border: 2px solid currentColor;">${escapeHtml(component.props.secondaryButtonText)}</a>` : ""}</div></div></section>`
            }
            default:
                return `<div style="padding: 2rem; background: #fef3c7;">Unknown component: ${escapeHtml(component.type)}</div>`
        }
    }

    const bodyContent = content.map(renderComponent).join("\n")

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(pageTitle)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>*{ margin: 0; padding: 0; box-sizing: border-box; }body{ font-family: 'Inter', sans-serif; }</style>
</head>
<body>${bodyContent}</body>
</html>`
}
