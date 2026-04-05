import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { validatePuckContent, getDefaultPuckContent, PuckContent } from "@/lib/ai/validation"
import { rateLimit } from "@/lib/rateLimit"
import { validateCsrf, csrfErrorResponse } from "@/lib/csrf"
import { z } from "zod"

const generateSchema = z.object({
    prompt: z.string().min(1).max(2000),
    industry: z.string().max(100).optional(),
    style: z.enum(["modern", "classic", "minimal", "bold", "playful"]).optional(),
    sections: z.array(z.string()).optional(),
    provider: z.enum(["openai", "anthropic", "openrouter", "zhipu"]).optional().default("zhipu"),
})

// Supported AI providers
type AIProvider = "openai" | "anthropic" | "openrouter" | "zhipu"

const MAX_RESPONSE_SIZE = 100000
const AI_REQUEST_TIMEOUT = 30000

// System prompt for Puck JSON generation
const SYSTEM_PROMPT = `You are an expert landing page designer and developer.
Generate Puck-compatible JSON for landing pages based on user requirements.

Available Components:
1. Hero: A full-width hero section with title, subtitle, background image, and up to 2 buttons
   Props: title, subtitle, backgroundImage, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink

2. FeatureList: A section showcasing features with icons, titles, descriptions, and optional badges
   Props: title, subtitle, features[], columns (1-4)
   Features array items: icon, title, description, badge, badgeVariant ("default" | "secondary" | "destructive" | "outline")

3. ContactForm: A contact form with configurable fields
   Props: title, subtitle, submitButtonText, backgroundColor ("white" | "gray" | "slate" | "blue"), fields (object with boolean flags for: name, email, phone, company, subject, message)

4. Pricing: Pricing table with multiple tiers
   Props: title, subtitle, backgroundColor ("white" | "gray" | "slate" | "dark"), tiers[]
   Tier items: name, price, period, description, buttonText, popular (boolean), badge, features[] (with text and included boolean)

5. Testimonials: Customer testimonials/reviews
   Props: title, subtitle, backgroundColor ("white" | "gray" | "slate" | "dark"), columns (1-3), testimonials[]
   Testimonial items: name, role, company, content, rating (1-5), avatar

6. FAQ: Frequently asked questions accordion
   Props: title, subtitle, backgroundColor ("white" | "gray" | "slate" | "dark"), items[]
   FAQ items: question, answer

7. Stats: Statistics/numbers section
   Props: title, subtitle, backgroundColor ("gradient" | "white" | "gray" | "dark"), columns (2-4), stats[]
   Stat items: value, label, prefix, suffix

8. CTA: Call to action section
   Props: title, subtitle, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink, variant ("gradient" | "simple" | "dark" | "split"), showIcon (boolean)

9. Header: Navigation header with logo, links, and CTA
   Props: logo, logoText, links[] ({label, href}), ctaText, ctaLink, sticky (boolean), transparent (boolean)

10. Footer: Footer with columns, links, and social icons
    Props: logo, logoText, description, copyright, backgroundColor ("dark" | "white" | "gray"), columns[] ({title, links[] ({label, href})}), socialLinks[] ({platform: "twitter" | "facebook" | "instagram" | "linkedin" | "github" | "youtube", href})

Guidelines:
- Create responsive, conversion-optimized landing pages
- Use compelling copy and clear call-to-actions
- Follow modern design principles
- Include appropriate sections based on the request
- Use placeholder images from Unsplash for backgrounds
- Make content engaging and professional
- Support both LTR (left-to-right) and RTL (right-to-left) layouts

Output format:
Return a JSON object with this exact structure:
{
  "content": [
    {
      "type": "ComponentName",
      "props": { ...componentProps }
    }
  ],
  "root": {
    "type": "root",
    "props": {
      "title": "Page Title",
      "description": "Page description",
      "dir": "ltr" | "rtl",
      "lang": "en" | "he"
    }
  }
}

IMPORTANT:
- Use all available component types based on the request
- Follow the exact structure and prop names specified
- Ensure all props match the component schema
- Return valid JSON only`

