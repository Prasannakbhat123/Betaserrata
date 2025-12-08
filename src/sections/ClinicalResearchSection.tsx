const consultPills = [
  'BA/BE & Phase I–III',
  'Regulatory strategy',
  'Pharmacovigilance',
  'Quality & training',
]

const clinicalServices = [
  {
    title: 'Study Design & Regulatory Strategy',
    description:
      'Design BA/BE and Phase I protocols, advise on regulatory pathways (CDSCO, US FDA, EMA), and prepare key documents including protocols, ICF, IB, and clinical development plans.',
  },
  {
    title: 'Monitoring, Audit & Vendor Oversight',
    description:
      'Independent monitoring of BA/BE and Phase I sites, audit of CROs and bioanalytical labs, and ongoing vendor oversight for sponsors who have outsourced full trials.',
  },
  {
    title: 'Data, Statistics & Medical Writing',
    description:
      'Biostatistics support, PK/BE analysis, data review and QC, medical writing for protocols, CSRs, clinical summaries for ANDA/CTD, and publications.',
  },
  {
    title: 'Quality, SOPs & Training',
    description:
      'Develop and review SOPs for BA/BE units and clinical operations, conduct GCP and BA/BE-specific training, and help set up quality systems for regulatory inspections.',
  },
  {
    title: 'Pharmacovigilance Consulting',
    description:
      'PV system setup and governance, ICSR case processing support, aggregate reports (PSUR, DSUR, RMP), signal management, and PV audits for inspection readiness.',
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
        <h2 className="research-heading">Independent Clinical Research Consulting Services</h2>
        <p className="research-subtext">
          Your dedicated partner providing complete, expert guidance and meticulous operational oversight specifically for BA/BE studies and seamless support across all clinical trial phases.
        </p>
      </div>

      <div className="research-stack">
        <div className="research-consult-panel" data-aos="fade-up">
          <div className="micro-label">Expert support</div>
          <h3>Comprehensive clinical development and safety consulting.</h3>
          <p>
            Your dedicated partner providing complete, expert guidance and meticulous operational oversight specifically for BA/BE studies and seamless support across all clinical trial phases. We provide independent consulting covering BA/BE studies, Phase I–III trials, and pharmacovigilance.
          </p>
          <div className="research-pill-grid">
            {consultPills.map((pill) => (
              <span key={pill} className="research-pill">
                {pill}
              </span>
            ))}
          </div>
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

