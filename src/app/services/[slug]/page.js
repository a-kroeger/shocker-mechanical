import Image from 'next/image'
import { fetchServiceEntryBySlug } from '@/utils/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'

export default async function ServicePage({ params }) {
  const service = await fetchServiceEntryBySlug(params.slug)

  const {
    title,
    coverPhoto,
    bodyText,
    portfolio,
    type,
    metaTitle,
    metaDescription,
  } = service.fields

  return (
    <main>
      {/* Cover Image */}
      <div>
        <Image
          src={`https:${coverPhoto.fields.file.url}`}
          alt={title}
          fill
        />
      </div>

      {/* Title and Meta */}
      <header>
        <h1>{title}</h1>
        {metaDescription && (
          <p>{metaDescription}</p>
        )}
      </header>

      {/* Body Text */}
      <section>
        {documentToReactComponents(bodyText)}
      </section>

      {/* Portfolio Link (if available) */}
      {portfolio && (
        <section>
          <h2>Featured Project</h2>
          <Link
            href={`/portfolio/${portfolio.fields.slug}`}
          >
            <div>
              <Image
                src={`https:${portfolio.fields.imageGallery[0].fields.file.url}`}
                alt={portfolio.fields.title}
                fill
              />
            </div>
            <div>
              <h3>{portfolio.fields.title}</h3>
              <p>
                {portfolio.fields.description?.content[0]?.content[0]?.value || 'View full project'}
              </p>
            </div>
          </Link>
        </section>
      )}
    </main>
  )
}
