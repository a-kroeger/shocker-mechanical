'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import styles from './portfolio.module.css'

export default function Gallery({ images }) {
  // If only one image, just render it normally
  if (!images || images.length === 0) return null

  if (images.length === 1) {
    const img = images[0].fields.file
    return (
      <div className={styles.singleImageWrapper}>
        <Image
          src={`https:${img.url}`}
          alt={img.title || 'Gallery Image'}
          fill
          className={styles.image}
        />
      </div>
    )
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      className={styles.swiper}
    >
      {images.map((imageObj, index) => {
        const img = imageObj.fields.file
        return (
          <SwiperSlide key={index}>
            <div className={styles.imageWrapper}>
              <Image
                src={`https:${img.url}`}
                alt={img.title || `Image ${index + 1}`}
                fill
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