// POST /api/ai/generate - Generate landing page content with AI
export async function POST(request: NextRequest) {
    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) return rateLimitResult;

    if (!validateCsrf(request)) {
        return csrfErrorResponse()
    }

    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            )
        }

        const body = await request.json()
        const validation = generateSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                { success: false, error: validation.error.issues[0]?.message || "Invalid input" },
                { status: 400 }
            )
        }

        const { prompt, industry, style, sections, provider = "zhipu" } = validation.data

        // Build the user prompt
        const userPrompt = buildUserPrompt(prompt, industry, style, sections)

        // Get AI response based on provider
        const result = await generateWithProvider(provider, userPrompt)

        return NextResponse.json({ success: true, data: result })
    } catch (error) {
        console.error("Error generating content:", error)
        return NextResponse.json(
            { success: false, error: "Failed to generate content" },
            { status: 500 }
        )
    }
}

function buildUserPrompt(
    prompt: string,
    industry?: string,
    style?: string,
    sections?: string[]
): string {
    let fullPrompt = `Create a landing page for: ${prompt}`

    if (industry) {
        fullPrompt += `\nIndustry: ${industry}`
    }

    if (style) {
        fullPrompt += `\nDesign style: ${style}`
    }

    if (sections && sections.length > 0) {
        fullPrompt += `\nInclude these sections: ${sections.join(", ")}`
    }

    return fullPrompt
}

async function generateWithProvider(
    provider: AIProvider,
    userPrompt: string
): Promise<PuckContent> {
    const openaiKey = process.env.OPENAI_API_KEY
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    const openrouterKey = process.env.OPENROUTER_API_KEY
    const zhipuKey = process.env.ZHIPU_API_KEY

    const hasAnyKey = openaiKey || anthropicKey || openrouterKey || zhipuKey

    if (!hasAnyKey) {
        console.warn("⚠️ No AI API keys configured. Set one of: OPENAI_API_KEY, ANTHROPIC_API_KEY, OPENROUTER_API_KEY, or ZHIPU_API_KEY")
        console.warn("⚠️ Falling back to demo response. AI generation will not work.")
        return generateDemoResponse(userPrompt)
    }

    if (provider === "zhipu" && zhipuKey) {
        return await generateWithZhipu(zhipuKey, userPrompt)
    }

    if (provider === "openrouter" && openrouterKey) {
        return await generateWithOpenRouter(openrouterKey, userPrompt)
    }

    if (provider === "openai" && openaiKey) {
        return await generateWithOpenAI(openaiKey, userPrompt)
    }

    if (provider === "anthropic" && anthropicKey) {
        return await generateWithAnthropic(anthropicKey, userPrompt)
    }

    console.warn(`⚠️ No API key configured for provider: ${provider}. Trying available providers...`)

    if (zhipuKey) {
        return await generateWithZhipu(zhipuKey, userPrompt)
    }

    if (openrouterKey) {
        return await generateWithOpenRouter(openrouterKey, userPrompt)
    }

    if (openaiKey) {
        return await generateWithOpenAI(openaiKey, userPrompt)
    }

    if (anthropicKey) {
        return await generateWithAnthropic(anthropicKey, userPrompt)
    }

    return generateDemoResponse(userPrompt)
}

