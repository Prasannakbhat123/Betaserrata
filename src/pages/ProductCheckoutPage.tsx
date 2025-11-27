import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { countries, formatCurrency, productCatalog } from '../data/products'
import Navbar from '../components/Navbar'
import { navItems } from '../data'

const CART_STORAGE_KEY = 'betaserrataCart'
const OTP_CODE = '111111'

type CartShape = Record<string, number>
type LocationState = {
  cart?: CartShape
}

const checkoutTimeline = [
  { title: '1. Intake exported', detail: 'Cart and delivery data sync to the fulfillment workspace immediately.' },
  { title: '2. Payment confirmation', detail: 'Preferred gateway confirms payment status for the ops console.' },
  { title: '3. Concierge outreach', detail: 'WhatsApp/email updates share invoice, tracking, and care guidance.' },
]

const ProductCheckoutPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const locationCart = (location.state as LocationState | null)?.cart

  const [cart, setCart] = useState<CartShape>(() => {
    if (locationCart) return locationCart
    try {
      const stored = sessionStorage.getItem(CART_STORAGE_KEY)
      return stored ? (JSON.parse(stored) as CartShape) : {}
    } catch {
      return {}
    }
  })
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('IN')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('Daytime delivery works best for clinic handover.')
  const [otpInput, setOtpInput] = useState('')
  const [phase, setPhase] = useState<'contact' | 'otp' | 'payment' | 'invoice'>('contact')
  const [status, setStatus] = useState<{ tone: 'success' | 'error'; message: string } | null>(null)

  const selectedCountry = countries.find((c) => c.code === country) ?? countries[0]

  useEffect(() => {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const subtotal = useMemo(() => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const product = productCatalog.find((item) => item.id === id)
      if (!product) return total
      return total + product.price * qty
    }, 0)
  }, [cart])

  const fulfillmentFee = subtotal > 0 ? 90 : 0
  const taxes = subtotal * 0.05
  const totalDue = subtotal + taxes + fulfillmentFee
  const hasCartItems = subtotal > 0

  const handleQuantityChange = (id: string, delta: number) => {
    setCart((prev) => {
      const next = { ...prev }
      const nextQty = Math.max(0, (next[id] || 0) + delta)
      if (nextQty === 0) {
        delete next[id]
      } else {
        next[id] = nextQty
      }
      return next
    })
  }

  // Future gateway hook: send payload to Stripe/Razorpay before OTP.
  const handleSendOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!hasCartItems) {
      setStatus({ tone: 'error', message: 'Your cart is empty. Add products first.' })
      return
    }
    if (!customerName.trim()) {
      setStatus({ tone: 'error', message: 'Add a recipient name to continue.' })
      return
    }
    if (!address.trim()) {
      setStatus({ tone: 'error', message: 'Add the delivery address to continue.' })
      return
    }
    if (!/^\d{10}$/.test(phone)) {
      setStatus({ tone: 'error', message: 'Enter a 10-digit phone number to receive the verification code.' })
      return
    }
    setPhase('otp')
    setStatus({ tone: 'success', message: 'Verification code sent to the provided phone number.' })
  }

  const handleVerifyOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (otpInput === OTP_CODE) {
      setPhase('payment')
      setStatus({ tone: 'success', message: 'OTP verified. Proceed to payment to complete your order.' })
    } else {
      setStatus({ tone: 'error', message: 'Incorrect verification code. Please try again.' })
    }
  }

  // Payment handler - integrate Stripe/Razorpay here
  const handlePayment = async () => {
    // TODO: Integrate Stripe Payment Intent or Razorpay Order creation
    // Example flow:
    // 1. Create payment intent/order with backend
    // 2. Redirect to payment gateway or show payment form
    // 3. On success, proceed to invoice phase
    
    // For now, simulate payment success
    setPhase('invoice')
    setStatus({ tone: 'success', message: 'Payment successful! Your order has been confirmed.' })
  }

  const handleNavigate = () => {
    navigate('/')
  }

  if (!hasCartItems) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-[#fefaf4] to-white">
        <Navbar items={navItems} activeSection="home" onNavigate={handleNavigate} />
        <section className="pt-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 pt-16 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Checkout</p>
          <h1 className="text-3xl font-semibold text-slate-900">Your cart is empty</h1>
          <p className="text-sm text-slate-600">Return to the product page to add the Ayurvedic tablet or oil-gel to your selection.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Go back
            </button>
            <Link
              to="/product"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-slate-800"
            >
              Browse products
            </Link>
          </div>
          </div>
        </section>
        <footer className="border-t border-slate-200/80 bg-white/90 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-500 sm:flex-row sm:px-8">
            <p>© {new Date().getFullYear()} Betaserrata. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Privacy</span>
              <span>Compliance</span>
              <span>Careers</span>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-[#fefaf4] to-white">
      <Navbar items={navItems} activeSection="home" onNavigate={handleNavigate} />
      <section className="pb-16 pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Checkout</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">Confirm delivery & finish verification</h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">Review each line item, capture delivery preferences, and lock the slot with a quick code.</p>
          </div>
          <div className="flex gap-2 sm:gap-3 flex-shrink-0">
            <Link
              to="/product"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Edit cart
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-900 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.32em] text-white transition hover:bg-slate-800 hover:border-slate-800"
              style={{ color: 'white' }}
            >
              Homepage
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6 order-1">
            <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Order summary</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Products in cart</h2>
              <div className="mt-6 space-y-4">
                {productCatalog
                  .filter((product) => cart[product.id])
                  .map((product) => (
                    <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/70 p-4">
                      <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.volume}</p>
                        <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="grid h-6 w-6 place-items-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-slate-100"
                          >
                            −
                          </button>
                          <span className="min-w-[2ch] text-center text-sm font-semibold text-slate-900">{cart[product.id]}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="grid h-6 w-6 place-items-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{formatCurrency(product.price * (cart[product.id] || 0))}</p>
                    </div>
                  ))}
              </div>

              <div className="mt-6 space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Regulatory-ready pack</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(taxes)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cold-chain fulfillment</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(fulfillmentFee)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-semibold text-slate-900">
                  <span>Total due</span>
                  <span>{formatCurrency(totalDue)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/5 backdrop-blur order-3 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Fulfillment</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Playbook immediately after checkout</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {checkoutTimeline.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/5 backdrop-blur order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Secure checkout</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Contact & verification</h2>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span className={`h-2 w-2 rounded-full ${phase === 'contact' ? 'bg-emerald-500' : phase === 'otp' ? 'bg-amber-500' : phase === 'payment' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
              {phase === 'contact' ? 'Collecting preferences' : phase === 'otp' ? 'Awaiting verification' : phase === 'payment' ? 'Ready to pay' : 'Order confirmed'}
            </div>

            {status && (
              <div
                className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                  status.tone === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'
                }`}
              >
                {status.message}
              </div>
            )}

            {phase === 'contact' && (
              <form className="mt-6 space-y-4" onSubmit={handleSendOtp}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Full name
                    <input
                      type="text"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
                      placeholder="Dr. Aditi Rao"
                      required
                    />
                  </label>
                  <label className="block text-sm font-semibold text-slate-900">
                    Email (optional)
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
                      placeholder="clinic@betaserrata.com"
                    />
                  </label>
                </div>
                <label className="block text-sm font-semibold text-slate-900">
                  Country
                  <select
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-semibold text-slate-900">
                  Phone number
                  <div className="mt-1 flex rounded-2xl border border-slate-200 bg-white">
                    <span className="flex items-center px-3 text-sm font-semibold text-slate-600">{selectedCountry.dialCode}</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full border-l border-slate-200 px-4 py-3 text-base outline-none transition focus:border-slate-900"
                      placeholder="9876543210"
                      required
                    />
                  </div>
                </label>
                <label className="block text-sm font-semibold text-slate-900">
                  Address
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                    placeholder="Clinic name, street, city, postal code"
                    required
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-900">
                  Delivery note (optional)
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-slate-800"
                >
                  Send verification code
                </button>
              </form>
            )}

            {phase === 'otp' && (
              <form className="mt-6 space-y-4" onSubmit={handleVerifyOtp}>
                <label className="block text-sm font-semibold text-slate-900">
                  Enter verification code
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(event) => setOtpInput(event.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none transition focus:border-slate-900"
                    placeholder="------"
                  />
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPhase('contact')
                      setStatus(null)
                      setOtpInput('')
                    }}
                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    Edit phone number
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-emerald-500"
                  >
                    Verify code
                  </button>
                </div>
              </form>
            )}

            {phase === 'payment' && (
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-sm font-semibold text-slate-900">Order Summary</p>
                  <div className="mt-2 space-y-1 text-sm text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Taxes & fees</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(taxes + fulfillmentFee)}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                      <span>Total</span>
                      <span>{formatCurrency(totalDue)}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePayment}
                  className="w-full rounded-2xl bg-emerald-600 px-4 py-3.5 text-base font-semibold tracking-wide text-white transition hover:bg-emerald-500"
                >
                  Pay Now
                </button>
                <p className="text-xs text-center text-slate-500">
                  Secure payment powered by Stripe/Razorpay
                </p>
              </div>
            )}

            {phase === 'invoice' && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-sm text-emerald-800">
                <p className="text-base font-semibold">Order Confirmed</p>
                <p className="mt-2 text-slate-600">Payment successful! Your order has been confirmed and invoice generated.</p>
                <dl className="mt-4 space-y-2 text-slate-600">
                  <div className="flex items-center justify-between">
                    <dt>Order ID</dt>
                    <dd className="font-semibold text-slate-900">#{Date.now().toString().slice(-8)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Contact</dt>
                    <dd className="font-semibold text-slate-900">{customerName || '—'}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Phone</dt>
                    <dd className="font-semibold text-slate-900">
                      {selectedCountry.dialCode} {phone}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt>Country</dt>
                    <dd className="font-semibold text-slate-900">{selectedCountry.label}</dd>
                  </div>
                  <div>
                    <dt>Address</dt>
                    <dd className="font-semibold text-slate-900">{address || '—'}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                    <dt className="font-semibold text-slate-900">Total Paid</dt>
                    <dd className="text-lg font-bold text-slate-900">{formatCurrency(totalDue)}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="mt-4 w-full rounded-2xl border border-emerald-500 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-500/10"
                >
                  Download Invoice
                </button>
                <p className="mt-3 text-xs text-slate-500">
                  Our concierge team will reach out on WhatsApp with tracking details and care guidance.
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 bg-white/90 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-500 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Betaserrata. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy</span>
            <span>Compliance</span>
            <span>Careers</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProductCheckoutPage

