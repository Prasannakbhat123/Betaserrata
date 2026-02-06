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
  <section 
    id="home" 
    className="hero-section relative overflow-hidden min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] flex items-center"
  >
    {/* Background image - covers entire screen */}
    <img 
      src="/assets/mainbg.jpg" 
      alt="" 
      className="absolute inset-0 h-full w-full object-cover object-center"
      aria-hidden="true"
    />
    
    <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 w-full py-12 sm:py-16">
      <div className="relative z-10 space-y-4 lg:w-1/2">
        <h1 className="hero-title text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl !text-white" style={{ color: 'white' }} data-aos="fade-up" data-aos-delay="50">
          IBL Pharma: Your Partner in Plant-Based Product Development and Clinical Research Consultancy Services
        </h1>
        <p className="hero-lead text-sm sm:text-base !text-white" style={{ color: 'white' }} data-aos="fade-up" data-aos-delay="120">
          At IBL Pharma, we bridge the gap between nature's power and scientific rigor. As a leading CDMO specializing in plant-based products, we offer comprehensive services from concept to commercialization, ensuring the highest quality and efficacy for your plant-based formulations.
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