import { NextRequest, NextResponse } from "next/server"

// Import templates from main route (in production, this would be from DB)
const templates: Record<string, any> = {
    "saas-modern": {
        id: "saas-modern",
        name: "SaaS Modern",
        category: "SaaS",
        description: "Clean and modern SaaS product landing page with hero, features, and pricing",
        content: {
            html: `
<section style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 20px; display: flex; align-items: center;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
    <div>
      <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 24px; line-height: 1.1;">Build faster with our platform</h1>
      <p style="font-size: 1.25rem; opacity: 0.9; margin-bottom: 32px; line-height: 1.6;">The all-in-one solution for modern teams. Ship products faster, collaborate better, and scale with confidence.</p>
      <div style="display: flex; gap: 16px;">
        <button style="background: white; color: #667eea; padding: 16px 32px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Start Free Trial</button>
        <button style="background: transparent; color: white; padding: 16px 32px; border: 2px solid white; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Watch Demo</button>
      </div>
    </div>
    <div style="background: rgba(255,255,255,0.1); border-radius: 16px; padding: 40px; backdrop-filter: blur(10px);">
      <div style="background: white; border-radius: 12px; height: 300px; display: flex; align-items: center; justify-content: center; color: #667eea; font-size: 1.25rem;">Product Preview</div>
    </div>
  </div>
</section>
<section style="padding: 100px 20px; background: #f8fafc;">
  <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
    <h2 style="font-size: 2.5rem; font-weight: 700; color: #1e293b; margin-bottom: 16px;">Trusted by 10,000+ teams</h2>
    <p style="color: #64748b; font-size: 1.125rem; margin-bottom: 60px;">From startups to Fortune 500 companies</p>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px;">
      <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);"><div style="font-size: 3rem; margin-bottom: 16px;">⚡</div><h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Lightning Fast</h3><p style="color: #64748b;">Deploy in seconds</p></div>
      <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);"><div style="font-size: 3rem; margin-bottom: 16px;">🔒</div><h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Secure</h3><p style="color: #64748b;">Enterprise-grade</p></div>
      <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);"><div style="font-size: 3rem; margin-bottom: 16px;">📊</div><h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Analytics</h3><p style="color: #64748b;">Real-time insights</p></div>
      <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);"><div style="font-size: 3rem; margin-bottom: 16px;">🌐</div><h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Global CDN</h3><p style="color: #64748b;">Fast worldwide</p></div>
    </div>
  </div>
</section>
      `,
            css: `* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Inter', sans-serif; }`
        }
    },
    "agency-dark": {
        id: "agency-dark",
        name: "Agency Dark",
        category: "Agency",
        content: {
            html: `
<section style="min-height: 100vh; background: #0f0f0f; color: white; padding: 80px 20px; display: flex; align-items: center;">
  <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
    <p style="color: #a855f7; font-size: 1rem; font-weight: 600; letter-spacing: 2px; margin-bottom: 24px;">CREATIVE DIGITAL AGENCY</p>
    <h1 style="font-size: 5rem; font-weight: 900; margin-bottom: 24px; line-height: 1;">We Create<br><span style="background: linear-gradient(90deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Digital Experiences</span></h1>
    <p style="font-size: 1.25rem; color: #9ca3af; max-width: 600px; margin: 0 auto 48px;">Award-winning agency helping brands tell their stories.</p>
    <button style="background: linear-gradient(90deg, #a855f7, #ec4899); color: white; padding: 20px 48px; border: none; border-radius: 50px; font-size: 1.125rem; font-weight: 600; cursor: pointer;">View Our Work →</button>
  </div>
</section>
      `,
            css: `* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Inter', sans-serif; background: #0f0f0f; }`
        }
    },
    "startup-gradient": {
        id: "startup-gradient",
        name: "Startup Launch",
        category: "Startup",
        content: {
            html: `
<section style="min-height: 100vh; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); color: white; padding: 80px 20px; display: flex; align-items: center;">
  <div style="max-width: 800px; margin: 0 auto; text-align: center;">
    <div style="display: inline-block; background: rgba(99, 102, 241, 0.2); padding: 8px 20px; border-radius: 50px; margin-bottom: 32px;"><span style="color: #a5b4fc;">🚀 Now in public beta</span></div>
    <h1 style="font-size: 4rem; font-weight: 800; margin-bottom: 24px; line-height: 1.1;">The future of<br><span style="background: linear-gradient(90deg, #6366f1, #ec4899, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">productivity</span></h1>
    <p style="font-size: 1.25rem; color: #94a3b8; margin-bottom: 48px;">Join 50,000+ early adopters. Get early access now.</p>
    <div style="display: flex; gap: 12px; justify-content: center;">
      <input type="email" placeholder="Enter your email" style="padding: 18px 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: white; width: 300px;">
      <button style="background: linear-gradient(90deg, #6366f1, #8b5cf6); color: white; padding: 18px 32px; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">Get Access</button>
    </div>
  </div>
</section>
      `,
            css: `* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Inter', sans-serif; background: #0f172a; } input::placeholder { color: #64748b; }`
        }
    },
    "ecommerce-minimal": {
        id: "ecommerce-minimal",
        name: "E-commerce Minimal",
        category: "E-commerce",
        content: {
            html: `
<section style="min-height: 100vh; background: #ffffff; padding: 60px 20px; display: flex; align-items: center;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
    <div style="background: #f8f8f8; border-radius: 24px; padding: 60px; height: 500px; display: flex; align-items: center; justify-content: center;"><div style="color: #999;">Product Image</div></div>
    <div>
      <p style="color: #10b981; font-size: 0.875rem; font-weight: 600; margin-bottom: 16px;">NEW ARRIVAL</p>
      <h1 style="font-size: 3rem; font-weight: 700; color: #111; margin-bottom: 16px;">Premium Wireless Headphones</h1>
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;"><span style="font-size: 2rem; font-weight: 700; color: #111;">$299</span><span style="font-size: 1.25rem; color: #999; text-decoration: line-through;">$399</span></div>
      <p style="color: #666; font-size: 1.125rem; line-height: 1.7; margin-bottom: 32px;">Crystal-clear audio with premium noise-canceling. 40-hour battery life.</p>
      <button style="width: 100%; background: #111; color: white; padding: 18px; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer;">Add to Cart - $299</button>
    </div>
  </div>
</section>
      `,
            css: `* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Inter', sans-serif; }`
        }
    },
    "portfolio-creative": {
        id: "portfolio-creative",
        name: "Portfolio Creative",
        category: "Portfolio",
        content: {
            html: `
<section style="min-height: 100vh; background: #fafafa; padding: 100px 20px; display: flex; align-items: center;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
    <div>
      <p style="color: #666; font-size: 1.125rem; margin-bottom: 16px;">👋 Hello, I'm</p>
      <h1 style="font-size: 4rem; font-weight: 800; color: #111; margin-bottom: 24px;">Alex Johnson</h1>
      <h2 style="font-size: 2rem; color: #666; font-weight: 400; margin-bottom: 24px;">Product Designer & Developer</h2>
      <p style="color: #888; font-size: 1.125rem; line-height: 1.7; margin-bottom: 32px;">I create beautiful digital experiences. 8+ years of experience.</p>
      <div style="display: flex; gap: 16px;">
        <button style="background: #111; color: white; padding: 16px 32px; border: none; border-radius: 8px; font-weight: 600;">View My Work</button>
        <button style="background: transparent; color: #111; padding: 16px 32px; border: 2px solid #111; border-radius: 8px; font-weight: 600;">Contact Me</button>
      </div>
    </div>
    <div style="width: 400px; height: 400px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto;"></div>
  </div>
</section>
      `,
            css: `* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: 'Inter', sans-serif; }`
        }
    }
}

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET /api/templates/[id] - Get a single template with full content
export async function GET(_request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const template = templates[id]

        if (!template) {
            return NextResponse.json(
                { error: "Template not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(template)
    } catch (error) {
        console.error("Error fetching template:", error)
        return NextResponse.json(
            { error: "Failed to fetch template" },
            { status: 500 }
        )
    }
}
