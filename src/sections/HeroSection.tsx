const HeroSection = () => {
  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    const lenis = (window as any).__lenis as any | undefined
    if (section && lenis) {
      lenis.scrollTo(section, {
        offset: -80,
        duration: 1.2,
      })
    } else if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
  <section id="home" className="hero-section relative overflow-hidden min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] flex items-center">
    <div className="hero-soft-glow" aria-hidden="true" />
    
    {/* Abstract shapes similar to the image */}
    <div className="hero-shapes" aria-hidden="true">
      {/* Top right - large circular shape with peach to reddish-brown gradient */}
      <div className="hero-shape hero-shape-1" />
      
      {/* Middle right - rectangular shape with rounded corner */}
      <div className="hero-shape hero-shape-2" />
      
      {/* Bottom left - curved organic shape */}
      <div className="hero-shape hero-shape-3" />
      
      {/* Bottom middle/right - metallic gold curved shape */}
      <div className="hero-shape hero-shape-4" />
      
      {/* Bottom right - mint green curved shape */}
      <div className="hero-shape hero-shape-5" />
      
      {/* Bottom right - beige curved shape overlapping mint */}
      <div className="hero-shape hero-shape-6" />
    </div>
    
    <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center relative z-10 w-full py-12 sm:py-16">
      <div className="hero-visual relative z-10 order-1 md:order-2" data-aos="fade-left" data-aos-delay="200">
        <div className="hero-card-light">
          <div className="status-pill absolute right-6 top-6">
            <span className="status-indicator" />
            <span className="text-xs uppercase tracking-widest">Phase Ready</span>
          </div>
          <img src="/assets/product.png" alt="Modern clinical research visuals" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="relative z-10 space-y-4 order-2 md:order-1">
        <h1 className="hero-title text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl" data-aos="fade-up" data-aos-delay="50">
          Betaserrata: Your Partner in Plant-Based Product Development and Clinical Research Consultancy Services
        </h1>
        <p className="hero-lead text-sm sm:text-base" data-aos="fade-up" data-aos-delay="120">
          At Betaserrata, we bridge the gap between nature's power and scientific rigor. As a leading CDMO specializing in plant-based products, we offer comprehensive services from concept to commercialization, ensuring the highest quality and efficacy for your plant-based formulations.
        </p>

        <div className="hero-actions" data-aos="fade-up" data-aos-delay="200">
          <button 
            onClick={() => handleNavigate('cdmo')}
            className="cta-primary text-xs uppercase tracking-widest"
          >
            View Our Services
          </button>
          <button 
            onClick={() => handleNavigate('advisory-board')}
            className="cta-secondary text-xs uppercase tracking-widest"
          >
            Meet Our Advisors
          </button>
        </div>

        {/* <div className="hero-metrics pt-10">
          {metrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <p className="metric-card-value">{metric.value}</p>
              <p className="metric-card-label">{metric.label}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  </section>
  )
}

export default HeroSection