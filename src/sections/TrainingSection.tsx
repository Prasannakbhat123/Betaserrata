import { trainingTracks } from '../data'

const TrainingSection = () => (
  <section id="training" className="section-padding relative overflow-hidden" style={{ background: 'var(--clr-cream)' }}>
    <div className="section-shapes section-shapes--training" aria-hidden="true">
      <div className="section-shape section-shape-1" />
      <div className="section-shape section-shape-2" />
      <div className="section-shape section-shape-3" />
    </div>
    <div className="mx-auto max-w-6xl px-6 sm:px-8 relative z-10">
      <div className="badge badge-sky mb-4" data-aos="fade-up">Clinical Research Training</div>
      <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <div className="space-y-6" data-aos="fade-right">
          <h2 className="section-heading text-3xl font-semibold text-slate-900 sm:text-4xl">
            Talent incubators engineered for clinical impact from day one.
          </h2>
          <p className="text-sm text-slate-600">
            Our training guild blends immersive labs, live protocol war rooms, and mentored capstones to produce the next
            generation of clinical innovators.
          </p>
          <div className="grid gap-4 text-sm text-slate-600">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Globally benchmarked curriculum
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Live mentoring from industry leaders
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Career pathways with partner sponsors
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {trainingTracks.map((track, index) => (
            <article key={track.title} className="glass-panel-light p-6" data-aos="fade-left" data-aos-delay={index * 100}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-slate-900">{track.title}</h3>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
                  {track.duration}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{track.focus}</p>
                      <button
                        type="button"
                        className="mt-6 inline-flex items-center gap-2 micro-meta micro-meta-primary"
                      >
                Download capsule
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default TrainingSection

