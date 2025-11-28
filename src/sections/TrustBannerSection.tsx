const TrustBannerSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#8c6a45] via-[#7b5c3b] to-[#6b4f2f] py-12 sm:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-3">
          {/* GMP Certified */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center">
              <svg 
                className="h-12 w-12 sm:h-16 sm:w-16 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                />
              </svg>
            </div>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-white">
              GMP Certified & Quality Assured
            </p>
          </div>

          {/* Third-Party Tested */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center">
              <svg 
                className="h-12 w-12 sm:h-16 sm:w-16 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
                />
              </svg>
            </div>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-white">
              Third-Party Tested for Potency
            </p>
          </div>

          {/* Clinically Proven */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center">
              <svg 
                className="h-12 w-12 sm:h-16 sm:w-16 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
            </div>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-white">
              Clinically Proven & Safe
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustBannerSection

