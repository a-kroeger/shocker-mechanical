import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from './portfolio.module.css'

export default function PortfolioGrid({
  title = 'Portfolio',
  portfolio,
  limit
}) {
  const maxItems = limit || portfolio.length
  const showViewAll = limit && portfolio.length > limit
  const visibleItems = portfolio.slice(0, maxItems)

  return (
    <section className={style.portfolio}>
      <h2>{title}</h2>
      <div className={style.grid}>
        {visibleItems.map((item) => (
          <Link
            key={item.sys.id}
            href={`/portfolio/${item.fields.slug}`}
            className={style.card}
          >
            <Image
              alt={item.fields.title}
              width={600}
              height={400}
              src={`https:${item.fields.imageGallery[0].fields.file.url}`}
            />
            <p>{item.fields.title}</p>
          </Link>
        ))}

        {showViewAll && (
          <Link href="/portfolio" className={`${style.card} ${style.viewAll}`}>
            <div>View All Projects</div>
          </Link>
        )}
      </div>
    </section>
  )
}
