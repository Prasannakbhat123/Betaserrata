import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productCatalog, formatCurrency } from '../data/products'
import Navbar from '../components/Navbar'
import { navItems } from '../data'
import Lenis from 'lenis'
import TrustBannerSection from '../sections/TrustBannerSection'

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
      <section className="hero-section relative overflow-hidden min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] flex items-center">
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

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full py-12 sm:py-16">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 w-full">
            <div className="flex flex-col justify-center order-2 lg:order-1">
              <div className="status-pill w-fit">
                <span className="status-indicator" />
                <span className="text-xs uppercase tracking-widest">Clinically Validated</span>
              </div>
              <h1 className="hero-title mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight">
                Premium Plant-Based
                <span className="block mt-2">
                  Therapeutics
                </span>
              </h1>
              <p className="hero-lead mt-4 text-sm sm:text-base">
                Naturally anti-inflammatory Indian Boswellia—the original plant-based extract from the Boswellia serrata tree. Our scientifically-backed formulations blend nature's power with modern pharmaceutical standards, helping reduce inflammation and supporting joint comfort. Each product is GMP-certified and third-party tested for purity and potency.
              </p>
              <div className="hero-actions mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cta-primary text-xs uppercase tracking-widest w-full sm:w-auto"
                >
                  Shop Products
                </button>
                <button
                  onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cta-secondary text-xs uppercase tracking-widest w-full sm:w-auto"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative z-10 order-1 lg:order-2">
              <div className="relative grid grid-cols-2 gap-2 sm:gap-4">
                <div className="space-y-2 sm:space-y-4">
                  <img
                    src="/assets/tablet.jpg"
                    alt="Betaserrata Plant-Based Complex"
                    className="h-32 sm:h-48 w-full rounded-xl sm:rounded-2xl object-cover shadow-xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80"
                    alt="Plant-based ingredients"
                    className="h-40 sm:h-64 w-full rounded-xl sm:rounded-2xl object-cover shadow-xl"
                  />
                </div>
                <div className="space-y-2 sm:space-y-4 pt-4 sm:pt-8">
                  <img
                    src="/assets/oil.jpg"
                    alt="Rapid Recovery Transdermal Gel"
                    className="h-40 sm:h-64 w-full rounded-xl sm:rounded-2xl object-cover shadow-xl"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
                    alt="Natural ingredients"
                    className="h-32 sm:h-48 w-full rounded-xl sm:rounded-2xl object-cover shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBannerSection />

      {/* Products Section */}
      <section id="products-section" className="pb-16 pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-8 sm:mb-12 text-center px-2">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-600">Our Collection</p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Featured Products</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600">Carefully crafted formulations for your wellness journey</p>
          </header>

          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4 sm:space-y-6 order-1">
            {productCatalog.map((product) => (
              <article
                key={product.id}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-48 sm:h-40 w-full sm:w-40 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                  <div className="absolute left-2 top-2 rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm backdrop-blur-sm">
                    {product.badge}
                  </div>
                </div>

                <div className="flex flex-1 flex-col min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900">{product.name}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-500">{product.volume}</p>
                    </div>
                  </div>

                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">{product.description}</p>

                  <div className="mt-2 sm:mt-3 flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700">{product.rating}</span>
                    <span className="text-xs text-slate-500">({product.reviewCount} reviews)</span>
                  </div>

                  <ul className="mt-2 sm:mt-3 flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-1.5 text-xs text-slate-600">
                    {product.highlights.map((text) => (
                      <li key={text} className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-row items-center justify-between gap-3 sm:gap-4 border-t border-slate-100 pt-3 sm:pt-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product.id)}
                        className="rounded-lg border border-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 transition hover:bg-slate-50 whitespace-nowrap"
                      >
                        Know More
                      </button>
                      <div className="min-w-0">
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 truncate">{formatCurrency(product.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-slate-200 bg-slate-50 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={!cart[product.id]}
                        className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="min-w-[20px] sm:min-w-[24px] text-center text-sm sm:text-base font-semibold text-slate-900">{cart[product.id] || 0}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
                      >
                        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start order-2">
            <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">Order Summary</h2>

              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                {hasCartItems ? (
                  productCatalog
                    .filter((product) => cart[product.id])
                    .map((product) => (
                      <div key={product.id} className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-medium text-slate-900 truncate">{product.name}</p>
                          <p className="text-xs text-slate-500">Qty: {cart[product.id]}</p>
                        </div>
                        <p className="font-semibold text-slate-900 whitespace-nowrap">{formatCurrency(product.price * (cart[product.id] || 0))}</p>
                      </div>
                    ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 sm:py-8 text-center text-xs sm:text-sm text-slate-500">
                    Your cart is empty
                  </div>
                )}

                <div className="space-y-2 border-t border-slate-100 pt-3 sm:pt-4 text-xs sm:text-sm">
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
                  <div className="flex items-center justify-between border-t border-slate-200 pt-2 sm:pt-3 text-sm sm:text-base font-bold text-slate-900">
                    <span>Total</span>
                    <span>{formatCurrency(totalDue)}</span>
                  </div>
                </div>

                {notice && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-rose-700">
                    {notice}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  disabled={!hasCartItems}
                  className="w-full rounded-xl bg-slate-900 px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Proceed to Checkout
                </button>

                {hasCartItems && (
                  <button
                    type="button"
                    onClick={() => setCart({})}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-600 transition hover:bg-slate-50"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-2 sm:p-4 backdrop-blur-sm" 
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto overscroll-contain rounded-xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 z-10"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
              <div className="relative h-64 sm:h-80 md:h-auto overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 flex items-center justify-center">
                <img src={selectedProductData.image} alt={selectedProductData.name} className="h-full w-full object-contain" />
                <div className="absolute left-2 top-2 sm:left-4 sm:top-4 rounded-lg bg-white/95 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-sm backdrop-blur-sm">
                  {selectedProductData.badge}
                </div>
              </div>

              <div className="flex flex-col">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{selectedProductData.name}</h2>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600">{selectedProductData.volume}</p>

                  <div className="mt-3 sm:mt-4 flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${i < Math.floor(selectedProductData.rating) ? 'text-amber-400' : 'text-slate-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-slate-700">{selectedProductData.rating}</span>
                    <span className="text-xs sm:text-sm text-slate-500">({selectedProductData.reviewCount} reviews)</span>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-500">Description</h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-700">{selectedProductData.detailedDescription}</p>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-500">Key Features</h3>
                    <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
                      {selectedProductData.highlights.map((text) => (
                        <li key={text} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 sm:mt-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-slate-200 pt-4 sm:pt-6">
                  <div>
                    <p className="text-xs sm:text-sm text-slate-500">Price</p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900">{formatCurrency(selectedProductData.price)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2 sm:py-2.5">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(selectedProductData.id, -1)}
                        disabled={!cart[selectedProductData.id]}
                        className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="min-w-[20px] sm:min-w-[24px] text-center text-sm sm:text-base font-semibold text-slate-900">{cart[selectedProductData.id] || 0}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(selectedProductData.id, 1)}
                        className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-800"
                      >
                        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
