import { trainingTracks } from '../data'

const TrainingSection = () => (
  <section id="training" className="section-padding relative overflow-hidden" style={{ background: 'var(--clr-cream)' }}>
    <div className="section-shapes section-shapes--training" aria-hidden="true">
      <div className="section-shape section-shape-1" />
      <div className="section-shape section-shape-2" />
      <div className="section-shape section-shape-3" />
    </div>
    <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
      <div className="text-center mb-12" data-aos="fade-up">
        <div className="badge badge-sky mb-4">Clinical Research Training</div>
        <h2 className="section-heading text-3xl font-semibold text-slate-900 sm:text-4xl mb-4">
          Clinical Research Training Programs
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 max-w-3xl mx-auto">
          Comprehensive training covering ICH GCP, ICMR guidelines, quality management, and computer system validation for clinical research professionals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {trainingTracks.map((track, index) => {
          const getIcon = () => {
            switch (track.icon) {
              case 'shield':
                return (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              case 'document':
                return (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              case 'check-circle':
                return (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              case 'server':
                return (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                )
              default:
                return null
            }
          }

          return (
            <article key={track.title} className="glass-panel-light p-6 flex flex-col h-full" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 mb-4">
                {getIcon()}
              </div>
              <div className="mb-3">
                <h3 className="font-display text-lg font-semibold text-slate-900 leading-tight mb-2">{track.title}</h3>
                <span className="inline-block rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-medium text-slate-600">
                  {track.duration}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 mb-4 flex-1">{track.focus}</p>
              <button
                type="button"
                className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-700 hover:text-slate-900 transition"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </article>
          )
        })}
      </div>
    </div>
  </section>
)

export default TrainingSection

