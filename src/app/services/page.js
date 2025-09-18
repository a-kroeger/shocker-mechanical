// app/services/page.js  (or pages/services.js if using pages router)
import React from 'react'
import { createClient } from 'contentful'
import ServiceGrid from '@/components/service/ServiceGrid'

// Contentful client setup (if not already globalized)
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export default async function Services() {
  // fetch all services
  const res = await client.getEntries({ content_type: 'service' })
  const services = res.items

  return (
    <main>
      <ServiceGrid title="All Services" services={services} horizontalMobile={false}/>
    </main>
  )
}
export const metadata = {
  title: 'All Services | Shocker Mechanical',
  description: 'Explore Shocker Mechanical’s full range of custom automotive services, from engine swaps and performance upgrades to fabrication and restoration.',
}
