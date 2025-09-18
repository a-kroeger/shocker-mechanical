import React from 'react'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { fetchAllPortfolio } from '@/utils/contentful'



export default async function Portfolio() {

  const portfolio = await fetchAllPortfolio()
  
  return (
    <PortfolioGrid portfolio={portfolio}/>
  )
}

export const metadata = {
  title: 'Portfolio | Shocker Mechanical',
  description: 'Browse Shocker Mechanical’s portfolio of custom automotive projects, including classic restorations, performance builds, hot rods, and custom fabrication work.',
}
