import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

/* ----------------------- Portfolio Utilities ----------------------- */

export async function fetchPortfolioSlugs() {
  const entries = await client.getEntries({
    content_type: 'portfolio',
    select: 'fields.slug',
  })

  return entries.items.map((item) => item.fields.slug)
}

export async function fetchPortfolioEntryBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'portfolio',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  })

  return entries.items[0]
}

/* ------------------------ Service Utilities ------------------------ */

export async function fetchServiceSlugs() {
  const entries = await client.getEntries({
    content_type: 'service',
    select: 'fields.slug',
  })

  return entries.items.map((item) => item.fields.slug)
}

export async function fetchServiceEntryBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'service',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  })

  return entries.items[0]
}

/**
 * Fetch all service entries with full details
 */
export async function fetchAllServices() {
  const entries = await client.getEntries({
    content_type: 'service',
    include: 2, // Pull in linked assets/entries
  })

  return entries.items
}

/* ------------------------- Site Content Utility ------------------------- */

/**
 * Fetch the single "content" entry used for static site content like About Us, social links, etc.
 */
export async function getSiteContent() {
  const entries = await client.getEntries({
    content_type: 'content',
    limit: 1,
  })

  return entries.items[0]
}
