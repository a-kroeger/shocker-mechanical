import React from 'react'

export default function AboutUs(props) {
  return (
    <section>
        <h2>{props.title || 'About Us'}</h2>
        <p>
          {props.content}
        </p>
    </section>
  )
}
