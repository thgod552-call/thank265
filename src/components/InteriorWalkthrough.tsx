import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const ROOMS = [
  {
    id: 'living',
    label: 'Living Room',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85&fm=webp',
    headline: 'Designed for Living.',
    copy: 'Experience refined interiors, spacious layouts and modern finishes crafted for your lifestyle. High ceilings, floor-to-ceiling glazing and natural daylight throughout.',
  },
  {
    id: 'kitchen',
    label: 'Kitchen & Dining',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=85&fm=webp',
    headline: 'A Kitchen to Gather.',
    copy: 'Fully fitted kitchen with premium appliances, custom cabinetry, marble work surfaces and a generous dining area that opens onto the terrace.',
  },
  {
    id: 'bedroom',
    label: 'Master Bedroom',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=85&fm=webp',
    headline: 'Rest. Restored.',
    copy: 'Generous master suite with bespoke fitted wardrobes, en-suite bathroom with freestanding bath, and views across the landscaped garden.',
  },
  {
    id: 'terrace',
    label: 'Terrace & Pool',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=85&fm=webp',
    headline: 'Where Inside Meets Out.',
    copy: 'A seamless transition from interior living to a private terrace, pool deck and landscaped garden designed for year-round entertaining.',
  },
]

export default function InteriorWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeRoom, setActiveRoom] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  // Reveal section on scroll
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => setIsVisible(true),
      })
    }, section)
    return () => ctx.revert()
  }, [])

  // Auto-advance rooms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoom(prev => (prev + 1) % ROOMS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const room = ROOMS[activeRoom]

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Full-screen background image with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={room.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={room.image}
            alt={room.label}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 overlay-full" />
          {/* Left darkening */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(7,9,14,0.85) 0%, rgba(7,9,14,0.3) 55%, transparent 100%)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 min-h-screen flex flex-col justify-center py-24">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            className="eyebrow mb-6 flex items-center gap-3"
          >
            <span className="inline-block w-8 h-px bg-gold opacity-60" />
            Step Inside
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div key={room.id}>
              <motion.h2
                ref={headlineRef}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-display-xl text-ivory mb-6"
              >
                {room.headline}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="text-ivory/70 text-base md:text-lg font-light leading-relaxed mb-10"
              >
                {room.copy}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.a
            href="/properties"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.6 }}
            className="btn-ghost inline-flex"
          >
            Explore This Space →
          </motion.a>
        </div>
      </div>

      {/* Room selector strip (bottom) */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        {/* Gradient above strip */}
        <div className="h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        <div className="bg-black/60 backdrop-blur-md border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-0">
            <div className="grid grid-cols-4">
              {ROOMS.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRoom(i)}
                  className={`relative flex flex-col items-center gap-2 py-4 md:py-5 text-center transition-all duration-300 group ${
                    i === activeRoom ? 'text-gold' : 'text-ivory/40 hover:text-ivory/70'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className={`hidden md:block w-16 h-10 rounded overflow-hidden border transition-all duration-300 ${
                    i === activeRoom ? 'border-gold/60 shadow-gold-sm' : 'border-white/10'
                  }`}>
                    <img src={r.image} alt={r.label} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] font-sans font-500 tracking-wider uppercase">{r.label}</span>
                  {/* Active indicator */}
                  {i === activeRoom && (
                    <motion.div
                      layoutId="room-indicator"
                      className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-gold to-bronze"
                    />
                  )}
                  {/* Progress bar for auto-advance */}
                  {i === activeRoom && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/10">
                      <motion.div
                        className="h-full bg-gold/60"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        key={`${room.id}-progress`}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
