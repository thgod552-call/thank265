import React from 'react'
import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../lib/data'

export default function WhatsAppFAB() {
  const link = `https://wa.me/${WHATSAPP_NUMBER.replace(/\\D/g, '')}`
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gold text-obsidian rounded-full px-4 py-2 shadow-lg hover:bg-gold-dark transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.09.65 4.03 1.77 5.7L2 22l4.5-2.14c1.58.87 3.41 1.38 5.5 1.38 5.52 0 10-4.48 10-10S17.52 2 12 2zm-.75 14.5h-2.5v-2.5h2.5v2.5zm0-4h-2.5V6h2.5v6.5z"/></svg>
      Chat
    </a>
  )
}
