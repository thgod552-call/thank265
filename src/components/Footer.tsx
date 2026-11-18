import React from 'react'
import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../lib/data'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-8">
        {/* Company Info */}
        <div>
          <h3 className="font-display text-xl text-gold mb-4">Cosnova Limited</h3>
          <p className="text-sm text-ivory/70 mb-2">
            Premium real‑estate development & sales
          </p>
          <p className="text-sm text-ivory/70">
            Abuja & Lagos, Nigeria
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg text-gold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link to="/properties" className="hover:text-gold transition-colors">Properties</Link></li>
            <li><Link to="/developments" className="hover:text-gold transition-colors">Developments</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/insights" className="hover:text-gold transition-colors">Insights</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="font-display text-lg text-gold mb-3">Contact</h4>
          <p className="text-sm text-ivory/70 mb-2">
            <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\\D/g, '')}`} className="flex items-center gap-2 hover:text-gold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.09.65 4.03 1.77 5.7L2 22l4.5-2.14c1.58.87 3.41 1.38 5.5 1.38 5.52 0 10-4.48 10-10S17.52 2 12 2zm-.75 14.5h-2.5v-2.5h2.5v2.5zm0-4h-2.5V6h2.5v6.5z"/></svg>
              {WHATSAPP_NUMBER}
            </a>
          </p>
          <p className="text-sm text-ivory/70">Email: info@cosnova.com</p>
        </div>
      </div>
      <div className="border-t border-ivory/20 mt-8 pt-4 text-center text-xs text-ivory/50">
        © {new Date().getFullYear()} Cosnova Limited. All rights reserved.
      </div>
    </footer>
  )
}
