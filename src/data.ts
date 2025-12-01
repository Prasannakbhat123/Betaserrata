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
    title: 'ICH GCP Training',
    duration: 'Comprehensive',
    focus:
      'ICH E6(R3) principles, risk‑based quality management, and participant‑centred trial conduct. Protocol implementation, informed consent, and safety reporting.',
    icon: 'shield',
  },
  {
    title: 'ICMR Guidelines and Ethics',
    duration: 'Structured modules',
    focus:
      'ICMR national ethical guidelines, ethics review processes, and Indian regulatory expectations. Role‑specific training for investigators and Ethics Committee members.',
    icon: 'document',
  },
  {
    title: 'Quality Management Services',
    duration: 'Training & consulting',
    focus:
      'Quality systems: SOPs, risk‑based monitoring, CAPA management, and audit readiness. Support for internal audits, vendor oversight, and continuous improvement.',
    icon: 'check-circle',
  },
  {
    title: 'Computer System Validation (CSV)',
    duration: 'End‑to‑end training',
    focus:
      'CSV training for GxP‑relevant systems: lifecycle approach, user requirements, risk assessment, validation planning, and change control. GAMP compliance.',
    icon: 'server',
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

