import { useState } from 'react'
import type { NavSection } from '../data'

type NavItem = {
  id: NavSection
  label: string
}

type NavbarProps = {
  items: NavItem[]
  activeSection: NavSection
  onNavigate: (id: NavSection) => void
}

const Navbar = ({ items, activeSection, onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigate = (id: NavSection) => {
    onNavigate(id)
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl ">
            <img src="/assets/logo.png" alt="Betaserrata logo" className="h-9 w-auto" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-wide text-slate-900">Betaserrata</p>
            {/* <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
              Integrated Clinical &amp; Pharma Solutions
            </p> */}
          </div>
        </div>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition md:hidden"
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
            <path d="M4 6.5h16M4 12h16M4 17.5h16" strokeLinecap="round" />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? 'max-h-[520px]' : 'max-h-0'
          } absolute left-0 right-0 top-full overflow-hidden border-b border-slate-200 bg-white/95 px-6 transition-all duration-300 md:static md:max-h-none md:border-b-0 md:bg-transparent md:px-0`}
        >
          <div className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:gap-2 md:py-0">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition md:px-5 md:py-2.5 ${
                  activeSection === item.id ? 'nav-active-light' : 'nav-inactive-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

