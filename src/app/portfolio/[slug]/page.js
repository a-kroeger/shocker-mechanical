import Gallery from '@/components/portfolio/Gallery'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { fetchPortfolioEntryBySlug, fetchPortfolioSlugs } from '@/utils/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default async function PortfolioPage({ params }) {
  const project = await fetchPortfolioEntryBySlug(params.slug)
  const portfolioSlugs = await fetchPortfolioSlugs()

  const otherProjects = await Promise.all(
    portfolioSlugs.map((slug) => fetchPortfolioEntryBySlug(slug))
  )

  return (
    <main>
      <Gallery images={project.fields.imageGallery}/>
      <h1>{project.fields.title}</h1>

      <div>
        {documentToReactComponents(project.fields.description)}
      </div>

      <div>
        <h2>Scope of Work</h2>
        {documentToReactComponents(project.fields.scope)}
      </div>
      <PortfolioGrid title={'Our Other Work'} portfolio={otherProjects}/>
    </main>
  )
}
