import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from './serviceGrid.module.css'

export default function ServiceGrid({
  title = 'Services',
  services,
  limit,                // optional: max number of items to display
  horizontalMobile = true // optional: true = horizontal scroll on mobile, false = vertical
}) {
  const maxItems = limit || services.length
  const showViewAll = limit && services.length > limit
  const visibleServices = services.slice(0, maxItems)

  return (
    <section className={`${style.services} ${horizontalMobile ? style.horizontalMobile : ''}`}>
      <h2>{title}</h2>
      <div>
        {visibleServices.map((service) => (
          <Link
            className={style.service}
            href={`/services/${service.fields.slug}`}
            key={service.sys.id}
          >
            <Image
              alt={service.fields.title}
              src={`https:${service.fields.coverPhoto.fields.file.url}`}
              height={80}
              width={160}
            />
            <div>{service.fields.title}</div>
          </Link>
        ))}

        {showViewAll && (
          <Link className={`${style.service} ${style.viewAll}`} href="/services">
            <div>View All Services</div>
          </Link>
        )}
      </div>
    </section>
  )
}
