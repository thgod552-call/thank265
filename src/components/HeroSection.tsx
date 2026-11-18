import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, ArrowRight } from 'lucide-react'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// Luxury architectural images (from Unsplash CDN - replace with actual photography)
const BG_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90&fm=webp'
const BG_IMG_2 = 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=80&fm=webp'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const layer1Ref = useRef<HTMLDivElement>(null)   // Far BG
  const layer2Ref = useRef<HTMLDivElement>(null)   // Mid architecture
  const layer3Ref = useRef<HTMLDivElement>(null)   // Foreground pool
  const textRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  // ── Three.js ambient particle system (lightweight bokeh) ──────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (typeof WebGLRenderingContext === 'undefined') return

    let animFrameId: number
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    // Floating particle bokeh
    const particleCount = window.innerWidth < 768 ? 80 : 200
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const colors = new Float32Array(particleCount * 3)

    // Gold and warm white palette
    const palette = [
      new THREE.Color('#E0B86C'),
      new THREE.Color('#F5F4EE'),
      new THREE.Color('#C5A880'),
      new THREE.Color('#B8943E'),
    ]

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      sizes[i] = Math.random() * 3 + 1
      const col = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    let t = 0
    const animate = () => {
      animFrameId = requestAnimationFrame(animate)
      t += 0.001
      particles.rotation.y = t * 0.05
      particles.rotation.x = t * 0.02
      // Gentle breathing opacity
      mat.opacity = 0.3 + Math.sin(t * 2) * 0.1
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener('resize', handleResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [])

  // ── GSAP scroll-linked parallax camera simulation ────────────────────────
  useEffect(() => {
    const section = sectionRef.current
    const l1 = layer1Ref.current
    const l2 = layer2Ref.current
    const l3 = layer3Ref.current
    const txt = textRef.current
    if (!section || !l1 || !l2 || !l3 || !txt) return

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(txt.querySelectorAll('.hero-line'), {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.4,
      })
      gsap.from(txt.querySelectorAll('.hero-cta'), {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1.0,
      })

      // Parallax on scroll: simulate camera moving closer
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      tl
        .to(l1, { y: '-18%', scale: 1.08, ease: 'none' }, 0)          // Far BG slows
        .to(l2, { y: '-12%', scale: 1.12, ease: 'none' }, 0)          // Architecture moves faster
        .to(l3, { y: '6%', scale: 1.05, ease: 'none' }, 0)            // Foreground moves up slightly
        .to(txt, { y: '-30%', opacity: 0, ease: 'none' }, 0)          // Text fades out and rises
    }, section)

    return () => ctx.revert()
  }, [])

  // ── Scroll indicator animation ────────────────────────────────────────────
  const scrollToNext = () => {
    const next = sectionRef.current?.nextElementSibling
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[680px] overflow-hidden flex items-center"
    >
      {/* ── Layer 1: Dusk sky gradient background ── */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 will-change-transform"
        style={{
          background: 'linear-gradient(180deg, #1a0f02 0%, #0d0a14 45%, #07090E 100%)',
        }}
      />

      {/* ── Layer 2: Main architectural photography ── */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={BG_IMG}
          alt="Cosnova Limited - Luxury contemporary residence"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Cinematic colour grading overlay */}
        <div className="absolute inset-0 mix-blend-multiply"
          style={{ background: 'linear-gradient(180deg, rgba(10,5,0,0.55) 0%, rgba(7,9,14,0.3) 50%, rgba(7,9,14,0.85) 100%)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(7,9,14,0.6) 0%, transparent 60%, rgba(7,9,14,0.3) 100%)' }}
        />
      </div>

      {/* ── Layer 3: Foreground depth element (pool/ground reflection) ── */}
      <div
        ref={layer3Ref}
        className="absolute bottom-0 inset-x-0 h-2/5 will-change-transform"
      >
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(7,9,14,1) 0%, rgba(7,9,14,0.8) 30%, transparent 100%)' }}
        />
      </div>

      {/* ── Three.js ambient particle canvas ── */}
      <canvas
        ref={canvasRef}
        id="hero-canvas"
        className="absolute inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* ── Hero text composition ── */}
      <div
        ref={textRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-8 pt-24"
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="hero-line eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-gold opacity-60" />
            Premium Living · Abuja & Lagos
          </p>

          {/* Headline */}
          <h1 className="font-display leading-none mb-6">
            <span className="hero-line block text-display-2xl text-ivory">A Higher</span>
            <span className="hero-line block text-display-2xl text-ivory">Standard of</span>
            <span className="hero-line block text-display-2xl italic text-gold">Living.</span>
          </h1>

          {/* Subline */}
          <p className="hero-line text-ivory/60 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
            Exclusive homes. Prime locations. Real opportunities<br className="hidden md:block" /> crafted for those who demand the finest.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/properties" className="hero-cta btn-gold gap-2">
              Explore Properties
              <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="hero-cta btn-ghost gap-2">
              Book an Inspection
            </Link>
          </div>
        </div>
      </div>

      {/* ── Property stats bar (bottom left) ── */}
      <div className="absolute bottom-20 left-5 md:left-8 z-20 flex items-center gap-8">
        {[
          { value: '5+', label: 'Years' },
          { value: '20+', label: 'Projects' },
          { value: '500+', label: 'Clients' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-display text-2xl md:text-3xl text-gold font-light leading-none">{value}</p>
            <p className="text-[10px] text-ivory/40 font-sans uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-ivory/40 hover:text-ivory/80 transition-colors group"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] font-sans uppercase tracking-[0.2em]">Scroll to explore</span>
        <ChevronDown size={16} className="animate-scroll-bounce" />
      </button>

      {/* ── Side property label ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold/40" />
        <p className="text-[10px] text-ivory/30 font-sans uppercase tracking-[0.25em]"
           style={{ writingMode: 'vertical-rl' }}>
          Cosnova Collection 2026
        </p>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-gold/40" />
      </div>
    </section>
  )
}
