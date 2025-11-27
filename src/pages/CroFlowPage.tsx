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
  projectType: string
  services: {
    studyDesign: boolean
    regulatoryStrategy: boolean
    monitoringAudit: boolean
    vendorOversight: boolean
    biostatistics: boolean
    dataManagement: boolean
    medicalWriting: boolean
    qualitySOPs: boolean
    training: boolean
    pvSystem: boolean
    pvCaseProcessing: boolean
    pvAggregateReports: boolean
    pvSignalManagement: boolean
    pvAudits: boolean
  }
  studyPhase: string
  indication: string
  timeline: string
  budgetRange: string
  notes: string
}

const defaultForm: ResearchForm = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  projectType: '',
  services: {
    studyDesign: false,
    regulatoryStrategy: false,
    monitoringAudit: false,
    vendorOversight: false,
    biostatistics: false,
    dataManagement: false,
    medicalWriting: false,
    qualitySOPs: false,
    training: false,
    pvSystem: false,
    pvCaseProcessing: false,
    pvAggregateReports: false,
    pvSignalManagement: false,
    pvAudits: false,
  },
  studyPhase: '',
  indication: '',
  timeline: '',
  budgetRange: '',
  notes: '',
}

const steps = [
  { title: 'Profile', description: 'Who is reaching out' },
  { title: 'Service needs', description: 'What services you require' },
  { title: 'Project details', description: 'Study phase and timeline' },
  { title: 'Review & submit', description: 'Send to consulting desk' },
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
      if (!form.organization.trim()) return 'Tell us which organization or company is submitting this intake.'
      const email = form.email.trim()
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Add a valid work email so the invite reaches you.'
      if (form.phone.trim().length < 8) return 'Add a reachable mobile number (min 8 digits).'
    }
    if (stepIndex === 1) {
      const hasService = Object.values(form.services).some((v) => v === true)
      if (!hasService) return 'Select at least one service you need assistance with.'
      if (!form.projectType) return 'Select the project type to proceed.'
    }
    if (stepIndex === 2) {
      if (!form.studyPhase) return 'Select the study phase for your project.'
      if (!form.indication.trim()) return 'Describe the therapeutic area or indication.'
      if (!form.timeline.trim()) return 'Provide an estimated timeline or start window.'
    }
    return null
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
      const selectedServices = Object.entries(form.services)
        .filter(([_, value]) => value === true)
        .map(([key]) => {
          const serviceNames: Record<string, string> = {
            studyDesign: 'Protocol Design',
            regulatoryStrategy: 'Regulatory Strategy',
            monitoringAudit: 'Monitoring & Audit',
            vendorOversight: 'Vendor Oversight',
            biostatistics: 'Biostatistics',
            dataManagement: 'Data Management',
            medicalWriting: 'Medical Writing',
            qualitySOPs: 'Quality & SOPs',
            training: 'Training',
            pvSystem: 'PV System Setup',
            pvCaseProcessing: 'PV Case Processing',
            pvAggregateReports: 'PV Aggregate Reports',
            pvSignalManagement: 'PV Signal Management',
            pvAudits: 'PV Audits',
          }
          return serviceNames[key] || key
        })

      return (
        <div className="space-y-4 rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 text-sm text-slate-700">
          <p className="text-base font-semibold text-emerald-800">Submitted to Consulting Desk</p>
          <p>We will respond within 24 hours with a discovery call slot and initial proposal.</p>
          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Primary contact</dt>
              <dd className="font-semibold text-slate-900">{form.fullName || 'NA'}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Organization</dt>
              <dd className="font-semibold text-slate-900">{form.organization || 'NA'}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Project type</dt>
              <dd className="font-semibold text-slate-900">{form.projectType || 'TBD'}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Services requested</dt>
              <dd className="font-semibold text-slate-900">{selectedServices.length} service(s)</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Timeline</dt>
              <dd className="font-semibold text-slate-900">{form.timeline || 'To be discussed'}</dd>
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
              placeholder="Your full name"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-900">
            Organization / Company
            <input
              type="text"
              value={form.organization}
              onChange={(event) => handleChange('organization', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
              placeholder="e.g., Pharma company, CRO, Research lab"
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
                placeholder="your.email@company.com"
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
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Project type
            </label>
            <select
              value={form.projectType}
              onChange={(event) => handleChange('projectType', event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
            >
              <option value="">Select project type</option>
              <option value="ba-be">BA/BE Study</option>
              <option value="phase-i">Phase I Trial</option>
              <option value="phase-ii-iii">Phase II/III Trial</option>
              <option value="regulatory">Regulatory Submission</option>
              <option value="pv">Pharmacovigilance</option>
              <option value="quality">Quality & Training</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 mb-3">Select services needed</p>
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-3">Study Design & Regulatory</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.studyDesign}
                      onChange={(event) => handleChange('services', { ...form.services, studyDesign: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>Protocol design (BA/BE, Phase I)</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.regulatoryStrategy}
                      onChange={(event) => handleChange('services', { ...form.services, regulatoryStrategy: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>Regulatory strategy (CDSCO, FDA, EMA)</span>
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-3">Monitoring & Audit</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.monitoringAudit}
                      onChange={(event) => handleChange('services', { ...form.services, monitoringAudit: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>Independent monitoring & GCP compliance</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.vendorOversight}
                      onChange={(event) => handleChange('services', { ...form.services, vendorOversight: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>CRO/vendor oversight & audits</span>
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-3">Data & Medical Writing</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.biostatistics}
                      onChange={(event) => handleChange('services', { ...form.services, biostatistics: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>Biostatistics & PK/BE analysis</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.dataManagement}
                      onChange={(event) => handleChange('services', { ...form.services, dataManagement: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>Data management & QC</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.medicalWriting}
                      onChange={(event) => handleChange('services', { ...form.services, medicalWriting: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>Medical writing (protocols, CSRs, CTD)</span>
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-3">Quality & Training</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.qualitySOPs}
                      onChange={(event) => handleChange('services', { ...form.services, qualitySOPs: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>SOP development & quality systems</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.training}
                      onChange={(event) => handleChange('services', { ...form.services, training: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>GCP & BA/BE training</span>
                  </label>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-3">Pharmacovigilance</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.pvSystem}
                      onChange={(event) => handleChange('services', { ...form.services, pvSystem: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>PV system setup & governance</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.pvCaseProcessing}
                      onChange={(event) => handleChange('services', { ...form.services, pvCaseProcessing: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>ICSR case processing support</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.pvAggregateReports}
                      onChange={(event) => handleChange('services', { ...form.services, pvAggregateReports: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>Aggregate reports (PSUR, DSUR, RMP)</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.pvSignalManagement}
                      onChange={(event) => handleChange('services', { ...form.services, pvSignalManagement: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>Signal management & safety strategy</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.services.pvAudits}
                      onChange={(event) => handleChange('services', { ...form.services, pvAudits: event.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <span>PV audits & inspection readiness</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (stepIndex === 2) {
      return (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-900">
            Study phase
            <select
              value={form.studyPhase}
              onChange={(event) => handleChange('studyPhase', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
            >
              <option value="">Select study phase</option>
              <option value="ba-be">BA/BE Study</option>
              <option value="phase-i">Phase I</option>
              <option value="phase-ii">Phase II</option>
              <option value="phase-iii">Phase III</option>
              <option value="post-market">Post-market</option>
              <option value="regulatory">Regulatory submission</option>
              <option value="pv-only">Pharmacovigilance only</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-900">
            Therapeutic area / Indication
            <input
              type="text"
              value={form.indication}
              onChange={(event) => handleChange('indication', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
              placeholder="e.g., Autoimmune, Oncology, Metabolic disorders"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-900">
            Estimated timeline / Start window
            <input
              type="text"
              value={form.timeline}
              onChange={(event) => handleChange('timeline', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
              placeholder="e.g., Q2 2024, 3-6 months, Immediate"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-900">
            Budget range (optional)
            <select
              value={form.budgetRange}
              onChange={(event) => handleChange('budgetRange', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-slate-900"
            >
              <option value="">Select budget range</option>
              <option value="under-5">Under INR 5 lakhs</option>
              <option value="5-10">INR 5-10 lakhs</option>
              <option value="10-25">INR 10-25 lakhs</option>
              <option value="25-50">INR 25-50 lakhs</option>
              <option value="50-plus">INR 50+ lakhs</option>
              <option value="discuss">To be discussed</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-900">
            Additional context
            <textarea
              rows={4}
              value={form.notes}
              onChange={(event) => handleChange('notes', event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900"
              placeholder="Share any specific requirements, regulatory pathway details, or other relevant information."
            />
          </label>
        </div>
      )
    }

    const selectedServices = Object.entries(form.services)
      .filter(([_, value]) => value === true)
      .map(([key]) => {
        const serviceNames: Record<string, string> = {
          studyDesign: 'Protocol Design',
          regulatoryStrategy: 'Regulatory Strategy',
          monitoringAudit: 'Monitoring & Audit',
          vendorOversight: 'Vendor Oversight',
          biostatistics: 'Biostatistics',
          dataManagement: 'Data Management',
          medicalWriting: 'Medical Writing',
          qualitySOPs: 'Quality & SOPs',
          training: 'Training',
          pvSystem: 'PV System Setup',
          pvCaseProcessing: 'PV Case Processing',
          pvAggregateReports: 'PV Aggregate Reports',
          pvSignalManagement: 'PV Signal Management',
          pvAudits: 'PV Audits',
        }
        return serviceNames[key] || key
      })

    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-600">
          <p className="text-base font-semibold text-slate-900">Quick review</p>
          <ul className="mt-3 space-y-2">
            <li>
              <span className="text-slate-500">Contact:</span> <span className="font-semibold text-slate-900">{form.fullName || 'Pending'}</span>
            </li>
            <li>
              <span className="text-slate-500">Organization:</span> <span className="font-semibold text-slate-900">{form.organization || 'Pending'}</span>
            </li>
            <li>
              <span className="text-slate-500">Project type:</span>{' '}
              <span className="font-semibold text-slate-900">{form.projectType || 'Not selected'}</span>
            </li>
            <li>
              <span className="text-slate-500">Study phase:</span>{' '}
              <span className="font-semibold text-slate-900">{form.studyPhase || 'Not selected'}</span>
            </li>
            <li>
              <span className="text-slate-500">Services:</span>{' '}
              <span className="font-semibold text-slate-900">{selectedServices.length > 0 ? selectedServices.join(', ') : 'None selected'}</span>
            </li>
            <li>
              <span className="text-slate-500">Timeline:</span>{' '}
              <span className="font-semibold text-slate-900">{form.timeline || 'Not specified'}</span>
            </li>
          </ul>
        </div>
        <p className="text-sm text-slate-500">
          Hit submit to notify our consulting desk. You will receive a response within 24 hours with a discovery call slot and initial proposal.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6fbf6] via-white to-[#fef7ef]">
      <Navbar items={navItems} activeSection="home" onNavigate={handleNavigate} />
      
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden pt-20 sm:pt-24 min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] flex items-center">
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

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full py-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 w-full">
            <div className="flex flex-col justify-center">
              <div className="status-pill w-fit">
                <span className="status-indicator" />
                <span className="text-xs uppercase tracking-widest">Clinical Research</span>
              </div>
              <h1 className="hero-title mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Independent Clinical Research
                <span className="block mt-2">
                  Consulting Services
                </span>
              </h1>
              <p className="hero-lead mt-4 text-sm sm:text-base">
                Expert consulting for BA/BE studies, Phase I–III trials, and pharmacovigilance. From study design and regulatory strategy to monitoring, data management, and quality systems—we provide specialized support tailored to your needs.
              </p>
              <div className="hero-actions mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => document.getElementById('registration-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cta-primary text-xs uppercase tracking-widest w-full sm:w-auto"
                >
                  Register Your Study
                </button>
                <button
                  onClick={() => document.getElementById('registration-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="cta-secondary text-xs uppercase tracking-widest w-full sm:w-auto"
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
                      <p className="text-sm font-semibold text-slate-900">Study Design & Regulatory</p>
                      <p className="text-xs text-slate-600">BA/BE protocols, regulatory strategy</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <svg className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Monitoring & Audit</p>
                      <p className="text-xs text-slate-600">GCP compliance, vendor oversight</p>
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
                      <p className="text-sm font-semibold text-slate-900">Data & Statistics</p>
                      <p className="text-xs text-slate-600">Biostatistics, medical writing</p>
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
                      <p className="text-sm font-semibold text-slate-900">Pharmacovigilance</p>
                      <p className="text-xs text-slate-600">PV systems, signal management</p>
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

