import { NextResponse } from 'next/server'
import {
  fetchAllServices,
  fetchPortfolioSlugs,
  fetchPortfolioEntryBySlug,
} from '@/utils/contentful'

// Light helper to flatten Contentful Rich Text to plain text
function richTextToPlainText(node) {
  if (!node) return ''
  if (node.nodeType === 'text') return node.value || ''
  if (Array.isArray(node.content)) return node.content.map(richTextToPlainText).join(' ')
  return ''
}

export const revalidate = 300 // ISR: refresh every 5 minutes

export async function GET() {
  const services = await fetchAllServices()
  const slugs = await fetchPortfolioSlugs()
  const projects = await Promise.all(slugs.map((s) => fetchPortfolioEntryBySlug(s)))

  const docs = [
    // Services
    ...services.map((s) => ({
      id: `service_${s.sys.id}`,
      type: 'service',
      title: s.fields.title,
      slug: `/services/${s.fields.slug}`,
      description: s.fields.metaDescription || '',
      // optional thumbnail (uncomment if you want thumbs in UI)
      // image: `https:${s.fields.coverPhoto?.fields?.file?.url || ''}`,
    })),
    // Portfolio projects
    ...projects.map((p) => ({
      id: `project_${p.sys.id}`,
      type: 'project',
      title: p.fields.title,
      slug: `/portfolio/${p.fields.slug}`,
      description: richTextToPlainText(p.fields.description),
      // image: `https:${p.fields.imageGallery?.[0]?.fields?.file?.url || ''}`,
    })),
  ]

  return NextResponse.json(docs)
}
