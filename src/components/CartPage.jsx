import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './CartPage.css'

function CartPage({ items, initialStep = 'cart', onClose, onRemove, onUpdateQty }) {
  const [step, setStep] = useState(initialStep)
  const [fulfillment, setFulfillment] = useState('delivery')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [placing, setPlacing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderError, setOrderError] = useState(null)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '',
    cardNumber: '', cardName: '', expiry: '', cvv: '',
  })

  const parsePrice = (str) => parseFloat(str.replace(/[^0-9.]/g, '').replace(',', '')) || 0

  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0)
  const shipping = subtotal > 0 && fulfillment === 'delivery' ? 5000 : 0
  const total = subtotal + shipping

  const fmt = (n) => `₦ ${n.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`

  const handleInput = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const formatCardNumber = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16)
    const spaced = val.replace(/(.{4})/g, '$1 ').trim()
    setForm(prev => ({ ...prev, cardNumber: spaced }))
  }

  const formatExpiry = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4)
    const formatted = val.length > 2 ? val.slice(0, 2) + ' / ' + val.slice(2) : val
    setForm(prev => ({ ...prev, expiry: formatted }))
  }

  const handlePlaceOrder = async () => {
    if (placing) return
    setPlacing(true)
    setOrderError(null)

    if (!supabase) {
      setPlacing(false)
      setOrderPlaced(true)
      return
    }

    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({
        customer_name: `${form.firstName} ${form.lastName}`.trim(),
        customer_email: form.email,
        customer_phone: form.phone,
        fulfillment,
        address: fulfillment === 'delivery' ? form.address : null,
        city: fulfillment === 'delivery' ? form.city : null,
        state: fulfillment === 'delivery' ? form.state : null,
        payment_method: paymentMethod,
        subtotal,
        shipping,
        total,
      })
      .select('id')
      .single()

    if (orderErr) {
      setOrderError('Could not place order. Please try again.')
      setPlacing(false)
      return
    }

    const lineItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_title: item.title,
      product_code: item.code || null,
      price: parsePrice(item.price),
      quantity: item.qty,
    }))

    const { error: itemsErr } = await supabase.from('order_items').insert(lineItems)
    if (itemsErr) console.error('Order items error:', itemsErr)

    setPlacing(false)
    setOrderPlaced(true)
  }

  return (
    <div className="cart-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cart-page">

        <div className="cart-page__header">
          <div className="cart-page__header-left">
            {step === 'checkout' && (
              <button className="cart-back" onClick={() => setStep('cart')}>← BACK</button>
            )}
            <h2 className="cart-page__title">
              {step === 'cart' ? 'YOUR CART' : 'CHECKOUT'}
              {items.length > 0 && <span className="cart-page__count">({items.length})</span>}
            </h2>
          </div>
          <button className="cart-page__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="cart-page__body">

          {/* ── LEFT COLUMN ── */}
          <div className="cart-page__left">

            {items.length === 0 ? (
              <div className="cart-empty">
                <p className="cart-empty__msg">Your cart is empty.</p>
                <button className="cart-empty__cta" onClick={onClose}>CONTINUE SHOPPING</button>
              </div>
            ) : (
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item__img" />
                    <div className="cart-item__info">
                      <h3 className="cart-item__title">{item.title}</h3>
                      <p className="cart-item__code">{item.code}</p>
                      <p className="cart-item__price">{item.price}</p>
                      <div className="cart-item__qty">
                        <button onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                    </div>
                    <button className="cart-item__remove" onClick={() => onRemove(item.id)} aria-label="Remove">✕</button>
                  </div>
                ))}
              </div>
            )}

            {step === 'checkout' && items.length > 0 && (
              <div className="checkout-form">

                {/* ── Fulfillment Toggle ── */}
                <h3 className="checkout-section__title">FULFILMENT METHOD</h3>
                <div className="fulfillment-toggle">
                  <button
                    className={`fulfillment-option ${fulfillment === 'delivery' ? 'is-active' : ''}`}
                    onClick={() => setFulfillment('delivery')}
                    type="button"
                  >
                    <span className="fulfillment-option__icon">🚚</span>
                    <span className="fulfillment-option__label">Delivery</span>
                    <span className="fulfillment-option__sub">Ship to your address</span>
                  </button>
                  <button
                    className={`fulfillment-option ${fulfillment === 'pickup' ? 'is-active' : ''}`}
                    onClick={() => setFulfillment('pickup')}
                    type="button"
                  >
                    <span className="fulfillment-option__icon">🏪</span>
                    <span className="fulfillment-option__label">Pick Up In-Store</span>
                    <span className="fulfillment-option__sub">Free · Ready in 24 hrs</span>
                  </button>
                </div>

                {/* ── Contact (shared) ── */}
                <h3 className="checkout-section__title">CONTACT DETAILS</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleInput} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleInput} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleInput} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" placeholder="+234 000 000 0000" value={form.phone} onChange={handleInput} />
                  </div>
                </div>

                {/* ── Delivery address ── */}
                {fulfillment === 'delivery' && (
                  <>
                    <h3 className="checkout-section__title">DELIVERY ADDRESS</h3>
                    <div className="form-group form-full">
                      <label>Street Address</label>
                      <input name="address" placeholder="Street address" value={form.address} onChange={handleInput} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input name="city" placeholder="City" value={form.city} onChange={handleInput} />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input name="state" placeholder="State" value={form.state} onChange={handleInput} />
                      </div>
                    </div>
                  </>
                )}

                {/* ── Pickup info ── */}
                {fulfillment === 'pickup' && (
                  <div className="pickup-info">
                    <div className="pickup-info__row">
                      <span className="pickup-info__label">Store</span>
                      <strong>Mayen's Touch Atelier</strong>
                    </div>
                    <div className="pickup-info__row">
                      <span className="pickup-info__label">Address</span>
                      <strong>12 Adeola Odeku St, Victoria Island, Lagos</strong>
                    </div>
                    <div className="pickup-info__row">
                      <span className="pickup-info__label">Hours</span>
                      <strong>Mon – Sat · 9 AM – 6 PM</strong>
                    </div>
                    <div className="pickup-info__row">
                      <span className="pickup-info__label">Ready in</span>
                      <strong>Within 24 hours of order</strong>
                    </div>
                    <p className="pickup-info__note">
                      You'll receive a confirmation email and SMS when your order is ready for collection. Please bring a valid ID.
                    </p>
                  </div>
                )}

              </div>
            )}

            {step === 'cart' && items.length > 0 && (
              <button className="proceed-btn" onClick={() => setStep('checkout')}>
                PROCEED TO CHECKOUT <span>→</span>
              </button>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="cart-page__right">
            <div className="order-summary">
              <h3 className="order-summary__title">ORDER SUMMARY</h3>
              <div className="order-summary__items">
                {items.map(item => (
                  <div key={item.id} className="order-summary__row">
                    <span className="order-summary__name">{item.title} <em>×{item.qty}</em></span>
                    <span className="order-summary__price">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="order-summary__divider" />
              <div className="order-summary__row">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="order-summary__row">
                <span>{fulfillment === 'pickup' ? 'Fulfilment' : 'Shipping'}</span>
                <span>
                  {subtotal === 0 ? '—' : fulfillment === 'pickup' ? 'Free (In-Store)' : fmt(shipping)}
                </span>
              </div>
              <div className="order-summary__row order-summary__total">
                <span>TOTAL</span>
                <span>{fmt(total)}</span>
              </div>
            </div>

            {step === 'checkout' && items.length > 0 && (
              <div className="payment-section">
                <h3 className="payment-section__title">PAYMENT METHOD</h3>

                <div className="payment-tabs">
                  {[
                    { id: 'card', label: 'CARD' },
                    { id: 'paystack', label: 'PAYSTACK' },
                    { id: 'transfer', label: 'BANK TRANSFER' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      className={`payment-tab ${paymentMethod === tab.id ? 'is-active' : ''}`}
                      onClick={() => setPaymentMethod(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="payment-card">
                    <div className="card-preview">
                      <span className="card-preview__number">
                        {form.cardNumber || '•••• •••• •••• ••••'}
                      </span>
                      <div className="card-preview__bottom">
                        <span>{form.cardName || 'CARDHOLDER NAME'}</span>
                        <span>{form.expiry || 'MM / YY'}</span>
                      </div>
                    </div>
                    <div className="form-group form-full">
                      <label>Card Number</label>
                      <input
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={form.cardNumber}
                        onChange={formatCardNumber}
                        maxLength={19}
                      />
                    </div>
                    <div className="form-group form-full">
                      <label>Name on Card</label>
                      <input name="cardName" placeholder="As it appears on card" value={form.cardName} onChange={handleInput} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry</label>
                        <input name="expiry" placeholder="MM / YY" value={form.expiry} onChange={formatExpiry} maxLength={7} />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input name="cvv" placeholder="•••" maxLength={4} value={form.cvv} onChange={handleInput} type="password" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paystack' && (
                  <div className="payment-paystack">
                    <div className="paystack-badge">
                      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#00C3F7"/>
                        <path d="M10 15h20M10 20h20M10 25h15" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      <span>PAYSTACK</span>
                    </div>
                    <p className="paystack-desc">
                      You will be securely redirected to Paystack to complete your payment. Supports all Nigerian banks, cards, and USSD.
                    </p>
                    <ul className="paystack-methods">
                      <li>✓ Debit / Credit Card</li>
                      <li>✓ Bank Transfer</li>
                      <li>✓ USSD</li>
                      <li>✓ Mobile Money</li>
                    </ul>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="payment-transfer">
                    <p className="transfer-note">
                      Transfer the exact total to the account below, then send proof of payment to{' '}
                      <a href="mailto:hello@mayenstouch.com">hello@mayenstouch.com</a>
                    </p>
                    <div className="transfer-details">
                      <div className="transfer-row">
                        <span>Bank</span>
                        <strong>First Bank of Nigeria</strong>
                      </div>
                      <div className="transfer-row">
                        <span>Account Name</span>
                        <strong>MAYEN'S TOUCH LTD</strong>
                      </div>
                      <div className="transfer-row">
                        <span>Account Number</span>
                        <strong>0123456789</strong>
                      </div>
                      <div className="transfer-row">
                        <span>Amount</span>
                        <strong className="transfer-amount">{fmt(total)}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {orderError && <p className="order-error">{orderError}</p>}
                {orderPlaced ? (
                  <div className="order-success">
                    <p className="order-success__title">Order Placed ✓</p>
                    <p className="order-success__msg">
                      Thank you! A confirmation will be sent to <strong>{form.email}</strong>.
                    </p>
                    <button className="cart-empty__cta" onClick={onClose}>CLOSE</button>
                  </div>
                ) : (
                  <button
                    className="place-order-btn"
                    onClick={handlePlaceOrder}
                    disabled={placing}
                  >
                    {placing ? 'PLACING ORDER…' : paymentMethod === 'paystack' ? 'PAY WITH PAYSTACK' : 'PLACE ORDER'}
                    {!placing && <span className="place-order-btn__arrow">→</span>}
                  </button>
                )}
                <p className="secure-note">🔒 Secured &amp; encrypted checkout</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
