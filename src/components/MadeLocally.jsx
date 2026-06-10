import './MadeLocally.css'

function MadeLocally() {
  return (
    <section className="made-locally">
      <div className="container">
        <div className="made-locally__header">
          <p className="made-locally__title serif">
            MAYEN'S TOUCH©2026<br />
            DESIGNED AND MADE LOCALLY
          </p>
        </div>

        <div className="made-locally__columns">
          <div className="made-locally__col made-locally__col--left">
            <span>ABUJA</span>
          </div>
          <div className="made-locally__col made-locally__col--center">
            <p>
              OUR COUNTRY IS RICH IN CULTURE, DIVERSITY, AND HERITAGE — PRODUCING LOCALLY IS HOW WE CARRY OUR CULTURE FORWARD. WHEREVER WE GO, WE REPRESENT. MADE FOR US, BY US.
            </p>
          </div>
          <div className="made-locally__col made-locally__col--right">
            <span>NIGERIA</span>
          </div>
        </div>

        <div className="made-locally__monogram">
          {/* OR Monogram in brand blue */}
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="var(--swatch--brand)" strokeWidth="6">
              <circle cx="38" cy="40" r="22" />
              <path d="M 60 20 Q 75 25, 75 45 Q 75 65, 60 70 L 60 80" />
              <path d="M 38 62 L 38 80" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default MadeLocally
