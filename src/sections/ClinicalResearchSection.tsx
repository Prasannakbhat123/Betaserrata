const consultPills = [
  'Phase I–IV oversight',
  'Medical writing & dossiers',
  'Specialized BA/BE readiness',
]

const clinicalServices = [
  {
    title: 'Phase Trial Management & Strategy',
    description:
      'Expert consultation for the strategic design, planning, and execution oversight of Phase I through Phase IV clinical trials to ensure robust data collection and regulatory adherence.',
  },
  {
    title: 'Medical Writing Services',
    description:
      'Preparation of study protocols, informed consent forms, clinical study reports, and regulatory dossiers with absolute clarity, accuracy, and compliance to ICH-GCP guidelines.',
  },
  {
    title: 'Specialized BA/BE Studies',
    description:
      'Dedicated consulting for bioavailability and bioequivalence studies that accelerate generic molecule approvals and deliver market-ready submissions.',
  },
]

const ClinicalResearchSection = () => (
  <section id="clinical-research" className="section-padding research-section relative overflow-hidden">
    <div className="section-shapes section-shapes--research" aria-hidden="true">
      <div className="section-shape section-shape-1" />
      <div className="section-shape section-shape-2" />
      <div className="section-shape section-shape-3" />
    </div>
    <div className="mx-auto max-w-6xl px-6 sm:px-8 relative z-10">
      <div className="research-header" data-aos="fade-up">
        <span className="research-tag">Clinical Research</span>
        <h2 className="research-heading">Clinical research consulting: from phase trials to specialized BA/BE studies.</h2>
        <p className="research-subtext">
          Betaserrata provides specialized clinical research consultation designed to accelerate your product development lifecycle.
        </p>
      </div>

      <div className="research-stack">
        <div className="research-consult-panel" data-aos="fade-up">
          <div className="micro-label">Expert support</div>
          <h3>From early strategy to dossier-ready evidence.</h3>
          <p>
            We coordinate BA/BE study planning, medical writing, and full-phase oversight so botanical and natural health innovations move through regulatory gates with confidence.
          </p>
          <div className="research-pill-grid">
            {consultPills.map((pill) => (
              <span key={pill} className="research-pill">
                {pill}
              </span>
            ))}
          </div>
          <a href="https://betaserrata.de" target="_blank" rel="noreferrer" className="research-link">
            Visit betaserrata.de
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="research-services-grid">
          <p className="research-card-heading">Our services</p>
          <div className="research-cards-grid">
            {clinicalServices.map((service, index) => (
              <article key={service.title} className="research-card" data-aos="fade-up" data-aos-delay={index * 150}>
                <h3 className="research-card-title">{service.title}</h3>
                <p className="research-card-body">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default ClinicalResearchSection

