import React from 'react'
import Image from 'next/image'

export default function Hero(props) {
  return (
    <section>
        <div>
          <Image src={props.cover} alt="A hero image of a classic car" fill />
        </div>
        <div>
          <a href={props.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={props.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
    </section>
  )
}
