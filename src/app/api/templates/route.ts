import { NextRequest, NextResponse } from "next/server"
import { templates as puckTemplates } from "@/data/templates"

// Sample landing page templates (legacy HTML-based)
const templates = [
  {
    id: "saas-modern",
    name: "SaaS Modern",
    category: "SaaS",
    description: "Clean and modern SaaS product landing page with hero, features, and pricing",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    isPremium: false,
    rating: 4.8,
    downloads: 1250,
    tags: ["saas", "modern", "clean", "startup"],
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
      <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <div style="font-size: 3rem; margin-bottom: 16px;">⚡</div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Lightning Fast</h3>
        <p style="color: #64748b;">Deploy in seconds, not hours</p>
      </div>
      <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <div style="font-size: 3rem; margin-bottom: 16px;">🔒</div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Secure by Default</h3>
        <p style="color: #64748b;">Enterprise-grade security</p>
      </div>
      <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <div style="font-size: 3rem; margin-bottom: 16px;">📊</div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Analytics</h3>
        <p style="color: #64748b;">Real-time insights</p>
      </div>
      <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        <div style="font-size: 3rem; margin-bottom: 16px;">🌐</div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Global CDN</h3>
        <p style="color: #64748b;">Fast worldwide delivery</p>
      </div>
    </div>
  </div>
</section>

<section style="padding: 100px 20px; background: white;">
  <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
    <h2 style="font-size: 2.5rem; font-weight: 700; color: #1e293b; margin-bottom: 60px;">Simple, transparent pricing</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
      <div style="border: 2px solid #e2e8f0; border-radius: 16px; padding: 40px;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1e293b;">Starter</h3>
        <div style="font-size: 3rem; font-weight: 800; color: #667eea; margin: 24px 0;">$19<span style="font-size: 1rem; color: #64748b;">/mo</span></div>
        <ul style="list-style: none; padding: 0; margin-bottom: 32px; color: #64748b;">
          <li style="padding: 8px 0;">✓ 5 projects</li>
          <li style="padding: 8px 0;">✓ 10GB storage</li>
          <li style="padding: 8px 0;">✓ Email support</li>
        </ul>
        <button style="width: 100%; background: #f1f5f9; color: #1e293b; padding: 16px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Get Started</button>
      </div>
      <div style="border: 2px solid #667eea; border-radius: 16px; padding: 40px; position: relative;">
        <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #667eea; color: white; padding: 4px 16px; border-radius: 20px; font-size: 0.875rem;">Popular</div>
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1e293b;">Pro</h3>
        <div style="font-size: 3rem; font-weight: 800; color: #667eea; margin: 24px 0;">$49<span style="font-size: 1rem; color: #64748b;">/mo</span></div>
        <ul style="list-style: none; padding: 0; margin-bottom: 32px; color: #64748b;">
          <li style="padding: 8px 0;">✓ Unlimited projects</li>
          <li style="padding: 8px 0;">✓ 100GB storage</li>
          <li style="padding: 8px 0;">✓ Priority support</li>
        </ul>
        <button style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Get Started</button>
      </div>
      <div style="border: 2px solid #e2e8f0; border-radius: 16px; padding: 40px;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #1e293b;">Enterprise</h3>
        <div style="font-size: 3rem; font-weight: 800; color: #667eea; margin: 24px 0;">Custom</div>
        <ul style="list-style: none; padding: 0; margin-bottom: 32px; color: #64748b;">
          <li style="padding: 8px 0;">✓ Everything in Pro</li>
          <li style="padding: 8px 0;">✓ Unlimited storage</li>
          <li style="padding: 8px 0;">✓ Dedicated support</li>
        </ul>
        <button style="width: 100%; background: #f1f5f9; color: #1e293b; padding: 16px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Contact Sales</button>
      </div>
    </div>
  </div>
</section>
      `,
      css: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      `
    }
  },
  {
    id: "agency-dark",
    name: "Agency Dark",
    category: "Agency",
    description: "Bold dark-themed agency landing page with impressive portfolio section",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    isPremium: false,
    rating: 4.9,
    downloads: 890,
    tags: ["agency", "dark", "creative", "portfolio"],
    content: {
      html: `
<section style="min-height: 100vh; background: #0f0f0f; color: white; padding: 80px 20px; display: flex; align-items: center;">
  <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
    <p style="color: #a855f7; font-size: 1rem; font-weight: 600; letter-spacing: 2px; margin-bottom: 24px;">CREATIVE DIGITAL AGENCY</p>
    <h1 style="font-size: 5rem; font-weight: 900; margin-bottom: 24px; line-height: 1;">We Create<br><span style="background: linear-gradient(90deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Digital Experiences</span></h1>
    <p style="font-size: 1.25rem; color: #9ca3af; max-width: 600px; margin: 0 auto 48px; line-height: 1.6;">Award-winning agency helping brands tell their stories through innovative digital solutions.</p>
    <button style="background: linear-gradient(90deg, #a855f7, #ec4899); color: white; padding: 20px 48px; border: none; border-radius: 50px; font-size: 1.125rem; font-weight: 600; cursor: pointer;">View Our Work →</button>
  </div>
</section>

<section style="padding: 100px 20px; background: #0f0f0f;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="font-size: 3rem; font-weight: 800; color: white; margin-bottom: 60px; text-align: center;">Featured Projects</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;">
      <div style="background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); border-radius: 24px; padding: 48px; height: 400px; display: flex; flex-direction: column; justify-content: flex-end;">
        <p style="color: rgba(255,255,255,0.8); margin-bottom: 8px;">Brand Design</p>
        <h3 style="font-size: 2rem; font-weight: 700; color: white;">Nike Rebrand Campaign</h3>
      </div>
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); border-radius: 24px; padding: 48px; height: 400px; display: flex; flex-direction: column; justify-content: flex-end;">
        <p style="color: rgba(255,255,255,0.8); margin-bottom: 8px;">Web Development</p>
        <h3 style="font-size: 2rem; font-weight: 700; color: white;">Tesla Digital Platform</h3>
      </div>
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); border-radius: 24px; padding: 48px; height: 400px; display: flex; flex-direction: column; justify-content: flex-end;">
        <p style="color: rgba(255,255,255,0.8); margin-bottom: 8px;">Mobile App</p>
        <h3 style="font-size: 2rem; font-weight: 700; color: white;">Spotify Redesign</h3>
      </div>
      <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); border-radius: 24px; padding: 48px; height: 400px; display: flex; flex-direction: column; justify-content: flex-end;">
        <p style="color: rgba(255,255,255,0.8); margin-bottom: 8px;">Marketing</p>
        <h3 style="font-size: 2rem; font-weight: 700; color: white;">Apple Campaign</h3>
      </div>
    </div>
  </div>
</section>

<section style="padding: 100px 20px; background: #0f0f0f;">
  <div style="max-width: 800px; margin: 0 auto; text-align: center; border: 1px solid #333; border-radius: 32px; padding: 80px;">
    <h2 style="font-size: 3rem; font-weight: 800; color: white; margin-bottom: 24px;">Let's work together</h2>
    <p style="color: #9ca3af; font-size: 1.25rem; margin-bottom: 48px;">Have a project in mind? Let's discuss how we can help.</p>
    <button style="background: white; color: #0f0f0f; padding: 20px 48px; border: none; border-radius: 50px; font-size: 1.125rem; font-weight: 600; cursor: pointer;">Start a Project</button>
  </div>
</section>
      `,
      css: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f0f0f; }
      `
    }
  },
  {
    id: "startup-gradient",
    name: "Startup Launch",
    category: "Startup",
    description: "Vibrant gradient startup landing page with email capture and social proof",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    isPremium: false,
    rating: 4.7,
    downloads: 1563,
    tags: ["startup", "gradient", "launch", "waitlist"],
    content: {
      html: `
<section style="min-height: 100vh; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); color: white; padding: 80px 20px; display: flex; align-items: center; position: relative; overflow: hidden;">
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%);"></div>
  <div style="max-width: 800px; margin: 0 auto; text-align: center; position: relative; z-index: 1;">
    <div style="display: inline-block; background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.3); padding: 8px 20px; border-radius: 50px; margin-bottom: 32px;">
      <span style="color: #a5b4fc;">🚀 Now in public beta</span>
    </div>
    <h1 style="font-size: 4rem; font-weight: 800; margin-bottom: 24px; line-height: 1.1;">The future of<br><span style="background: linear-gradient(90deg, #6366f1, #ec4899, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">productivity</span> is here</h1>
    <p style="font-size: 1.25rem; color: #94a3b8; margin-bottom: 48px; line-height: 1.6;">Join 50,000+ early adopters who are transforming the way they work. Get early access and shape the future with us.</p>
    <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 24px;">
      <input type="email" placeholder="Enter your email" style="padding: 18px 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: white; font-size: 1rem; width: 300px;">
      <button style="background: linear-gradient(90deg, #6366f1, #8b5cf6); color: white; padding: 18px 32px; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer;">Get Early Access</button>
    </div>
    <p style="color: #64748b; font-size: 0.875rem;">✓ No credit card required ✓ 14-day free trial ✓ Cancel anytime</p>
  </div>
