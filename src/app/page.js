import Hero from '../components/homepage/Hero.js'
import ServiceGrid from '../components/service/ServiceGrid.js'
import AboutUs from '../components/homepage/AboutUs.js'
import PortfolioGrid from '../components/portfolio/PortfolioGrid.js'
import { fetchAllServices, fetchAllPortfolio, getSiteContent } from '@/utils/contentful'

export default async function HomePage() {
  const content = await getSiteContent()
  const services = await fetchAllServices()
  const portfolio = await fetchAllPortfolio()

  const {
    coverPhoto,
    aboutUs,
    facebookLink,
    instagramLink
  } = content.fields

  return (
    <main>
      <Hero cover={`https:${coverPhoto.fields.file.url}`} instagram={instagramLink} facebook={facebookLink} />
      <ServiceGrid title={'Popular Services'} limit={5} horizontalMobile={true} services={services} />
      <AboutUs title={'About Shocker Mechanical'} content={aboutUs}/>
      <PortfolioGrid title={'Our Portfolio'} portfolio={portfolio} limit={3}/>
    </main>
  )
}