import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bed, Bath, Maximize2, ArrowRight, MapPin } from 'lucide-react'
import { PROPERTIES, formatPrice, buildWhatsAppLink, type Property } from '../lib/data'

function StatusBadge({ status }: { status: Property['status'] }) {
  const map: Record<Property['status'], string> = {
    'For Sale': 'badge-for-sale',
    'Featured': 'badge-featured',
    'New': 'badge-new',
    'Off-Plan': 'badge-off-plan',
    'Sold Out': 'badge-sold-out',
  }
  return <span className={`badge-status ${map[status]}`}>{status}</span>
}

export function PropertyCard({ property, featured = false }: { property: Property; featured?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      className={`group card-glass rounded-xl overflow-hidden transition-all duration-500 ${
        featured ? 'shadow-dark-lg' : ''
      }`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <div className="prop-img-wrap relative overflow-hidden" style={{ height: featured ? 280 : 220 }}>
        <img
          src={property.image}
          alt={`${property.name} — ${property.location}`}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          loading="lazy"
        />
        <div className="absolute inset-0 overlay-bottom" />
        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <StatusBadge status={property.status} />
        </div>
        {/* City label */}
        <div className="absolute top-4 right-4">
          <span className="badge-status badge-featured text-[9px]">{property.city}</span>
        </div>
        {/* Quick hover actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-4 inset-x-4 flex gap-2"
        >
          <a
            href={buildWhatsAppLink(property)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-whatsapp justify-center text-[11px] py-2"
            onClick={e => e.stopPropagation()}
          >
            WhatsApp
          </a>
          <Link
            to={`/contact?property=${property.id}`}
            className="flex-1 btn-ghost justify-center text-[11px] py-2"
            onClick={e => e.stopPropagation()}
          >
            Enquire
          </Link>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start gap-1.5 mb-2">
          <MapPin size={11} className="text-bronze mt-0.5 flex-shrink-0" />
          <p className="text-xs text-ivory/40 font-sans">{property.location}</p>
        </div>
        <h3 className="font-display text-2xl text-ivory mb-4 leading-tight">{property.name}</h3>

        {/* Specs row */}
        {(property.bedrooms || property.area) && (
          <div className="flex flex-wrap items-center gap-4 mb-5 text-xs text-ivory/40 font-sans">
            {property.bedrooms && (
              <span className="flex items-center gap-1.5">
                <Bed size={13} className="text-bronze/70" />
                {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1.5">
                <Bath size={13} className="text-bronze/70" />
                {property.bathrooms} Baths
              </span>
            )}
            {property.area && (
              <span className="flex items-center gap-1.5">
                <Maximize2 size={13} className="text-bronze/70" />
                {property.area} m²
              </span>
            )}
            <span className="text-ivory/30 capitalize">{property.type}</span>
          </div>
        )}

        <div className="divider-gold mb-4" />
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl text-gold font-light">
            {property.price ? formatPrice(property.price) : (property.priceLabel ?? 'Price on Request')}
          </p>
          <Link
            to={`/properties/${property.slug}`}
            className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian transition-all duration-300 group/btn"
          >
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const featured = PROPERTIES.slice(0, 3)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section-pad bg-obsidian">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-4"
            >
              The Selected Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-display-lg text-ivory"
            >
              A Place to Call<br className="hidden md:block" /> Your Own.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/properties" className="btn-ghost text-sm flex items-center gap-2 whitespace-nowrap">
              View All Properties
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Property grid — editorial asymmetric layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((prop, i) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
              transition={{ duration: 0.7, delay: i * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <PropertyCard property={prop} featured={i === 0} />
            </motion.div>
          ))}
        </div>

        {/* Sample data notice */}
        <p className="text-center text-xs text-ivory/20 font-sans mt-10">
          ✦ Sample data · All prices, availability and specifications are illustrative until verified by Cosnova.
        </p>
      </div>
    </section>
  )
}
