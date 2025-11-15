export type NavSection =
  | 'home'
  | 'advisory-board'
  | 'cdmo'
  | 'clinical-research'
  | 'training'
  | 'contact'

export const navItems: Array<{ id: NavSection; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'advisory-board', label: 'Advisory Board' },
  { id: 'cdmo', label: 'CDMO' },
  { id: 'clinical-research', label: 'Clinical Research' },
  { id: 'training', label: 'Clinical Research Training' },
  { id: 'contact', label: 'Contact Us' },
]

export const boardMembers = [
  {
    name: 'Prof. Dr.H.P.T Ammon',
    title: 'Chief Scientific Advisor',
    expertise: '',
    summary: '',
    image: '/assets/ammon.webp',
  },
  {
    name: 'Dr. G.B Singh',
    title: 'Chief Scientific Advisor',
    expertise: '',
    summary: '',
    image: '/assets/gbsingh.webp',
  },
]

export const cdmoHighlights = [
  {
    title: 'Molecule Acceleration Pod',
    description:
      'Co-design formulation, analytics, and tech transfer within unified digital workspaces to unlock earlier IND readiness.',
    metrics: '36% faster IND readiness',
  },
  {
    title: 'Smart Manufacturing Suite',
    description:
      'Real-time deviation intelligence with predictive release analytics ensures compliant, confident scale up from pilot to commercial.',
    metrics: '99.4% batch right-first-time',
  },
  {
    title: 'Sustainable Pathway Lab',
    description:
      'Green chemistry and solvent recovery programs anchored in lifecycle assessments aligned with ESG benchmarks.',
    metrics: '28% waste reduction',
  },
]

export const researchHighlights = [
  {
    title: 'Therapeutic Centers of Excellence',
    description:
      'Dedicated oncology, CNS, and metabolic units integrating genomic signatures into patient stratification strategies.',
  },
  {
    title: 'Unified Data Spine',
    description:
      'Seamless eSource, eCOA, and wearable telemetry ingestion with AI-assisted anomaly detection and query resolution.',
  },
]

export const trainingTracks = [
  {
    title: 'Foundations of Clinical Excellence',
    duration: '6-week immersion',
    focus:
      'Protocol mastery, GCP certifications, and simulated investigator meetings guided by live global faculty.',
  },
  {
    title: 'Digital Trial Command',
    duration: '4-week sprint',
    focus:
      'Hands-on use of unified data platforms, risk-based monitoring, and AI-enabled signal management labs.',
  },
  {
    title: 'Regulatory Translation Studio',
    duration: 'Executive capsule',
    focus:
      'Case-based workshops turning strategy into submission-ready narratives for FDA, EMA, and PMDA.',
  },
]

export const milestones = [
  {
    year: '2015',
    headline: 'Integrated Clinical & Pharma Solutions launched',
    summary:
      'Betaserrata established as an adaptive hub connecting science, manufacturing, and patient engagement.',
  },
  {
    year: '2019',
    headline: 'Global Partner Network expanded',
    summary: 'Onboarded strategic alliances across APAC, EU, and LATAM for 24/7 trial orchestration.',
  },
  {
    year: '2023',
    headline: 'AI-Augmented Delivery',
    summary: 'Introduced cognitive assistants and predictive compliance scoring across all delivery verticals.',
  },
]

export const metrics = [
  { value: '120+', label: 'Integrated global trials' },
  { value: '45', label: 'Therapeutic areas optimized' },
  { value: '18', label: 'Regulatory jurisdictions navigated' },
]

export const contactPoints = [
  { label: 'Global HQ', value: 'Plot 27, Genome Valley, Hyderabad, India' },
  { label: 'North America', value: 'Boston Innovation Dock, MA' },
  { label: 'Talent', value: 'careers@betaserrata.com' },
  { label: 'Phone', value: '+1 857 555 0147' },
]

