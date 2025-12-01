export type Product = {
  id: string
  name: string
  description: string
  price: number
  badge: string
  volume: string
  image: string
  highlights: string[]
  rating: number
  reviewCount: number
  detailedDescription: string
}

export const productCatalog: Product[] = [
  {
    id: 'betaserrata-complex',
    name: 'Betaserrata Plant-Based Complex',
    description: 'Plant-based tablet pairing standardized Boswellia with adaptogenic plant extracts for whole-body calm.',
    price: 1299,
    badge: 'Clinical Batch',
    volume: '30-day system',
    image: '/assets/tablet.jpg',
    highlights: ['65% boswellic acids', 'Independent potency cert', 'GMP bottled capsules'],
    rating: 4.8,
    reviewCount: 127,
    detailedDescription: 'Our flagship Plant-Based Complex combines standardized Boswellia serrata extract (65% boswellic acids) with a proprietary blend of adaptogenic plant extracts including Ashwagandha, Tulsi, and Guduchi. Each capsule is manufactured in our GMP-certified facility and undergoes rigorous third-party testing for potency and purity. The 30-day system is designed to support natural inflammatory response, promote joint comfort, and enhance overall vitality. Recommended dosage: 2 capsules daily with meals. Free from artificial additives, gluten, and common allergens.',
  },
  {
    id: 'betaserrata-gel',
    name: 'Rapid Recovery Transdermal Gel',
    description: 'Plant-based oil-gel hybrid that layers phytoactives in a fast-absorbing base for joints and muscles.',
    price: 899,
    badge: 'Pilot Launch',
    volume: '50 ml airless pump',
    image: '/assets/oil.jpg',
    highlights: ['Derm-tested base', 'Adaptive release polymer', 'Plant-based extracts in oil form'],
    rating: 4.6,
    reviewCount: 89,
    detailedDescription: 'Rapid Recovery Gel represents a breakthrough in topical plant-based formulation. Our unique micro-emulsion technology delivers concentrated phytoactives—including Boswellia oil, Wintergreen, and Camphor—deep into muscle tissue for targeted relief. The airless pump preserves potency and ensures hygienic dispensing. Dermatologically tested and suitable for sensitive skin. Clinical observations show noticeable comfort within 20-30 minutes of application. Apply 2-3 pumps to affected areas up to 3 times daily. Non-greasy, fast-absorbing formula with a subtle plant-based aroma.',
  },
]

export const formatCurrency = (value: number) => `INR ${value.toLocaleString('en-IN')}`

export const countries = [
  { code: 'IN', label: 'India', dialCode: '+91' },
  { code: 'US', label: 'United States', dialCode: '+1' },
  { code: 'SG', label: 'Singapore', dialCode: '+65' },
]

