import React from 'react'
import Link from 'next/link'

export default function ServiceGrid(props) {
  return (
    <section>
        <h2>{props.title || 'Services'}</h2>
        <div>
          {props.services.map((service) => (
            <Link href={`/services/${service.fields.slug}`} key={service.sys.id}>
              <div>{service.fields.title}</div>
            </Link>
          ))}
        </div>
    </section>
  )
}
