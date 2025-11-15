const cdmoHighlights = [
  {
    label: '01',
    title: 'Concept development',
    detail:
      'Collaborative blueprinting sessions aligning botanical IP, dosage forms, and regulatory pathways before the first batch is produced.',
  },
  {
    label: '02',
    title: 'High-purity extraction',
    detail:
      'Closed-loop extraction, solvent recovery, and compositional fingerprinting calibrated for premium herbal actives.',
  },
  {
    label: '03',
    title: 'Market-ready release',
    detail:
      'Stability, QA, and documentation support so every lot is compliant and ready for global launch windows.',
  },
]

const CdmoSection = () => (
  <section id="cdmo" className="section-padding cdmo-section relative overflow-hidden">
    <div className="section-shapes section-shapes--cdmo" aria-hidden="true">
      <div className="section-shape section-shape-1" />
      <div className="section-shape section-shape-2" />
      <div className="section-shape section-shape-3" />
    </div>
    <div className="mx-auto max-w-6xl px-6 sm:px-8 relative z-10">
      <div className="cdmo-shell">
        <div className="cdmo-panel glass-panel-light" data-aos="fade-right">
          <span className="cdmo-tag">CDMO Services</span>
          <h2 className="cdmo-heading">Specialized formulation and manufacturing with high-purity herbal extracts.</h2>
          <p className="cdmo-subtext">
            Betaserrata operates as a dedicated and specialised channel in the creation of premium-quality formulations built upon high-purity herbal extracts. We offer comprehensive, end-to-end manufacturing solutions, from concept development.
          </p>
          <p className="cdmo-subtext cdmo-subtext-muted">
            Partner with Betaserrata to transform your vision into a market-ready product, backed by specialized botanical knowledge and a commitment to pharmaceutical-grade quality.
          </p>

          {/* <div className="cdmo-chip-row">
            {cdmoChips.map((chip) => (
              <span key={chip} className="cdmo-chip">
                {chip}
              </span>
            ))}
          </div> */}

          <div className="cdmo-legacy">
            <span>Our legacy</span>
            <a href="https://betaserrata.de" target="_blank" rel="noreferrer">
              betaserrata.de
            </a>
          </div>
        </div>

        <div className="cdmo-highlight-stack" data-aos="fade-left">
          {cdmoHighlights.map((item, index) => (
            <article key={item.title} className="cdmo-highlight-card" data-aos-delay={index * 100}>
              <span className="cdmo-highlight-index">{item.label}</span>
              <h3 className="cdmo-highlight-title">{item.title}</h3>
              <p className="cdmo-highlight-detail">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default CdmoSection

