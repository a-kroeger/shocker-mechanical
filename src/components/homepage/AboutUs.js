import React from 'react'
import style from './homepage.module.css'

export default function AboutUs(props) {
  return (
    <section className={style.about}>
        <h2>{props.title || 'About Us'}</h2>
        <p>
          {props.content}
        </p>
    </section>
  )
}
