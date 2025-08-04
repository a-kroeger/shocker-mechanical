// app/page.js
import Image from 'next/image'
import Link from 'next/link'
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

  console.log(content.fields)

  const {
    coverPhoto,
    aboutUs,
    facebookLink,
    instagramLink
  } = content.fields

  return (
    <main>
      <section>
        <div>
          <Image src={`https:${coverPhoto.fields.file.url}`} alt="Shocker Mechanical Logo" fill />
        </div>
        <div>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={facebookLink} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </section>

      {/* Services */}
      <section>
        <h2>Popular Services</h2>
        <div>
          {services.map((service) => (
            <Link href={`/services/${service.fields.slug}`} key={service.sys.id}>
              <div>{service.fields.title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section>
        <h2>About Shocker Mechanical</h2>
        <p>
          {aboutUs}
        </p>
      </section>

      {/* Portfolio */}
      <section>
        <h2>Our Portfolio</h2>
        <div>
          {portfolio.map((item) => (
            <Link key={item.sys.id} href={`/portfolio/${item.fields.slug}`}>
              <p>{item.fields.title}</p>
            </Link>
          ))}
        </div>
        <div>
          <Link href="/portfolio">View All</Link>
        </div>
      </section>
    </main>
  )
}
