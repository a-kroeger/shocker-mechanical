'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'
import styles from './global.module.css'

export default function Navigation({ services }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(null)

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu)
  }

  const toggleMobileDropdown = (menu) => {
    setMobileDropdown(mobileDropdown === menu ? null : menu)
  }

  // Split services by category
  const generalServices = services.filter(s => s.fields.type[0] === 'service')
  const performanceServices = services.filter(s => s.fields.type[0] === 'performance')

  return (
    <nav className={styles.navigation}>
      {/* Logo */}
      <div style={{ position: 'relative', zIndex: 1001 }}>
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <Image src={logo} alt="Shocker Mechanical Inc." priority />
        </Link>
      </div>

      {/* Hamburger (mobile only) */}
      <button
        className={`${styles.hamburger} ${mobileOpen ? styles.active : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Desktop Nav */}
      <div className={styles.desktopNav}>
        <ul className={styles.navList}>
          {/* Services Dropdown */}
          <li
            className={styles.dropdown}
            onMouseEnter={() => setOpenMenu('services')}
            onMouseLeave={() => setOpenMenu(null)}
            onClick={() => toggleMenu('services')}
          >
            <span>Services</span>
            <ul
              className={`${styles.dropdownMenu} ${
                openMenu === 'services' ? styles.show : ''
              }`}
            >
              {generalServices.map((service) => (
                <li key={service.fields.slug}>
                  <Link href={`/services/${service.fields.slug}`}>
                    {service.fields.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Performance Dropdown */}
          <li
            className={styles.dropdown}
            onMouseEnter={() => setOpenMenu('performance')}
            onMouseLeave={() => setOpenMenu(null)}
            onClick={() => toggleMenu('performance')}
          >
            <span>Performance</span>
            <ul
              className={`${styles.dropdownMenu} ${
                openMenu === 'performance' ? styles.show : ''
              }`}
            >
              {performanceServices.map((service) => (
                <li key={service.fields.slug}>
                  <Link href={`/services/${service.fields.slug}`}>
                    {service.fields.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Fullscreen Mobile Overlay */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.show : ''}`}>
        <ul>
          {/* General Services */}
          <li>
            <button
              className={styles.mobileDropdownToggle}
              onClick={() => toggleMobileDropdown('services')}
            >
              Services {mobileDropdown === 'services' ? '−' : '+'}
            </button>
            <ul
              className={`${styles.mobileDropdownMenu} ${
                mobileDropdown === 'services' ? styles.show : ''
              }`}
            >
              {generalServices.map((service) => (
                <li
                  key={`services-${service.fields.slug}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href={`/services/${service.fields.slug}`}>
                    {service.fields.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Performance Services */}
          <li>
            <button
              className={styles.mobileDropdownToggle}
              onClick={() => toggleMobileDropdown('performance')}
            >
              Performance {mobileDropdown === 'performance' ? '−' : '+'}
            </button>
            <ul
              className={`${styles.mobileDropdownMenu} ${
                mobileDropdown === 'performance' ? styles.show : ''
              }`}
            >
              {performanceServices.map((service) => (
                <li
                  key={`performance-${service.fields.slug}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href={`/services/${service.fields.slug}`}>
                    {service.fields.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Contact */}
          <li onClick={() => setMobileOpen(false)}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
