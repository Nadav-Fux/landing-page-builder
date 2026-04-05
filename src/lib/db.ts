/**
 * Database Helper Functions
 * 
 * This file provides a unified interface for database operations using Prisma.
 * All Supabase dependencies have been removed in favor of Prisma.
 */

import { prisma } from './prisma'

// Export prisma for use in API routes
export { prisma }

// Helper to parse JSON strings from SQLite
function parseJsonField(field: string | null): unknown {
  if (!field) return null
  try {
    return JSON.parse(field)
  } catch {
    return field
  }
}

// Helper to parse tags from comma-separated string
function parseTags(tags: string | null): string[] {
  if (!tags) return []
  return tags.split(',').filter(Boolean).map(t => t.trim())
}

// Parsed project type
interface ParsedProject {
  id: string
  userId: string
  title: string
  description?: string | null
  content: unknown
  tags: string[]
  meta: unknown
  html?: string | null
  css?: string | null
  status?: string
  createdAt: Date
  updatedAt: Date
}

// Parsed template type
interface ParsedTemplate {
  id: string
  name: string
  category?: string | null
  description?: string | null
  content: unknown
  tags: string[]
  isActive: boolean
  thumbnail?: string | null
  downloads: number
  createdAt: Date
  updatedAt: Date
}

// Project input type
interface ProjectInput {
  title: string
  description?: string
  content?: unknown
  html?: string
  css?: string
  status?: string
  userId: string
}

export const db = {
  // Projects (formerly landing_pages)
  async getProjects(userId: string): Promise<ParsedProject[]> {
    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    })

    return projects.map((p: any) => ({
      ...p,
      content: parseJsonField(p.content),
      tags: parseTags(p.tags),
      meta: parseJsonField(p.meta),
    }))
  },

  async getProject(id: string, userId?: string): Promise<ParsedProject | null> {
    const where = userId ? { id, userId } : { id }
    const project = await prisma.project.findFirst({ where })

    if (!project) return null

    return {
      ...project,
      content: parseJsonField(project.content),
      tags: parseTags(project.tags),
      meta: parseJsonField(project.meta),
    }
  },

  async createProject(data: ProjectInput): Promise<ParsedProject> {
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description || '',
        content: data.content ? JSON.stringify(data.content) : '{}',
        html: data.html || null,
        css: data.css || null,
        status: data.status || 'DRAFT',
        userId: data.userId,
      },
    })

    return {
      ...project,
      content: parseJsonField(project.content),
      tags: parseTags(project.tags),
      meta: parseJsonField(project.meta),
    }
  },

  async updateProject(id: string, _userId: string, updates: Partial<ProjectInput>): Promise<ParsedProject> {
    const data: any = {}
    if (updates.title) data.title = updates.title
    if (updates.description !== undefined) data.description = updates.description
    if (updates.content) data.content = JSON.stringify(updates.content)
    if (updates.html !== undefined) data.html = updates.html
    if (updates.css !== undefined) data.css = updates.css
    if (updates.status) data.status = updates.status

    const project = await prisma.project.update({
      where: { id },
      data,
    })

    return {
      ...project,
      content: parseJsonField(project.content),
      tags: parseTags(project.tags),
      meta: parseJsonField(project.meta),
    }
  },

  async deleteProject(id: string, userId: string): Promise<void> {
    // First verify ownership
    const existing = await prisma.project.findFirst({
      where: { id, userId },
    })

    if (!existing) {
      throw new Error('Project not found or access denied')
    }

    await prisma.project.delete({ where: { id } })
  },

  // Templates
  async getTemplates(category?: string, isActive: boolean = true): Promise<ParsedTemplate[]> {
    const templates = await prisma.template.findMany({
      where: {
        isActive,
        ...(category && { category }),
      },
      orderBy: { downloads: 'desc' },
    })

    return templates.map((t: any) => ({
      ...t,
      content: parseJsonField(t.content),
      tags: parseTags(t.tags),
    }))
  },

  async getTemplate(id: string): Promise<ParsedTemplate | null> {
    const template = await prisma.template.findFirst({
      where: { id, isActive: true },
    })

    if (!template) return null

    return {
      ...template,
      content: parseJsonField(template.content),
      tags: parseTags(template.tags),
    }
  },
}