import React from "react";
import { Config } from "@measured/puck";

// Import all components
import { Hero } from "@/components/blocks/Hero";
import { FeatureList } from "@/components/blocks/FeatureList";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Pricing } from "@/components/blocks/Pricing";
import { Testimonials } from "@/components/blocks/Testimonials";
import { FAQ } from "@/components/blocks/FAQ";
import { Stats } from "@/components/blocks/Stats";
import { CTA } from "@/components/blocks/CTA";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";

// Puck-compatible wrapper components
const HeroWrapper = (props: any) => <Hero {...props} />;
const FeatureListWrapper = (props: any) => <FeatureList {...props} />;
const ContactFormWrapper = (props: any) => <ContactForm {...props} />;
const PricingWrapper = (props: any) => <Pricing {...props} />;
const TestimonialsWrapper = (props: any) => <Testimonials {...props} />;
const FAQWrapper = (props: any) => <FAQ {...props} />;
const StatsWrapper = (props: any) => <Stats {...props} />;
const CTAWrapper = (props: any) => <CTA {...props} />;
const HeaderWrapper = (props: any) => <Header {...props} />;
const FooterWrapper = (props: any) => <Footer {...props} />;

export const puckConfig: Config = {
  components: {
    Hero: {
      render: HeroWrapper,
      label: "Hero Section",
      defaultProps: {
        title: "Welcome to Our Landing Page",
        subtitle: "Create amazing pages with our builder",
        backgroundImage: "",
        primaryButtonText: "Get Started",
        primaryButtonLink: "#",
        secondaryButtonText: "Learn More",
        secondaryButtonLink: "#",
      },
      fields: {
        title: { type: "text", label: "Title" },
        subtitle: { type: "text", label: "Subtitle" },
        backgroundImage: { type: "text", label: "Background Image URL" },
        primaryButtonText: { type: "text", label: "Primary Button Text" },
        primaryButtonLink: { type: "text", label: "Primary Button Link" },
        secondaryButtonText: { type: "text", label: "Secondary Button Text" },
        secondaryButtonLink: { type: "text", label: "Secondary Button Link" },
      },
    },
    FeatureList: {
      render: FeatureListWrapper,
      label: "Feature List",
      defaultProps: {
        title: "Our Features",
        subtitle: "Discover what makes our platform amazing",
        columns: 3,
        features: [
          { icon: "⚡", title: "Lightning Fast", description: "Build pages quickly", badge: "Popular", badgeVariant: "default" },
          { icon: "🎨", title: "Beautiful Designs", description: "Professional templates", badge: "Premium", badgeVariant: "secondary" },
          { icon: "📱", title: "Mobile Responsive", description: "Great on any device" },
        ],
      },
      fields: {
        title: { type: "text", label: "Section Title" },
        subtitle: { type: "text", label: "Section Subtitle" },
        columns: {
          type: "select",
          label: "Columns",
          options: [
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
          ],
        },
        features: {
          type: "array",
          label: "Features",
          getItemSummary: (item: any) => item.title || "Feature",
          arrayFields: {
            icon: { type: "text", label: "Icon (Emoji)" },
            title: { type: "text", label: "Title" },
            description: { type: "text", label: "Description" },
            badge: { type: "text", label: "Badge Text" },
            badgeVariant: {
              type: "select",
              label: "Badge Style",
              options: [
                { label: "Default", value: "default" },
                { label: "Secondary", value: "secondary" },
                { label: "Destructive", value: "destructive" },
                { label: "Outline", value: "outline" },
              ],
            },
          },
        },
      },
    },
    ContactForm: {
      render: ContactFormWrapper,
      label: "Contact Form",
      defaultProps: {
        title: "Get In Touch",
        subtitle: "We'd love to hear from you",
        submitButtonText: "Send Message",
        backgroundColor: "white",
        fields: { name: true, email: true, phone: false, company: false, subject: false, message: true },
      },
      fields: {
        title: { type: "text", label: "Form Title" },
        subtitle: { type: "text", label: "Form Subtitle" },
        backgroundColor: {
          type: "select",
          label: "Background",
          options: [
            { label: "White", value: "white" },
            { label: "Gray", value: "gray" },
            { label: "Slate", value: "slate" },
            { label: "Blue", value: "blue" },
          ],
        },
        submitButtonText: { type: "text", label: "Submit Button Text" },
        fields: {
          type: "object",
          label: "Form Fields",
          objectFields: {
            name: { type: "radio", label: "Name", options: [{ label: "Show", value: true }, { label: "Hide", value: false }] },
            email: { type: "radio", label: "Email", options: [{ label: "Show", value: true }, { label: "Hide", value: false }] },
            phone: { type: "radio", label: "Phone", options: [{ label: "Show", value: true }, { label: "Hide", value: false }] },
            company: { type: "radio", label: "Company", options: [{ label: "Show", value: true }, { label: "Hide", value: false }] },
            message: { type: "radio", label: "Message", options: [{ label: "Show", value: true }, { label: "Hide", value: false }] },
          },
        },
      },
    },
    Pricing: {
      render: PricingWrapper,
      label: "Pricing Table",
      defaultProps: {
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the plan that works best for you",
        backgroundColor: "white",
        tiers: [
          {
            name: "Starter",
            price: "$9",
            period: "/month",
            description: "Perfect for getting started",
            features: [
              { text: "Up to 5 projects", included: true },
              { text: "Basic analytics", included: true },
              { text: "24/7 support", included: false },
            ],
            buttonText: "Get Started",
          },
          {
            name: "Pro",
            price: "$29",
            period: "/month",
            description: "Best for professionals",
            features: [
              { text: "Unlimited projects", included: true },
              { text: "Advanced analytics", included: true },
              { text: "24/7 support", included: true },
            ],
            buttonText: "Start Free Trial",
            popular: true,
            badge: "Most Popular",
          },
        ],
      },
      fields: {
        title: { type: "text", label: "Section Title" },
        subtitle: { type: "text", label: "Section Subtitle" },
        backgroundColor: {
          type: "select",
          label: "Background",
          options: [
            { label: "White", value: "white" },
            { label: "Gray", value: "gray" },
            { label: "Slate", value: "slate" },
            { label: "Dark", value: "dark" },
          ],
        },
        tiers: {
          type: "array",
          label: "Pricing Tiers",
          getItemSummary: (item: any) => item.name || "Tier",
          arrayFields: {
            name: { type: "text", label: "Tier Name" },
            price: { type: "text", label: "Price" },
            period: { type: "text", label: "Period" },
            description: { type: "text", label: "Description" },
            buttonText: { type: "text", label: "Button Text" },
            popular: { type: "radio", label: "Popular?", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
            badge: { type: "text", label: "Badge Text" },
            features: {
              type: "array",
              label: "Features",
              arrayFields: {
                text: { type: "text", label: "Feature Text" },
                included: { type: "radio", label: "Included?", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
              },
            },
          },
        },
      },
    },
    Testimonials: {
      render: TestimonialsWrapper,
      label: "Testimonials",
      defaultProps: {
        title: "What Our Customers Say",
        subtitle: "Don't just take our word for it",
        backgroundColor: "gray",
        columns: 3,
        testimonials: [
          { name: "Sarah Johnson", role: "CEO", company: "TechStart", content: "This platform has transformed how we build landing pages!", rating: 5 },
          { name: "Michael Chen", role: "Marketing Director", company: "GrowthCo", content: "We've seen a 3x increase in conversions!", rating: 5 },
        ],
      },
      fields: {
        title: { type: "text", label: "Section Title" },
        subtitle: { type: "text", label: "Section Subtitle" },
        backgroundColor: {
          type: "select",
          label: "Background",
          options: [
            { label: "White", value: "white" },
            { label: "Gray", value: "gray" },
            { label: "Slate", value: "slate" },
            { label: "Dark", value: "dark" },
          ],
        },
        columns: {
          type: "select",
          label: "Columns",
          options: [{ label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }],
        },
        testimonials: {
          type: "array",
          label: "Testimonials",
          getItemSummary: (item: any) => item.name || "Testimonial",
          arrayFields: {
            name: { type: "text", label: "Name" },
            role: { type: "text", label: "Role" },
            company: { type: "text", label: "Company" },
            content: { type: "textarea", label: "Content" },
            rating: { type: "number", label: "Rating (1-5)" },
          },
        },
      },
    },
    FAQ: {
      render: FAQWrapper,
      label: "FAQ Section",
      defaultProps: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know",
        backgroundColor: "white",
        items: [
          { question: "How do I get started?", answer: "Sign up, choose a template, and start customizing!" },
          { question: "Is there a free trial?", answer: "Yes! We offer a 14-day free trial." },
        ],
      },
      fields: {
        title: { type: "text", label: "Section Title" },
        subtitle: { type: "text", label: "Section Subtitle" },
        backgroundColor: {
          type: "select",
          label: "Background",
          options: [
            { label: "White", value: "white" },
            { label: "Gray", value: "gray" },
            { label: "Slate", value: "slate" },
            { label: "Dark", value: "dark" },
          ],
        },
        items: {
          type: "array",
          label: "FAQ Items",
          getItemSummary: (item: any) => item.question || "Question",
          arrayFields: {
            question: { type: "text", label: "Question" },
            answer: { type: "textarea", label: "Answer" },
          },
        },
      },
    },
    Stats: {
      render: StatsWrapper,
      label: "Stats Section",
      defaultProps: {
        title: "",
        subtitle: "",
        backgroundColor: "gradient",
        columns: 4,
        stats: [
          { value: "10K+", label: "Happy Customers" },
          { value: "50M+", label: "Pages Created" },
          { value: "99.9%", label: "Uptime" },
          { value: "24/7", label: "Support" },
        ],
      },
      fields: {
        title: { type: "text", label: "Section Title (Optional)" },
        subtitle: { type: "text", label: "Section Subtitle (Optional)" },
        backgroundColor: {
          type: "select",
          label: "Background",
          options: [
            { label: "Gradient", value: "gradient" },
            { label: "White", value: "white" },
            { label: "Gray", value: "gray" },
            { label: "Dark", value: "dark" },
          ],
        },
        columns: {
          type: "select",
          label: "Columns",
          options: [{ label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }],
        },
        stats: {
          type: "array",
          label: "Stats",
          getItemSummary: (item: any) => item.label || "Stat",
          arrayFields: {
            value: { type: "text", label: "Value" },
            label: { type: "text", label: "Label" },
            prefix: { type: "text", label: "Prefix" },
            suffix: { type: "text", label: "Suffix" },
          },
        },
      },
    },
    CTA: {
      render: CTAWrapper,
      label: "Call to Action",
      defaultProps: {
        title: "Ready to Get Started?",
        subtitle: "Join thousands of satisfied customers",
        primaryButtonText: "Start Free Trial",
        primaryButtonLink: "#",
        secondaryButtonText: "Learn More",
        secondaryButtonLink: "#",
        variant: "gradient",
        showIcon: true,
      },
      fields: {
        title: { type: "text", label: "Title" },
        subtitle: { type: "text", label: "Subtitle" },
        primaryButtonText: { type: "text", label: "Primary Button Text" },
        primaryButtonLink: { type: "text", label: "Primary Button Link" },
        secondaryButtonText: { type: "text", label: "Secondary Button Text" },
        secondaryButtonLink: { type: "text", label: "Secondary Button Link" },
        variant: {
          type: "select",
          label: "Style",
          options: [
            { label: "Gradient", value: "gradient" },
            { label: "Simple", value: "simple" },
            { label: "Dark", value: "dark" },
            { label: "Split", value: "split" },
          ],
        },
        showIcon: {
          type: "radio",
          label: "Show Icon",
          options: [{ label: "Yes", value: true }, { label: "No", value: false }],
        },
      },
    },
    Header: {
      render: HeaderWrapper,
      label: "Header / Navigation",
      defaultProps: {
        logoText: "PageCraft",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
        ctaText: "Get Started",
        ctaLink: "#",
        sticky: true,
        transparent: false,
      },
      fields: {
        logoText: { type: "text", label: "Logo Text" },
        logo: { type: "text", label: "Logo Image URL" },
        ctaText: { type: "text", label: "CTA Button Text" },
        ctaLink: { type: "text", label: "CTA Button Link" },
        sticky: { type: "radio", label: "Sticky Header", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
        transparent: { type: "radio", label: "Transparent", options: [{ label: "Yes", value: true }, { label: "No", value: false }] },
        links: {
          type: "array",
          label: "Navigation Links",
          getItemSummary: (item: any) => item.label || "Link",
          arrayFields: {
            label: { type: "text", label: "Label" },
            href: { type: "text", label: "URL" },
          },
        },
      },
    },
    Footer: {
      render: FooterWrapper,
      label: "Footer",
      defaultProps: {
        logoText: "PageCraft",
        description: "Build beautiful landing pages in minutes.",
        backgroundColor: "dark",
        columns: [
          { title: "Product", links: [{ label: "Features", href: "#" }, { label: "Pricing", href: "#" }] },
          { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }] },
        ],
        socialLinks: [{ platform: "twitter", href: "#" }, { platform: "linkedin", href: "#" }],
        copyright: `© ${new Date().getFullYear()} PageCraft. All rights reserved.`,
      },
      fields: {
        logoText: { type: "text", label: "Logo Text" },
        logo: { type: "text", label: "Logo Image URL" },
        description: { type: "textarea", label: "Description" },
        copyright: { type: "text", label: "Copyright Text" },
        backgroundColor: {
          type: "select",
          label: "Background",
          options: [{ label: "Dark", value: "dark" }, { label: "White", value: "white" }, { label: "Gray", value: "gray" }],
        },
        columns: {
          type: "array",
          label: "Link Columns",
          getItemSummary: (item: any) => item.title || "Column",
          arrayFields: {
            title: { type: "text", label: "Column Title" },
            links: {
              type: "array",
              label: "Links",
              arrayFields: {
                label: { type: "text", label: "Label" },
                href: { type: "text", label: "URL" },
              },
            },
          },
        },
        socialLinks: {
          type: "array",
          label: "Social Links",
          getItemSummary: (item: any) => item.platform || "Social",
          arrayFields: {
            platform: {
              type: "select",
              label: "Platform",
              options: [
                { label: "Twitter", value: "twitter" },
                { label: "Facebook", value: "facebook" },
                { label: "Instagram", value: "instagram" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "GitHub", value: "github" },
                { label: "YouTube", value: "youtube" },
              ],
            },
            href: { type: "text", label: "URL" },
          },
        },
      },
    },
  },
  root: {
    render: ({ children }: any) =>
      React.createElement("div", {
        className: "min-h-screen bg-white dark:bg-gray-900"
      }, children),
  },
};
