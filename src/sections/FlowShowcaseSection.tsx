import { useNavigate } from 'react-router-dom'

const flows = [
  {
    id: 'product',
    eyebrow: 'Product experience',
    title: 'Direct-to-clinic product purchase',
    description: 'Two curated SKUs, live cart math, delivery notes, and OTP verification ready for a commerce handoff.',
    stats: ['2 premium SKUs', 'Cart + billing summary', 'OTP verification', 'Delivery notes'],
    image: '/assets/product.png',
    accent: 'from-white via-[#fff6ec] to-[#fde5c8]',
    buttonLabel: 'View product demo',
    href: '/product',
  },
  {
    id: 'cro',
    eyebrow: 'Clinical Research Consulting',
    title: 'Independent Clinical Research Consulting Services',
    description: 'Expert consulting for BA/BE studies, Phase I–III trials, and pharmacovigilance. From study design and regulatory strategy to monitoring, data management, and quality systems.',
    stats: ['Study Design & Regulatory', 'Monitoring & Audit', 'Data & Medical Writing', 'Quality & Training'],
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80&sat=-15',
    accent: 'from-white via-[#f3f8ff] to-[#e1ecff]',
    buttonLabel: 'View CRO intake',
    href: '/cro',
  },
]

const FlowShowcaseSection = () => {
  const navigate = useNavigate()

  return (
    <section className="flow-showcase-section relative overflow-hidden bg-gradient-to-b from-white via-[#faf6f1] to-white py-20" aria-labelledby="flows-heading">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8c6a45]">Experience demos</p>
          <h2 id="flows-heading" className="text-3xl font-semibold text-[#5a4030] sm:text-4xl">
            Explore Interactive Flows
          </h2>
          <p className="mx-auto max-w-3xl text-base text-[#7a6654]">
            Product buyers can add to cart, review billing, and confirm by OTP. Clinical research partners can register for consulting services covering BA/BE studies, Phase I–III trials, monitoring, data management, and pharmacovigilance.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {flows.map((flow) => (
            <article
              key={flow.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e3d5c9] bg-white shadow-lg transition hover:shadow-2xl"
            >
              {/* Image Section */}
              <div className="relative h-64 shrink-0 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                <img 
                  src={flow.image} 
                  alt={flow.title} 
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-900 backdrop-blur-sm">
                    {flow.eyebrow}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-[#4a3326]">{flow.title}</h3>
                  <p className="text-sm leading-relaxed text-[#7a6654]">{flow.description}</p>
                </div>

                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-1 gap-3">
                  {flow.stats.map((stat) => (
                    <div key={stat} className="flex items-center gap-3 rounded-xl border border-[#eadfd2] bg-[#f7f2ed] px-4 py-2.5">
                      <svg className="h-4 w-4 shrink-0 text-[#8c6a45]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-[#664c38]">{stat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => navigate(flow.href)}
                  className="group/btn mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#8c6a45] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#7b5c3b]"
                >
                  {flow.buttonLabel}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 transition group-hover/btn:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FlowShowcaseSection