async function generateWithOpenRouter(
    apiKey: string,
    userPrompt: string
): Promise<PuckContent> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT)

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
            },
            body: JSON.stringify({
                model: "anthropic/claude-3.5-sonnet",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userPrompt },
                ],
                response_format: { type: "json_object" },
            }),
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.statusText}`)
        }

        const contentLength = response.headers.get("content-length")
        if (contentLength && parseInt(contentLength) > MAX_RESPONSE_SIZE) {
            throw new Error("Response exceeds maximum allowed size")
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content

        if (!content) {
            throw new Error("No content returned from OpenRouter API")
        }

        if (content.length > MAX_RESPONSE_SIZE) {
            throw new Error("Response content exceeds maximum allowed size")
        }

        try {
            const parsedContent = JSON.parse(content)
            return validatePuckContent(parsedContent)
        } catch (error) {
            console.error("Failed to parse or validate OpenRouter response:", error)
            return getDefaultPuckContent(userPrompt)
        }
    } catch (error) {
        clearTimeout(timeoutId)
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("AI request timed out")
        }
        throw error
    }
}

async function generateWithOpenAI(
    apiKey: string,
    userPrompt: string
): Promise<PuckContent> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT)

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userPrompt },
                ],
                response_format: { type: "json_object" },
            }),
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`)
        }

        const contentLength = response.headers.get("content-length")
        if (contentLength && parseInt(contentLength) > MAX_RESPONSE_SIZE) {
            throw new Error("Response exceeds maximum allowed size")
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content

        if (!content) {
            throw new Error("No content returned from OpenAI API")
        }

        if (content.length > MAX_RESPONSE_SIZE) {
            throw new Error("Response content exceeds maximum allowed size")
        }

        try {
            const parsedContent = JSON.parse(content)
            return validatePuckContent(parsedContent)
        } catch (error) {
            console.error("Failed to parse or validate OpenAI response:", error)
            return getDefaultPuckContent(userPrompt)
        }
    } catch (error) {
        clearTimeout(timeoutId)
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("AI request timed out")
        }
        throw error
    }
}

async function generateWithAnthropic(
    apiKey: string,
    userPrompt: string
): Promise<PuckContent> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT)

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 4096,
                system: SYSTEM_PROMPT,
                messages: [
                    { role: "user", content: userPrompt },
                ],
            }),
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`Anthropic API error: ${response.statusText}`)
        }

        const contentLength = response.headers.get("content-length")
        if (contentLength && parseInt(contentLength) > MAX_RESPONSE_SIZE) {
            throw new Error("Response exceeds maximum allowed size")
        }

        const data = await response.json()
        const content = data.content?.[0]?.text

        if (!content) {
            throw new Error("No content returned from Anthropic API")
        }

        if (content.length > MAX_RESPONSE_SIZE) {
            throw new Error("Response content exceeds maximum allowed size")
        }

        try {
            const parsedContent = JSON.parse(content)
            return validatePuckContent(parsedContent)
        } catch (error) {
            console.error("Failed to parse or validate Anthropic response:", error)
            return getDefaultPuckContent(userPrompt)
        }
    } catch (error) {
        clearTimeout(timeoutId)
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("AI request timed out")
        }
        throw error
    }
}

async function generateWithZhipu(
    apiKey: string,
    userPrompt: string
): Promise<PuckContent> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT)

    try {
        const response = await fetch("https://api.z.ai/api/paas/v4/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "glm-4.7",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0.1,
                max_tokens: 8192,
                do_sample: true,
                response_format: {
                    type: "json_object"
                }
            }),
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error("Z.AI API error:", errorData)
            throw new Error(`Z.AI API error: ${response.statusText} - ${JSON.stringify(errorData)}`)
        }

        const contentLength = response.headers.get("content-length")
        if (contentLength && parseInt(contentLength) > MAX_RESPONSE_SIZE) {
            throw new Error("Response exceeds maximum allowed size")
        }

        const data = await response.json()
        
        const content = data.choices?.[0]?.message?.content

        if (!content) {
            throw new Error("No content returned from Z.AI API")
        }

        if (content.length > MAX_RESPONSE_SIZE) {
            throw new Error("Response content exceeds maximum allowed size")
        }

        try {
            const parsedContent = JSON.parse(content)
            return validatePuckContent(parsedContent)
        } catch (error) {
            console.error("Failed to parse or validate Z.AI response:", error)
            console.error("Raw content:", content)
            return getDefaultPuckContent(userPrompt)
        }
    } catch (error) {
        clearTimeout(timeoutId)
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("AI request timed out")
        }
        throw error
    }
}

function generateDemoResponse(prompt: string): PuckContent {
    // Return demo Puck content when no API keys are configured
    return getDefaultPuckContent(prompt)
}
