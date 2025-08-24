import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import instagram from '../../assets/instagram.png'
import facebook from '../../assets/facebook.png'
import scriptLogo from '../../assets/script-logo.jpg'
import style from './homepage.module.css'

export default function Hero({ cover, instagram: igLink, facebook: fbLink }) {
  return (
    <section className={style.hero}>
      {/* Background image */}
      <div className={style.heroImage}>
        <Image src={cover} alt="A hero image of a classic car" fill priority />
      </div>

      {/* Left logo card */}
      <div className={style.heroCard}>
        <Image src={scriptLogo} alt="Shocker Mechanical Logo" className={style.logo} />
      </div>

      {/* Bottom-right angled panel */}
      <div className={style.anglePanel} aria-hidden="true" />

      {/* Content inside the angled panel */}
      <div className={style.actionsWrap}>
        <div className={style.socials}>
          <Link href={igLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Image src={instagram} alt="" />
          </Link>
          <Link href={fbLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Image src={facebook} alt="" />
          </Link>
        </div>

        {/* Desktop CTA */}
        <Link className={`${style.cta} ${style.desktopOnly}`} href="/contact">
          Book An Appointment
        </Link>

        {/* Mobile CTA */}
        <Link className={`${style.cta} ${style.mobileOnly}`} href="/contact">
          Contact Us
        </Link>
      </div>
    </section>
  )
}
