import React from 'react'
import Image from 'next/image'

export default function Gallery(props) {

  return (
          <div>
              <Image
                src={`https:${props.images[0].fields.file.url}`}
                fill
              />
          </div>
  )
}
