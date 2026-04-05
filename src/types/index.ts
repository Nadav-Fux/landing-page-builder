// Auth types
export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Template types
export interface Template {
  id: string
  name: string
  description: string
  category: string
  thumbnail?: string
  html: string
  css: string
  components?: Component[]
  is_public: boolean
  user_id?: string
  created_at: string
  updated_at: string
}

// Landing Page types
export interface LandingPage {
  id: string
  name: string
  slug: string
  html: string
  css: string
  components?: Component[]
  is_published: boolean
  published_url?: string
  user_id: string
  template_id?: string
  meta_tags?: MetaTags
  created_at: string
  updated_at: string
}

// Component types for the page builder
export interface Component {
  id: string
  type: ComponentType
  content?: string
  attributes?: Record<string, any>
  styles?: Record<string, any>
  children?: Component[]
  parent_id?: string
  order: number
}

export type ComponentType =
  | 'text'
  | 'heading'
  | 'image'
  | 'button'
  | 'container'
  | 'section'
  | 'nav'
  | 'footer'
  | 'form'
  | 'input'
  | 'textarea'
  | 'video'
  | 'icon'
  | 'divider'
  | 'spacer'
  | 'grid'
  | 'list'
  | 'card'
  | 'testimonial'
  | 'hero'
  | 'features'
  | 'pricing'
  | 'gallery'
  | 'contact'
  | 'social'
  | 'custom'

// Meta tags for SEO
export interface MetaTags {
  title?: string
  description?: string
  keywords?: string
  og_image?: string
  og_title?: string
  og_description?: string
  twitter_card?: string
  twitter_title?: string
  twitter_description?: string
  canonical_url?: string
  favicon?: string
}

// Form types
export interface FormField {
  id: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio'
  name: string
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

// AI Generation types
export interface AIGenerateRequest {
  prompt: string
  industry?: string
  style?: 'modern' | 'classic' | 'minimal' | 'bold' | 'playful'
  colors?: string[]
  sections?: string[]
}

export interface AIGenerateResponse {
  html: string
  css: string
  components: Component[]
  meta_tags: MetaTags
}

// Background types
export interface Background {
  type: 'color' | 'gradient' | 'image' | 'video'
  value: string | GradientBackground
}

export interface GradientBackground {
  type: 'linear' | 'radial'
  direction?: string
  colors: string[]
  stops?: number[]
}

// Theme types
export interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    neutral: string
    background: string
    foreground: string
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: Record<string, number>
  borderRadius: Record<string, number>
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Editor configuration
export interface EditorConfig {
  showPanels: {
    layers: boolean
    styles: boolean
    traits: boolean
    blocks: boolean
    assets: boolean
  }
  customBlocks?: BlockDefinition[]
  plugins?: string[]
}

export interface BlockDefinition {
  id: string
  label: string
  category: string
  content: string
  attributes?: Record<string, any>
}

// Deployment types
export interface DeploymentConfig {
  provider: 'vercel' | 'netlify' | 'custom'
  domain?: string
  customDomain?: string
  environment?: Record<string, string>
}

export interface Deployment {
  id: string
  landing_page_id: string
  url: string
  status: 'pending' | 'building' | 'success' | 'failed'
  config: DeploymentConfig
  created_at: string
  updated_at: string
}

// Database schema types
export type Database = {
  public: {
    Tables: {
      templates: {
        Row: Template
        Insert: Omit<Template, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Template>
      }
      landing_pages: {
        Row: LandingPage
        Insert: Omit<LandingPage, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<LandingPage>
      }
      deployments: {
        Row: Deployment
        Insert: Omit<Deployment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Deployment>
      }
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<User>
      }
    }
  }
}