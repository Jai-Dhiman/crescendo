import {createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturesShowcase } from '@/components/home/FeaturesShowcase'
import { QuickStats } from '@/components/home/QuickStats'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <main>
      <HeroSection />
      <FeaturesShowcase />
      <QuickStats />
    </main>
  )
}
