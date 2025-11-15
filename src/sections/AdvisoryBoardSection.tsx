import { boardMembers } from '../data'

const AdvisoryBoardSection = () => (
  <section id="advisory-board" className="section-padding bg-white relative overflow-hidden">
    <div className="section-shapes section-shapes--advisory" aria-hidden="true">
      <div className="section-shape section-shape-1" />
      <div className="section-shape section-shape-2" />
      <div className="section-shape section-shape-3" />
    </div>
    <div className="mx-auto max-w-6xl px-6 sm:px-8 relative z-10">
      <div className="advisory-header" data-aos="fade-up">
        <div className="advisory-emblem">Advisory Board</div>
        <h2 className="advisory-title">Ancient Wisdom, Evolved Through Research</h2>
        <p className="advisory-description">
          With years of research, we evolved the Boswellia plant extracts into an easy-to-access, over-the-counter tablet for those who need it. Essentially effective for people suffering from types of Osteoarthritis, this naturally produced remedy has great benefits. And have been used as a medicine in India since many moons.
        </p>
        <div className="advisory-divider" />
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-2 lg:gap-16">
        {boardMembers.map((member, index) => (
          <article key={member.name} className="advisor-card-large group" data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="relative aspect-[3/4] w-full max-h-[70vh] overflow-hidden rounded-2xl">
              <img 
                src={member.image} 
                alt={member.name} 
                className="h-full w-full object-cover object-center object-top transition-transform duration-1000 ease-in-out group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity duration-1000 ease-in-out group-hover:opacity-95" />
              
              {/* Name and Position Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{member.name}</h3>
                  <p className="text-lg font-medium text-white/90 sm:text-xl">{member.title}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default AdvisoryBoardSection

