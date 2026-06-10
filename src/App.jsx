import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedProducts from './components/FeaturedProducts'
import ThreeSections from './components/ThreeSections'
import MadeLocally from './components/MadeLocally'
import Gallery from './components/Gallery'
import MoreThanFabric from './components/MoreThanFabric'
import BookingBanner from './components/BookingBanner'
import Community from './components/Community'
import Footer from './components/Footer'
import CartPage from './components/CartPage'
import BookingModal from './components/BookingModal'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mayens-touch-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [cartInitialStep, setCartInitialStep] = useState('cart')
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('mayens-touch-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const upsertItem = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const addToCart = (product) => {
    upsertItem(product)
  }

  const buyNow = (product) => {
    upsertItem(product)
    setCartInitialStep('checkout')
    setCartOpen(true)
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id)
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item))
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="app">
      <Header
        onCartOpen={() => { setCartInitialStep('cart'); setCartOpen(true) }}
        cartCount={cartCount}
        onBookingOpen={() => setBookingOpen(true)}
      />
      <main>
        <Hero />
        <About />
        <FeaturedProducts onAddToCart={addToCart} onBuyNow={buyNow} />
        <ThreeSections />
        <MadeLocally />
        <Gallery />
        <MoreThanFabric />
        <BookingBanner onBooking={() => setBookingOpen(true)} />
        <Community />
      </main>
      <Footer />
      {cartOpen && (
        <CartPage
          items={cartItems}
          initialStep={cartInitialStep}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
        />
      )}
      {bookingOpen && (
        <BookingModal onClose={() => setBookingOpen(false)} />
      )}
    </div>
  )
}

export default App
