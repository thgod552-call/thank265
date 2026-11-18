import React from 'react'
import HeroSection from '../components/HeroSection'
import InteriorWalkthrough from '../components/InteriorWalkthrough'
import DollhouseView from '../components/DollhouseView'
import FeaturedProperties from '../components/FeaturedProperties'
import Developments from '../components/DevelopmentsPreview'
import Insights from '../components/InsightsPreview'
import ContactCTA from '../components/ContactCTA'

// Home page aggregates the primary sections in vertical order.
export default function Home() {
  return (
    <main className="flex flex-col gap-24">
      <HeroSection />
      <InteriorWalkthrough />
      <DollhouseView />
      <FeaturedProperties />
      <Developments />
      <Insights />
      <ContactCTA />
    </main>
  )
}
