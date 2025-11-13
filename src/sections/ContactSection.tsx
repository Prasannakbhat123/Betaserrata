import { contactPoints } from '../data'

const ContactSection = () => (
  <section id="contact" className="section-padding bg-white">
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      <div className="badge badge-sky mb-4" data-aos="fade-up">Contact Us</div>
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-white to-sky-50 px-8 py-10 contact-card-light shadow-xl shadow-sky-100/60" data-aos="fade-right">
          <h2 className="section-heading text-3xl font-semibold text-slate-900 sm:text-4xl">
            Let&apos;s co-create the future of care.
          </h2>
          <p className="mt-5 max-w-lg text-sm text-slate-600">
            Share your molecule, your site challenges, or talent needs—we will connect you to the right strategist within
            24 hours.
          </p>

          <div className="mt-8 grid gap-6 text-sm text-slate-700 sm:grid-cols-2">
            {contactPoints.map((point, index) => (
              <div key={point.label} className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm shadow-sky-100/50" data-aos="fade-up" data-aos-delay={index * 50}>
                <p className="micro-meta micro-meta-muted">{point.label}</p>
                <p className="mt-2 text-sm text-slate-700">{point.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-3 micro-meta micro-meta-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Seamless onboarding within 10 days
          </div>
        </div>

        <div className="glass-panel-light flex flex-col justify-between gap-6 p-8" data-aos="fade-left">
          <div>
            <h3 className="font-display text-2xl font-semibold text-slate-900">Drop us a note</h3>
            <p className="mt-3 text-sm text-slate-600">
              Tell us about your vision, and our advisory concierge will orchestrate the first working session.
            </p>
          </div>

          <form className="grid flex-1 grid-cols-1 gap-5">
            <div>
              <label htmlFor="name" className="micro-meta micro-meta-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Jane Doe"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="micro-meta micro-meta-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@organization.com"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label htmlFor="message" className="micro-meta micro-meta-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Share your molecule, study, or talent brief…"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <button type="button" className="cta-primary rounded-full px-6 py-3 text-sm uppercase tracking-widest">
              Submit Brief
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
)

export default ContactSection

