import { cdmoHighlights } from '../data'

const CdmoSection = () => (
  <section id="cdmo" className="section-padding cdmo-section">
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      <div className="cdmo-header" data-aos="fade-up">
        <span className="cdmo-tag">CDMO Services</span>
        <h2 className="cdmo-heading">Converging chemistry, analytics, and tech transfer.</h2>
        <p className="cdmo-subtext">
          Betaserrata partners across the molecule lifecycle— compressing scale-up timelines, orchestrating compliant
          tech transfers, and building sustainable manufacturing rhythms.
        </p>
        {/* <div className="cdmo-pill-row">
          {cdmoPillars.map((pillar) => (
            <span key={pillar} className="cdmo-pill">
              {pillar}
            </span>
          ))}
        </div> */}
      </div>

      <div className="cdmo-grid">
        {cdmoHighlights.map((highlight, index) => (
          <article key={highlight.title} className="cdmo-card" data-aos="fade-up" data-aos-delay={index * 150}>
            <div className="cdmo-card-metric">{highlight.metrics}</div>
            <h3 className="cdmo-card-title">{highlight.title}</h3>
            <p className="cdmo-card-body">{highlight.description}</p>
            <button type="button" className="cdmo-card-link">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default CdmoSection

