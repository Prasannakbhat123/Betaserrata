import { milestones, researchHighlights } from '../data'

const ClinicalResearchSection = () => (
  <section id="clinical-research" className="section-padding research-section">
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      <div className="research-header" data-aos="fade-up">
        <span className="research-tag">Clinical Research</span>
        <h2 className="research-heading">Reimagining clinical journeys with intelligence.</h2>
        <p className="research-subtext">
          We integrate digital sensors, data harmonization, and patient engagement experts to deliver human-first trials across continents.
        </p>
      </div>

      <div className="research-layout">
        <div className="research-timeline-panel" data-aos="fade-right">
          <div className="research-timeline-label">Delivery Milestones</div>
          <div className="research-timeline">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="research-timeline-item" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="research-timeline-year">{milestone.year}</div>
                <div className="research-timeline-content">
                  <h4 className="research-timeline-title">{milestone.headline}</h4>
                  <p className="research-timeline-desc">{milestone.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="research-cards">
          {researchHighlights.map((highlight, index) => (
            <article key={highlight.title} className="research-card" data-aos="fade-left" data-aos-delay={index * 150}>
              <h3 className="research-card-title">{highlight.title}</h3>
              <p className="research-card-body">{highlight.description}</p>
              <div className="research-card-footer">
                <span className="research-card-indicator" />
                <span className="research-card-label">Continuous Insight Loop</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default ClinicalResearchSection

