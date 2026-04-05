"use client"

import { useEffect, useRef } from "react"

export default function LandingShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      angle: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 2
        this.speedY = (Math.random() - 0.5) * 2
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`
        this.angle = Math.random() * Math.PI * 2
      }

      update() {
        this.angle += 0.02
        this.x += this.speedX + Math.sin(this.angle) * 0.5
        this.y += this.speedY + Math.cos(this.angle) * 0.5

        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let animationId: number

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 20, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 200, 255, ${1 - distance / 150})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0a0a14", overflow: "hidden" }}>
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
      />

      {/* Navigation */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "20px 50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.05)"
      }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
          NEXUS<span style={{ color: "#00d4ff" }}>AI</span>
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          {["Features", "Pricing", "About", "Contact"].map((item) => (
            <a key={item} href="#" style={{
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.3s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00d4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              {item}
            </a>
          ))}
        </div>
        <button style={{
          padding: "12px 28px",
          background: "linear-gradient(135deg, #00d4ff, #7b2ff7)",
          border: "none",
          borderRadius: "30px",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "transform 0.3s, box-shadow 0.3s"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)"
          e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.5)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"
          e.currentTarget.style.boxShadow = "none"
        }}
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px"
      }}>
        {/* Badge */}
        <div style={{
          padding: "10px 25px",
          background: "rgba(0,212,255,0.1)",
          border: "1px solid rgba(0,212,255,0.3)",
          borderRadius: "30px",
          marginBottom: "30px",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span style={{
            width: "8px",
            height: "8px",
            background: "#00ff88",
            borderRadius: "50%",
            animation: "pulse 2s infinite"
          }} />
          <span style={{ color: "#00d4ff", fontSize: "14px" }}>Now in Public Beta</span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: "clamp(48px, 10vw, 100px)",
          fontWeight: "900",
          color: "white",
          lineHeight: "1.1",
          marginBottom: "30px",
          background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #7b2ff7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          The Future of
          <br />
          AI Automation
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "clamp(18px, 2vw, 24px)",
          color: "rgba(255,255,255,0.6)",
          maxWidth: "700px",
          marginBottom: "50px",
          lineHeight: "1.6"
        }}>
          Transform your workflow with intelligent automation that learns,
          adapts, and evolves. Join 50,000+ companies building the future.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{
            padding: "18px 45px",
            fontSize: "18px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #00d4ff, #7b2ff7)",
            border: "none",
            borderRadius: "50px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "transform 0.3s, box-shadow 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)"
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,212,255,0.4)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "none"
          }}
          >
            Start Free Trial
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button style={{
            padding: "18px 45px",
            fontSize: "18px",
            fontWeight: "bold",
            background: "transparent",
            border: "2px solid rgba(255,255,255,0.2)",
            borderRadius: "50px",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#00d4ff"
            e.currentTarget.style.background = "rgba(0,212,255,0.1)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
            e.currentTarget.style.background = "transparent"
          }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          gap: "60px",
          marginTop: "80px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {[
            { value: "50K+", label: "Active Users" },
            { value: "99.9%", label: "Uptime" },
            { value: "500M+", label: "Tasks Automated" },
            { value: "4.9", label: "App Rating" }
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "white" }}>{stat.value}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginTop: "5px" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Cards Section */}
      <section style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 50px",
        background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.05))"
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "48px",
          fontWeight: "bold",
          color: "white",
          marginBottom: "60px"
        }}>
          Trusted by Industry Leaders
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {[
            { title: "Google", color: "#4285F4" },
            { title: "Microsoft", color: "#00A4EF" },
            { title: "Amazon", color: "#FF9900" },
            { title: "Meta", color: "#0668E1" },
            { title: "Stripe", color: "#635BFF" }
          ].map((company) => (
            <div key={company.title} style={{
              padding: "30px 50px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              transition: "transform 0.3s, background 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)"
              e.currentTarget.style.background = "rgba(255,255,255,0.06)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.background = "rgba(255,255,255,0.03)"
            }}
            >
              <span style={{ fontSize: "24px", fontWeight: "bold", color: company.color }}>
                {company.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 50px"
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "48px",
          fontWeight: "bold",
          color: "white",
          marginBottom: "20px"
        }}>
          Simple Pricing
        </h2>
        <p style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.6)",
          fontSize: "18px",
          marginBottom: "60px"
        }}>
          Choose the plan that works for you
        </p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {[
            { name: "Starter", price: "$0", features: ["5 automations", "100 tasks/month", "Basic support"] },
            { name: "Pro", price: "$49", popular: true, features: ["Unlimited automations", "10K tasks/month", "Priority support", "Advanced analytics"] },
            { name: "Enterprise", price: "Custom", features: ["Everything in Pro", "Custom integrations", "Dedicated account manager", "SLA guarantee"] }
          ].map((plan) => (
            <div key={plan.name} style={{
              padding: "40px",
              background: plan.popular 
                ? "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(123,47,247,0.1))"
                : "rgba(255,255,255,0.03)",
              border: plan.popular ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px",
              width: "320px",
              transition: "transform 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
            >
              {plan.popular && (
                <div style={{
                  display: "inline-block",
                  padding: "5px 15px",
                  background: "linear-gradient(135deg, #00d4ff, #7b2ff7)",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "20px"
                }}>
                  Most Popular
                </div>
              )}
              <h3 style={{ color: "white", fontSize: "24px", marginBottom: "10px" }}>{plan.name}</h3>
              <div style={{ color: "white", fontSize: "48px", fontWeight: "bold", marginBottom: "30px" }}>
                {plan.price}
                {plan.price !== "Custom" && <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)" }}>/month</span>}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{
                    color: "rgba(255,255,255,0.7)",
                    padding: "10px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#00ff88">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button style={{
                width: "100%",
                padding: "15px",
                marginTop: "30px",
                background: plan.popular 
                  ? "linear-gradient(135deg, #00d4ff, #7b2ff7)"
                  : "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        position: "relative",
        zIndex: 1,
        padding: "50px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "white", marginBottom: "20px" }}>
          NEXUS<span style={{ color: "#00d4ff" }}>AI</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginBottom: "30px" }}>
          {["Twitter", "GitHub", "LinkedIn", "Discord"].map((social) => (
            <a key={social} href="#" style={{
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.3s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#00d4ff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >
              {social}
            </a>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
          © 2024 NexusAI. All rights reserved.
        </p>
      </footer>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #0a0a14;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  )
}