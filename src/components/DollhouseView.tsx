import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// CSS 3D isometric dollhouse floor plan — no model file needed
const ROOMS = [
  {
    id: 'exterior',
    label: 'Exterior',
    icon: '🏛',
    gridArea: 'exterior',
    size: '580 m²',
    title: 'Villa Exterior',
    description: 'Contemporary architecture with clean lines, floor-to-ceiling glazing, louvred facade panels and a landscaped driveway.',
    features: ['Louvred Facade', 'Driveway (3 Cars)', 'Landscaped Garden', 'Infinity Pool'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
  {
    id: 'living',
    label: 'Living Room',
    icon: '🛋',
    gridArea: 'living',
    size: '65 m²',
    title: 'Open-Plan Living',
    description: 'Spacious, elegant living area designed for comfort with premium finishes, double-height ceiling and natural daylighting.',
    features: ['Double-Height Ceiling', 'Feature Wall', 'Smart AV System', 'Floor-to-Ceiling Glass'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: '🍽',
    gridArea: 'kitchen',
    size: '42 m²',
    title: 'Kitchen & Dining',
    description: 'Fully fitted kitchen with premium appliances, custom cabinetry, marble island and generous dining space.',
    features: ['Marble Island', 'Integrated Appliances', 'Breakfast Bar', 'Pantry Storage'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  },
  {
    id: 'bedroom',
    label: 'Master Bedroom',
    icon: '🛏',
    gridArea: 'bedroom',
    size: '55 m²',
    title: 'Master Suite',
    description: 'Luxurious master suite with walk-in wardrobe, en-suite bathroom, private balcony and garden views.',
    features: ['Walk-in Wardrobe', 'En-suite Bathroom', 'Private Balcony', 'Garden Views'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
  },
  {
    id: 'other',
    label: 'Other Rooms',
    icon: '🚪',
    gridArea: 'other',
    size: '3 × 30 m²',
    title: 'Additional Bedrooms',
    description: 'Three further bedrooms each with en-suite bathrooms, fitted wardrobes and natural light.',
    features: ['En-suite Bathrooms', 'Fitted Wardrobes', 'Natural Daylight', 'Balcony Access'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
  },
  {
    id: 'floorplan',
    label: 'Floor Plan',
    icon: '📐',
    gridArea: 'floorplan',
    size: '500 m² GIA',
    title: 'Floor Plan',
    description: 'Thoughtfully planned across two levels with generous proportions, clear circulation and seamless indoor-outdoor connection.',
    features: ['Ground Floor: 280 m²', 'First Floor: 220 m²', 'Total: 500 m² GIA', 'Private Garden'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
]

export default function DollhouseView() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null)

  const active = ROOMS.find(r => r.id === activeRoom)

  return (
    <section className="section-pad bg-navy relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.5) 39px, rgba(255,255,255,0.5) 40px)' }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="eyebrow mb-4">Interactive Model</p>
            <h2 className="font-display text-display-lg text-ivory">
              Explore Every Detail.
            </h2>
          </div>
          <div className="self-end">
            <p className="text-ivory/50 leading-relaxed">
              Interact with our property model to explore rooms, floor plans and key features.
              Select any zone below to view specifications and photography.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* ── CSS 3D Isometric Floor Plan ── */}
          <div className="relative">
            {/* Isometric perspective container */}
            <div
              className="relative w-full"
              style={{ perspective: '800px' }}
            >
              <motion.div
                initial={{ rotateX: 60, rotateZ: -45, opacity: 0, y: 40 }}
                whileInView={{ rotateX: 60, rotateZ: -45, opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative mx-auto"
              >
                {/* Floor plate */}
                <div
                  className="relative mx-auto bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-lg overflow-hidden shadow-dark-lg"
                  style={{ width: '100%', maxWidth: 600, aspectRatio: '4/3' }}
                >
                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                  />

                  {/* Room zones */}
                  <div className="absolute inset-4 grid gap-1" style={{
                    gridTemplateColumns: '1.6fr 1fr 1fr',
                    gridTemplateRows: '1fr 1fr 0.5fr',
                  }}>
                    {[
                      { id: 'living', label: 'Living', col: '1', row: '1', bg: 'from-blue-900/40 to-blue-800/30' },
                      { id: 'bedroom', label: 'Master', col: '2', row: '1', bg: 'from-purple-900/40 to-purple-800/30' },
                      { id: 'other', label: 'Rooms', col: '3', row: '1', bg: 'from-indigo-900/40 to-indigo-800/30' },
                      { id: 'kitchen', label: 'Kitchen', col: '1', row: '2', bg: 'from-amber-900/40 to-amber-800/30' },
                      { id: 'exterior', label: 'Pool', col: '2/4', row: '2', bg: 'from-cyan-900/40 to-cyan-800/30' },
                      { id: 'floorplan', label: 'Floor Plan', col: '1/4', row: '3', bg: 'from-stone-800/60 to-stone-900/50' },
                    ].map(zone => (
                      <button
                        key={zone.id}
                        onClick={() => setActiveRoom(zone.id)}
                        className={`relative group rounded border bg-gradient-to-br ${zone.bg} transition-all duration-300 flex items-center justify-center ${
                          activeRoom === zone.id
                            ? 'border-gold/60 shadow-gold-sm'
                            : 'border-white/10 hover:border-gold/30'
                        }`}
                        style={{ gridColumn: zone.col, gridRow: zone.row }}
                      >
                        {/* Hotspot dot */}
                        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-all ${
                          activeRoom === zone.id ? 'bg-gold scale-125' : 'bg-white/20 group-hover:bg-gold/50'
                        }`} />
                        <span className="text-[10px] text-white/50 font-sans uppercase tracking-wider">
                          {zone.label}
                        </span>
                        {activeRoom === zone.id && (
                          <motion.div
                            layoutId="room-highlight"
                            className="absolute inset-0 bg-gold/10 rounded border border-gold/30"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* North indicator */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                        <path d="M8 1L10 7H6L8 1Z" fill="#E0B86C" opacity="0.8"/>
                        <path d="M8 15L6 9H10L8 15Z" fill="white" opacity="0.3"/>
                        <circle cx="8" cy="8" r="2" fill="#E0B86C" opacity="0.6"/>
                      </svg>
                    </div>
                    <span className="text-[9px] text-gold/60 font-sans uppercase tracking-widest">N</span>
                  </div>

                  {/* Scale bar */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <div className="w-8 h-0.5 bg-gold/40" />
                      <div className="w-0.5 h-1 bg-gold/40" />
                    </div>
                    <span className="text-[8px] text-ivory/30 font-sans">10m</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Room selector pills (below the floor plan) */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {ROOMS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setActiveRoom(activeRoom === r.id ? null : r.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-sans font-medium transition-all duration-200 ${
                    activeRoom === r.id
                      ? 'bg-gold text-obsidian border-gold'
                      : 'border-white/10 text-ivory/50 hover:border-gold/40 hover:text-ivory/80'
                  }`}
                >
                  <span>{r.icon}</span> {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Detail panel ── */}
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="card-glass rounded-xl overflow-hidden sticky top-24"
              >
                {/* Room image */}
                <div className="relative h-40 overflow-hidden">
                  <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 overlay-bottom" />
                  <button
                    onClick={() => setActiveRoom(null)}
                    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-ivory/70 hover:text-ivory hover:bg-black/70 transition-colors"
                  >
                    <X size={13} />
                  </button>
                  <div className="absolute bottom-3 left-4">
                    <p className="text-[10px] text-gold font-sans uppercase tracking-wider mb-0.5">{active.label}</p>
                    <p className="text-ivory font-display text-xl">{active.title}</p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-ivory/40 font-sans">Size:</span>
                    <span className="text-sm text-gold font-sans font-medium">{active.size}</span>
                  </div>
                  <p className="text-ivory/60 text-sm leading-relaxed mb-5">{active.description}</p>
                  <div className="divider-gold mb-4" />
                  <ul className="space-y-2">
                    {active.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-ivory/50 font-sans">
                        <span className="w-1 h-1 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-glass rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[300px] sticky top-24"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <p className="text-ivory/40 text-sm font-sans">
                  Select a room or zone from the floor plan to view specifications and photography.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-ivory/20 font-sans mt-8">
          ✦ Illustrative floor plan — sample data. Actual dimensions and layouts subject to final plans.
        </p>
      </div>
    </section>
  )
}
