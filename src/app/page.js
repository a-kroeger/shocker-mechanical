import Hero from '../components/homepage/Hero.js'
import ServiceGrid from '../components/service/ServiceGrid.js'
import AboutUs from '../components/homepage/AboutUs.js'
import PortfolioGrid from '../components/portfolio/PortfolioGrid.js'
import { fetchServiceSlugs, fetchServiceEntryBySlug, fetchPortfolioSlugs, fetchPortfolioEntryBySlug, getSiteContent } from '@/utils/contentful'

export default async function HomePage() {
  const serviceSlugs = await fetchServiceSlugs()
  const portfolioSlugs = await fetchPortfolioSlugs()
  const content = await getSiteContent()

  const services = await Promise.all(
    serviceSlugs.map((slug) => fetchServiceEntryBySlug(slug))
  )
  const portfolio = await Promise.all(
    portfolioSlugs.map((slug) => fetchPortfolioEntryBySlug(slug))
  )

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
      <PortfolioGrid title={'Our Portfolio'} portfolio={portfolio} />
    </main>
  )
}