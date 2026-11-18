import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/developments', label: 'Developments' },
  { href: '/about', label: 'About Us' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const prevY = useRef(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHidden(y > 300 && y > prevY.current)
      prevY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <>
      {/* ── Main navbar ── */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden && !menuOpen ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-black/60 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold-sm transition-transform duration-300 group-hover:scale-105">
              <Home size={15} className="text-obsidian" />
            </div>
            <div className="leading-none">
              <span className="block font-display text-lg font-semibold tracking-tight text-ivory transition-colors duration-300 group-hover:text-gold">
                COSNOVA
              </span>
              <span className="block text-[9px] font-sans font-500 tracking-[0.18em] text-bronze uppercase -mt-0.5">
                LIMITED
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`relative font-sans text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive(href) ? 'text-gold' : 'text-ivory/70 hover:text-ivory'
                }`}
              >
                {label}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-gold to-bronze"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="btn-gold hidden sm:inline-flex py-2.5 px-5 text-[11px] animate-pulse-gold"
            >
              Book Inspection
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded border border-white/10 bg-white/5 text-ivory hover:border-gold/30 transition-colors"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-obsidian/98 backdrop-blur-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-8">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
                <div className="w-8 h-8 rounded bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                  <Home size={15} className="text-obsidian" />
                </div>
                <span className="font-display text-xl text-ivory">COSNOVA</span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded border border-white/10 text-ivory hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 md:px-16 gap-2">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block font-display text-5xl md:text-6xl font-light py-3 border-b border-white/5 transition-colors duration-200 ${
                      isActive(href) ? 'text-gold' : 'text-ivory/80 hover:text-ivory'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-8 md:p-16 border-t border-white/[0.06]"
            >
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-gold w-full justify-center text-sm"
              >
                Book an Inspection
              </Link>
              <p className="text-xs text-ivory/30 mt-4 text-center font-sans">
                Abuja · Lagos · Nigeria
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
