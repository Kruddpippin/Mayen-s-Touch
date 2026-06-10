import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__hero">
          <div className="site-footer__logos">
            <div className="site-footer__sparkles" aria-hidden="true">
              <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
                <g fill="currentColor">
                  <path d="M20 10 L 22 18 L 30 20 L 22 22 L 20 30 L 18 22 L 10 20 L 18 18 Z" />
                  <path d="M50 4 L 52 11 L 59 13 L 52 15 L 50 22 L 48 15 L 41 13 L 48 11 Z" />
                  <path d="M28 50 L 30 56 L 36 58 L 30 60 L 28 66 L 26 60 L 20 58 L 26 56 Z" />
                  <path d="M8 70 L 10 76 L 16 78 L 10 80 L 8 86 L 6 80 L 0 78 L 6 76 Z" />
                  <path d="M58 30 L 60 36 L 66 38 L 60 40 L 58 46 L 56 40 L 50 38 L 56 36 Z" />
                </g>
              </svg>
            </div>

            <svg className="site-footer__bird" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="55" cy="32" rx="20" ry="22" fill="currentColor"/>
              <circle cx="62" cy="27" r="2" fill="white"/>
              <path d="M40 35 Q 30 42, 25 60 Q 20 70, 25 80 L 80 80 Q 85 70, 80 60 Q 75 42, 65 35 Z" fill="currentColor"/>
              <path d="M25 80 L 30 92 M 75 80 L 80 92" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <text x="83" y="92" fontSize="6" fill="currentColor">TM</text>
            </svg>

            <svg className="site-footer__monogram" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="50" rx="42" ry="48" fill="currentColor"/>
              <g fill="white" fontFamily="serif">
                <path d="M30 30 L 30 70 L 36 70 L 36 50 L 50 50 L 64 70 L 70 70 L 56 50 C 62 48, 66 44, 66 38 C 66 32, 62 30, 56 30 Z M 36 36 L 56 36 C 60 36, 62 37, 62 40 C 62 43, 60 44, 56 44 L 36 44 Z" />
              </g>
            </svg>
          </div>

          <div className="site-footer__tagline">
            <p>MAYEN'S TOUCH</p>
            <p>A MODERN EXPRESSION OF HERITAGE</p>
          </div>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <h4 className="site-footer__heading">SITE INDEX</h4>
            <ul className="site-footer__links">
              <li><a href="/collections/all">SHOP NOW</a></li>
              <li><a href="/">HOME</a></li>
              <li><a href="/pages/about">ABOUT US</a></li>
              <li><a href="/pages/contact-us">CONTACT US</a></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h4 className="site-footer__heading">SOCIAL</h4>
            <ul className="site-footer__links">
              <li><a href="https://www.instagram.com/mayens.touch/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h4 className="site-footer__heading">GET IN TOUCH</h4>
            <ul className="site-footer__links">
              <li><a href="mailto:hello@mayenstouch.com">HELLO@MAYENSTOUCH.COM</a></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h4 className="site-footer__heading">LEGAL</h4>
            <ul className="site-footer__links">
              <li><a href="/pages/privacy-policy">PRIVACY POLICY</a></li>
              <li><a href="/pages/refund-policy">REFUNDS</a></li>
              <li><a href="/pages/shipping-policy">SHIPPING</a></li>
              <li><a href="/pages/terms-of-service">TERMS OF SERVICE</a></li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">ALL RIGHTS RESERVED _ MAYEN'S TOUCH©2026</p>
          <p className="site-footer__credit">
            <a href="https://www.kruddpippin.co/" target="_blank" rel="noopener noreferrer">Designed by Kruddpippin</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
