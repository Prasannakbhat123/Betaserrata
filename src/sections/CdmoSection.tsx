import { useNavigate } from 'react-router-dom'
import { productCatalog, formatCurrency } from '../data/products'

const CdmoSection = () => {
  const navigate = useNavigate()

  return (
    <section id="cdmo" className="section-padding cdmo-section relative overflow-hidden">
      <div className="section-shapes section-shapes--cdmo" aria-hidden="true">
        <div className="section-shape section-shape-1" />
        <div className="section-shape section-shape-2" />
        <div className="section-shape section-shape-3" />
      </div>
      <div className="mx-auto max-w-6xl px-6 sm:px-8 relative z-10">
        <div className="mb-8 text-center" data-aos="fade-up">
          <span className="cdmo-tag">CDMO Services</span>
          <h2 className="cdmo-heading mt-4">Premium Formulations</h2>
          <p className="cdmo-subtext mt-3 max-w-2xl mx-auto">
            At Betaserrata, we bridge the gap between nature's power and scientific rigor. As a leading CDMO specializing in plant-based products, we offer comprehensive services from concept to commercialization, ensuring the highest quality and efficacy for your botanical formulations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2" data-aos="fade-up" data-aos-delay="100">
          {productCatalog.map((product) => (
            <article
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl"
            >
              {/* Image Section - Full coverage */}
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-md backdrop-blur-sm">
                  {product.badge}
                </div>
              </div>

              {/* Content Section - Minimal */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{product.name}</h3>
                  <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wide">{product.volume}</p>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Price</p>
                    <p className="text-2xl font-bold text-slate-900">{formatCurrency(product.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/product')}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#8c6a45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7b5c3b] active:scale-95"
                  >
                    Shop now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CdmoSection

