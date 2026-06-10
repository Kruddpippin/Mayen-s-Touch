import { useState } from 'react'
import './Gallery.css'

const galleryImages = [
  'https://oddritualgolf.com/cdn/shop/files/Home_Gallery1.jpg?v=1769362838',
  'https://oddritualgolf.com/cdn/shop/files/Home_Gallery2.jpg?v=1769362870',
  'https://oddritualgolf.com/cdn/shop/files/Home_Gallery3.jpg?v=1769362888',
  'https://oddritualgolf.com/cdn/shop/files/Home_Gallery4.jpg?v=1769362980',
  'https://oddritualgolf.com/cdn/shop/files/Home_Gallery5.jpg?v=1769362999',
  'https://oddritualgolf.com/cdn/shop/files/Gallery.6.jpg?v=1748434300',
  'https://oddritualgolf.com/cdn/shop/files/Home_Gallery7.2.jpg?v=1769409481',
]

function Gallery() {
  const [activeIdx, setActiveIdx] = useState(0)

  const total = galleryImages.length
  const padded = String(activeIdx + 1).padStart(2, '0')

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? total - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev === total - 1 ? 0 : prev + 1))
  }

  return (
    <section className="gallery">
      <div className="gallery__viewport">
        {galleryImages.map((image, idx) => (
          <div
            key={idx}
            className={`gallery__slide ${idx === activeIdx ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        <div className="gallery__controls">
          <span className="gallery__label">MAYEN'S TOUCH</span>
          <button
            className="gallery__btn gallery__btn--prev"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <span className="bracket">[</span>
            <span>PREV</span>
            <span className="bracket">]</span>
          </button>
          <button
            className="gallery__btn gallery__btn--next"
            onClick={handleNext}
            aria-label="Next"
          >
            <span className="bracket">[</span>
            <span>NEXT</span>
            <span className="bracket">]</span>
          </button>
          <span className="gallery__counter">{padded}</span>
        </div>
      </div>
    </section>
  )
}

export default Gallery
