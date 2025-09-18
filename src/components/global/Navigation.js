'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'
import styles from './global.module.css'

export default function Navigation({ services }) {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(null)

  // --- SEARCH state ---
  const [searchOpen, setSearchOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const [index, setIndex] = useState(null)
  const [results, setResults] = useState([])
  const [active, setActive] = useState(-1)
  const inputRef = useRef(null)
  const overlayRef = useRef(null)
  const navRef = useRef(null)

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu)
  const toggleMobileDropdown = (menu) => setMobileDropdown(mobileDropdown === menu ? null : menu)

  // Split services by category
  const generalServices = services.filter(s => s.fields.type[0] === 'service')
  const performanceServices = services.filter(s => s.fields.type[0] === 'performance')

  // Keep overlay top aligned just below the nav
  useEffect(() => {
    if (!navRef.current) return
    const setVar = () => {
      document.documentElement.style.setProperty('--nav-h', `${navRef.current.clientHeight}px`)
    }
    setVar()
    window.addEventListener('resize', setVar)
    return () => window.removeEventListener('resize', setVar)
  }, [])

  // Close search on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (!searchOpen) return
      if (overlayRef.current && overlayRef.current.contains(e.target)) return
      setSearchOpen(false)
      setQ('')
      setResults([])
      setActive(-1)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [searchOpen])

  // Close on ESC, navigate on Enter
  useEffect(() => {
    const onKey = (e) => {
      if (!searchOpen) return
      if (e.key === 'Escape') {
        setSearchOpen(false); setQ(''); setResults([]); setActive(-1)
      } else if (e.key === 'ArrowDown' && results.length) {
        e.preventDefault(); setActive(i => (i + 1) % results.length)
      } else if (e.key === 'ArrowUp' && results.length) {
        e.preventDefault(); setActive(i => (i - 1 + results.length) % results.length)
      } else if (e.key === 'Enter' && active >= 0 && results[active]) {
        window.location.href = results[active].slug
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, results, active])

  // Lazy-load index + data when opening search the first time
  const ensureIndex = async () => {
    if (index) return
    setLoading(true)
    const [{ default: FlexSearch }, data] = await Promise.all([
      import('flexsearch'),
      fetch('/api/search').then(r => r.json())
    ])
    const idx = new FlexSearch.Document({
      document: {
        id: 'id',
        index: [
          { field: 'title', tokenize: 'forward' },
          { field: 'description', tokenize: 'forward' },
          { field: 'type' },
        ],
        store: ['title', 'slug', 'type', 'description'],
      },
    })
    data.forEach(d => idx.add(d))
    setIndex(idx)
    setLoading(false)
  }

  // Query
  useEffect(() => {
    if (!q || !index) { setResults([]); setActive(-1); return }
    const groups = index.search(q, { enrich: true })
    const flat = []
    groups.forEach(g => g.result.forEach(r => flat.push(r.doc)))
    const unique = Object.values(Object.fromEntries(flat.map(d => [d.slug, d])))
    // Prefer services on ties
    unique.sort((a, b) => (a.type === b.type ? 0 : a.type === 'service' ? -1 : 1))
    setResults(unique.slice(0, 20))
    setActive(unique.length ? 0 : -1)
  }, [q, index])

  const openSearch = async () => {
    setSearchOpen(true)
    await ensureIndex()
    // focus after next paint
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <nav className={styles.navigation} ref={navRef}>
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
        <span></span><span></span><span></span>
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
            <ul className={`${styles.dropdownMenu} ${openMenu === 'services' ? styles.show : ''}`}>
              {generalServices.map(service => (
                <li key={service.fields.slug}>
                  <Link href={`/services/${service.fields.slug}`}>{service.fields.title}</Link>
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
            <ul className={`${styles.dropdownMenu} ${openMenu === 'performance' ? styles.show : ''}`}>
              {performanceServices.map(service => (
                <li key={service.fields.slug}>
                  <Link href={`/services/${service.fields.slug}`}>{service.fields.title}</Link>
                </li>
              ))}
            </ul>
          </li>

          <li><Link href="/contact">Contact</Link></li>

          {/* ✅ Search menu item */}
          <li>
            <button type="button" className={styles.searchLink} onClick={openSearch}>
              Search
            </button>
          </li>
        </ul>
      </div>

      {/* Fullscreen Mobile Overlay */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.show : ''}`}>
        <ul>
          {/* General Services */}
          <li>
            <button className={styles.mobileDropdownToggle} onClick={() => toggleMobileDropdown('services')}>
              Services {mobileDropdown === 'services' ? '−' : '+'}
            </button>
            <ul className={`${styles.mobileDropdownMenu} ${mobileDropdown === 'services' ? styles.show : ''}`}>
              {generalServices.map(service => (
                <li key={`services-${service.fields.slug}`} onClick={() => setMobileOpen(false)}>
                  <Link href={`/services/${service.fields.slug}`}>{service.fields.title}</Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Performance Services */}
          <li>
            <button className={styles.mobileDropdownToggle} onClick={() => toggleMobileDropdown('performance')}>
              Performance {mobileDropdown === 'performance' ? '−' : '+'}
            </button>
            <ul className={`${styles.mobileDropdownMenu} ${mobileDropdown === 'performance' ? styles.show : ''}`}>
              {performanceServices.map(service => (
                <li key={`performance-${service.fields.slug}`} onClick={() => setMobileOpen(false)}>
                  <Link href={`/services/${service.fields.slug}`}>{service.fields.title}</Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Contact */}
          <li onClick={() => setMobileOpen(false)}><Link href="/contact">Contact</Link></li>

          {/* ✅ Mobile Search */}
          <li>
            <button type="button" className={styles.mobileDropdownToggle} onClick={openSearch}>
              Search
            </button>
          </li>
        </ul>
      </div>

      {/* ✅ SEARCH OVERLAY (fills screen minus nav) */}
      {searchOpen && (
        <>
          <div className={styles.searchOverlayBackdrop} />
          <div className={styles.searchOverlay} ref={overlayRef} role="dialog" aria-modal="true" aria-label="Site search">
            <div className={styles.searchBar}>
              <input
                ref={inputRef}
                type="search"
                placeholder="Search services, projects…"
                className={styles.searchInput}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button type="button" className={styles.closeBtn} onClick={() => { setSearchOpen(false); setQ(''); setResults([]); setActive(-1) }}>
                ✕
              </button>
            </div>

            <div className={styles.searchResults}>
              {loading && <div className={styles.searchHint}>Loading index…</div>}
              {!loading && !q && <div className={styles.searchHint}>Type to search…</div>}
              {!loading && q && results.length === 0 && <div className={styles.searchHint}>No results.</div>}

              <ul>
                {results.map((r, i) => (
                  <li key={r.slug}>
                    <Link
                      href={r.slug}
                      onClick={() => setSearchOpen(false)}
                      className={`${styles.resultItem} ${i === active ? styles.resultActive : ''}`}
                      onMouseEnter={() => setActive(i)}
                    >
                      <div className={styles.resultTop}>
                        <span className={styles.resultTitle}>{r.title}</span>
                        <span className={styles.resultType}>{r.type}</span>
                      </div>
                      {r.description && <p className={styles.resultDesc}>{r.description}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
