import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { navItems } from '../data'
import Lenis from 'lenis'

type ResearchForm = {
  fullName: string
  organization: string
  email: string
  phone: string
  indication: string
  studyType: string
  sampleSize: string
  startWindow: string
  needsSiteSupport: boolean
  needsDataFabric: boolean
  hasIrbApproval: boolean
  ndaReady: boolean
  notes: string
}

const defaultForm: ResearchForm = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  indication: '',
  studyType: '',
  sampleSize: '',
  startWindow: '',
  needsSiteSupport: false,
  needsDataFabric: true,
  hasIrbApproval: false,
  ndaReady: false,
  notes: '',
}

const steps = [
  { title: 'Profile', description: 'Who is reaching out' },
  { title: 'Study intent', description: 'What you plan to research' },
  { title: 'Governance', description: 'Ethics and compliance' },
  { title: 'Review & submit', description: 'Send to CRO desk' },
]

const CroFlowPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState<ResearchForm>(defaultForm)
  const [stepIndex, setStepIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [stepError, setStepError] = useState<string | null>(null)

  const progressPercent = useMemo(() => ((stepIndex + 1) / steps.length) * 100, [stepIndex])

  const handleNavigate = () => {
    navigate('/')
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    // Scroll to top on mount
    lenis.scrollTo(0, { immediate: true })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  const handleChange = <K extends keyof ResearchForm>(key: K, value: ResearchForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setStepError(null)
  }

  const validateStep = () => {
    if (stepIndex === 0) {
      if (!form.fullName.trim()) return 'Share the primary contact name so we know who to reach out to.'
      if (!form.organization.trim()) return 'Tell us which lab or organization is submitting this intake.'
      const email = form.email.trim()
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Add a valid work email so the invite reaches you.'
      if (form.phone.trim().length < 8) return 'Add a reachable mobile number (min 8 digits).'
    }
    if (stepIndex === 1) {
      if (!form.indication.trim()) return 'Describe the therapeutic focus so we can staff the right leads.'
      if (!form.studyType) return 'Select the study type to unlock the next step.'
      if (!form.sampleSize.trim()) return 'Add an estimated sample size for planning.'
      if (!form.startWindow) return 'Choose a tentative start window.'
    }
    return null
  }

  const handleNext = () => {
    const error = validateStep()
    if (error) {
      setStepError(error)
      return
    }
    setStepError(null)
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setStepError(null)
    setStepIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const error = validateStep()
    if (error) {
      setStepError(error)
      return
    }
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
      return
    }
    setStepError(null)
    setSubmitted(true)
  }

  const renderStep = () => {
    if (submitted) {
      return (
        <div className="space-y-4 rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 text-sm text-slate-700">
          <p className="text-base font-semibold text-emerald-800">Submitted to Research Desk</p>
          <p>We will respond in under 24 hours with a study discovery call slot.</p>
          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Primary contact</dt>
              <dd className="font-semibold text-slate-900">{form.fullName || 'NA'}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Focus area</dt>
              <dd className="font-semibold text-slate-900">{form.indication || 'TBD'}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Preferred start</dt>
              <dd className="font-semibold text-slate-900">{form.startWindow || 'To be discussed'}</dd>
            </div>
          </dl>
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-emerald-600 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600/10"
          >
            Back to homepage
          </Link>
        </div>
      )
    }

    if (stepIndex === 0) {
      return (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900">
            Full name
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => handleChange('fullName', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
              placeholder="Dr. Aditi Rao"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-900">
            Organization / Lab
            <input
              type="text"
              value={form.organization}
              onChange={(event) => handleChange('organization', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
              placeholder="Genome Valley Translational Lab"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-900">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => handleChange('email', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
                placeholder="research@betaserrata.com"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-900">
              Mobile
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => handleChange('phone', event.target.value.replace(/\D/g, '').slice(0, 10))}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
                placeholder="9876543210"
              />
            </label>
          </div>
        </div>
      )
    }

    if (stepIndex === 1) {
      return (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900">
            Therapeutic focus
            <input
              type="text"
              value={form.indication}
              onChange={(event) => handleChange('indication', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
              placeholder="Autoimmune pain, oncology, metabolic"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-900">
            Study type
            <select
              value={form.studyType}
              onChange={(event) => handleChange('studyType', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
            >
              <option value="">Select an option</option>
              <option value="observational">Observational registry</option>
              <option value="interventional">Interventional (Phase I/II)</option>
              <option value="post-market">Post market surveillance</option>
              <option value="digital-therapeutic">Digital therapeutic validation</option>
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-900">
              Target sample size
              <input
                type="number"
                min={0}
                value={form.sampleSize}
                onChange={(event) => handleChange('sampleSize', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
                placeholder="120 participants"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-900">
              Desired start window
              <input
                type="month"
                value={form.startWindow}
                onChange={(event) => handleChange('startWindow', event.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
              />
            </label>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.needsSiteSupport}
                onChange={(event) => handleChange('needsSiteSupport', event.target.checked)}
              />
              Need investigator site activation support
            </label>
            <label className="mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.needsDataFabric}
                onChange={(event) => handleChange('needsDataFabric', event.target.checked)}
              />
              Need unified data capture & remote monitoring fabric
            </label>
          </div>
        </div>
      )
    }

    if (stepIndex === 2) {
      return (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.hasIrbApproval}
                onChange={(event) => handleChange('hasIrbApproval', event.target.checked)}
              />
              <span>
                IRB/IEC approval secured
                <span className="block text-xs text-slate-500">We can co-create if still in progress.</span>
              </span>
            </label>
            <label className="mt-3 flex items-start gap-3">
              <input type="checkbox" checked={form.ndaReady} onChange={(event) => handleChange('ndaReady', event.target.checked)} />
              <span>
                NDA ready for signature
                <span className="block text-xs text-slate-500">We share our click-wrap template on submission.</span>
              </span>
            </label>
          </div>
          <label className="block text-sm font-semibold text-slate-900">
            Additional context
            <textarea
              rows={4}
              value={form.notes}
              onChange={(event) => handleChange('notes', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900"
              placeholder="Tell us about endpoints, recruitment geography, or tech stack expectations."
            />
          </label>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-600">
          <p className="text-base font-semibold text-slate-900">Quick review</p>
          <ul className="mt-3 space-y-2">
            <li>
              <span className="text-slate-500">Contact:</span> <span className="font-semibold text-slate-900">{form.fullName || 'Pending'}</span>
            </li>
            <li>
              <span className="text-slate-500">Study:</span>{' '}
              <span className="font-semibold text-slate-900">{form.studyType || 'Select study type'}</span>
            </li>
            <li>
              <span className="text-slate-500">Timeline:</span>{' '}
              <span className="font-semibold text-slate-900">{form.startWindow || 'Set preferred month'}</span>
            </li>
          </ul>
        </div>
        <p className="text-sm text-slate-500">
          Hit submit to notify our CRO desk. You will receive a calendar invite with a curated research partner within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6fbf6] via-white to-[#fef7ef]">
      <Navbar items={navItems} activeSection="home" onNavigate={handleNavigate} />
      
      {/* Hero Section */}
      <section className="hero-section hero-section-height relative overflow-hidden">
        <div className="hero-soft-glow" aria-hidden="true" />
        
        {/* Abstract shapes matching homepage */}
        <div className="hero-shapes" aria-hidden="true">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
          <div className="hero-shape hero-shape-4" />
          <div className="hero-shape hero-shape-5" />
          <div className="hero-shape hero-shape-6" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 h-full flex items-center">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 w-full">
            <div className="flex flex-col justify-center">
              <div className="status-pill w-fit">
                <span className="status-indicator" />
                <span className="text-xs uppercase tracking-widest">Clinical Research</span>
              </div>
              <h1 className="hero-title mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Accelerate Your
                <span className="block mt-2">
                  Clinical Research
                </span>
              </h1>
              <p className="hero-lead mt-4 text-sm sm:text-base">
                Partner with our expert CRO team to design, execute, and manage your clinical trials. From protocol development to regulatory submission, we provide end-to-end research support with transparent workflows and real-time collaboration.
              </p>
              <div className="hero-actions mt-6">
                <button
                  onClick={() => document.getElementById('registration-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cta-primary text-xs uppercase tracking-widest"
                >
                  Register Your Study
                </button>
                <button
                  onClick={() => document.getElementById('registration-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cta-secondary text-xs uppercase tracking-widest"
                >
                  View Services
                </button>
              </div>
            </div>
            <div className="relative z-10 order-1 lg:order-2">
              <div className="relative space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Protocol Development</p>
                      <p className="text-xs text-slate-600">IRB-ready documentation</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Site Management</p>
                      <p className="text-xs text-slate-600">Multi-center coordination</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Data Analytics</p>
                      <p className="text-xs text-slate-600">Real-time insights & reporting</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Regulatory Support</p>
                      <p className="text-xs text-slate-600">FDA & EMA compliance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration-section" className="pb-16 pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Study Registration</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">Start Your Clinical Research Journey</h2>
                <p className="mt-2 text-sm text-slate-500">Complete our guided intake form to connect with our research team within 24 hours.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 font-semibold text-blue-700">Research operator view</span>
              <span className="rounded-full border border-violet-200 bg-violet-50/80 px-3 py-1 font-semibold text-violet-700">Auto-saves locally</span>
            </div>
            <div className="w-full rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-slate-900 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Flow map</p>
            <h2 className="text-2xl font-semibold text-slate-900">Four steps to register your study</h2>
            <div className="mt-4 space-y-3">
              {steps.map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    index === stepIndex ? 'border-slate-900 bg-slate-900/5 text-slate-900' : index < stepIndex ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-500'
                  }`}
                >
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600">
              <p className="text-base font-semibold text-slate-900">What happens next?</p>
              <ul className="mt-3 space-y-2">
                <li>- Intake is reviewed by therapeutic leads.</li>
                <li>- Compliance desk shares NDA + budget template.</li>
                <li>- You get a research concierge for daily syncs.</li>
              </ul>
            </div>
          </aside>

          <form
            className="space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-900/5 backdrop-blur"
            onSubmit={handleSubmit}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Step {stepIndex + 1}</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{steps[stepIndex].title}</h2>
              <p className="text-sm text-slate-500">{steps[stepIndex].description}</p>
            </div>

            {renderStep()}

            {stepError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {stepError}
              </div>
            )}

            {!submitted && (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-slate-800"
                >
                  {stepIndex === steps.length - 1 ? 'Submit to CRO desk' : 'Continue'}
                </button>
              </div>
            )}
          </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 bg-white/90 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-500 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Betaserrata. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy</span>
            <span>Compliance</span>
            <span>Careers</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CroFlowPage

