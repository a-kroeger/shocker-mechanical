import Image from 'next/image'
import { fetchPortfolioEntryBySlug } from '@/utils/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default async function PortfolioPage({ params }) {
  const project = await fetchPortfolioEntryBySlug(params.slug)
  console.log(project.fields.imageGallery[0].fields.file.url)

  return (
    <main>
      <div>
          <Image
            src={`https:${project.fields.imageGallery[0].fields.file.url}`}
            alt={project.fields.title}
            fill
          />
      </div>

      <h1>{project.fields.title}</h1>

      <div>
        {documentToReactComponents(project.fields.description)}
      </div>

      <div>
        <h2>Scope of Work</h2>
        {documentToReactComponents(project.fields.scope)}
      </div>
    </main>
  )
}
