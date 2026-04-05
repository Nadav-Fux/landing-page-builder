import { z } from "zod";

// Zod schemas for Puck component props
const HeroPropsSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  backgroundImage: z.string().optional(),
  primaryButtonText: z.string().optional(),
  primaryButtonLink: z.string().optional(),
  secondaryButtonText: z.string().optional(),
  secondaryButtonLink: z.string().optional(),
});

const FeaturePropsSchema = z.object({
  icon: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  badge: z.string().optional(),
  badgeVariant: z.enum(["default", "secondary", "destructive", "outline"]).optional(),
});

const FeatureListPropsSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  features: z.array(FeaturePropsSchema).optional(),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
});

const ContactFormFieldsSchema = z.object({
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  company: z.boolean().optional(),
  subject: z.boolean().optional(),
  message: z.boolean().optional(),
});

const ContactFormPropsSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  submitButtonText: z.string().optional(),
  successMessage: z.string().optional(),
  errorMessage: z.string().optional(),
  backgroundColor: z.enum(["white", "gray", "slate", "blue"]).optional(),
  fields: ContactFormFieldsSchema.optional(),
});

// Props schema for any component type
const ComponentPropsSchema = z.record(z.string(), z.any()); // Allow any properties for flexibility

// Individual component schema
const ComponentSchema = z.object({
  type: z.enum(["Hero", "FeatureList", "ContactForm", "Pricing", "Testimonials", "FAQ", "Stats", "CTA", "Header", "Footer"]),
  props: ComponentPropsSchema,
});

// Root content schema
const RootPropsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

const RootSchema = z.object({
  type: z.literal("root"),
  props: RootPropsSchema.optional(),
});

// Main Puck content schema
export const PuckContentSchema = z.object({
  content: z.array(ComponentSchema),
  root: RootSchema.optional(),
  zones: z.record(z.string(), z.array(z.any())).optional(), // For future zone support
});

// Type inference
export type PuckContent = z.infer<typeof PuckContentSchema>;
export type HeroProps = z.infer<typeof HeroPropsSchema>;
export type FeatureListProps = z.infer<typeof FeatureListPropsSchema>;
export type ContactFormProps = z.infer<typeof ContactFormPropsSchema>;

// Validation function with error handling
export function validatePuckContent(data: unknown): PuckContent {
  try {
    return PuckContentSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Puck content validation failed:", error.issues);
      throw new Error(
        `Invalid Puck content: ${error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
      );
    }
    throw error;
  }
}

// Safe validation function that returns null instead of throwing
export function safeValidatePuckContent(data: unknown): PuckContent | null {
  try {
    return PuckContentSchema.parse(data);
  } catch (error) {
    console.error("Puck content validation failed:", error);
    return null;
  }
}

// Generate a default/fallback Puck content
export function getDefaultPuckContent(prompt: string): PuckContent {
  return {
    content: [
      {
        type: "Hero",
        props: {
          title: prompt.slice(0, 100) || "Welcome to Our Landing Page",
          subtitle: "This is a demo landing page. Configure your AI API keys to generate real content.",
          primaryButtonText: "Get Started",
          primaryButtonLink: "#",
          secondaryButtonText: "Learn More",
          secondaryButtonLink: "#",
        },
      },
      {
        type: "FeatureList",
        props: {
          title: "Features",
          subtitle: "Everything you need to succeed",
          features: [
            {
              icon: "⚡",
              title: "Lightning Fast",
              description: "Build pages quickly with our intuitive interface",
            },
            {
              icon: "🎨",
              title: "Beautiful Designs",
              description: "Professional templates to get you started",
            },
            {
              icon: "📱",
              title: "Mobile Responsive",
              description: "Your pages look great on any device",
            },
          ],
          columns: 3,
        },
      },
      {
        type: "ContactForm",
        props: {
          title: "Get In Touch",
          subtitle: "We'd love to hear from you",
          submitButtonText: "Send Message",
          backgroundColor: "white",
          fields: {
            name: true,
            email: true,
            phone: false,
            company: false,
            subject: false,
            message: true,
          },
        },
      },
    ],
    root: {
      type: "root",
      props: {
        title: "Generated Landing Page",
        description: `Landing page for: ${prompt}`,
      },
    },
  };
}