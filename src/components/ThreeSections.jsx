import './ThreeSections.css'

const sections = [
  {
    label: 'OUR PRODUCTS',
    sublabel: 'COLLECTION 01 & 02',
    cta: 'SHOP NOW',
    image: 'https://oddritualgolf.com/cdn/shop/files/DSC07658.jpg?v=1748602870',
    href: '/collections/all',
  },
  {
    label: 'OUR STORY',
    sublabel: 'About us',
    cta: 'Read more',
    image: 'https://oddritualgolf.com/cdn/shop/files/DSC04379b.jpg?v=1748603125',
    href: '/pages/about',
  },
  {
    label: 'OUR COMMUNITY',
    sublabel: 'Social',
    cta: 'Instagram',
    image: 'https://oddritualgolf.com/cdn/shop/files/DSC07180-2.jpg?v=1748601863',
    href: 'https://www.instagram.com/mayens.touch/',
  },
]

function ThreeSections() {
  return (
    <section className="three-sections">
      {sections.map((section, idx) => (
        <a
          key={idx}
          href={section.href}
          className="three-sections__item"
        >
          <h2 className="three-sections__label">{section.label}</h2>
          <div className="three-sections__image-wrap">
            <img src={section.image} alt={section.label} loading="lazy" />
          </div>
          <div className="three-sections__overlay">
            <span className="three-sections__sublabel">{section.sublabel}</span>
            <span className="three-sections__cta">
              <span className="bracket">[</span>
              <span>{section.cta}</span>
              <span className="bracket">]</span>
            </span>
          </div>
        </a>
      ))}
    </section>
  )
}

export default ThreeSections