</section>

<section style="padding: 80px 20px; background: #0f172a;">
  <div style="max-width: 1000px; margin: 0 auto; text-align: center;">
    <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 32px; letter-spacing: 2px;">TRUSTED BY INNOVATIVE TEAMS AT</p>
    <div style="display: flex; justify-content: center; gap: 60px; flex-wrap: wrap; opacity: 0.5;">
      <span style="font-size: 1.5rem; color: white; font-weight: 700;">Google</span>
      <span style="font-size: 1.5rem; color: white; font-weight: 700;">Meta</span>
      <span style="font-size: 1.5rem; color: white; font-weight: 700;">Stripe</span>
      <span style="font-size: 1.5rem; color: white; font-weight: 700;">Notion</span>
      <span style="font-size: 1.5rem; color: white; font-weight: 700;">Figma</span>
    </div>
  </div>
</section>

<section style="padding: 100px 20px; background: #0f172a;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 60px;">
      <h2 style="font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 16px;">Why teams love us</h2>
      <p style="color: #94a3b8; font-size: 1.125rem;">Everything you need to supercharge your workflow</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05)); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 20px; padding: 32px;">
        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 1.5rem;">⚡</div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 12px;">10x Faster</h3>
        <p style="color: #94a3b8; line-height: 1.6;">Complete tasks in minutes that used to take hours.</p>
      </div>
      <div style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05)); border: 1px solid rgba(236, 72, 153, 0.2); border-radius: 20px; padding: 32px;">
        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #ec4899, #f43f5e); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 1.5rem;">🎯</div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 12px;">AI Powered</h3>
        <p style="color: #94a3b8; line-height: 1.6;">Smart suggestions that learn from your workflow.</p>
      </div>
      <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 20px; padding: 32px;">
        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #f59e0b, #f97316); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 1.5rem;">🔗</div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 12px;">Seamless Integrations</h3>
        <p style="color: #94a3b8; line-height: 1.6;">Connect with 100+ tools you already use.</p>
      </div>
    </div>
  </div>
