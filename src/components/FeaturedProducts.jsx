import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './FeaturedProducts.css'

const FALLBACK_PRODUCTS = [
  {
    id: 'dc-kaftan-navy',
    title: "[PRE_ORDER] Mayen's Touch Kaftan [Navy]",
    code: 'DC_SS26_KFT_N',
    price: 'N 112,200.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/ODD_Navy_Back.jpg?v=1778054735',
    hover: 'https://oddritualgolf.com/cdn/shop/files/ODD_Navy.jpg?v=1778054734',
    href: '/products/mayens-touch-kaftan-navy',
  },
  {
    id: 'dc-kaftan-white',
    title: "[PRE_ORDER] Mayen's Touch Kaftan [White]",
    code: 'DC_SS26_KFT_W',
    price: 'N 301,200.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/ODD_WHITE_Back.jpg?v=1778056523',
    hover: 'https://oddritualgolf.com/cdn/shop/files/ODD_WHITE.jpg?v=1778056523',
    href: '/products/mayens-touch-kaftan-white',
  },
  {
    id: 'dc-cord-cap-maroon',
    title: "[PRE_ORDER] Mayen's Touch Corduroy Cap [Maroon]",
    code: 'DC_SS26_COR_M',
    price: 'N 208,850.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/CORDCAP_Maroon_F_d09ad2d0-7205-410f-b261-6eaa0be55862.jpg?v=1778057661',
    hover: 'https://oddritualgolf.com/cdn/shop/files/CORDCAP_Maroon_S.jpg?v=1778057505',
    href: '/products/mayens-touch-corduroy-cap-maroon',
  },
  {
    id: 'dc-monogram-tee-black',
    title: 'DC Monogram Tee [Black]',
    code: 'DC_MNG_T_B',
    price: 'N 101,000.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/T_BLK_MNG_B.jpg?v=1769258644',
    hover: 'https://oddritualgolf.com/cdn/shop/files/DSC08485.jpg?v=1769261658',
    href: '/products/dc-monogram-tee-black',
  },
  {
    id: 'dc-classic-tee-white',
    title: "Mayen's Touch Classic Tee [White]",
    code: 'DC_CLS_T_W',
    price: 'N 111,000.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/T_WHT_BRD_B.jpg?v=1769259626',
    hover: 'https://oddritualgolf.com/cdn/shop/files/DSC08398.jpg?v=1769262035',
    href: '/products/mayens-touch-classic-tee-white',
  },
  {
    id: 'dc-cap-navy',
    title: "Mayen's Touch Cap [Navy]",
    code: 'DC_CAP_N',
    price: 'N 80,000.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/DSC08915_4734c6f8-8d31-4399-949f-8c4565a6f4fc.jpg?v=1769257141',
    hover: 'https://oddritualgolf.com/cdn/shop/files/DSC08353.jpg?v=1769260740',
    href: '/products/mayens-touch-cap-navy',
  },
  {
    id: 'dc-monogram-cap',
    title: 'DC Monogram Cap [White/Brown]',
    code: 'DC_MNG_CAP_WB',
    price: 'N 75,000.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/DSC08933.jpg?v=1769257752',
    hover: 'https://oddritualgolf.com/cdn/shop/files/DSC08829.jpg?v=1769261491',
    href: '/products/dc-monogram-cap-white-brown',
  },
  {
    id: 'dc-kaftan-maroon',
    title: "[PRE_ORDER] Mayen's Touch Kaftan [Maroon]",
    code: 'DC_SS26_KFT_M',
    price: 'N 112,200.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/CORDCAP_Maroon_F_d09ad2d0-7205-410f-b261-6eaa0be55862.jpg?v=1778057661',
    hover: 'https://oddritualgolf.com/cdn/shop/files/ODD_Navy_Back.jpg?v=1778054735',
    href: '/products/mayens-touch-kaftan-maroon',
  },
  {
    id: 'dc-kaftan-sage',
    title: "[PRE_ORDER] Mayen's Touch Kaftan [Sage]",
    code: 'DC_SS26_KFT_S',
    price: 'N 156,000.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/ODD_WHITE.jpg?v=1778056523',
    hover: 'https://oddritualgolf.com/cdn/shop/files/ODD_WHITE_Back.jpg?v=1778056523',
    href: '/products/mayens-touch-kaftan-sage',
  },
  {
    id: 'dc-cord-cap-black',
    title: "[PRE_ORDER] Mayen's Touch Corduroy Cap [Black]",
    code: 'DC_SS26_COR_B',
    price: 'N 208,850.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/DSC08915_4734c6f8-8d31-4399-949f-8c4565a6f4fc.jpg?v=1769257141',
    hover: 'https://oddritualgolf.com/cdn/shop/files/CORDCAP_Maroon_S.jpg?v=1778057505',
    href: '/products/mayens-touch-corduroy-cap-black',
  },
  {
    id: 'dc-monogram-tee-white',
    title: 'DC Monogram Tee [White]',
    code: 'DC_MNG_T_W',
    price: 'N 101,000.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/T_WHT_BRD_B.jpg?v=1769259626',
    hover: 'https://oddritualgolf.com/cdn/shop/files/DSC08398.jpg?v=1769262035',
    href: '/products/dc-monogram-tee-white',
  },
  {
    id: 'dc-classic-tee-black',
    title: "Mayen's Touch Classic Tee [Black]",
    code: 'DC_CLS_T_B',
    price: 'N 111,000.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/T_BLK_MNG_B.jpg?v=1769258644',
    hover: 'https://oddritualgolf.com/cdn/shop/files/DSC08485.jpg?v=1769261658',
    href: '/products/mayens-touch-classic-tee-black',
  },
  {
    id: 'dc-bomber-jacket-black',
    title: "[PRE_ORDER] Mayen's Touch Bomber Jacket [Black]",
    code: 'DC_SS26_BMB_B',
    price: 'N 245,000.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/DSC08829.jpg?v=1769261491',
    hover: 'https://oddritualgolf.com/cdn/shop/files/DSC08933.jpg?v=1769257752',
    href: '/products/mayens-touch-bomber-jacket-black',
  },
  {
    id: 'dc-monogram-hoodie-cream',
    title: 'DC Monogram Hoodie [Cream]',
    code: 'DC_MNG_HD_C',
    price: 'N 135,000.00',
    image: 'https://oddritualgolf.com/cdn/shop/files/DSC08353.jpg?v=1769260740',
    hover: 'https://oddritualgolf.com/cdn/shop/files/DSC08485.jpg?v=1769261658',
    href: '/products/dc-monogram-hoodie-cream',
  },
]

