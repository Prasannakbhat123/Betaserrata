import { boardMembers } from '../data'

const AdvisoryBoardSection = () => (
  <section id="advisory-board" className="section-padding bg-white">
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      <div className="advisory-header" data-aos="fade-up">
        <div className="advisory-emblem">Advisory Board</div>
        <h2 className="advisory-title">Guided by domain leaders shaping next-gen clinical pathways.</h2>
        <p className="advisory-description">
          Meet the mentors orchestrating molecule strategy, regulatory alignment, and patient experience—each bringing
          decades of proven clinical breakthroughs to every engagement.
        </p>
        <div className="advisory-divider" />
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {boardMembers.map((member, index) => (
          <article key={member.name} className="advisor-card glass-panel-light flex flex-col gap-6" data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="relative h-48 w-full overflow-hidden">
              <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/45 via-slate-900/10 to-transparent" />
              <span className="advisor-chip advisor-chip-overlay">
                <span className="advisor-chip-icon" />
                {member.expertise}
              </span>
            </div>
            <div className="advisor-card-top px-6 pb-6">
              <div className="advisor-meta">
                <div>
                  <p className="font-display text-xl font-semibold text-slate-900">{member.name}</p>
                  <p className="micro-meta micro-meta-muted">{member.title}</p>
                </div>
              </div>
              <p className="advisor-body">{member.summary}</p>
              {/* <div className="advisor-footer">
                <span className="micro-meta micro-meta-muted">Global programs • 6 continents</span>
                <button type="button" className="advisor-link">
                  View profile
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div> */}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default AdvisoryBoardSection

