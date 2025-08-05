import React from 'react'
import Link from 'next/link'

export default function PortfolioGrid(props) {
  return (
    <section>
        <h2>{props.title || 'Portfolio'}</h2>
        <div>
          {props.portfolio.map((item) => (
            <Link key={item.sys.id} href={`/portfolio/${item.fields.slug}`}>
              <p>{item.fields.title}</p>
            </Link>
          ))}
        </div>
        <div>
          <Link href="/portfolio">View All</Link>
        </div>
    </section>
  )
}
