/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#07090E',
        navy: '#0D111A',
        gold: {
          DEFAULT: '#E0B86C',
          light: '#F2CA80',
          dark: '#B8943E',
        },
        bronze: {
          DEFAULT: '#C5A880',
          light: '#D4BC9A',
          muted: 'rgba(197, 168, 128, 0.25)',
        },
        ivory: {
          DEFAULT: '#F5F4EE',
          muted: 'rgba(245, 244, 238, 0.75)',
          dim: 'rgba(245, 244, 238, 0.4)',
        },
        surface: {
          DEFAULT: 'rgba(18, 24, 38, 0.7)',
          light: 'rgba(255, 255, 255, 0.04)',
          glass: 'rgba(255, 255, 255, 0.06)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          gold: 'rgba(224, 184, 108, 0.35)',
          glow: 'rgba(224, 184, 108, 0.6)',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dusk': 'linear-gradient(180deg, #1a0a00 0%, #0d0a14 40%, #07090E 100%)',
        'gradient-gold': 'linear-gradient(135deg, #E0B86C 0%, #B8943E 100%)',
      },
      backdropBlur: {
        xs: '4px',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(224, 184, 108, 0)' },
          '50%': { boxShadow: '0 0 0 8px rgba(224, 184, 108, 0.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.4' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      boxShadow: {
        'gold-sm': '0 2px 12px rgba(224, 184, 108, 0.2)',
        'gold-md': '0 4px 24px rgba(224, 184, 108, 0.3)',
        'gold-lg': '0 8px 40px rgba(224, 184, 108, 0.4)',
        'dark-lg': '0 20px 60px rgba(0, 0, 0, 0.6)',
        'inset-gold': 'inset 0 1px 0 rgba(224, 184, 108, 0.2)',
      },
    },
  },
  plugins: [],
}
