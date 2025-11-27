import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productCatalog, formatCurrency } from '../data/products'
import Navbar from '../components/Navbar'
import { navItems } from '../data'
import Lenis from 'lenis'

const CART_STORAGE_KEY = 'betaserrataCart'

const ProductFlowPage = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      const stored = sessionStorage.getItem(CART_STORAGE_KEY)
      return stored ? (JSON.parse(stored) as Record<string, number>) : {}
    } catch {
      return {}
    }
  })
  const [notice, setNotice] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  useEffect(() => {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
      // Disable Lenis smooth scroll when modal is open
      const lenis = (window as any).__lenis as any
      if (lenis) {
        lenis.stop()
      }
    } else {
      document.body.style.overflow = ''
      // Re-enable Lenis smooth scroll when modal closes
      const lenis = (window as any).__lenis as any
      if (lenis) {
        lenis.start()
      }
    }
    return () => {
      document.body.style.overflow = ''
      const lenis = (window as any).__lenis as any
      if (lenis) {
        lenis.start()
      }
    }
  }, [selectedProduct])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    // Store lenis instance for modal scroll control
    ;(window as any).__lenis = lenis

    // Scroll to top on mount
    lenis.scrollTo(0, { immediate: true })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete (window as any).__lenis
    }
  }, [])

  const subtotal = useMemo(() => {
    return Object.entries(cart).reduce((total, [productId, qty]) => {
      const product = productCatalog.find((item) => item.id === productId)
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
    setNotice(null)
  }

  const handleProceedToCheckout = () => {
    if (!hasCartItems) {
      setNotice('Add at least one product to continue.')
      return
    }
    setNotice(null)
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    navigate('/product/checkout', { state: { cart } })
  }

  const selectedProductData = selectedProduct ? productCatalog.find((p) => p.id === selectedProduct) : null

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-[#fefaf4] to-white">
      <Navbar items={navItems} activeSection="home" onNavigate={handleNavigate} />
      
      {/* Hero Section */}
      <section className="hero-section hero-section-height relative overflow-hidden">
        <div className="hero-soft-glow" aria-hidden="true" />
        
        {/* Abstract shapes matching homepage */}
        <div className="hero-shapes" aria-hidden="true">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
          <div className="hero-shape hero-shape-4" />
          <div className="hero-shape hero-shape-5" />
          <div className="hero-shape hero-shape-6" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 h-full flex items-center">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 w-full">
            <div className="flex flex-col justify-center">
              <div className="status-pill w-fit">
                <span className="status-indicator" />
                <span className="text-xs uppercase tracking-widest">Clinically Validated</span>
              </div>
              <h1 className="hero-title mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Premium Ayurvedic
                <span className="block mt-2">
                  Therapeutics
                </span>
              </h1>
              <p className="hero-lead mt-4 text-sm sm:text-base">
                Discover our scientifically-backed botanical formulations that blend ancient Ayurvedic wisdom with modern pharmaceutical standards. Each product is GMP-certified and third-party tested for purity and potency.
              </p>
              <div className="hero-actions mt-6">
                <button
                  onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cta-primary text-xs uppercase tracking-widest"
                >
                  Shop Products
                </button>
                <button
                  onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cta-secondary text-xs uppercase tracking-widest"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative z-10 order-1 lg:order-2">
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80"
                    alt="Ayurvedic herbs"
                    className="h-48 w-full rounded-2xl object-cover shadow-xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1464639351491-a172c2aa2911?auto=format&fit=crop&w=600&q=80"
                    alt="Botanical capsules"
                    className="h-64 w-full rounded-2xl object-cover shadow-xl"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
                    alt="Herbal gel"
                    className="h-64 w-full rounded-2xl object-cover shadow-xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
                    alt="Natural ingredients"
                    className="h-48 w-full rounded-2xl object-cover shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="pb-16 pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">Our Collection</p>
            <h2 className="mt-2 text-4xl font-bold text-slate-900">Featured Products</h2>
            <p className="mt-4 text-lg text-slate-600">Carefully crafted formulations for your wellness journey</p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {productCatalog.map((product) => (
              <article
                key={product.id}
                className="flex gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  <div className="absolute left-2 top-2 rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm backdrop-blur-sm">
                    {product.badge}
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{product.volume}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                    <span className="text-xs text-slate-500">({product.reviewCount} reviews)</span>
                  </div>

                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-600">
                    {product.highlights.map((text) => (
                      <li key={text} className="flex items-center gap-1.5">
                        <svg className="h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product.id)}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        Know More
                      </button>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{formatCurrency(product.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={!cart[product.id]}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="min-w-[24px] text-center text-base font-semibold text-slate-900">{cart[product.id] || 0}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

              <div className="mt-6 space-y-4">
                {hasCartItems ? (
                  productCatalog
                    .filter((product) => cart[product.id])
                    .map((product) => (
                      <div key={product.id} className="flex items-center justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">{product.name}</p>
                          <p className="text-xs text-slate-500">Qty: {cart[product.id]}</p>
                        </div>
                        <p className="font-semibold text-slate-900">{formatCurrency(product.price * (cart[product.id] || 0))}</p>
                      </div>
                    ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                    Your cart is empty
                  </div>
                )}

                <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Tax (5%)</span>
                    <span className="font-medium text-slate-900">{formatCurrency(taxes)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-medium text-slate-900">{formatCurrency(fulfillmentFee)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                    <span>Total</span>
                    <span>{formatCurrency(totalDue)}</span>
                  </div>
                </div>

                {notice && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    {notice}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  disabled={!hasCartItems}
                  className="w-full rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Proceed to Checkout
                </button>

                {hasCartItems && (
                  <button
                    type="button"
                    onClick={() => setCart({})}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
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

      {selectedProductData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm" 
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl border border-slate-200 bg-white shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid gap-8 p-8 md:grid-cols-[400px_1fr]">
              <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                <img src={selectedProductData.image} alt={selectedProductData.name} className="h-full w-full object-cover" />
                <div className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm backdrop-blur-sm">
                  {selectedProductData.badge}
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{selectedProductData.name}</h2>
                  <p className="mt-2 text-sm text-slate-600">{selectedProductData.volume}</p>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(selectedProductData.rating) ? 'text-amber-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-base font-semibold text-slate-700">{selectedProductData.rating}</span>
                    <span className="text-sm text-slate-500">({selectedProductData.reviewCount} reviews)</span>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Description</h3>
                    <p className="mt-2 leading-relaxed text-slate-700">{selectedProductData.detailedDescription}</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Key Features</h3>
                    <ul className="mt-3 space-y-2">
                      {selectedProductData.highlights.map((text) => (
                        <li key={text} className="flex items-center gap-2 text-sm text-slate-700">
                          <svg className="h-5 w-5 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pt-6">
                  <div>
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="text-3xl font-bold text-slate-900">{formatCurrency(selectedProductData.price)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(selectedProductData.id, -1)}
                        disabled={!cart[selectedProductData.id]}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="min-w-[24px] text-center text-base font-semibold text-slate-900">{cart[selectedProductData.id] || 0}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(selectedProductData.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFlowPage
