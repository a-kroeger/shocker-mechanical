import React from 'react'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { fetchAllPortfolio } from '@/utils/contentful'



export default async function Portfolio() {

  const portfolio = await fetchAllPortfolio()
  
  return (
    <PortfolioGrid portfolio={portfolio}/>
  )
}
