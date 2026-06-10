import './MoreThanFabric.css'

function MoreThanFabric() {
  return (
    <section className="more-than-fabric section">
      <div className="more-than-fabric__hero">
        <div className="more-than-fabric__sparkles" aria-hidden="true">
          {/* Decorative sparkle stars */}
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor">
              <path d="M30 20 L 33 30 L 43 33 L 33 36 L 30 46 L 27 36 L 17 33 L 27 30 Z" />
              <path d="M80 10 L 83 20 L 93 23 L 83 26 L 80 36 L 77 26 L 67 23 L 77 20 Z" />
              <path d="M50 60 L 52 67 L 59 69 L 52 71 L 50 78 L 48 71 L 41 69 L 48 67 Z" />
              <path d="M20 90 L 22 96 L 28 98 L 22 100 L 20 106 L 18 100 L 12 98 L 18 96 Z" />
              <path d="M100 50 L 102 56 L 108 58 L 102 60 L 100 66 L 98 60 L 92 58 L 98 56 Z" />
            </g>
          </svg>
        </div>
        <h2 className="more-than-fabric__heading serif">
          MORE THAN<br />
          JUST FABRIC
        </h2>
      </div>

      <div className="more-than-fabric__body container">
        <div className="more-than-fabric__spacer"></div>
        <div className="more-than-fabric__text">
          <h3 className="more-than-fabric__subhead">GIVING BACK</h3>
          <p>
            We never set out to be just a clothing brand. Mayen's Touch is as much about culture as it is about fashion — and part of that is showing up for the communities we belong to. From day one, we've believed in using the platform we're building to give back. That means supporting local initiatives, collaborating with purpose-led partners, and investing in the kind of change that outlives a single season. Whether it's through fabric that speaks beyond the runway or projects rooted in real impact, we're here to move the needle in fashion and in society.
          </p>
        </div>
      </div>
    </section>
  )
}

export default MoreThanFabric
