'use client'

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import styles from './portfolio.module.css'

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  // Prevent body scroll when lightbox is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  const img = images[index]?.fields?.file
  const alt = img?.title || `Image ${index + 1}`

  return createPortal(
    <div className={styles.lightboxOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <button className={styles.lightboxClose} aria-label="Close" onClick={onClose}>×</button>
      <button className={styles.lightboxArrowLeft} aria-label="Previous" onClick={(e) => { e.stopPropagation(); onPrev() }}>‹</button>
      <button className={styles.lightboxArrowRight} aria-label="Next" onClick={(e) => { e.stopPropagation(); onNext() }}>›</button>

      <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.lightboxImageWrapper}>
          {img && (
            <Image
              src={`https:${img.url}`}
              alt={alt}
              fill
              sizes="100vw"
              className={styles.lightboxImage}
              priority
            />
          )}
        </div>
        <div className={styles.lightboxCaption}>
          <span className={styles.lightboxIndex}>{index + 1} / {images.length}</span>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Gallery({ images }) {
  if (!images || images.length === 0) return null

  const normalized = useMemo(() => images.filter(Boolean), [images])

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const openAt = useCallback((i) => {
    setCurrent(i)
    setLightboxOpen(true)
  }, [])

  const close = useCallback(() => setLightboxOpen(false), [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + normalized.length) % normalized.length)
  }, [normalized.length])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % normalized.length)
  }, [normalized.length])

  // Single image: still clickable to open lightbox
  if (normalized.length === 1) {
    const img = normalized[0].fields.file
    return (
      <>
        <div className={styles.singleImageWrapper}>
          <button
            type="button"
            className={styles.clickable}
            onClick={() => openAt(0)}
            aria-label="Open image"
          >
            <Image
              src={`https:${img.url}`}
              alt={img.title || 'Gallery Image'}
              fill
              quality={70}
              className={styles.image}
            />
          </button>
        </div>
        {lightboxOpen && (
          <Lightbox images={normalized} index={current} onClose={close} onPrev={prev} onNext={next} />
        )}
      </>
    )
  }

  // Multiple images via Swiper
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className={styles.swiper}
      >
        {normalized.map((imageObj, index) => {
          const img = imageObj.fields.file
          return (
            <SwiperSlide key={index}>
              <div className={styles.imageWrapper}>
                <button
                  type="button"
                  className={styles.clickable}
                  onClick={() => openAt(index)}
                  aria-label={`Open image ${index + 1}`}
                >
                  <Image
                    src={`https:${img.url}`}
                    alt={img.title || `Image ${index + 1}`}
                    fill
                    className={styles.image}
                  />
                </button>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {lightboxOpen && (
        <Lightbox images={normalized} index={current} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  )
}