</section>
      `,
      css: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f172a; }
        input::placeholder { color: #64748b; }
        input:focus { outline: none; border-color: #6366f1; }
      `
    }
  },
  {
    id: "ecommerce-minimal",
    name: "E-commerce Minimal",
    category: "E-commerce",
    description: "Clean minimal e-commerce product landing page with focus on conversion",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    isPremium: true,
    rating: 4.9,
    downloads: 2100,
    tags: ["ecommerce", "minimal", "product", "shop"],
    content: {
      html: `
<section style="min-height: 100vh; background: #ffffff; padding: 60px 20px; display: flex; align-items: center;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
    <div style="background: #f8f8f8; border-radius: 24px; padding: 60px; height: 600px; display: flex; align-items: center; justify-content: center;">
      <div style="text-align: center; color: #999;">Product Image</div>
    </div>
    <div>
      <p style="color: #10b981; font-size: 0.875rem; font-weight: 600; margin-bottom: 16px;">NEW ARRIVAL</p>
      <h1 style="font-size: 3rem; font-weight: 700; color: #111; margin-bottom: 16px; line-height: 1.1;">Premium Wireless Headphones</h1>
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
        <span style="font-size: 2rem; font-weight: 700; color: #111;">$299</span>
        <span style="font-size: 1.25rem; color: #999; text-decoration: line-through;">$399</span>
        <span style="background: #fef3c7; color: #d97706; padding: 4px 12px; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">25% OFF</span>
      </div>
      <p style="color: #666; font-size: 1.125rem; line-height: 1.7; margin-bottom: 32px;">Experience crystal-clear audio with our premium noise-canceling headphones. 40-hour battery life, premium comfort, and studio-quality sound.</p>
      <div style="display: flex; gap: 12px; margin-bottom: 32px;">
        <button style="flex: 1; background: #111; color: white; padding: 18px; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer;">Add to Cart</button>
        <button style="width: 60px; background: #f8f8f8; border: 1px solid #e5e5e5; border-radius: 12px; font-size: 1.25rem; cursor: pointer;">♡</button>
      </div>
      <div style="border-top: 1px solid #e5e5e5; padding-top: 24px;">
        <div style="display: flex; gap: 32px;">
          <div style="display: flex; align-items: center; gap: 8px; color: #666;"><span>🚚</span> Free Shipping</div>
          <div style="display: flex; align-items: center; gap: 8px; color: #666;"><span>↩️</span> 30-Day Returns</div>
          <div style="display: flex; align-items: center; gap: 8px; color: #666;"><span>🛡️</span> 2-Year Warranty</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section style="padding: 80px 20px; background: #f8f8f8;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="font-size: 2rem; font-weight: 700; color: #111; text-align: center; margin-bottom: 48px;">What customers say</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <div style="background: white; padding: 32px; border-radius: 16px;">
        <div style="color: #f59e0b; margin-bottom: 16px;">★★★★★</div>
        <p style="color: #666; margin-bottom: 16px; line-height: 1.6;">"Best headphones I've ever owned. The noise cancellation is incredible!"</p>
        <p style="font-weight: 600; color: #111;">— Sarah M.</p>
      </div>
      <div style="background: white; padding: 32px; border-radius: 16px;">
        <div style="color: #f59e0b; margin-bottom: 16px;">★★★★★</div>
        <p style="color: #666; margin-bottom: 16px; line-height: 1.6;">"Worth every penny. The sound quality is studio-grade."</p>
        <p style="font-weight: 600; color: #111;">— Mike R.</p>
      </div>
      <div style="background: white; padding: 32px; border-radius: 16px;">
        <div style="color: #f59e0b; margin-bottom: 16px;">★★★★★</div>
        <p style="color: #666; margin-bottom: 16px; line-height: 1.6;">"40 hours of battery life is a game changer for travel."</p>
        <p style="font-weight: 600; color: #111;">— Emily K.</p>
      </div>
    </div>
  </div>
</section>
      `,
      css: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      `
    }
  },
  {
    id: "portfolio-creative",
    name: "Portfolio Creative",
    category: "Portfolio",
    description: "Creative portfolio landing for designers and developers",
    thumbnail: "https://images.unsplash.com/photo-1545665277-5937489579f2?w=400&h=300&fit=crop",
    isPremium: false,
    rating: 4.6,
    downloads: 780,
    tags: ["portfolio", "creative", "designer", "developer"],
    content: {
      html: `
<section style="min-height: 100vh; background: #fafafa; padding: 100px 20px; display: flex; align-items: center;">
  <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;">
    <div>
      <p style="color: #666; font-size: 1.125rem; margin-bottom: 16px;">👋 Hello, I'm</p>
      <h1 style="font-size: 4rem; font-weight: 800; color: #111; margin-bottom: 24px; line-height: 1;">Alex Johnson</h1>
      <h2 style="font-size: 2rem; color: #666; font-weight: 400; margin-bottom: 24px;">Product Designer & Developer</h2>
      <p style="color: #888; font-size: 1.125rem; line-height: 1.7; margin-bottom: 32px;">I create beautiful, functional digital experiences that help businesses grow. 8+ years of experience in design and development.</p>
      <div style="display: flex; gap: 16px;">
        <button style="background: #111; color: white; padding: 16px 32px; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">View My Work</button>
        <button style="background: transparent; color: #111; padding: 16px 32px; border: 2px solid #111; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Contact Me</button>
      </div>
    </div>
    <div style="width: 400px; height: 400px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto;"></div>
  </div>
</section>

<section style="padding: 100px 20px; background: #111;">
  <div style="max-width: 1200px; margin: 0 auto;">
    <h2 style="font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 60px;">Selected Work</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;">
      <div style="background: #1a1a1a; border-radius: 16px; overflow: hidden;">
        <div style="height: 300px; background: linear-gradient(135deg, #667eea, #764ba2);"></div>
        <div style="padding: 24px;">
          <h3 style="font-size: 1.5rem; font-weight: 600; color: white; margin-bottom: 8px;">E-commerce Platform</h3>
          <p style="color: #888;">Design & Development</p>
        </div>
      </div>
      <div style="background: #1a1a1a; border-radius: 16px; overflow: hidden;">
        <div style="height: 300px; background: linear-gradient(135deg, #f59e0b, #ef4444);"></div>
        <div style="padding: 24px;">
          <h3 style="font-size: 1.5rem; font-weight: 600; color: white; margin-bottom: 8px;">Mobile Banking App</h3>
          <p style="color: #888;">UI/UX Design</p>
        </div>
      </div>
    </div>
  </div>
</section>
      `,
      css: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      `
    }
  }
]