function FeaturedProducts({ onAddToCart, onBuyNow }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [products, setProducts] = useState(FALLBACK_PRODUCTS)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('products')
      .select('*')
      .eq('available', true)
      .order('created_at')
      .then(({ data }) => {
        if (data && data.length > 0) {
          setProducts(data.map(p => ({ ...p, hover: p.image_hover })))
        }
      })
  }, [])

  return (
    <section id="collections" className="featured section">
      <div className="featured__label">
        <span>( FEATURED COLLECTION )</span>
      </div>

      <div className="featured__track">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <a href={product.href} className="product-card__image-wrap">
              <img
                src={product.image}
                alt={product.title}
                className={`product-card__image ${hoveredId === product.id ? 'is-hidden' : ''}`}
                loading="lazy"
              />
              <img
                src={product.hover}
                alt=""
                className={`product-card__image product-card__image--hover ${hoveredId === product.id ? 'is-visible' : ''}`}
                loading="lazy"
                aria-hidden="true"
              />
            </a>
            <div className={`product-card__info ${hoveredId === product.id ? 'is-visible' : ''}`}>
              <div className="product-card__top">
                <h3 className="product-card__title">{product.title}</h3>
                <p className="product-card__code">({product.code})</p>
              </div>
              <div className="product-card__bottom">
                <span className="product-card__price">{product.price}</span>
                <div className="product-card__actions">
                  <button
                    className="product-card__btn product-card__btn--cart"
                    onClick={(e) => { e.preventDefault(); onAddToCart(product) }}
                    aria-label={`Add ${product.title} to cart`}
                  >
                    ADD TO CART
                  </button>
                  <button
                    className="product-card__btn product-card__btn--buy"
                    onClick={(e) => { e.preventDefault(); onBuyNow(product) }}
                    aria-label={`Buy ${product.title} now`}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="featured__view-all">
        <a href="/collections/all" className="view-all-btn">
          <span className="bracket">[</span>
          <span>VIEW ALL COLLECTIONS</span>
          <span className="bracket">]</span>
        </a>
      </div>
    </section>
  )
}

export default FeaturedProducts
