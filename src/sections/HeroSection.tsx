const HeroSection = () => (
  <section id="home" className="hero-section section-padding relative overflow-hidden">
    <div className="hero-soft-glow" aria-hidden="true" />
    <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div className="hero-visual relative z-10 order-1 md:order-2" data-aos="fade-left" data-aos-delay="200">
        <div className="hero-card-light">
          <div className="status-pill absolute right-6 top-6">
            <span className="status-indicator" />
            <span className="text-xs uppercase tracking-widest">Phase Ready</span>
          </div>
          <img src="/assets/home.jpg" alt="Modern clinical research visuals" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="relative z-10 space-y-6 order-2 md:order-1">
        {/* <div className="badge badge-sky">where science meets acceleration</div> */}
        <h1 className="hero-title text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl" data-aos="fade-up">
          Translating therapies into .
        </h1>
        <p className="hero-lead text-base sm:text-lg" data-aos="fade-up" data-aos-delay="100">
          Betaserrata orchestrates the entire molecule-to-market continuum—uniting advisory brilliance, CDMO expertise,
          and patient-centric clinical operations under a single digital spine.
        </p>

        <div className="hero-actions" data-aos="fade-up" data-aos-delay="200">
          <button className="cta-primary text-sm uppercase tracking-widest">Explore Solutions</button>
          <button className="cta-secondary text-sm uppercase tracking-widest">Meet the Team</button>
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

export default HeroSection