// GET /api/templates - Get all templates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const type = searchParams.get("type") // "puck", "legacy", or "all"

    // Combine Puck templates with legacy templates
    const allTemplates: any[] = [
      // Add Puck templates (modern Puck JSON format)
      ...puckTemplates.map(t => ({
        ...t,
        type: "puck",
        isPremium: false,
        rating: 4.9,
        downloads: 0,
        tags: [t.category.toLowerCase()],
      })),
      // Add legacy templates (HTML/CSS format)
      ...templates.map(t => ({
        ...t,
        type: "legacy",
      })),
    ]

    let filteredTemplates = [...allTemplates]

    // Filter by template type
    if (type && type !== "all") {
      filteredTemplates = filteredTemplates.filter(t => t.type === type)
    }

    // Filter by category
    if (category && category !== "all") {
      filteredTemplates = filteredTemplates.filter(
        t => t.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      filteredTemplates = filteredTemplates.filter(
        t => t.name.toLowerCase().includes(searchLower) ||
          t.description.toLowerCase().includes(searchLower) ||
          (t.tags && t.tags.some((tag: string) => tag.includes(searchLower)))
      )
    }

    // Return without the full content/puckData (for listing)
    const templatesForListing = filteredTemplates.map(({ content, puckData, ...rest }) => rest)

    return NextResponse.json({ success: true, data: templatesForListing })
  } catch (error) {
    console.error("Error fetching templates:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch templates" },
      { status: 500 }
    )
  }
}

