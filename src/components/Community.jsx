import './Community.css'

const partners = [
  {
    name: "Mayen's Touch Collective",
    description: 'A creative collective rooted in African fashion, art, and culture. We bring together designers, stylists, and storytellers who believe that clothing is more than fabric — it is identity, heritage, and expression made visible.',
    href: '/',
  },
  {
    name: 'Partner 1',
    description: "Partner 1 is a passionate team making a measurable difference in the fight against a specific kind of malnutrition which is the leading cause of child stunting. We don't just talk about the problem – we take action by designing, producing, and delivering nutrient-rich, ready-to-eat meals directly to vulnerable communities.",
    href: 'https://startwellfoundation.org/',
  },
  {
    name: 'Partner 2',
    description: "The world moves fast, but we believe there's something powerful about slowing down. A moment to take in. To connect. To be present. It's a reminder of what happens when people gather around something simple, yet made with care: coffee & connections.",
    href: 'https://www.instagram.com/twofortytwo.co/',
  },
  {
    name: 'Partner 3',
    description: 'Partner 3 is a community where Everyday fashion lovers can find a place to belong. We cater to all tastes and standards of brilliance, and strive to provide the accountability and inspiration needed to reach your goals.',
    href: 'https://www.runninglateclub.com/',
  },
]

function Community() {
  return (
    <section className="community section">
      <div className="container">
        <h3 className="community__label">OUR GREATER COMMUNITY</h3>

        <div className="community__list">
          {partners.map((partner, idx) => (
            <article key={idx} className="community__item">
              <h4 className="community__name">{partner.name}</h4>
              <p className="community__desc">{partner.description}</p>
              <a
                href={partner.href}
                className="community__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bracket">[</span>
                <span>VISIT WEBSITE</span>
                <span className="bracket">]</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Community
