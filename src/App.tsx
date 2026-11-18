import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import SingleProperty from './pages/SingleProperty'
import Developments from './pages/Developments'
import About from './pages/About'
import Insights from './pages/Insights'
import Contact from './pages/Contact'
import WhatsAppFAB from './components/WhatsAppFAB'

function ScrollToTop() {
  const { pathname } = window.location
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<SingleProperty />} />
          <Route path="/developments" element={<Developments />} />
          <Route path="/about" element={<About />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <WhatsAppFAB />
      </div>
    </BrowserRouter>
  )
}
