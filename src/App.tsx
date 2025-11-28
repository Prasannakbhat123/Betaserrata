import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'
import Navbar from './components/Navbar'
import { navItems } from './data'
import type { NavSection } from './data'
import AdvisoryBoardSection from './sections/AdvisoryBoardSection'
import CdmoSection from './sections/CdmoSection'
import ClinicalResearchSection from './sections/ClinicalResearchSection'
import ContactSection from './sections/ContactSection'
import FlowShowcaseSection from './sections/FlowShowcaseSection'
import HeroSection from './sections/HeroSection'
import TrainingSection from './sections/TrainingSection'
import TrustBannerSection from './sections/TrustBannerSection'
import ProductFlowPage from './pages/ProductFlowPage'
import ProductCheckoutPage from './pages/ProductCheckoutPage'
import CroFlowPage from './pages/CroFlowPage'

const HomePage = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('home')

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
    })

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Refresh AOS on scroll to work with Lenis
    lenis.on('scroll', () => {
      AOS.refresh()
    })

    // Store lenis instance for navigation
    ;(window as any).__lenis = lenis

    return () => {
      lenis.destroy()
      delete (window as any).__lenis
      AOS.refreshHard()
    }
  }, [])

  useEffect(() => {
    const lenis = (window as any).__lenis as Lenis | undefined
    
    const handleScroll = () => {
      const scrollPosition = lenis?.scroll || window.scrollY
      const adjustedPosition = scrollPosition + 150 // Offset for navbar + some padding

      // Find the section that's currently in view
      let currentSection: NavSection = 'home'

      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id)
        if (section) {
          const { offsetTop } = section
          if (adjustedPosition >= offsetTop) {
            currentSection = navItems[i].id
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    // Initial check
    handleScroll()

    // Listen to scroll events
    if (lenis) {
      lenis.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    // Also use IntersectionObserver as a backup
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting)
        if (intersecting.length > 0) {
          // Sort by intersection ratio and position
          const sorted = intersecting.sort((a, b) => {
            const ratioDiff = b.intersectionRatio - a.intersectionRatio
            if (Math.abs(ratioDiff) > 0.2) return ratioDiff
            return a.boundingClientRect.top - b.boundingClientRect.top
          })
          setActiveSection(sorted[0].target.id as NavSection)
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
      },
    )

    navItems.forEach((item) => {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    })

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
      observer.disconnect()
    }
  }, [])

  const handleNavigate = (id: NavSection) => {
    const section = document.getElementById(id)
    const lenis = (window as any).__lenis as Lenis | undefined
    if (section && lenis) {
      lenis.scrollTo(section, {
        offset: -80, // Account for navbar height
        duration: 1.2,
      })
    } else if (section) {
      // Fallback if lenis not ready
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="app-shell min-h-screen text-slate-900">
      <Navbar items={navItems} activeSection={activeSection} onNavigate={handleNavigate} />
      <main>
        <HeroSection />
        <FlowShowcaseSection />
        <TrustBannerSection />
        <AdvisoryBoardSection />
        <CdmoSection />
        <ClinicalResearchSection />
        <TrainingSection />
        <ContactSection />
      </main>
      <footer className="border-t border-slate-200/80 bg-white/90 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-slate-500 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Betaserrata. All rights reserved.</p>
          <div className="micro-meta micro-meta-muted flex items-center gap-6">
            <span>Privacy</span>
            <span>Compliance</span>
            <span>Careers</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/product" element={<ProductFlowPage />} />
    <Route path="/product/checkout" element={<ProductCheckoutPage />} />
    <Route path="/cro" element={<CroFlowPage />} />
  </Routes>
)

export default App
